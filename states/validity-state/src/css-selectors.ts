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
 * A CSS selector targeting elements in the fully valid state.
 * 
 * Excludes elements currently in the validating transition.
 */
export const isValidSelector                     : CssSelectorCollection = '.is-valid';

/**
 * A CSS selector targeting elements in the fully invalid state.
 * 
 * Excludes elements currently in the invalidating transition.
 */
export const isInvalidSelector                   : CssSelectorCollection = '.is-invalid';

/**
 * A CSS selector targeting elements in the fully unvalidated state.
 * 
 * Excludes elements currently in the unvalidating transition.
 */
export const isUnvalidatedSelector               : CssSelectorCollection = '.is-unvalidated';

/**
 * A CSS selector targeting elements currently in the validating transition.
 * 
 * Excludes elements that have already reached the valid state.
 */
export const isValidatingSelector                : CssSelectorCollection = '.is-validating';

/**
 * A CSS selector targeting elements currently in the invalidating transition.
 * 
 * Excludes elements that have already reached the invalid state.
 */
export const isInvalidatingSelector              : CssSelectorCollection = '.is-invalidating';

/**
 * A CSS selector targeting elements currently in the unvalidating transition.
 * 
 * Excludes elements that have already reached the unvalidated state.
 */
export const isUnvalidatingSelector              : CssSelectorCollection = '.is-unvalidating';

/**
 * A CSS selector targeting elements that are either validating or fully valid.
 */
export const isValidatingOrValidSelector         : CssSelectorCollection = ':is(.is-validating, .is-valid)';

/**
 * A CSS selector targeting elements that are either invalidating or fully invalid.
 */
export const isInvalidatingOrInvalidSelector     : CssSelectorCollection = ':is(.is-invalidating, .is-invalid)';

/**
 * A CSS selector targeting elements that are either unvalidating or fully unvalidated.
 */
export const isUnvalidatingOrUnvalidatedSelector : CssSelectorCollection = ':is(.is-unvalidating, .is-unvalidated)';

/**
 * A CSS selector targeting elements that previously resolved to a valid state.
 * 
 * Applies only during a transition away from `valid`.
 * Does not represent the `validating` phase itself.
 */
export const wasValidSelector                    : CssSelectorCollection = '.was-valid';

/**
 * A CSS selector targeting elements that previously resolved to an invalid state.
 * 
 * Applies only during a transition away from `invalid`.
 * Does not represent the `invalidating` phase itself.
 */
export const wasInvalidSelector                  : CssSelectorCollection = '.was-invalid';

/**
 * A CSS selector targeting elements that previously resolved to an unvalidated state.
 * 
 * Applies only during a transition away from `unvalidated`.
 * Does not represent the `unvalidating` phase itself.
 */
export const wasUnvalidatedSelector              : CssSelectorCollection = '.was-unvalidated';



/**
 * Applies the given `styles` to elements in the fully valid state.
 * 
 * Excludes elements currently in the validating transition.
 * 
 * @param styles The styles applied to elements in the fully valid state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully valid state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifValid({
 *         color: 'green',
 *     }),
 * });
 * ```
 */
export const ifValid                     = (styles: CssStyleCollection): CssRule => rule(isValidSelector                     , styles);

/**
 * Applies the given `styles` to elements in the fully invalid state.
 * 
 * Excludes elements currently in the invalidating transition.
 * 
 * @param styles The styles applied to elements in the fully invalid state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully invalid state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifInvalid({
 *         color: 'red',
 *     }),
 * });
 * ```
 */
export const ifInvalid                   = (styles: CssStyleCollection): CssRule => rule(isInvalidSelector                   , styles);

/**
 * Applies the given `styles` to elements in the fully unvalidated state.
 * 
 * Excludes elements currently in the unvalidating transition.
 * 
 * @param styles The styles applied to elements in the fully unvalidated state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully unvalidated state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnvalidated({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifUnvalidated               = (styles: CssStyleCollection): CssRule => rule(isUnvalidatedSelector               , styles);

/**
 * Applies the given `styles` to elements currently in the validating transition.
 * 
 * Excludes elements that have already reached the valid state.
 * 
 * @param styles The styles applied to elements currently in the validating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the validating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifValidating({
 *         color: 'lightgreen',
 *     }),
 * });
 * ```
 */
