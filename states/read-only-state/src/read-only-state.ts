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
    type ReadOnlyBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeReadOnly,
    defaultDeclarativeCascadeReadOnly,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveReadOnlyPhase,
    getReadOnlyClassname,
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
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Resolves the effective read-only value based on props and context.
 * 
 * Resolution priority:
 * - If `readOnly` is `true`, the component is explicitly read-only.
 * - If `readOnly` is `false` and `cascadeReadOnly` is `false`, the component is explicitly editable.
 * - If `readOnly` is `false` and `cascadeReadOnly` is `true`, the component checks context for inherited read-only state.
 * - If context is unavailable and `cascadeReadOnly` is `true`, the component defaults to editable (`false`).
 * 
 * @param controlledReadOnly - The controlled read-only state.
 * @param cascadeReadOnly - Whether to cascade read-only state from context.
 * @returns The resolved read-only value.
 */
const useEffectiveReadOnlyValue = (controlledReadOnly: Required<ReadOnlyStateProps>['readOnly'], cascadeReadOnly: boolean): boolean => {
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
    
    
    
    // States and flags:
    
    // Resolve effective read-only state:
    const effectiveReadOnly = useEffectiveReadOnlyValue(controlledReadOnly, cascadeReadOnly);
    
    
    
    // Return the resolved editable/read-only state:
    return effectiveReadOnly;
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
    // Extract options and assign defaults:
    const {
        defaultReadOnly        = defaultDeclarativeReadOnly,
        defaultCascadeReadOnly = defaultDeclarativeCascadeReadOnly,
        animationPattern       = ['thawing', 'freezing'], // Matches animation names for transitions
        animationBubbling      = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        readOnly         : controlledReadOnly = defaultReadOnly,
        cascadeReadOnly  : cascadeReadOnly    = defaultCascadeReadOnly,
        onReadOnlyUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective read-only state:
    const effectiveReadOnly = useEffectiveReadOnlyValue(controlledReadOnly, cascadeReadOnly);
    
    // Internal animation lifecycle:
    const [internalReadOnly, setInternalReadOnly, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent : effectiveReadOnly,
        animationPattern,
        animationBubbling,
    });
    
    // The current settled or animating read-only state.
    // During animation, this reflects the active target (`runningIntent`).
    // If no animation is active, it reflects the latest declared intent (`effectiveReadOnly`), even if not yet committed.
    // This optimistic fallback ensures transition logic and styling remain in sync with declared transitions.
    // Deferred or discarded intents are never reflected here.
    const settledReadOnly   = runningIntent ?? effectiveReadOnly;
    
    // Determine whether a transition toward the effective read-only state is currently in progress:
    const isTransitioning   = (
        // An in-flight animation is active toward a target read-only state:
        (runningIntent !== undefined)
        
        ||
        
        // An optimistic transition is pending: the intent has changed, but React has not yet re-rendered to reflect it.
        // This mismatch is expected and resolves once `setInternalReadOnly(effectiveReadOnly)` takes effect.
        (internalReadOnly !== effectiveReadOnly)
    );
    
    // Derive semantic phase from animation lifecycle:
    const readOnlyPhase     = resolveReadOnlyPhase(settledReadOnly, isTransitioning); // 'editable', 'readonly', 'thawing', 'freezing'
    
    
    
    // Sync animation state with effective read-only state:
    // Use `useLayoutEffect()` to ensure the intent is registered before the browser fires `animationstart`.
    // This guarantees the animation lifecycle handshake completes correctly.
    // The `useAnimationState()` hook internally treats missing animation events as immediately completed transitions.
    useLayoutEffect(() => {
        // The `setInternalReadOnly()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalReadOnly(effectiveReadOnly);
        
        // Note: If `setInternalReadOnly()` is delayed (e.g. by React's render scheduler),
        // both `internalReadOnly` and `runningIntent` may remain stale temporarily.
        // This introduces a brief pre-transition ambiguity, safely handled by `isTransitioning` logic.
    }, [effectiveReadOnly]);
    
    
    
    // A stable dispatcher for emitting read-only update events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleReadOnlyUpdate = useStableCallback((currentReadOnly: boolean): void => {
        onReadOnlyUpdate?.(currentReadOnly, undefined);
    });
    
    
    
    // Observer effect: emits read-only update events on `effectiveReadOnly` updates.
    // Use `useLayoutEffect()` to ensure the update is emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Emits read-only update events:
        handleReadOnlyUpdate(effectiveReadOnly);
    }, [effectiveReadOnly]);
    
    
    
    // Return resolved read-only state API:
    return {
        readOnly          : settledReadOnly,   // Use `settledReadOnly` instead of `effectiveReadOnly`, because during animation, the settled state reflects the visually committed read-only state.
        actualReadOnly    : effectiveReadOnly, // Expose the actual effective state for advanced use cases.
        readOnlyPhase,
        readOnlyClassname : getReadOnlyClassname(readOnlyPhase),
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
