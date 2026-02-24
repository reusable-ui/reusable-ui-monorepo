// Cssfn:
import {
    // Writes css in javascript:
    style,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DisabledEffectVars,
    type CssDisabledEffectOptions,
    type CssDisabledEffect,
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
 * A strongly typed global mapping of disabled-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [disabledEffectVars] = cssVars<DisabledEffectVars>({ prefix: 'die', minify: false });

// Register the disabled filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(disabledEffectVars.disabledFilter);



/**
 * Applies disabled-state effects that de-emphasize the entire component surface,
 * making components **visually muted** when disabled.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between enabled and disabled states by animating filter effects.
 * Preserves the current theme colors and variants while reducing emphasis
 * through opacity and/or desaturation.
 * 
 * @param options - An optional configuration for customizing disabled effects.
 * @returns A CSS API containing effect rules and CSS variables for muting theme colors.
 */
export const usesDisabledEffect = (options?: CssDisabledEffectOptions): CssDisabledEffect => {
    // Extract options and assign defaults:
    const {
        disabledOpacity  = 0.5,
        disabledSaturate = 0.5,
        
        disabledCursor   = 'not-allowed',
    } = options ?? {};
    
    
    
    // States:
    const { disabledStateVars : { isDisabled, disableFactorCond } } = usesDisabledState();
    
    
    
    return {
        disabledEffectRule : () => style({
            /**
             * Disabled filter:
             * - Fully enabled → ignored (browser skips invalid formula).
             * - Otherwise     → interpolates opacity and saturation toward the configured values.
             * 
             * Behavior:
             * - factor = 0      → all filters = neutral (no adjustment).
             * - factor = 1      → filters = configured target values.
             * - Between 0 and 1 → smooth interpolation between neutral and target.
             * - Saturation may overshoot/undershoot if factor goes beyond [0,1].
             * - The `clamp(0, ..., 1)` ensures `opacity()` stays within 0…1 range.
             * - The `max(0, ...)` ensures `saturate()` stays non-negative.
             */
            [disabledEffectVars.disabledFilter]:
`
opacity(calc(clamp(0, 1 - (1 - ${disabledOpacity}) * ${disableFactorCond}, 1)))
saturate(calc(max(0, 1 - (1 - ${disabledSaturate}) * ${disableFactorCond})))
`,
            /**
             * Disabled cursor:
             * - Fully enabled → ignored (browser skips invalid formula).
             * - Otherwise     → switches discretely to the configured cursor
             *                   when transitioning toward or fully disabled.
             */
            [disabledEffectVars.disabledCursor]: `${isDisabled} ${disabledCursor}`,
        }),
        
        disabledEffectVars,
    } satisfies CssDisabledEffect;
};
