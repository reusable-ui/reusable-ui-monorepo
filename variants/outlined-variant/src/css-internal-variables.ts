// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultOutlinedVariantPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type OutlinedVariantVars,
}                           from './css-types.js'



const outlinedVariantTuple = cssVars<OutlinedVariantVars>({ prefix: defaultOutlinedVariantPrefix, minify: false });

/**
 * A strongly typed global mapping of outlined-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const outlinedVariantVars = outlinedVariantTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **outlined variant variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all outlined variant variables.
 * ```ts
 * outlinedVariantVarOptions.prefix = 'ou';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * outlinedVariantVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     isOutlined,  // Resolves to: 'var(--ou-isOutlined)'
 *     notOutlined, // Resolves to: 'var(--ou-notOutlined)'
 * } = outlinedVariantVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     isOutlined,  // Resolves to: 'var(--v0)'
 *     notOutlined, // Resolves to: 'var(--v1)'
 * } = outlinedVariantVars;
 * ```
 */
export const outlinedVariantVarOptions = outlinedVariantTuple[1];
