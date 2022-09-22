// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // cssfn general types:
    Optional,
    SingleOrArray,
}                           from '@cssfn/core'                  // writes css in javascript



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
export const useTestSemantic = (props: SemanticProps, expected: SemanticOptions): SemanticData => {
    const {tag, role} = useSemantic(props);
    return useSemantic({
        ...expected,
        tag  : tag  || undefined,
        role : role || undefined,
    });
};
