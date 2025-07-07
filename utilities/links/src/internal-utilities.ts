// React:
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    
    
    
    // Utilities:
    isValidElement,
    cloneElement,
    Children,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Types:
    type CompatLinkProps,
}                           from '@reusable-ui/link-compat'     // A compatibility utility for transforming nested <Link> structures into clean, anchorless interactive elements.

// Other libs:
import {
    // Types:
    type UrlObject,
}                           from 'url'
import {
    // Types:
    type To,
}                           from 'history'



/**
 * Represents a Next.js `<Link>` element.
 */
export type NextLinkElement = ReactElement<CompatLinkProps & {
    // Navigations:
    
    /**
     * The destination path to navigate to.
     * Example: `/about` or a location object.
     */
    href           ?: string | UrlObject
    
    
    
    // Children:
    
    /**
     * A single React node to be rendered within the `<Link>`.
     * 
     * - Must be exactly one renderable node (e.g. an element, text string, or fragment).
     * - Passing multiple children or `null`/`undefined` will throw an error.
     * 
     * Common examples:
     * - ✅ `<button>Click me</button>`
     * - ✅ `"Click me"`
     * - ❌ `<>First</><>Second</>` (multiple roots)
     */
    children       ?: ReactNode
}, JSXElementConstructor<unknown>>

/**
 * Determines whether the given `node` is a Next.js `<Link>` element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `NextLinkElement`.
 * 
 * A node is considered a Next.js link if:
 * - It is a React element.
 * - It is a forwardRef-wrapped element.
 * - It has a `href` prop (Next.js's routing indicator).
 * 
 * @param node - The React node to inspect.
 * @returns {node is NextLinkElement} `true` if the node is a Next.js `<Link>` element, otherwise `false`.
 */
export const isNextLinkElement = (node: ReactNode): node is NextLinkElement => {
    return (
        // Ensure the node is a valid React element:
        isValidElement<{}>(node)
        
        &&
        
        // The props should contain `to` which indicates a NextJS' <Link>:
        ('href' in node.props)
    );
};



/**
 * Represents a React Router `<Link>` element.
 */
export type ReactRouterLinkElement = ReactElement<CompatLinkProps & {
    // Navigations:
    
    /**
     * The destination path to navigate to.
     * Example: `/about` or a location object.
     */
    to             ?: To
    
    
    
    // Children:
    
    /**
     * A single React node to be rendered within the `<Link>`.
     * 
     * - Must be exactly one renderable node (e.g. an element, text string, or fragment).
     * - Passing multiple children or `null`/`undefined` will throw an error.
     * 
     * Common examples:
     * - ✅ `<button>Click me</button>`
     * - ✅ `"Click me"`
     * - ❌ `<>First</><>Second</>` (multiple roots)
     */
    children       ?: ReactNode
}, JSXElementConstructor<unknown>>

/**
 * Determines whether the given `node` is a React Router `<Link>` element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ReactRouterLinkElement`.
 * 
 * A node is considered a React Router link if:
 * - It is a React element.
 * - It is a forwardRef-wrapped element.
 * - It has a `to` prop (React Router's routing indicator).
 * 
 * @param node - The React node to inspect.
 * @returns {node is ReactRouterLinkElement} `true` if the node is a React Router `<Link>` element, otherwise `false`.
 */
export const isReactRouterLinkElement = (node: ReactNode): node is ReactRouterLinkElement => {
    return (
        // Ensure the node is a valid React element:
        isValidElement<{}>(node)
        
        &&
        
        // The props should contain `to` which indicates a React-Router's <Link>:
        ('to' in node.props)
    );
};



/**
 * Represents a client-side `<Link>` element from either React Router or Next.js.
 * 
 * This union enables safe type narrowing across multiple link implementations,
 * without tightly coupling to a specific routing library.
 */
export type ClientLinkElement =
    | NextLinkElement
    | ReactRouterLinkElement

/**
 * Determines whether the given `node` is a known client-side `<Link>` element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ClientLinkElement`.
 * 
 * @param node - The React node to inspect.
 * @returns {node is ClientLinkElement} `true` if the node is a known client-side `<Link>` element, otherwise `false`.
 */
export const isClientLinkElement = (node: ReactNode): node is ClientLinkElement => {
    return (
        isNextLinkElement(node)
        ||
        isReactRouterLinkElement(node)
    );
};



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
