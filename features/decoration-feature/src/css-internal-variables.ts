// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultDecorationFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type DecorationFeatureVars,
}                           from './css-types.js'



const decorationFeatureTuple = cssVars<DecorationFeatureVars>({ prefix: defaultDecorationFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of decoration-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const decorationFeatureVars       = decorationFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **decoration feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all decoration feature variables.
 * ```ts
 * decorationFeatureVarOptions.prefix = 'dn';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * decorationFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     regularDecorCond, // Resolves to: 'var(--dn-regularDecorCond)'
 *     mildDecorCond,    // Resolves to: 'var(--dn-mildDecorCond)'
 * } = decorationFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     regularDecorCond, // Resolves to: 'var(--v0)'
 *     mildDecorCond,    // Resolves to: 'var(--v1)'
 * } = decorationFeatureVars;
 * ```
 */
export const decorationFeatureVarOptions = decorationFeatureTuple[1];
