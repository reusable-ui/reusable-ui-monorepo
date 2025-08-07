// cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    type CssClassName,
    
    
    
    // Reads/writes css variables configuration:
    type CssConfigProps,
    type Refs,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui variants:
import {
    // Types:
    type BasicSize,
    type SizeVariantProps,
    
    
    
    // Hooks:
    useSizeVariant,
    usesSizeVariant,
    
    
    
    // Utilities:
    sizeSelector,
    ifSize,
}                           from '@reusable-ui/size-variant'    // A utility for managing sizes consistently across React components.



/**
 * @deprecated - Use `BasicSize` instead.
 */
export type SizeName = BasicSize



const sizeClassesCache = new Map<string, CssClassName>();

/**
 * @deprecated - Use `sizeSelector(sizeName).slice(1)` instead.
 */
export const createSizeClass = <TSizeName extends string = SizeName>(sizeName: TSizeName): CssClassName => {
    const cached = sizeClassesCache.get(sizeName);
    if (cached !== undefined) return cached;
    
    
    
    const sizeClass = (sizeSelector(sizeName) as string).slice(1);
    sizeClassesCache.set(sizeName, sizeClass);
    return sizeClass;
};

/**
 * @deprecated - Use `sizeSelector` instead.
 */
export const createSizeSelector = sizeSelector

let sizeOptionsCache : SizeName[] | undefined = undefined;



// Not deprecated:
export { ifSize }



/**
 * @deprecated - Use `CssSizeVariant` instead.
 */
export interface ResizableStuff { resizableRule: Lazy<CssRule> }

/**
 * @deprecated - Use `usesSizeVariant` instead.
 * 
 * Uses size options.  
 * For example: `sm`, `md`, `lg`.
 * @param config A configuration that defines the variance of the css property for each size in `options`.
 * @param options Defines all available size options.
 * @returns A `ResizableStuff` represents the sizing rules for each size in `options`.
 */
export const usesResizable = <TSizeName extends string = SizeName, TConfigProps extends CssConfigProps = CssConfigProps>(config : Refs<TConfigProps>, options : TSizeName[] = (sizeOptions() as TSizeName[])): ResizableStuff => {
    const { sizeVariantRule } = usesSizeVariant(config, { supportedSizes: options });
    return {
        resizableRule: sizeVariantRule,
    };
};

/**
 * @deprecated - No longer used.
 * 
 * Gets all available size options.
 * @returns A `SizeName[]` represents all available size options.
 */
export const sizeOptions = (): SizeName[] => sizeOptionsCache ?? (sizeOptionsCache = ['sm', 'md', 'lg']);



/**
 * @deprecated - Use `SizeVariantProps` instead.
 */
export interface ResizableProps<TSizeName extends string = SizeName> extends SizeVariantProps<TSizeName> { }

/**
 * @deprecated - Use `useSizeVariant` instead.
 */
export const useResizable = <TSizeName extends string = SizeName>(props: ResizableProps<TSizeName>) => {
    const {
        sizeClassname,
    } = useSizeVariant<TSizeName>(props, {
        defaultSize : 'md' as TSizeName,
        supportedSizes : [
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
            '1em',
            '1lh',
        ] as TSizeName[]
    });
    
    return {
        class: sizeClassname,
    };
};
