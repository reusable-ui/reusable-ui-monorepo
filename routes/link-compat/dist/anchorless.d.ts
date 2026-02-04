import { type ReactNode, type ReactElement, type JSXElementConstructor } from 'react';
import { type CompatLinkProps } from './types.js';
/**
 * A React hook that transforms a compatibility-aware `<Link>` element
 * into an "anchorless" structure by extracting its inner interactive element
 * from the rendered output and reconstructing it with essential navigation props.
 *
 * This hook **does not rely on the input props** passed into the `<Link>` component.
 * Instead, it inspects the **rendered JSX structure** produced by the component
 * and rewrites it — removing the wrapping `<a>` element and hoisting its props
 * (e.g. `href`, `ref`, `onClick`, etc.) onto the nested interactive child element.
 *
 * During transformation, this hook:
 * - If no native `<a>` element is found, the hook returns the node unmodified.
 * - Extracts and discards the wrapping `<a>` element.
 * - Forwards its `ref`, `onClick`, `onMouseEnter`, and `onTouchStart` handlers to the interactive element.
 * - Optionally forwards `href` as well, if `passHref` is explicitly enabled.
 *
 * This is useful when flattening `<Link>` components in compatibility layers
 * (e.g. from Next.js or React Router) to remove nested anchor structures.
 *
 * @param linkElement - The JSX `<Link>` element to transform.
 * @returns A reconstructed JSX node with anchorless behavior, or the original JSX if transformation is not applicable.
 *
 * @example
 * ```tsx
 * import { BaseLink, BaseLinkProps } from 'framework-specific-link';
 * import { useAnchorlessLink, CompatLinkProps } from '@reusable-ui/link-compat';
 *
 * export interface CustomCompatibleLinkProps extends BaseLinkProps, CompatLinkProps {
 *     href     : string
 *     children : ReactNode
 * }
 *
 * const CustomCompatibleLink = (props: CustomCompatibleLinkProps) => {
 *     const result = useAnchorlessLink(
 *         <BaseLink {...props} />
 *     );
 *
 *     return result;
 * };
 * ```
 */
export declare const useAnchorlessLink: (linkElement: ReactElement<CompatLinkProps, string | JSXElementConstructor<unknown>>) => ReactNode;
