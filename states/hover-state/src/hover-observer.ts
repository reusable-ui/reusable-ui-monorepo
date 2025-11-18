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
 * Restricted behavior:
 * - When restricted, the observer forces the hover state to leaved (`false`),
 *   since restricted elements cannot be hovered.
 * - When re-enabled, immediately re-evaluates based on current pointer position and containment.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param disabledUpdates - Whether to disable internal hover state updates (e.g. when externally controlled).
 * @param isRestricted - Whether the component is currently in a restricted state; enforces a leave override.
 * @returns The observed hover state, ref, and event handlers.
 */
export const useHoverObserver = <TElement extends Element = HTMLElement>(disabledUpdates: boolean, isRestricted: boolean): HoverObserverState<TElement> => {
    // States and flags:
    
    // Ref to the hoverable DOM element:
    const hoverableElementRef = useRef<TElement | null>(null);
    
    // Internal fallback for observed hover (used only when uncontrolled):
    const [observedHover, setObservedHover] = useState<boolean>(false);
    
    
    
    /**
     * Updates the internal hover state based on the current hover state of the given element.
     * 
     * - If `disabledUpdates` is true, the update will be skipped.
     * - If `newObservedHover` is not provided, it will be auto-detected using `.matches(hoverWithinSelector)`.
     * - If the new state matches the current `observedHover`, no update will occur.
     * 
     * @param hoverableElement - The DOM element to observe for hover state.
     * @param newObservedHover - Optional override for the detected hover state.
     */
    const handleHoverStateUpdate : (hoverableElement: TElement | null, newObservedHover?: boolean) => void = useStableCallback((hoverableElement, newObservedHover) => {
        // Skip if observer updates are disabled (controlled mode):
        if (disabledUpdates) return;
        
        // Skip update if no element to observe:
        if (!hoverableElement) return;
        
        // Auto-detect hover state if not provided:
        newObservedHover ??= hoverableElement.matches(hoverWithinSelector);
        
        // The code below is redundant as `:hover` inherently means the element is `:hover-within`,
        // so no additional verification is needed.
        // // If hovered, verify hover-within:
        // if (newObservedHover) {
        //     newObservedHover = hoverableElement.matches(hoverWithinSelector);
        // } // if
        
        // Skip update if state is unchanged:
        if (newObservedHover === observedHover) return;
        
        
        
        // Commit hover state update:
        setObservedHover(newObservedHover);
    });
    
    
    
    // Hover state refresh effect:
    // Ensures the internal hover state is synchronized when:
    // - The observer switches back to uncontrolled mode (`disabledUpdates` becomes false).
    // - The component transitions from restricted to unrestricted (`isRestricted` becomes false).
    //
    // For continuous hover behavior:
    // - The pointer position may legitimately remain over the element across restricted/unrestricted transitions.
    // - On re-enable or when returning to uncontrolled mode, the state should be recomputed
    //   from the actual DOM hover condition rather than reset to false.
    // 
    // Using `useLayoutEffect()` ensures the update runs before the browser paints,
    // preventing potential visual glitches if the element was hovered at mount or
    // during a restricted/unrestricted transition.
    useLayoutEffect(() => {
        // Skip if observer updates are disabled (controlled mode):
        if (disabledUpdates) return;
        
        // Skip if the component is restricted:
        if (isRestricted) return;
        
        
        
        // Refresh when re-enabled or observer toggles back to uncontrolled.
        // Let the observer recompute based on the current DOM hover state.
        handleHoverStateUpdate(hoverableElementRef.current);
    }, [disabledUpdates, isRestricted]);
    // Re-evaluates hover state only when `disabledUpdates` or `isRestricted` changes.
    // `handleHoverStateUpdate` is stable via useStableCallback, so it is safe to omit from deps.
    
    
    
    // Imperative handlers for uncontrolled hover tracking:
    const handleMouseEnter : MouseEventHandler<TElement> = useStableCallback((event) => {
        handleHoverStateUpdate(event.currentTarget, true);
    });
    const handleMouseLeave : MouseEventHandler<TElement> = useStableCallback((event) => {
        handleHoverStateUpdate(event.currentTarget, false);
    });
    
    
    
    // Return the internal hover state API:
    return {
        observedHover,
        ref : hoverableElementRef,
        handleMouseEnter,
        handleMouseLeave,
    } satisfies HoverObserverState<TElement>;
};
