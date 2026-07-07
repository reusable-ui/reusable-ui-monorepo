// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultStrippedVariantPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type StrippedVariantVars,
}                           from './css-types.js'



/**
 * A strongly typed global mapping of stripped-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [strippedVariantVars] = cssVars<StrippedVariantVars<true | string>>({ prefix: defaultStrippedVariantPrefix, minify: false });
