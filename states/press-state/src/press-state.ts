'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useEffect,
    useLayoutEffect,
    useRef,
}                           from 'react'

// Types:
import {
    type PressStateProps,
    type PressStateUpdateProps,
    type PressStatePhaseEventProps,
    type PressStateOptions,
    type PressPhase,
    type PressBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativePressed,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolvePressPhase,
    getPressClassname,
}                           from './internal-utilities.js'

// Hooks:
import {
    usePressObserver,
}                           from './press-observer.js'

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
 * @returns The resolved pressed/released state and event handlers for pointerdown/pointerup/pointercancel events.
 */
export const usePressState = <TElement extends Element = HTMLElement>(props: PressStateProps, options?: Pick<PressStateOptions, 'defaultPressed'>) : Pick<PressBehaviorState<TElement>, 'pressed' | 'ref' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel'> => {
    // Extract options and assign defaults:
    const {
        defaultPressed    = defaultDeclarativePressed,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        pressed       : controlledPressed     = defaultPressed,
        computedPress : externalComputedPress,
    } = props;
    
    
    
    // States and flags:
    
    // Determine control mode:
    const isExplicitValue       = (controlledPressed !== 'auto');
    
    // Determine the source of `computedPress`:
    const isExternallyComputed  = (externalComputedPress !== undefined);
    
    // Internal press observer (used only when uncontrolled and not delegated):
    const {
        observedPress,
        ref,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
    } = usePressObserver<TElement>(isExplicitValue || isExternallyComputed);
    
    // Resolve effective `computedPress`:
    const resolvedComputedPress = isExternallyComputed ? externalComputedPress : observedPress;
    
    // Resolve effective press state:
    const effectivePressed      = isExplicitValue ? controlledPressed : resolvedComputedPress;
    
    
    
    // Return resolved press state API:
    return {
        pressed        : effectivePressed,
        ref,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
    } satisfies Pick<PressBehaviorState<TElement>, 'pressed' | 'ref' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel'>;
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
 *         // Use these ref and handlers to use built-in press observer when `computedPress` is not provided:
 *         ref,
 *         handlePointerDown,
 *         handlePointerUp,
 *         handlePointerCancel,
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
    // Extract options and assign defaults:
    const {
        defaultPressed    = defaultDeclarativePressed,
        animationPattern  = ['pressing', 'releasing'], // Matches animation names for transitions
        animationBubbling = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        pressed       : controlledPressed     = defaultPressed,
        computedPress : externalComputedPress,
        onPressUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Determine control mode:
    const isExplicitValue       = (controlledPressed !== 'auto');
    
    // Determine the source of `computedPress`:
    const isExternallyComputed  = (externalComputedPress !== undefined);
    
    // Internal press observer (used only when uncontrolled and not delegated):
    const {
        observedPress,
        ref,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
    } = usePressObserver<TElement>(isExplicitValue || isExternallyComputed);
    
    // Resolve effective `computedPress`:
    const resolvedComputedPress = isExternallyComputed ? externalComputedPress : observedPress;
    
    // Resolve effective press state:
    const effectivePressed      = isExplicitValue ? controlledPressed : resolvedComputedPress;
    
    // Internal animation lifecycle:
    const [internalPressed, setInternalPressed, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent : effectivePressed,
        animationPattern,
        animationBubbling,
    });
    
    // The current settled or animating press state.
    // During animation, this reflects the active target (`runningIntent`).
    // If no animation is active, it reflects the latest declared intent (`effectivePressed`), even if not yet committed.
    // This optimistic fallback ensures transition logic and styling remain in sync with declared transitions.
    // Deferred or discarded intents are never reflected here.
    const settledPressed        = runningIntent ?? effectivePressed;
    
    // Determine whether a transition toward the effective press state is currently in progress:
    const isTransitioning       = (
        // An in-flight animation is active toward a target press state:
        (runningIntent !== undefined)
        
        ||
        
        // An optimistic transition is pending: the intent has changed, but React has not yet re-rendered to reflect it.
        // This mismatch is expected and resolves once `setInternalPressed(effectivePressed)` takes effect.
        (internalPressed !== effectivePressed)
    );
    
    // Derive semantic phase from animation lifecycle:
    const pressPhase            = resolvePressPhase(settledPressed, isTransitioning); // 'pressed', 'released', 'pressing', 'releasing'
    
    
    
    // Sync animation state with effective press state:
    // Use `useLayoutEffect()` to ensure the intent is registered before the browser fires `animationstart`.
    // This guarantees the animation lifecycle handshake completes correctly.
    // The `useAnimationState()` hook internally treats missing animation events as immediately completed transitions.
    useLayoutEffect(() => {
        // The `setInternalPressed()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalPressed(effectivePressed);
        
        // Note: If `setInternalPressed()` is delayed (e.g. by React's render scheduler),
        // both `internalPressed` and `runningIntent` may remain stale temporarily.
        // This introduces a brief pre-transition ambiguity, safely handled by `isTransitioning` logic.
    }, [effectivePressed]);
    
    
    
    // A stable dispatcher for emitting press update events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handlePressUpdate = useStableCallback((currentPressed: boolean): void => {
        onPressUpdate?.(currentPressed, undefined);
    });
    
    
    
    // Observer effect: emits press update events on `effectivePressed` updates.
    // Use `useLayoutEffect()` to ensure the update is emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Emits press update events:
        handlePressUpdate(effectivePressed);
    }, [effectivePressed]);
    
    
    
    // Return resolved press state API:
    return {
        pressed        : settledPressed,   // Use `settledPressed` instead of `effectivePressed`, because during animation, the settled state reflects the visually committed press state.
        actualPressed  : effectivePressed, // Expose the actual effective state for advanced use cases.
        pressPhase,
        pressClassname : getPressClassname(pressPhase),
        ...animationHandlers,
        ref,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
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
    // Extract props:
    const {
        onPressingStart,
        onPressingEnd,
        onReleasingStart,
        onReleasingEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handlePressPhaseChange = useStableCallback((pressPhase: PressPhase): void => {
        switch (pressPhase) {
            case 'pressing'  : onPressingStart?.(pressPhase, undefined);  break;
            case 'pressed'   : onPressingEnd?.(pressPhase, undefined);    break;
            case 'releasing' : onReleasingStart?.(pressPhase, undefined); break;
            case 'released'  : onReleasingEnd?.(pressPhase, undefined);   break;
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
        
        Sequence on subsequent updates of `pressPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `pressPhase` updates.
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handlePressPhaseChange(pressPhase);
    }, [pressPhase]);
    
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
