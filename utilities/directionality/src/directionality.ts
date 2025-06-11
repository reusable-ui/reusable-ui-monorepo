// React:
import {
    // Types:
    type RefCallback,
    
    
    
    // Hooks:
    useState,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useIsomorphicLayoutEffect,
}                           from '@reusable-ui/lifecycles'      // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.



// Utilities:

/**
 * Determines if an element uses **right-to-left (RTL)** direction.
 * 
 * - Attaches a ref to the target element.
 * - Tracks RTL status and updates when the component re-renders.
 * - Defaults to `false` unless specified otherwise.
 *
 * @param {boolean} [defaultRtl=false] - The initial RTL state before detecting computed styles.
 * @returns {[boolean, RefCallback<TElement | null>]} A tuple containing the RTL status and a ref callback.
 */
export const useIsRtl = <TElement extends Element = HTMLElement>(defaultRtl: boolean = false): readonly [boolean, RefCallback<TElement | null>] => {
    // States:
    
    // Tracks the target element reference:
    const [targetElementRef, setTargetElementRef] = useState<TElement | null>(null);
    
    // Tracks whether the element is **right-to-left (RTL)**:
    const [isRtl, setIsRtl] = useState<boolean>(defaultRtl); // Defaults to provided value or `false`.
    
    
    
    // Effects:
    
    // Updates RTL status when the element reference changes:
    useIsomorphicLayoutEffect(() => {
        // Ensure the target element reference is valid:
        if (!targetElementRef) return;
        
        
        
        // Check the computed style of the target element to determine its direction:
        const newIsRtl = (getComputedStyle(targetElementRef).direction === 'rtl');
        
        // Update only if the value changes:
        if (isRtl === newIsRtl) return;
        
        // Update the RTL status:
        setIsRtl(newIsRtl);
    }, [targetElementRef]); // Runs when the element reference changes.
    
    
    
    // Returns a tuple containing the RTL status and a ref callback:
    return [isRtl, setTargetElementRef];
};
