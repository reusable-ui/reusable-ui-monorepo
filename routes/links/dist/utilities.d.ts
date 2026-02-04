import { type ReactNode, type ReactElement, type JSXElementConstructor } from 'react';
import { type CompatLinkProps } from '@reusable-ui/link-compat';
import { type UrlObject } from 'url';
import { type To } from 'history';
/**
 * Represents a Next.js `<Link>` element.
 */
type NextLinkElement = ReactElement<CompatLinkProps & {
    /**
     * The destination path to navigate to.
     * Example: `/about` or a location object.
     */
    href?: string | UrlObject;
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
    children?: ReactNode;
}, JSXElementConstructor<unknown>>;
/**
 * Represents a React Router `<Link>` element.
 */
type ReactRouterLinkElement = ReactElement<CompatLinkProps & {
    /**
     * The destination path to navigate to.
     * Example: `/about` or a location object.
     */
    to?: To;
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
    children?: ReactNode;
}, JSXElementConstructor<unknown>>;
/**
 * Represents a client-side `<Link>` element from either React Router or Next.js.
 *
 * This union enables safe type narrowing across multiple link implementations,
 * without tightly coupling to a specific routing library.
 */
export type ClientLinkElement = NextLinkElement | ReactRouterLinkElement;
/**
 * Determines whether the given `node` is a known client-side `<Link>` element.
 *
 * This function acts as a **type guard**, meaning if it returns `true`,
 * TypeScript will refine the type of `node` to `ClientLinkElement`.
 *
 * @param node - The React node to inspect.
 * @returns {node is ClientLinkElement} `true` if the node is a known client-side `<Link>` element, otherwise `false`.
 */
export declare const isClientLinkElement: (node: ReactNode) => node is ClientLinkElement;
export {};
