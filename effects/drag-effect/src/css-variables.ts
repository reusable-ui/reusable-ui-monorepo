// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DragEffectVars,
}                           from './types.js'

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



/**
 * A strongly typed global mapping of drag-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [dragEffectVars] = cssVars<DragEffectVars>({ prefix: 'dre', minify: false });

// Register the drag filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(dragEffectVars.dragFilter);

// Register the drag transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(dragEffectVars.dragTransform);
