// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type OutlineVariantVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of outline-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [outlineVariantVars] = cssVars<OutlineVariantVars>({ minify: false });
