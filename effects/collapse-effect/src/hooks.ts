'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type CSSProperties,
    
    
    
    // Hooks:
    useRef,
    useState,
    useLayoutEffect,
}                           from 'react'

// Types:
import {
    type CollapsibleSize,
}                           from './types.js'

// CSS Variables:
import {
    collapseEffectVars,
}                           from './css-variables.js'



/**
 * Supports for `usesCollapseEffect()` (the CSS styling effects) by supplying and continuously updating
 * the required sizing variables, injected into the component's inline style.
 * This ensures the collapse/expand styling effects work correctly.
 * 
 * Motivation:
 * - CSS alone cannot dynamically resolve `offsetInlineSize` / `offsetBlockSize`.
 * - This hook bridges that gap by measuring in JS (via `ResizeObserver`) and
 *   exposing the values as CSS variables.
 * 
 * @template TElement - The type of the collapsible DOM element.
 * @returns {CollapsibleSize<TElement>} - The API containing the element ref and inline style.
 * 
 * @example
 * ```tsx
 * const { ref, collapsibleStyle } = useCollapsibleSize();
 * 
 * return (
 *     <div ref={ref} style={collapsibleStyle}
 *         // ...
 *     >
 *         Collapsible content...
 *     </div>
 * );
 * ```
 */
export const useCollapsibleSize = <TElement extends HTMLElement = HTMLElement>(): CollapsibleSize<TElement> => {
    // Refs:
    
    // A ref to the collapsible DOM element being measured:
    const elementRef = useRef<TElement | null>(null);
    
    
    
    // States:
    
    // A state for holding the current CSS variables of the measured sizes:
    const [collapsibleStyle, setCollapsibleStyle] = useState<CSSProperties>({});
    
    
    
    // Live updates of the collapsible element size:
    // 
    // Why `useLayoutEffect` instead of `useEffect`?
    // - Runs synchronously before the browser paints.
    // - Ensures measurements are updated before transitions occur.
    useLayoutEffect(() => {
        // Ensures the element is correctly mounted:
        const element = elementRef.current;
        if (!element) return;
        
        
        
        // Setup a ResizeObserver to watch for size changes:
        const resizeObserver = new ResizeObserver((entries) => {
            // Gets the measured sizes:
            const measuredSizes = entries[0]?.borderBoxSize?.[0];
            if (!measuredSizes) return;
            
            // Update CSS variables with the measured sizes:
            setCollapsibleStyle({
                [
                    collapseEffectVars.measuredInlineSize
                    .slice(4, -1) // fix: var(--customProp) => --customProp
                ]: `${measuredSizes.inlineSize}px`,
                
                [
                    collapseEffectVars.measuredBlockSize
                    .slice(4, -1) // fix: var(--customProp) => --customProp
                ]: `${measuredSizes.blockSize}px`,
            } satisfies CSSProperties);
        });
        
        // Observe the element's total size (including borders):
        resizeObserver.observe(element, { box: 'border-box' });
        
        
        
        // Cleanup observer on unmount:
        return resizeObserver.disconnect;
    }, []);
    
    
    
    // Return the collapse-effect API:
    return {
        ref : elementRef,
        collapsibleStyle,
    };
};
