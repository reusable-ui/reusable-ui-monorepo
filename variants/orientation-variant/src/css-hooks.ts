// Cssfn:
import {
    // Writes css in javascript:
    variants,
    style,
    vars,
}                           from '@cssfn/core'          // Writes css in javascript.

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
        orientationVariantRule : () => style(
            variants({
                ...ifOrientationInline(
                    vars({
                        [orientationVariantVars.isOrientationInline] : '',      // Valid    when oriented horizontally (inline).
                        [orientationVariantVars.isOrientationBlock ] : 'unset', // Poisoned when oriented horizontally (inline).
                    })
                ),
                ...ifOrientationBlock(
                    vars({
                        [orientationVariantVars.isOrientationInline] : 'unset', // Poisoned when oriented vertically (block).
                        [orientationVariantVars.isOrientationBlock ] : '',      // Valid    when oriented vertically (block).
                    })
                ),
            }),
        ),
        
        orientationVariantVars,
    } satisfies CssOrientationVariant;
};
