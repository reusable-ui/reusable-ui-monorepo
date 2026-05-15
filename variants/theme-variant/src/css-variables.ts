// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultThemeVariantPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type ThemeVariantVars,
}                           from './types.js'



/**
 * A strongly typed global mapping of theme-related CSS variables for coloring components.
 * 
 * Prefixed with `--t-` to ensure scoped and consistent naming.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [themeVariantVars] = cssVars<ThemeVariantVars>({ prefix: defaultThemeVariantPrefix, minify: false });
