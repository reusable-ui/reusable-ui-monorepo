// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'          // Writes css in javascript.



/**
 * A list of foreground-related CSS variables used for variant-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ForegroundFeatureVars {
    //#region 🎨 Conditional variables (may be poisoned) 
    /**
     * References the regular foreground color from the theme.
     * Poisoned when theme styling is not implemented.
     */
    regularForegCond    : unknown
    
    /**
     * References a mild (reading-friendly) foreground color when mild variant is active.
     * Poisoned when mild variant is inactive.
     */
    mildForegCond       : unknown
    
    /**
     * References an outlined foreground color when outlined variant is active.
     * Poisoned when outlined variant is inactive.
     */
    outlinedForegCond   : unknown
    //#endregion 🎨 Conditional variables (may be poisoned) 
    
    
    
    //#region 🧩 Intermediate resolved variables (always valid) 
    /**
     * References a variant-aware foreground color from the active variant.
     * Always valid:
     * - Outlined → outlined foreground
     * - Mild     → mild foreground
     * - Regular  → regular foreground
     * - Fallback → defaultForegroundColor
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${foregroundFeatureVars.foregVariantColor} l c h / calc(alpha * 0.5))`
     */
    foregVariantColor   : unknown
    //#endregion 🧩 Intermediate resolved variables (always valid) 
    
    
    
    //#region ⚠️ State overrides (e.g. active, selected) 
    /**
     * User-defined override for the foreground color.
     * Valid if an override exists, otherwise invalid (unset).
     */
    foregColorOverride  : unknown
    //#endregion ⚠️ State overrides (e.g. active, selected) 
    
    
    
    //#region ✅ Final resolved variables (always valid) 
    /**
     * References a final foreground color consumed by components.
     * Always valid:
     * - Uses `foregColorOverride` if defined.
     * - Otherwise falls back to `foregVariantColor`.
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${foregroundFeatureVars.foregColor} l c h / calc(alpha * 0.5))`
     */
    foregColor          : unknown
    //#endregion ✅ Final resolved variables (always valid) 
}



/**
 * Configuration options for enabling foreground-aware styling in components.
 * 
 * These options represent the component’s desired foreground color intent —
 * in case the framework does not override it through variant logic or contextual utilities.
 */
export interface CssForegroundFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'color'
        >
{
    /**
     * The fallback foreground color to apply when no variant-specific color is resolved.
     * Defaults to `currentColor`.
     */
    foregroundColor ?: CssKnownProps['color']
    
    /**
     * Alias for `foregroundColor`, provided for standard CSS naming compatibility.
     * Prefer `foregroundColor` for semantic clarity.
     * 
     * The fallback foreground color to apply when no variant-specific color is resolved.
     * Defaults to `currentColor`.
     */
    color           ?: CssKnownProps['color']
}



/**
 * Provides a CSS API for enabling theme-aware foreground styling in components.
 */
export interface CssForegroundFeature {
    /**
     * Generates CSS rules that resolve the appropriate foreground color based on the currently active variants.
     * 
     * These rules leverage poisoned fallback logic to dynamically switch
     * between outlined, mild, and regular foreground colors.
     */
    foregroundFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes foreground-related CSS variables for coloring component’s foreground,
     * with support for CSS color function adjustments.
     * 
     * Includes:
     * - `foreg**Cond`s       : Variant-specific foreground colors (conditionally valid or poisoned).
     * - `foregVariantColor`  : Variant-aware foreground color from the active variant.
     * - `foregColorOverride` : User-defined override for the foreground color.
     * - `foregColor`         : Final foreground color consumed by components.
     * 
     * These variables can be consumed directly or composed into advanced use cases
     * using CSS color functions, variable fallbacks, or custom logic.
     * 
     * ⚠️ **Caution**: Variables ending in `**Cond` may be poisoned.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    foregroundFeatureVars : CssVars<ForegroundFeatureVars>
}
