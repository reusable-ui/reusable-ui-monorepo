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
 * A list of border-related CSS variables used for variant-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface BorderFeatureVars {
    //#region Conditional variables (may be poisoned) 
    /**
     * References an outlined border color when outlined mode is active.
     * Poisoned when outlined mode is inactive.
     */
    borderOutlinedCond     : unknown
    
    /**
     * References a mild (reading-friendly) border color when mild mode is active.
     * Poisoned when mild mode is inactive.
     */
    borderMildCond         : unknown
    
    /**
     * References the regular border color from the theme.
     * Poisoned when theme styling is not implemented.
     */
    borderRegularCond      : unknown
    
    /**
     * References a zero-length value (`0px`) when bare mode is active.
     * Poisoned when bare mode is inactive.
     * 
     * Used to conditionally suppress directional border widths and radii.
     */
    borderBareCond         : unknown
    //#endregion Conditional variables (may be poisoned) 
    
    
    
    //#region Final resolved variables (always valid) 
    /**
     * References the resolved border style.
     * Always valid via fallback to config default.
     */
    borderStyle            : unknown
    
    /**
     * References the resolved border width on the left (or right in RTL).
     * Always valid via fallback to config default.
     */
    borderInlineStartWidth : unknown
    
    /**
     * References the resolved border width on the right (or left in RTL).
     * Always valid via fallback to config default.
     */
    borderInlineEndWidth   : unknown
    
    /**
     * References the resolved border width on the top.
     * Always valid via fallback to config default.
     */
    borderBlockStartWidth  : unknown
    
    /**
     * References the resolved border width on the bottom.
     * Always valid via fallback to config default.
     */
    borderBlockEndWidth    : unknown
    
    /**
     * References the resolved border radius on the top-left corner (or top-right in RTL).
     * Always valid via fallback to config default.
     */
    borderStartStartRadius : unknown
    
    /**
     * References the resolved border radius on the top-right corner (or top-left in RTL).
     * Always valid via fallback to config default.
     */
    borderStartEndRadius   : unknown
    
    /**
     * References the resolved border radius on the bottom-left corner (or bottom-right in RTL).
     * Always valid via fallback to config default.
     */
    borderEndStartRadius   : unknown
    
    /**
     * References the resolved border radius on the bottom-right corner (or bottom-left in RTL).
     * Always valid via fallback to config default.
     */
    borderEndEndRadius     : unknown
    
    /**
     * References the resolved border color for the current mode.
     * Always valid via internal fallback logic.
     * 
     * Can be further customized using CSS color functions.
     * Example: `oklch(from ${borderFeatureVars.borderColor} l c h / calc(alpha * 0.5))`
     */
    borderColor            : unknown
    
    /**
     * References the resolved general-purpose border width used for layout separators or structural dividers.
     * Always valid via fallback to config default.
     * Not affected by bare mode.
     */
    borderBaseWidth        : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for enabling border-aware styling in components.
 * 
 * These options represent the component’s desired border styling intent —
 * including border style, widths, radii, and fallback border color —
 * in case the framework does not override them through variant logic or contextual utilities.
 */
export interface CssBorderFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'borderStyle'
            
            | 'borderWidth'
            | 'borderInlineStartWidth'
            | 'borderInlineEndWidth'
            | 'borderBlockStartWidth'
            | 'borderBlockEndWidth'
            
            | 'borderRadius'
            | 'borderStartStartRadius'
            | 'borderStartEndRadius'
            | 'borderEndStartRadius'
            | 'borderEndEndRadius'
            
            | 'borderColor'
        >
{
    /**
     * The desired border style to apply.
     * Defaults to `borderVars.style`.
     */
    borderStyle            ?: CssKnownProps['borderStyle']
    
    
    
    /**
     * The desired border width to apply on all edges.
     * 
     * This value serves two purposes:
     * - As the default for directional border widths (`borderInlineStartWidth`, `borderInlineEndWidth`, etc.)
     * - As the resolved value for `borderBaseWidth`, used in layout separators or structural dividers
     * 
     * Defaults to `borderVars.defaultWidth`.
     */
    borderWidth            ?: CssKnownProps['borderWidth']
    
    /**
     * The desired border width on the left (or right in RTL) to apply.
     * Defaults to `borderWidth`.
     */
    borderInlineStartWidth ?: CssKnownProps['borderInlineStartWidth']
    
    /**
     * The desired border width on the right (or left in RTL) to apply.
     * Defaults to `borderWidth`.
     */
    borderInlineEndWidth   ?: CssKnownProps['borderInlineEndWidth']
    
    /**
     * The desired border width on the top to apply.
     * Defaults to `borderWidth`.
     */
    borderBlockStartWidth  ?: CssKnownProps['borderBlockStartWidth']
    
    /**
     * The desired border width on the bottom to apply.
     * Defaults to `borderWidth`.
     */
    borderBlockEndWidth    ?: CssKnownProps['borderBlockEndWidth']
    
    
    
    /**
     * The desired border radius to apply on all corners.
     * Defaults to `borderRadiusVars.default`.
     */
    borderRadius           ?: CssKnownProps['borderRadius']
    
    /**
     * The desired border radius on the top-left corner (or top-right in RTL) to apply.
     * Defaults to `borderRadius`.
     */
    borderStartStartRadius ?: CssKnownProps['borderStartStartRadius']
    
    /**
     * The desired border radius on the top-right corner (or top-left in RTL) to apply.
     * Defaults to `borderRadius`.
     */
    borderStartEndRadius   ?: CssKnownProps['borderStartEndRadius']
    
    /**
     * The desired border radius on the bottom-left corner (or bottom-right in RTL) to apply.
     * Defaults to `borderRadius`.
     */
    borderEndStartRadius   ?: CssKnownProps['borderEndStartRadius']
    
    /**
     * The desired border radius on the bottom-right corner (or bottom-left in RTL) to apply.
     * Defaults to `borderRadius`.
     */
    borderEndEndRadius     ?: CssKnownProps['borderEndEndRadius']
    
    
    
    /**
     * The fallback border color to apply when no variant-specific color is resolved.
     * Defaults to `borderVars.color`.
     */
    borderColor            ?: CssKnownProps['borderColor']
}



/**
 * Provides a CSS API for enabling theme-aware border styling in components.
 */
export interface CssBorderFeature {
    /**
     * Generates CSS rules that resolve the appropriate border color and geometry based on the currently active variants.
     * 
     * These rules leverage poisoned fallback logic to dynamically switch
     * between outlined, mild, and regular border colors.
     */
    borderFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes border-related CSS variables for styling component’s border,
     * with support for geometry styling and CSS color function adjustments.
     * 
     * Includes:
     * - `border**Cond`s  : Mode-specific border colors (conditionally valid or poisoned).
     * - `borderBareCond` : Suppresses border geometry when bare mode is active.
     * - `borderColor`    : Final resolved border color for the current mode.
     * - `borderStyle`, `borderWidth`, `borderRadius`, etc.: Resolved geometry styling.
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
    borderFeatureVars : CssVars<BorderFeatureVars>
}
