// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A CSS selector targeting excited elements.
 */
export const isExcitedSelector    : CssSelectorCollection = '.is-excited';

/**
 * A CSS selector targeting non-excited elements.
 */
export const isNotExcitedSelector : CssSelectorCollection = '.not-excited';



/**
 * Applies the given `styles` to excited elements.
 * 
 * @param styles The styles applied to excited elements.
 * @returns A `CssRule` that applies the given `styles` for excited elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExcited({
 *         backgroundColor: 'yellow',
 *         color: 'darkorange',
 *     }),
 * });
 * ```
 */
export const ifExcited    = (styles: CssStyleCollection): CssRule => rule(isExcitedSelector    , styles);

/**
 * Applies the given `styles` to non-excited elements.
 * 
 * @param styles The styles applied to non-excited elements.
 * @returns A `CssRule` that applies the given `styles` for non-excited elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotExcited({
 *         backgroundColor: 'lightblue',
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifNotExcited = (styles: CssStyleCollection): CssRule => rule(isNotExcitedSelector , styles);
