// Types:
/**
 * A tuple representing:
 * - A focusable element found within a container.
 * - Its nearest focusable ancestor within that container, or `null` if no such ancestor exists.
 * 
 * Used to establish focus group context for tabIndex-based sorting and traversal.
 */
export type GroupedFocusable = readonly [Element, Element | null]

/**
 * Represents a focusable DOM element with hierarchical group structure.
 */
export type ElementGroup = {
    /**
     * The DOM element participating in focus navigation.
     */
    element  : Element
    
    /**
     * The element’s tabIndex, used to order it within its group.
     */
    tabIndex : number
    
    /**
     * Child elements that are grouped under this element in the focus hierarchy.
     */
    children : ElementGroup[]
}



/**
 * Determines whether the given element is inside an inert region.
 * Traverses up the DOM tree to check if any ancestor has the 'inert' attribute.
 * 
 * @param {HTMLElement} element - The element to test.
 * @returns {boolean} True if the element or any of its ancestors is inert.
 */
export const isInertedElement = (element: HTMLElement): boolean => {
    // Step 1: Start at the element and walk up toward the root:
    let currentElement: HTMLElement | null = element;
    
    
    
    // Step 2: Ascend the DOM tree until the root is reached:
    while (currentElement) {
        // Step 3: If current element is inert, the subtree is inert, return it:
        if (currentElement.hasAttribute('inert')) return true;
        
        
        
        // Step 4: Otherwise, continue climbing upward:
        currentElement = currentElement.parentElement;
    } // while
    
    
    
    // Step 5: No inert ancestor found — the element is not inerted:
    return false;
};



/**
 * Finds the nearest focusable ancestor of a given element that is also in a set of known focusable ancestors.
 * 
 * Traverses from the given element’s parent upward, stopping if:
 * - A known focusable ancestor is found (returns it), or
 * - The container boundary is reached (returns null).
 * 
 * @param {Element} element - The element whose ancestors are being inspected.
 * @param {Element} container - The boundary container — traversal halts here.
 * @param {Set<Element>} knownFocusableAncestors - A set of known focusable ancestors to match against.
 * @returns {Element | null} The nearest matching focusable ancestor, or null if none is found.
 */
export const findNearestFocusableAncestor = (element: Element, container: Element, knownFocusableAncestors: Set<Element>): Element | null => {
    // Step 1: Start at the element’s immediate parent and walk up toward the container:
    let currentParent: Element | null = element.parentElement;
    
    
    
    // Step 2: Ascend the DOM tree until the container is reached:
    while (currentParent && (currentParent !== container)) {
        // Step 3: If this ancestor is itself a known focusable ancestor, return it:
        if (knownFocusableAncestors.has(currentParent)) return currentParent;
        
        
        
        // Step 4: Otherwise, continue climbing upward:
        currentParent = currentParent.parentElement;
    } // while
    
    
    
    // Step 5: If traversal reaches here, no focusable ancestor was found:
    return null;
};



/**
 * Computes a flat, tabIndex-sorted list of focusable elements, grouped by their nearest focusable ancestor.
 * 
 * @param {GroupedFocusable[]} allEntries - A complete list of [focusable element, nearest group ancestor] pairs to resolve children from.
 * @returns {Element[]} A flat list of focusable elements ordered by group-aware `tabIndex` traversal.
 */
