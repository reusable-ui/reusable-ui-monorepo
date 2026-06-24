'use client' // The exported hooks are client side only.

// Types:
import {
    type FocusStateProps,
    type FocusStateOptions,
    type FocusPhase,
    type FocusClassname,
    type FocusState,
}                           from './types.js'
import {
    type FocusStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeFocused,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveFocusTransitionPhase,
    resolveFocusTransitionClassname,
    triggerFocusPhaseEvents,
}                           from './internal-utilities.js'

// Hooks:
import {
    useFocusObserverState,
}                           from './internal-focus-observer-client-hook.js'

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
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/** The observable state definition for focus/blur state management. */
const observableStateDefinition : ObservableStateDefinition<boolean, 'auto'> = {
    defaultState         : defaultDeclarativeFocused,
    inactiveState        : false, // `false`: the value of un-focus state
    observableStateToken : 'auto',
};

/**
 * Resolves the current focused/blurred state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `focused` state and **forward** it to a base component.
 * 
 * Unlike `useFocusState()`, which handles animation and lifecycle,
 * `useResolvedFocused()` performs a lightweight resolution of the effective focus value.
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
export const useResolvedFocused = <TElement extends Element = HTMLElement>(props: FocusStateProps, options?: Pick<FocusStateOptions, 'defaultFocused'>) : Pick<FocusState<TElement>, 'focused' | 'ref' | 'handleFocus' | 'handleBlur' | 'handleKeyDown'> => {
    // Extract options:
    const {
        defaultFocused : defaultState,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        focused       : state                 = defaultDeclarativeFocused,
        computedFocus : externalComputedFocus,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is in a restricted state (interaction blocked):
    const isRestricted         = useResolvedDisabled(props as Parameters<typeof useResolvedDisabled>[0]);
    
    // Determine control mode:
    const isExplicitValue      = (state !== 'auto');
    
    // Determine the source of `computedFocus`:
    const isExternallyComputed = (externalComputedFocus !== undefined);
    
    // Internal focus observer (used only when uncontrolled and not delegated):
    const {
        observedFocus,
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } = useFocusObserverState<TElement>({
        isControlled : isExplicitValue || isExternallyComputed,
        isRestricted,
    });
    
    // Merge external and internal observation:
    const observedState = isExternallyComputed ? externalComputedFocus : observedFocus;
    
    // Resolve effective focused state:
    const focused = useResolvedObservableState<boolean, 'auto'>(
        // Props:
        { state, isRestricted, observedState },
        
        // Options:
        { defaultState },
        
        // Definition:
        observableStateDefinition,
    );
    
    
    
    // Return resolved focus state API:
    return {
        focused,
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } satisfies Pick<FocusState<TElement>, 'focused' | 'ref' | 'handleFocus' | 'handleBlur' | 'handleKeyDown'>;
};



/** The behavior state definition for focus/blur state management. */
const focusStateDefinition : FocusStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['focusing', 'blurring'],        // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveFocusTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveFocusTransitionClassname, // Resolves classnames.
    triggerTransitionEvent     : triggerFocusPhaseEvents,         // Triggers lifecycle events.
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
 *     useFocusState,
 *     FocusStateProps,
 * } from '@reusable-ui/focus-state';
 * import styles from './CustomButton.module.css';
 * 
 * export interface CustomButtonProps extends
 *     FocusStateProps
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
 *     } = useFocusState({
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
export const useFocusState = <TElement extends Element = HTMLElement>(props: FocusStateProps, options?: FocusStateOptions): FocusState<TElement> => {
    // Extract props:
    const {
        onFocusUpdate : onStateUpdate,
        
        onFocusingStart,
        onFocusingEnd,
        onBlurringStart,
        onBlurringEnd,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective focus state:
    const {
        focused: effectiveState,
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } = useResolvedFocused<TElement>(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : focused,
        actualState         : actualFocused,
        transitionPhase     : focusPhase,
        transitionClassname : focusClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean,
        FocusPhase,
        FocusClassname,
        
        FocusStateProps,
        FocusStateOptions,
        FocusStateDefinition,
        
        TElement
    >(
        // Props:
        {
            effectiveState,
            onStateUpdate,
            
            ...({
                onFocusingStart,
                onFocusingEnd,
                onBlurringStart,
                onBlurringEnd,
            } as {}),
        },
        
        // Options:
        options,
        
        // Definition:
        focusStateDefinition,
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
    } satisfies FocusState<TElement>;
};
