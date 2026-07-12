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
 * A list of outlined-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches or numeric factors that determine whether
 * outlined-specific styles should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface OutlinedVariantVars {
    /**
     * Applies when the component is outlined.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is outlined:
     *     fontWeight     : `${outlinedVariantVars.isOutlined} bold`,
     *     textDecoration : `${outlinedVariantVars.isOutlined} underline`,
     * });
     * ```
     */
    isOutlined     : unknown
    
    /**
     * Applies when the component is not outlined.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is not outlined:
     *     fontWeight     : `${outlinedVariantVars.notOutlined} normal`,
     *     textDecoration : `${outlinedVariantVars.notOutlined} none`,
     * });
     * ```
     */
    notOutlined    : unknown
    
    /**
     * A normalized factor representing the **outlined state**.
     * Useful for driving algebraic formulas in `calc(...)` to enable complex styling.
     * 
     * ### Expected values:
     * - **0** : not outlined
     * - **1** : outlined
     * - Never interpolates between 0-1 or outside this range.
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `transform`, `scale`, `opacity`, etc.
     * - Useful in custom `calc()` formulas or other CSS functions.
     */
    outlinedFactor : unknown
}



/**
 * Provides a CSS API for enabling conditional styling based on current outlined state.
 */
export interface CssOutlinedVariant {
    /**
     * Generates CSS rules that toggle outlined-related CSS variables based on current outlined state.
     * 
     * These rules are scoped using `ifOutlined()` and `ifNotOutlined()` to toggle outlined-related CSS variables.
     */
    outlinedVariantRule : Lazy<CssRule>
    
    /**
     * Exposes outlined-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `isOutlined`  : active when outlined
     * - `notOutlined` : active when not outlined
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    outlinedVariantVars : CssVars<OutlinedVariantVars>
}
