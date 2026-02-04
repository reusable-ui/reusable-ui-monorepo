import { type ReactNode, type ReactElement, type PropsWithChildren, type Ref } from 'react';
import { type SemanticProps } from '@reusable-ui/semantics';
import { type DisabledStateProps } from '@reusable-ui/disabled-state';
/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 *
 * This component is a legacy wrapper that enhances an element with optional link behavior
 * by delegating to `useOptionalLinkWrapper()` under the hood.
 */
export interface ElementWithMaybeLinkProps {
    /**
     * The original JSX element to enhance with optional client navigation behavior.
     */
    elementComponent: ReactElement<PropsWithChildren<{
        outerRef?: Ref<Element>;
    } & DisabledStateProps & SemanticProps>>;
    /**
     * Optional override for the `elementComponent`'s children.
     * If provided, this will replace the original element's children.
     * If not provided, it defaults to the original element's `children`.
     */
    children?: ReactNode;
}
/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 */
declare const ElementWithMaybeLink: (props: ElementWithMaybeLinkProps) => ReactElement | null;
export { ElementWithMaybeLink, // Named export for readability.
ElementWithMaybeLink as default, };
