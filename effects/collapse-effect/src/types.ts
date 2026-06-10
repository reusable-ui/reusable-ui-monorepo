// React:
import {
    // Types:
    type RefObject,
    type CSSProperties,
}                           from 'react'



/**
 * An API for supporting `usingCollapseEffect()` (the CSS styling effects) by supplying and continuously updating
 * the required sizing variables, injected into the component's inline style.
 * This ensures the collapse/expand styling effects work correctly.
 * 
 * @template TElement - The type of the collapsible DOM element.
 */
export interface CollapsibleSize<TElement extends HTMLElement = HTMLElement> {
    /**
     * Ref to the collapsible DOM element being measured.
     * 
     * Required for observing and reporting the element's total size.
     */
    ref              : RefObject<TElement | null>
    
    /**
     * A set of inline CSS variables reflecting the element's current total size.
     * 
     * The returned style object is referentially stable as long as the measured size remains unchanged.
     * This ensures predictable rendering behavior and avoids unnecessary re-renders in React.
     */
    collapsibleStyle : CSSProperties
}
