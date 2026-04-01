// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type TransformFeatureVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of transform-related CSS variables used for composing transform stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [transformFeatureVars] = cssVars<TransformFeatureVars>({ prefix: 'tm', minify: false });
