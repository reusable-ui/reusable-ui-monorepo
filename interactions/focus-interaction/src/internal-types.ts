/**
 * Represents a focusable element paired with its nearest focusable group element within the focus scope,
 * used for constructing a hierarchical focus tree.
 */
export interface FocusableEntry {
    /**
     * The target focusable element.
     */
    element        : Element
    
    /**
     * The nearest focusable group element within the focus scope,
     * or `null` if none exists.
     */
    focusableGroup : Element | null
}



/**
 * Represents a node in the virtual, focus-only tree,
 * used for sorting focusable elements by group hierarchy and tabIndex specificity.
 * 
 * The tree strips away non-focusable elements (like structural wrappers and text nodes)
 * to organize valid focusable elements into a clean traversal hierarchy.
 */
export interface FocusableNode {
    /**
     * The underlying focusable element.
     * 
     * Acts as a **Focusable Group** if it contains nested children,
     * or a **Focusable Leaf** if it has no children.
     */
    element  : Element
    
    /**
     * The computed tabIndex priority of the element.
     */
    tabIndex : number
    
    /**
     * Child focusable nodes nested within this element.
     */
    children : FocusableNode[]
}
