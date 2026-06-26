// Cssfn:
import {
    // Writes css in javascript:
    variants,
    style,
    vars,
}                           from '@cssfn/core'          // Writes css in javascript.

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
 * @returns A CSS API for enabling conditional styling based on outlined state.
 */
export const usingOutlineVariant = (): CssOutlineVariant => {
    return {
        outlineVariantRule : () => style(
            variants({
                ...ifOutlined(
                    vars({
                        [outlineVariantVars.isOutlined   ] : '',      // Valid    when outlined.
                        [outlineVariantVars.notOutlined  ] : 'unset', // Poisoned when outlined.
                        
                        [outlineVariantVars.outlineFactor] : 1,       // 1 → outlined.
                    })
                ),
                ...ifNotOutlined(
                    vars({
                        [outlineVariantVars.isOutlined   ] : 'unset', // Poisoned when not outlined.
                        [outlineVariantVars.notOutlined  ] : '',      // Valid    when not outlined.
                        
                        [outlineVariantVars.outlineFactor] : 0,       // 0 → not outlined.
                    })
                ),
            }),
        ),
        
        outlineVariantVars,
    } satisfies CssOutlineVariant;
};
