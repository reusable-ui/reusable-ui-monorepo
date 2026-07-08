// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'          // Writes css in javascript.



/**
 * A list of orientation-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches or numeric factors that determine whether
 * orientation-specific styles should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface OrientationVariantVars {
    /**
     * Applies when the component is oriented horizontally (inline).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is oriented horizontally (inline):
     *     flexDirection : `${orientationVariantVars.isOrientationInline} row`,
     *     textAlign     : `${orientationVariantVars.isOrientationInline} start`,
     * });
     * ```
     */
    isOrientationInline : unknown
    
    /**
     * Applies when the component is oriented vertically (block).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is oriented vertically (block):
     *     flexDirection : `${orientationVariantVars.isOrientationBlock} column`,
     *     textAlign     : `${orientationVariantVars.isOrientationBlock} center`,
     * });
     * ```
     */
    isOrientationBlock  : unknown
    
    /**
     * A normalized factor representing the **orientation mode**.
     * Useful for driving algebraic formulas in `calc(...)` to enable complex styling.
     * 
     * ### Expected values:
     * - **0** : oriented horizontally (inline)
     * - **1** : oriented vertically (block)
     * - Never interpolates between 0-1 or outside this range.
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `transform`, `scale`, `opacity`, etc.
     * - Useful in custom `calc()` formulas or other CSS functions.
     */
    orientationFactor   : unknown
}



/**
 * Provides a CSS API for enabling conditional styling based on the orientation mode.
 */
export interface CssOrientationVariant {
    /**
     * Generates CSS rules that toggle orientation-related CSS variables based on the current orientation mode.
     * 
     * These rules are scoped using `ifOrientationInline()` and `ifOrientationBlock()` to toggle orientation-related CSS variables.
     */
    orientationVariantRule : Lazy<CssRule>
    
    /**
     * Exposes orientation-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `isOrientationInline` : active when oriented horizontally (inline)
     * - `isOrientationBlock`  : active when oriented vertically (block)
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    orientationVariantVars : CssVars<OrientationVariantVars>
}
