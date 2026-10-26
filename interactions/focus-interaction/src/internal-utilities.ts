// Types:
import {
    // Types:
    type FocusableEntry,
    type FocusableNode,
}                           from './internal-types.js'



/**
 * Selects all potential focusable element candidates,
 * respecting standard accessibility and visibility rules.
 */
const focusableSelector: string = ( // eslint-disable-line css-selectors/enforce-selector-conventions
    /*
        Formatted selector expression:
        `:is(
            a[href],
            button,
            textarea,
            select,
            summary,
            input:not([type="hidden"]),
            [tabindex]:not([tabindex^="-"]),
            [contenteditable]:not([contenteditable="false"])
        ):not(
            [disabled],
            :not([aria-disabled="false"])[aria-disabled],
            [hidden],
            :not([aria-hidden="false"])[aria-hidden]
        )`
    */
    
    // Minified selector expression:
    ':is(a[href],button,textarea,select,summary,input:not([type="hidden"]),[tabindex]:not([tabindex^="-"]),[contenteditable]:not([contenteditable="false"])):not([disabled],:not([aria-disabled="false"])[aria-disabled],[hidden],:not([aria-hidden="false"])[aria-hidden])'
);

/**
 * Collects all potential focusable element candidates within the focus scope,
 * respecting standard accessibility and visibility rules.
 * 
 * @param focusScope The boundary element to search for focusable elements.
 * @returns A flat array of focusable element candidates ordered by native DOM placement.
 */
export const getFocusableElementCandidates = (focusScope: Element): Element[] => {
    return Array.from(focusScope.querySelectorAll(focusableSelector));
};



/**
 * Finds the nearest focusable group element for a given element within the focus scope,
 * checking against a pre-filtered set of valid focusable elements.
 * 
 * Traverses upward from the element's immediate parent until it finds a valid focusable group
 * or hits the focus scope boundary.
 * 
 * @param element The element whose nearest focusable group is being searched.
 * @param focusScope The boundary element to search for focusable elements.
 * @param focusableSet A `Set` cache of all valid focusable elements within the focus scope.
 * @returns The nearest matching focusable group element, or `null` if none is found.
 */
export const findNearestFocusableGroup = (
    element      : Element,
    focusScope   : Element,
    focusableSet : Set<Element>
): Element | null => {
    // Step 1: Start at the element's immediate parent and walk up toward the focus scope:
    let currentAncestor: Element | null = element.parentElement;
    
    
    
    // Step 2: Ascend the DOM tree until the focus scope boundary is reached:
    while (currentAncestor && (currentAncestor !== focusScope)) {
        // Step 3: If this ancestor is a known focusable element, return it immediately:
        // - O(1) lookup using our pre-built focusable set cache.
        if (focusableSet.has(currentAncestor)) return currentAncestor;
        
        
        
        // Step 4: Otherwise, continue climbing upward:
        currentAncestor = currentAncestor.parentElement;
    } // while
    
    
    
    // Step 5: If traversal finishes without finding a parent group, return null:
    return null;
};



/**
 * Determines whether an element is inert,
 * either directly or through an inherited inert ancestor.
 * 
 * @param element The element to check.
 * @returns `true` if the element or any of its ancestors has the `inert` attribute.
 */
export const isInertedElement = (element: Element): boolean => {
    // `.closest()` automatically checks the element itself,
    // then climbs up the parent chain looking for a match in a single native operation.
    return (element.closest('[inert]') !== null);
};



/**
 * Sorts a list of focusable entries into a flat, linear focus order
 * that respects both group hierarchy and tabIndex priorities.
 * 
 * @param allEntries All discovered focusable entries within the focus scope.
 * @returns A flat array of focusable elements ordered for proper keyboard traversal.
 */
export const sortFocusableElements = (allEntries: FocusableEntry[]): Element[] => {
    // Step 1: Identify root-level focusable entries (those without a parent focusable group):
    const rootEntries = allEntries.filter(({ focusableGroup }) => focusableGroup === null);
    
    
    
    // Step 2: Build the hierarchical focus tree:
    const rootNodes: FocusableNode[] = [];
    buildFocusTree(allEntries, rootEntries, rootNodes);
    
    
    
    // Step 3: Flatten the sorted tree into a linear focus sequence:
    const sortedFocusables: Element[] = [];
    flattenFocusTree(rootNodes, sortedFocusables);
    
    
    
    // Return the flattened focusable elements:
    return sortedFocusables;
};

/**
 * Recursively builds a hierarchical focus tree,
 * sorting each level ascending by tabIndex.
 * 
 * @param allEntries All discovered focusable entries within the focus scope.
 * @param currentEntries The entries to process at the current level of the tree.
 * @param nodes The output accumulator array for the current level's nodes.
 */
const buildFocusTree = (
    allEntries     : FocusableEntry[],
    currentEntries : FocusableEntry[],
    nodes          : FocusableNode[]
): void => {
    // Progressively build subtrees from the given level:
    for (const { element } of currentEntries) {
        // Create a virtual tree node representing this focusable element:
        const node: FocusableNode = {
            element,
            tabIndex : (element as HTMLElement | SVGElement).tabIndex ?? 0,
            children : [],
        };
        nodes.push(node);
        
        
        
        // Find all direct child elements belonging under this focusable group:
        const childEntries = allEntries.filter(({ focusableGroup }) => focusableGroup === element);
        
        
        
        // Recursively build subtrees for any nested children:
        if (childEntries.length > 0) buildFocusTree(allEntries, childEntries, node.children);
    } // for
    
    
    
    // Sort nodes at the current tree level by tabIndex priority:
    nodes.sort((a, b) => a.tabIndex - b.tabIndex);
};

/**
 * Recursively flattens a hierarchical focus tree into a linear array,
 * representing the final keyboard traversal sequence.
 * 
 * @param currentNodes The tree nodes to process at the current level.
 * @param accumulator The output accumulator array for the flattened elements.
 */
const flattenFocusTree = (
    currentNodes : FocusableNode[],
    accumulator  : Element[]
): void => {
    // Progressively collect elements from the given level:
    for (const { element, children } of currentNodes) {
        // Collect the element:
        accumulator.push(element);
        
        
        
        // Recursively collect elements from any nested child subtrees:
        if (children.length > 0) flattenFocusTree(children, accumulator);
    } // for
};
