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
 * Describes a single flag case for a switch-based variant.
 * 
 * Conditionally sets or unsets a boolean-like CSS variable based on the specified variant condition.
 * 
 * Behavior:
 * - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
 * - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
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
     * - Use `if**` helpers for positive flags (e.g. `ifOutlined`, `ifMild`).
     * - Use `ifNot**` helpers for negative flags (e.g. `ifNotOutlined`, `ifNotMild`).
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
     * - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
     * - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `outlineVariantVars.isOutlined` (recommended)
     */
    variable  : CssCustomSimpleRef
}

/**
 * Describes a single flag case for a switch-based variant,
 * with a numeric factor for algebraic styling.
 * 
 * Conditionally sets or unsets a boolean-like CSS variable based on the specified variant condition.
 * 
 * Behavior:
 * - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
 * - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
 * 
 * Use this when a `factorVar` is present and the variant needs a numeric driver for algebraic styling
 * in `calc(...)` or other CSS functions.
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
     * Typical usage:
     * - `0` → inactive variant
     * - `1` → active variant
     * - `-1` → negative active variant (directional, rarely used)
     * - Positive/negative integers → multi-valued variants (e.g. `-2`, `-1`, `0`, `1`, `2` for `xs`, `sm`, `md`, `lg`, `xl`)
     * - Any numeric value → custom use cases (rarely used)
     */
    factor    : number
}



/**
 * Describes how switch-based variants should behave:
 * - Toggles **flag variables** (boolean-like CSS switches):
 *   - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
 *   - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
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
 * Describes how switch-based variants should behave:
 * - Toggles **flag variables** (boolean-like CSS switches):
 *   - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
 *   - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
 * - Drives a numeric **factor variable** for algebraic styling
 *   in `calc(...)` or other CSS functions.
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
     * Defines flag cases for conditional styling.
     * 
     * Provides boolean-like CSS variables for *discrete switches* in conditional styling.
     * Either fully applied or not at all — never interpolated.
     * 
     * Also provides a numeric **factor value** for algebraic styling
     * in `calc(...)` or other CSS functions.
     * 
     * Accepts either:
     * - A single `CssSwitchVariantFactorCase`
     * - An array of `CssSwitchVariantFactorCase[]`
     */
    flags     : MaybeArray<CssSwitchVariantFactorCase>
    
    /**
     * Specifies a CSS variable representing the scalar factor for the variant.
     * 
     * Provides a numeric **factor variable** for algebraic styling
     * in `calc(...)` or other CSS functions.
     * 
     * Typical usage:
     * - `0` → inactive variant
     * - `1` → active variant
     * - `-1` → negative active variant (directional, rarely used)
     * - Positive/negative integers → multi-valued variants (e.g. `-2`, `-1`, `0`, `1`, `2` for `xs`, `sm`, `md`, `lg`, `xl`)
     * - Any numeric value → custom use cases (rarely used)
     */
    factorVar : CssCustomSimpleRef
}

/**
 * Describes how switch-based variants should behave:
 * - Toggles **flag variables** (boolean-like CSS switches):
 *   - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
 *   - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
 * - Optionally drives a numeric **factor variable** for algebraic styling
 *   in `calc(...)` or other CSS functions.
 * 
 * Note:
 * - If `factorVar` is provided, each flag entry must define a `factor` value (e.g., 0 or 1).
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
