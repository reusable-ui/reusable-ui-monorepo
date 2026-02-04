// React:
import { 
// Utilities:
cloneElement, } from 'react';
import { 
// Hooks:
useOptionalLinkWrapper, } from '@reusable-ui/links'; // Smart, router-agnostic link enhancement for semantic React components.
// Utilities:
import { useDetermineCurrentPage, } from './navigations.js';
/**
 * @deprecated Use a combination of `useLinkPathMatch` and `useOptionalLinkWrapper` instead.
 *
 * This legacy component wraps a JSX element with auto-detection of link-based activity state,
 * applying `active` and `aria-current` props based on current navigation context.
 */
const ElementWithAutoActive = (props) => {
    // Extract props:
    const { 
    // Navigation expects:
    caseSensitive, end, 
    // Components:
    elementComponent, 
    // Rests:
    ...propOverrides } = props;
    // Merge original and external props:
    const mergedElementComponentProps = {
        // Original’s-defined props:
        ...elementComponent.props,
        // External overrides (e.g., from `cloneElement()`):
        ...propOverrides,
    };
    // Determine active state:
    const isLinkActive = useDetermineCurrentPage({
        // Navigation expects:
        caseSensitive,
        end,
        // Children:
        children: mergedElementComponentProps.children,
    }) ?? false;
    // Default props:
    const { 
    // States:
    active: elementComponentActive = isLinkActive, 
    // Semantics:
    'aria-current': elementComponentAriaCurrent = (elementComponentActive || undefined) && mergedElementComponentProps['aria-current'], 
    // Rests:
    ...restMergedElementComponentProps } = mergedElementComponentProps;
    // Return enhanced element with optional link wrapping:
    return useOptionalLinkWrapper(cloneElement(elementComponent, 
    // props:
    {
        // Other props:
        ...restMergedElementComponentProps,
        // Semantics:
        'aria-current': elementComponentAriaCurrent,
        // States:
        active: elementComponentActive,
    }));
};
export { ElementWithAutoActive, // Named export for readability.
ElementWithAutoActive as default, // Default export to support React.lazy.
 };
