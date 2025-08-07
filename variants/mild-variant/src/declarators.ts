// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    variants,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type MildVariantVars,
    type CssMildVariant,
}                           from './types.js'



/**
 * A CSS selector targeting mild elements.
 */
export const isMildSelector    : CssSelectorCollection = '.is-mild';

/**
 * A CSS selector targeting non-mild elements.
 */
export const isNotMildSelector : CssSelectorCollection = '.not-mild';



/**
 * Applies the given `styles` to mild elements.
 * 
 * @param styles The styles applied to mild elements.
 * @returns A `CssRule` that applies the given `styles` for mild elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifMild({
 *         backgroundColor: 'lightblue',
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifMild    = (styles: CssStyleCollection): CssRule => rule(isMildSelector    , styles);

/**
 * Applies the given `styles` to non-mild elements.
 * 
 * @param styles The styles applied to non-mild elements.
 * @returns A `CssRule` that applies the given `styles` for non-mild elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotMild({
 *         backgroundColor: 'blue',
 *         color: 'white',
 *     }),
 * });
 * ```
 */
export const ifNotMild = (styles: CssStyleCollection): CssRule => rule(isNotMildSelector , styles);



/**
 * A strongly typed global mapping of mild-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [mildVariantVars] = cssVars<MildVariantVars>({ minify: false });

/**
 * Generates CSS rules that toggle mild-related CSS variables based on the current mild mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on mild mode.
 */
export const usesMildVariant = (): CssMildVariant => {
    return {
        mildVariantRule : () => style(
            variants({
                ...ifMild(
                    vars({
                        [mildVariantVars.isMild ] : '',      // Valid    when mild mode is enabled.
                        [mildVariantVars.notMild] : 'unset', // Poisoned when mild mode is enabled.
                    })
                ),
                ...ifNotMild(
                    vars({
                        [mildVariantVars.isMild ] : 'unset', // Poisoned when mild mode is disabled.
                        [mildVariantVars.notMild] : '',      // Valid    when mild mode is disabled.
                    })
                ),
            }),
        ),
        
        mildVariantVars,
    } satisfies CssMildVariant;
};
