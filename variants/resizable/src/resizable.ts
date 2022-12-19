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
    alwaysRule,
    style,
    startsCapitalized,
    
    
    
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



//#region caches
const sizeClassesCache = new Map<string, CssClassName|null>();
export const createSizeClass = <TSizeName extends string = SizeName>(sizeName: TSizeName): CssClassName|null => {
    const cached = sizeClassesCache.get(sizeName);
    if (cached !== undefined) return cached;
    
    
    
    if (sizeName === 'md') {
        sizeClassesCache.set(sizeName, null);
        return null;
    } // if
    
    
    
    const sizeClass = `sz${startsCapitalized(sizeName)}`;
    sizeClassesCache.set(sizeName, sizeClass);
    return sizeClass;
};

const sizeSelectorsCache = new Map<string, CssSelector|'&'>();
export const createSizeSelector = <TSizeName extends string = SizeName>(sizeName: TSizeName): CssSelector|'&' => {
    const cached = sizeSelectorsCache.get(sizeName);
    if (cached !== undefined) return cached;
    
    
    
    const sizeClass = createSizeClass(sizeName);
    if (sizeClass === null) return '&';
    
    
    
    const sizeRule : CssSelector = `.${sizeClass}`;
    sizeSelectorsCache.set(sizeName, sizeRule);
    return sizeRule;
};

let sizeOptionsCache : SizeName[] | null = null;
//#endregion caches



export const ifSize = <TSizeName extends string = SizeName>(sizeName: TSizeName, styles: CssStyleCollection): CssRule => {
    const sizeSelector = createSizeSelector(sizeName);
    if (sizeSelector === '&') return alwaysRule(styles);
    return rule(sizeSelector, styles);
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
export const sizeOptions = (): SizeName[] => sizeOptionsCache ?? (sizeOptionsCache = ['sm', 'md', 'lg']);



export interface ResizableProps<TSizeName extends string = SizeName> {
    // variants:
    size ?: TSizeName
}
export const useResizable = <TSizeName extends string = SizeName>({size}: ResizableProps<TSizeName>) => ({
    class: size ? createSizeClass(size) : null,
});
//#endregion resizable
