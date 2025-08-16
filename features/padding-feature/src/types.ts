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
 * A list of padding-related CSS variables used for layout-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface PaddingFeatureVars {
    //#region Conditional variables (may be poisoned) 
    /**
     * References a zero-length value (`0px`) when bare mode is active.
     * Poisoned when bare mode is inactive.
     * 
     * Used to conditionally suppress directional paddings.
     */
    paddingBareCond    : unknown
    //#endregion Conditional variables (may be poisoned) 
    
    
    
    //#region Final resolved variables (always valid) 
    /**
     * References the resolved padding on the left (or right in RTL).
     * Always valid via fallback to config default.
     */
    paddingInlineStart : unknown
    
    /**
     * References the resolved padding on the right (or left in RTL).
     * Always valid via fallback to config default.
     */
    paddingInlineEnd   : unknown
    
    /**
     * References the resolved padding on the top.
     * Always valid via fallback to config default.
     */
    paddingBlockStart  : unknown
    
    /**
     * References the resolved padding on the bottom.
     * Always valid via fallback to config default.
     */
    paddingBlockEnd    : unknown
    
    /**
     * References the resolved general-purpose horizontal padding used for layout separators or structural dividers.
     * Always valid via fallback to config default.
     * Not affected by bare mode.
     */
    paddingInlineBase  : unknown
    
    /**
     * References the resolved general-purpose vertical padding used for layout separators or structural dividers.
     * Always valid via fallback to config default.
     * Not affected by bare mode.
     */
    paddingBlockBase   : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for enabling padding-aware styling in components.
 * 
 * These options represent the component’s intended padding styling —
 * unless overridden by contextual utilities within the framework.
 */
export interface CssPaddingFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'padding'
            | 'paddingInline'
            | 'paddingBlock'
            | 'paddingInlineStart'
            | 'paddingInlineEnd'
            | 'paddingBlockStart'
            | 'paddingBlockEnd'
        >
{
    /**
     * The desired padding to apply uniformly to all edges (horizontal and vertical).
     * 
     * Serves as the default for horizontal and vertical paddings (`paddingInline` and `paddingBlock`)
     * 
     * Defaults to `spacerVars.default`.
     */
    padding            ?: CssKnownProps['padding']
    
    /**
     * The desired horizontal padding to apply both left and right sides.
     * 
     * Serves as:
     * - The default horizontal paddings (`paddingInlineStart` and `paddingInlineEnd`)
     * - The resolved value for `paddingInlineBase`, used in layout separators or structural dividers
     * 
     * Defaults to `padding`.
     */
    paddingInline      ?: CssKnownProps['paddingInline']
    
    /**
     * The desired vertical padding to apply both top and bottom sides.
     * 
     * Serves as:
     * - The default vertical paddings (`paddingBlockStart` and `paddingBlockEnd`)
     * - The resolved value for `paddingBlockBase`, used in layout separators or structural dividers
     * 
     * Defaults to `padding`.
     */
    paddingBlock       ?: CssKnownProps['paddingBlock']
    
    /**
     * The desired padding to apply on the left side (or right side in RTL).
     * Defaults to `paddingInline`.
     */
    paddingInlineStart ?: CssKnownProps['paddingInlineStart']
    
    /**
     * The desired padding to apply on the right side (or left side in RTL).
     * Defaults to `paddingInline`.
     */
    paddingInlineEnd   ?: CssKnownProps['paddingInlineEnd']
    
    /**
     * The desired padding to apply on the top side.
     * Defaults to `paddingBlock`.
     */
    paddingBlockStart  ?: CssKnownProps['paddingBlockStart']
    
    /**
     * The desired padding to apply on the bottom side.
     * Defaults to `paddingBlock`.
     */
    paddingBlockEnd    ?: CssKnownProps['paddingBlockEnd']
}



/**
 * Provides a CSS API for enabling manageable padding in components.
 */
export interface CssPaddingFeature {
    /**
     * Generates CSS rules that resolve the appropriate paddings based on active bare mode
     * and framework-level overrides.
     * 
     * These rules leverage poisoned fallback logic to dynamically suppress
     * directional paddings when bare mode is active.
     */
    paddingFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes padding-related CSS variables for styling component’s padding.
     * 
     * Includes:
     * - `paddingBareCond`: Suppresses padding geometry when bare mode is active.
     * - `paddingInlineStart`, `paddingBlockEnd`, etc.: Resolved directional paddings.
     * 
     * These variables can be consumed directly or composed into advanced use cases
     * using CSS `calc()` function, variable fallbacks, or custom logic.
     * 
     * ⚠️ **Caution**: Variables ending in `**Cond` may be poisoned.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    paddingFeatureVars : CssVars<PaddingFeatureVars>
}
