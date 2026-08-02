// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultBackgroundFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type BackgroundFeatureVars,
}                           from './css-types.js'



const backgroundFeatureTuple = cssVars<BackgroundFeatureVars>({ prefix: defaultBackgroundFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of background-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const backgroundFeatureVars = backgroundFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **background feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all background feature variables.
 * ```ts
 * backgroundFeatureVarOptions.prefix = 'bg';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * backgroundFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     backgEmphasizedCond, // Resolves to: 'var(--bg-backgEmphasizedCond)'
 *     backgCond,           // Resolves to: 'var(--bg-backgCond)'
 * } = backgroundFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     backgEmphasizedCond, // Resolves to: 'var(--v0)'
 *     backgCond,           // Resolves to: 'var(--v1)'
 * } = backgroundFeatureVars;
 * ```
 */
export const backgroundFeatureVarOptions = backgroundFeatureTuple[1];
