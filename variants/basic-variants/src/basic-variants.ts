// Reusable-ui variants:
import {
    // Types:
    type StylingVariantsProps,
    
    
    
    // Hooks:
    useStylingVariants,
}                           from '@reusable-ui/styling-variants'    // A utility for extracting and filtering styling-related variant props consistently across React components.



/**
 * @deprecated - Use `StylingVariantsProps` instead.
 */
export interface BasicVariantProps extends StylingVariantsProps {}

/**
 * @deprecated - Use `useStylingVariants` instead.
 */
export const useBasicVariantProps = (props: BasicVariantProps, defaults?: BasicVariantProps): BasicVariantProps => {
    const {
        size,
        theme,
        emphasized,
        outlined,
        mild,
    } = {
        ...defaults,
        ...props,
    };
    
    
    
    return useStylingVariants({
        size,
        theme,
        emphasized,
        outlined,
        mild,
    })
};
