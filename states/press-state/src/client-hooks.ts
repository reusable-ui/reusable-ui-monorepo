'use client' // The exported hooks are client side only.

// Types:
import {
    type PressStateProps,
    type PressStateOptions,
    type PressPhase,
    type PressClassname,
    type PressState,
}                           from './types.js'
import {
    type PressStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativePressed,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolvePressTransitionPhase,
    resolvePressTransitionClassname,
    triggerPressPhaseEvents,
}                           from './internal-utilities.js'

// Hooks:
import {
    usePressObserverState,
}                           from './internal-press-observer-client-hook.js'

// Reusable-ui states:
import {
    // Types:
    type ObservableStateDefinition,
    
    
    
    // Hooks:
    useResolvedObservableState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.
import {
    // Hooks:
    useFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.
import {
    useResolvedDisabled,
}                           from '@reusable-ui/disabled-state'      // Adds enabled/disabled functionality to UI components, with transition animations and semantic styling hooks.



/** The observable state definition for press/release state management. */
const observableStateDefinition : ObservableStateDefinition<boolean, 'auto'> = {
    defaultState         : defaultDeclarativePressed,
    inactiveState        : false, // `false`: the value of un-press state
    observableStateToken : 'auto',
};

/**
 * Resolves the current press/release state.
 * 
 * Useful for derived components that need to determine whether the base component is pressed or released.
 * 
 * The resolved press state **should** be forwarded to the base component via the `pressed` prop,
 * allowing the base component to rely on the derived component for press and release handling
 * without observing the press state itself.
 * 
 * Unlike `usePressState()`, which handles animation and lifecycle,
 * `useResolvedPressed()` performs a lightweight resolution of the effective press value.
 * 
 * - No internal state or uncontrolled fallback.
 * - `'auto'` is treated as a declarative diagnostic mode.
 * - Ideal for components that **consume** the resolved `pressed` state.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `pressed` value and derived `computedPress` value.
 * @param options - An optional configuration for customizing press/release behavior.
 * @returns The resolved press/release state and event handlers for pointer and keyboard events.
 */
export const useResolvedPressed = <TElement extends Element = HTMLElement>(props: Pick<PressStateProps, 'pressed' | 'computedPress'>, options?: Pick<PressStateOptions, 'defaultPressed' | 'pressKeys' | 'clickKeys' | 'triggerClickOnKeyUp' | 'pressButtons' | 'pressPressure' | 'pressFingers' | 'noGlobalPointerRelease' | 'noGlobalKeyRelease'>) : Pick<PressState<TElement>, 'pressed' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel' | 'handleKeyDown' | 'handleKeyUp'> => {
    // Extract options:
    const {
        defaultPressed : defaultState,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        pressed       : state                 = defaultDeclarativePressed,
        computedPress : externalComputedPress,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is in a restricted state (interaction blocked):
    const isRestricted         = useResolvedDisabled(props as Parameters<typeof useResolvedDisabled>[0]);
    
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
    } = usePressObserverState<TElement>({
        isControlled : isExplicitValue || isExternallyComputed,
        isRestricted,
    }, options);
    
    // Merge external and internal observation:
    const observedState = isExternallyComputed ? externalComputedPress : observedPress;
    
    
    
    // Resolve effective press state:
    const pressed = useResolvedObservableState<boolean, 'auto'>(
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
    } satisfies Pick<PressState<TElement>, 'pressed' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel' | 'handleKeyDown' | 'handleKeyUp'>;
};



/** The behavior state definition for press/release state management. */
const pressStateDefinition : PressStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['pressing', 'releasing'],       // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolvePressTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolvePressTransitionClassname, // Resolves classnames.
    triggerTransitionEvent     : triggerPressPhaseEvents,         // Triggers lifecycle events.
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
 * @returns The resolved press/release state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useState, useEffect } from 'react';
 * import {
 *     usePressState,
 *     PressStateProps,
 * } from '@reusable-ui/press-state';
 * import styles from './CustomButton.module.css';
 * 
 * export interface CustomButtonProps extends
 *     PressStateProps
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
 *     } = usePressState({
 *         computedPress,
 *         ...restProps,
 *     }, {
 *         defaultPressed    : 'auto',                    // Defaults to diagnostic mode.
 *         animationPattern  : ['pressing', 'releasing'], // Matches animation names ending with 'pressing' or 'releasing'.
 *         bubblingAnimation : false,                     // Ignores bubbling animation events from children.
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
export const usePressState = <TElement extends Element = HTMLElement>(props: PressStateProps, options?: PressStateOptions): PressState<TElement> => {
    // Extract props:
    const {
        onPressUpdate : onStateUpdate,
        
        onPressingStart,
        onPressingEnd,
        onReleasingStart,
        onReleasingEnd,
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
    } = useResolvedPressed<TElement>(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : pressed,
        actualState         : actualPressed,
        transitionPhase     : pressPhase,
        transitionClassname : pressClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean,
        PressPhase,
        PressClassname,
        
        PressStateProps,
        PressStateOptions,
        PressStateDefinition,
        
        TElement
    >(
        // Props:
        {
            effectiveState,
            onStateUpdate,
            
            ...({
                onPressingStart,
                onPressingEnd,
                onReleasingStart,
                onReleasingEnd,
            } as {}),
        },
        
        // Options:
        options,
        
        // Definition:
        pressStateDefinition,
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
    } satisfies PressState<TElement>;
};
