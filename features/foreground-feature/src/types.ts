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
 * A list of foreground-related CSS variables used to enable conditional styling.
 * 
 * These variables act as semantic switches that control whether foreground-specific styles
 * should be applied. They are resolved by the browser using poisoned fallback logic.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ForegroundFeatureVars {
    //#region Conditional variables (may be poisoned) 
    /**
     * References an outlined foreground color when outlined mode is active.
     * Poisoned if outlined mode is inactive.
     */
    foregOutlinedCond   : unknown
    
    /**
     * References a mild (reading-friendly) foreground color when mild mode is active.
     * Poisoned if mild mode is inactive.
     */
    foregMildCond       : unknown
    
    /**
     * References the regular foreground color from the theme.
     * Poisoned if theme styling is not implemented.
     */
    foregRegularCond    : unknown
    //#endregion Conditional variables (may be poisoned) 
    
    
    
    //#region Final resolved variables (always valid) 
    /**
     * References the resolved foreground color for the current mode.
     * Guaranteed to be valid via internal fallback logic.
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${foregroundFeatureVars.foregColor} l c h / calc(alpha * 0.5))`
     */
    foregColor          : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for enabling foreground-aware styling in components.
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
     * - `foreg**Cond`s : Mode-specific foreground colors, conditionally valid or poisoned.
     * - `foregColor`   : Final resolved foreground color for the current mode.
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
