import { type ReactNode } from 'react';
import { type ClientLinkElement } from './utilities.js';
/**
 * Represents the result of extracting a client-side `<Link>` element and flattening its children into the surrounding structure
 * from a composite React node tree.
 */
export interface LinkExtractionResult {
    /**
     * The first detected client-side `<Link>` element for re-wrapping.
     */
    link: ClientLinkElement;
    /**
     * The full set of children with the `<Link>` unwrapped and merged in place.
     */
    mergedChildren: ReactNode[];
}
/**
 * Attempts to extract the first client-side `<Link>` element from a React node,
 * and merges its own children into the surrounding structure.
 *
 * @param rootNode - The composite React node to inspect.
 * @returns A `<Link>` containing the detected link and merged children — or `null` if no link is found.
 */
export declare const extractFirstClientLink: (rootNode: ReactNode) => LinkExtractionResult | null;
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
export declare const mergeProps: <TProps extends {}>(...propsList: (Partial<TProps> | undefined | null | boolean)[]) => TProps;
