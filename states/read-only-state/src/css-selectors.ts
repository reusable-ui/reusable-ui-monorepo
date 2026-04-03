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
 * A CSS selector targeting elements in the fully editable state.
 * 
 * Excludes elements currently in the thawing transition.
 */
export const isEditableSelector           : CssSelectorCollection = '.is-editable';

/**
 * A CSS selector targeting elements in the fully read-only state.
 * 
 * Excludes elements currently in the freezing transition.
 */
export const isReadOnlySelector           : CssSelectorCollection = '.is-readonly';

/**
 * A CSS selector targeting elements currently in the thawing transition.
 * 
 * Excludes elements that have already reached the editable state.
 */
export const isThawingSelector            : CssSelectorCollection = '.is-thawing';

/**
 * A CSS selector targeting elements currently in the freezing transition.
 * 
 * Excludes elements that have already reached the read-only state.
 */
export const isFreezingSelector           : CssSelectorCollection = '.is-freezing';

/**
 * A CSS selector targeting elements that are either thawing or fully editable.
 */
export const isThawingOrEditableSelector  : CssSelectorCollection = ':is(.is-thawing, .is-editable)';

/**
 * A CSS selector targeting elements that are either freezing or fully read-only.
 */
export const isFreezingOrReadOnlySelector : CssSelectorCollection = ':is(.is-freezing, .is-readonly)';



/**
 * Applies the given `styles` to elements in the fully editable state.
 * 
 * Excludes elements currently in the thawing transition.
 * 
 * @param styles - The styles applied to elements in the fully editable state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully editable state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEditable({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifEditable               = (styles: CssStyleCollection): CssRule => rule(isEditableSelector               , styles);

/**
 * Applies the given `styles` to elements in the fully read-only state.
 * 
 * Excludes elements currently in the freezing transition.
 * 
 * @param styles - The styles applied to elements in the fully read-only state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully read-only state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReadOnly({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifReadOnly               = (styles: CssStyleCollection): CssRule => rule(isReadOnlySelector               , styles);

/**
 * Applies the given `styles` to elements currently in the thawing transition.
 * 
 * Excludes elements that have already reached the editable state.
 * 
 * @param styles - The styles applied to elements currently in the thawing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the thawing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifThawing({
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifThawing                = (styles: CssStyleCollection): CssRule => rule(isThawingSelector                , styles);

/**
 * Applies the given `styles` to elements currently in the freezing transition.
 * 
 * Excludes elements that have already reached the read-only state.
 * 
 * @param styles - The styles applied to elements currently in the freezing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the freezing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFreezing({
 *         color: 'darkgray',
 *     }),
 * });
 * ```
 */
export const ifFreezing               = (styles: CssStyleCollection): CssRule => rule(isFreezingSelector               , styles);

/**
 * Applies the given `styles` to elements that are either thawing or fully editable.
 * 
 * @param styles - The styles applied to elements that are either thawing or fully editable.
 * @returns A `CssRule` that applies the given `styles` for elements that are either thawing or fully editable.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifThawingOrEditable({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifThawingOrEditable      = (styles: CssStyleCollection): CssRule => rule(isThawingOrEditableSelector      , styles);

/**
 * Applies the given `styles` to elements that are either freezing or fully read-only.
 * 
 * @param styles - The styles applied to elements that are either freezing or fully read-only.
 * @returns A `CssRule` that applies the given `styles` for elements that are either freezing or fully read-only.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFreezingOrReadOnly({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifFreezingOrReadOnly     = (styles: CssStyleCollection): CssRule => rule(isFreezingOrReadOnlySelector     , styles);
