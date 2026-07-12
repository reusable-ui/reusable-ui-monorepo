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
