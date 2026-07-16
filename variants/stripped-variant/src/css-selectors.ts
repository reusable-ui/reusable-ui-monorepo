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
 * A CSS selector targeting non-stripped elements.
 */
export const isNotStrippedSelector : CssSelectorCollection = '.not-stripped';

/**
 * A CSS selector targeting stripped elements.
 */
export const isStrippedSelector    : CssSelectorCollection = '.is-stripped';

/**
 * A CSS selector targeting elements with a specific stripped mode.
 * 
 * @template TStripped The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 * @param specificStripped A specific stripped mode to target (e.g. `'flat'`, `'flush'`, `'joined'`), or `true` to target stripped elements.
 * @returns A `CssSelectorCollection` string for use in conditional styling rules.
 */
export const isStrippedOfSelector  = <TStripped extends string | true>(specificStripped: TStripped): CssSelectorCollection => (specificStripped === true) ? isStrippedSelector : `.is-${specificStripped}`;



/**
 * Applies the given `styles` to stripped elements.
 * 
 * @param styles The styles applied to stripped elements.
 * @returns A `CssRule` that applies the given `styles` for stripped elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifStripped({
 *         padding: 0,
 *         border: 'none',
 *     }),
 * });
 * ```
 */
export const ifStripped    = (styles: CssStyleCollection): CssRule => rule(isStrippedSelector    , styles);

/**
 * Applies the given `styles` to non-stripped elements.
 * 
 * @param styles The styles applied to non-stripped elements.
 * @returns A `CssRule` that applies the given `styles` for non-stripped elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotStripped({
 *         padding: '1rem',
 *         border: 'solid 1px black',
 *     }),
 * });
 * ```
 */
export const ifNotStripped = (styles: CssStyleCollection): CssRule => rule(isNotStrippedSelector , styles);

/**
 * Applies the given `styles` to elements with a specific stripped mode.
 * 
 * @template TStripped The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 * @param specificStripped A specific stripped mode to target (e.g. `'flat'`, `'flush'`, `'joined'`), or `true` to target stripped elements.
 * @param styles The styles applied to elements with a specific stripped mode.
 * @returns A `CssRule` that applies the given `styles` for elements with a specific stripped mode.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifStrippedOf('flat', {
 *         border: 'none',
 *         borderRadius: 0,
 *     }),
 * });
 * ```
 */
export const ifStrippedOf  = <TStripped extends string | true>(specificStripped: TStripped, styles: CssStyleCollection): CssRule => rule(isStrippedOfSelector(specificStripped), styles);
