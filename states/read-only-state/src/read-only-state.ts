'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    use,
    useEffect,
    useLayoutEffect,
    useRef,
}                           from 'react'

// Types:
import {
    type ReadOnlyStateProps,
    type ReadOnlyStateUpdateProps,
    type ReadOnlyStatePhaseEventProps,
    type ReadOnlyStateOptions,
    type ReadOnlyPhase,
    type ReadOnlyClassname,
    type ReadOnlyBehaviorState,
}                           from './types.js'
import {
    type ReadOnlyBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeReadOnly,
    defaultDeclarativeCascadeReadOnly,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveReadOnlyTransitionPhase,
    resolveReadOnlyTransitionClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    ReadOnlyStateContext,
}                           from './contexts.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Reusable-ui states:
import {
    // Hooks:
    useFeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Resolves the current editable/read-only state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `readOnly` state and **forward** it to a base component.
 * 
 * Unlike `useReadOnlyBehaviorState()`, which handles animation and lifecycle,
 * `useReadOnlyState()` performs a lightweight resolution of the effective read-only value.
 * 
 * - No internal state or uncontrolled fallback.
 * - Ideal for components that **consume** the resolved `readOnly` state.
 * 
 * Resolution priority:
 * - If `readOnly` is `true`, the component is explicitly read-only.
 * - If `readOnly` is `false` and `cascadeReadOnly` is `false`, the component is explicitly editable.
 * - If `readOnly` is `false` and `cascadeReadOnly` is `true`, the component checks context for inherited read-only state.
 * - If context is unavailable and `cascadeReadOnly` is `true`, the component defaults to editable (`false`).
 * 
 * @param props - The component props that may include a controlled `readOnly` value and contextual `cascadeReadOnly` value.
 * @param options - An optional configuration for customizing editable/read-only behavior.
 * @returns The resolved editable/read-only state.
 */
export const useReadOnlyState = (props: ReadOnlyStateProps, options?: Pick<ReadOnlyStateOptions, 'defaultReadOnly' | 'defaultCascadeReadOnly'>) : boolean => {
    // Extract options and assign defaults:
    const {
        defaultReadOnly        = defaultDeclarativeReadOnly,
        defaultCascadeReadOnly = defaultDeclarativeCascadeReadOnly,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        readOnly         : controlledReadOnly = defaultReadOnly,
        cascadeReadOnly  : cascadeReadOnly    = defaultCascadeReadOnly,
    } = props;
    
    
    
    // Resolve effective read-only state:
    
    // If explicitly read-only, no need to check context:
    if (controlledReadOnly) return true;
    
    
    
    // If not cascading, context is ignored, thus editable:
    if (!cascadeReadOnly) return false;
    
    
    
    // Get the inherited read-only from context:
    const inheritedReadOnly = use(ReadOnlyStateContext);
    
    
    
    // If context value exists, return it:
    if (inheritedReadOnly !== undefined) return inheritedReadOnly;
    
    
    
    // Otherwise, fallback to editable:
    return false;
};



/**
 * Resolves the editable/read-only state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled read-only state.
 * - Supports contextual override via `cascadeReadOnly`.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `readOnly` value, contextual `cascadeReadOnly` value, and `onReadOnlyUpdate` callback.
 * @param options - An optional configuration for customizing read-only behavior and animation lifecycle.
 * @returns The resolved editable/read-only state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useReadOnlyBehaviorState,
 *     ReadOnlyStateProps,
 *     ReadOnlyStateUpdateProps,
 * } from '@reusable-ui/read-only-state';
 * import styles from './CustomEditor.module.css';
 * 
 * export interface CustomEditorProps extends
 *     ReadOnlyStateProps,
 *     ReadOnlyStateUpdateProps // optional update reporting behavior
 * {}
 * 
 * // An editor that can be editable or read-only.
 * export const CustomEditor: FC<CustomEditorProps> = (props) => {
 *     const {
 *         readOnly,
 *         actualReadOnly,
 *         readOnlyPhase,
 *         readOnlyClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useReadOnlyBehaviorState(props, {
 *         defaultReadOnly        : false,                   // Defaults to editable.
 *         defaultCascadeReadOnly : true,                    // Defaults to allow contextual read-only.
 *         animationPattern       : ['thawing', 'freezing'], // Matches animation names ending with 'thawing' or 'freezing'.
 *         animationBubbling      : false,                   // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <input
 *             type='text'
 *             className={`${styles.box} ${readOnlyClassname}`}
 *             readOnly={readOnly}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         />
 *     );
 * };
 * ```
 */
export const useReadOnlyBehaviorState = <TElement extends Element = HTMLElement>(props: ReadOnlyStateProps & ReadOnlyStateUpdateProps, options?: ReadOnlyStateOptions): ReadOnlyBehaviorState<TElement> => {
    // Extract props:
    const {
        onReadOnlyUpdate : handleReadOnlyUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective read-only state:
    const effectiveReadOnly = useReadOnlyState(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : readOnly,
        actualState         : actualReadOnly,
        transitionPhase     : readOnlyPhase,
        transitionClassname : readOnlyClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        ReadOnlyPhase,
        ReadOnlyClassname,
        
        ReadOnlyStateProps,
        ReadOnlyStateOptions,
        ReadOnlyBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { resolvedState: effectiveReadOnly, onStateUpdate: handleReadOnlyUpdate },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['thawing', 'freezing'],            // Matches animation names for transitions.
            defaultAnimationBubbling   : false,
            resolveTransitionPhase     : resolveReadOnlyTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveReadOnlyTransitionClassname, // Resolves classnames.
        } satisfies ReadOnlyBehaviorStateDefinition,
    );
    
    
    
    // Return resolved read-only state API:
    return {
        readOnly,
        actualReadOnly,
        readOnlyPhase,
        readOnlyClassname,
        ...animationHandlers,
    } satisfies ReadOnlyBehaviorState<TElement>;
};

/**
 * Emits lifecycle events in response to editable/read-only phase transitions.
 * 
 * This hook observes the resolved `readOnlyPhase` from `useReadOnlyBehaviorState()` and triggers
 * the appropriate callbacks defined in `ReadOnlyStatePhaseEventProps`, such as:
 * 
 * - `onThawingStart`
 * - `onThawingEnd`
 * - `onFreezingStart`
 * - `onFreezingEnd`
 * 
 * @param {ReadOnlyStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ReadOnlyPhase} readOnlyPhase - The current phase value returned from `useReadOnlyBehaviorState()`.
 */
export const useReadOnlyStatePhaseEvents = (props: ReadOnlyStatePhaseEventProps, readOnlyPhase: ReadOnlyPhase): void => {
    // Extract props:
    const {
        onThawingStart,
        onThawingEnd,
        onFreezingStart,
        onFreezingEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleReadOnlyPhaseChange = useStableCallback((readOnlyPhase: ReadOnlyPhase): void => {
        switch (readOnlyPhase) {
            case 'thawing'  : onThawingStart?.(readOnlyPhase, undefined);  break;
            case 'editable' : onThawingEnd?.(readOnlyPhase, undefined);    break;
            case 'freezing' : onFreezingStart?.(readOnlyPhase, undefined); break;
            case 'readonly' : onFreezingEnd?.(readOnlyPhase, undefined);   break;
        } // switch
    });
    
    
    
    /*
        ⚠️ React Strict Mode Consideration:
        This hook uses two effects to ensure **consistent behavior** across strict and non-strict modes.
        The observer effect emits phase change events, while the setup effect tracks the mount status.
        The setup effect must be placed after observer effect in order to correctly emit events for subsequent updates only.
        
        This configuration ensures that phase change events are emitted only for SUBSEQUENT UPDATES.
        The first update never emits any events.
        
        Sequence on initial mount:
        1. First render
            → observer effect runs → but SKIPS event emission due to `hasMountedRef = false`
            → setup effect runs → marks `hasMountedRef = true`, allowing further updates to emit events
        2. [Strict Mode] Simulated unmount
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`, preventing further updates from emitting events
        3. [Strict Mode] Second render
            → observer effect runs → SKIPS event emission again due to `hasMountedRef = false`
            → setup effect runs → marks `hasMountedRef = true`, allowing further updates to emit events
        So effectively, the initial mount does NOT emit any events in both strict and non-strict modes.
        
        Sequence on subsequent updates of `readOnlyPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `readOnlyPhase` updates.
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleReadOnlyPhaseChange(readOnlyPhase);
    }, [readOnlyPhase]);
    
    // Setup effect: marks the component as mounted and resets on unmount.
    // Use regular `useEffect()` is sufficient, since mount status tracking does not require timing-sensitive operations before painting.
    useEffect(() => {
        // Mark as mounted:
        hasMountedRef.current = true;
        
        
        
        // Unmark when unmounted:
        return () => {
            hasMountedRef.current = false;
        };
    }, []);
};
