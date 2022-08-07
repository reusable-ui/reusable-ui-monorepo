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
}                           from '@cssfn/types'                 // cssfn general types



// types:

// semantics:
export type Tag          = keyof JSX.IntrinsicElements | ''
export type Role         = React.AriaRole | '' | (string & {})
export type SemanticTag  = SingleOrArray<Optional<Tag>>
export type SemanticRole = SingleOrArray<Optional<Role>>



// hooks:
export interface SemanticOptions
{
    // semantics:
    semanticTag  ?: SemanticTag
    semanticRole ?: SemanticRole
}

export interface SemanticProps
    extends
        SemanticOptions,
        React.AriaAttributes
{
    // semantics:
    tag          ?: Tag
    role         ?: Role
}

export interface SemanticData {
    tag           : Tag  | undefined,
    role          : Role | undefined,
    isDesiredType : boolean,
    isSemanticTag : boolean,
}

const separatorSym = Symbol();

export const useSemantic     = (props: SemanticProps, options: SemanticOptions = props): SemanticData => {
    const {
        tag  : preferredTag,
        role : preferredRole,
    } = props;
    
    const {
        semanticTag,
        semanticRole,
    } = options;
    
    return useMemo((): SemanticData => {
        const autoRole      : Role|undefined = preferredRole ??                  ([semanticRole].flat()?.[0] ??  undefined); // take the first item of `semanticRole` (if any)
        const isDesiredType : boolean        = !!autoRole    &&                  ([semanticRole].flat().includes(autoRole)); // the `autoRole` is in `semanticRole`
        
        const tag           : Tag|undefined  = preferredTag  ?? (isDesiredType ? ([semanticTag ].flat()?.[0] ??  undefined) : undefined); // if `isDesiredType` --> take the first item of `semanticTag` (if any)
        const isSemanticTag : boolean        = !!tag         &&                  ([semanticTag ].flat().includes(tag     )); // the `tag` is in `semanticTag`
        
        const role          : Role|undefined =                   isDesiredType ? (isSemanticTag ? '' : autoRole) : autoRole; // `''` --> has implicit role in `(semantic)tag` --> do not render role attribute, `undefined` --> lets the BaseComponent decide the appropriate role
        
        
        
        return {
            tag,
            role,
            isDesiredType,
            isSemanticTag,
        };
        // eslint-disable-next-line
    }, [preferredTag, separatorSym, preferredRole, separatorSym, semanticTag, separatorSym, semanticRole].flat());
};
export const useTestSemantic = (props: SemanticProps, options: SemanticOptions): SemanticData => {
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
            
            const semanticTag1  = [  props_semanticTag].flat();
            const semanticTag2  = [options_semanticTag].flat();
            const intersectTag = semanticTag1.filter((item) => semanticTag2.includes(item));
            return intersectTag.length ? intersectTag : null;
        })();
        
        const semanticRole = ((): SemanticRole => {
            if (!props_semanticRole) return options_semanticRole;
            
            
            
            if (props_semanticRole === options_semanticRole) return options_semanticRole;
            
            const semanticRole1  = [  props_semanticRole].flat();
            const semanticRole2  = [options_semanticRole].flat();
            const intersectRole =  semanticRole1.filter((item) => semanticRole2.includes(item));
            return intersectRole.length ? intersectRole : null;
        })();
        
        return {
            semanticTag,
            semanticRole,
        };
        // eslint-disable-next-line
    }, [props_semanticTag, separatorSym, props_semanticRole, separatorSym, options_semanticTag, separatorSym, options_semanticRole].flat());
    
    
    
    return useSemantic(props, newOptions);
};
