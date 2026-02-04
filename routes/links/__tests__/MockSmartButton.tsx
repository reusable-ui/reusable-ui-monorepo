import {
    // React:
    default as React,
} from 'react'
import {
    fallbackPriority,
    linkFirstPriority,
    fallbackRole,
    fallbackTag,
    
    
    
    type ButtonProps,
    Button,
} from './Button.js'
import {
    useResolvedSemanticAttributes,
} from '@reusable-ui/semantics'
import {
    useOptionalLinkWrapper,
} from '../dist/index.js'



export interface MockSmartButtonProps extends ButtonProps {
}
export const MockSmartButton = (props: MockSmartButtonProps) => {
    const {
        semanticPriority = (
            'href' in props
            ? linkFirstPriority // If    `href` provided => prefer link over button.
            : fallbackPriority  // If no `href` provided => prefer button over link.
        ),
        role = fallbackRole,
        tag  = fallbackTag,
    } = props;
    
    const {
        tag  : resolvedTag,
        role : resolvedRole,
    } = useResolvedSemanticAttributes({
        semanticPriority,
        role,
        tag,
    });
    
    return useOptionalLinkWrapper(
        <Button {...props} tag={resolvedTag} role={resolvedRole} />
    );
};
