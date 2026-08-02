// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultStrippedVariantPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type StrippedVariantVars,
}                           from './css-types.js'



const strippedVariantTuple = cssVars<StrippedVariantVars<true | string>>({ prefix: defaultStrippedVariantPrefix, minify: false });

/**
 * A strongly typed global mapping of stripped-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const strippedVariantVars       = strippedVariantTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **stripped variant variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all stripped variant variables.
 * ```ts
 * strippedVariantVarOptions.prefix = 'st';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * strippedVariantVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     isStripped,  // Resolves to: 'var(--st-isStripped)'
 *     notStripped, // Resolves to: 'var(--st-notStripped)'
 * } = strippedVariantVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     isStripped,  // Resolves to: 'var(--v0)'
 *     notStripped, // Resolves to: 'var(--v1)'
 * } = strippedVariantVars;
 * ```
 */
export const strippedVariantVarOptions = strippedVariantTuple[1];
