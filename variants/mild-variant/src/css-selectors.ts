// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
}                           from '@cssfn/core'          // Writes css in javascript.



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
