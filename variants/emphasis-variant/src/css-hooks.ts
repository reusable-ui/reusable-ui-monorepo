// Reusable-ui variants:
import {
    // Hooks:
    usingSwitchVariant,
}                           from '@reusable-ui/switch-variant'      // Reusable abstraction for building switch-based variants. Drives boolean-like flag variables and numeric factor variable.

// Types:
import {
    type CssEmphasisVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    emphasisVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifEmphasized,
    ifNotEmphasized,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle emphasis-related CSS variables based on the current emphasized state,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on emphasized state.
 */
export const usingEmphasisVariant = (): CssEmphasisVariant => {
    return {
        emphasisVariantRule : () => usingSwitchVariant({
            // Flags for discrete switches in conditional styling:
            flags     : [
                {
                    ifVariant : ifNotEmphasized,
                    variable  : emphasisVariantVars.notEmphasized,
                    factor    : 0, // Set to 0 when not emphasized.
                },
                {
                    ifVariant : ifEmphasized,
                    variable  : emphasisVariantVars.isEmphasized,
                    factor    : 1, // Set to 1 when emphasized.
                },
            ],
            
            // The factor variable to set when a flag is active:
            factorVar : emphasisVariantVars.emphasisFactor,
        }),
        
        emphasisVariantVars,
    } satisfies CssEmphasisVariant;
};
