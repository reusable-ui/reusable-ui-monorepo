// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultBoxShadowFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type BoxShadowFeatureVars,
}                           from './css-types.js'



const boxShadowFeatureTuple = cssVars<BoxShadowFeatureVars>({ prefix: defaultBoxShadowFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of box-shadow-related CSS variables used for composing box shadow stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const boxShadowFeatureVars       = boxShadowFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **box shadow feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all box shadow feature variables.
 * ```ts
 * boxShadowFeatureVarOptions.prefix = 'bs';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * boxShadowFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     boxShadow, // Resolves to: 'var(--bs-boxShadow)'
 * } = boxShadowFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     boxShadow, // Resolves to: 'var(--v0)'
 * } = boxShadowFeatureVars;
 * ```
 */
export const boxShadowFeatureVarOptions = boxShadowFeatureTuple[1];
