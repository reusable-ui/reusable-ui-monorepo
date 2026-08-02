// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultPaddingFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type PaddingFeatureVars,
}                           from './css-types.js'



const paddingFeatureTuple = cssVars<PaddingFeatureVars>({ prefix: defaultPaddingFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of padding-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const paddingFeatureVars       = paddingFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **padding feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all padding feature variables.
 * ```ts
 * paddingFeatureVarOptions.prefix = 'pd';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * paddingFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     paddingStrippedCond, // Resolves to: 'var(--pd-paddingStrippedCond)'
 *     paddingInlineStart,  // Resolves to: 'var(--pd-paddingInlineStart)'
 * } = paddingFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     paddingStrippedCond, // Resolves to: 'var(--v0)'
 *     paddingInlineStart,  // Resolves to: 'var(--v1)'
 * } = paddingFeatureVars;
 * ```
 */
export const paddingFeatureVarOptions = paddingFeatureTuple[1];
