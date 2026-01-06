'use client' // The exported hooks are client side only.

// Types:
import {
    type PressStateProps,
    type PressStateUpdateProps,
    type PressStatePhaseEventProps,
    type PressStateOptions,
    type PressPhase,
    type PressClassname,
    type PressBehaviorState,
}                           from './types.js'
import {
    type PressBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativePressed,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolvePressTransitionPhase,
    resolvePressTransitionClassname,
}                           from './internal-utilities.js'

// Hooks:
import {
    usePressObserver,
}                           from './press-observer.js'

// Reusable-ui states:
import {
    // Types:
    type ObservableStateDefinition,
    
    
    
    // Hooks:
    useObservableState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.
import {
    // Hooks:
    useFeedbackBehaviorState,
    useFeedbackStatePhaseEvents,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.
import {
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/** The observable state definition for press/release state management. */
const observableStateDefinition : ObservableStateDefinition<boolean, 'auto'> = {
    defaultState         : defaultDeclarativePressed,
    inactiveState        : false, // `false`: the value of un-press state
    observableStateToken : 'auto',
};

/**
 * Resolves the current pressed/released state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `pressed` state and **forward** it to a base component.
 * 
 * Unlike `usePressBehaviorState()`, which handles animation and lifecycle,
 * `usePressState()` performs a lightweight resolution of the effective press value.
 * 
 * - No internal state or uncontrolled fallback.
 * - `'auto'` is treated as a declarative diagnostic mode.
 * - Ideal for components that **consume** the resolved `pressed` state.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `pressed` value and derived `computedPress` value.
 * @param options - An optional configuration for customizing press/release behavior.
 * @returns The resolved pressed/released state and event handlers for pointer and keyboard events.
 */
export const usePressState = <TElement extends Element = HTMLElement>(props: PressStateProps, options?: Pick<PressStateOptions, 'defaultPressed' | 'pressKeys' | 'clickKeys' | 'triggerClickOnKeyUp' | 'pressButtons' | 'pressPressure' | 'pressFingers' | 'noGlobalPointerRelease' | 'noGlobalKeyRelease'>) : Pick<PressBehaviorState<TElement>, 'pressed' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel' | 'handleKeyDown' | 'handleKeyUp'> => {
    // Extract options:
    const {
        defaultPressed : defaultState,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        pressed       : state,
        computedPress : externalComputedPress,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is in a restricted state (interaction blocked):
    const isRestricted         = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Determine control mode:
    const isExplicitValue      = (state !== 'auto');
    
    // Determine the source of `computedPress`:
    const isExternallyComputed = (externalComputedPress !== undefined);
    
    // Internal press observer (used only when uncontrolled and not delegated):
    const {
        observedPress,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } = usePressObserver<TElement>(isExplicitValue || isExternallyComputed, isRestricted, options);
    
    // Merge external and internal observation:
    const observedState = isExternallyComputed ? externalComputedPress : observedPress;
    
    // Resolve effective pressed state:
    const pressed = useObservableState<boolean, 'auto'>(
        // Props:
        { state, isRestricted, observedState },
        
        // Options:
        { defaultState },
        
        // Definition:
        observableStateDefinition,
    );
    
    
    
    // Return resolved press state API:
    return {
        pressed,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } satisfies Pick<PressBehaviorState<TElement>, 'pressed' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel' | 'handleKeyDown' | 'handleKeyUp'>;
};



/** The behavior state definition for press/release state management. */
const pressBehaviorStateDefinition : PressBehaviorStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['pressing', 'releasing'],       // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolvePressTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolvePressTransitionClassname, // Resolves classnames.
};

/**
 * Resolves the press state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled press state, when `pressed` is set to `true` or `false`.
 * - Supports diagnostic mode, when `pressed` is set to `'auto'`, which derives the effective press from `computedPress`.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `pressed` value, derived `computedPress` value, and `onPressUpdate` callback.
 * @param options - An optional configuration for customizing press/release behavior and animation lifecycle.
 * @returns The resolved pressed/released state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useState, useEffect } from 'react';
 * import {
 *     usePressBehaviorState,
 *     PressStateProps,
 *     PressStateUpdateProps,
 * } from '@reusable-ui/press-state';
 * import styles from './CustomButton.module.css';
 * 
 * export interface CustomButtonProps extends
 *     PressStateProps,
 *     PressStateUpdateProps // optional update reporting behavior
 * {}
 * 
 * // A button with custom press logic.
 * export const CustomButton: FC<CustomButtonProps> = (props) => {
 *     const [internalComputedPress, setInternalComputedPress] = useState<boolean>(false);
 *     
 *     const {
 *         // Allows derived components to override the internal press logic:
 *         computedPress : externalComputedPress,
 *         
 *         ...restProps,
 *     } = props;
 *     
 *     const isExternallyComputed = (externalComputedPress !== undefined);
 *     const computedPress        = isExternallyComputed ? externalComputedPress : internalComputedPress;
 *     
 *     useEffect(() => {
 *         if (isExternallyComputed) return;
 *         
 *         // Perform internal press logic here:
 *         // setInternalComputedPress(true);
 *     }, [isExternallyComputed]);
 *     
 *     const {
 *         pressed,
 *         actualPressed,
 *         pressPhase,
 *         pressClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *         
 *         // Use these handlers to use built-in press observer when `computedPress` is not provided:
 *         handlePointerDown,
 *         handlePointerUp,
 *         handlePointerCancel,
 *         handleKeyDown,
 *         handleKeyUp,
 *     } = usePressBehaviorState({
 *         computedPress,
 *         ...restProps,
 *     }, {
 *         defaultPressed    : 'auto',                    // Defaults to diagnostic mode.
 *         animationPattern  : ['pressing', 'releasing'], // Matches animation names ending with 'pressing' or 'releasing'.
 *         animationBubbling : false,                     // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.button} ${pressClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {pressed  && <p className={styles.pressed}>Pressed</p>}
 *             {!pressed && <p className={styles.released}>Released</p>}
 *         </div>
 *     );
 * };
 * ```
 */
export const usePressBehaviorState = <TElement extends Element = HTMLElement>(props: PressStateProps & PressStateUpdateProps, options?: PressStateOptions): PressBehaviorState<TElement> => {
    // Extract props:
    const {
        onPressUpdate : onStateUpdate,
        // ...restProps // Not needed the rest since all resolvers in the definition are *not* dependent of the props.
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective press state:
    const {
        pressed: effectiveState,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } = usePressState<TElement>(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : pressed,
        actualState         : actualPressed,
        transitionPhase     : pressPhase,
        transitionClassname : pressClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        PressPhase,
        PressClassname,
        
        PressStateProps,
        PressStateOptions,
        PressBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateUpdate, /* ...restProps */ },
        
        // Options:
        options,
        
        // Definition:
        pressBehaviorStateDefinition,
    );
    
    
    
    // Return resolved press state API:
    return {
        pressed,
        actualPressed,
        pressPhase,
        pressClassname,
        ...animationHandlers,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } satisfies PressBehaviorState<TElement>;
};



/**
 * Emits lifecycle events in response to press/release phase transitions.
 * 
 * This hook observes the resolved `pressPhase` from `usePressBehaviorState()` and triggers
 * the appropriate callbacks defined in `PressStatePhaseEventProps`, such as:
 * 
 * - `onPressingStart`
 * - `onPressingEnd`
 * - `onReleasingStart`
 * - `onReleasingEnd`
 * 
 * @param {PressStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {PressPhase} pressPhase - The current phase value returned from `usePressBehaviorState()`.
 */
export const usePressStatePhaseEvents = (props: PressStatePhaseEventProps, pressPhase: PressPhase): void => {
    useFeedbackStatePhaseEvents(pressPhase, (pressPhase: PressPhase): void => {
        switch (pressPhase) {
            case 'pressing'  : props.onPressingStart?.(pressPhase, undefined);  break;
            case 'pressed'   : props.onPressingEnd?.(pressPhase, undefined);    break;
            case 'releasing' : props.onReleasingStart?.(pressPhase, undefined); break;
            case 'released'  : props.onReleasingEnd?.(pressPhase, undefined);   break;
        } // switch
    });
};
