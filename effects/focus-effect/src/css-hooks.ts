// Cssfn:
import {
    // Writes css in javascript:
    style,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssFocusEffectOptions,
    type CssFocusEffect,
}                           from './types.js'

// CSS Variables:
import {
    focusEffectVars,
}                           from './css-variables.js'

// Reusable-ui configs:
import {
    spacerVars,
}                           from '@reusable-ui/spacers'             // A flexible spacer management system for web components, utilizing CSS custom properties to enable dynamic spacing, theming, and customization.

// Reusable-ui features:
import {
    usesRingFeature,
}                           from '@reusable-ui/ring-feature'        // A styling utility for resolving the appropriate ring color based on the currently active theme variant.

// Reusable-ui states:
import {
    usesFocusState,
}                           from '@reusable-ui/focus-state'         // Lifecycle-aware focus/blur state with transition animations and semantic styling hooks for UI components.



/**
 * Applies focus-state effects that highlight components with a ring indicator,
 * making them **visually distinct** and signaling readiness for interaction when focused.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between focus and blur states by animating the ring width.
 * Uses the current theme color, ensuring harmony with the component's appearance.
 * 
 * @param options - An optional configuration for customizing focus effects.
 * @returns A CSS API containing effect rules and CSS variables for the focus ring indicator.
 */
export const usesFocusEffect = (options?: CssFocusEffectOptions): CssFocusEffect => {
    // Extract options and assign defaults:
    const {
        ringWidth = spacerVars.xs, // Defaults to `spacerVars.xs` (small ring width).
    } = options ?? {};
    
    
    
    // Features:
    const { ringFeatureVars : { ringColor } } = usesRingFeature();
    
    // States:
    const { focusStateVars : { focusFactorCond } } = usesFocusState();
    
    
    
    return {
        focusEffectRule : () => style({
            /**
             * Focus ring:
             * - Fully blurred → ignored (browser skips invalid formula).
             * - Otherwise     → interpolates the ring width toward the configured value.
             * 
             * Behavior:
             * - factor = 0      → ring width = 0 (no visible ring).
             * - factor = 1      → ring width = configured value (full ring).
             * - Between 0 and 1 → smooth interpolation between 0 and target width.
             * - Ring width may overshoot if factor exceeds `1`, but is ignored if below `0`.
             * - `max(0, ...)` ensures the ring width stays non-negative.
             * - Always uses the current theme color for consistency across variants.
             */
            [focusEffectVars.focusBoxShadow]:
`
0 0
0
calc(max(0px, ${ringWidth} * ${focusFactorCond}))
${ringColor}
`,
        }),
        
        focusEffectVars,
    } satisfies CssFocusEffect;
};
