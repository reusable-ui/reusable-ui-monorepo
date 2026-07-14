// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DragStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultDragStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A strongly typed global mapping of drag/drop-related CSS variables for use in conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [dragStateVars] = cssVars<DragStateVars>({ prefix: defaultDragStatePrefix, minify: false });

// Register the drag/drop-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(dragStateVars.draggingAnimation);
animationRegistry.registerAnimation(dragStateVars.droppingAnimation);
