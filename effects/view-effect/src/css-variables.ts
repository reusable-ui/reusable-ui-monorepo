// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ViewEffectVars,
}                           from './types.js'

// Reusable-ui features:
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



/**
 * A strongly typed global mapping of view-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [viewEffectVars] = cssVars<ViewEffectVars>({ prefix: 'vie', minify: false });

// Register the view transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(viewEffectVars.viewTransform);