export const computeFocusableOrder = (allEntries: GroupedFocusable[]): Element[] => {
    /*
        Example: initial input with metadata (format: [id, tabIndex, group]):
        [ 'edit',      2, undefined ]
        [ 'quantity',  1, undefined ]
        [ 'decrement', 2, 'quantity' ]
        [ 'input',     1, 'quantity' ]
        [ 'increment', 3, 'quantity' ]
        [ 'delete',    3, undefined ]
        [ 'cancel',    4, undefined ]
        
        
        
        Step 1–2: Extract root groups (elements with no group or self-grouped):
        1. [ 'edit',     2, undefined ], children: []
        2. [ 'quantity', 1, undefined ], children: []
        
        
        
        Step 3–5: Attach children to their registered group roots:
        1. [ 'edit',     2, undefined ], children: []
        2. [ 'quantity', 1, undefined ], children:
            3. [ 'decrement', 2, 'quantity' ], children: []
            4. [ 'input',     1, 'quantity' ], children: []
            5. [ 'increment', 3, 'quantity' ], children: []
        
        
        
        Step 6–7: Handle remaining group roots and ungrouped elements:
        6. [ 'delete', 3, undefined ], children: []
        7. [ 'cancel', 4, undefined ], children: []
        
        
        
        Step 8: Sort each group (and subgroup) by tabIndex:
        2. [ 'quantity', 1, undefined ], children:
            4. [ 'input',     1, 'quantity' ], children: []
            3. [ 'decrement', 2, 'quantity' ], children: []
            5. [ 'increment', 3, 'quantity' ], children: []
        1. [ 'edit',     2, undefined ], children: []
        6. [ 'delete',   3, undefined ], children: []
        7. [ 'cancel',   4, undefined ], children: []
        
        
        
        Step 9: Flatten the structure and remove metadata:
        'quantity'
        'input'
        'decrement'
        'increment'
        'edit'
        'delete'
        'cancel'
    */
    
    
    
    // Step 1: Build the group hierarchy starting from ungrouped root elements:
    const rootGroups : ElementGroup[] = [];
    const rootEntries = allEntries.filter(([, group]) => group === null);
    buildGroupHierarchy(rootEntries, allEntries, rootGroups);
    
    
    
    // Step 2: Recursively flatten the structure into linear tab order:
    const flattenedElements : Element[] = [];
    flattenGroupedElements(rootGroups, flattenedElements);
    
    
    
    // Return the flattened elements:
    return flattenedElements;
};

/**
 * Recursively constructs a tree of grouped focusable elements.
 * 
 * @param {GroupedFocusable[]} currentLevel - Focusable elements to process at the current depth of the DOM grouping tree.
 * @param {GroupedFocusable[]} allEntries - A complete list of [focusable element, nearest group ancestor] pairs to resolve children from.
 * @param {ElementGroup[]} groupNodes - The output array representing the current tree level.
 */
const buildGroupHierarchy = (currentLevel: GroupedFocusable[], allEntries: GroupedFocusable[], groupNodes: ElementGroup[]): void => {
    // Loop through each element at the current level:
    for (const [element] of currentLevel) {
        // Create a new group node for this element:
        const node : ElementGroup = {
            element,
            tabIndex : (element as HTMLElement | SVGElement).tabIndex ?? 0,
            children : [],
        };
        
        
        
        // Add the current node to the group nodes:
        groupNodes.push(node);
        
        
        
        // Find elements that are grouped under this element:
        const directChildren = allEntries.filter(([, group]) => group === element);
        
        
        
        // If there are children, recursively build their hierarchy:
        if (directChildren.length) buildGroupHierarchy(directChildren, allEntries, node.children);
    } // for
    
    
    
    // Sort at the current level by tabIndex before returning:
    groupNodes.sort((a, b) => a.tabIndex - b.tabIndex);
};

/**
 * Recursively flattens a hierarchical list of grouped elements into a linear focus order.
 * 
 * @param {ElementGroup[]} currentLevel - Tree nodes to traverse at the current depth of the focus hierarchy.
 * @param {Element[]} flattenedElements - The output array to populate in traversal order.
 */
const flattenGroupedElements = (currentLevel: ElementGroup[], flattenedElements: Element[]): void => {
    // Loop through each element at the current level:
    for (const { element, children } of currentLevel) {
        // Add the current element to the flattened list:
        flattenedElements.push(element);
        
        
        
        // If this element has children, recursively flatten them:
        if (children.length) flattenGroupedElements(children, flattenedElements);
    } // for
};
