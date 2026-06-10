// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ActiveEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultActiveEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.



/**
 * A strongly typed global mapping of active-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [activeEffectVars] = cssVars<ActiveEffectVars>({ prefix: defaultActiveEffectPrefix, minify: false });

// Register the active filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(activeEffectVars.activeFilter);
