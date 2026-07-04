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

// Reusable helper:
import {
    usingVariantSwitch,
    type SwitchVariantOption,
}                           from '@reusable-ui/switch-variant'



/**
 * Generates CSS rules that toggle orientation-related CSS variables based on the current orientation mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on orientation mode.
 */
export const usingOrientationVariant = (): CssOrientationVariant => {
    return {
        orientationVariantRule : () => usingVariantSwitch({
            factorVar: orientationVariantVars.orientationFactor,
            options: [
                {
                    ifVariant: ifOrientationInline,
                    activeVariable: orientationVariantVars.isOrientationInline,
                    activeFactor: 0,
                },
                {
                    ifVariant: ifOrientationBlock,
                    activeVariable: orientationVariantVars.isOrientationBlock,
                    activeFactor: 1,
                },
            ] satisfies SwitchVariantOption[],
        }),
        
        orientationVariantVars,
    } satisfies CssOrientationVariant;
};
