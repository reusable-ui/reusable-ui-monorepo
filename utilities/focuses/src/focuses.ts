// Utilities:
import {
    // Types:
    type GroupedFocusable,
    
    
    
    // Utilities:
    isInertedElement,
    findNearestFocusableAncestor,
    computeFocusableOrder,
}                           from './internal-utilities.js'



/**
 * Gets all focusable elements within a container,
 * grouped by their nearest focusable ancestor and sorted by `tabIndex` within each group.
 * 
 * 📌 Grouping Logic:
 * - Each focusable element is assigned to the nearest focusable ancestor.
 * - Focusable ancestors act as group roots.
 * - Non-focusable containers (e.g., divs without tabIndex) do not form groups.
 * 
 * 🔢 Sorting Logic:
 * - Elements inside a group are ordered by their `tabIndex`.
 * - Groups are traversed recursively and flattened into a linear sequence.
 * - Overall DOM position is preserved between different group roots.
 * 
 * 🎯 Example Structure:
 *   (●) = assigned tabIndex
 * 
 * ```txt
 *   ┌────────────────────────────────────────────────┐
 *   │  <ul tabIndex="0">                             │ ← focusable root container
 *   │  ├─ <li>                                       │
 *   │  │   └─ (●2) <button>: "Edit"                  │ ← group root
 *   │  ├─ <li>                                       │
 *   │  │   └─ (●1) <div tabIndex="1">: "Quantity"    │ ← group root
 *   │  │       └─ <div>                              │ ← not focusable, purely structural
 *   │  │           ├─ (●2) <button>: "-"             │
 *   │  │           ├─ (●1) <input type="number" />   │
 *   │  │           └─ (●3) <button>: "+"             │
 *   │  ├─ <li>                                       │
 *   │  │   └─ (●3) <button>: "Delete"                │ ← group root
 *   │  └─ <li>                                       │
 *   │      └─ (●4) <button>: "Cancel"                │ ← group root
 *   └────────────────────────────────────────────────┘
 * ```
 * 
 * ✅ Final focus order (flattened):
 *   - "Quantity" group (tabIndex: 1)
 *     - └─ input (tabIndex: 1)
 *     - └─ [-]   (tabIndex: 2)
 *     - └─ [+]   (tabIndex: 3)
 *   - "Edit"     (tabIndex: 2)
 *   - "Delete"   (tabIndex: 3)
 *   - "Cancel"   (tabIndex: 4)
 * 
 * @param container The container to search for focusable elements.
 * @returns A flat list of focusable elements ordered by group-aware `tabIndex` traversal.
 */
export const getSortedFocusableElements = (container: Element): Element[] => {
    // Step 1: Collect all potential focusable elements within the container:
    const focusableElementCandidates = Array.from(container.querySelectorAll(
        (process.env.NODE_ENV === 'test')
        ?
`
    a:not([disabled]):not([aria-disabled]):not([aria-disabled="true"]):not([hidden]):not([aria-hidden]):not([aria-hidden="true"]),
    button:not([disabled]):not([aria-disabled]):not([aria-disabled="true"]):not([hidden]):not([aria-hidden]):not([aria-hidden="true"]),
    textarea:not([disabled]):not([aria-disabled]):not([aria-disabled="true"]):not([hidden]):not([aria-hidden]):not([aria-hidden="true"]),
    select:not([disabled]):not([aria-disabled]):not([aria-disabled="true"]):not([hidden]):not([aria-hidden]):not([aria-hidden="true"]),
    details:not([disabled]):not([aria-disabled]):not([aria-disabled="true"]):not([hidden]):not([aria-hidden]):not([aria-hidden="true"]),
    input:not([type="hidden"]):not([disabled]):not([aria-disabled]):not([aria-disabled="true"]):not([hidden]):not([aria-hidden]):not([aria-hidden="true"]),
    [tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-disabled]):not([aria-disabled="true"]):not([hidden]):not([aria-hidden]):not([aria-hidden="true"])
`
        :
`:is(
    a,
    button,
    textarea,
    select,
    details,
    input:not([type="hidden"]),
    [tabindex]:not([tabindex^="-"])
):not(
    :is(
        [disabled],
        :not([aria-disabled="false"])[aria-disabled],
        [hidden],
        :not([aria-hidden="false"])[aria-hidden]
    )
)`
    ));
    
    
    
    // Step 2: Filter out elements that are not visible or inerted:
    const focusableElements = (
        focusableElementCandidates
        .filter((element) => {
            const style = getComputedStyle(element);
            return (
                style.display !== 'none'
                &&
                style.visibility !== 'hidden'
                &&
                (!(element instanceof HTMLElement) || !isInertedElement(element)) // Exclude inerted elements.
            );
        })
    );
    
    
    
    // Step 3: Build a lookup set to accelerate ancestor detection:
    const focusableSet = new Set<Element>(focusableElements);
    
    
    
    // Step 4: Create pairs of each focusable element with its nearest focusable ancestor:
    const allEntries : GroupedFocusable[] = (
        focusableElements
        .map((focusableElement) => [
            focusableElement,
            findNearestFocusableAncestor(focusableElement, container, focusableSet),
        ] satisfies GroupedFocusable)
    );
    
    
    
    // Step 5: Sort and flatten based on group hierarchy and tabIndex:
    return computeFocusableOrder(allEntries);
};



