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
 * A list of mild-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches or numeric factors that determine whether
 * mild-specific styles should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface MildVariantVars {
    /**
     * Applies when the component is in mild mode.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is in mild mode:
     *     fontWeight     : `${mildVariantVars.isMild} lighter`,
     *     textDecoration : `${mildVariantVars.isMild} underline`,
     * });
     * ```
     */
    isMild     : unknown
    
    /**
     * Applies when the component is not in mild mode.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is not in mild mode:
     *     fontWeight     : `${mildVariantVars.notMild} normal`,
     *     textDecoration : `${mildVariantVars.notMild} none`,
     * });
     * ```
     */
    notMild    : unknown
    
    /**
     * A normalized factor representing the **mild mode**.
     * Useful for driving algebraic formulas in `calc(...)` to enable complex styling.
     * 
     * ### Expected values:
     * - **0** : not mild
     * - **1** : mild
     * - Never interpolates between 0-1 or outside this range.
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `transform`, `scale`, `opacity`, etc.
     * - Useful in custom `calc()` formulas or other CSS functions.
     */
    mildFactor : unknown
}



/**
 * Provides a CSS API for enabling conditional styling based on the mild mode.
 */
export interface CssMildVariant {
    /**
     * Generates CSS rules that toggle mild-related CSS variables based on the current mild mode.
     * 
     * These rules are scoped using `ifMild()` and `ifNotMild()` to toggle mild-related CSS variables.
     */
    mildVariantRule : Lazy<CssRule>
    
    /**
     * Exposes mild-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `isMild`  : active when mild mode is enabled.
     * - `notMild` : active when mild mode is disabled.
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    mildVariantVars : CssVars<MildVariantVars>
}
