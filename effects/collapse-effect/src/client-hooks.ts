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
    type CollapsibleDimensions,
}                           from './types.js'

// CSS Variables:
import {
    collapseEffectVars,
}                           from './css-internal-variables.js'



/**
 * Supports for `usingCollapseEffect()` (the CSS styling effect) by supplying and continuously updating
 * the required dimension variables, injected into the component's inline style.
 * This ensures the expand/collapse transitions work correctly.
 * 
 * Motivation:
 * - CSS alone cannot dynamically resolve `offsetInlineSize` / `offsetBlockSize`.
 * - This hook bridges that gap by measuring in JS (via `ResizeObserver`) and
 *   exposing the values as CSS variables.
 * 
 * @template TElement The type of the collapsible DOM element.
 * @returns The API containing the element ref and inline style.
 * 
 * @example
 * ```tsx
 * const { ref, collapsibleStyle } = useCollapsibleDimensions();
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
export const useCollapsibleDimensions = <TElement extends HTMLElement = HTMLElement>(): CollapsibleDimensions<TElement> => {
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
        
        // Observe the element's total dimensions (including borders):
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
