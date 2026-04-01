// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type ForegroundFeatureVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of foreground-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [foregroundFeatureVars] = cssVars<ForegroundFeatureVars>({ prefix: 'fg', minify: false });
