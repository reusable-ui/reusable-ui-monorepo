// Cssfn:
import {
    // Arrays:
    type MaybeArray,
    
    
    
    // Cssfn css specific types:
    type CssCustomSimpleRef,
    type CssRule,
    type CssStyleCollection,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * Describes a single flag case when a variant flag should be active.
 * 
 * Conditionally sets or unsets a boolean-like CSS variable based on the specified variant condition.
 * 
 * When set, the variable holds an empty string (won't carry any meaningful value) and acts as an **active switch**.  
 * When unset, the variable invalidates dependent properties, causing the browser to ignore them.
 * 
 * @example
 * ```ts
 * const outlinedCase : CssSwitchVariantFlagCase = {
 *     ifVariant : ifOutlined,
 *     variable  : outlineVariantVars.isOutlined,
 * };
 * ```
 */
export interface CssSwitchVariantFlagCase {
    /**
     * Determines when the flag variable should be active.
     * 
     * Guidelines:
     * - Match configured variants for `is**` variables (e.g. `isOutlined`, `isMild`).
     * - Unmatch configured variants for `not**` variables (e.g. `notOutlined`, `notMild`).
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifOutlined`, `ifNotOutlined`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-outlined', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifVariant : (styles: CssStyleCollection) => CssRule
    
    /**
     * Specifies the boolean-like CSS variable to set when the variant condition is met.
     * 
     * Behavior:
     * - **Set** → assigns an empty string (won't carry any meaningful value) and acts as an **active switch**.
     * - **Unset** → invalidates dependent properties, causing the browser to ignore them.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `outlineVariantVars.isOutlined` (recommended)
     */
    variable  : CssCustomSimpleRef
}

/**
 * Describes a single flag case when a variant flag should be active,
 * with an additional factor value for algebraic styling.
 * 
 * Conditionally sets or unsets a boolean-like CSS variable based on the specified variant condition.
 * 
 * When set, the variable holds an empty string (won't carry any meaningful value) and acts as an **active switch**.  
 * When unset, the variable invalidates dependent properties, causing the browser to ignore them.
 * 
 * Use this when `factorVar` is present and the variant needs a numeric driver for algebraic styling.
 * 
 * @example
 * ```ts
 * const outlinedCase : CssSwitchVariantFlagCase = {
 *     ifVariant : ifOutlined,
 *     variable  : outlineVariantVars.isOutlined,
 *     factor    : 1, // 1 → outlined, 0 → not outlined
 * };
 * ```
 */
export interface CssSwitchVariantFactorCase
    extends
        // Bases:
        CssSwitchVariantFlagCase
{
    /**
     * Defines the discrete value to assign to `factorVar`.
     * 
     * Guidelines:
     * - `0` → inactive variant
     * - `1` → active variant
     * - `-1` → negative active variant (directional, rarely used)
     * - Positive/negative integers → multi-valued variants (e.g. `-2`, `-1`, `0`, `1`, `2` for `xs`, `sm`, `md`, `lg`, `xl`)
     * - Any numeric value → custom use cases (rarely used)
     */
    factor    : number
}



/**
 * Describes how switching-based variants should behave:
 * - **Flags** for *discrete switches* in conditional styling
 * 
 * @example
 * ```ts
 * // Describe how switching outlined variant should behave:
 * const outlineVariantRule : CssRule = usingSwitchVariant({
 *     // Flags for discrete switches in conditional styling:
 *     flags     : [
 *         {
 *             ifVariant : ifOutlined,
 *             variable  : outlineVariantVars.isOutlined,
 *         },
 *         {
 *             ifVariant : ifNotOutlined,
 *             variable  : outlineVariantVars.notOutlined,
 *         },
 *     ],
 * });
 * ```
 */
export interface CssSwitchVariantBaseBehavior {
    /**
     * Defines flag cases for conditional styling.
     * 
     * Provides boolean-like CSS variables for *discrete switches* in conditional styling.
     * Either fully applied or not at all — never interpolated.
     * 
     * Accepts either:
     * - A single `CssSwitchVariantFlagCase`
     * - An array of `CssSwitchVariantFlagCase[]`
     */
    flags     : MaybeArray<CssSwitchVariantFlagCase>
}

/**
 * Describes how switching-based variants should behave:
 * - **Flags** for *discrete switches* in conditional styling and the corresponding factor value
 * - **Factor** for *algebraic driver* used in `calc(...)` to enable complex styling
 * 
 * @example
 * ```ts
 * // Describe how switching outlined variant should behave (with factor variable):
 * const outlineVariantRule : CssRule = usingSwitchVariant({
 *     // Flags for discrete switches in conditional styling:
 *     flags     : [
 *         {
 *             ifVariant : ifOutlined,
 *             variable  : outlineVariantVars.isOutlined,
 *             factor    : 1, // 1 → outlined
 *         },
 *         {
 *             ifVariant : ifNotOutlined,
 *             variable  : outlineVariantVars.notOutlined,
 *             factor    : 0, // 0 → not outlined
 *         },
 *     ],
 *     factorVar : outlineVariantVars.outlineFactor, // The exposed factor variable.
 * });
 * ```
 */
export interface CssSwitchVariantFactorBehavior {
    /**
     * Defines flag cases for conditional styling and factor values for algebraic styling.
     * 
     * Provides boolean-like CSS variables for *discrete switches* in conditional styling.
     * Either fully applied or not at all — never interpolated.
     * 
     * Also provides a numeric variable for *algebraic driver* in `calc(...)` to enable complex styling.
     * Usually, non-zero values represent active variants, while zero represents inactive variants.
     * 
     * Accepts either:
     * - A single `CssSwitchVariantFactorCase`
     * - An array of `CssSwitchVariantFactorCase[]`
     */
    flags     : MaybeArray<CssSwitchVariantFactorCase>
    
    /**
     * Specifies a CSS variable for representing scalar values of the variant.
     * 
     * Provides a numeric variable for *algebraic driver* in `calc(...)` to enable complex styling.
     * 
     * Typical implementation: non-zero values represent active variants, while zero represents inactive variants.
     * Example range: `-2`, `-1`, `0`, `1`, `2` for `xs`, `sm`, `md`, `lg`, `xl`.
     */
    factorVar : CssCustomSimpleRef
}

/**
 * Describes how switching-based variants should behave:
 * - **Flags** for *discrete switches* in conditional styling and the corresponding factor value
 * - **Factor** for *algebraic driver* used in `calc(...)` to enable complex styling (optional)
 * 
 * Note:
 * - If `factorVar` is provided, each flag entry should provide a `factor` value to assign when active.
 * 
 * @example
 * ```ts
 * // Describe how switching outlined variant should behave (without factor variable):
 * const outlineVariantRule : CssRule = usingSwitchVariant({
 *     // Flags for discrete switches in conditional styling:
 *     flags     : [
 *         {
 *             ifVariant : ifOutlined,
 *             variable  : outlineVariantVars.isOutlined,
 *         },
 *         {
 *             ifVariant : ifNotOutlined,
 *             variable  : outlineVariantVars.notOutlined,
 *         },
 *     ],
 * });
 * ```
 * 
 * @example
 * ```ts
 * // Describe how switching outlined variant should behave (with factor variable):
 * const outlineVariantRule : CssRule = usingSwitchVariant({
 *     // Flags for discrete switches in conditional styling:
 *     flags     : [
 *         {
 *             ifVariant : ifOutlined,
 *             variable  : outlineVariantVars.isOutlined,
 *             factor    : 1, // 1 → outlined
 *         },
 *         {
 *             ifVariant : ifNotOutlined,
 *             variable  : outlineVariantVars.notOutlined,
 *             factor    : 0, // 0 → not outlined
 *         },
 *     ],
 *     factorVar : outlineVariantVars.outlineFactor, // The exposed factor variable.
 * });
 * ```
 */
export type CssSwitchVariantBehavior =
    |  CssSwitchVariantBaseBehavior
    | (CssSwitchVariantBaseBehavior & CssSwitchVariantFactorBehavior)
