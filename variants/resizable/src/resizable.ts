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
export type SizeName = 'sm'|'lg'



export const ifSize = <TSizeName extends string = SizeName>(sizeName: TSizeName, styles: CssStyleCollection): CssRule => rule(`.sz${pascalCase(sizeName)}`, styles);



export interface ResizableRules { resizableRule: Factory<CssRule> }
/**
 * Uses size options.  
 * For example: `sm`, `lg`.
 * @param resizableConfigProps A configuration that defines the variance of the css property for each size in `options`.
 * @param options Defines all available size options.
 * @returns A `ResizableRules` represents the sizing rules for each size in `options`.
 */
export const usesResizable = <TSizeName extends string = SizeName, TConfigProps extends CssConfigProps = CssConfigProps>(resizableConfigProps : Refs<TConfigProps>, options : TSizeName[] = (sizeOptions() as TSizeName[])): ResizableRules => {
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
    };
};

/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'lg'];



export interface ResizableProps<TSizeName extends string = SizeName> {
    size ?: TSizeName
}
export const useResizable = <TSizeName extends string = SizeName>({size}: ResizableProps<TSizeName>) => ({
    class: size ? `sz${pascalCase(size)}` : null,
});
//#endregion resizable
