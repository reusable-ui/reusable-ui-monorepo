// Cssfn:
import {
    // Writes css in javascript:
    variants,
    style,
    vars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssEmphasisVariant,
}                           from './types.js'

// CSS Variables:
import {
    emphasisVariantVars,
}                           from './css-variables.js'

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
export const usesEmphasisVariant = (): CssEmphasisVariant => {
    return {
        emphasisVariantRule : () => style(
            variants({
                ...ifEmphasized(
                    vars({
                        [emphasisVariantVars.isEmphasized ] : '',      // Valid    when emphasized.
                        [emphasisVariantVars.notEmphasized] : 'unset', // Poisoned when emphasized.
                    })
                ),
                ...ifNotEmphasized(
                    vars({
                        [emphasisVariantVars.isEmphasized ] : 'unset', // Poisoned when not emphasized.
                        [emphasisVariantVars.notEmphasized] : '',      // Valid    when not emphasized.
                    })
                ),
            }),
        ),
        
        emphasisVariantVars,
    } satisfies CssEmphasisVariant;
};
