// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Validity state:
import { usesValidityState } from '@reusable-ui/validity-state';

// CSS-in-JS:
import { atRule, style, vars, keyframes } from '@cssfn/core';

/**
 * Vanilla implementation of a validatable box style.
 * 
 * - Demonstrates how validity-state drives a custom property (`--validityFactor`).
 * - `--validityFactor` animates across a normalized range: -1 (invalid) ⇄ 0 (unvalidated) ⇄ +1 (valid).
 * - Can be applied to color, opacity, scale, rotation, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `validityFactor` variable in validity-state.
 */
export const validatableBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        validityStateRule,
        validityStateVars: { wasValid, wasInvalid, wasUnvalidated },
    } = usesValidityState({
        animationValidating   : 'var(--box-validating)',
        animationInvalidating : 'var(--box-invalidating)',
        animationUnvalidating : 'var(--box-unvalidating)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply validity state rules:
        ...validityStateRule(),
        
        
        
        /**
         * Animatable factor:
         * - Normalized range: -1 ⇄ 0 ⇄ +1
         * - Validating: 0 → +1
         * - Invalidating: 0 → -1
         * - Unvalidating: ±1 => 0
         */
        ...atRule('@property --validityFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0, // default progress = 0 (unvalidated)
        }),
        
        
        
        //#region Transitioning animations
        /**
         * Validating: 0/-1 → +1
         * Resolves origin from previous invalid or unvalidated.
         */
        ...vars({
            '--box-validating': [
                ['0.3s', 'ease-out', 'both', 'validity-validating'],
            ],
        }),
        ...keyframes('validity-validating', {
            from: {
                '--prev-invalid-factor'     : `${wasInvalid} -1`,
                '--prev-unvalidated-factor' : `${wasUnvalidated} 0`,
                '--validityFactor'          : 'var(--prev-invalid-factor, var(--prev-unvalidated-factor))',
            },
            to: {
                '--validityFactor': 1,
            },
        }),
        
        /**
         * Invalidating: 0/+1 → -1
         * Resolves origin from previous valid or unvalidated.
         */
        ...vars({
            '--box-invalidating': [
                ['0.3s', 'ease-out', 'both', 'validity-invalidating'],
            ],
        }),
        ...keyframes('validity-invalidating', {
            from: {
                '--prev-valid-factor'       : `${wasValid} 1`,
                '--prev-unvalidated-factor' : `${wasUnvalidated} 0`,
                '--validityFactor'          : 'var(--prev-valid-factor, var(--prev-unvalidated-factor))',
            },
            to: {
                '--validityFactor': -1,
            },
        }),
        
        /**
         * Unvalidating: ±1 → 0
         * Resolves origin from previous valid or invalid.
         */
        ...vars({
            '--box-unvalidating': [
                ['0.3s', 'ease-out', 'both', 'validity-unvalidating'],
            ],
        }),
        ...keyframes('validity-unvalidating', {
            from: {
                '--prev-valid-factor'       : `${wasValid} 1`,
                '--prev-invalid-factor'     : `${wasInvalid} -1`,
                '--validityFactor'          : 'var(--prev-valid-factor, var(--prev-invalid-factor))',
            },
            to: {
                '--validityFactor': 0,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        /**
         * Derived color driven by `--validityFactor`.
         * 
         * Red Weight: `(-1 * clamp(-1, var(--validityFactor), 0))`
         * - Peaks at -1
         * - Active range: -1 → 0
         * - At -1: clamp = -1 → red = 1
         * - At 0: clamp = 0 → red = 0
         * - At >0: clamp = 0 → red stays 0
         * - Fades from full red at -1 to none at 0, then off
         * 
         * Green Weight: `clamp(0, var(--validityFactor), 1)`
         * - Peaks at +1
         * - Active range: 0 → +1
         * - At 0: clamp = 0 → green = 0
         * - At +1: clamp = 1 → green = 1
         * - At <0: clamp = 0 → green stays 0
         * - Fades in from 0 to full green as factor approaches +1
         * 
         * Composite Red + Green Weight: `abs(var(--validityFactor))`
         * - Peaks at ±1
         * - Active range: -1 → +1
         * - At 0: abs = 0 → composite = 0
         * - In between: fades linearly
         * - Dominates when factor is strongly valid/invalid, fades at center
         * 
         * Blue Weight: `1 - abs(var(--validityFactor))`
         * - Peaks at 0
         * - At 0: abs = 0 → blue = 1
         * - At ±1: abs = 1 → blue = 0
         * - In between: fades linearly
         * - Dominates when unvalidated, fades toward valid/invalid extremes
         * 
         * Total Weight:
         * - Always sums to 1 across factor range [-1, 0, +1]
         * - Ensures proportional mixing of red, green, and blue
         * 
         * Implementation Notes:
         * - Use `oklch` color space for perceptual consistency
         * - Replace `abs(var(--value))` with `max(var(--value), calc(-1 * var(--value)))`
         *   for wider browser support
         */
        backgroundColor:
`color-mix(in oklch,
    color-mix(in oklch,
        red
        calc((
            (-1 * clamp(-1, var(--validityFactor), 0))
        ) * 100%),
        
        green
        calc((
            clamp(0, var(--validityFactor), 1)
        ) * 100%)
    )
    calc((
        max(var(--validityFactor), calc(-1 * var(--validityFactor)))
    ) * 100%),
    
    blue
    calc((
        1 - max(var(--validityFactor), calc(-1 * var(--validityFactor)))
    ) * 100%)
)`,
        
        
        
        // Apply composed animations:
        animation,
    });
};
