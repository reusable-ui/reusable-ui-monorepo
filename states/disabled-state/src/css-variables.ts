// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DisabledStateVars,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A strongly typed global mapping of enable/disable-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [disabledStateVars] = cssVars<DisabledStateVars>({ prefix: 'ds', minify: false });

// Register the enable/disable-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(disabledStateVars.animationEnabling);
animationRegistry.registerAnimation(disabledStateVars.animationDisabling);
