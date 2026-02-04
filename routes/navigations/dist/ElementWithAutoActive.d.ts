import { type ReactNode, type ReactElement, type AriaAttributes, type PropsWithChildren } from 'react';
import { type SemanticProps } from '@reusable-ui/semantics';
import { type ActiveStateProps } from '@reusable-ui/active-state';
import { type DetermineCurrentPageProps } from './navigations.js';
/**
 * @deprecated Use a combination of `useLinkPathMatch` and `useOptionalLinkWrapper` instead.
 *
 * This legacy props interface was used to enhance a JSX element with auto-assigned
 * `active` and `aria-current` semantics based on its navigation context.
 */
export interface ElementWithAutoActiveProps extends DetermineCurrentPageProps, PropsWithChildren<SemanticProps & ActiveStateProps & Pick<AriaAttributes, 'aria-current'>> {
    /**
     * The original JSX element to enhance with optional client-side navigation behavior,
     *  along with automatic assignment of `active` and `aria-current` props.
     */
    elementComponent: ReactElement<PropsWithChildren<SemanticProps & ActiveStateProps & Pick<AriaAttributes, 'aria-current'>>, any>;
}
/**
 * @deprecated Use a combination of `useLinkPathMatch` and `useOptionalLinkWrapper` instead.
 *
 * This legacy component wraps a JSX element with auto-detection of link-based activity state,
 * applying `active` and `aria-current` props based on current navigation context.
 */
declare const ElementWithAutoActive: (props: ElementWithAutoActiveProps) => ReactNode | null;
export { ElementWithAutoActive, // Named export for readability.
ElementWithAutoActive as default, };
