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
 * A CSS selector targeting elements in the fully hovered state.
 * 
 * Excludes elements currently in the hovering transition.
 */
export const isHoveredSelector               : CssSelectorCollection = '.is-hovered';

/**
 * A CSS selector targeting elements in the fully unhovered state.
 * 
 * Excludes elements currently in the unhovering transition.
 */
export const isUnhoveredSelector             : CssSelectorCollection = '.is-unhovered';

/**
 * A CSS selector targeting elements currently in the hovering transition.
 * 
 * Excludes elements that have already reached the hovered state.
 */
export const isHoveringSelector              : CssSelectorCollection = '.is-hovering';

/**
 * A CSS selector targeting elements currently in the unhovering transition.
 * 
 * Excludes elements that have already reached the unhovered state.
 */
export const isUnhoveringSelector            : CssSelectorCollection = '.is-unhovering';

/**
 * A CSS selector targeting elements that are either hovering or fully hovered.
 */
export const isHoveringOrHoveredSelector     : CssSelectorCollection = ':is(.is-hovering, .is-hovered)';

/**
 * A CSS selector targeting elements that are either unhovering or fully unhovered.
 */
export const isUnhoveringOrUnhoveredSelector : CssSelectorCollection = ':is(.is-unhovering, .is-unhovered)';



/**
 * Applies the given `styles` to elements in the fully hovered state.
 * 
 * Excludes elements currently in the hovering transition.
 * 
 * @param styles The styles applied to elements in the fully hovered state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully hovered state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifHovered({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifHovered               = (styles: CssStyleCollection): CssRule => rule(isHoveredSelector               , styles);

/**
 * Applies the given `styles` to elements in the fully unhovered state.
 * 
 * Excludes elements currently in the unhovering transition.
 * 
 * @param styles The styles applied to elements in the fully unhovered state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully unhovered state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnhovered({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifUnhovered             = (styles: CssStyleCollection): CssRule => rule(isUnhoveredSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the hovering transition.
 * 
 * Excludes elements that have already reached the hovered state.
 * 
 * @param styles The styles applied to elements currently in the hovering transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the hovering transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifHovering({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifHovering              = (styles: CssStyleCollection): CssRule => rule(isHoveringSelector              , styles);

/**
 * Applies the given `styles` to elements currently in the unhovering transition.
 * 
 * Excludes elements that have already reached the unhovered state.
 * 
 * @param styles The styles applied to elements currently in the unhovering transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the unhovering transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnhovering({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifUnhovering            = (styles: CssStyleCollection): CssRule => rule(isUnhoveringSelector            , styles);

/**
 * Applies the given `styles` to elements that are either hovering or fully hovered.
 * 
 * @param styles The styles applied to elements that are either hovering or fully hovered.
 * @returns A `CssRule` that applies the given `styles` for elements that are either hovering or fully hovered.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifHoveringOrHovered({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifHoveringOrHovered     = (styles: CssStyleCollection): CssRule => rule(isHoveringOrHoveredSelector     , styles);

/**
 * Applies the given `styles` to elements that are either unhovering or fully unhovered.
 * 
 * @param styles The styles applied to elements that are either unhovering or fully unhovered.
 * @returns A `CssRule` that applies the given `styles` for elements that are either unhovering or fully unhovered.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnhoveringOrUnhovered({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifUnhoveringOrUnhovered = (styles: CssStyleCollection): CssRule => rule(isUnhoveringOrUnhoveredSelector , styles);
