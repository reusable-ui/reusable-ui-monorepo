// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultStackedLayoutPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type StackedLayoutVars,
}                           from './css-types.js'



const stackedLayoutTuple = cssVars<StackedLayoutVars>({ prefix: defaultStackedLayoutPrefix, minify: false });

/**
 * A strongly typed global mapping of stacked-layout CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const stackedLayoutVars = stackedLayoutTuple[0];
