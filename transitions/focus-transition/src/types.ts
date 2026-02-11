// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A list of CSS variables used for focus-transition styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface FocusTransitionVars {
    /**
     * References a manipulated box shadow as the focus ring indicator
     * when the component is transitioning toward focused/blurred or fully focused.
     * 
     * - Becomes `unset` when the component is fully blurred.
     * - Typically not consumed directly — instead use:
     *   `const { boxShadowFeatureVars: { boxShadow } } = usesBoxShadowFeature()`
     */
    focusBoxShadow : unknown
}



/**
 * Configuration options for customizing focus transitions.
 */
export interface CssFocusTransitionOptions {
    /**
     * Controls the width of the focus ring indicator when fully focused.
     * 
     * - Interpolates smoothly during the transition from blur → focus.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value with length unit, e.g. `'0.25rem'`
     * - A strongly typed reference, e.g. `myConfig.focusRingWidth`
     * 
     * Notes:
     * - `0` → no focus ring indicator.
     * - Percentage units are not allowed.
     * - Negative values are not allowed.
     * 
     * Defaults to `spacerVars.xs`.
     */
    focusRingWidth ?: CssKnownProps['borderWidth']
}



/**
 * Provides a CSS API for applying focus-state transitions that highlight the component with a ring indicator,
 * making components **visually distinct** and signaling readiness for interaction when focused.
 */
export interface CssFocusTransition {
    /**
     * Attaches CSS rules for focus-state transitions that highlight the component with a ring indicator,
     * making components **visually distinct** and signaling readiness for interaction when focused.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - factor = 0 → ring width = 0 (no visible ring).
     * - factor = 1 → ring width = configured value (full ring).
     * - Between 0 and 1 → smooth interpolation between 0 and target width.
     * 
     * Smoothly transitions between focus and blur states by animating the ring width.
     * Highlights the surrounding component area without affecting its size or causing any layout shifts.
     */
    focusTransitionRule : Lazy<CssRule>
    
    /**
     * Exposes focus-transition CSS variables for transitional effects.
     * 
     * Includes:
     * - `focusBoxShadow` : A manipulated box shadow as the focus ring indicator during focus state.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully blurred.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    focusTransitionVars : CssVars<FocusTransitionVars>
}
