'use client' // The exported `usePressObserver()` hook is client side only.

// React:
import {
    // Types:
    type PointerEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
    useRef,
    useState,
}                           from 'react'

// Types:
import {
    type PressBehaviorState,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * A selector used to detect whether an element or any of its descendants
 * are currently pressed for styling purposes.
 * 
 * This includes:
 * - Native `:active` matches
 * - No need descendant matches via `:has(...)` as nested press is inherently handled by `:active`
 */
const pressWithinSelector = ':active';



/**
 * An observed press state for uncontrolled components.
 * 
 * Provides a ref to the pressable element and imperative pointerdown/pointerup/pointercancel handlers
 * for tracking press presence when not explicitly controlled.
 * 
 * Includes fallback detection for pre-existing press on mount,
 * ensuring lifecycle consistency during hydration or layout delay.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface PressObserverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Pick<PressBehaviorState<TElement>, 'ref' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel'>
{
    /**
     * Observed press presence.
     * 
     * Reflects whether the element is currently pressed, based on event handlers
     * and initial mount detection (e.g. pointer resting or layout overflow).
     * Used only when the component is uncontrolled and not externally delegated.
     */
    observedPress: boolean
}

/**
 * Observes press state in uncontrolled scenarios.
 * 
 * Detects initial press on mount and updates internal state via
 * imperative pointerdown/pointerup/pointercancel handlers. Skips updates when externally controlled.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param isExternallyControlled - Whether the press state is externally controlled.
 * @returns The observed press state, ref, and event handlers.
 */
export const usePressObserver = <TElement extends Element = HTMLElement>(isExternallyControlled: boolean): PressObserverState<TElement> => {
    // States and flags:
    
    // Ref to the pressable DOM element:
    const pressableElementRef = useRef<TElement | null>(null);
    
    // Internal fallback for observed press (used only when uncontrolled):
    const [observedPress, setObservedPress] = useState<boolean>(false);
    
    
    
    // Initial mount effect: sync internal state if the element is already pressed on mount.
    // Using `useLayoutEffect()` to ensure the check runs before browser paint,
    // preventing potential visual glitches if the element is already pressed.
    useLayoutEffect(() => {
        const pressableElement = pressableElementRef.current;
        
        // Ignore if no element to observe:
        if (!pressableElement) return;
        
        // Check if the element or any of its descendants are currently pressed:
        const isPressWithin = pressableElement.matches(pressWithinSelector);
        
        // Ignore if not pressed:
        if (!isPressWithin) return;
        
        
        
        // Set the press state:
        setObservedPress(true);
    }, []);
    
    
    
    // Imperative handlers for uncontrolled press tracking:
    const handlePointerDown   : PointerEventHandler<TElement> = useStableCallback((event) => {
        // Ignore if externally controlled, avoiding unnecessary state updates:
        if (isExternallyControlled) return;
        
        // Ignore if already pressed:
        if (observedPress) return;
        
        // The code below is redundant as `pointerdown` inherently means the element is pressed:
        // // Check if the element or any of its descendants are currently pressed:
        // const isPressWithin = event.currentTarget.matches(pressWithinSelector);
        // 
        // // Ignore if not pressed:
        // if (!isPressWithin) return;
        
        
        
        // Set the press state:
        setObservedPress(true);
    });
    const handlePointerUp     : PointerEventHandler<TElement> = useStableCallback(() => {
        // Ignore if externally controlled, avoiding unnecessary state updates:
        if (isExternallyControlled) return;
        
        
        
        // Reset the press state:
        setObservedPress(false);
    });
    const handlePointerCancel : PointerEventHandler<TElement> = handlePointerUp; // Currently, pointercancel has the same effect as pointerup.
    
    
    
    // Return the internal press state API:
    return {
        observedPress,
        ref : pressableElementRef,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
    } satisfies PressObserverState<TElement>;
};
