// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // types:
    Optional,
}                           from '@cssfn/types'                 // cssfn general types

// reusable-ui core:
import {
    // react helper hooks:
    useMergeRefs,
    
    
    
    // a semantic management system for react web components:
    SemanticProps,
    useSemantic,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// react components:
export interface GenericProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        React.DOMAttributes<TElement>,
        SemanticProps,
        
        // classes:
        Pick<React.HTMLAttributes<TElement>, 'className'>
{
    // refs:
    elmRef         ?: React.Ref<TElement> // setter ref
    outerRef       ?: React.Ref<TElement> // setter ref
    
    
    
    // identifiers:
    id             ?: string
    
    
    
    // styles:
    style          ?: React.CSSProperties
    
    
    
    // classes:
    mainClass      ?: Optional<string>
    classes        ?: Optional<string>[]
    variantClasses ?: Optional<string>[]
    stateClasses   ?: Optional<string>[]
}
const Generic = <TElement extends Element = HTMLElement>(props: GenericProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // semantics:
        semanticTag  : _semanticTag,
        semanticRole : _semanticRole,
        tag          : _tag,
        role         : _role,
        
        
        
        // refs:
        elmRef,
        outerRef,
        
        
        
        // identifiers:
        id,
        
        
        
        // styles:
        style,
        
        
        
        // classes:
        mainClass,
        classes,
        variantClasses,
        stateClasses,
        className,
    ...restAriaDomProps} = props;
    
    
    
    // semantics:
    const {tag: tagFn, role: roleFn} = useSemantic(props);
    const Tag  = tagFn  || 'div';     // default to <div>
    const role = roleFn || undefined; // ignores an empty string '' of role
    
    
    
    // refs:
    const ref = useMergeRefs(
        elmRef,
        outerRef,
    );
    
    
    
    // classes:
    const mergedClassName = useMemo((): string|undefined => {
        return (
            Array.from(new Set([
                // main:
                mainClass,
                
                
                
                // additionals:
                ...(classes ?? []),
                
                
                
                // variants:
                ...(variantClasses ?? []),
                
                
                
                // states:
                ...(stateClasses ?? []),
                
                
                
                // React's legacy:
                ...(className?.split(' ') ?? []),
            ].filter((c) => !!c))).join(' ')
            ||
            undefined
        );
        // eslint-disable-next-line
    }, [mainClass, classes, variantClasses, stateClasses, className].flat());
    
    
    
    // jsx:
    return (
        <Tag
            {...(restAriaDomProps as {})}
            
            
            
            // semantics:
            role={role}
            
            
            
            // refs:
            {...{
                ref,
            } as {}}
            
            
            
            // identifiers:
            id={id}
            
            
            
            // styles:
            style={style}
            
            
            
            // classes:
            className={mergedClassName}
        />
    );
};
export {
    Generic,
    Generic as default,
}
