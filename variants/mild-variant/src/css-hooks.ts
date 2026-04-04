// Cssfn:
import {
    // Writes css in javascript:
    variants,
    style,
    vars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssMildVariant,
}                           from './types.js'

// CSS Variables:
import {
    mildVariantVars,
}                           from './css-variables.js'

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
export const usesMildVariant = (): CssMildVariant => {
    return {
        mildVariantRule : () => style(
            variants({
                ...ifMild(
                    vars({
                        [mildVariantVars.isMild ] : '',      // Valid    when mild mode is enabled.
                        [mildVariantVars.notMild] : 'unset', // Poisoned when mild mode is enabled.
                    })
                ),
                ...ifNotMild(
                    vars({
                        [mildVariantVars.isMild ] : 'unset', // Poisoned when mild mode is disabled.
                        [mildVariantVars.notMild] : '',      // Valid    when mild mode is disabled.
                    })
                ),
            }),
        ),
        
        mildVariantVars,
    } satisfies CssMildVariant;
};
