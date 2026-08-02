// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultForegroundFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type ForegroundFeatureVars,
}                           from './css-types.js'



const foregroundFeatureTuple = cssVars<ForegroundFeatureVars>({ prefix: defaultForegroundFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of foreground-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const foregroundFeatureVars       = foregroundFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **foreground feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all foreground feature variables.
 * ```ts
 * foregroundFeatureVarOptions.prefix = 'fg';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * foregroundFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     regularForegCond, // Resolves to: 'var(--fg-regularForegCond)'
 *     mildForegCond,    // Resolves to: 'var(--fg-mildForegCond)'
 * } = foregroundFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     regularForegCond, // Resolves to: 'var(--v0)'
 *     mildForegCond,    // Resolves to: 'var(--v1)'
 * } = foregroundFeatureVars;
 * ```
 */
export const foregroundFeatureVarOptions = foregroundFeatureTuple[1];
