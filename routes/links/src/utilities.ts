// React:
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type JSXElementConstructor,
    
    
    
    // Utilities:
    isValidElement,
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
type NextLinkElement = ReactElement<CompatLinkProps & {
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
const isNextLinkElement = (node: ReactNode): node is NextLinkElement => {
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
type ReactRouterLinkElement = ReactElement<CompatLinkProps & {
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
const isReactRouterLinkElement = (node: ReactNode): node is ReactRouterLinkElement => {
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
