// React:
import {
    // Types:
    type ReactNode,
    type ReactElement,
    
    
    
    // Utilities:
    isValidElement,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Flags:
    isClientSide as originalIsClientSide,
}                           from '@reusable-ui/runtime-checks'  // Detects whether JavaScript is running on the client-side or server-side, including JSDOM environments.

// Other libs:
import {
    // Types:
    type To,
}                           from 'history'



/**
 * @deprecated - Use `isClientSide` from '@reusable-ui/runtime-checks' instead.
 * 
 * Determines whether the code is running on the client side.
 * 
 * - Checks if execution is in a browser (`window` exists).
 * - Detects JSDOM (used in testing environments).
 * - Ensures correct runtime determination, beyond simple `typeof window !== 'undefined'`.
 */
export const isClientSide : boolean = originalIsClientSide;



/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 * 
 * Represents a Next.js `<Link>` element.
 */
export type JsxNextLink = ReactElement<{
    // Behaviors:
    /**
     * If `true`, forwards the `href` (or `to`) attribute to the child element.
     * Useful when the child is an anchor-compatible tag like `<a>` or `<CustomElement tag='a'>`.
     */
    passHref       ?: boolean
    
    
    
    // Navigations:
    
    /**
     * The destination path to navigate to.
     * Example: `/about` or a location object.
     */
    href           ?: To
    
    
    
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
}>

/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 * 
 * Determines whether the given `node` is a Next.js `<Link>` element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `JsxNextLink`.
 * 
 * A node is considered a Next.js link if:
 * - It is a React element.
 * - It is a forwardRef-wrapped element.
 * - It has a `href` prop (Next.js's routing indicator).
 * 
 * @param node - The React node to inspect.
 * @returns {node is JsxNextLink} `true` if the node is a Next.js `<Link>` element, otherwise `false`.
 */
export const isNextLink = (node: ReactNode): node is JsxNextLink => {
    return (
        // Ensure the node is a valid React element:
        isValidElement<{}>(node)
        
        &&
        
        // The props should contain `to` which indicates a NextJS' <Link>:
        ('href' in node.props)
    );
};



/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 * 
 * Represents a React Router `<Link>` element.
 */
export type JsxReactRouterLink = ReactElement<{
    // Behaviors:
    /**
     * If `true`, forwards the `href` (or `to`) attribute to the child element.
     * Useful when the child is an anchor-compatible tag like `<a>` or `<CustomElement tag='a'>`.
     */
    passHref       ?: boolean
    
    
    
    // Navigations:
    
    /**
     * The destination path to navigate to.
     * Example: `/about` or a location object.
     */
    to             ?: To
    
    
    
    // Components:
    /**
     * The original JSX element to enhance with optional client navigation behavior.
     */
    linkComponent  ?: ReactElement<any>
    
    
    
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
}>

/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 * 
 * Determines whether the given `node` is a React Router `<Link>` element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `JsxReactRouterLink`.
 * 
 * A node is considered a React Router link if:
 * - It is a React element.
 * - It is a forwardRef-wrapped element.
 * - It has a `to` prop (React Router's routing indicator).
 * 
 * @param node - The React node to inspect.
 * @returns {node is JsxReactRouterLink} `true` if the node is a React Router `<Link>` element, otherwise `false`.
 */
export const isReactRouterLink = (node: ReactNode): node is JsxReactRouterLink => {
    return (
        // Ensure the node is a valid React element:
        isValidElement<{}>(node)
        
        &&
        
        // The props should contain `to` which indicates a React-Router's <Link>:
        ('to' in node.props)
    );
};



/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 * 
 * Represents a client-side `<Link>` element from either React Router or Next.js.
 * 
 * This union enables safe type narrowing across multiple link implementations,
 * without tightly coupling to a specific routing library.
 */
export type JsxClientSideLink = JsxReactRouterLink & JsxNextLink

/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 * 
 * Determines whether the given `node` is a known client-side `<Link>` element.
 * 
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `JsxClientSideLink`.
 * 
 * @param node - The React node to inspect.
 * @returns {node is JsxClientSideLink} `true` if the node is a known client-side `<Link>` element, otherwise `false`.
 */
export const isClientSideLink = (node: ReactNode): node is JsxClientSideLink => {
    return (
        isReactRouterLink(node)
        ||
        isNextLink(node)
    );
};
