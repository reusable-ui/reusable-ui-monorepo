// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type SortEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultSortEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



/**
 * A strongly typed global mapping of sorting effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [sortEffectVars] = cssVars<SortEffectVars>({ prefix: defaultSortEffectPrefix, minify: false });

// Register the sort transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(sortEffectVars.sortTransform);
