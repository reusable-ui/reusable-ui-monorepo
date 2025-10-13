'use client' // The exported `useFocusObserver()` hook is client side only.

// React:
import {
    // Types:
    type FocusEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
    useRef,
    useState,
}                           from 'react'

// Types:
import {
    type FocusBehaviorState,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * Observed focus state for uncontrolled components.
 * 
 * Provides a ref to the focusable element and imperative focus/blur handlers
 * for tracking focus presence when not explicitly controlled.
 * 
 * Includes fallback detection for pre-existing focus on mount,
 * ensuring lifecycle consistency during hydration or silent autofocus.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface FocusObserverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Pick<FocusBehaviorState<TElement>, 'ref' | 'handleFocus' | 'handleBlur'>
{
    /**
     * Observed focus presence.
     * 
     * Reflects whether the element is currently focused, based on event handlers
     * and initial mount detection (e.g. autoFocus or preserved focus).
     * Used only when the component is uncontrolled and not externally delegated.
     */
    observedFocus: boolean
}

/**
 * Hook for observing focus state in uncontrolled scenarios.
 * 
 * Detects initial focus on mount and updates internal state via
 * imperative focus/blur handlers. Skips updates when externally controlled.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param isExternallyControlled - Whether the focus state is externally controlled.
 * @returns The observed focus state, ref, and event handlers.
 */
export const useFocusObserver = <TElement extends Element = HTMLElement>(isExternallyControlled: boolean): FocusObserverState<TElement> => {
    // States and flags:
    
    // Ref to the focusable DOM element:
    const focusableElementRef = useRef<TElement | null>(null);
    
    // Internal fallback for observed focus (used only when uncontrolled):
    const [observedFocus, setObservedFocus] = useState<boolean>(false);
    
    
    
    // Initial mount effect: sync internal state if the element is already focused on mount.
    // Using `useLayoutEffect()` to ensure the check runs before browser paint,
    // preventing potential visual glitches if the element is already focused.
    useLayoutEffect(() => {
        const focusableElement = focusableElementRef.current;
        
        // Ignore if no element to observe:
        if (!focusableElement) return;
        
        // Ignore if the element is not focused:
        if (focusableElement !== document.activeElement) return;
        
        
        
        // Ensure internal state is in sync when the element is already focused on mount:
        setObservedFocus(true);
    }, []);
    
    
    
    // Imperative handlers for uncontrolled focus tracking:
    const handleFocus : FocusEventHandler<TElement> = useStableCallback(() => {
        // Ignore if externally controlled, avoiding unnecessary state updates:
        if (isExternallyControlled) return;
        
        
        
        // Set the focus state:
        setObservedFocus(true);
    });
    const handleBlur  : FocusEventHandler<TElement> = useStableCallback(() => {
        // Ignore if externally controlled, avoiding unnecessary state updates:
        if (isExternallyControlled) return;
        
        
        
        // Reset the focus state:
        setObservedFocus(false);
    });
    
    
    
    // Return the internal focus state API:
    return {
        observedFocus,
        ref : focusableElementRef,
        handleFocus,
        handleBlur,
    } satisfies FocusObserverState<TElement>;
};
