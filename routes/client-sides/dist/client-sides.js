// React:
import { 
// Utilities:
isValidElement, } from 'react';
// Reusable-ui utilities:
import { 
// Flags:
isClientSide as originalIsClientSide, } from '@reusable-ui/runtime-checks'; // Detects whether JavaScript is running on the client-side or server-side, including JSDOM environments.
/**
 * @deprecated - Use `isClientSide` from '@reusable-ui/runtime-checks' instead.
 *
 * Determines whether the code is running on the client side.
 *
 * - Checks if execution is in a browser (`window` exists).
 * - Detects JSDOM (used in testing environments).
 * - Ensures correct runtime determination, beyond simple `typeof window !== 'undefined'`.
 */
export const isClientSide = originalIsClientSide;
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
export const isNextLink = (node) => {
    return (
    // Ensure the node is a valid React element:
    isValidElement(node)
        &&
            // The props should contain `to` which indicates a NextJS' <Link>:
            ('href' in node.props));
};
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
export const isReactRouterLink = (node) => {
    return (
    // Ensure the node is a valid React element:
    isValidElement(node)
        &&
            // The props should contain `to` which indicates a React-Router's <Link>:
            ('to' in node.props));
};
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
export const isClientSideLink = (node) => {
    return (isReactRouterLink(node)
        ||
            isNextLink(node));
};
