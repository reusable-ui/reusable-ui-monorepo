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
 * A CSS selector targeting elements in the fully active state.
 * 
 * Excludes elements currently in the activating transition.
 */
export const isActiveSelector                 : CssSelectorCollection = '.is-active';

/**
 * A CSS selector targeting elements in the fully inactive state.
 * 
 * Excludes elements currently in the deactivating transition.
 */
export const isInactiveSelector               : CssSelectorCollection = '.is-inactive';

/**
 * A CSS selector targeting elements currently in the activating transition.
 * 
 * Excludes elements that have already reached the active state.
 */
export const isActivatingSelector             : CssSelectorCollection = '.is-activating';

/**
 * A CSS selector targeting elements currently in the deactivating transition.
 * 
 * Excludes elements that have already reached the inactive state.
 */
export const isDeactivatingSelector           : CssSelectorCollection = '.is-deactivating';

/**
 * A CSS selector targeting elements that are either activating or fully active.
 */
export const isActivatingOrActiveSelector     : CssSelectorCollection = ':is(.is-activating, .is-active)';

/**
 * A CSS selector targeting elements that are either deactivating or fully inactive.
 */
export const isDeactivatingOrInactiveSelector : CssSelectorCollection = ':is(.is-deactivating, .is-inactive)';



/**
 * Applies the given `styles` to elements in the fully active state.
 * 
 * Excludes elements currently in the activating transition.
 * 
 * @param styles The styles applied to elements in the fully active state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully active state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActive({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActive                 = (styles: CssStyleCollection): CssRule => rule(isActiveSelector                 , styles);

/**
 * Applies the given `styles` to elements in the fully inactive state.
 * 
 * Excludes elements currently in the deactivating transition.
 * 
 * @param styles The styles applied to elements in the fully inactive state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully inactive state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifInactive({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifInactive               = (styles: CssStyleCollection): CssRule => rule(isInactiveSelector               , styles);

/**
 * Applies the given `styles` to elements currently in the activating transition.
 * 
 * Excludes elements that have already reached the active state.
 * 
 * @param styles The styles applied to elements currently in the activating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the activating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActivating({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActivating             = (styles: CssStyleCollection): CssRule => rule(isActivatingSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the deactivating transition.
 * 
 * Excludes elements that have already reached the inactive state.
 * 
 * @param styles The styles applied to elements currently in the deactivating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the deactivating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDeactivating({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifDeactivating           = (styles: CssStyleCollection): CssRule => rule(isDeactivatingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either activating or fully active.
 * 
 * @param styles The styles applied to elements that are either activating or fully active.
 * @returns A `CssRule` that applies the given `styles` for elements that are either activating or fully active.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActivatingOrActive({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActivatingOrActive     = (styles: CssStyleCollection): CssRule => rule(isActivatingOrActiveSelector     , styles);

/**
 * Applies the given `styles` to elements that are either deactivating or fully inactive.
 * 
 * @param styles The styles applied to elements that are either deactivating or fully inactive.
 * @returns A `CssRule` that applies the given `styles` for elements that are either deactivating or fully inactive.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDeactivatingOrInactive({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifDeactivatingOrInactive = (styles: CssStyleCollection): CssRule => rule(isDeactivatingOrInactiveSelector , styles);
