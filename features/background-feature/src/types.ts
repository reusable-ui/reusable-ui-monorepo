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
 * A list of background-related CSS variables used to enable conditional styling.
 * 
 * These variables act as semantic switches that control whether background-specific styles
 * should be applied. They are resolved by the browser using poisoned fallback logic.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface BackgroundFeatureVars {
    //#region Conditional variables (may be poisoned) 
    /**
     * References the gradient background image when emphasized mode is active.
     * Poisoned if emphasized mode is inactive.
     */
    backgEmphasizedCond : unknown
    
    /**
     * References the custom background when configured.
     * Poisoned if no custom background is provided.
     */
    backgCond           : unknown
    
    /**
     * References a transparent background color when outlined mode is active.
     * Poisoned if outlined mode is inactive.
     */
    backgOutlinedCond   : unknown
    
    /**
     * References a mild (reading-friendly) background color when mild mode is active.
     * Poisoned if mild mode is inactive.
     */
    backgMildCond       : unknown
    
    /**
     * References the regular background color from the theme.
     * Poisoned if theme styling is not implemented.
     */
    backgRegularCond    : unknown
    //#endregion Conditional variables (may be poisoned) 
    
    
    
    //#region Final resolved variables (always valid) 
    /**
     * References the resolved background color for the current mode.
     * Guaranteed to be valid via internal fallback logic.
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${backgroundFeatureVars.backgColor} l c h / calc(alpha * 0.5))`
     */
    backgColor          : unknown
    
    /**
     * References the composite background layers (gradient, custom, and color) for the current mode.
     * Guaranteed to be valid via internal fallback logic.
     */
    backg               : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for enabling background-aware styling in components.
 */
export interface CssBackgroundFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'backgroundColor'
            | 'background'
        >
{
    /**
     * The fallback background color to apply when no variant-specific color is resolved.
     * Defaults to `transparent`.
     */
    backgroundColor     ?: CssKnownProps['backgroundColor']
    
    /**
     * The gradient background image to apply when emphasized mode is active.
     */
    backgroundEmphasize ?:
        |  Extract<CssKnownProps['background'], string>
        | [Extract<CssKnownProps['background'], unknown[]>]
    
    /**
     * A custom background layer to apply above the themed color but below the gradient layer.
     */
    background          ?: CssKnownProps['background']
}



/**
 * Provides a CSS API for enabling theme-aware background styling in components.
 */
export interface CssBackgroundFeature {
    /**
     * Generates CSS rules that resolve the appropriate background color based on the currently active variants.
     * 
     * These rules leverage poisoned fallback logic to dynamically switch
     * between emphasized, outlined, mild, and regular background colors.
     */
    backgroundFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes background-related CSS variables for coloring component’s background,
     * with support for layered background composition and CSS color function adjustments.
     * 
     * Includes:
     * - `backg**Cond`s : Mode-specific background colors, conditionally valid or poisoned.
     * - `backgColor`   : Final resolved background color for the current mode.
     * - `backg`        : Composite background layers (gradient, custom, and color) for the current mode.
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
    backgroundFeatureVars : CssVars<BackgroundFeatureVars>
}
