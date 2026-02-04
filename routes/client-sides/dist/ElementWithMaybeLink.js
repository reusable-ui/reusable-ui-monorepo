'use client'; // The exported `<ElementWithMaybeLink>` component is client side only.
// React:
import { 
// Utilities:
cloneElement, } from 'react';
import { 
// Hooks:
useOptionalLinkWrapper, } from '@reusable-ui/links'; // Smart, router-agnostic link enhancement for semantic React components.
/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 */
const ElementWithMaybeLink = (props) => {
    // Extract props and assign defaults:
    const { 
    // Components:
    elementComponent, 
    // Children:
    children = elementComponent.props.children, // If not provided, defaults to `<Element>`'s `children`.
    // Rests:
    ...propOverrides } = props;
    return useOptionalLinkWrapper(cloneElement(elementComponent, 
    // Props:
    {
        // Original’s-defined props:
        ...elementComponent.props,
        // External overrides (e.g., from `cloneElement()`):
        ...propOverrides,
    }, 
    // Children:
    children));
};
export { ElementWithMaybeLink, // Named export for readability.
ElementWithMaybeLink as default, // Default export to support React.lazy.
 };
