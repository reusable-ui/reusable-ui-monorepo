// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultFilterFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type FilterFeatureVars,
}                           from './css-types.js'



const filterFeatureTuple = cssVars<FilterFeatureVars>({ prefix: defaultFilterFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of filter-related CSS variables used for composing filter stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const filterFeatureVars       = filterFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **filter feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all filter feature variables.
 * ```ts
 * filterFeatureVarOptions.prefix = 'fi';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * filterFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     filter, // Resolves to: 'var(--fi-filter)'
 * } = filterFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     filter, // Resolves to: 'var(--v0)'
 * } = filterFeatureVars;
 * ```
 */
export const filterFeatureVarOptions = filterFeatureTuple[1];
