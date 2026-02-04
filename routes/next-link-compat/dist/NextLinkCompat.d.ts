import { type ReactElement, type ReactNode, type Ref } from 'react';
import { type LinkProps } from 'next/link';
import { type CompatLinkProps } from '@reusable-ui/link-compat';
/**
 * Props for `<NextLinkCompat>`, extending Next.js’s `<Link>` with optional anchorless behavior.
 *
 * - `anchorless`: If `true`, renders the link without an extra `<a>` element.
 * - `passHref`: If `true`, explicitly forwards the `href` prop to the child component.
 *
 * Note: These flags are handled internally and will not be passed to Next.js’s `<Link>`.
 */
interface NextLinkCompatProps extends LinkProps, CompatLinkProps {
    /**
     * An optional React ref to the final interactive element.
     *
     * - If `anchorless` is `false` (default), the ref targets the internal `<a>` element rendered by Next.js.
     * - If `anchorless` is `true`, the ref is forwarded to the interactive child component instead.
     *
     * This ref enables access to the correct DOM element regardless of rendering strategy.
     */
    ref?: Ref<HTMLAnchorElement>;
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
    children: ReactNode;
}
/**
 * A Next.js-compatible `<Link>` component that supports anchorless rendering.
 */
declare const NextLinkCompat: (props: NextLinkCompatProps) => ReactElement;
export { type NextLinkCompatProps, // Named export for readability.
type NextLinkCompatProps as LinkProps, // Familiar alias for drop-in usage.
NextLinkCompat, // Named export for readability.
NextLinkCompat as default, // Default export to support React.lazy.
NextLinkCompat as Link, };
