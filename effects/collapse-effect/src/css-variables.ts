// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CollapseEffectVars,
}                           from './types.js'

// Reusable-ui features:
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



/**
 * A strongly typed global mapping of collapse-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [collapseEffectVars] = cssVars<CollapseEffectVars>({ prefix: 'coe', minify: false });

// Register the overshoot transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(collapseEffectVars.overshootTransform);
