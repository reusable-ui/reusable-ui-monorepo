'use client' // The exported `useHoverObserver()` hook is client side only.

// React:
import {
    // Types:
    type MouseEventHandler,
}                           from 'react'

// Types:
import {
    type HoverBehaviorState,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Reusable-ui states:
import {
    useObserverState,
    type ObserverProps,
    type ObserverDefinition,
}                           from '@reusable-ui/observer-state'      // Observes a specific condition (typically a DOM interaction) and emits a resolved state whenever that condition changes.



/**
 * A selector used to detect whether an element or any of its descendants
 * are currently hovered for styling purposes.
 * 
 * This includes:
 * - Native `:hover` matches
 * - No need descendant matches via `:has(...)` as nested hover is inherently handled by `:hover`
 */
const hoverWithinSelector = ':hover';

// Define how the hover observer should behave:
const hoverObserverDefinition : ObserverDefinition<boolean, Element> = {
    inactiveState       : false,        // The default state when not hovered.
    restrictionBehavior : 'continuous', // Hover state may persist after restriction is lifted.
    getCurrentState     : (element) => element.matches(hoverWithinSelector),
};



/**
 * Props for the `useHoverObserverState()` hook.
 * 
 * Describes the current component condition for hover observation.
 */
export interface HoverObserverProps
    extends
        // Bases:
        ObserverProps
{
    /* no additional props yet - reserved for future extensions */
}

/**
 * An observed hover state for uncontrolled components.
 * 
 * Provides a ref to the hoverable element and imperative mouseenter/mouseleave handlers
 * for tracking hover presence when not explicitly controlled.
 * 
 * Includes fallback detection for pre-existing hover on mount,
 * ensuring lifecycle consistency during hydration or layout delay.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface HoverObserverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Pick<HoverBehaviorState<TElement>, 'ref' | 'handleMouseEnter' | 'handleMouseLeave'>
{
    /**
     * Observed hover presence.
     * 
     * Reflects whether the element is currently hovered, based on event handlers
     * and initial mount detection (e.g. pointer resting or layout overflow).
     * Used only when the component is uncontrolled and not externally delegated.
     */
    observedHover: boolean
}

/**
 * Observes hover state in uncontrolled scenarios.
 * 
 * Detects initial hover on mount and updates internal state via
 * imperative mouseenter/mouseleave handlers. Skips updates when externally controlled.
 * 
 * Restricted behavior:
 * - When restricted, the observer forces the hover state to unhovered (`false`),
 *   since restricted elements cannot be hovered.
 * - When re-enabled, immediately re-evaluates based on current pointer position and containment.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The hover observer props for describing the current component condition.
 * @returns The observed hover state, ref, and event handlers.
 */
export const useHoverObserverState = <TElement extends Element = HTMLElement>(props: HoverObserverProps): HoverObserverState<TElement> => {
    // Use the generic observer state hook with hover-specific definition:
    const {
        elementRef,
        observedState,
        safeUpdateState,
    } = useObserverState<boolean, TElement>(props, undefined, hoverObserverDefinition);
    
    
    
    // Event handlers:
    
    // Marks hover indicator as active when element is hovered:
    const handleMouseEnter : MouseEventHandler<TElement> = useStableCallback((event) => {
        safeUpdateState(event.currentTarget, true);
    });
    
    // Marks hover indicator as inactive when element is unhovered:
    const handleMouseLeave : MouseEventHandler<TElement> = useStableCallback((event) => {
        safeUpdateState(event.currentTarget, false);
    });
    
    
    
    // Return the observed hover indicator state and handlers for integration:
    return {
        observedHover : observedState,
        ref           : elementRef,
        handleMouseEnter,
        handleMouseLeave,
    } satisfies HoverObserverState<TElement>;
};
