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
 * A CSS selector targeting elements in the fully pressed state.
 * 
 * Excludes elements currently in the pressing transition.
 */
export const isPressedSelector             : CssSelectorCollection = '.is-pressed';

/**
 * A CSS selector targeting elements in the fully released state.
 * 
 * Excludes elements currently in the releasing transition.
 */
export const isReleasedSelector            : CssSelectorCollection = '.is-released';

/**
 * A CSS selector targeting elements currently in the pressing transition.
 * 
 * Excludes elements that have already reached the pressed state.
 */
export const isPressingSelector            : CssSelectorCollection = '.is-pressing';

/**
 * A CSS selector targeting elements currently in the releasing transition.
 * 
 * Excludes elements that have already reached the released state.
 */
export const isReleasingSelector           : CssSelectorCollection = '.is-releasing';

/**
 * A CSS selector targeting elements that are either pressing or fully pressed.
 */
export const isPressingOrPressedSelector   : CssSelectorCollection = ':is(.is-pressing, .is-pressed)';

/**
 * A CSS selector targeting elements that are either releasing or fully released.
 */
export const isReleasingOrReleasedSelector : CssSelectorCollection = ':is(.is-releasing, .is-released)';



/**
 * Applies the given `styles` to elements in the fully pressed state.
 * 
 * Excludes elements currently in the pressing transition.
 * 
 * @param styles The styles applied to elements in the fully pressed state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully pressed state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifPressed({
 *         backgroundColor: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifPressed             = (styles: CssStyleCollection): CssRule => rule(isPressedSelector             , styles);

/**
 * Applies the given `styles` to elements in the fully released state.
 * 
 * Excludes elements currently in the releasing transition.
 * 
 * @param styles The styles applied to elements in the fully released state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully released state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReleased({
 *         backgroundColor: 'blue',
 *     }),
 * });
 * ```
 */
export const ifReleased            = (styles: CssStyleCollection): CssRule => rule(isReleasedSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the pressing transition.
 * 
 * Excludes elements that have already reached the pressed state.
 * 
 * @param styles The styles applied to elements currently in the pressing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the pressing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifPressing({
 *         backgroundColor: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifPressing            = (styles: CssStyleCollection): CssRule => rule(isPressingSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the releasing transition.
 * 
 * Excludes elements that have already reached the released state.
 * 
 * @param styles The styles applied to elements currently in the releasing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the releasing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReleasing({
 *         backgroundColor: 'blue',
 *     }),
 * });
 * ```
 */
export const ifReleasing           = (styles: CssStyleCollection): CssRule => rule(isReleasingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either pressing or fully pressed.
 * 
 * @param styles The styles applied to elements that are either pressing or fully pressed.
 * @returns A `CssRule` that applies the given `styles` for elements that are either pressing or fully pressed.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifPressingOrPressed({
 *         backgroundColor: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifPressingOrPressed   = (styles: CssStyleCollection): CssRule => rule(isPressingOrPressedSelector   , styles);

/**
 * Applies the given `styles` to elements that are either releasing or fully released.
 * 
 * @param styles The styles applied to elements that are either releasing or fully released.
 * @returns A `CssRule` that applies the given `styles` for elements that are either releasing or fully released.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReleasingOrReleased({
 *         backgroundColor: 'blue',
 *     }),
 * });
 * ```
 */
export const ifReleasingOrReleased = (styles: CssStyleCollection): CssRule => rule(isReleasingOrReleasedSelector , styles);
