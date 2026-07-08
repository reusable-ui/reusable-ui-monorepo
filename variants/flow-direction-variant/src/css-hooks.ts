// Reusable-ui variants:
import {
    // Hooks:
    usingSwitchVariant,
}                           from '@reusable-ui/switch-variant'      // Reusable abstraction for building switch-based variants. Drives boolean-like flag variables and numeric factor variable.

// Types:
import {
    type CssFlowDirectionVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    flowDirectionVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifFlowDirectionStart,
    ifFlowDirectionEnd,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle flow-direction-related CSS variables based on current flow direction mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on current flow direction mode.
 */
export const usingFlowDirectionVariant = (): CssFlowDirectionVariant => {
    return {
        flowDirectionVariantRule : () => usingSwitchVariant({
            // Flags for discrete switches in conditional styling:
            flags     : [
                {
                    ifVariant : ifFlowDirectionStart,
                    variable  : flowDirectionVariantVars.isFlowDirectionStart,
                    factor    : 0, // Set to 0 when aligned toward the logical start edge.
                },
                {
                    ifVariant : ifFlowDirectionEnd,
                    variable  : flowDirectionVariantVars.isFlowDirectionEnd,
                    factor    : 1, // Set to 1 when aligned toward the logical end edge.
                },
            ],
            
            // The factor variable to set when a flag is active:
            factorVar : flowDirectionVariantVars.flowDirectionFactor,
        }),
        
        flowDirectionVariantVars,
    } satisfies CssFlowDirectionVariant;
};
