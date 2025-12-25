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
    type FocusStateProps,
    type FocusStateUpdateProps,
    type FocusStatePhaseEventProps,
    type FocusStateOptions,
    type FocusPhase,
    type FocusClassname,
    type FocusBehaviorState,
}                           from './types.js'
import {
    type FocusBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeFocused,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveFocusTransitionPhase,
    resolveFocusTransitionClassname,
}                           from './internal-utilities.js'

// Hooks:
import {
    useFocusObserver,
}                           from './focus-observer.js'

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
import {
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/**
 * Resolves the current focused/blurred state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `focused` state and **forward** it to a base component.
 * 
 * Unlike `useFocusBehaviorState()`, which handles animation and lifecycle,
 * `useFocusState()` performs a lightweight resolution of the effective focus value.
 * 
 * - No internal state or uncontrolled fallback.
 * - `'auto'` is treated as a declarative diagnostic mode.
 * - Ideal for components that **consume** the resolved `focused` state.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `focused` value and derived `computedFocus` value.
 * @param options - An optional configuration for customizing focus/blur behavior.
 * @returns The resolved focused/blurred state and event handlers for focus/blur events.
 */
export const useFocusState = <TElement extends Element = HTMLElement>(props: FocusStateProps, options?: Pick<FocusStateOptions, 'defaultFocused'>) : Pick<FocusBehaviorState<TElement>, 'focused' | 'ref' | 'handleFocus' | 'handleBlur' | 'handleKeyDown'> => {
    // Extract options and assign defaults:
    const {
        defaultFocused    = defaultDeclarativeFocused,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        focused       : controlledFocused     = defaultFocused,
        computedFocus : externalComputedFocus,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is in a restricted state (interaction blocked):
    const isRestricted          = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Determine control mode:
    const isExplicitValue       = (controlledFocused !== 'auto');
    
    // Determine the source of `computedFocus`:
    const isExternallyComputed  = (externalComputedFocus !== undefined);
    
    // Internal focus observer (used only when uncontrolled and not delegated):
    const {
        observedFocus,
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } = useFocusObserver<TElement>(isExplicitValue || isExternallyComputed, isRestricted);
    
    // Resolve effective `computedFocus`:
    const resolvedComputedFocus = isExternallyComputed ? externalComputedFocus : observedFocus;
    
    // Resolve focus state prior to applying the restricted guard:
    const resolvedFocused       = isExplicitValue ? controlledFocused : resolvedComputedFocus;
    
    // Apply restricted guard — restriction always enforces blur:
    const effectiveFocused      = !isRestricted && resolvedFocused;
    
    
    
    // Return resolved focus state API:
    return {
        focused        : effectiveFocused,
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } satisfies Pick<FocusBehaviorState<TElement>, 'focused' | 'ref' | 'handleFocus' | 'handleBlur' | 'handleKeyDown'>;
};



/**
 * Resolves the focus state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled focus state, when `focused` is set to `true` or `false`.
 * - Supports diagnostic mode, when `focused` is set to `'auto'`, which derives the effective focus from `computedFocus`.
 * - Supports input-like styling behavior via `inputLikeFocus`, which forces a focus ring to appear when focused—mimicking native `<input>` semantics even on mouse click.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `focused` value, derived `computedFocus` value, and `onFocusUpdate` callback.
 * @param options - An optional configuration for customizing focus/blur behavior and animation lifecycle.
 * @returns The resolved focused/blurred state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useState, useEffect } from 'react';
 * import {
 *     useFocusBehaviorState,
 *     FocusStateProps,
 *     FocusStateUpdateProps,
 * } from '@reusable-ui/focus-state';
 * import styles from './CustomButton.module.css';
 * 
 * export interface CustomButtonProps extends
 *     FocusStateProps,
 *     FocusStateUpdateProps // optional update reporting behavior
 * {}
 * 
 * // A button with custom focus logic.
 * export const CustomButton: FC<CustomButtonProps> = (props) => {
 *     const [internalComputedFocus, setInternalComputedFocus] = useState<boolean>(false);
 *     
 *     const {
 *         // Allows derived components to override the internal focus logic:
 *         computedFocus : externalComputedFocus,
 *         
 *         ...restProps,
 *     } = props;
 *     
 *     const isExternallyComputed = (externalComputedFocus !== undefined);
 *     const computedFocus        = isExternallyComputed ? externalComputedFocus : internalComputedFocus;
 *     
 *     useEffect(() => {
 *         if (isExternallyComputed) return;
 *         
 *         // Perform internal focus logic here:
 *         // setInternalComputedFocus(true);
 *     }, [isExternallyComputed]);
 *     
 *     const {
 *         focused,
 *         actualFocused,
 *         focusPhase,
 *         focusClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *         
 *         // Use these ref and handlers to use built-in focus observer when `computedFocus` is not provided:
 *         ref,
 *         handleFocus,
 *         handleBlur,
 *         handleKeyDown,
 *     } = useFocusBehaviorState({
 *         computedFocus,
 *         ...restProps,
 *     }, {
 *         defaultFocused    : 'auto',                   // Defaults to diagnostic mode.
 *         inputLikeFocus    : false,                    // Disables input-like focus styling behavior.
 *         animationPattern  : ['focusing', 'blurring'], // Matches animation names ending with 'focusing' or 'blurring'.
 *         animationBubbling : false,                    // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.button} ${focusClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {focused  && <p className={styles.focused}>Focused</p>}
 *             {!focused && <p className={styles.blurred}>Blurred</p>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useFocusBehaviorState = <TElement extends Element = HTMLElement>(props: FocusStateProps & FocusStateUpdateProps, options?: FocusStateOptions): FocusBehaviorState<TElement> => {
    // Extract props:
    const {
        onFocusUpdate : handleFocusUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective focus state:
    const {
        focused: effectiveFocused,
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } = useFocusState<TElement>(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : focused,
        actualState         : actualFocused,
        transitionPhase     : focusPhase,
        transitionClassname : focusClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        FocusPhase,
        FocusClassname,
        
        FocusStateProps,
        FocusStateOptions,
        FocusBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { resolvedState: effectiveFocused, onStateUpdate: handleFocusUpdate },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['focusing', 'blurring'],        // Matches animation names for transitions.
            defaultAnimationBubbling   : false,
            resolveTransitionPhase     : resolveFocusTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveFocusTransitionClassname, // Resolves classnames.
        } satisfies FocusBehaviorStateDefinition,
    );
    
    
    
    // Return resolved focus state API:
    return {
        focused,
        actualFocused,
        focusPhase,
        focusClassname,
        ...animationHandlers,
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } satisfies FocusBehaviorState<TElement>;
};

/**
 * Emits lifecycle events in response to focus/blur phase transitions.
 * 
 * This hook observes the resolved `focusPhase` from `useFocusBehaviorState()` and triggers
 * the appropriate callbacks defined in `FocusStatePhaseEventProps`, such as:
 * 
 * - `onFocusingStart`
 * - `onFocusingEnd`
 * - `onBlurringStart`
 * - `onBlurringEnd`
 * 
 * @param {FocusStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {FocusPhase} focusPhase - The current phase value returned from `useFocusBehaviorState()`.
 */
export const useFocusStatePhaseEvents = (props: FocusStatePhaseEventProps, focusPhase: FocusPhase): void => {
    // Extract props:
    const {
        onFocusingStart,
        onFocusingEnd,
        onBlurringStart,
        onBlurringEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleFocusPhaseChange = useStableCallback((focusPhase: FocusPhase): void => {
        switch (focusPhase) {
            case 'focusing' : onFocusingStart?.(focusPhase, undefined); break;
            case 'focused'  : onFocusingEnd?.(focusPhase, undefined);   break;
            case 'blurring' : onBlurringStart?.(focusPhase, undefined); break;
            case 'blurred'  : onBlurringEnd?.(focusPhase, undefined);   break;
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
        
        Sequence on subsequent updates of `focusPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `focusPhase` updates.
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleFocusPhaseChange(focusPhase);
    }, [focusPhase]);
    
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
