// Cssfn:
import {
    // Writes css in javascript:
    style,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type FocusTransitionVars,
    type CssFocusTransitionOptions,
    type CssFocusTransition,
}                           from './types.js'

// Reusable-ui configs:
import {
    spacerVars,
}                           from '@reusable-ui/spacers'             // A flexible spacer management system for web components, utilizing CSS custom properties to enable dynamic spacing, theming, and customization.

// Reusable-ui features:
import {
    usesRingFeature,
}                           from '@reusable-ui/ring-feature'        // A styling utility for resolving the appropriate ring color based on the currently active theme variant.
import {
    boxShadowRegistry,
}                           from '@reusable-ui/box-shadow-feature'  // A styling utility for composing a unified box shadow stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesFocusState,
}                           from '@reusable-ui/focus-state'         // Lifecycle-aware focus/blur state with transition animations and semantic styling hooks for UI components.



/**
 * A strongly typed global mapping of focus-transition CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [focusTransitionVars] = cssVars<FocusTransitionVars>({ prefix: 'fot', minify: false });

// Register the focus box shadow globally for composing a unified box shadow stack across state packages:
boxShadowRegistry.registerBoxShadow(focusTransitionVars.focusBoxShadow);



/**
 * Applies focus-state transitions that highlight the component with a ring indicator,
 * making components **visually distinct** and signaling readiness for interaction when focused.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between focus and blur states by animating the ring width.
 * Uses the current theme color, ensuring harmony with the component's appearance.
 * 
 * @param options - An optional configuration for customizing focus-state transitions.
 * @returns A CSS API containing transition rules and focus-transition CSS variables for the focus ring indicator.
 */
export const usesFocusTransition = (options?: CssFocusTransitionOptions): CssFocusTransition => {
    // Extract options and assign defaults:
    const {
        focusRingWidth = spacerVars.xs,
    } = options ?? {};
    
    
    
    // Features:
    const { ringFeatureVars : { ringColor } } = usesRingFeature();
    
    // States:
    const { focusStateVars : { focusFactorCond } } = usesFocusState();
    
    
    
    return {
        focusTransitionRule : () => style({
            /**
             * Focus ring:
             * - Fully blurred → ignored (browser skips invalid formula).
             * - Otherwise     → interpolates the ring width toward the configured value.
             * 
             * 
             * Behavior:
             * - factor = 0      → ring width = 0 (no visible ring).
             * - factor = 1      → ring width = configured value (full ring).
             * - Between 0 and 1 → smooth interpolation between 0 and target width.
             * - Ring width may overshoot if factor exceeds `1`, but is ignored if below `0`.
             * - The `max(0, ...)` ensures the ring width stays non-negative.
             * - Uses the current theme color (consistent across variants).
             */
            [focusTransitionVars.focusBoxShadow]:
`
0 0
0
calc(max(0px, ${focusRingWidth} * ${focusFactorCond}))
${ringColor}
`,
        }),
        
        focusTransitionVars,
    } satisfies CssFocusTransition;
};
