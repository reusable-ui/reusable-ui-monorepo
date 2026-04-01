// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type BoxShadowFeatureVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of box-shadow-related CSS variables used for composing box shadow stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [boxShadowFeatureVars] = cssVars<BoxShadowFeatureVars>({ prefix: 'bw', minify: false });
