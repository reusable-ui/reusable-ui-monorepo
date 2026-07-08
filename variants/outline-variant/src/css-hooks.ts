// Reusable-ui variants:
import {
    // Hooks:
    usingSwitchVariant,
}                           from '@reusable-ui/switch-variant'      // Reusable abstraction for building switch-based variants. Drives boolean-like flag variables and numeric factor variable.

// Types:
import {
    type CssOutlineVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    outlineVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifOutlined,
    ifNotOutlined,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle outline-related CSS variables based on the current outlined state,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on the outlined state.
 */
export const usingOutlineVariant = (): CssOutlineVariant => {
    return {
        outlineVariantRule : () => usingSwitchVariant({
            // Flags for discrete switches in conditional styling:
            flags     : [
                {
                    ifVariant : ifNotOutlined,
                    variable  : outlineVariantVars.notOutlined,
                    factor    : 0, // Set to 0 when not outlined.
                },
                {
                    ifVariant : ifOutlined,
                    variable  : outlineVariantVars.isOutlined,
                    factor    : 1, // Set to 1 when outlined.
                },
            ],
            
            // The factor variable to set when a flag is active:
            factorVar : outlineVariantVars.outlineFactor,
        }),
        
        outlineVariantVars,
    } satisfies CssOutlineVariant;
};
