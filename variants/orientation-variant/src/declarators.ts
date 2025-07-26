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
 * A CSS selector targeting elements with horizontal (inline) orientation.
 */
export const orientationInlineSelector : CssSelectorCollection = '.o-inline';

/**
 * A CSS selector targeting elements with vertical (block) orientation.
 */
export const orientationBlockSelector  : CssSelectorCollection = '.o-block';



/**
 * Applies the given `styles` to elements with horizontal (inline) orientation.
 * 
 * @param styles The styles applied to elements with horizontal (inline) orientation.
 * @returns A `CssRule` that applies the given `styles` for horizontal (inline) orientation.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'flex',
 *     ...ifOrientationInline({
 *         flexDirection: 'row',
 *     }),
 * });
 * ```
 */
export const ifOrientationInline = (styles: CssStyleCollection): CssRule => rule(orientationInlineSelector , styles);

/**
 * Applies the given `styles` to elements with vertical (block) orientation.
 * 
 * @param styles The styles applied to elements with vertical (block) orientation.
 * @returns A `CssRule` that applies the given `styles` for vertical (block) orientation.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'flex',
 *     ...ifOrientationBlock({
 *         flexDirection: 'column',
 *     }),
 * });
 * ```
 */
export const ifOrientationBlock  = (styles: CssStyleCollection): CssRule => rule(orientationBlockSelector  , styles);
