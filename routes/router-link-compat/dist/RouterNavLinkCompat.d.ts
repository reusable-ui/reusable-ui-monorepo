import { type ReactElement, type Ref } from 'react';
import { type NavLinkProps } from 'react-router';
import { type CompatLinkProps } from '@reusable-ui/link-compat';
/**
 * Props for `<RouterNavLinkCompat>`, extending React Router’s `<NavLink>` with optional anchorless behavior.
 *
 * - `anchorless`: If `true`, renders the link without an extra `<a>` element.
 * - `passHref`: If `true`, explicitly forwards the `href` prop (derived from `to`) to the child component.
 *
 * Note: These flags are handled internally and will not be passed to React Router’s `<NavLink>`.
 */
interface RouterNavLinkCompatProps extends NavLinkProps, CompatLinkProps {
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
 * A React Router-compatible `<NavLink>` component that supports anchorless rendering.
 */
declare const RouterNavLinkCompat: (props: RouterNavLinkCompatProps) => ReactElement;
export { type RouterNavLinkCompatProps, // Named export for readability.
type RouterNavLinkCompatProps as NavLinkProps, // Familiar alias for drop-in usage.
RouterNavLinkCompat, // Named export for readability.
RouterNavLinkCompat as default, // Default export to support React.lazy.
RouterNavLinkCompat as NavLink, };
