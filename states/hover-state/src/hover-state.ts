'use client' // The exported hooks are client side only.

// Types:
import {
    type HoverStateProps,
    type HoverStateUpdateProps,
    type HoverStatePhaseEventProps,
    type HoverStateOptions,
    type HoverPhase,
    type HoverClassname,
    type HoverBehaviorState,
}                           from './types.js'
import {
    type HoverBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeHovered,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveHoverTransitionPhase,
    resolveHoverTransitionClassname,
}                           from './internal-utilities.js'

// Hooks:
import {
    useHoverObserver,
}                           from './hover-observer.js'

// Reusable-ui states:
import {
    // Hooks:
    useFeedbackBehaviorState,
    useFeedbackStatePhaseEvents,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.
import {
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/**
 * Resolves the current hovered/unhovered state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `hovered` state and **forward** it to a base component.
 * 
 * Unlike `useHoverBehaviorState()`, which handles animation and lifecycle,
 * `useHoverState()` performs a lightweight resolution of the effective hover value.
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
export const useHoverState = <TElement extends Element = HTMLElement>(props: HoverStateProps, options?: Pick<HoverStateOptions, 'defaultHovered'>) : Pick<HoverBehaviorState<TElement>, 'hovered' | 'ref' | 'handleMouseEnter' | 'handleMouseLeave'> => {
    // Extract options and assign defaults:
    const {
        defaultHovered    = defaultDeclarativeHovered,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        hovered       : controlledHovered     = defaultHovered,
        computedHover : externalComputedHover,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is in a restricted state (interaction blocked):
    const isRestricted          = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Determine control mode:
    const isExplicitValue       = (controlledHovered !== 'auto');
    
    // Determine the source of `computedHover`:
    const isExternallyComputed  = (externalComputedHover !== undefined);
    
    // Internal hover observer (used only when uncontrolled and not delegated):
    const {
        observedHover,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } = useHoverObserver<TElement>(isExplicitValue || isExternallyComputed, isRestricted);
    
    // Resolve effective `computedHover`:
    const resolvedComputedHover = isExternallyComputed ? externalComputedHover : observedHover;
    
    // Resolve hover state prior to applying the restricted guard:
    const resolvedHovered       = isExplicitValue ? controlledHovered : resolvedComputedHover;
    
    // Apply restricted guard — restriction always enforces unhover:
    const effectiveHovered      = !isRestricted && resolvedHovered;
    
    
    
    // Return resolved hover state API:
    return {
        hovered        : effectiveHovered,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } satisfies Pick<HoverBehaviorState<TElement>, 'hovered' | 'ref' | 'handleMouseEnter' | 'handleMouseLeave'>;
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
 *     useHoverBehaviorState,
 *     HoverStateProps,
 *     HoverStateUpdateProps,
 * } from '@reusable-ui/hover-state';
 * import styles from './CustomCard.module.css';
 * 
 * export interface CustomCardProps extends
 *     HoverStateProps,
 *     HoverStateUpdateProps // optional update reporting behavior
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
 *     } = useHoverBehaviorState({
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
export const useHoverBehaviorState = <TElement extends Element = HTMLElement>(props: HoverStateProps & HoverStateUpdateProps, options?: HoverStateOptions): HoverBehaviorState<TElement> => {
    // Extract props:
    const {
        onHoverUpdate : handleHoverUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective hover state:
    const {
        hovered: effectiveHovered,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } = useHoverState<TElement>(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : hovered,
        actualState         : actualHovered,
        transitionPhase     : hoverPhase,
        transitionClassname : hoverClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        HoverPhase,
        HoverClassname,
        
        HoverStateProps,
        HoverStateOptions,
        HoverBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState: effectiveHovered, onStateUpdate: handleHoverUpdate },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['hovering', 'unhovering'],      // Matches animation names for transitions.
            defaultAnimationBubbling   : false,
            resolveTransitionPhase     : resolveHoverTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveHoverTransitionClassname, // Resolves classnames.
        } satisfies HoverBehaviorStateDefinition,
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
    } satisfies HoverBehaviorState<TElement>;
};

/**
 * Emits lifecycle events in response to hover/unhover phase transitions.
 * 
 * This hook observes the resolved `hoverPhase` from `useHoverBehaviorState()` and triggers
 * the appropriate callbacks defined in `HoverStatePhaseEventProps`, such as:
 * 
 * - `onHoveringStart`
 * - `onHoveringEnd`
 * - `onUnhoveringStart`
 * - `onUnhoveringEnd`
 * 
 * @param {HoverStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {HoverPhase} hoverPhase - The current phase value returned from `useHoverBehaviorState()`.
 */
export const useHoverStatePhaseEvents = (props: HoverStatePhaseEventProps, hoverPhase: HoverPhase): void => {
    useFeedbackStatePhaseEvents(hoverPhase, (hoverPhase: HoverPhase): void => {
        switch (hoverPhase) {
            case 'hovering'   : props.onHoveringStart?.(hoverPhase, undefined);   break;
            case 'hovered'    : props.onHoveringEnd?.(hoverPhase, undefined);     break;
            case 'unhovering' : props.onUnhoveringStart?.(hoverPhase, undefined); break;
            case 'unhovered'  : props.onUnhoveringEnd?.(hoverPhase, undefined);   break;
        } // switch
    });
};
