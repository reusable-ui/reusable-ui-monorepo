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
    type BasicTheme,
}                           from './types.js'



/**
 * Generates a CSS selector targeting elements with a given `theme`.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {TTheme} theme - The theme token to match, e.g. `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`, or custom value.
 * @returns {CssSelectorCollection} - A `CssSelectorCollection` string for use in conditional styling rules.
 */
export const themeSelector = <TTheme extends string = BasicTheme>(theme: TTheme): CssSelectorCollection => `.t-${theme}`;



/**
 * Applies the given `styles` to elements matching the specified `theme`.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {TTheme} theme - The theme token to match, e.g. `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`, or custom value.
 * @param styles The styles applied to elements matching the specified `theme`.
 * @returns A `CssRule` that applies the given `styles` for the specified `theme`.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'grid',
 *     padding: '1rem',
 *     color: 'currentColor',
 *     ...ifTheme('success', {
 *         backgroundColor: 'lightgreen',
 *         color: 'darkgreen',
 *     }),
 *     ...ifTheme('danger', {
 *         backgroundColor: 'pink',
 *         color: 'darkred',
 *     }),
 * });
 * ```
 */
export const ifTheme = <TTheme extends string = BasicTheme>(theme: TTheme, styles: CssStyleCollection): CssRule => rule(themeSelector(theme), styles);
