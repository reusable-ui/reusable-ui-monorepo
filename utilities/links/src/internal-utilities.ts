// React:
import {
    // Types:
    type ReactNode,
    
    
    
    // Utilities:
    isValidElement,
    cloneElement,
    Children,
}                           from 'react'

// Utilities:
import {
    // Types:
    type ClientLinkElement,
    
    
    
    // Utilities:
    isClientLinkElement,
}                           from './utilities.js'



/**
 * Represents the result of extracting a client-side `<Link>` element and flattening its children into the surrounding structure
 * from a composite React node tree.
 */
export interface LinkExtractionResult {
    /**
     * The first detected client-side `<Link>` element for re-wrapping.
     */
    link           : ClientLinkElement
    
    /**
     * The full set of children with the `<Link>` unwrapped and merged in place.
     */
    mergedChildren : ReactNode[]
}

/**
 * Attempts to extract the first client-side `<Link>` element from a React node,
 * and merges its own children into the surrounding structure.
 * 
 * @param rootNode - The composite React node to inspect.
 * @returns A `<Link>` containing the detected link and merged children — or `null` if no link is found.
 */
export const extractFirstClientLink = (rootNode: ReactNode): LinkExtractionResult | null => {
    // Normalize into a mutable, indexable array:
    const children : ReactNode[] = Children.toArray(rootNode);
    
    
    
    // Find the first client-side `<Link>` (Next.js or React Router):
    const linkIndex = children.findIndex(isClientLinkElement);
    
    
    
    // If no link found — nothing to unwrap:
    if (linkIndex < 0) return null;
    
    
    
    // Grab a reference to the found `<Link>`:
    const link = children[linkIndex] as ClientLinkElement;
    
    
    
    // Use existing key (if any) or fallback to its position:
    const linkKey = link.key ?? `.${linkIndex}`;
    
    
    
    // Replace the `<Link>` in-place with its children (with adjusted keys):
    children.splice(linkIndex, 1,
        ...Children.toArray(link.props.children)
        .map((grandChild: ReactNode, grandChildIndex): ReactNode => {
            // Preserve non-element children as-is:
            if (!isValidElement<unknown>(grandChild)) return grandChild;
            
            
            
            // Clone grandchild with adjusted key to prevent collisions:
            return cloneElement<unknown>(grandChild,
                // Props:
                {
                    // Ensure the grandchild has a unique key:
                    key : `${linkKey}/${grandChild.key ?? grandChildIndex}`,
                },
            );
        })
    );
    
    
    
    // Return structured result:
    return {
        link,
        mergedChildren : children,
    } satisfies LinkExtractionResult;
};



/**
 * Merges multiple props-like objects into a single props object.
 * 
 * Skips over `undefined`, `null`, `false`, and `true` entries in the argument list,
 * making it ideal for conditional props logic like:
 * 
 * ```ts
 * mergeProps(
 *     baseProps,
 *     isActive && activeProps,
 *     isRTL ? rtlProps : true
 * );
 * ```
 * 
 * Within each props object:
 * - `undefined` values are ignored (not assigned)
 * - All other defined values (including `null`) are included
 * 
 * @template TProps - The expected final props shape.
 * @param propsList - A variadic list of possibly falsy or partial props objects.
 * @returns A merged object containing all defined keys in left-to-right order.
 */
export const mergeProps = <TProps extends {}>(...propsList: (Partial<TProps> | undefined | null | boolean)[]): TProps => {
    // Initialize the merged props object:
    const mergedProps: TProps = {} as any;
    
    
    
    // Iterate over each props-like object:
    for (const props of propsList) {
        // Skip falsy values used for conditional spreading (e.g., `true`, `null`, `undefined`)
        if (!props || (props === true)) continue;
        
        
        
        // Iterate over each key-value pair in the props object:
        for (const [key, value] of Object.entries(props)) {
            // Skip undefined values:
            if (value === undefined) continue;
            
            
            
            // Assign/overwrite the value to the merged props object:
            mergedProps[key as keyof TProps] = value as TProps[keyof TProps];
        }
    } // for
    
    
    
    // Return the merged props object:
    return mergedProps;
};
