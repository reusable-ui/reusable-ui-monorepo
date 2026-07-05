// Reusable-ui variants:
import {
    // Hooks:
    usingSwitchVariant,
}                           from '@reusable-ui/switch-variant'      // Reusable abstraction for building switch-based variants. Drives boolean-like flag variables and numeric factor variable.

// Types:
import {
    type CssOrientationVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    orientationVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifOrientationInline,
    ifOrientationBlock,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle orientation-related CSS variables based on the current orientation mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on orientation mode.
 */
export const usingOrientationVariant = (): CssOrientationVariant => {
    return {
        orientationVariantRule : () => usingSwitchVariant({
            // Flags for discrete switches in conditional styling:
            flags     : [
                {
                    ifVariant : ifOrientationInline,
                    variable  : orientationVariantVars.isOrientationInline,
                    factor    : 0, // Set to 0 when oriented horizontally (inline).
                },
                {
                    ifVariant : ifOrientationBlock,
                    variable  : orientationVariantVars.isOrientationBlock,
                    factor    : 1, // Set to 1 when oriented vertically (block).
                },
            ],
            
            // The factor variable to set when a flag is active:
            factorVar : orientationVariantVars.orientationFactor,
        }),
        
        orientationVariantVars,
    } satisfies CssOrientationVariant;
};
