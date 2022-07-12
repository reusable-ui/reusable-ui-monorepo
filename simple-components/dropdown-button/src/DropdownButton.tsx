// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    // types:
    CssConfigProps,
    Refs,
    
    
    
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // types:
    VariantMixin,
    
    
    
    // hooks:
    SizeVars,
    ifSize          as basicIfSize,
    usesSizeVariant as basicUsesSizeVariant,
    useSizeVariant  as basicUseSizeVariant,
    
    OrientationVariantOptions,
    
    extendsBorder,
    extendsPadding,
    
    
    
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    IconPosition,
    
    
    
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from '@reusable-ui/button-icon'     // a base component



// react components:

export interface DropdownButtonProps
    extends
        // bases:
        ButtonIconProps
        
        // components:
        // TODO
{
}
const DropdownButton = (props: DropdownButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // components:
        // TODO
        
        
        
        // children:
        children,
    ...restButtonIconProps} = props;
    
    
    
    // jsx:
    return (
        <ButtonIcon
            // other props:
            {...restButtonIconProps}
        >
            { children }
        </ButtonIcon>
    );
};
export {
    DropdownButton,
    DropdownButton as default,
}

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType, IconPosition }
