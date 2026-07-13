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
 * A list of decoration-related CSS variables used for variant-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface DecorationFeatureVars {
    //#region 🎨 Conditional variables (may be poisoned) 
    /**
     * References the regular decoration color from the theme.
     * Poisoned when theme styling is not implemented.
     */
    regularDecorCond    : unknown
    
    /**
     * References a mild (reading-friendly) decoration color when mild variant is active.
     * Poisoned when mild variant is inactive.
     */
    mildDecorCond       : unknown
    
    /**
     * References an outlined decoration color when outlined variant is active.
     * Poisoned when outlined variant is inactive.
     */
    outlinedDecorCond   : unknown
    //#endregion 🎨 Conditional variables (may be poisoned) 
    
    
    
    //#region 🧩 Intermediate resolved variables (always valid) 
    /**
     * References a variant-aware decoration color from the active variant.
     * Always valid:
     * - Outlined → outlined decoration
     * - Mild     → mild decoration
     * - Regular  → regular decoration
     * - Fallback → defaultDecorationColor
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${decorationFeatureVars.decorVariantColor} l c h / calc(alpha * 0.5))`
     */
    decorVariantColor   : unknown
    //#endregion 🧩 Intermediate resolved variables (always valid) 
    
    
    
    //#region ⚠️ State overrides (e.g. active, selected) 
    /**
     * User-defined override for the decoration color.
     * Valid if an override exists, otherwise invalid (unset).
     */
    decorColorOverride  : unknown
    //#endregion ⚠️ State overrides (e.g. active, selected) 
    
    
    
    //#region ✅ Final resolved variables (always valid) 
    /**
     * References a final decoration color consumed by components.
     * Always valid:
     * - Uses `decorColorOverride` if defined.
     * - Otherwise falls back to `decorVariantColor`.
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${decorationFeatureVars.decorColor} l c h / calc(alpha * 0.5))`
     */
    decorColor          : unknown
    //#endregion ✅ Final resolved variables (always valid) 
}



/**
 * Configuration options for enabling decoration-aware styling in components.
 * 
 * These options represent the component’s desired decoration color intent —
 * in case the framework does not override it through variant logic or contextual utilities.
 */
export interface CssDecorationFeatureOptions {
    /**
     * The fallback decoration color to apply when no variant-specific color is resolved.
     * Defaults to `currentColor`.
     */
    decorationColor ?: CssKnownProps['color']
}



/**
 * Provides a CSS API for enabling theme-aware decoration styling in components.
 */
export interface CssDecorationFeature {
    /**
     * Generates CSS rules that resolve the appropriate decoration color based on the currently active variants.
     * 
     * These rules leverage poisoned fallback logic to dynamically switch
     * between outlined, mild, and regular decoration colors.
     */
    decorationFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes decoration-related CSS variables for coloring component’s decoration,
     * with support for CSS color function adjustments.
     * 
     * Includes:
     * - `decor**Cond`s       : Variant-specific decoration colors (conditionally valid or poisoned).
     * - `decorVariantColor`  : Variant-aware decoration color from the active variant.
     * - `decorColorOverride` : User-defined override for the decoration color.
     * - `decorColor`         : Final decoration color consumed by components.
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
    decorationFeatureVars : CssVars<DecorationFeatureVars>
}
