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
 * A list of flow-direction-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches or numeric factors that determine whether
 * flow-direction-specific styles should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface FlowDirectionVariantVars {
    /**
     * Applies when the component is aligned toward the logical start edge.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is aligned toward the logical start edge:
     *     textAlign      : `${flowDirectionVariantVars.isFlowDirectionStart} start`,
     *     justifyContent : `${flowDirectionVariantVars.isFlowDirectionStart} start`,
     * });
     * ```
     */
    isFlowDirectionStart : unknown
    
    /**
     * Applies when the component is aligned toward the logical end edge.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is aligned toward the logical end edge:
     *     textAlign      : `${flowDirectionVariantVars.isFlowDirectionEnd} end`,
     *     justifyContent : `${flowDirectionVariantVars.isFlowDirectionEnd} end`,
     * });
     * ```
     */
    isFlowDirectionEnd   : unknown
    
    /**
     * A normalized factor representing the **flow direction mode**.
     * Useful for driving algebraic formulas in `calc(...)` to enable complex styling.
     * 
     * ### Expected values:
     * - **0** : aligned toward the logical start edge
     * - **1** : aligned toward the logical end edge
     * - Never interpolates between 0-1 or outside this range.
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `transform`, `scale`, `opacity`, etc.
     * - Useful in custom `calc()` formulas or other CSS functions.
     */
    flowDirectionFactor  : unknown
}



/**
 * Provides a CSS API for enabling conditional styling based on the flow direction mode.
 */
export interface CssFlowDirectionVariant {
    /**
     * Generates CSS rules that toggle flow-direction-related CSS variables based on the current flow direction mode.
     * 
     * These rules are scoped using `ifFlowDirectionStart()` and `ifFlowDirectionEnd()` to toggle flow-direction-related CSS variables.
     */
    flowDirectionVariantRule : Lazy<CssRule>
    
    /**
     * Exposes flow-direction-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `isFlowDirectionStart` : active when aligned toward the logical start edge
     * - `isFlowDirectionEnd`   : active when aligned toward the logical end edge
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    flowDirectionVariantVars : CssVars<FlowDirectionVariantVars>
}
