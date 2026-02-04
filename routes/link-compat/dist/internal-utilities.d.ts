import { type ReactNode, type ReactElement, type ComponentProps, type JSXElementConstructor, type ProviderProps } from 'react';
/**
 * Represents the result of extracting a native `<a>` element and its surrounding structure
 * from a composite React node tree.
 */
export interface AnchorExtractionResult {
    /**
     * The wrapping context provider (e.g., `<ContextProvider>`), if present.
     * If no context wrapper is detected, this will be `null`.
     */
    context: ReactElement<ProviderProps<unknown>, JSXElementConstructor<ProviderProps<unknown>>> | null;
    /**
     * The first detected native `<a>` element containing the element to unwrap.
     */
    anchor: ReactElement<ComponentProps<'a'>, 'a'>;
    /**
     * The side elements adjacent to the `<a>` element (e.g., prefetch helpers or fragments).
     */
    sides: ReactNode;
}
/**
 * Attempts to extract the first native `<a>` element from a React node,
 * along with any surrounding structure (context providers and side elements).
 *
 * @param rootNode - The composite React node to inspect.
 * @returns An `AnchorExtractionResult` containing the detected anchor, optional context provider, and additional side elements — or `null` if no anchor is found.
 */
export declare const extractFirstAnchor: (rootNode: ReactNode) => AnchorExtractionResult | null;
