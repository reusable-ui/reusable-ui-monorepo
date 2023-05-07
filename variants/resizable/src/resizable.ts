// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    
    CssSelector,
    
    CssClassName,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    style,
    startsCapitalized,
    
    
    
    // reads/writes css variables configuration:
    CssConfigProps,
    Refs,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                  // writes css in javascript



// defaults:
const _defaultSize : Required<ResizableProps>['size'] = 'md'



// hooks:

// variants:

//#region resizable
export type SizeName = 'sm'|'md'|'lg'



//#region caches
const sizeClassesCache = new Map<string, CssClassName>();
export const createSizeClass = <TSizeName extends string = SizeName>(sizeName: TSizeName): CssClassName => {
    const cached = sizeClassesCache.get(sizeName);
    if (cached !== undefined) return cached;
    
    
    
    const sizeClass = `sz${startsCapitalized(sizeName)}`;
    sizeClassesCache.set(sizeName, sizeClass);
    return sizeClass;
};

const sizeSelectorsCache = new Map<string, CssSelector>();
export const createSizeSelector = <TSizeName extends string = SizeName>(sizeName: TSizeName): CssSelector => {
    const cached = sizeSelectorsCache.get(sizeName);
    if (cached) return cached;
    
    
    
    const sizeClass = createSizeClass(sizeName);
    
    
    
    const sizeRule : CssSelector = `.${sizeClass}`;
    sizeSelectorsCache.set(sizeName, sizeRule);
    return sizeRule;
};

let sizeOptionsCache : SizeName[] | undefined = undefined;
//#endregion caches



export const ifSize = <TSizeName extends string = SizeName>(sizeName: TSizeName, styles: CssStyleCollection): CssRule => rule(createSizeSelector(sizeName), styles);



export interface ResizableStuff { resizableRule: Factory<CssRule> }
const createResizableRule = <TSizeName extends string = SizeName, TConfigProps extends CssConfigProps = CssConfigProps>(config : Refs<TConfigProps>, options : TSizeName[] = (sizeOptions() as TSizeName[])): CssRule => {
    return style({
        ...variants([
            options.map((sizeName) =>
                ifSize(sizeName,
                    // overwrites propName = propName{SizeName}:
                    overwriteProps(config, usesSuffixedProps(config, sizeName)),
                )
            ),
        ]),
    });
};
/**
 * Uses size options.  
 * For example: `sm`, `md`, `lg`.
 * @param config A configuration that defines the variance of the css property for each size in `options`.
 * @param options Defines all available size options.
 * @returns A `ResizableStuff` represents the sizing rules for each size in `options`.
 */
export const usesResizable = <TSizeName extends string = SizeName, TConfigProps extends CssConfigProps = CssConfigProps>(config : Refs<TConfigProps>, options : TSizeName[] = (sizeOptions() as TSizeName[])): ResizableStuff => {
    return {
        resizableRule: () => createResizableRule(config, options),
    };
};

/**
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => sizeOptionsCache ?? (sizeOptionsCache = ['sm', 'md', 'lg']);



export interface ResizableProps<TSizeName extends string = SizeName> {
    // variants:
    size ?: TSizeName|'md'
}
export const useResizable = <TSizeName extends string = SizeName>({size = _defaultSize}: ResizableProps<TSizeName>) => ({
    class: createSizeClass(size),
});
//#endregion resizable
