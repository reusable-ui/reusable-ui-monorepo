'use client' // The exported `<RouterLinkCompat>` component is client side only.

// React:
import {
    // React:
    default as React,
    
    
    
    // Types:
    type ReactElement,
    type Ref,
}                           from 'react'

// React Router:
import {
    type LinkProps,
    Link,
}                           from 'react-router'

// Reusable-ui utilities:
import {
    // Types:
    type CompatLinkProps,
    
    
    
    // Hooks:
    useAnchorlessLink,
}                           from '@reusable-ui/link-compat'     // A compatibility utility for transforming nested <Link> structures into clean, anchorless interactive elements.



// React components:

/**
 * Props for `<RouterLinkCompat>`, extending React Router’s `<Link>` with optional anchorless behavior.
 * 
 * - `anchorless`: If `true`, renders the link without an extra `<a>` element.
 * - `passHref`: If `true`, explicitly forwards the `href` prop (derived from `to`) to the child component.
 * 
 * Note: These flags are handled internally and will not be passed to React Router’s `<Link>`.
 */
interface RouterLinkCompatProps
    extends
        // Bases:
        LinkProps,
        CompatLinkProps
{
    // Refs:
    
    /**
     * An optional React ref to the final interactive element.
     * 
     * - If `anchorless` is `false` (default), the ref targets the internal `<a>` element rendered by React Router.
     * - If `anchorless` is `true`, the ref is forwarded to the interactive child component instead.
     *
     * This ref enables access to the correct DOM element regardless of rendering strategy.
     */
    ref      ?: Ref<HTMLAnchorElement>
}

/**
 * A React Router-compatible `<Link>` component that supports anchorless rendering.
 */
const RouterLinkCompat = (props: RouterLinkCompatProps): ReactElement => {
    // Transform the `<Link>` element into an "anchorless" structure (if applicable):
    // The `anchorless` and `passHref` props will be automatically removed by `useAnchorlessLink()`.
    return useAnchorlessLink(
        <Link {...props} />
    ) as ReactElement; // The returned element is guaranteed to be a valid ReactElement.
};

export {
    type RouterLinkCompatProps,              // Named export for readability.
    type RouterLinkCompatProps as LinkProps, // Familiar alias for drop-in usage.
    
    RouterLinkCompat,                        // Named export for readability.
    RouterLinkCompat as default,             // Default export to support React.lazy.
    RouterLinkCompat as Link,                // Familiar alias for drop-in usage.
}
