import { keyframes, style, vars, switchOf } from '@cssfn/core'
import { usesValidityState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function validityStateTestStyle() {
    const {
        validityStateRule,
        validityStateVars: { wasValid, wasInvalid, validityFactor },
    } = usesValidityState({
        animationValidating   : 'var(--test-validating)',
        animationInvalidating : 'var(--test-invalidating)',
        animationUnvalidating : 'var(--test-unvalidating)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...validityStateRule(),
        ...animationFeatureRule(),
        
        // Validating animation: interpolate validityFactor from 0/-1 to +1
        ...vars({
            '--test-validating': [
                ['1s', 'linear', 'both', 'boo-test-validating'],
            ],
        }),
        ...keyframes('boo-test-validating', {
            from : {
                // Previous validity state could be unvalidated (0) or invalid (-1).
                
                // Private intermediate resolver for previous invalid state:
                '--_wasInvalidFactor': [[
                    // Only applies if previously invalid:
                    wasInvalid,
                    
                    // The fully invalid value:
                    -1,
                ]],
                
                // Resolve the origin of the transition:
                // - Rendered as: `var(--_wasInvalidFactor, 0)`
                [validityFactor]: switchOf(
                    'var(--_wasInvalidFactor)', // fallback to previous invalid
                    0,                          // otherwise assume unvalidated
                ),
            },
            to   : {
                // Re‑declare the private resolver to prevent interpolation glitches:
                '--_wasInvalidFactor': [[
                    // Only applies if previously invalid:
                    wasInvalid,
                    
                    // The fully invalid value:
                    -1,
                ]],
                
                // Transition target: valid state:
                [validityFactor]: 1,
            },
        }),
        
        // Invalidating animation: interpolate validityFactor from 0/+1 to -1
        ...vars({
            '--test-invalidating': [
                ['1s', 'linear', 'both', 'boo-test-invalidating'],
            ],
        }),
        ...keyframes('boo-test-invalidating', {
            from : {
                // Previous validity state could be unvalidated (0) or valid (+1).
                
                // Private intermediate resolver for previous valid state:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Resolve the origin of the transition:
                // - Rendered as: `var(--_wasValidFactor, 0)`
                [validityFactor]: switchOf(
                    'var(--_wasValidFactor)', // fallback to previous valid
                    0,                        // otherwise assume unvalidated
                ),
            },
            to   : {
                // Re‑declare the private resolver to prevent interpolation glitches:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Transition target: invalid state:
                [validityFactor]: -1,
            },
        }),
        
        // Unvalidating animation: interpolate validityFactor from +1/-1 to 0
        ...vars({
            '--test-unvalidating': [
                ['1s', 'linear', 'both', 'boo-test-unvalidating'],
            ],
        }),
        ...keyframes('boo-test-unvalidating', {
            from : {
                // Previous validity state could be valid (+1) or invalid (-1).
                
                // Private intermediate resolver for previous valid state:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Resolve the origin of the transition:
                // - Rendered as: `var(--_wasValidFactor, -1)`
                [validityFactor]: switchOf(
                    'var(--_wasValidFactor)', // fallback to previous valid
                    -1,                       // otherwise assume invalid
                ),
            },
            to   : {
                // Re‑declare the private resolver to prevent interpolation glitches:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Transition target: unvalidated state:
                [validityFactor]: 0,
            },
        }),
        
        // Example usage:
        // - Background color interpolates with `validityFactor`.
        // - -1 → red, 0 → blue, +1 → green.
        backgroundColor:
`color-mix(in srgb,
    color-mix(in srgb,
        color(srgb 1 0 0)
        calc((
            (-1 * clamp(-1, ${validityFactor}, 0))
        ) * 100%),
        
        color(srgb 0 1 0)
        calc((
            clamp(0.001, ${validityFactor}, 1)
        ) * 100%)
    )
    calc((
        max(${validityFactor}, calc(-1 * ${validityFactor}))
    ) * 100%),
    
    color(srgb 0 0 1)
    calc((
        1 - max(${validityFactor}, calc(-1 * ${validityFactor}))
    ) * 100%)
)`,
        
        // Apply composite animations:
        animation,
    });
}
