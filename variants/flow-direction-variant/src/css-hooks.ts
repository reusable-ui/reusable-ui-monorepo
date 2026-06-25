// Cssfn:
import {
    // Writes css in javascript:
    variants,
    style,
    vars,
}                           from '@cssfn/core'          // Writes css in javascript.

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
 * Generates CSS rules that toggle flow-direction-related CSS variables based on the current flow direction mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on flow direction mode.
 */
export const usingFlowDirectionVariant = (): CssFlowDirectionVariant => {
    return {
        flowDirectionVariantRule : () => style(
            variants({
                ...ifFlowDirectionStart(
                    vars({
                        [flowDirectionVariantVars.isFlowDirectionStart] : '',      // Valid    when aligned toward the logical start edge.
                        [flowDirectionVariantVars.isFlowDirectionEnd  ] : 'unset', // Poisoned when aligned toward the logical start edge.
                    })
                ),
                ...ifFlowDirectionEnd(
                    vars({
                        [flowDirectionVariantVars.isFlowDirectionStart] : 'unset', // Poisoned when aligned toward the logical end edge.
                        [flowDirectionVariantVars.isFlowDirectionEnd  ] : '',      // Valid    when aligned toward the logical end edge.
                    })
                ),
            }),
        ),
        
        flowDirectionVariantVars,
    } satisfies CssFlowDirectionVariant;
};
