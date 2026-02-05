// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssCustomRef,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A list of CSS variables used for active-transition styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ActiveTransitionVars {
    /**
     * Represents the excess delta used for bump effects.
     * 
     * - Nonzero when the active factor overshoots or undershoots:
     *   - Positive when factor > 1
     *   - Negative when factor < 0
     * - Regular variant → `unset`
     * - Fully inactive  → `unset`
     */
    bumpFactorCond      : unknown
    
    /**
     * The resolved value actually consumed by filters.
     * 
     * - Regular variant        → mirrors the active factor directly
     * - Outlined/mild variants → the bump factor on overshoot/undershoot, otherwise `0`
     * - Fully inactive         → `unset`
     */
    effectiveFactorCond : unknown
    
    /**
     * References the filter applied when the component is transitioning or fully active.
     * 
     * - Becomes `unset` when the component is fully inactive.
     * - Typically not consumed directly — instead use:
     *   `const { filterFeatureVars: { filter } } = usesFilterFeature()`
     */
    activeFilter        : unknown
}



/**
 * Configuration options for customizing active transitions.
 */
export interface CssActiveTransitionOptions {
    /**
     * Controls how much the component is brightened or darkened when fully active.
     * 
     * - Interpolates smoothly during the transition.
     * - Applies only to regular variants. Outlined and mild variants ignore this setting.
     * - Automatically adapts to light/dark mode:
     *   - In **light mode** (`mode = +1`), values `< 1` darken  and values `> 1` lighten.
     *   - In **dark mode**  (`mode = -1`), values `< 1` lighten and values `> 1` darken.
     *   - This ensures the same configuration produces a natural highlight in both modes.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `0.8`
     * - A strongly typed reference, e.g. `myConfig.activeBrightness`
     * 
     * Notes:
     * - Values `< 1` → darken  in light mode, lighten in dark mode.
     * - Values `> 1` → lighten in light mode, darken  in dark mode.
     * - `1` → no brightness adjustment.
     * - Percentage units are allowed.
     * - Negative values are not allowed.
     * 
     * Defaults to `1` (no brightness adjustment).
     */
    activeBrightness ?: number | CssCustomRef
    
    /**
     * Controls how much the component's color contrast is adjusted when fully active.
     * 
     * - Interpolates smoothly during the transition.
     * - Applies only to regular variants. Outlined and mild variants ignore this setting.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `1.2`
     * - A strongly typed reference, e.g. `myConfig.activeContrast`
     * 
     * Notes:
     * - Values `< 1` → decrease contrast (flatter look).
     * - Values `> 1` → increase contrast (sharper look).
     * - `1` → no contrast adjustment.
     * - Percentage units are allowed.
     * - Negative values are not allowed.
     * 
     * Defaults to `1` (no contrast adjustment).
     */
    activeContrast   ?: number | CssCustomRef
    
    /**
     * Controls how much the component's color saturation is adjusted when fully active.
     * 
     * - Interpolates smoothly during the transition.
     * - Applies only to regular variants. Outlined and mild variants ignore this setting.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-value)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-value, var(--fallback))`
     * - A literal numeric value, e.g. `1.2`
     * - A strongly typed reference, e.g. `myConfig.activeSaturate`
     * 
     * Notes:
     * - Values `< 1` → decrease saturation (muted colors).
     * - Values `> 1` → increase saturation (more vivid colors).
     * - `0` is equivalent to grayscale.
     * - `1` → no saturation adjustment.
     * - Percentage units are allowed.
     * - Negative values are not allowed.
     * 
     * Defaults to `1` (no saturation adjustment).
     */
    activeSaturate   ?: number | CssCustomRef
}



/**
 * Provides a CSS API for applying active-state transitions that emphasize the current theme colors,
 * making the component **visually stand out** when active.
 */
export interface CssActiveTransition {
    /**
     * Attaches CSS rules for active-state transitions that emphasize the current theme colors,
     * making the component **visually stand out** when active.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - Regular variants: darken in light mode or lighten in dark mode.
     * - Outlined/mild variants: interpolate from variant colors to regular colors.
     * 
     * Smoothly transitions between inactive and active states.
     * Affects background, foreground, decoration, and border colors.
     */
    activeTransitionRule : Lazy<CssRule>
    
    /**
     * Exposes active-transition CSS variables for conditional animation.
     * 
     * Includes:
     * - `activeFilter` : Brightness/contrast/saturation interpolation during active state.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully inactive.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    activeTransitionVars : CssVars<ActiveTransitionVars>
}
