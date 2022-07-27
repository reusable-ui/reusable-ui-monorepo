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
export const defaultInlineOrientationVariantOptions : OrientationVariantOptions = { defaultOrientation: 'inline' };
export const defaultBlockOrientationVariantOptions  : OrientationVariantOptions = { defaultOrientation: 'block'  };

export type OrientationName = 'inline'|'block'
export interface OrientationMixin {
    defaultOrientation        : OrientationName
    
    orientationInlineSelector : CssSelectorCollection,
    orientationBlockSelector  : CssSelectorCollection,
}

export interface OrientationVariantOptions extends Partial<OrientationMixin> {}
export const usesOrientationVariant = (options?: OrientationVariantOptions, defaultOptions = defaultBlockOrientationVariantOptions): OrientationMixin => {
    const defaultOrientation        = options?.defaultOrientation        ?? defaultOptions.defaultOrientation        ?? 'block';
    const orientationInlineSelector = options?.orientationInlineSelector ?? defaultOptions.orientationInlineSelector ?? ((defaultOrientation === 'inline') ? ':not(.block)'  : '.inline');
    const orientationBlockSelector  = options?.orientationBlockSelector  ?? defaultOptions.orientationBlockSelector  ?? ((defaultOrientation === 'block' ) ? ':not(.inline)' : '.block' );
    
    
    
    return {
        ...options, // preserves foreign props
        
        defaultOrientation,
        orientationInlineSelector,
        orientationBlockSelector,
    };
};



export const defaultInlineStartOrientationWithDirectionVariantOptions : OrientationWithDirectionVariantOptions = { defaultOrientation: 'inline-start' };
export const defaultInlineEndOrientationWithDirectionVariantOptions   : OrientationWithDirectionVariantOptions = { defaultOrientation: 'inline-end'   };
export const defaultBlockStartOrientationWithDirectionVariantOptions  : OrientationWithDirectionVariantOptions = { defaultOrientation: 'block-start'  };
export const defaultBlockEndOrientationWithDirectionVariantOptions    : OrientationWithDirectionVariantOptions = { defaultOrientation: 'block-end'    };

export type OrientationWithDirectionName = 'inline-start'|'inline-end'|'block-start'|'block-end'
export interface OrientationWithDirectionMixin {
    defaultOrientation             : OrientationWithDirectionName
    
    orientationInlineStartSelector : CssSelectorCollection
    orientationInlineEndSelector   : CssSelectorCollection
    orientationBlockStartSelector  : CssSelectorCollection
    orientationBlockEndSelector    : CssSelectorCollection
}

export interface OrientationWithDirectionVariantOptions extends Partial<OrientationWithDirectionMixin> {}
export const usesOrientationWithDirectionVariant = (options?: OrientationWithDirectionVariantOptions, defaultOptions = defaultBlockEndOrientationWithDirectionVariantOptions): OrientationWithDirectionMixin => {
    const defaultOrientation             = options?.defaultOrientation             ?? defaultOptions.defaultOrientation             ?? 'block-end';
    const orientationInlineStartSelector = options?.orientationInlineStartSelector ?? defaultOptions.orientationInlineStartSelector ?? ((defaultOrientation === 'inline-start') ? ':not(:is(.block-start, .block-end, .inline-end))'    : '.inline-start');
    const orientationInlineEndSelector   = options?.orientationInlineEndSelector   ?? defaultOptions.orientationInlineEndSelector   ?? ((defaultOrientation === 'inline-end'  ) ? ':not(:is(.block-start, .block-end, .inline-start))'  : '.inline-end'  );
    const orientationBlockStartSelector  = options?.orientationBlockStartSelector  ?? defaultOptions.orientationBlockStartSelector  ?? ((defaultOrientation === 'block-start' ) ? ':not(:is(.inline-start, .inline-end, .block-end))'   : '.block-start' );
    const orientationBlockEndSelector    = options?.orientationBlockEndSelector    ?? defaultOptions.orientationBlockEndSelector    ?? ((defaultOrientation === 'block-end'   ) ? ':not(:is(.inline-start, .inline-end, .block-start))' : '.block-end'   );
    
    
    
    return {
        ...options, // preserves foreign props
        
        defaultOrientation,
        orientationInlineStartSelector,
        orientationInlineEndSelector,
        orientationBlockStartSelector,
        orientationBlockEndSelector,
    };
};
//#endregion orientationable
