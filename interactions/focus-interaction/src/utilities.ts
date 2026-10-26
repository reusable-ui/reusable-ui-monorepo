// Types:
import {
    // Types:
    type FocusableEntry,
}                           from './internal-types.js'

// Utilities:
import {
    // Utilities:
    getFocusableElementCandidates,
    findNearestFocusableGroup,
    isInertedElement,
    sortFocusableElements,
}                           from './internal-utilities.js'



// Core query & resolution utilities:

/**
 * Retrieves all focusable elements within the specified focus scope,
 * ordered for logical keyboard navigation (`tab` sequence) and human-expected traversal.
 * 
 * 🧱 Example Focus Scope Structure:
 * 
 * ```txt
 *   ┌───────────────────────────────────────────────┐
 *   │  <ul tabIndex="0|-1">                         │ ← focus scope (can be focusable or purely structural)
 *   │  ├─ <li>                                      │
 *   │  │   └─ (●2) <button>: "Edit"                 │ ← focusable leaf
 *   │  ├─ <li>                                      │
 *   │  │   └─ (●1) <div tabIndex="1">: "Quantity"   │ ← focusable group
 *   │  │       └─ <div>                             │ ← not focusable, purely structural
 *   │  │           ├─ (●2) <button>: "-"            │ ← focusable leaf
 *   │  │           ├─ (●1) <input type="number" />  │ ← focusable leaf
 *   │  │           └─ (●3) <button>: "+"            │ ← focusable leaf
 *   │  ├─ <li>                                      │
 *   │  │   └─ (●3) <button>: "Delete"               │ ← focusable leaf
 *   │  └─ <li>                                      │
 *   │      └─ (●4) <button>: "Cancel"               │ ← focusable leaf
 *   └───────────────────────────────────────────────┘
 *   Note: (●) indicates assigned tabIndex.
 * ```
 * 
 * ✅ Final focus order (flattened):
 *   1. "Quantity" (tabIndex: 1)
 *   2.  └─ input  (tabIndex: 1.1)
 *   3.  └─ [-]    (tabIndex: 1.2)
 *   4.  └─ [+]    (tabIndex: 1.3)
 *   5. "Edit"     (tabIndex: 2)
 *   6. "Delete"   (tabIndex: 3)
 *   7. "Cancel"   (tabIndex: 4)
 * 
 * 🧠 Sorting Behaviors:
 * - **Specificity-Based Sorting:** Tab indexes follow a hierarchical specificity pattern
 *   across nesting depths (e.g., `grandParent.parent.child`), ensuring nested group
 *   priorities are fully resolved before advancing to outer sibling groups.
 * - **Smart Filtering:** Automatically excludes hidden, disabled, `aria-hidden`,
 *   and `inert` elements (including inherited inertness).
 * 
 * 🧩 Terminology:
 * - **Focus Scope:** The boundary/working area (e.g., menus, modals, or composite widgets) where focus actions are scoped.
 * - **Focusable Group:** A focusable element that contains nested focusable children (either direct or indirect).
 * - **Focusable Leaf:** A focusable element with no nested focusable children.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @returns A flat array of focusable elements ordered for human-expected traversal.
 */
export const getFocusableElements = (focusScope: Element): Element[] => {
    // Step 1: Collect all potential focusable element candidates within the specified focus scope:
    const focusableElementCandidates = getFocusableElementCandidates(focusScope);
    
    
    
    // Step 2: Filter out inaccessible, hidden, or inert elements:
    const focusableElements = focusableElementCandidates.filter((element) => {
        const style = getComputedStyle(element);
        return (
            (style.display !== 'none')
            &&
            (style.visibility !== 'hidden')
            &&
            (!(element instanceof HTMLElement) || !isInertedElement(element))
        );
    });
    
    
    
    // Step 3: Build a lookup set to accelerate ancestor detection:
    const focusableSet = new Set<Element>(focusableElements);
    
    
    
    // Step 4: Map each focusable element to its nearest focusable group:
    const allEntries: FocusableEntry[] = focusableElements.map((focusableElement) => ({
        element        : focusableElement,
        focusableGroup : findNearestFocusableGroup(focusableElement, focusScope, focusableSet),
    } satisfies FocusableEntry));
    
    
    
    // Step 5: Sort and flatten based on group hierarchy and tabIndex specificity:
    return sortFocusableElements(allEntries);
};

/**
 * Attempts to focus the focusable element within the specified focus scope
 * using a custom resolution logic.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @param resolver A callback function that receives the sorted focusable elements and returns the target element to focus, or `null`/`undefined`.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 * 
 * @remarks
 * #### 🎯 Focus Order
 * 
 * Element traversal order is governed by specificity-based `tabIndex` sorting
 * (e.g., `grandParent.parent.child`),
 * meaning the sequence follows logical grouping and priority rather than raw DOM order.
 * 
 * Developers are responsible for setting appropriate `tabIndex` values
 * to achieve an intuitive, human-expected navigation flow.
 * For detailed information on how this hierarchy and sorting behavior are achieved,
 * see {@link getFocusableElements}.
 */
export const focusElementUsing    = (focusScope: Element, resolver: (focusableElements: Element[]) => Element | null | undefined): boolean => {
    // Step 1: Retrieve all sorted focusable elements within the specified focus scope:
    const focusableElements = getFocusableElements(focusScope);
    if (focusableElements.length === 0) return false;
    
    
    
    // Step 2: Resolve the target element using the provided callback:
    const targetElement = resolver(focusableElements);
    if (!targetElement) return false;
    
    
    
    // Step 3: Ensure the element supports focus and invoke it:
    const focusFn = (targetElement as HTMLElement | SVGElement).focus;
    if (typeof focusFn !== 'function') return false;
    focusFn.call(targetElement);
    
    
    
    // Step 4: Report the success:
    return true;
};



