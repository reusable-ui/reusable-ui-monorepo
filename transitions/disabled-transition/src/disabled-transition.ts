// Cssfn:
import {
    // Writes css in javascript:
    style,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DisabledTransitionVars,
    type CssDisabledTransitionOptions,
    type CssDisabledTransition,
}                           from './types.js'

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesDisabledState,
}                           from '@reusable-ui/disabled-state'      // Lifecycle-aware enabled/disabled state with transition animations and semantic styling hooks for UI components.



/**
 * A strongly typed global mapping of disabled-transition CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [disabledTransitionVars] = cssVars<DisabledTransitionVars>({ prefix: 'dit', minify: false });

// Register the disabled filter globally for composing a unified filter stack across state packages:
filterRegistry.registerFilter(disabledTransitionVars.disabledFilter);



/**
 * Applies disabled-state transitions that de-emphasize the entire component surface,
 * making the component **visually muted** when disabled.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between enabled and disabled states by animating filter effect.
 * Preserves the current theme colors and variants while reducing emphasis
 * through opacity and/or desaturation.
 * 
 * @param options - An optional configuration for customizing disabled-state transitions.
 * @returns A CSS API containing transition rules and disabled-transition CSS variables for muting theme colors.
 */
export const usesDisabledTransition = (options?: CssDisabledTransitionOptions): CssDisabledTransition => {
    // Extract options and assign defaults:
    const {
        disabledOpacity  = 0.5,
        disabledSaturate = 0.5,
        
        disabledCursor   = 'not-allowed',
    } = options ?? {};
    
    
    
    // States:
    const { disabledStateVars : { isDisabled, disableFactorCond } } = usesDisabledState();
    
    
    
    return {
        disabledTransitionRule : () => style({
            /**
             * Disabled filter:
             * - Fully enabled → ignored (browser skips invalid formula).
             * - Otherwise     → interpolates opacity and saturation toward the configured values.
             * 
             * 
             * Behavior:
             * - factor = 0      → all filters = 1 (neutral, no adjustment).
             * - factor = 1      → filters = configured values (target).
             * - Between 0 and 1 → smooth interpolation between neutral and target.
             * - Saturation may overshoot/undershoot if factor goes beyond [0,1].
             * - The `clamp(0, ..., 1)` ensures `opacity()` stays within 0…1 range.
             * - The `max(0, ...)` ensures `saturation()` stays non-negative.
             */
            [disabledTransitionVars.disabledFilter]:
`
opacity(calc(clamp(0, 1 - (1 - ${disabledOpacity}) * ${disableFactorCond}, 1)))
saturate(calc(max(0, 1 - (1 - ${disabledSaturate}) * ${disableFactorCond})))
`,
            /**
             * Disabled cursor:
             * - Fully enabled → ignored (browser skips invalid formula).
             * - Otherwise     → Discrete switch to the configured cursor
             *                   when transitioning toward or fully disabled.
             */
            [disabledTransitionVars.disabledCursor]: `${isDisabled} ${disabledCursor}`,
        }),
        
        disabledTransitionVars,
    } satisfies CssDisabledTransition;
};
