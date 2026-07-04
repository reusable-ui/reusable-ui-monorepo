// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomProps,
    type CssRule,
    
    
    
    // Writes css in javascript:
    variants,
    fallback,
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssSwitchVariantFlagCase,
    type CssSwitchVariantFactorCase,
    
    type CssSwitchVariantBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for switching-based variant styling, including:
 * - **Flag variables** for *discrete switches* in conditional styling and the corresponding factor value for algebraic driver.
 * - **Factor variables** for *algebraic driver* in `calc(...)` to enable complex styling (optional).
 * 
 * Note:
 * If the `factorVar` is provided, the `factor` property in each `CssSwitchVariantFactorCase` should also be provided.
 * 
 * @param variantBehavior - The switching-based variant styling behaviors to apply.
 * @returns A `CssRule` that enables switching-based variant styling to work correctly and dynamically.
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
export const usingSwitchVariant = (variantBehavior: CssSwitchVariantBehavior): CssRule => {
    // Extract variant behavior and assign defaults:
    const {
        flags = [],
    } = variantBehavior;
    
    
    
    // Normalize input: always work with an array internally:
    // - Also make the `factor` property optional for conditionally supporting variants with a factor variable.
    const normalizedFlagsAndFactors : Array<CssSwitchVariantFlagCase & Partial<CssSwitchVariantFactorCase>> = (
        Array.isArray(flags)
        ? flags
        : [flags]
    );
    
    // Extract factor variable if provided:
    const factorVar = ('factorVar' in variantBehavior) ? variantBehavior.factorVar : undefined;
    
    
    
    // Build composite style from variant behavior:
    return style({
        // Apply flag variables (boolean-like CSS switches):
        
        // Pre-reset all flags to `unset` to avoid accidental inheritance:
        ...fallback( // `fallback()` ensures these resets are emitted before any other declarations.
            vars(
                Object.fromEntries(
                    normalizedFlagsAndFactors.map(({ variable }) =>
                        // Reset each flag variable to `unset`.
                        // - [variable, 'unset'] => ['var(--var-name)', 'unset'] → normalized internally to ['--var-name', 'unset']
                        [variable, 'unset']
                    )
                ) as CssCustomProps
            )
        ),
        
        // Conditionally set flags when their variant condition matches:
        // - Also conditionally set the factor variable if provided.
        ...variants(
            normalizedFlagsAndFactors.map(({ ifVariant, variable, factor }) =>
                // Only set the variable if the variant condition is met:
                ifVariant(
                    vars({
                        // Set the flag variable to an empty string (won't carry any meaningful value) → acts as an **active switch**:
                        // - [variable] => ['var(--var-name)'] → normalized internally to ['--var-name']
                        [variable]: '',
                        
                        
                        
                        // Conditionally set the factor variable if provided:
                        ...(factorVar ? {
                            [factorVar]: factor!, // For switch variants with a factor variable, the `factor` should always be provided by `CssSwitchVariantFactorCase`.
                        } : undefined)
                    })
                )
            ),
        ),
    });
};
