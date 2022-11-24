// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    alwaysRule,
    style,
    pascalCase,
    
    
    
    // reads/writes css variables configuration:
    CssConfigProps,
    Refs,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                  // writes css in javascript



// hooks:

// variants:

//#region resizable
export type SizeName = 'sm'|'md'|'lg'



export const ifSize = <TSizeName extends string = SizeName>(sizeName: TSizeName, styles: CssStyleCollection): CssRule => {
    if (sizeName === 'md') return alwaysRule(styles);
    return rule(`.sz${pascalCase(sizeName)}`, styles);
};



export interface ResizableStuff { resizableRule: Factory<CssRule> }
/**
 * Uses size options.  
 * For example: `sm`, `md`, `lg`.
 * @param config A configuration that defines the variance of the css property for each size in `options`.
 * @param options Defines all available size options.
 * @returns A `ResizableStuff` represents the sizing rules for each size in `options`.
 */
export const usesResizable = <TSizeName extends string = SizeName, TConfigProps extends CssConfigProps = CssConfigProps>(config : Refs<TConfigProps>, options : TSizeName[] = (sizeOptions() as TSizeName[])): ResizableStuff => {
    return {
        resizableRule: () => style({
            ...variants([
                options.map((sizeName) =>
                    ifSize(sizeName, {
                        // overwrites propName = propName{SizeName}:
                        ...overwriteProps(config, usesSuffixedProps(config, sizeName)),
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
export const sizeOptions = (): SizeName[] => ['sm', 'md', 'lg'];



export interface ResizableProps<TSizeName extends string = SizeName> {
    // variants:
    size ?: TSizeName
}
export const useResizable = <TSizeName extends string = SizeName>({size}: ResizableProps<TSizeName>) => ({
    class: (!size || (size === 'md')) ? null : `sz${pascalCase(size)}`,
});
//#endregion resizable
