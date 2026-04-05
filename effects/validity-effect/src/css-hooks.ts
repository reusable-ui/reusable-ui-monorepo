// Cssfn:
import {
    // Writes css in javascript:
    rules,
    neverRule,
    style,
    vars,
    
    
    
    // Utilities:
    startsCapitalized,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssValidityEffectOptions,
    type CssValidityEffect,
}                           from './types.js'

// CSS Variables:
import {
    validityEffectVars,
}                           from './css-variables.js'

// Utilities:
import {
    colorRoleMap,
}                           from './color-utilities.js'
import {
    colorMix,
}                           from './css-internal-formulas.js'

// Reusable-ui configs:
import {
    colorVars,
}                           from '@reusable-ui/colors'              // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.

// Reusable-ui variants:
import {
    usesThemeVariant,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.

// Reusable-ui states:
import {
    usesValidityState,
}                           from '@reusable-ui/validity-state'      // Lifecycle-aware validation state with transition animations and semantic styling hooks for UI components.



/**
 * Applies validity-state effects that switch component's theme colors to **success** or **danger**,
 * making them **visually verified** when valid/invalid.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between valid, invalid, and unvalidated states by interpolating theme colors.
 * Uses the current theme colors as the baseline, ensuring harmony with the component's appearance.
 * 
 * @param options - An optional configuration for customizing validity effects.
 * @returns A CSS API containing effect rules and CSS variables for the success/danger theme colors.
 */
export const usesValidityEffect = (options?: CssValidityEffectOptions): CssValidityEffect => {
    // Extract options and assign defaults:
    const {
        validTheme   = 'success', // Defaults to `'success'` (positive actions and confirmations).
        invalidTheme = 'danger',  // Defaults to `'danger'` (destructive actions or error indicators).
    } = options ?? {};
    
    
    
    // Variants:
    const { themeVariantVars } = usesThemeVariant();
    
    // States:
    const { validityStateVars : { validityFactorCond } } = usesValidityState();
    
    // Variables:
    const { validSwitch, invalidSwitch, validityWeight, unvalidatedWeight } = validityEffectVars;
    
    
    
    return {
        validityEffectRule : () => style({
            ...vars({
                /**
                 * Valid color switch (success theme):
                 * - No running transition → `unset`.
                 * - factor > +1           → 100% (full valid color).
                 * - factor ≤ 0            → 0.01% (effectively off).
                 * - The epsilon (`0.01%`) ensures `color-mix(...)` never sees an exact 0,
                 *   preventing invalid cases and avoiding flicker at factor = 0.
                 */
                [validSwitch      ] : `clamp(0.01%, ${validityFactorCond} * 99999%, 100%)`,
                
                /**
                 * Invalid color switch (danger theme):
                 * - No running transition → `unset`.
                 * - factor < -1           → 100% (full invalid color).
                 * - factor ≥ 0            → 0.01% (effectively off).
                 * - The epsilon (`0.01%`) ensures `color-mix(...)` never sees an exact 0,
                 *   preventing invalid cases and avoiding flicker at factor = 0.
                 */
                [invalidSwitch    ] : `clamp(0.01%, ${validityFactorCond} * -99999%, 100%)`,
                
                /**
                 * Validity weight (valid or invalid color contribution):
                 * - No running transition → `unset`.
                 * - factor ≥ +1 or ≤ -1   → 100% (full valid/invalid color).
                 * - factor = 0            → 0% (no valid/invalid color).
                 * - Between -1 and +1     → Smooth interpolation between 0% and 100% (semi valid/invalid color).
                 */
                [validityWeight   ] : `clamp(0%, max(${validityFactorCond} * 100%, ${validityFactorCond} * -100%), 100%)`,
                
                /**
                 * Unvalidated weight (current theme color contribution):
                 * - No running transition → `unset`.
                 * - factor = 0            → 100% (full current theme color).
                 * - factor ≥ +1 or ≤ -1   → 0% (no current theme color).
                 * - Between -1 and +1     → Smooth interpolation between 100% and 0% (semi current theme color).
                 */
                [unvalidatedWeight] : `calc(100% - ${validityWeight})`,
            }),
            
            ...rules(
                (['backg', 'foreg', 'decor', 'border', 'ring'] as const).flatMap((surfaceRole) =>
                    (['regular', 'outlined', 'mild'] as const).map((variantRole) =>
                        (
                            // Outlined background is always transparent → no override needed:
                            ((surfaceRole === 'backg') && (variantRole === 'outlined'))
                            
                            ||
                            
                            // Rings always use the regular override → no outlined/mild overrides:
                            ((surfaceRole === 'ring') && (variantRole !== 'regular'))
                        )
                        ? neverRule() // Nothing to render.
                        : vars({
                            /**
                             * Color override logic:
                             * - Fully unvalidated              → `unset` (no color override, use current theme color).
                             * - Regular/outlined/mild variants → Interpolates between variant color and valid/invalid colors.
                             * 
                             * Behavior:
                             * - factor = 0       → Current theme color (no validity influence).
                             * - factor = +1      → Valid color (success theme).
                             * - factor = -1      → Invalid color (danger theme).
                             * - Between 0 and ±1 → Smooth interpolation between variant color and the resolved validity color.
                             * - factor = 0       → Internally resolves to a balanced blend of valid and invalid colors,
                             *                      but this result is unused because `validityWeight = 0%` at factor = 0.
                             * 
                             * Implementation details:
                             * - Valid/invalid weights act as discrete switches (on/off).
                             *   - Positive factor → valid color enabled.
                             *   - Negative factor → invalid color enabled.
                             * - The discrete validity color is then smoothly blended with the current theme color
                             *   using `validityWeight` and `unvalidatedWeight`.
                             *   Preserves smooth transitions while keeping opacity stable.
                             * - This two-stage process preserves smooth transitions while ensuring opacity remains stable.
                             */
                            [themeVariantVars[`${surfaceRole}${startsCapitalized(variantRole)}Override` as keyof typeof themeVariantVars]]: colorMix(
                                // Step 1: resolve discrete validity color (valid vs. invalid).
                                colorMix(
                                    // Valid color:
                                    colorVars[`${validTheme}${colorRoleMap[variantRole][surfaceRole]}` as keyof typeof colorVars],
                                    validSwitch,
                                    
                                    // Invalid color:
                                    colorVars[`${invalidTheme}${colorRoleMap[variantRole][surfaceRole]}` as keyof typeof colorVars],
                                    invalidSwitch
                                ),
                                validityWeight,
                                
                                // Step 2: blend with current theme color (smooth interpolation).
                                themeVariantVars[`${surfaceRole}${startsCapitalized(variantRole)}` as keyof typeof themeVariantVars],
                                unvalidatedWeight
                            ),
                        })
                    )
                )
            ),
        }),
        
        validityEffectVars,
    } satisfies CssValidityEffect;
};
