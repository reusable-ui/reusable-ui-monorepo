// Types:
import {
    type CssValidityStateOptions,
    type CssValidityState,
}                           from './types.js'

// CSS Variables:
import {
    validityStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifValid,
    ifInvalid,
    ifUnvalidated,
    ifValidating,
    ifInvalidating,
    ifUnvalidating,
    ifValidatingOrValid,
    ifInvalidatingOrInvalid,
    ifUnvalidatingOrUnvalidated,
    ifWasValid,
    ifWasInvalid,
    ifWasUnvalidated,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



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
 *                 // Re-declare the private resolver to prevent interpolation glitches:
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
 *                 // Re-declare the private resolver to prevent interpolation glitches:
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
 *                 // Re-declare the private resolver to prevent interpolation glitches:
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
 *         // - Fades in from near-zero to full green as factor approaches +1
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
export const usesValidityState = (options?: CssValidityStateOptions): CssValidityState => ({
    validityStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a validity state changes:
        animations      : [
            {
                ifState   : ifValidating,
                variable  : validityStateVars.animationValidating,
                animation : options?.animationValidating,
            },
            {
                ifState   : ifInvalidating,
                variable  : validityStateVars.animationInvalidating,
                animation : options?.animationInvalidating,
            },
            {
                ifState   : ifUnvalidating,
                variable  : validityStateVars.animationUnvalidating,
                animation : options?.animationUnvalidating,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifValidatingOrValid,
                variable : validityStateVars.isValid,
            },
            {
                ifState  : ifInvalidatingOrInvalid,
                variable : validityStateVars.isInvalid,
            },
            {
                ifState  : ifUnvalidatingOrUnvalidated,
                variable : validityStateVars.isUnvalidated,
            },
            
            // Past flags:
            {
                ifState  : ifWasValid,
                variable : validityStateVars.wasValid,
            },
            {
                ifState  : ifWasInvalid,
                variable : validityStateVars.wasInvalid,
            },
            {
                ifState  : ifWasUnvalidated,
                variable : validityStateVars.wasUnvalidated,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : validityStateVars.validityFactor,
        factorCondVar   : validityStateVars.validityFactorCond,
        ifInactiveState : ifUnvalidated,
        activeFactors   : [
            {
                ifState : ifValid,
                factor  : 1,
            },
            {
                ifState : ifInvalid,
                factor  : -1,
            },
        ],
    }),
    
    validityStateVars,
}) satisfies CssValidityState;
