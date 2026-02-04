import { type ReactElement, type Ref } from 'react';
import { type LinkProps } from 'react-router';
import { type CompatLinkProps } from '@reusable-ui/link-compat';
/**
 * Props for `<RouterLinkCompat>`, extending React Router’s `<Link>` with optional anchorless behavior.
 *
 * - `anchorless`: If `true`, renders the link without an extra `<a>` element.
 * - `passHref`: If `true`, explicitly forwards the `href` prop (derived from `to`) to the child component.
 *
 * Note: These flags are handled internally and will not be passed to React Router’s `<Link>`.
 */
interface RouterLinkCompatProps extends LinkProps, CompatLinkProps {
    /**
     * An optional React ref to the final interactive element.
     *
     * - If `anchorless` is `false` (default), the ref targets the internal `<a>` element rendered by React Router.
     * - If `anchorless` is `true`, the ref is forwarded to the interactive child component instead.
     *
     * This ref enables access to the correct DOM element regardless of rendering strategy.
     */
    ref?: Ref<HTMLAnchorElement>;
}
/**
 * A React Router-compatible `<Link>` component that supports anchorless rendering.
 */
declare const RouterLinkCompat: (props: RouterLinkCompatProps) => ReactElement;
export { type RouterLinkCompatProps, // Named export for readability.
type RouterLinkCompatProps as LinkProps, // Familiar alias for drop-in usage.
RouterLinkCompat, // Named export for readability.
RouterLinkCompat as default, // Default export to support React.lazy.
RouterLinkCompat as Link, };
