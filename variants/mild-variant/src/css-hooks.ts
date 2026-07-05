// Reusable-ui variants:
import {
    // Hooks:
    usingSwitchVariant,
}                           from '@reusable-ui/switch-variant'      // Reusable abstraction for building switch-based variants. Drives boolean-like flag variables and numeric factor variable.

// Types:
import {
    type CssMildVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    mildVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifMild,
    ifNotMild,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle mild-related CSS variables based on the current mild mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on mild mode.
 */
export const usingMildVariant = (): CssMildVariant => {
    return {
        mildVariantRule : () => usingSwitchVariant({
            // Flags for discrete switches in conditional styling:
            flags     : [
                {
                    ifVariant : ifNotMild,
                    variable  : mildVariantVars.notMild,
                    factor    : 0, // Set to 0 when not in mild mode.
                },
                {
                    ifVariant : ifMild,
                    variable  : mildVariantVars.isMild,
                    factor    : 1, // Set to 1 when in mild mode.
                },
            ],
            
            // The factor variable to set when a flag is active:
            factorVar : mildVariantVars.mildFactor,
        }),
        
        mildVariantVars,
    } satisfies CssMildVariant;
};
