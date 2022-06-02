// // react:
// import {
//     // react:
//     default as React,
// }                           from 'react'

// cssfn:
import type {
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'         // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    
    
    
    // styles:
    style,
    
    
    
    // utilities:
    pascalCase,
}                           from '@cssfn/cssfn'             // writes css in javascript
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'           // strongly typed of css variables
import {
    // createCssConfig,
    
    
    
    // utilities:
    // usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'        // reads/writes css variables configuration

// reusable-ui:
import type {
    // types:
    VariantMixin,
}                           from '@reusable-ui/css-types'   // cssfn css specific types



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'lg' | (string & {})
export interface SizeVars {
    // empty (may be added soon)
}
const [sizes] = cssVar<SizeVars>();



export const ifSize = (sizeName: SizeName, styles: CssStyleCollection): CssRule => rule(`.sz${pascalCase(sizeName)}`, styles);



/**
 * Uses `<Basic>` sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `VariantMixin<SizeVars>` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = (factory : ((sizeName: SizeName) => CssStyleCollection) = sizeOf, options = sizeOptions()): VariantMixin<SizeVars> => {
    return [
        () => style({
            ...variants([
                options.map((sizeName) =>
                    ifSize(sizeName,
                        factory(sizeName)
                    )
                ),
            ]),
        }),
        sizes,
    ];
};

/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The size name.
 * @returns A `CssRule` represents sizing definitions for the given `sizeName`.
 */
export const sizeOf = (sizeName: SizeName): CssRule => style({
    // overwrites propName = propName{SizeName}:
    ...overwriteProps(sizes, usesSuffixedProps(sizes, sizeName)),
});

/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'lg'];



export interface SizeVariant {
    size ?: SizeName
}
export const useSizeVariant = ({size}: SizeVariant) => ({
    class: size ? `sz${pascalCase(size)}` : null,
});
//#endregion sizes

//#region orientation
export type OrientationName = 'inline'|'block'



export interface OrientationRuleOptions {
    defaultOrientation        ?: OrientationName
    orientationInlineSelector ?: CssSelectorCollection
    orientationBlockSelector  ?: CssSelectorCollection
}
export const defaultInlineOrientationRuleOptions : OrientationRuleOptions = { defaultOrientation: 'inline' };
export const defaultBlockOrientationRuleOptions  : OrientationRuleOptions = { defaultOrientation: 'block'  };
export const normalizeOrientationRule = (options: OrientationRuleOptions|undefined, defaultOptions: OrientationRuleOptions): Required<OrientationRuleOptions> => {
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



export type OrientationMixin = readonly [CssSelectorCollection, CssSelectorCollection]
export const usesOrientationRule = (options?: OrientationRuleOptions): OrientationMixin => {
    // options:
    const {
        orientationInlineSelector,
        orientationBlockSelector,
    } = normalizeOrientationRule(options, defaultBlockOrientationRuleOptions);
    
    
    
    return [
        orientationInlineSelector,
        orientationBlockSelector,
    ];
};
//#endregion orientation
