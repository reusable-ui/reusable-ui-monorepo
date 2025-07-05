'use client' // The exported `<NextLinkCompat>` component is client side only.

// React:
import {
    // React:
    default as React,
    
    
    
    // Types:
    type ReactElement,
    type ReactNode,
    type Ref,
}                           from 'react'

// Next.js:
import {
    type LinkProps,
    default as Link,
}                           from 'next/link'

// Reusable-ui utilities:
import {
    // Types:
    type CompatLinkProps,
    
    
    
    // Hooks:
    useAnchorlessLink,
}                           from '@reusable-ui/link-compat'     // A compatibility utility for transforming nested <Link> structures into clean, anchorless interactive elements.



// React components:

/**
 * Props for `<NextLinkCompat>`, extending Next.js’s `<Link>` with optional anchorless behavior.
 * 
 * - `anchorless`: If `true`, renders the link without an extra `<a>` element.
 * - `passHref`: If `true`, explicitly forwards the `href` prop to the child component.
 * 
 * Note: These flags are handled internally and will not be passed to Next.js’s `<Link>`.
 */
interface NextLinkCompatProps
    extends
        // Bases:
        LinkProps,
        CompatLinkProps
{
    // Refs:
    
    /**
     * An optional React ref to the final interactive element.
     * 
     * - If `anchorless` is `false` (default), the ref targets the internal `<a>` element rendered by Next.js.
     * - If `anchorless` is `true`, the ref is forwarded to the interactive child component instead.
     *
     * This ref enables access to the correct DOM element regardless of rendering strategy.
     */
    ref      ?: Ref<HTMLAnchorElement>
    
    
    
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
    children  : ReactNode
}

/**
 * A Next.js-compatible `<Link>` component that supports anchorless rendering.
 */
const NextLinkCompat = (props: NextLinkCompatProps): ReactElement => {
    // Transform the `<Link>` element into an "anchorless" structure (if applicable):
    // The `anchorless` and `passHref` props will be automatically removed by `useAnchorlessLink()`.
    return useAnchorlessLink(
        <Link {...props} />
    ) as ReactElement; // The returned element is guaranteed to be a valid ReactElement.
};

export {
    type NextLinkCompatProps,              // Named export for readability.
    type NextLinkCompatProps as LinkProps, // Familiar alias for drop-in usage.
    
    NextLinkCompat,                        // Named export for readability.
    NextLinkCompat as default,             // Default export to support React.lazy.
    NextLinkCompat as Link,                // Familiar alias for drop-in usage.
}
