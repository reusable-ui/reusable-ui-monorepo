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
 * A CSS selector targeting elements in the fully enabled state.
 * 
 * Excludes elements currently in the enabling transition.
 */
export const isEnabledSelector             : CssSelectorCollection = '.is-enabled';

/**
 * A CSS selector targeting elements in the fully disabled state.
 * 
 * Excludes elements currently in the disabling transition.
 */
export const isDisabledSelector            : CssSelectorCollection = '.is-disabled';

/**
 * A CSS selector targeting elements currently in the enabling transition.
 * 
 * Excludes elements that have already reached the enabled state.
 */
export const isEnablingSelector            : CssSelectorCollection = '.is-enabling';

/**
 * A CSS selector targeting elements currently in the disabling transition.
 * 
 * Excludes elements that have already reached the disabled state.
 */
export const isDisablingSelector           : CssSelectorCollection = '.is-disabling';

/**
 * A CSS selector targeting elements that are either enabling or fully enabled.
 */
export const isEnablingOrEnabledSelector   : CssSelectorCollection = ':is(.is-enabling, .is-enabled)';

/**
 * A CSS selector targeting elements that are either disabling or fully disabled.
 */
export const isDisablingOrDisabledSelector : CssSelectorCollection = ':is(.is-disabling, .is-disabled)';



/**
 * Applies the given `styles` to elements in the fully enabled state.
 * 
 * Excludes elements currently in the enabling transition.
 * 
 * @param styles - The styles applied to elements in the fully enabled state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully enabled state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEnabled({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifEnabled             = (styles: CssStyleCollection): CssRule => rule(isEnabledSelector             , styles);

/**
 * Applies the given `styles` to elements in the fully disabled state.
 * 
 * Excludes elements currently in the disabling transition.
 * 
 * @param styles - The styles applied to elements in the fully disabled state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully disabled state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDisabled({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifDisabled            = (styles: CssStyleCollection): CssRule => rule(isDisabledSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the enabling transition.
 * 
 * Excludes elements that have already reached the enabled state.
 * 
 * @param styles - The styles applied to elements currently in the enabling transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the enabling transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEnabling({
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifEnabling            = (styles: CssStyleCollection): CssRule => rule(isEnablingSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the disabling transition.
 * 
 * Excludes elements that have already reached the disabled state.
 * 
 * @param styles - The styles applied to elements currently in the disabling transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the disabling transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDisabling({
 *         color: 'darkgray',
 *     }),
 * });
 * ```
 */
export const ifDisabling           = (styles: CssStyleCollection): CssRule => rule(isDisablingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either enabling or fully enabled.
 * 
 * @param styles - The styles applied to elements that are either enabling or fully enabled.
 * @returns A `CssRule` that applies the given `styles` for elements that are either enabling or fully enabled.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEnablingOrEnabled({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifEnablingOrEnabled   = (styles: CssStyleCollection): CssRule => rule(isEnablingOrEnabledSelector   , styles);

/**
 * Applies the given `styles` to elements that are either disabling or fully disabled.
 * 
 * @param styles - The styles applied to elements that are either disabling or fully disabled.
 * @returns A `CssRule` that applies the given `styles` for elements that are either disabling or fully disabled.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDisablingOrDisabled({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifDisablingOrDisabled = (styles: CssStyleCollection): CssRule => rule(isDisablingOrDisabledSelector , styles);
