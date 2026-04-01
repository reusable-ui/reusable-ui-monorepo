// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ValidityEffectVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of validity-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [validityEffectVars] = cssVars<ValidityEffectVars>({ prefix: 'vae', minify: false });
