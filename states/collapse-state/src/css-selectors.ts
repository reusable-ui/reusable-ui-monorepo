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
 * A CSS selector targeting elements in the fully expanded state.
 * 
 * Excludes elements currently in the expanding transition.
 */
export const isExpandedSelector              : CssSelectorCollection = '.is-expanded';

/**
 * A CSS selector targeting elements in the fully collapsed state.
 * 
 * Excludes elements currently in the collapsing transition.
 */
export const isCollapsedSelector             : CssSelectorCollection = '.is-collapsed';

/**
 * A CSS selector targeting elements currently in the expanding transition.
 * 
 * Excludes elements that have already reached the expanded state.
 */
export const isExpandingSelector             : CssSelectorCollection = '.is-expanding';

/**
 * A CSS selector targeting elements currently in the collapsing transition.
 * 
 * Excludes elements that have already reached the collapsed state.
 */
export const isCollapsingSelector            : CssSelectorCollection = '.is-collapsing';

/**
 * A CSS selector targeting elements that are either expanding or fully expanded.
 */
export const isExpandingOrExpandedSelector   : CssSelectorCollection = ':is(.is-expanding, .is-expanded)';

/**
 * A CSS selector targeting elements that are either collapsing or fully collapsed.
 */
export const isCollapsingOrCollapsedSelector : CssSelectorCollection = ':is(.is-collapsing, .is-collapsed)';



/**
 * Applies the given `styles` to elements in the fully expanded state.
 * 
 * Excludes elements currently in the expanding transition.
 * 
 * @param styles The styles applied to elements in the fully expanded state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully expanded state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExpanded({
 *         visibility: 'visible',
 *     }),
 * });
 * ```
 */
export const ifExpanded              = (styles: CssStyleCollection): CssRule => rule(isExpandedSelector              , styles);

/**
 * Applies the given `styles` to elements in the fully collapsed state.
 * 
 * Excludes elements currently in the collapsing transition.
 * 
 * @param styles The styles applied to elements in the fully collapsed state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully collapsed state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifCollapsed({
 *         visibility: 'hidden',
 *     }),
 * });
 * ```
 */
export const ifCollapsed             = (styles: CssStyleCollection): CssRule => rule(isCollapsedSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the expanding transition.
 * 
 * Excludes elements that have already reached the expanded state.
 * 
 * @param styles The styles applied to elements currently in the expanding transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the expanding transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExpanding({
 *         visibility: 'visible',
 *     }),
 * });
 * ```
 */
export const ifExpanding             = (styles: CssStyleCollection): CssRule => rule(isExpandingSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the collapsing transition.
 * 
 * Excludes elements that have already reached the collapsed state.
 * 
 * @param styles The styles applied to elements currently in the collapsing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the collapsing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifCollapsing({
 *         visibility: 'hidden',
 *     }),
 * });
 * ```
 */
export const ifCollapsing            = (styles: CssStyleCollection): CssRule => rule(isCollapsingSelector            , styles);

/**
 * Applies the given `styles` to elements that are either expanding or fully expanded.
 * 
 * @param styles The styles applied to elements that are either expanding or fully expanded.
 * @returns A `CssRule` that applies the given `styles` for elements that are either expanding or fully expanded.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExpandingOrExpanded({
 *         visibility: 'visible',
 *     }),
 * });
 * ```
 */
export const ifExpandingOrExpanded   = (styles: CssStyleCollection): CssRule => rule(isExpandingOrExpandedSelector   , styles);

/**
 * Applies the given `styles` to elements that are either collapsing or fully collapsed.
 * 
 * @param styles The styles applied to elements that are either collapsing or fully collapsed.
 * @returns A `CssRule` that applies the given `styles` for elements that are either collapsing or fully collapsed.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifCollapsingOrCollapsed({
 *         visibility: 'hidden',
 *     }),
 * });
 * ```
 */
export const ifCollapsingOrCollapsed = (styles: CssStyleCollection): CssRule => rule(isCollapsingOrCollapsedSelector , styles);
