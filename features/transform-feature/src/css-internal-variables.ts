// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultTransformFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type TransformFeatureVars,
}                           from './css-types.js'



const transformFeatureTuple = cssVars<TransformFeatureVars>({ prefix: defaultTransformFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of transform-related CSS variables used for composing transform stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const transformFeatureVars       = transformFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **transform feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all transform feature variables.
 * ```ts
 * transformFeatureVarOptions.prefix = 'tr';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * transformFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     transform, // Resolves to: 'var(--tr-transform)'
 * } = transformFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     transform, // Resolves to: 'var(--v0)'
 * } = transformFeatureVars;
 * ```
 */
export const transformFeatureVarOptions = transformFeatureTuple[1];
