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
 * A CSS selector targeting bare elements.
 */
export const isBareSelector    : CssSelectorCollection = '.is-bare';

/**
 * A CSS selector targeting non-bare elements.
 */
export const isNotBareSelector : CssSelectorCollection = '.not-bare';

/**
 * A CSS selector targeting elements with a specific bare mode.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing string-based modes.
 * @param specificBare - A string representing a specific bare mode (e.g. `'flat'`, `'flush'`, `'joined'`).
 * @returns A `CssSelectorCollection` string for use in conditional styling rules.
 */
export const isBareOfSelector  = <TBare extends string>(specificBare: TBare): CssSelectorCollection => `.is-${specificBare}`;



/**
 * Applies the given `styles` to bare elements.
 * 
 * @param styles - The styles applied to bare elements.
 * @returns A `CssRule` that applies the given `styles` for bare elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBare({
 *         padding: 0,
 *         border: 'none',
 *     }),
 * });
 * ```
 */
export const ifBare    = (styles: CssStyleCollection): CssRule => rule(isBareSelector    , styles);

/**
 * Applies the given `styles` to non-bare elements.
 * 
 * @param styles - The styles applied to non-bare elements.
 * @returns A `CssRule` that applies the given `styles` for non-bare elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotBare({
 *         padding: '1rem',
 *         border: 'solid 1px black',
 *     }),
 * });
 * ```
 */
export const ifNotBare = (styles: CssStyleCollection): CssRule => rule(isNotBareSelector , styles);

/**
 * Applies the given `styles` to elements with a specific bare mode.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing string-based modes.
 * @param specificBare - A string representing a specific bare mode (e.g. `'flat'`, `'flush'`, `'joined'`).
 * @param styles - The styles applied to elements with a specific bare mode.
 * @returns A `CssRule` that applies the given `styles` for elements with a specific bare mode.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBareOf('flat', {
 *         border: 'none',
 *         borderRadius: 0,
 *     }),
 * });
 * ```
 */
export const ifBareOf  = <TBare extends string>(specificBare: TBare, styles: CssStyleCollection): CssRule => rule(isBareOfSelector(specificBare), styles);
