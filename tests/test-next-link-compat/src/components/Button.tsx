'use client'

import {
    // React:
    default as React,
    
    
    
    // Types:
    type ReactNode,
    type Ref,
    type DOMAttributes,
} from 'react'
import {
    type Role,
    type Tag,
    type SemanticPriority,
    type SemanticProps,
    useResolvedSemanticAttributes,
} from '@reusable-ui/semantics'
import {
    type AccessibilityProps,
    useResolvedAccessibilityState,
} from '@reusable-ui/accessibilities'



const fallbackButtonPriority    : SemanticPriority = [
    ['button', 'button'],
    ['link', 'a'],
];
const prioritizedLinkThenButton : SemanticPriority = [
    ['link', 'a'],
    ['button', 'button'],
];

const fallbackButtonRole : Role | 'auto' = 'auto';
const fallbackButtonTag  : Tag  | 'auto' = 'auto';

export interface ButtonProps extends SemanticProps, AccessibilityProps, DOMAttributes<HTMLButtonElement> {
    ref      ?: Ref<HTMLButtonElement | null>
    children ?: ReactNode
}
export const Button = (props: ButtonProps) => {
    const {
        semanticPriority = (
            'href' in props
            ? prioritizedLinkThenButton // If    `href` provided => prefer link over button.
            : fallbackButtonPriority    // If no `href` provided => prefer button over link.
        ),
        role             = fallbackButtonRole,
        tag              = fallbackButtonTag,
        
        disabled,
        readOnly,
        active,
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
        
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
    
    const {
        disabled : isDisabled,
        readOnly : isReadOnly,
        active   : isActive,
    } = useResolvedAccessibilityState({
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
    });
    
    
    
    const DynamicTag : Tag = resolvedTag ?? 'span';
    return (
        <DynamicTag
            {...restProps as unknown as {}} // eslint-disable-line @typescript-eslint/no-empty-object-type
            
            role={resolvedRole ?? undefined}
            
            disabled      = {isDisabled || undefined}
            data-readonly = {isReadOnly || undefined}
            data-active   = {isActive   || undefined}
        >
            {props.children}
        </DynamicTag>
    );
};
