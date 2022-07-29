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



// hooks:

// variants:

//#region resizable
export type SizeName = 'sm'|'lg' | (string & {})
export interface ResizableVars {
    // empty (may be added soon)
}
const [resizableVars] = cssVar<ResizableVars>();



export const ifSize = (sizeName: SizeName, styles: CssStyleCollection): CssRule => rule(`.sz${pascalCase(sizeName)}`, styles);



/**
 * Uses size options.  
 * For example: `sm`, `lg`.
 * @param resizableConfigProps A configuration that defines the variance of the css property for each size in `options`.
 * @param options Defines all available size options.
 * @returns A `VariantMixin<ResizableVars>` represents the sizing rules for each size in `options`.
 */
export const usesResizable = <TConfigProps extends CssConfigProps>(resizableConfigProps : Refs<TConfigProps>, options = sizeOptions()): VariantMixin<ResizableVars> => {
    return [
        () => style({
            ...variants([
                options.map((sizeName) =>
                    ifSize(sizeName, {
                        // overwrites propName = propName{SizeName}:
                        ...overwriteProps(resizableConfigProps, usesSuffixedProps(resizableConfigProps, sizeName)),
                    })
                ),
            ]),
        }),
        resizableVars,
    ];
};

/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'lg'];



export interface ResizableProps {
    size ?: SizeName
}
export const useResizable = ({size}: ResizableProps) => ({
    class: size ? `sz${pascalCase(size)}` : null,
});
//#endregion resizable
