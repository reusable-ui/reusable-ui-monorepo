// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type RingFeatureVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of ring-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [ringFeatureVars] = cssVars<RingFeatureVars>({ prefix: 'rg', minify: false });
