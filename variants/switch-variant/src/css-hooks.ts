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
 * Applies CSS variables for mutually exclusive switching-based variants.
 * 
 * Role:
 * - Toggle boolean-like flag variables (sets empty string when active, `unset` when inactive).
 * - Optionally drive a numeric `factorVar` for algebraic drivers used in `calc(...)`.
 * 
 * Notes:
 * - If `factorVar` is provided, each flag entry should provide a `factor` value to assign when active.
 * - Flag variables are pre-reset to `unset` (to avoid accidental inheritance) and then conditionally set.
 * 
 * @param variantBehavior - A configuration describing the variant flags and optional factor variable.
 * @returns A `CssRule` that sets the flag variables and optional factor variable according to variant states.
 * 
 * @example
 * ```ts
 * // Outline variant without factor driver:
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
 * // Outline variant with factor driver:
 * const outlineVariantRule : CssRule = usingSwitchVariant({
 *     // Flags for discrete switches in conditional styling:
 *     flags     : [
 *         {
 *             ifVariant : ifOutlined,
 *             variable  : outlineVariantVars.isOutlined,
 *             factor    : 1, // Set to 1 when outlined.
 *         },
 *         {
 *             ifVariant : ifNotOutlined,
 *             variable  : outlineVariantVars.notOutlined,
 *             factor    : 0, // Set to 0 when not outlined.
 *         },
 *     ],
 *     factorVar : outlineVariantVars.outlineFactor, // The factor variable to set when a flag is active.
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
