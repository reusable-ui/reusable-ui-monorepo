import { type ReactElement, type JSXElementConstructor, type PropsWithChildren } from 'react';
import { type SemanticProps } from '@reusable-ui/semantics';
import { type DisabledStateProps } from '@reusable-ui/disabled-state';
/**
 * Returns a React element that is externally compatible with the given `originalElement`,
 * while conditionally enhancing it with client-side `<Link>` behavior.
 *
 * The returned element accepts the same props shape as `originalElement`, allowing
 * consumers to interact with it (e.g., via `cloneElement()`, prop overrides, or event handlers)
 * as if it were the `originalElement` — regardless of whether a `<Link>` is present internally.
 *
 * If the `originalElement`’s children contain a supported client-side `<Link>` element
 * (e.g., from Next.js or React Router), this function:
 * - Unwraps the `<Link>` and preserves its child content.
 * - Merges the `<Link>`’s children with the `originalElement`’s children.
 * - Re-wraps the updated element inside the detected `<Link>` with proper semantics.
 *
 * This abstraction prevents structural instability caused by conditionally swapping JSX trees
 * (such as toggling between `<BaseComponent>` and `<Link><BaseComponent /></Link>`).
 *
 * @template TProps - The original element’s props type (must support children, accessibility, and semantics).
 * @param originalElement - The original JSX element to enhance with optional client navigation behavior.
 * @returns A React element with a stable `type` that mirrors `originalElement` but may render `<Link>`-enhanced output.
 *
 * @example
 * ```tsx
 * import { useOptionalLinkWrapper } from '@reusable-ui/links';
 *
 * interface SmartButtonProps extends BaseButtonProps {}
 *
 * const SmartButton = (props: SmartButtonProps) => {
 *     // Enhances the <BaseButton> with client-side link detection (e.g., <Link> from Next.js or React Router):
 *     return useOptionalLinkWrapper(
 *         <BaseButton {...props} />
 *     );
 * };
 *
 * // Usage:
 * <SmartButton className='primary'>
 *     <Link href='/dashboard'>Go to Dashboard</Link>
 * </SmartButton>
 *
 * // Renders as:
 * <Link href='/dashboard' anchorless passHref>
 *     <BaseButton className='primary'>Go to Dashboard</BaseButton>
 * </Link>
 * ```
 */
export declare const useOptionalLinkWrapper: <TProps extends PropsWithChildren<DisabledStateProps & SemanticProps>>(originalElement: ReactElement<TProps, string | JSXElementConstructor<unknown>>) => ReactElement<Partial<TProps>, JSXElementConstructor<unknown>>;
