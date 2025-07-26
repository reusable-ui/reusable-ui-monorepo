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
 * A CSS selector targeting elements with horizontal (inline) orientation,
 * including directional variants like `-start` and `-end`.
 */
export const orientationInlineSelector : CssSelectorCollection = ':is(.o-inline, .o-inline-start, .o-inline-end)';

/**
 * A CSS selector targeting elements with vertical (block) orientation,
 * including directional variants like `-start` and `-end`.
 */
export const orientationBlockSelector  : CssSelectorCollection = ':is(.o-block, .o-block-start, .o-block-end)';

/**
 * A CSS selector targeting elements aligned toward the start edge of either the horizontal or vertical axis.
 */
export const orientationStartSelector  : CssSelectorCollection = ':is(.o-inline-start, .o-block-start)';

/**
 * A CSS selector targeting elements aligned toward the end edge of either the horizontal or vertical axis.
 */
export const orientationEndSelector    : CssSelectorCollection = ':is(.o-inline-end, .o-block-end)';



/**
 * Applies the given `styles` to elements with horizontal (inline) orientation,
 * including directional variants like `-start` and `-end`.
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
 * Applies the given `styles` to elements with vertical (block) orientation,
 * including directional variants like `-start` and `-end`.
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

/**
 * Applies the given `styles` to elements aligned toward the start edge of either the horizontal or vertical axis.
 * 
 * @param styles The styles applied to elements aligned toward the start edge.
 * @returns A `CssRule` that applies the given `styles` for start edge alignment.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'flex',
 *     ...ifOrientationStart({
 *         textAlign: 'start',
 *     }),
 * });
 * ```
 */
export const ifOrientationStart  = (styles: CssStyleCollection): CssRule => rule(orientationStartSelector  , styles);

/**
 * Applies the given `styles` to elements aligned toward the end edge of either the horizontal or vertical axis.
 * 
 * @param styles The styles applied to elements aligned toward the end edge.
 * @returns A `CssRule` that applies the given `styles` for end edge alignment.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'flex',
 *     ...ifOrientationEnd({
 *         textAlign: 'end',
 *     }),
 * });
 * ```
 */
export const ifOrientationEnd    = (styles: CssStyleCollection): CssRule => rule(orientationEndSelector    , styles);
