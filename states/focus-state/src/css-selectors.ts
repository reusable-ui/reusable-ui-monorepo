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
 * A CSS selector targeting elements in the fully focused state.
 * 
 * Excludes elements currently in the focusing transition.
 */
export const isFocusedSelector           : CssSelectorCollection = '.is-focused';

/**
 * A CSS selector targeting elements in the fully blurred state.
 * 
 * Excludes elements currently in the blurring transition.
 */
export const isBlurredSelector           : CssSelectorCollection = '.is-blurred';

/**
 * A CSS selector targeting elements currently in the focusing transition.
 * 
 * Excludes elements that have already reached the focused state.
 */
export const isFocusingSelector          : CssSelectorCollection = '.is-focusing';

/**
 * A CSS selector targeting elements currently in the blurring transition.
 * 
 * Excludes elements that have already reached the blurred state.
 */
export const isBlurringSelector          : CssSelectorCollection = '.is-blurring';

/**
 * A CSS selector targeting elements that are either focusing or fully focused.
 */
export const isFocusingOrFocusedSelector : CssSelectorCollection = ':is(.is-focusing, .is-focused)';

/**
 * A CSS selector targeting elements that are either blurring or fully blurred.
 */
export const isBlurringOrBlurredSelector : CssSelectorCollection = ':is(.is-blurring, .is-blurred)';



/**
 * Applies the given `styles` to elements in the fully focused state.
 * 
 * Excludes elements currently in the focusing transition.
 * 
 * @param styles The styles applied to elements in the fully focused state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully focused state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFocused({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifFocused           = (styles: CssStyleCollection): CssRule => rule(isFocusedSelector           , styles);

/**
 * Applies the given `styles` to elements in the fully blurred state.
 * 
 * Excludes elements currently in the blurring transition.
 * 
 * @param styles The styles applied to elements in the fully blurred state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully blurred state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBlurred({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifBlurred           = (styles: CssStyleCollection): CssRule => rule(isBlurredSelector           , styles);

/**
 * Applies the given `styles` to elements currently in the focusing transition.
 * 
 * Excludes elements that have already reached the focused state.
 * 
 * @param styles The styles applied to elements currently in the focusing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the focusing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFocusing({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifFocusing          = (styles: CssStyleCollection): CssRule => rule(isFocusingSelector          , styles);

/**
 * Applies the given `styles` to elements currently in the blurring transition.
 * 
 * Excludes elements that have already reached the blurred state.
 * 
 * @param styles The styles applied to elements currently in the blurring transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the blurring transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBlurring({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifBlurring          = (styles: CssStyleCollection): CssRule => rule(isBlurringSelector          , styles);

/**
 * Applies the given `styles` to elements that are either focusing or fully focused.
 * 
 * @param styles The styles applied to elements that are either focusing or fully focused.
 * @returns A `CssRule` that applies the given `styles` for elements that are either focusing or fully focused.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFocusingOrFocused({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifFocusingOrFocused = (styles: CssStyleCollection): CssRule => rule(isFocusingOrFocusedSelector , styles);

/**
 * Applies the given `styles` to elements that are either blurring or fully blurred.
 * 
 * @param styles The styles applied to elements that are either blurring or fully blurred.
 * @returns A `CssRule` that applies the given `styles` for elements that are either blurring or fully blurred.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBlurringOrBlurred({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifBlurringOrBlurred = (styles: CssStyleCollection): CssRule => rule(isBlurringOrBlurredSelector , styles);
