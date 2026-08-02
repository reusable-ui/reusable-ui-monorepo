// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultBorderFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type BorderFeatureVars,
}                           from './css-types.js'



const borderFeatureTuple = cssVars<BorderFeatureVars>({ prefix: defaultBorderFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of border-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const borderFeatureVars = borderFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **border feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all border feature variables.
 * ```ts
 * borderFeatureVarOptions.prefix = 'bd';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * borderFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     regularBorderCond, // Resolves to: 'var(--bd-regularBorderCond)'
 *     mildBorderCond,    // Resolves to: 'var(--bd-mildBorderCond)'
 * } = borderFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     regularBorderCond, // Resolves to: 'var(--v0)'
 *     mildBorderCond,    // Resolves to: 'var(--v1)'
 * } = borderFeatureVars;
 * ```
 */
export const borderFeatureVarOptions = borderFeatureTuple[1];
