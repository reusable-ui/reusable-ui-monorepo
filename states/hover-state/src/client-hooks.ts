'use client' // The exported hooks are client side only.

// Types:
import {
    type HoverStateProps,
    type HoverStateOptions,
    type HoverPhase,
    type HoverClassname,
    type HoverState,
}                           from './types.js'
import {
    type HoverStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeHovered,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveHoverTransitionPhase,
    resolveHoverTransitionClassname,
    triggerHoverPhaseEvents,
}                           from './internal-utilities.js'

// Hooks:
import {
    useHoverObserverState,
}                           from './internal-hover-observer-client-hook.js'

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
    useResolvedDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/** The observable state definition for hover/unhover state management. */
const observableStateDefinition : ObservableStateDefinition<boolean, 'auto'> = {
    defaultState         : defaultDeclarativeHovered,
    inactiveState        : false, // `false`: the value of un-hover state
    observableStateToken : 'auto',
};

/**
 * Resolves the current hovered/unhovered state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `hovered` state and **forward** it to a base component.
 * 
 * Unlike `useHoverState()`, which handles animation and lifecycle,
 * `useResolvedHoverState()` performs a lightweight resolution of the effective hover value.
 * 
 * - No internal state or uncontrolled fallback.
 * - `'auto'` is treated as a declarative diagnostic mode.
 * - Ideal for components that **consume** the resolved `hovered` state.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `hovered` value and derived `computedHover` value.
 * @param options - An optional configuration for customizing hover/unhover behavior.
 * @returns The resolved hovered/unhovered state and event handlers for mouseenter/mouseleave events.
 */
export const useResolvedHoverState = <TElement extends Element = HTMLElement>(props: HoverStateProps, options?: Pick<HoverStateOptions, 'defaultHovered'>) : Pick<HoverState<TElement>, 'hovered' | 'ref' | 'handleMouseEnter' | 'handleMouseLeave'> => {
    // Extract options:
    const {
        defaultHovered : defaultState,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        hovered       : state                 = defaultDeclarativeHovered,
        computedHover : externalComputedHover,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is in a restricted state (interaction blocked):
    const isRestricted         = useResolvedDisabledState(props as Parameters<typeof useResolvedDisabledState>[0]);
    
    // Determine control mode:
    const isExplicitValue      = (state !== 'auto');
    
    // Determine the source of `computedHover`:
    const isExternallyComputed = (externalComputedHover !== undefined);
    
    // Internal hover observer (used only when uncontrolled and not delegated):
    const {
        observedHover,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } = useHoverObserverState<TElement>({
        isControlled : isExplicitValue || isExternallyComputed,
        isRestricted,
    });
    
    // Merge external and internal observation:
    const observedState = isExternallyComputed ? externalComputedHover : observedHover;
    
    // Resolve effective hovered state:
    const hovered = useResolvedObservableState<boolean, 'auto'>(
        // Props:
        { state, isRestricted, observedState },
        
        // Options:
        { defaultState },
        
        // Definition:
        observableStateDefinition,
    );
    
    
    
    // Return resolved hover state API:
    return {
        hovered,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } satisfies Pick<HoverState<TElement>, 'hovered' | 'ref' | 'handleMouseEnter' | 'handleMouseLeave'>;
};



/** The behavior state definition for hover/unhover state management. */
const hoverStateDefinition : HoverStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['hovering', 'unhovering'],      // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveHoverTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveHoverTransitionClassname, // Resolves classnames.
    triggerTransitionEvent     : triggerHoverPhaseEvents,         // Triggers lifecycle events.
};

/**
 * Resolves the hover state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled hover state, when `hovered` is set to `true` or `false`.
 * - Supports diagnostic mode, when `hovered` is set to `'auto'`, which derives the effective hover from `computedHover`.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `hovered` value, derived `computedHover` value, and `onHoverUpdate` callback.
 * @param options - An optional configuration for customizing hover/unhover behavior and animation lifecycle.
 * @returns The resolved hovered/unhovered state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useState, useEffect } from 'react';
 * import {
 *     useHoverState,
 *     HoverStateProps,
 * } from '@reusable-ui/hover-state';
 * import styles from './CustomCard.module.css';
 * 
 * export interface CustomCardProps extends
 *     HoverStateProps
 * {}
 * 
 * // A card with custom hover logic.
 * export const CustomCard: FC<CustomCardProps> = (props) => {
 *     const [internalComputedHover, setInternalComputedHover] = useState<boolean>(false);
 *     
 *     const {
 *         // Allows derived components to override the internal hover logic:
 *         computedHover : externalComputedHover,
 *         
 *         ...restProps,
 *     } = props;
 *     
 *     const isExternallyComputed = (externalComputedHover !== undefined);
 *     const computedHover        = isExternallyComputed ? externalComputedHover : internalComputedHover;
 *     
 *     useEffect(() => {
 *         if (isExternallyComputed) return;
 *         
 *         // Perform internal hover logic here:
 *         // setInternalComputedHover(true);
 *     }, [isExternallyComputed]);
 *     
 *     const {
 *         hovered,
 *         actualHovered,
 *         hoverPhase,
 *         hoverClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *         
 *         // Use these ref and handlers to use built-in hover observer when `computedHover` is not provided:
 *         ref,
 *         handleMouseEnter,
 *         handleMouseLeave,
 *     } = useHoverState({
 *         computedHover,
 *         ...restProps,
 *     }, {
 *         defaultHovered    : 'auto',                     // Defaults to diagnostic mode.
 *         animationPattern  : ['hovering', 'unhovering'], // Matches animation names ending with 'hovering' or 'unhovering'.
 *         animationBubbling : false,                      // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.card} ${hoverClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {hovered  && <p className={styles.hovered}>Hovered</p>}
 *             {!hovered && <p className={styles.unhovered}>Unhovered</p>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useHoverState = <TElement extends Element = HTMLElement>(props: HoverStateProps, options?: HoverStateOptions): HoverState<TElement> => {
    // Extract props:
    const {
        onHoverUpdate : onStateUpdate,
        
        onHoveringStart,
        onHoveringEnd,
        onUnhoveringStart,
        onUnhoveringEnd,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective hover state:
    const {
        hovered: effectiveState,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } = useResolvedHoverState<TElement>(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : hovered,
        actualState         : actualHovered,
        transitionPhase     : hoverPhase,
        transitionClassname : hoverClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean,
        HoverPhase,
        HoverClassname,
        
        HoverStateProps,
        HoverStateOptions,
        HoverStateDefinition,
        
        TElement
    >(
        // Props:
        {
            effectiveState,
            onStateUpdate,
            
            ...({
                onHoveringStart,
                onHoveringEnd,
                onUnhoveringStart,
                onUnhoveringEnd,
            } as {}),
        },
        
        // Options:
        options,
        
        // Definition:
        hoverStateDefinition,
    );
    
    
    
    // Return resolved hover state API:
    return {
        hovered,
        actualHovered,
        hoverPhase,
        hoverClassname,
        ...animationHandlers,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } satisfies HoverState<TElement>;
};
