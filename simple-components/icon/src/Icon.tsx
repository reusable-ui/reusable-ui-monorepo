// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeClasses,
    useMergeStyles,
    
    
    
    // size options of UI:
    ResizableProps,
    useResizable,
    
    
    
    // color options of UI:
    ThemableProps,
    useThemable,
    
    
    
    // mild (soft color) variant of UI:
    MildableProps,
    useMildable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component

// internals:
import {
    // features:
    useIcon,
}                           from './features/icon.js'
import type {
    // variants:
    SizeName,
}                           from './variants/resizable.js'
import type {
    default as builtinIconList,
}                           from './icon-font-material.js'



// styles:
export const useIconStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'oqfct2z8qv' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export { builtinIconList }
export type BuiltinIconList = (typeof builtinIconList)[number]

export const customIconList = [
    'instagram',
    'whatsapp',
    'close',
    'busy',
    'prev',
    'next',
    'dropup',
    'dropdown',
    'dropright',
    'dropleft',
] as const;
export type CustomIconList  = (typeof customIconList)[number] | (string & {})

export type IconList =
    |BuiltinIconList
    |CustomIconList

export interface IconProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Omit<GenericProps<TElement>,
            // children:
            |'children' // nested components are not supported
        >,
        
        // span:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
            
            // children:
            |'children' // nested components are not supported
        >,
        
        // variants:
        ResizableProps<SizeName>,
        ThemableProps,
        MildableProps
{
    // appearances:
    icon : IconList
}
const Icon = <TElement extends Element = HTMLSpanElement>(props: IconProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useIconStyleSheet();
    
    
    
    // features:
    const icon             = useIcon(props);
    
    
    
    // variants:
    const resizableVariant = useResizable<SizeName>(props);
    const themableVariant  = useThemable(props);
    const mildableVariant  = useMildable(props);
    
    
    
    // rest props:
    const {
        // appearances:
        icon     : _icon,  // remove
        
        
        
        // variants:
        size     : _size,  // remove
        theme    : _theme, // remove
        mild     : _mild,  // remove
    ...restGenericProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        resizableVariant.class,
        themableVariant.class,
        mildableVariant.class,
    );
    const classes        = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // appearances:
        icon.class,
    );
    
    
    
    // styles:
    const mergedStyle = useMergeStyles(
        // appearances:
        icon.style,
        
        
        
        // preserves the original `style` (can overwrite the `icon.style`):
        props.style,
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // semantics:
            tag  = {props.tag  ?? 'span'}
            role = {props.role ?? 'img' }
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            classes={classes}
            
            
            
            // styles:
            style={mergedStyle}
        />
    );
};
export {
    Icon,
    Icon as default,
}



export interface IconComponentProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        Partial<Pick<IconProps<TElement>, 'icon'>>
{
    // components:
    iconComponent ?: React.ReactComponentElement<any, IconProps<TElement>>
}
