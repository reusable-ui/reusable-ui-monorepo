// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type PressStateVars,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A strongly typed global mapping of press/release-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [pressStateVars] = cssVars<PressStateVars>({ prefix: 'pr', minify: false });

// Register the press/release-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(pressStateVars.animationPressing);
animationRegistry.registerAnimation(pressStateVars.animationReleasing);
