// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    atRule,
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



/**
 * A strongly typed global mapping of validity-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [validityStateVars] = cssVars<ValidityStateVars>({ prefix: 'va', minify: false });

// Register the validity-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(validityStateVars.animationValidating);
animationRegistry.registerAnimation(validityStateVars.animationInvalidating);
animationRegistry.registerAnimation(validityStateVars.animationUnvalidating);

/**
 * Generates CSS rules that conditionally apply the validation animations based on current validity state,
 * and exposes validity-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing validity animations.
 * @returns A CSS API for conditionally apply the validation animations based on current validity state.
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
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: validity lifecycle
 *     const {
 *         validityStateRule,
 *         validityStateVars: { isValid, isInvalid, isUnvalidated, wasValid, wasInvalid, wasUnvalidated, validityFactor },
 *     } = usesValidityState({
 *         animationValidating   : 'var(--box-validating)',
 *         animationInvalidating : 'var(--box-invalidating)',
 *         animationUnvalidating : 'var(--box-unvalidating)',
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
 *         // Validating animation: interpolate validityFactor from 0/-1 to +1
 *         ...vars({
 *             '--box-validating': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-validating'],
 *             ],
 *         }),
 *         ...keyframes('transition-validating', {
 *             from : {
 *                 // Previous validity state could be unvalidated (0) or invalid (-1).
 *                 
 *                 // Private intermediate resolver for previous invalid state:
 *                 '--_wasInvalidFactor': [[
 *                     // Only applies if previously invalid:
 *                     wasInvalid,
 *                     
 *                     // The fully invalid value:
 *                     -1,
 *                 ]],
 *                 
 *                 // Resolve the origin of the transition:
 *                 // - Rendered as: `var(--_wasInvalidFactor, 0)`
 *                 [validityFactor]: switchOf(
 *                     'var(--_wasInvalidFactor)', // fallback to previous invalid
 *                     0,                          // otherwise assume unvalidated
 *                 ),
 *             },
 *             to   : {
 *                 // Re‑declare the private resolver to prevent interpolation glitches:
 *                 '--_wasInvalidFactor': [[
 *                     // Only applies if previously invalid:
 *                     wasInvalid,
 *                     
 *                     // The fully invalid value:
 *                     -1,
 *                 ]],
 *                 
 *                 // Transition target: valid state:
 *                 [validityFactor]: 1,
 *             },
 *         }),
 *         
 *         // Invalidating animation: interpolate validityFactor from 0/+1 to -1
 *         ...vars({
 *             '--box-invalidating': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-invalidating'],
 *             ],
 *         }),
 *         ...keyframes('transition-invalidating', {
 *             from : {
 *                 // Previous validity state could be unvalidated (0) or valid (+1).
 *                 
 *                 // Private intermediate resolver for previous valid state:
 *                 '--_wasValidFactor': [[
 *                     // Only applies if previously valid:
 *                     wasValid,
 *                     
 *                     // The fully valid value:
 *                     1,
 *                 ]],
 *                 
 *                 // Resolve the origin of the transition:
 *                 // - Rendered as: `var(--_wasValidFactor, 0)`
 *                 [validityFactor]: switchOf(
 *                     'var(--_wasValidFactor)', // fallback to previous valid
 *                     0,                        // otherwise assume unvalidated
 *                 ),
 *             },
 *             to   : {
 *                 // Re‑declare the private resolver to prevent interpolation glitches:
 *                 '--_wasValidFactor': [[
 *                     // Only applies if previously valid:
 *                     wasValid,
 *                     
 *                     // The fully valid value:
 *                     1,
 *                 ]],
 *                 
 *                 // Transition target: invalid state:
 *                 [validityFactor]: -1,
 *             },
 *         }),
 *         
 *         // Unvalidating animation: interpolate validityFactor from +1/-1 to 0
 *         ...vars({
 *             '--box-unvalidating': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-unvalidating'],
 *             ],
 *         }),
 *         ...keyframes('transition-unvalidating', {
 *             from : {
 *                 // Previous validity state could be valid (+1) or invalid (-1).
 *                 
 *                 // Private intermediate resolver for previous valid state:
 *                 '--_wasValidFactor': [[
 *                     // Only applies if previously valid:
 *                     wasValid,
 *                     
 *                     // The fully valid value:
 *                     1,
 *                 ]],
 *                 
 *                 // Resolve the origin of the transition:
 *                 // - Rendered as: `var(--_wasValidFactor, -1)`
 *                 [validityFactor]: switchOf(
 *                     'var(--_wasValidFactor)', // fallback to previous valid
 *                     -1,                       // otherwise assume invalid
 *                 ),
 *             },
 *             to   : {
 *                 // Re‑declare the private resolver to prevent interpolation glitches:
 *                 '--_wasValidFactor': [[
 *                     // Only applies if previously valid:
 *                     wasValid,
 *                     
 *                     // The fully valid value:
 *                     1,
 *                 ]],
 *                 
 *                 // Transition target: unvalidated state:
 *                 [validityFactor]: 0,
 *             },
 *         }),
 *         
 *         // Example usage:
 *         // - Background color interpolates with `validityFactor`.
 *         // - -1 → red, 0 → blue, +1 → green.
 *         // 
 *         // Red Weight: `(-1 * clamp(-1, var(--validityFactor), 0))`
 *         // - Peaks at -1
 *         // - Active range: -1 → 0
 *         // - At -1: clamp = -1 → red = 1
 *         // - At 0: clamp = 0 → red = 0
 *         // - At >0: clamp = 0 → red stays 0
 *         // - Fades from full red at -1 to none at 0, then off
 *         // 
 *         // Green Weight: `clamp(0.001, var(--validityFactor), 1)`
 *         // - Peaks at +1
 *         // - Active range: 0 → +1
 *         // - At 0: clamp = 0.001 → green ≈ 0 (epsilon contribution only)
 *         // - At +1: clamp = 1 → green = 1
 *         // - At <0: clamp = 0.001 → green ≈ 0 (epsilon contribution only)
 *         // - Fades in from near‑zero to full green as factor approaches +1
 *         // - The `0.001` is a small epsilon added to avoid producing
 *         //   `color-mix(... red 0%, green 0%)`, which the CSS Color 5 spec
 *         //   defines as invalid (all weights = 0%). This keeps the inner mix
 *         //   valid across browsers while remaining visually imperceptible.
 *         // 
 *         // Composite Red + Green Weight: `abs(var(--validityFactor))`
 *         // - Peaks at ±1
 *         // - Active range: -1 → +1
 *         // - At 0: abs = 0 → composite = 0
 *         // - In between: fades linearly
 *         // - Dominates when factor is strongly valid/invalid, fades at center
 *         // 
 *         // Blue Weight: `1 - abs(var(--validityFactor))`
 *         // - Peaks at 0
 *         // - At 0: abs = 0 → blue = 1
 *         // - At ±1: abs = 1 → blue = 0
 *         // - In between: fades linearly
 *         // - Dominates when unvalidated, fades toward valid/invalid extremes
 *         // 
 *         // Total Weight:
 *         // - Always sums to 1 across factor range [-1, 0, +1]
 *         // - Ensures proportional mixing of red, green, and blue
 *         // 
 *         // Implementation Notes:
 *         // - Use `oklch` color space for perceptual consistency
 *         // - Replace `abs(var(--value))` with `max(var(--value), calc(-1 * var(--value)))`
 *         //   for wider browser support
 *         backgroundColor:
 * `color-mix(in oklch,
 *     color-mix(in oklch,
 *         red
 *         calc((
 *             (-1 * clamp(-1, ${validityFactor}, 0))
 *         ) * 100%),
 *         
 *         green
 *         calc((
 *             clamp(0.001, ${validityFactor}, 1)
 *         ) * 100%)
 *     )
 *     calc((
 *         max(${validityFactor}, calc(-1 * ${validityFactor}))
 *     ) * 100%),
 *     
 *     blue
 *     calc((
 *         1 - max(${validityFactor}, calc(-1 * ${validityFactor}))
 *     ) * 100%)
 * )`,
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
        animationValidating   = 'none', // Defaults to `none`.
        animationInvalidating = 'none', // Defaults to `none`.
        animationUnvalidating = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        validityStateRule : () => style({
            // Register `validityFactor` as an animatable custom property:
            // - Initial value is `0`, ensuring it resolves to `0` when not explicitly defined (`unset`).
            ...atRule(`@property ${validityStateVars.validityFactor.slice(4, -1)}`, { // fix: var(--customProp) => --customProp
                // @ts-ignore
                syntax       : '"<number>"',
                inherits     : true,
                initialValue : 0,
            }),
            
            // Mirror `validityFactor` into `validityFactorCond` by default:
            // - During transitions and when fully valid/invalid, `validityFactorCond` follows `validityFactor`.
            ...vars({
                [validityStateVars.validityFactorCond]: validityStateVars.validityFactor,
            }),
            
            
            
            ...states({
                // Apply validating animation during the validating phase:
                ...ifValidating(
                    vars({
                        [validityStateVars.animationValidating  ] : animationValidating,   // Activate the animation (if provided).
                    })
                ),
                
                // Apply invalidating animation during the invalidating phase:
                ...ifInvalidating(
                    vars({
                        [validityStateVars.animationInvalidating] : animationInvalidating, // Activate the animation (if provided).
                    })
                ),
                
                // Apply unvalidating animation during the unvalidating phase:
                ...ifUnvalidating(
                    vars({
                        [validityStateVars.animationUnvalidating] : animationUnvalidating, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as valid during both validating and fully valid states:
                ...ifValidatingOrValid(
                    vars({
                        [validityStateVars.isValid      ] : '',      // Valid    when either validating or fully valid.
                        [validityStateVars.isInvalid    ] : 'unset', // Poisoned when either validating or fully valid.
                        [validityStateVars.isUnvalidated] : 'unset', // Poisoned when either validating or fully valid.
                    })
                ),
                
                // Mark as invalid during both invalidating and fully invalid states:
                ...ifInvalidatingOrInvalid(
                    vars({
                        [validityStateVars.isValid      ] : 'unset', // Poisoned when either invalidating or fully invalid.
                        [validityStateVars.isInvalid    ] : '',      // Valid    when either invalidating or fully invalid.
                        [validityStateVars.isUnvalidated] : 'unset', // Poisoned when either invalidating or fully invalid.
                    })
                ),
                
                // Mark as unvalidated during both unvalidating and fully unvalidated states:
                ...ifUnvalidatingOrUnvalidated(
                    vars({
                        [validityStateVars.isValid      ] : 'unset', // Poisoned when either unvalidating or fully unvalidated.
                        [validityStateVars.isInvalid    ] : 'unset', // Poisoned when either unvalidating or fully unvalidated.
                        [validityStateVars.isUnvalidated] : '',      // Valid    when either unvalidating or fully unvalidated.
                    })
                ),
                
                
                
                // Mark as previously valid during a transition away from valid:
                ...ifWasValid(
                    vars({
                        [validityStateVars.wasValid      ] : '',      // Valid    when previously valid.
                        [validityStateVars.wasInvalid    ] : 'unset', // Poisoned when previously valid.
                        [validityStateVars.wasUnvalidated] : 'unset', // Poisoned when previously valid.
                    })
                ),
                
                // Mark as previously invalid during a transition away from invalid:
                ...ifWasInvalid(
                    vars({
                        [validityStateVars.wasValid      ] : 'unset', // Poisoned when previously invalid.
                        [validityStateVars.wasInvalid    ] : '',      // Valid    when previously invalid.
                        [validityStateVars.wasUnvalidated] : 'unset', // Poisoned when previously invalid.
                    })
                ),
                
                // Mark as previously unvalidated during a transition away from unvalidated:
                ...ifWasUnvalidated(
                    vars({
                        [validityStateVars.wasValid      ] : 'unset', // Poisoned when previously unvalidated.
                        [validityStateVars.wasInvalid    ] : 'unset', // Poisoned when previously unvalidated.
                        [validityStateVars.wasUnvalidated] : '',      // Valid    when previously unvalidated.
                    })
                ),
                
                
                
                // Assign settled values for `validityFactor`:
                // - Sticks to `+1` when the component is fully valid, `-1` when fully invalid.
                ...ifValid(
                    vars({
                        [validityStateVars.validityFactor] : 1,
                    })
                ),
                ...ifInvalid(
                    vars({
                        [validityStateVars.validityFactor] : -1,
                    })
                ),
                
                // Drop `validityFactorCond` when fully unvalidated (baseline inactive):
                // - Explicitly set to `unset` so dependent declarations fall back cleanly.
                ...ifUnvalidated(
                    vars({
                        [validityStateVars.validityFactorCond]: 'unset',
                    })
                ),
            }),
        }),
        
        validityStateVars,
    } satisfies CssValidityState;
};
