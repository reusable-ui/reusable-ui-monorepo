// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssCustomRef,
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A list of CSS variables used for disabled-transition styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface DisabledTransitionVars {
    /**
     * References the filter applied when the component is transitioning or fully disabled.
     * 
     * - Becomes `unset` when the component is fully enabled.
     * - Typically not consumed directly — instead use:
     *   `const { filterFeatureVars: { filter } } = usesFilterFeature()`
     */
    disabledFilter : unknown
    
    /**
     * References the cursor applied when the component is transitioning toward disabled or fully disabled.
     * 
     * - Becomes `unset` when the component is transitioning toward enabled or fully enabled.
     * - Typically used with callback: `switchOf(disabledTransitionVars.disabledCursor, componentConfig.normalCursor)`.
     */
    disabledCursor : unknown
}



/**
 * Configuration options for customizing disabled transitions.
 */
export interface CssDisabledTransitionOptions {
    /**
     * Controls how much the component's opacity is reduced when fully disabled.
     * 
     * - Interpolates smoothly during the transition from enabled → disabled.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.disabledOpacity`
     * 
     * Notes:
     * - Values between `0` and `1` → partially transparent.
     * - `0` → fully transparent.
     * - `1` → fully opaque (no fade).
     * - Percentage units are allowed.
     * - Values outside 0…1 range are clamped by the browser.
     * 
     * Defaults to `0.5` (half opacity).
     */
    disabledOpacity  ?: number | CssCustomRef
    
    /**
     * Controls how much the component's color saturation is reduced when fully disabled.
     * 
     * - Interpolates smoothly during the transition from enabled → disabled.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.5`
     * - A strongly typed reference, e.g. `myConfig.disabledSaturate`
     * 
     * Notes:
     * - Values `< 1` → decrease saturation (muted colors).
     * - Values `> 1` → increase saturation (more vivid colors, not typical for disabled).
     * - `0` is equivalent to grayscale.
     * - `1` → no saturation adjustment.
     * - Percentage units are allowed.
     * - Negative values are not allowed.
     * 
     * Defaults to `0.5` (muted colors).
     */
    disabledSaturate ?: number | CssCustomRef
    
    /**
     * Specifies the cursor to display when the component is disabled.
     * 
     * - Discrete switching when the `disabled` state changes (no gradual transition).
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal string value, e.g. `'wait'`
     * - A strongly typed reference, e.g. `myConfig.disabledCursor`
     * 
     * Notes:
     * - Specify `'unset'` to keep the original cursor when disabled.
     * 
     * Defaults to `'not-allowed'`.
     */
    disabledCursor   ?: CssKnownProps['cursor']
}



/**
 * Provides a CSS API for applying disabled-state transitions that de-emphasize the entire component surface,
 * making the component **visually muted** when disabled.
 */
export interface CssDisabledTransition {
    /**
     * Attaches CSS rules for disabled-state transitions that de-emphasize the entire component surface,
     * making the component **visually muted** when disabled.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - factor = 0 → neutral (no adjustment).
     * - factor = 1 → fully disabled (target opacity/saturation applied).
     * - Between 0 and 1 → smooth interpolation between neutral and disabled (for opacity/saturation only).
     * - Cursor → discrete switch based on disabled state (no gradual interpolation).
     * 
     * Smoothly transitions between enabled and disabled states by animating filter effect.
     * Affects the entire component surface.
     */
    disabledTransitionRule : Lazy<CssRule>
    
    /**
     * Exposes disabled-transition CSS variables for transitional effects.
     * 
     * Includes:
     * - `disabledFilter` : Opacity and saturation interpolation during disabled state.
     * - `disabledCursor` : Cursor switching when disabled.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully enabled.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    disabledTransitionVars : CssVars<DisabledTransitionVars>
}
