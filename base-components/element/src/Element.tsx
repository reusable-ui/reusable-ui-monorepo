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
    SingleOrArray,
}                           from '@cssfn/types'



// types:

// semantics:
export type Tag         = keyof JSX.IntrinsicElements | ''
export type Role        = React.AriaRole | '' | (string & {})
export type DefaultTag  = SingleOrArray<Optional<Tag>>
export type DefaultRole = SingleOrArray<Optional<Role>>



// hooks:
export interface SemanticOptions
{
    // semantics:
    defaultTag  ?: DefaultTag
    defaultRole ?: DefaultRole
}

export interface SemanticProps
    extends
        SemanticOptions,
        React.AriaAttributes
{
    // semantics:
    tag         ?: Tag
    role        ?: Role
}

export interface SemanticData {
    tag           : Tag  | undefined,
    role          : Role | undefined,
    isDesiredType : boolean,
    isSemanticTag : boolean,
}
export const useSemantic     = (props: SemanticProps, options: SemanticOptions = props): SemanticData => {
    const {
        tag  : preferredTag,
        role : preferredRole,
    } = props;
    
    const {
        defaultTag,
        defaultRole,
    } = options;
    
    return useMemo((): SemanticData => {
        const autoRole      : Role|undefined = preferredRole ??                  ([defaultRole].flat()?.[0] ??  undefined); // take the first item of `defaultRole` (if any)
        const isDesiredType : boolean        = !!autoRole    &&                  ([defaultRole].flat().includes(autoRole)); // the `autoRole` is in `defaultRole`
        
        const tag           : Tag|undefined  = preferredTag  ?? (isDesiredType ? ([defaultTag ].flat()?.[0] ??  undefined) : undefined); // if `isDesiredType` => take the first item of `defaultTag` (if any)
        const isSemanticTag : boolean        = !!tag         &&                  ([defaultTag ].flat().includes(tag     )); // the `tag` is in `defaultTag`
        
        const role          : Role|undefined =                   isDesiredType ? (isSemanticTag ? '' : autoRole) : autoRole; // `''` => has implicit role in `(semantic)tag` => do not render role attribute, `undefined` => lets the BaseComponent decide the appropriate role
        
        
        
        return {
            tag,
            role,
            isDesiredType,
            isSemanticTag,
        };
        // eslint-disable-next-line
    }, [preferredTag, preferredRole, defaultTag, defaultRole].flat());
};
export const useTestSemantic = (props: SemanticProps, options: SemanticOptions) => {
    const {
        semanticTag  : props_semanticTag,
        semanticRole : props_semanticRole,
    } = props;
    
    const {
        semanticTag  : options_semanticTag,
        semanticRole : options_semanticRole,
    } = options;
    
    const newOptions = useMemo((): SemanticOptions => {
        const semanticTag = ((): SemanticTag => {
            if (!props_semanticTag) return options_semanticTag;
            
            
            
            if (props_semanticTag === options_semanticTag) return options_semanticTag;
            
            const semanticTag1 = Array.isArray(props_semanticTag)   ? props_semanticTag   : [props_semanticTag];
            const semanticTag2 = Array.isArray(options_semanticTag) ? options_semanticTag : [options_semanticTag];
            const intersect    = semanticTag1.filter((p) => semanticTag2.includes(p));
            return (intersect.length) ? intersect : null;
        })();
        
        const semanticRole = ((): SemanticRole => {
            if (!props_semanticRole) return options_semanticRole;
            
            
            
            if (props_semanticRole === options_semanticRole) return options_semanticRole;
            
            const semanticRole1 = Array.isArray(props_semanticRole)   ? props_semanticRole   : [props_semanticRole];
            const semanticRole2 = Array.isArray(options_semanticRole) ? options_semanticRole : [options_semanticRole];
            const intersect     =  semanticRole1.filter((p) => semanticRole2.includes(p));
            return (intersect.length) ? intersect : null;
        })();
        
        return {
            semanticTag,
            semanticRole,
        };
        // eslint-disable-next-line
    }, [props_semanticTag, props_semanticRole, options_semanticTag, options_semanticRole].flat());
    
    
    
    return useSemantic(props, newOptions);
};
