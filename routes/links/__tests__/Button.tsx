import {
    // Types:
    type ReactNode,
    type Ref,
    type DOMAttributes,
    
    
    
    // React:
    default as React,
} from 'react'
import {
    type Role,
    type Tag,
    type SemanticPriority,
    type SemanticProps,
    useResolvedSemanticAttributes,
} from '@reusable-ui/semantics'
import {
    type DisabledStateProps,
    useDisabledState,
} from '@reusable-ui/disabled-state'



export const fallbackPriority  : SemanticPriority = [
    ['button', 'button'],
    ['link', 'a'],
];
export const linkFirstPriority : SemanticPriority = [
    ['link', 'a'],
    ['button', 'button'],
];

export const fallbackRole : Role | 'auto' = 'auto';
export const fallbackTag  : Tag  | 'auto' = 'auto';

export interface ButtonProps extends SemanticProps, DisabledStateProps, DOMAttributes<HTMLButtonElement> {
    ref      ?: Ref<HTMLButtonElement | null>
    children ?: ReactNode
}
export const Button = (props: ButtonProps) => {
    const {
        semanticPriority = (
            'href' in props
            ? linkFirstPriority // If    `href` provided => prefer link over button.
            : fallbackPriority  // If no `href` provided => prefer button over link.
        ),
        role = fallbackRole,
        tag  = fallbackTag,
        
        disabled,
        cascadeDisabled,
        
        ...restProps
    } = props;
    
    const {
        tag  : resolvedTag,
        role : resolvedRole,
    } = useResolvedSemanticAttributes({
        semanticPriority,
        role,
        tag,
    });
    
    const isDisabled = useDisabledState(props);
    
    
    
    const DynamicTag : Tag = resolvedTag ?? 'span';
    return (
        <DynamicTag
            {...(restProps as {})}
            
            role={resolvedRole ?? undefined}
            
            // @ts-ignore
            href={(props as any).href ?? undefined}
            
            data-testid='interactive-element'
            
            data-disabled = {isDisabled || undefined}
        >
            {props.children}
        </DynamicTag>
    );
};
