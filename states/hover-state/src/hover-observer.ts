'use client' // The exported `useHoverObserver()` hook is client side only.

// React:
import {
    // Types:
    type MouseEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
    useRef,
    useState,
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



/**
 * A selector used to detect whether an element or any of its descendants
 * are currently hovered for styling purposes.
 * 
 * This includes:
 * - Native `:hover` matches
 * - No need descendant matches via `:has(...)` as nested hover is inherently handled by `:hover`
 */
const hoverWithinSelector = ':hover';



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
 * @template TElement - The type of the target DOM element.
 * 
 * @param disabledUpdates - Whether to disable internal hover state updates (e.g. when externally controlled).
 * @returns The observed hover state, ref, and event handlers.
 */
export const useHoverObserver = <TElement extends Element = HTMLElement>(disabledUpdates: boolean): HoverObserverState<TElement> => {
    // States and flags:
    
    // Ref to the hoverable DOM element:
    const hoverableElementRef = useRef<TElement | null>(null);
    
    // Internal fallback for observed hover (used only when uncontrolled):
    const [observedHover, setObservedHover] = useState<boolean>(false);
    
    
    
    // Initial mount effect: sync internal state if the element is already hovered on mount.
    // Using `useLayoutEffect()` to ensure the check runs before browser paint,
    // preventing potential visual glitches if the element is already hovered.
    useLayoutEffect(() => {
        //#region State update
        // Ignore if the state updates should be disabled:
        if (disabledUpdates) return;
        
        const hoverableElement = hoverableElementRef.current;
        
        // Ignore if no element to observe:
        if (!hoverableElement) return;
        
        // Check if the element or any of its descendants are currently hovered:
        const isHoverWithin = hoverableElement.matches(hoverWithinSelector);
        
        // Ignore if not hovered:
        if (!isHoverWithin) return;
        
        
        
        // Set the hover state:
        setObservedHover(true);
        //#endregion State update
    }, [disabledUpdates]);
    
    
    
    // Imperative handlers for uncontrolled hover tracking:
    const handleMouseEnter : MouseEventHandler<TElement> = useStableCallback((event) => {
        //#region State update
        // Ignore if the state updates should be disabled:
        if (disabledUpdates) return;
        
        // Ignore if already hovered:
        if (observedHover) return;
        
        // The code below is redundant as `mouseenter` inherently means the element is hovered:
        // // Check if the element or any of its descendants are currently hovered:
        // const isHoverWithin = event.currentTarget.matches(hoverWithinSelector);
        // 
        // // Ignore if not hovered:
        // if (!isHoverWithin) return;
        
        
        
        // Set the hover state:
        setObservedHover(true);
        //#endregion State update
    });
    const handleMouseLeave : MouseEventHandler<TElement> = useStableCallback(() => {
        //#region State update
        // Ignore if the state updates should be disabled:
        if (disabledUpdates) return;
        
        // Ignore if already leaved:
        if (!observedHover) return;
        
        
        
        // Reset the hover state:
        setObservedHover(false);
        //#endregion State update
    });
    
    
    
    // Return the internal hover state API:
    return {
        observedHover,
        ref : hoverableElementRef,
        handleMouseEnter,
        handleMouseLeave,
    } satisfies HoverObserverState<TElement>;
};
