// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type MildVariantVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of mild-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [mildVariantVars] = cssVars<MildVariantVars>({ minify: false });
