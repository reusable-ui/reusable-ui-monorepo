'use client' // The exported hooks are client side only.

// Types:
import {
    type DisabledStateProps,
    type DisabledStateUpdateProps,
    type DisabledStatePhaseEventProps,
    type DisabledStateOptions,
    type DisabledPhase,
    type DisabledClassname,
    type DisabledBehaviorState,
}                           from './types.js'
import {
    type DisabledBehaviorStateDefinition,
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
}                           from './internal-utilities.js'

// Contexts:
import {
    DisabledStateContext,
}                           from './contexts.js'

// Reusable-ui states:
import {
    // Types:
    type CascadeStateDefinition,
    
    
    
    // Hooks:
    useCascadeState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.
import {
    // Hooks:
    useFeedbackBehaviorState,
    useFeedbackStatePhaseEvents,
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
 * Unlike `useDisabledBehaviorState()`, which handles animation and lifecycle,
 * `useDisabledState()` performs a lightweight resolution of the effective disabled value.
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
 * @param options - An optional configuration for customizing enable/disable behavior.
 * @returns The resolved enabled/disabled state.
 */
export const useDisabledState = (props: DisabledStateProps, options?: Pick<DisabledStateOptions, 'defaultDisabled' | 'defaultCascadeDisabled'>) : boolean => {
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
    return useCascadeState<boolean>(
        // Props:
        { state, cascadeEnabled },
        
        // Options:
        { defaultState, defaultCascadeEnabled },
        
        // Definition:
        cascadeStateDefinition,
    );
};



/** The behavior state definition for enabled/disabled state management. */
const disabledBehaviorStateDefinition : DisabledBehaviorStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['enabling', 'disabling'],          // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveDisabledTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveDisabledTransitionClassname, // Resolves classnames.
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
 * @param options - An optional configuration for customizing disabled behavior and animation lifecycle.
 * @returns The resolved enabled/disabled state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useDisabledBehaviorState,
 *     DisabledStateProps,
 *     DisabledStateUpdateProps,
 * } from '@reusable-ui/disabled-state';
 * import styles from './CustomEditor.module.css';
 * 
 * export interface CustomEditorProps extends
 *     DisabledStateProps,
 *     DisabledStateUpdateProps // optional update reporting behavior
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
 *     } = useDisabledBehaviorState(props, {
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
export const useDisabledBehaviorState = <TElement extends Element = HTMLElement>(props: DisabledStateProps & DisabledStateUpdateProps, options?: DisabledStateOptions): DisabledBehaviorState<TElement> => {
    // Extract props:
    const {
        onDisabledUpdate : onStateUpdate,
        // ...restProps // Not needed the rest since all resolvers in the definition are *not* dependent of the props.
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective disabled state:
    const effectiveState = useDisabledState(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : disabled,
        actualState         : actualDisabled,
        transitionPhase     : disabledPhase,
        transitionClassname : disabledClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        DisabledPhase,
        DisabledClassname,
        
        DisabledStateProps,
        DisabledStateOptions,
        DisabledBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateUpdate, /* ...restProps */ },
        
        // Options:
        options,
        
        // Definition:
        disabledBehaviorStateDefinition,
    );
    
    
    
    // Return resolved disabled state API:
    return {
        disabled,
        actualDisabled,
        disabledPhase,
        disabledClassname,
        ...animationHandlers,
    } satisfies DisabledBehaviorState<TElement>;
};



/**
 * Emits lifecycle events in response to enable/disable phase transitions.
 * 
 * This hook observes the resolved `disabledPhase` from `useDisabledBehaviorState()` and triggers
 * the appropriate callbacks defined in `DisabledStatePhaseEventProps`, such as:
 * 
 * - `onEnablingStart`
 * - `onEnablingEnd`
 * - `onDisablingStart`
 * - `onDisablingEnd`
 * 
 * @param {DisabledStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {DisabledPhase} disabledPhase - The current phase value returned from `useDisabledBehaviorState()`.
 */
export const useDisabledStatePhaseEvents = (props: DisabledStatePhaseEventProps, disabledPhase: DisabledPhase): void => {
    useFeedbackStatePhaseEvents(disabledPhase, (disabledPhase: DisabledPhase): void => {
        switch (disabledPhase) {
            case 'enabling'  : props.onEnablingStart?.(disabledPhase, undefined);  break;
            case 'enabled'   : props.onEnablingEnd?.(disabledPhase, undefined);    break;
            case 'disabling' : props.onDisablingStart?.(disabledPhase, undefined); break;
            case 'disabled'  : props.onDisablingEnd?.(disabledPhase, undefined);   break;
        } // switch
    });
};
