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
 * A CSS selector targeting elements currently being sorted.
 */
export const isSortingSelector    : CssSelectorCollection = '.is-sorting';

/**
 * A CSS selector targeting elements currently not being sorted (idle).
 */
export const isNotSortingSelector : CssSelectorCollection = '.not-sorting';



/**
 * Applies the given `styles` to elements currently being sorted.
 * 
 * @param styles The styles applied to elements currently being sorted.
 * @returns A `CssRule` that applies the given `styles` for elements currently being sorted.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifSorting({
 *         opacity: 0.5,
 *         pointerEvents: 'none',
 *     }),
 * });
 * ```
 */
export const ifSorting    = (styles: CssStyleCollection): CssRule => rule(isSortingSelector    , styles);

/**
 * Applies the given `styles` to elements currently not being sorted (idle).
 * 
 * @param styles The styles applied to elements currently not being sorted.
 * @returns A `CssRule` that applies the given `styles` for elements currently not being sorted.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotSorting({
 *         opacity: 1,
 *         pointerEvents: 'auto',
 *     }),
 * });
 * ```
 */
export const ifNotSorting = (styles: CssStyleCollection): CssRule => rule(isNotSortingSelector , styles);
