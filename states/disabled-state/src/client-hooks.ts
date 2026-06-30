'use client' // The exported hooks are client side only.

// Types:
import {
    type DisabledStateProps,
    type DisabledStateOptions,
    type DisabledPhase,
    type DisabledClassname,
    type DisabledState,
}                           from './types.js'
import {
    type DisabledStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeDisabled,
    defaultDeclarativeCascadeDisabled,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveDisabledTransitionPhase,
    resolveDisabledTransitionClassname,
    triggerDisabledPhaseEvents,
}                           from './internal-utilities.js'

// Contexts:
import {
    DisabledStateContext,
}                           from './internal-contexts.js'

// Reusable-ui states:
import {
    // Types:
    type CascadeStateDefinition,
    
    
    
    // Hooks:
    useResolvedCascadeState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.
import {
    // Hooks:
    useFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** The cascade state definition for enabled/disabled state management. */
const cascadeStateDefinition : CascadeStateDefinition<boolean> = {
    defaultState          : defaultDeclarativeDisabled,
    defaultCascadeEnabled : defaultDeclarativeCascadeDisabled,
    inactiveState         : false, // `false`: the value of un-disabled state
    stateContext          : DisabledStateContext,
};

/**
 * Resolves the current enabled/disabled state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `disabled` state and **forward** it to a base component.
 * 
 * Unlike `useDisabledState()`, which handles animation and lifecycle,
 * `useResolvedDisabled()` performs a lightweight resolution of the effective disabled value.
 * 
 * - No internal state or uncontrolled fallback.
 * - Ideal for components that **consume** the resolved `disabled` state.
 * 
 * Resolution priority:
 * - If `disabled` is `true`, the component is explicitly disabled.
 * - If `disabled` is `false` and `cascadeDisabled` is `false`, the component is explicitly enabled.
 * - If `disabled` is `false` and `cascadeDisabled` is `true`, the component checks context for inherited disabled state.
 * - If context is unavailable and `cascadeDisabled` is `true`, the component defaults to enabled (`false`).
 * 
 * @param props - The component props that may include a controlled `disabled` value and contextual `cascadeDisabled` value.
 * @param options - An optional configuration for customizing enabled/disabled behavior.
 * @returns The resolved enabled/disabled state.
 */
export const useResolvedDisabled = (props: Pick<DisabledStateProps, 'disabled' | 'cascadeDisabled'>, options?: Pick<DisabledStateOptions, 'defaultDisabled' | 'defaultCascadeDisabled'>) : boolean => {
    // Extract options:
    const {
        defaultDisabled        : defaultState,
        defaultCascadeDisabled : defaultCascadeEnabled,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        disabled        : state,
        cascadeDisabled : cascadeEnabled,
    } = props;
    
    
    
    // Resolve effective disabled state:
    return useResolvedCascadeState<boolean>(
        // Props:
        { state, cascadeEnabled },
        
        // Options:
        { defaultState, defaultCascadeEnabled },
        
        // Definition:
        cascadeStateDefinition,
    );
};



/** The behavior state definition for enabled/disabled state management. */
const disabledStateDefinition : DisabledStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['enabling', 'disabling'],          // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveDisabledTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveDisabledTransitionClassname, // Resolves classnames.
    triggerTransitionEvent     : triggerDisabledPhaseEvents,         // Triggers lifecycle events.
};

/**
 * Resolves the enabled/disabled state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled disabled state.
 * - Supports contextual override via `cascadeDisabled`.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `disabled` value, contextual `cascadeDisabled` value, and `onDisabledUpdate` callback.
 * @param options - An optional configuration for customizing enabled/disabled behavior and animation lifecycle.
 * @returns The resolved enabled/disabled state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useDisabledState,
 *     DisabledStateProps,
 * } from '@reusable-ui/disabled-state';
 * import styles from './CustomEditor.module.css';
 * 
 * export interface CustomEditorProps extends
 *     DisabledStateProps
 * {}
 * 
 * // An editor that can be enabled or disabled.
 * export const CustomEditor: FC<CustomEditorProps> = (props) => {
 *     const {
 *         disabled,
 *         actualDisabled,
 *         disabledPhase,
 *         disabledClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useDisabledState(props, {
 *         defaultDisabled        : false,                     // Defaults to enabled.
 *         defaultCascadeDisabled : true,                      // Defaults to allow contextual disabling.
 *         animationPattern       : ['enabling', 'disabling'], // Matches animation names ending with 'enabling' or 'disabling'.
 *         animationBubbling      : false,                     // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <input
 *             type='text'
 *             className={`${styles.box} ${disabledClassname}`}
 *             disabled={disabled}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         />
 *     );
 * };
 * ```
 */
export const useDisabledState = <TElement extends Element = HTMLElement>(props: DisabledStateProps, options?: DisabledStateOptions): DisabledState<TElement> => {
    // Extract props:
    const {
        onDisabledUpdate : onStateUpdate,
        
        onEnablingStart,
        onEnablingEnd,
        onDisablingStart,
        onDisablingEnd,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective disabled state:
    const effectiveState = useResolvedDisabled(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : disabled,
        actualState         : actualDisabled,
        transitionPhase     : disabledPhase,
        transitionClassname : disabledClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean,
        DisabledPhase,
        DisabledClassname,
        
        DisabledStateProps,
        DisabledStateOptions,
        DisabledStateDefinition,
        
        TElement
    >(
        // Props:
        {
            effectiveState,
            onStateUpdate,
            
            ...({
                onEnablingStart,
                onEnablingEnd,
                onDisablingStart,
                onDisablingEnd,
            } as {}),
        },
        
        // Options:
        options,
        
        // Definition:
        disabledStateDefinition,
    );
    
    
    
    // Return resolved disabled state API:
    return {
        disabled,
        actualDisabled,
        disabledPhase,
        disabledClassname,
        ...animationHandlers,
    } satisfies DisabledState<TElement>;
};
