// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type FocusEffectVars,
}                           from './types.js'

// Reusable-ui features:
import {
    boxShadowRegistry,
}                           from '@reusable-ui/box-shadow-feature'  // A styling utility for composing a unified box shadow stack from custom and registered state packages.



/**
 * A strongly typed global mapping of focus-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [focusEffectVars] = cssVars<FocusEffectVars>({ prefix: 'foe', minify: false });

// Register the focus box shadow globally for composing a unified box shadow stack across effect packages:
boxShadowRegistry.registerBoxShadow(focusEffectVars.focusBoxShadow);
