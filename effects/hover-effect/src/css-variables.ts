// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type HoverEffectVars,
}                           from './types.js'

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.



/**
 * A strongly typed global mapping of hover-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [hoverEffectVars] = cssVars<HoverEffectVars>({ prefix: 'hoe', minify: false });

// Register the hover filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(hoverEffectVars.hoverFilter);
