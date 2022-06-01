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
export const useTestSemantic = (props: SemanticProps, options: SemanticOptions): SemanticData => {
    const {
        defaultTag  : props_defaultTag,
        defaultRole : props_defaultRole,
    } = props;
    
    const {
        defaultTag  : options_defaultTag,
        defaultRole : options_defaultRole,
    } = options;
    
    const newOptions = useMemo((): SemanticOptions => {
        const defaultTag = ((): DefaultTag => {
            if (!props_defaultTag) return options_defaultTag;
            
            
            
            if (props_defaultTag === options_defaultTag) return options_defaultTag;
            
            const defaultTag1  = [props_defaultTag  ].flat();
            const defaultTag2  = [options_defaultTag].flat();
            const intersectTag = defaultTag1.filter((item) => defaultTag2.includes(item));
            return intersectTag.length ? intersectTag : null;
        })();
        
        const defaultRole = ((): DefaultRole => {
            if (!props_defaultRole) return options_defaultRole;
            
            
            
            if (props_defaultRole === options_defaultRole) return options_defaultRole;
            
            const defaultRole1  = [props_defaultRole  ].flat();
            const defaultRole2  = [options_defaultRole].flat();
            const intersectRole =  defaultRole1.filter((item) => defaultRole2.includes(item));
            return intersectRole.length ? intersectRole : null;
        })();
        
        return {
            defaultTag,
            defaultRole,
        };
        // eslint-disable-next-line
    }, [props_defaultTag, props_defaultRole, options_defaultTag, options_defaultRole].flat());
    
    
    
    return useSemantic(props, newOptions);
};
