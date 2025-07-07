'use client' // The exported `<ElementWithMaybeLink>` component is client side only.

// React:
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type PropsWithChildren,
    type Ref,
    
    
    
    // Utilities:
    cloneElement,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Types:
    type SemanticProps,
}                           from '@reusable-ui/semantics'       // Semantic utility for resolving tag and role behaviors in reusable UI components.
import {
    // Types:
    type AccessibilityProps,
}                           from '@reusable-ui/accessibilities' // Composable React utilities for resolving enabled, readOnly, and active state with optional cascading context.
import {
    // Hooks:
    useOptionalLinkWrapper,
}                           from '@reusable-ui/links'           // Smart, router-agnostic link enhancement for semantic React components.



// React components:

/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 * 
 * This component is a legacy wrapper that enhances an element with optional link behavior
 * by delegating to `useOptionalLinkWrapper()` under the hood.
 */
export interface ElementWithMaybeLinkProps {
    // Components:
    
    /**
     * The original JSX element to enhance with optional client navigation behavior.
     */
    elementComponent  : ReactElement<PropsWithChildren<{ outerRef?: Ref<Element> } & AccessibilityProps & SemanticProps>>
    
    
    
    // Children:
    /**
     * Optional override for the `elementComponent`'s children.  
     * If provided, this will replace the original element's children.  
     * If not provided, it defaults to the original element's `children`.
     */
    children         ?: ReactNode
}

/**
 * @deprecated - Use `useOptionalLinkWrapper()` from '@reusable-ui/links' instead.
 */
const ElementWithMaybeLink = (props: ElementWithMaybeLinkProps): ReactElement | null => {
    // Extract props and assign defaults:
    const {
        // Components:
        elementComponent,
        
        
        
        // Children:
        children = elementComponent.props.children, // If not provided, defaults to `<Element>`'s `children`.
        
        
        
        // Rests:
        ...propOverrides
    } = props;
    
    
    
    return useOptionalLinkWrapper(
        cloneElement(elementComponent,
            // Props:
            {
                // Original’s-defined props:
                ...elementComponent.props,
                
                // External overrides (e.g., from `cloneElement()`):
                ...propOverrides,
            },
            
            
            
            // Children:
            children,
        )
    );
};
export {
    ElementWithMaybeLink,            // Named export for readability.
    ElementWithMaybeLink as default, // Default export to support React.lazy.
}
