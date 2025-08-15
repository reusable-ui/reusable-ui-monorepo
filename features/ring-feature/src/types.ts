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
 * A list of ring-related CSS variables used for variant-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface RingFeatureVars {
    //#region Conditional variables (may be poisoned) 
    /**
     * References the regular ring color from the theme.
     * Poisoned when theme styling is not implemented.
     */
    ringRegularCond    : unknown
    //#endregion Conditional variables (may be poisoned) 
    
    
    
    //#region Final resolved variables (always valid) 
    /**
     * References the resolved ring color for the current mode.
     * Always valid via internal fallback logic.
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${ringFeatureVars.ringColor} l c h / calc(alpha * 0.5))`
     */
    ringColor          : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for enabling ring-aware styling in components.
 * 
 * These options represent the component’s desired ring color intent —
 * in case the framework does not override it through variant logic or contextual utilities.
 */
export interface CssRingFeatureOptions {
    /**
     * The fallback ring color to apply when no variant-specific color is resolved.
     * Defaults to `currentColor`.
     */
    ringColor ?: CssKnownProps['color']
}



/**
 * Provides a CSS API for enabling theme-aware ring styling in components.
 */
export interface CssRingFeature {
    /**
     * Generates CSS rules that resolve the appropriate ring color based on the currently active theme variant.
     * 
     * These rules leverage poisoned fallback logic to dynamically switch
     * between themed ring colors.
     */
    ringFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes ring-related CSS variables for coloring component’s ring,
     * with support for CSS color function adjustments.
     * 
     * Includes:
     * - `ringRegularCond` : Theme-specific ring color (conditionally valid or poisoned).
     * - `ringColor`       : Final resolved ring color for the current mode.
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
    ringFeatureVars : CssVars<RingFeatureVars>
}
