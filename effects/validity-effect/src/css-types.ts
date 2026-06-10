// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui variants:
import {
    // Types:
    type ThemeVariantProps,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.



/**
 * A list of CSS variables used for validity-effect styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ValidityEffectVars {
    /**
     * References the valid color switch variable (success theme).
     * 
     * Behavior:
     * - No running transition → `unset`.
     * - factor > +1           → 100% (full valid color).
     * - factor ≤ 0            → 0.01% (effectively off).
     * - The epsilon (`0.01%`) ensures `color-mix(...)` never sees an exact 0,
     *   preventing invalid cases and avoiding flicker at factor = 0.
     * 
     * Note: This variable already includes the `%` unit and clamping,
     * so it can be passed directly into `color-mix(...)` without extra `calc()` or `clamp()`.
     */
    validSwitch       : unknown
    
    /**
     * References the invalid color switch variable (danger theme).
     * 
     * Behavior:
     * - No running transition → `unset`.
     * - factor < -1           → 100% (full invalid color).
     * - factor ≥ 0            → 0.01% (effectively off).
     * - The epsilon (`0.01%`) ensures `color-mix(...)` never sees an exact 0,
     *   preventing invalid cases and avoiding flicker at factor = 0.
     * 
     * Note: This variable already includes the `%` unit and clamping,
     * so it can be passed directly into `color-mix(...)` without extra `calc()` or `clamp()`.
     */
    invalidSwitch     : unknown
    
    /**
     * References the validity (valid or invalid) color weight of the current validity factor.
     * 
     * Behavior:
     * - No running transition → `unset`.
     * - factor ≥ +1 or ≤ -1   → 100% (full valid/invalid color).
     * - factor = 0            → 0% (no valid/invalid color).
     * - Between -1 and +1     → Smooth interpolation between 0% and 100% (semi valid/invalid color).
     * 
     * Note: This variable already includes the `%` unit and clamping,
     * so it can be passed directly into `color-mix(...)` without extra `calc()` or `clamp()`.
     */
    validityWeight    : unknown
    
    /**
     * References the unvalidated (current theme) color weight of the current validity factor.
     * 
     * Behavior:
     * - No running transition → `unset`.
     * - factor = 0            → 100% (full current theme color).
     * - factor ≥ +1 or ≤ -1   → 0% (no current theme color).
     * - Between -1 and +1     → Smooth interpolation between 100% and 0% (semi current theme color).
     * 
     * Note: This variable already includes the `%` unit and clamping,
     * so it can be passed directly into `color-mix(...)` without extra `calc()` or `clamp()`.
     */
    unvalidatedWeight : unknown
}



/**
 * Configuration options for customizing validity effects.
 */
export interface CssValidityEffectOptions {
    /**
     * Specifies the theme name to use for the **valid** state.
     * 
     * Defaults to `'success'` (positive actions and confirmations).
     */
    validTheme   ?: ThemeVariantProps['theme']
    
    /**
     * Specifies the theme name to use for the **invalid** state.
     * 
     * Defaults to `'danger'` (destructive actions or error indicators).
     */
    invalidTheme ?: ThemeVariantProps['theme']
}



/**
 * Provides a CSS API for applying validity-state effects that switch component's theme colors to **success** or **danger**,
 * making them **visually verified** when valid/invalid.
 */
export interface CssValidityEffect {
    /**
     * Attaches CSS rules for validity-state effects that switch component's theme colors to **success** or **danger**,
     * making them **visually verified** when valid/invalid.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - factor = -1  → Invalid state (danger theme color).
     * - factor = 0   → Unvalidated state (original theme color).
     * - factor = +1  → Valid state (success theme color).
     * - Between -1 and +1 → Smooth interpolation between invalid, unvalidated, and valid colors.
     * 
     * Smoothly transitions between valid, invalid, and unvalidated states by interpolating theme colors.
     * Uses the current theme colors as the baseline, ensuring harmony with the component's appearance.
     */
    validityEffectRule : Lazy<CssRule>
    
    /**
     * Exposes validity-effect CSS variables for transitional effects.
     * 
     * Includes:
     * - `validSwitch`       : The valid color switch variable (success theme).
     * - `invalidSwitch`     : The invalid color switch variable (danger theme).
     * - `validityWeight`    : The validity (valid or invalid) color weight of the current validity factor.
     * - `unvalidatedWeight` : The unvalidated (current theme) color weight of the current validity factor.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is fully unvalidated.
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    validityEffectVars : CssVars<ValidityEffectVars>
}
