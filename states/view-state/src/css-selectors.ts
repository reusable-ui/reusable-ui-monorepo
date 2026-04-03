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
 * A CSS selector targeting elements in a fully settled state (not transitioning between views).
 * 
 * Indicates that the view index has reached its target and is no longer transitioning.
 */
export const isViewSettledSelector       : CssSelectorCollection = '.view-settled';

/**
 * A CSS selector targeting elements currently advancing toward the next view (higher index).
 * 
 * Indicates that the view index is transitioning to a higher index.
 */
export const isViewAdvancingSelector     : CssSelectorCollection = '.view-advancing';

/**
 * A CSS selector targeting elements currently receding toward the previous view (lower index).
 * 
 * Indicates that the view index is transitioning to a lower index.
 */
export const isViewRecedingSelector      : CssSelectorCollection = '.view-receding';

/**
 * A CSS selector targeting elements currently transitioning, either advancing or receding between views.
 * 
 * Indicates that the view index is transitioning to a different index.
 */
export const isViewTransitioningSelector : CssSelectorCollection = ':is(.view-advancing, .view-receding)';



/**
 * Applies the given `styles` to elements in a fully settled state (not transitioning between views).
 * 
 * Indicates that the view index has reached its target and is no longer transitioning.
 * 
 * @param styles The styles applied to elements in a fully settled state.
 * @returns A `CssRule` that applies the given `styles` for elements in a fully settled state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewSettled({
 *         opacity: 1,
 *     }),
 * });
 * ```
 */
export const ifViewSettled       = (styles: CssStyleCollection): CssRule => rule(isViewSettledSelector       , styles);

/**
 * Applies the given `styles` to elements currently advancing toward the next view (higher index).
 * 
 * Indicates that the view index is transitioning to a higher index.
 * 
 * @param styles The styles applied to elements currently advancing toward the next view.
 * @returns A `CssRule` that applies the given `styles` for elements currently advancing toward the next view.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewAdvancing({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewAdvancing     = (styles: CssStyleCollection): CssRule => rule(isViewAdvancingSelector     , styles);

/**
 * Applies the given `styles` to elements currently receding toward the previous view (lower index).
 * 
 * Indicates that the view index is transitioning to a lower index.
 * 
 * @param styles The styles applied to elements currently receding toward the previous view.
 * @returns A `CssRule` that applies the given `styles` for elements currently receding toward the previous view.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewReceding({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewReceding      = (styles: CssStyleCollection): CssRule => rule(isViewRecedingSelector      , styles);

/**
 * Applies the given `styles` to elements currently transitioning, either advancing or receding between views.
 * 
 * Indicates that the view index is transitioning to a different index.
 * 
 * @param styles The styles applied to elements currently transitioning, either advancing or receding between views.
 * @returns A `CssRule` that applies the given `styles` for elements currently transitioning, either advancing or receding between views.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewTransitioning({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewTransitioning = (styles: CssStyleCollection): CssRule => rule(isViewTransitioningSelector , styles);
