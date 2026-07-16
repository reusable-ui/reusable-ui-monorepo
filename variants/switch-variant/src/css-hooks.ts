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
 * Applies CSS variables for mutually exclusive, switch-based variants.
 * 
 * Behavior:
 * - Toggles **flag variables** (boolean-like CSS switches):
 *   - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
 *   - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
 * - Optionally drives a numeric **factor variable**, reflecting the currently active variant,
 *   which can be used for algebraic styling in `calc(...)` or other CSS functions.
 * 
 * Notes:
 * - If `factorVar` is provided, each flag entry must define a `factor` value (e.g., 0 or 1).
 * - All flag variables are pre-reset to `unset` to avoid accidental inheritance from parent elements.
 * 
 * @param variantBehavior A configuration describing the variant flags and optional factor variable.
 * @returns A `CssRule` that applies the flag variables and optional factor variable according to variant states.
 * 
 * @example
 * ```ts
 * // Outlined variant without factor driver:
 * const outlinedVariantRule : CssRule = usingSwitchVariant({
 *     // Flags for discrete switches in conditional styling:
 *     flags     : [
 *         {
 *             ifVariant : ifOutlined,
 *             variable  : outlinedVariantVars.isOutlined,
 *         },
 *         {
 *             ifVariant : ifNotOutlined,
 *             variable  : outlinedVariantVars.notOutlined,
 *         },
 *     ],
 * });
 * ```
 * 
 * @example
 * ```ts
 * // Outlined variant with factor driver:
 * const outlinedVariantRule : CssRule = usingSwitchVariant({
 *     // Flags for discrete switches in conditional styling:
 *     flags     : [
 *         {
 *             ifVariant : ifOutlined,
 *             variable  : outlinedVariantVars.isOutlined,
 *             factor    : 1, // Set to 1 when outlined.
 *         },
 *         {
 *             ifVariant : ifNotOutlined,
 *             variable  : outlinedVariantVars.notOutlined,
 *             factor    : 0, // Set to 0 when not outlined.
 *         },
 *     ],
 *     factorVar : outlinedVariantVars.outlinedFactor, // The factor variable to set when a flag is active.
 * });
 * ```
 */
export const usingSwitchVariant = (variantBehavior: CssSwitchVariantBehavior): CssRule => {
    // Extract variant behavior and assign defaults:
    const {
        flags = [],
    } = variantBehavior;
    
    
    
    // Normalize input: always work with an array internally:
    // - Factor is optional unless a factorVar is defined.
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
        
        // Pre-reset all flags to `unset` to avoid accidental inheritance from parent elements:
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
        
        // Conditionally activate flags and assign factor variable when their variant condition matches:
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
