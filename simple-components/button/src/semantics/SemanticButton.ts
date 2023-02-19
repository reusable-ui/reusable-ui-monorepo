// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // a semantic management system for react web components:
    SemanticTag,
    SemanticRole,
    useSemantic,
    useTestSemantic,
    
    
    
    // a set of client-side functions:
    isClientSideLink,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    ActionControlProps,
}                           from '@reusable-ui/action-control'  // a base component



// defaults:
const _defaultSemanticTag      : SemanticTag  = ['button', 'a'   ] // uses <button>        as the default semantic, fallbacks to <a>
const _defaultSemanticRole     : SemanticRole = ['button', 'link'] // uses [role="button"] as the default semantic, fallbacks to [role="link"]

const _defaultLinkSemanticTag  : SemanticTag  = ['a'   , 'button'] // uses <a>             as the default semantic, fallbacks to <button>
const _defaultLinkSemanticRole : SemanticRole = ['link', 'button'] // uses [role="link"]   as the default semantic, fallbacks to [role="button"]



// hooks:

// semantics:

//#region SemanticButton
export type ButtonType = 'button'|'submit'|'reset'
export interface SemanticButtonProps<TElement extends Element = HTMLButtonElement>
    extends
        // bases:
        ActionControlProps<TElement>,
        
        // button:
        Omit<React.ButtonHTMLAttributes<TElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // accessibilities:
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // formats:
            |'type'                  // we redefined [type] in <Button>
        >,
        
        // link:
        Omit<React.AnchorHTMLAttributes<TElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // formats:
            |'type'                  // we redefined [type] in <Button>
        >
{
    // actions:
    type ?: ButtonType | (string & {})
}
export const useSemanticButton = <TElement extends Element = HTMLButtonElement>(props: SemanticButtonProps<TElement>) => {
    // fn props:
    const isNativeLink  = !!props.href; // assigning [href] will render the <Button> as <a>
    const isClientLink  = !isNativeLink && React.Children.toArray(props.children).some(isClientSideLink);
    
    /*
        if has [href] or <Link> => default to <a>      or <foo role='link'>
        else                    => default to <button> or <foo role='button'>
    */
    const semanticTag   = props.semanticTag  ?? ((isNativeLink || isClientLink) ? _defaultLinkSemanticTag  : _defaultSemanticTag );
    const semanticRole  = props.semanticRole ?? ((isNativeLink || isClientLink) ? _defaultLinkSemanticRole : _defaultSemanticRole);
    
    const {
        tag  : finalTag,
        role : finalRole,
    } = useSemantic({
        tag  : props.tag,
        role : props.role,
        semanticTag,
        semanticRole,
    });
    
    const {
        isDesiredType : isButtonType,
        isSemanticTag : isSemanticButton,
    } = useTestSemantic(
        // test:
        {
            tag  : props.tag,
            role : props.role,
            semanticTag,
            semanticRole,
        },
        
        // expected:
        {
            semanticTag  : 'button',
            semanticRole : 'button',
        }
    );
    const type         = props.type ?? (isSemanticButton ? 'button' : undefined);
    
    
    
    return {
        isNativeLink,
        isClientSideLink: isClientLink,
        
        semanticTag,
        semanticRole,
        
        tag  : finalTag,
        role : finalRole,
        isButtonType,
        isSemanticButton,
        
        type,
    };
};
//#endregion SemanticButton
