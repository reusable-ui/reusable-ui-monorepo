// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'             // cssfn general types
import type {
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
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
    // types:
    CssConfigProps,
    Refs,
    
    
    
    // utilities:
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



export interface ResizableRules { resizableRule: Factory<CssRule>, resizableVars: ResizableVars }
/**
 * Uses size options.  
 * For example: `sm`, `lg`.
 * @param resizableConfigProps A configuration that defines the variance of the css property for each size in `options`.
 * @param options Defines all available size options.
 * @returns A `ResizableRules` represents the sizing rules for each size in `options`.
 */
export const usesResizable = <TConfigProps extends CssConfigProps>(resizableConfigProps : Refs<TConfigProps>, options = sizeOptions()): ResizableRules => {
    return {
        resizableRule: () => style({
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
    };
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
