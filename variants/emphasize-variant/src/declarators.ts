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
    type EmphasizeVariantVars,
    type CssEmphasizeVariant,
}                           from './types.js'



/**
 * A CSS selector targeting emphasized elements.
 */
export const isEmphasizedSelector    : CssSelectorCollection = '.is-emphasized';

/**
 * A CSS selector targeting non-emphasized elements.
 */
export const isNotEmphasizedSelector : CssSelectorCollection = '.not-emphasized';



/**
 * Applies the given `styles` to emphasized elements.
 * 
 * @param styles The styles applied to emphasized elements.
 * @returns A `CssRule` that applies the given `styles` for emphasized elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEmphasized({
 *         fontWeight: 'bold',
 *         color: 'crimson',
 *     }),
 * });
 * ```
 */
export const ifEmphasized    = (styles: CssStyleCollection): CssRule => rule(isEmphasizedSelector    , styles);

/**
 * Applies the given `styles` to non-emphasized elements.
 * 
 * @param styles The styles applied to non-emphasized elements.
 * @returns A `CssRule` that applies the given `styles` for non-emphasized elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotEmphasized({
 *         fontWeight: 'normal',
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifNotEmphasized = (styles: CssStyleCollection): CssRule => rule(isNotEmphasizedSelector , styles);



/**
 * A strongly typed global mapping of emphasize-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [emphasizeVariantVars] = cssVars<EmphasizeVariantVars>({ minify: false });

/**
 * Generates CSS rules that toggle emphasize-related CSS variables based on the current emphasized state,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling emphasize-aware conditional styling.
 */
export const usesEmphasizeVariant = (): CssEmphasizeVariant => {
    return {
        emphasizeVariantRule : () => style(
            variants({
                ...ifEmphasized(
                    vars({
                        [emphasizeVariantVars.isEmphasized ] : '',      // Valid    when emphasized.
                        [emphasizeVariantVars.notEmphasized] : 'unset', // Poisoned when emphasized.
                    })
                ),
                ...ifNotEmphasized(
                    vars({
                        [emphasizeVariantVars.isEmphasized ] : 'unset', // Poisoned when not emphasized.
                        [emphasizeVariantVars.notEmphasized] : '',      // Valid    when not emphasized.
                    })
                ),
            }),
        ),
        
        emphasizeVariantVars,
    } satisfies CssEmphasizeVariant;
};
