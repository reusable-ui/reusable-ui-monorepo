// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type BasicSize,
}                           from './types.js'



/**
 * Generates a CSS selector that matches target elements with a given `size`.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param {TSize} size - The size token to match, e.g. `'sm'`, `'md'`, `'lg'`, or custom value.
 * @returns {CssSelectorCollection} - A `CssSelectorCollection` string for use in conditional rules.
 */
export const sizeSelector = <TSize extends string = BasicSize>(size: TSize): CssSelectorCollection => `.s-${size}`;



/**
 * Applies the given `styles` to elements with the specified `size`.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param {TSize} size - The size token to match, e.g. `'sm'`, `'md'`, `'lg'`, or custom value.
 * @param styles The styles to apply when the `size` matches the size class.
 * @returns A `CssRule` that applies the given `styles` for the specified size.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'grid',
 *     padding: '1rem',
 *     ...ifSize('lg', {
 *         padding: '2rem',
 *         fontSize: '1.25rem',
 *     }),
 * });
 * ```
 */
export const ifSize = <TSize extends string = BasicSize>(size: TSize, styles: CssStyleCollection): CssRule => rule(sizeSelector(size), styles);
