// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type HoverStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultHoverStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A strongly typed global mapping of hover/unhover-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [hoverStateVars] = cssVars<HoverStateVars>({ prefix: defaultHoverStatePrefix, minify: false });

// Register the hover/unhover-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(hoverStateVars.animationHovering);
animationRegistry.registerAnimation(hoverStateVars.animationUnhovering);