export const ifValidating                = (styles: CssStyleCollection): CssRule => rule(isValidatingSelector                , styles);

/**
 * Applies the given `styles` to elements currently in the invalidating transition.
 * 
 * Excludes elements that have already reached the invalid state.
 * 
 * @param styles The styles applied to elements currently in the invalidating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the invalidating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifInvalidating({
 *         color: 'pink',
 *     }),
 * });
 * ```
 */
export const ifInvalidating              = (styles: CssStyleCollection): CssRule => rule(isInvalidatingSelector              , styles);

/**
 * Applies the given `styles` to elements currently in the unvalidating transition.
 * 
 * Excludes elements that have already reached the unvalidated state.
 * 
 * @param styles The styles applied to elements currently in the unvalidating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the unvalidating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnvalidating({
 *         color: 'lightblue',
 *     }),
 * });
 * ```
 */
export const ifUnvalidating              = (styles: CssStyleCollection): CssRule => rule(isUnvalidatingSelector              , styles);

/**
 * Applies the given `styles` to elements that are either validating or fully valid.
 * 
 * @param styles The styles applied to elements that are either validating or fully valid.
 * @returns A `CssRule` that applies the given `styles` for elements that are either validating or fully valid.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifValidatingOrValid({
 *         color: 'green',
 *     }),
 * });
 * ```
 */
export const ifValidatingOrValid         = (styles: CssStyleCollection): CssRule => rule(isValidatingOrValidSelector         , styles);

/**
 * Applies the given `styles` to elements that are either invalidating or fully invalid.
 * 
 * @param styles The styles applied to elements that are either invalidating or fully invalid.
 * @returns A `CssRule` that applies the given `styles` for elements that are either invalidating or fully invalid.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifInvalidatingOrInvalid({
 *         color: 'red',
 *     }),
 * });
 * ```
 */
export const ifInvalidatingOrInvalid     = (styles: CssStyleCollection): CssRule => rule(isInvalidatingOrInvalidSelector     , styles);

/**
 * Applies the given `styles` to elements that are either unvalidating or fully unvalidated.
 * 
 * @param styles The styles applied to elements that are either unvalidating or fully unvalidated.
 * @returns A `CssRule` that applies the given `styles` for elements that are either unvalidating or fully unvalidated.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnvalidatingOrUnvalidated({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifUnvalidatingOrUnvalidated = (styles: CssStyleCollection): CssRule => rule(isUnvalidatingOrUnvalidatedSelector , styles);

/**
 * Applies the given `styles` to elements that previously resolved to a valid state.
 * 
 * Active only during a transition away from `valid`.
 * 
 * @param styles The styles applied to elements that previously resolved to a valid state.
 * @returns A `CssRule` that applies the given `styles` for elements that previously resolved to a valid state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifWasValid({
 *         color: 'green',
 *     }),
 * });
 * ```
 */
export const ifWasValid                  = (styles: CssStyleCollection): CssRule => rule(wasValidSelector                    , styles);

/**
 * Applies the given `styles` to elements that previously resolved to an invalid state.
 * 
 * Active only during a transition away from `invalid`.
 * 
 * @param styles The styles applied to elements that previously resolved to an invalid state.
 * @returns A `CssRule` that applies the given `styles` for elements that previously resolved to an invalid state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifWasInvalid({
 *         color: 'red',
 *     }),
 * });
 * ```
 */
export const ifWasInvalid                = (styles: CssStyleCollection): CssRule => rule(wasInvalidSelector                  , styles);

/**
 * Applies the given `styles` to elements that previously resolved to an unvalidated state.
 * 
 * Active only during a transition away from `unvalidated`.
 * 
 * @param styles The styles applied to elements that previously resolved to an unvalidated state.
 * @returns A `CssRule` that applies the given `styles` for elements that previously resolved to an unvalidated state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifWasUnvalidated({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifWasUnvalidated            = (styles: CssStyleCollection): CssRule => rule(wasUnvalidatedSelector              , styles);
