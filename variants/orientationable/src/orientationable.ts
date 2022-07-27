// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // css values:
    CssComplexBaseValueOf,
    
    
    
    // css custom properties:
    CssCustomSimpleRef,
    CssCustomRef,
    CssCustomValue,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    keyframes,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    pascalCase,
    solidBackg,
}                           from '@cssfn/cssfn'             // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'       // writes css in react hook
import {
    // types:
    ReadonlyCssCustomRefs,
    
    
    
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'           // strongly typed of css variables
import {
    // types:
    CssConfigProps,
    Refs,
    
    
    
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'        // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
    themes as colorThemes,
}                           from '@reusable-ui/colors'      // a color management system
import {
    // configs:
    borders as borderStrokes,
    borderRadiuses,
}                           from '@reusable-ui/borders'     // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'     // a spacer (gap) management system
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'       // a typography management system
import {
    // hooks:
    useTriggerRender,
    useEvent,
    useMergeClasses,
}                           from '@reusable-ui/hooks'       // react helper hooks
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'     // a base component



// hooks:

// variants:

//#region orientationable
export type OrientationName              = 'inline'|'block'
export type OrientationWithDirectionName = 'inline-start'|'inline-end'|'block-start'|'block-end'

//#endregion orientationable
