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

// reusable-ui:
import {
    // utilities:
    setRef,
}                           from '@reusable-ui/utilities'   // common utility functions



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

const separatorSym = Symbol();

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
        
        const tag           : Tag|undefined  = preferredTag  ?? (isDesiredType ? ([defaultTag ].flat()?.[0] ??  undefined) : undefined); // if `isDesiredType` --> take the first item of `defaultTag` (if any)
        const isSemanticTag : boolean        = !!tag         &&                  ([defaultTag ].flat().includes(tag     )); // the `tag` is in `defaultTag`
        
        const role          : Role|undefined =                   isDesiredType ? (isSemanticTag ? '' : autoRole) : autoRole; // `''` --> has implicit role in `(semantic)tag` --> do not render role attribute, `undefined` --> lets the BaseComponent decide the appropriate role
        
        
        
        return {
            tag,
            role,
            isDesiredType,
            isSemanticTag,
        };
        // eslint-disable-next-line
    }, [preferredTag, separatorSym, preferredRole, separatorSym, defaultTag, separatorSym, defaultRole].flat());
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
    }, [props_defaultTag, separatorSym, props_defaultRole, separatorSym, options_defaultTag, separatorSym, options_defaultRole].flat());
    
    
    
    return useSemantic(props, newOptions);
};



// react components:
export interface GenericProps<TElement extends Element = Element>
    extends
        // React.DOMAttributes<TElement>,
        SemanticProps
{
    // essentials:
    style          ?: React.CSSProperties
    outerRef       ?: React.Ref<TElement> // setter ref
    elmRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // identifiers:
    id             ?: string
    
    
    
    // classes:
    mainClass      ?: Optional<string>
    classes        ?: Optional<string>[]
    variantClasses ?: Optional<string>[]
    stateClasses   ?: Optional<string>[]
}
const Generic = <TElement extends Element = Element>(props: GenericProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // semantics:
        defaultTag  : _defaultTag,
        defaultRole : _defaultRole,
        tag         : _tag,
        role        : _role,
        
        
        
        // refs:
        outerRef,
        elmRef,
        
        
        
        // identifiers:
        id,
        
        
        
        // styles:
        style,
        
        
        
        // classes:
        mainClass,
        classes,
        variantClasses,
        stateClasses,
    ...restAriaProps} = props;
    
    
    
    // semantics:
    const {tag: tagFn, role: roleFn} = useSemantic(props);
    const Tag  = tagFn  || 'div';     // default to <div>
    const role = roleFn || undefined; // ignores an empty string '' of role
    
    
    
    // refs:
    const ref = useMemo((): React.Ref<TElement>|undefined => {
        if (!outerRef && !elmRef) return undefined; // both are undefined => undefined
        
        if (outerRef && elmRef) { // both are defined => merge them
            return (elm: TElement): void => {
                setRef(outerRef, elm);
                setRef(elmRef  , elm);
            };
        } // if
        
        return outerRef ?? elmRef; // one of them is defined
    }, [outerRef, elmRef]);
    
    
    
    // jsx:
    return (
        <Tag
            // semantics:
            role={role}
            {...restAriaProps}
            
            
            
            // refs:
            {...{
                ref,
            } as {}}
            
            
            
            // identifiers:
            id={id}
            
            
            
            // styles:
            style={style}
        />
    );
};
export {
    Generic,
    Generic as default,
}
