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
 * Matches elements with horizontal (inline) orientation,
 * including directional variants like `-start` and `-end`.
 */
export const orientationInlineSelector : CssSelectorCollection = ':is(.o-inline, .o-inline-start, .o-inline-end)';

/**
 * Matches elements with vertical (block) orientation,
 * including directional variants like `-start` and `-end`.
 */
export const orientationBlockSelector  : CssSelectorCollection = ':is(.o-block, .o-block-start, .o-block-end)';

/**
 * Matches elements aligned toward the start edge of either the horizontal or vertical axis.
 */
export const orientationStartSelector  : CssSelectorCollection = ':is(.o-inline-start, .o-block-start)';

/**
 * Matches elements aligned toward the end edge of either the horizontal or vertical axis.
 */
export const orientationEndSelector    : CssSelectorCollection = ':is(.o-inline-end, .o-block-end)';



/**
 * Applies the given `styles` to elements with horizontal (inline) orientation,
 * including directional variants like `-start` and `-end`.
 * 
 * @param styles The styles to apply when horizontal (inline) orientation is detected.
 * @returns A `CssRule` that applies the given `styles` for horizontal (inline) orientation.
 */
export const ifOrientationInline = (styles: CssStyleCollection): CssRule => rule(orientationInlineSelector , styles);

/**
 * Applies the given `styles` to elements with vertical (block) orientation,
 * including directional variants like `-start` and `-end`.
 * 
 * @param styles The styles to apply when vertical (block) orientation is detected.
 * @returns A `CssRule` that applies the given `styles` for vertical (block) orientation.
 */
export const ifOrientationBlock  = (styles: CssStyleCollection): CssRule => rule(orientationBlockSelector  , styles);

/**
 * Applies the given `styles` to elements aligned toward the start edge of either the horizontal or vertical axis.
 * 
 * @param styles The styles to apply when start edge alignment is detected.
 * @returns A `CssRule` that applies the given `styles` for start edge alignment.
 */
export const ifOrientationStart  = (styles: CssStyleCollection): CssRule => rule(orientationStartSelector  , styles);

/**
 * Applies the given `styles` to elements aligned toward the end edge of either the horizontal or vertical axis.
 * 
 * @param styles The styles to apply when end edge alignment is detected.
 * @returns A `CssRule` that applies the given `styles` for end edge alignment.
 */
export const ifOrientationEnd    = (styles: CssStyleCollection): CssRule => rule(orientationEndSelector    , styles);
