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
    type HoverStateProps,
    type HoverStateUpdateProps,
    type HoverStatePhaseEventProps,
    type HoverStateOptions,
    type HoverPhase,
    type HoverBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeHovered,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveHoverPhase,
    getHoverClassname,
}                           from './internal-utilities.js'

// Hooks:
import {
    useHoverObserver,
}                           from './hover-observer.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Reusable-ui states:
import {
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/**
 * Resolves the current hovered/leaved state for a fully controlled component.
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
 * @param options - An optional configuration for customizing hover/leave behavior.
 * @returns The resolved hovered/leaved state and event handlers for mouseenter/mouseleave events.
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
    
    // Determine whether the component is disabled:
    const isDisabled            = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
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
    } = useHoverObserver<TElement>(isExplicitValue || isExternallyComputed, isDisabled);
    
    // Resolve effective `computedHover`:
    const resolvedComputedHover = isExternallyComputed ? externalComputedHover : observedHover;
    
    // Resolve hover state before disabled override:
    const resolvedHovered       = isExplicitValue ? controlledHovered : resolvedComputedHover;
    
    // Apply disabled override: disabled always forces leave:
    const effectiveHovered      = !isDisabled && resolvedHovered;
    
    
    
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
 * @param options - An optional configuration for customizing hover/leave behavior and animation lifecycle.
 * @returns The resolved hovered/leaved state, current transition phase, associated CSS class name, and animation event handlers.
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
 *         defaultHovered    : 'auto',                  // Defaults to diagnostic mode.
 *         animationPattern  : ['hovering', 'leaving'], // Matches animation names ending with 'hovering' or 'leaving'.
 *         animationBubbling : false,                   // Ignores bubbling animation events from children.
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
 *             {!hovered && <p className={styles.leaved}>Leaved</p>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useHoverBehaviorState = <TElement extends Element = HTMLElement>(props: HoverStateProps & HoverStateUpdateProps, options?: HoverStateOptions): HoverBehaviorState<TElement> => {
    // Extract options and assign defaults:
    const {
        defaultHovered    = defaultDeclarativeHovered,
        animationPattern  = ['hovering', 'leaving'], // Matches animation names for transitions
        animationBubbling = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        hovered       : controlledHovered     = defaultHovered,
        computedHover : externalComputedHover,
        onHoverUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Determine whether the component is disabled:
    const isDisabled            = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
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
    } = useHoverObserver<TElement>(isExplicitValue || isExternallyComputed, isDisabled);
    
    // Resolve effective `computedHover`:
    const resolvedComputedHover = isExternallyComputed ? externalComputedHover : observedHover;
    
    // Resolve hover state before disabled override:
    const resolvedHovered       = isExplicitValue ? controlledHovered : resolvedComputedHover;
    
    // Apply disabled override: disabled always forces leave:
    const effectiveHovered      = !isDisabled && resolvedHovered;
    
    // Internal animation lifecycle:
    const [internalHovered, setInternalHovered, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent : effectiveHovered,
        animationPattern,
        animationBubbling,
    });
    
    // The current settled or animating hover state.
    // During animation, this reflects the active target (`runningIntent`).
    // If no animation is active, it reflects the latest declared intent (`effectiveHovered`), even if not yet committed.
    // This optimistic fallback ensures transition logic and styling remain in sync with declared transitions.
    // Deferred or discarded intents are never reflected here.
    const settledHovered        = runningIntent ?? effectiveHovered;
    
    // Determine whether a transition toward the effective hover state is currently in progress:
    const isTransitioning       = (
        // An in-flight animation is active toward a target hover state:
        (runningIntent !== undefined)
        
        ||
        
        // An optimistic transition is pending: the intent has changed, but React has not yet re-rendered to reflect it.
        // This mismatch is expected and resolves once `setInternalHovered(effectiveHovered)` takes effect.
        (internalHovered !== effectiveHovered)
    );
    
    // Derive semantic phase from animation lifecycle:
    const hoverPhase            = resolveHoverPhase(settledHovered, isTransitioning); // 'hovered', 'leaved', 'hovering', 'leaving'
    
    
    
    // Sync animation state with effective hover state:
    // Use `useLayoutEffect()` to ensure the intent is registered before the browser fires `animationstart`.
    // This guarantees the animation lifecycle handshake completes correctly.
    // The `useAnimationState()` hook internally treats missing animation events as immediately completed transitions.
    useLayoutEffect(() => {
        // The `setInternalHovered()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalHovered(effectiveHovered);
        
        // Note: If `setInternalHovered()` is delayed (e.g. by React's render scheduler),
        // both `internalHovered` and `runningIntent` may remain stale temporarily.
        // This introduces a brief pre-transition ambiguity, safely handled by `isTransitioning` logic.
    }, [effectiveHovered]);
    
    
    
    // A stable dispatcher for emitting hover update events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleHoverUpdate = useStableCallback((currentHovered: boolean): void => {
        onHoverUpdate?.(currentHovered, undefined);
    });
    
    
    
    // Observer effect: emits hover update events on `effectiveHovered` updates.
    // Use `useLayoutEffect()` to ensure the update is emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Emits hover update events:
        handleHoverUpdate(effectiveHovered);
    }, [effectiveHovered]);
    
    
    
    // Return resolved hover state API:
    return {
        hovered        : settledHovered,   // Use `settledHovered` instead of `effectiveHovered`, because during animation, the settled state reflects the visually committed hover state.
        actualHovered  : effectiveHovered, // Expose the actual effective state for advanced use cases.
        hoverPhase,
        hoverClassname : getHoverClassname(hoverPhase),
        ...animationHandlers,
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } satisfies HoverBehaviorState<TElement>;
};

/**
 * Emits lifecycle events in response to hover/leave phase transitions.
 * 
 * This hook observes the resolved `hoverPhase` from `useHoverBehaviorState()` and triggers
 * the appropriate callbacks defined in `HoverStatePhaseEventProps`, such as:
 * 
 * - `onHoveringStart`
 * - `onHoveringEnd`
 * - `onLeavingStart`
 * - `onLeavingEnd`
 * 
 * @param {HoverStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {HoverPhase} hoverPhase - The current phase value returned from `useHoverBehaviorState()`.
 */
export const useHoverStatePhaseEvents = (props: HoverStatePhaseEventProps, hoverPhase: HoverPhase): void => {
    // Extract props:
    const {
        onHoveringStart,
        onHoveringEnd,
        onLeavingStart,
        onLeavingEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleHoverPhaseChange = useStableCallback((hoverPhase: HoverPhase): void => {
        switch (hoverPhase) {
            case 'hovering' : onHoveringStart?.(hoverPhase, undefined); break;
            case 'hovered'  : onHoveringEnd?.(hoverPhase, undefined);   break;
            case 'leaving'  : onLeavingStart?.(hoverPhase, undefined);  break;
            case 'leaved'   : onLeavingEnd?.(hoverPhase, undefined);    break;
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
        
        Sequence on subsequent updates of `hoverPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `hoverPhase` updates.
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleHoverPhaseChange(hoverPhase);
    }, [hoverPhase]);
    
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
