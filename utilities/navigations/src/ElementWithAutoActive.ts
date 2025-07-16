// React:
import {
    // Types:
    type ReactNode,
    type ReactElement,
    type AriaAttributes,
    type PropsWithChildren,
    type JSXElementConstructor,
    
    
    
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

// Utilities:
import {
    type DetermineCurrentPageProps,
    useDetermineCurrentPage,
}                           from './navigations.js'



// React components:

/**
 * @deprecated Use a combination of `useLinkPathMatch` and `useOptionalLinkWrapper` instead.
 * 
 * This legacy props interface was used to enhance a JSX element with auto-assigned
 * `active` and `aria-current` semantics based on its navigation context.
 */
export interface ElementWithAutoActiveProps
    extends
        DetermineCurrentPageProps,
        PropsWithChildren<SemanticProps & AccessibilityProps & Pick<AriaAttributes, 'aria-current'>>
{
    // Components:
    
    /**
     * The original JSX element to enhance with optional client-side navigation behavior,
     *  along with automatic assignment of `active` and `aria-current` props.
     */
    elementComponent  : ReactElement<PropsWithChildren<SemanticProps & AccessibilityProps & Pick<AriaAttributes, 'aria-current'>>, any>
}

/**
 * @deprecated Use a combination of `useLinkPathMatch` and `useOptionalLinkWrapper` instead.
 * 
 * This legacy component wraps a JSX element with auto-detection of link-based activity state,
 * applying `active` and `aria-current` props based on current navigation context.
 */
const ElementWithAutoActive = (props: ElementWithAutoActiveProps): ReactNode | null => {
    // Extract props:
    const {
        // Navigation expects:
        caseSensitive,
        end,
        
        
        
        // Components:
        elementComponent,
        
        
        
        // Rests:
        ...propOverrides
    } = props;
    
    
    
    // Merge original and external props:
    const mergedElementComponentProps : typeof elementComponent.props = {
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
        children : mergedElementComponentProps.children,
    }) ?? false;
    
    
    
    // Default props:
    const {
        // States:
        active         : elementComponentActive = isLinkActive,
        
        
        
        // Semantics:
        'aria-current' : elementComponentAriaCurrent = (elementComponentActive || undefined) && mergedElementComponentProps['aria-current'],
        
        
        
        // Rests:
        ...restMergedElementComponentProps
    } = mergedElementComponentProps;
    
    
    
    // Return enhanced element with optional link wrapping:
    return useOptionalLinkWrapper(
        cloneElement<PropsWithChildren<SemanticProps & AccessibilityProps & Pick<AriaAttributes, 'aria-current'>>>(elementComponent,
            // props:
            {
                // Other props:
                ...restMergedElementComponentProps,
                
                
                
                // Semantics:
                'aria-current' : elementComponentAriaCurrent,
                
                
                
                // States:
                active         : elementComponentActive,
            },
        ) as ReactElement<PropsWithChildren<SemanticProps & AccessibilityProps & Pick<AriaAttributes, 'aria-current'>>, string | JSXElementConstructor<unknown>>
    );
};
export {
    ElementWithAutoActive,            // Named export for readability.
    ElementWithAutoActive as default, // Default export to support React.lazy.
}
