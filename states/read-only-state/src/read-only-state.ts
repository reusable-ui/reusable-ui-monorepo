'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    use,
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

// Reusable-ui states:
import {
    // Hooks:
    useFeedbackBehaviorState,
    useFeedbackStatePhaseEvents,
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
    useFeedbackStatePhaseEvents(readOnlyPhase, (readOnlyPhase: ReadOnlyPhase): void => {
        switch (readOnlyPhase) {
            case 'thawing'  : props.onThawingStart?.(readOnlyPhase, undefined);  break;
            case 'editable' : props.onThawingEnd?.(readOnlyPhase, undefined);    break;
            case 'freezing' : props.onFreezingStart?.(readOnlyPhase, undefined); break;
            case 'readonly' : props.onFreezingEnd?.(readOnlyPhase, undefined);   break;
        } // switch
    });
};
