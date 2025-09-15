// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ValidityStateVars,
    type CssValidityStateOptions,
    type CssValidityState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



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
export const isValidOrValidatingSelector         : CssSelectorCollection = ':is(.is-valid, .is-validating)';

/**
 * A CSS selector targeting elements that are either invalidating or fully invalid.
 */
export const isInvalidOrInvalidatingSelector     : CssSelectorCollection = ':is(.is-invalid, .is-invalidating)';

/**
 * A CSS selector targeting elements that are either unvalidating or fully unvalidated.
 */
export const isUnvalidatedOrUnvalidatingSelector : CssSelectorCollection = ':is(.is-unvalidated, .is-unvalidating)';



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
 *     ...ifValidOrValidating({
 *         color: 'green',
 *     }),
 * });
 * ```
 */
export const ifValidOrValidating         = (styles: CssStyleCollection): CssRule => rule(isValidOrValidatingSelector         , styles);

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
 *     ...ifInvalidOrInvalidating({
 *         color: 'red',
 *     }),
 * });
 * ```
 */
export const ifInvalidOrInvalidating     = (styles: CssStyleCollection): CssRule => rule(isInvalidOrInvalidatingSelector     , styles);

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
 *     ...ifUnvalidatedOrUnvalidating({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifUnvalidatedOrUnvalidating = (styles: CssStyleCollection): CssRule => rule(isUnvalidatedOrUnvalidatingSelector , styles);



/**
 * A strongly typed global mapping of validity-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [validityStateVars] = cssVars<ValidityStateVars>({ prefix: 'va', minify: false });

// Register the validity-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(validityStateVars.animationValidate);
animationRegistry.registerAnimation(validityStateVars.animationInvalidate);
animationRegistry.registerAnimation(validityStateVars.animationUnvalidate);

/**
 * Generates CSS rules that conditionally apply the validity-related animations based on current validity state,
 * and exposes validity-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing validity-related animations.
 * @returns A CSS API for conditionally apply the validity-related animations based on current validity state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Validity state:
 * import { usesValidityState } from '@reusable-ui/validity-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const validatableBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         validityStateRule,
 *         validityStateVars: { isValid, isInvalid, isUnvalidated },
 *     } = usesValidityState({
 *         animationValidate   : 'var(--box-validate)',
 *         animationInvalidate : 'var(--box-invalidate)',
 *         animationUnvalidate : 'var(--box-unvalidate)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply validity state rules:
 *         ...validityStateRule(),
 *         
 *         // Define validating animation:
 *         ...vars({
 *             '--box-validate': [
 *                 ['0.3s', 'ease-out', 'both', 'splash-validating'],
 *             ],
 *         }),
 *         ...keyframes('splash-validating', {
 *             from: {
 *                 backgroundColor: blue,
 *             },
 *             to: {
 *                 backgroundColor: green,
 *             },
 *         }),
 *         
 *         // Define invalidating animation:
 *         ...vars({
 *             '--box-invalidate': [
 *                 ['0.3s', 'ease-out', 'both', 'splash-invalidating'],
 *             ],
 *         }),
 *         ...keyframes('splash-invalidating', {
 *             from: {
 *                 backgroundColor: blue,
 *             },
 *             to: {
 *                 backgroundColor: red,
 *             },
 *         }),
 *         
 *         // Define unvalidating animation:
 *         ...vars({
 *             '--box-unvalidate': [
 *                 ['0.3s', 'ease-out', 'both', 'splash-unvalidating'],
 *             ],
 *         }),
 *         ...keyframes('splash-unvalidating', {
 *             from: {
 *                 backgroundColor: white,
 *             },
 *             to: {
 *                 backgroundColor: blue,
 *             },
 *         }),
 *         
 *         // Define final background color based on lifecycle state:
 *         ...fallback({
 *             '--backg-valid'       : `${isValid} green`,
 *         }),
 *         ...fallback({
 *             '--backg-invalid'     : `${isInvalid} red`,
 *         }),
 *         ...fallback({
 *             '--backg-unvalidated' : `${isUnvalidated} blue`,
 *         }),
 *         backgroundColor: 'var(--backg-valid, var(--backg-invalid, var(--backg-unvalidated)))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesValidityState = (options?: CssValidityStateOptions): CssValidityState => {
    // Extract options and assign defaults:
    const {
        animationValidate   = 'none', // Defaults to `none`.
        animationInvalidate = 'none', // Defaults to `none`.
        animationUnvalidate = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        validityStateRule : () => style({
            ...states({
                // Apply validate animation during the validating phase:
                ...ifValidating(
                    vars({
                        [validityStateVars.animationValidate  ] : animationValidate,   // Activate the animation (if provided).
                    })
                ),
                
                // Apply invalidate animation during the invalidating phase:
                ...ifInvalidating(
                    vars({
                        [validityStateVars.animationInvalidate] : animationInvalidate, // Activate the animation (if provided).
                    })
                ),
                
                // Apply unvalidate animation during the unvalidating phase:
                ...ifUnvalidating(
                    vars({
                        [validityStateVars.animationUnvalidate] : animationUnvalidate, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as valid during both validating and fully valid states:
                ...ifValidOrValidating(
                    vars({
                        [validityStateVars.isValid      ] : '',      // Valid    when either validating or fully valid.
                        [validityStateVars.isInvalid    ] : 'unset', // Poisoned when either validating or fully valid.
                        [validityStateVars.isUnvalidated] : 'unset', // Poisoned when either validating or fully valid.
                    })
                ),
                
                // Mark as invalid during both invalidating and fully invalid states:
                ...ifInvalidOrInvalidating(
                    vars({
                        [validityStateVars.isValid      ] : 'unset', // Poisoned when either invalidating or fully invalid.
                        [validityStateVars.isInvalid    ] : '',      // Valid    when either invalidating or fully invalid.
                        [validityStateVars.isUnvalidated] : 'unset', // Poisoned when either invalidating or fully invalid.
                    })
                ),
                
                // Mark as unvalidated during both unvalidating and fully unvalidated states:
                ...ifUnvalidatedOrUnvalidating(
                    vars({
                        [validityStateVars.isValid      ] : 'unset', // Poisoned when either unvalidating or fully unvalidated.
                        [validityStateVars.isInvalid    ] : 'unset', // Poisoned when either unvalidating or fully unvalidated.
                        [validityStateVars.isUnvalidated] : '',      // Valid    when either unvalidating or fully unvalidated.
                    })
                ),
            }),
        }),
        
        validityStateVars,
    } satisfies CssValidityState;
};
