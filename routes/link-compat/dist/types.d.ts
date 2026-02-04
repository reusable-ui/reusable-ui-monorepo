/**
 * Defines the minimal props shared across compatibility-aware `<Link>` adapters.
 * This interface enables behavior alignment between frameworks like Next.js and React Router.
 */
export interface CompatLinkProps {
    /**
     * If `true`, disables automatic `<a>` wrapping and allows the child
     * element to receive routing behavior directly.
     * Useful for flattening link structure in legacy-style rendering.
     */
    anchorless?: boolean;
    /**
     * If `true`, forwards the `href` (or `to`) attribute to the child element.
     * Useful when the child is an anchor-compatible tag like `<a>` or `<CustomElement tag='a'>`.
     */
    passHref?: boolean;
}