// Targeted focusing utilities:

/**
 * Attempts to focus the focusable element at the specified index within the specified focus scope.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @param index The zero-based index of the element to focus. Negative values count backward from the end.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 * 
 * @remarks
 * #### 🎯 Focus Order
 * 
 * Element traversal order is governed by specificity-based `tabIndex` sorting
 * (e.g., `grandParent.parent.child`),
 * meaning the sequence follows logical grouping and priority rather than raw DOM order.
 * 
 * Developers are responsible for setting appropriate `tabIndex` values
 * to achieve an intuitive, human-expected navigation flow.
 * For detailed information on how this hierarchy and sorting behavior are achieved,
 * see {@link getFocusableElements}.
 */
export const focusElementAt       = (focusScope: Element, index: number): boolean => {
    return focusElementUsing(focusScope, (focusableElements) => focusableElements.at(index));
};

/**
 * Attempts to focus the first focusable element within the specified focus scope.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 * 
 * @remarks
 * #### 🎯 Focus Order
 * 
 * Element traversal order is governed by specificity-based `tabIndex` sorting
 * (e.g., `grandParent.parent.child`),
 * meaning the sequence follows logical grouping and priority rather than raw DOM order.
 * 
 * Developers are responsible for setting appropriate `tabIndex` values
 * to achieve an intuitive, human-expected navigation flow.
 * For detailed information on how this hierarchy and sorting behavior are achieved,
 * see {@link getFocusableElements}.
 */
export const focusFirstElement    = (focusScope: Element): boolean => {
    return focusElementAt(focusScope, 0);
};

/**
 * Attempts to focus the last focusable element within the specified focus scope.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 * 
 * @remarks
 * #### 🎯 Focus Order
 * 
 * Element traversal order is governed by specificity-based `tabIndex` sorting
 * (e.g., `grandParent.parent.child`),
 * meaning the sequence follows logical grouping and priority rather than raw DOM order.
 * 
 * Developers are responsible for setting appropriate `tabIndex` values
 * to achieve an intuitive, human-expected navigation flow.
 * For detailed information on how this hierarchy and sorting behavior are achieved,
 * see {@link getFocusableElements}.
 */
export const focusLastElement     = (focusScope: Element): boolean => {
    return focusElementAt(focusScope, -1);
};



// Relative focusing utilities:

/**
 * Attempts to move focus to the previous focusable element within the specified focus scope.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @param wrap Whether to wrap around to the last element if the beginning is reached or if nothing is focused. Defaults to `true`.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 * 
 * @remarks
 * #### 🎯 Focus Order
 * 
 * Element traversal order is governed by specificity-based `tabIndex` sorting
 * (e.g., `grandParent.parent.child`),
 * meaning the sequence follows logical grouping and priority rather than raw DOM order.
 * 
 * Developers are responsible for setting appropriate `tabIndex` values
 * to achieve an intuitive, human-expected navigation flow.
 * For detailed information on how this hierarchy and sorting behavior are achieved,
 * see {@link getFocusableElements}.
 */
export const focusPreviousElement = (focusScope: Element, wrap: boolean = true): boolean => {
    return focusElementUsing(focusScope, (focusableElements) => {
        // Get the index of the currently focused element, if any:
        const currentFocusedElement = document.activeElement;
        const currentFocusedIndex   = currentFocusedElement ? focusableElements.indexOf(currentFocusedElement) : -1;
        
        
        
        // Determine the previous element to focus based on the index and wrapping rules:
        if (currentFocusedIndex >= 0) {
            const prevFocusIndex = currentFocusedIndex - 1;
            if (prevFocusIndex >= 0) return focusableElements.at(prevFocusIndex);
        } // if
        if (wrap) return focusableElements.at(-1);
        
        
        
        return null;
    });
};

/**
 * Attempts to move focus to the next focusable element within the specified focus scope.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @param wrap Whether to wrap around to the first element if the end is reached or if nothing is focused. Defaults to `true`.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 * 
 * @remarks
 * #### 🎯 Focus Order
 * 
 * Element traversal order is governed by specificity-based `tabIndex` sorting
 * (e.g., `grandParent.parent.child`),
 * meaning the sequence follows logical grouping and priority rather than raw DOM order.
 * 
 * Developers are responsible for setting appropriate `tabIndex` values
 * to achieve an intuitive, human-expected navigation flow.
 * For detailed information on how this hierarchy and sorting behavior are achieved,
 * see {@link getFocusableElements}.
 */
export const focusNextElement     = (focusScope: Element, wrap: boolean = true): boolean => {
    return focusElementUsing(focusScope, (focusableElements) => {
        // Get the index of the currently focused element, if any:
        const currentFocusedElement = document.activeElement;
        const currentFocusedIndex   = currentFocusedElement ? focusableElements.indexOf(currentFocusedElement) : -1;
        
        
        
        // Determine the next element to focus based on the index and wrapping rules:
        if (currentFocusedIndex >= 0) {
            const nextFocusIndex = currentFocusedIndex + 1;
            if (nextFocusIndex < focusableElements.length) return focusableElements.at(nextFocusIndex);
        } // if
        if (wrap) return focusableElements.at(0);
        
        
        
        return null;
    });
};
