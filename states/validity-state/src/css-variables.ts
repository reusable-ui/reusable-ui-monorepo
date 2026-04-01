// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ValidityStateVars,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A strongly typed global mapping of validity-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [validityStateVars] = cssVars<ValidityStateVars>({ prefix: 'va', minify: false });

// Register the validity-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(validityStateVars.animationValidating);
animationRegistry.registerAnimation(validityStateVars.animationInvalidating);
animationRegistry.registerAnimation(validityStateVars.animationUnvalidating);
