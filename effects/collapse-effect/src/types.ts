// React:
import {
    // Types:
    type RefObject,
    type CSSProperties,
}                           from 'react'



/**
 * An API for supporting `usingCollapseEffect()` (the CSS styling effect) by supplying and continuously updating
 * the required dimension variables, injected into the component's inline style.
 * This ensures the expand/collapse transitions work correctly.
 * 
 * @template TElement The type of the collapsible DOM element.
 */
export interface CollapsibleDimensions<TElement extends HTMLElement = HTMLElement> {
    /**
     * Ref to the collapsible DOM element being measured.
     * 
     * Required for observing and reporting the element's total dimensions.
     */
    ref              : RefObject<TElement | null>
    
    /**
     * A set of inline CSS variables reflecting the element's current inline and block dimensions.
     * 
     * The returned style object is referentially stable as long as the measured dimensions remain unchanged.
     * This ensures predictable rendering behavior and avoids unnecessary re-renders in React.
     */
    collapsibleStyle : CSSProperties
}
