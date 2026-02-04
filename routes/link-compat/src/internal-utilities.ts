// React:
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type ComponentProps,
    type JSXElementConstructor,
    type ProviderProps,
    
    
    
    // Utilities:
    isValidElement,
    Children,
}                           from 'react'

// Reusable-ui utilities:
import {
    isForwardRef,
    isFragmentElement,
    isContextElement,
}                           from '@reusable-ui/nodes'           // A comprehensive utility library for efficiently managing React nodes, including fragments, forward refs, and nested structures.



/**
 * Determines whether the given `node` is a native `<a>` element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ReactElement<ComponentProps<'a'>, 'a'>`.
 * 
 * @param node - The React node to inspect.
 * @returns {node is ReactElement<ComponentProps<'a'>, 'a'>} `true` if the node is a native `<a>` element, otherwise `false`.
 */
const isAnchorElement = (node: ReactNode): node is ReactElement<ComponentProps<'a'>, 'a'> => {
    return (
        // Ensure the node is a valid React element:
        isValidElement<ComponentProps<'a'>>(node)
        
        &&
        
        // Ensure the element is a native `<a>` element:
        (node.type === 'a')
    );
};



/**
 * Represents the result of extracting a native `<a>` element and its surrounding structure
 * from a composite React node tree.
 */
export interface AnchorExtractionResult {
    /**
     * The wrapping context provider (e.g., `<ContextProvider>`), if present.
     * If no context wrapper is detected, this will be `null`.
     */
    context : ReactElement<ProviderProps<unknown>, JSXElementConstructor<ProviderProps<unknown>>> | null
    
    /**
     * The first detected native `<a>` element containing the element to unwrap.
     */
    anchor  : ReactElement<ComponentProps<'a'>, 'a'>
    
    /**
     * The side elements adjacent to the `<a>` element (e.g., prefetch helpers or fragments).
     */
    sides   : ReactNode
}

/**
 * Attempts to extract the first native `<a>` element from a React node,
 * along with any surrounding structure (context providers and side elements).
 * 
 * @param rootNode - The composite React node to inspect.
 * @returns An `AnchorExtractionResult` containing the detected anchor, optional context provider, and additional side elements — or `null` if no anchor is found.
 */
export const extractFirstAnchor = (rootNode: ReactNode): AnchorExtractionResult | null => {
    // Ensure the rootNode is a valid React element, otherwise return `null`:
    if (!isValidElement<unknown>(rootNode)) return null;
    
    
    
    // Start with the root node as the candidate for extraction:
    let candidate : ReactNode = rootNode;
    
    
    
    // Unwrap `<ForwardRef>`, if present:
    if (isForwardRef(candidate)) {
        // Render `<FunctionComponent>` wrapped in `<ForwardRef>`:
        candidate = (candidate.type as any).render(candidate.props, candidate.props.ref);
    } // if
    
    
    
    // Unwrap `<ContextProvider>`, if present:
    let context   : ReactElement<ProviderProps<unknown>, JSXElementConstructor<ProviderProps<unknown>>> | null;
    if (isContextElement(candidate)) {
        context   = candidate;
        candidate = candidate.props.children;
    }
    else {
        context   = null;
    } // if
    
    
    
    // Unwrap `<Fragment>`, if present:
    if (isFragmentElement(candidate)) candidate = candidate.props.children;
    
    
    
    // Normalize into a mutable, indexable array:
    const children : ReactNode[] = Children.toArray(candidate);
    
    
    
    // Find the first `<a>` element:
    const anchorIndex = children.findIndex(isAnchorElement);
    
    
    
    // If no anchor found, the structure is not recognized, so return `null`:
    if (anchorIndex < 0) return null;
    
    
    
    // Extract the anchor:
    const anchor = children[anchorIndex] as ReactElement<ComponentProps<'a'>, 'a'>;
    
    
    
    // Remove the anchor from the array to isolate the additional side elements:
    children.splice(anchorIndex, 1);
    
    
    
    // Return structured result:
    return {
        context,
        anchor,
        sides : children.length ? children : null,
    } satisfies AnchorExtractionResult;
};
