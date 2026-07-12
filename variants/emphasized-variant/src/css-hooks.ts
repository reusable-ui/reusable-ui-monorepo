// Reusable-ui variants:
import {
    // Hooks:
    usingSwitchVariant,
}                           from '@reusable-ui/switch-variant'      // Reusable abstraction for building switch-based variants. Drives boolean-like flag variables and numeric factor variable.

// Types:
import {
    type CssEmphasizedVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    emphasizedVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifEmphasized,
    ifNotEmphasized,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle emphasized-related CSS variables based on current emphasized state,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on current emphasized state.
 */
export const usingEmphasizedVariant = (): CssEmphasizedVariant => {
    return {
        emphasizedVariantRule : () => usingSwitchVariant({
            // Flags for discrete switches in conditional styling:
            flags     : [
                {
                    ifVariant : ifNotEmphasized,
                    variable  : emphasizedVariantVars.notEmphasized,
                    factor    : 0, // Set to 0 when not emphasized.
                },
                {
                    ifVariant : ifEmphasized,
                    variable  : emphasizedVariantVars.isEmphasized,
                    factor    : 1, // Set to 1 when emphasized.
                },
            ],
            
            // The factor variable to set when a flag is active:
            factorVar : emphasizedVariantVars.emphasizedFactor,
        }),
        
        emphasizedVariantVars,
    } satisfies CssEmphasizedVariant;
};
