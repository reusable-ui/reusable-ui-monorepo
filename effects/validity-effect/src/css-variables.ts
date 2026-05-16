// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ValidityEffectVars,
}                           from './types.js'

// Reusable-ui defaults:
import {
    defaultValidityEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.



/**
 * A strongly typed global mapping of validity-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [validityEffectVars] = cssVars<ValidityEffectVars>({ prefix: defaultValidityEffectPrefix, minify: false });
