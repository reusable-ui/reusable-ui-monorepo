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
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssOutlineVariant,
}                           from './types.js'

// CSS Variables:
import {
    outlineVariantVars,
}                           from './css-variables.js'



/**
 * A CSS selector targeting outlined elements.
 */
export const isOutlinedSelector    : CssSelectorCollection = '.is-outlined';

/**
 * A CSS selector targeting non-outlined elements.
 */
export const isNotOutlinedSelector : CssSelectorCollection = '.not-outlined';



/**
 * Applies the given `styles` to outlined elements.
 * 
 * @param styles The styles applied to outlined elements.
 * @returns A `CssRule` that applies the given `styles` for outlined elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifOutlined({
 *         backgroundColor: 'transparent',
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifOutlined    = (styles: CssStyleCollection): CssRule => rule(isOutlinedSelector    , styles);

/**
 * Applies the given `styles` to non-outlined elements.
 * 
 * @param styles The styles applied to non-outlined elements.
 * @returns A `CssRule` that applies the given `styles` for non-outlined elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotOutlined({
 *         backgroundColor: 'lightblue',
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifNotOutlined = (styles: CssStyleCollection): CssRule => rule(isNotOutlinedSelector , styles);



/**
 * Generates CSS rules that toggle outline-related CSS variables based on the current outlined state,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on outlined state.
 */
export const usesOutlineVariant = (): CssOutlineVariant => {
    return {
        outlineVariantRule : () => style(
            variants({
                ...ifOutlined(
                    vars({
                        [outlineVariantVars.isOutlined ] : '',      // Valid    when outlined.
                        [outlineVariantVars.notOutlined] : 'unset', // Poisoned when outlined.
                    })
                ),
                ...ifNotOutlined(
                    vars({
                        [outlineVariantVars.isOutlined ] : 'unset', // Poisoned when not outlined.
                        [outlineVariantVars.notOutlined] : '',      // Valid    when not outlined.
                    })
                ),
            }),
        ),
        
        outlineVariantVars,
    } satisfies CssOutlineVariant;
};
