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
}                           from './css-types.js'



const themeVariantTuple = cssVars<ThemeVariantVars>({ prefix: defaultThemeVariantPrefix, minify: false });

/**
 * A strongly typed global mapping of theme-related CSS variables for coloring components.
 * 
 * Prefixed with `--t-` to ensure scoped and consistent naming.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const themeVariantVars       = themeVariantTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **theme variant variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all theme variant variables.
 * ```ts
 * themeVariantVarOptions.prefix = 'th';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * themeVariantVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     regularBackg, // Resolves to: 'var(--th-regularBackg)'
 *     regularForeg, // Resolves to: 'var(--th-regularForeg)'
 * } = themeVariantVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     regularBackg, // Resolves to: 'var(--v0)'
 *     regularForeg, // Resolves to: 'var(--v1)'
 * } = themeVariantVars;
 * ```
 */
export const themeVariantVarOptions = themeVariantTuple[1];