// Absolute focusing:

/**
 * Attempts to focus the focusable element at the specified index within the given container.
 * 
 * @param container The container to search for focusable elements.
 * @param index The zero-based index of the element to focus. Negative values count from the end.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 */
export const focusElementAt = (container: Element, index: number): boolean => {
    // Retrieve all focusable elements within the container:
    const focusableElements = getSortedFocusableElements(container);
    
    
    
    // Determine the element at the given index (can be negative) to focus:
    const targetElement = focusableElements.at(index);
    
    
    
    // Ensure the element exists and supports focus:
    const focusFn = (targetElement as HTMLElement | SVGElement | undefined)?.focus;
    if (typeof focusFn !== 'function') return false;
    
    
    
    // Apply focus:
    focusFn.call(targetElement);
    return true;
};


/**
 * Attempts to focus the first focusable element within the given container.
 * 
 * @param container The container to search for focusable elements.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 */
export const focusFirstElement = (container: Element): boolean => {
    return focusElementAt(container, 0);
};


/**
 * Attempts to focus the last focusable element within the given container.
 * 
 * @param container The container to search for focusable elements.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 */
export const focusLastElement = (container: Element): boolean => {
    return focusElementAt(container, -1);
};



// Relative focusing:

/**
 * Attempts to focus the previous focusable element within the given container.
 * If no element is currently focused or the first is reached, wraps around to the last.
 * 
 * @param container The container to search for focusable elements.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 */
export const focusPrevElementOrWrapToLast = (container: Element): boolean => {
    // Retrieve all focusable elements within the container:
    const focusableElements = getSortedFocusableElements(container);
    
    
    
    // Get the index of currently focused element, if any:
    const currentElement = document.activeElement;
    const currentIndex = (
        currentElement
        ? focusableElements.indexOf(currentElement)
        : -1
    );
    
    
    
    // Determine the previous element to focus:
    const targetElement = (
        currentIndex >= 0
        
        // ⏮️ Move backward:
        ? focusableElements.at(currentIndex - 1) // If below-the-range => -1 => select the last element.
        
        // No focused element => starting from the last element:
        : focusableElements.at(-1)
    );
    
    
    
    // Ensure the element exists and supports focus:
    const focusFn = (targetElement as HTMLElement | SVGElement | undefined)?.focus;
    if (typeof focusFn !== 'function') return false;
    
    
    
    // Apply focus:
    focusFn.call(targetElement);
    return true;
};


/**
 * Attempts to focus the next focusable element within the given container.
 * If no element is currently focused or the last is reached, wraps around to the first.
 * 
 * @param container The container to search for focusable elements.
 * @returns `true` if an element was successfully focused, otherwise `false`.
 */
export const focusNextElementOrWrapToFirst = (container: Element): boolean => {
    // Retrieve all focusable elements within the container:
    const focusableElements = getSortedFocusableElements(container);
    
    
    
    // Get the index of currently focused element, if any:
    const currentElement = document.activeElement;
    const currentIndex = (
        currentElement
        ? focusableElements.indexOf(currentElement)
        : -1
    );
    
    
    
    // Determine the next element to focus:
    const targetElement = (
        currentIndex >= 0
        
        // Move forward ⏭️:
        ? focusableElements.at(currentIndex + 1) ?? focusableElements.at(0) // If above-the-range => undefined => select the first element.
        
        // No focused element => starting from the first element:
        : focusableElements.at(0)
    );
    
    
    
    // Ensure the element exists and supports focus:
    const focusFn = (targetElement as HTMLElement | SVGElement | undefined)?.focus;
    if (typeof focusFn !== 'function') return false;
    
    
    
    // Apply focus:
    focusFn.call(targetElement);
    return true;
};
