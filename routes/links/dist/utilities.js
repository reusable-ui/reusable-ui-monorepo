// React:
import { 
// Utilities:
isValidElement, } from 'react';
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
const isNextLinkElement = (node) => {
    return (
    // Ensure the node is a valid React element:
    isValidElement(node)
        &&
            // The props should contain `to` which indicates a NextJS' <Link>:
            ('href' in node.props));
};
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
const isReactRouterLinkElement = (node) => {
    return (
    // Ensure the node is a valid React element:
    isValidElement(node)
        &&
            // The props should contain `to` which indicates a React-Router's <Link>:
            ('to' in node.props));
};
/**
 * Determines whether the given `node` is a known client-side `<Link>` element.
 *
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ClientLinkElement`.
 *
 * @param node - The React node to inspect.
 * @returns {node is ClientLinkElement} `true` if the node is a known client-side `<Link>` element, otherwise `false`.
 */
export const isClientLinkElement = (node) => {
    return (isNextLinkElement(node)
        ||
            isReactRouterLinkElement(node));
};
