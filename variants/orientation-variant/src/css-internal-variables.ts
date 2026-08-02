// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultOrientationVariantPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type OrientationVariantVars,
}                           from './css-types.js'



const orientationVariantTuple = cssVars<OrientationVariantVars>({ prefix: defaultOrientationVariantPrefix, minify: false });

/**
 * A strongly typed global mapping of orientation-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const orientationVariantVars       = orientationVariantTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **orientation variant variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all orientation variant variables.
 * ```ts
 * orientationVariantVarOptions.prefix = 'ot';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * orientationVariantVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     isOrientationInline, // Resolves to: 'var(--ot-isOrientationInline)'
 *     isOrientationBlock,  // Resolves to: 'var(--ot-isOrientationBlock)'
 * } = orientationVariantVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     isOrientationInline, // Resolves to: 'var(--v0)'
 *     isOrientationBlock,  // Resolves to: 'var(--v1)'
 * } = orientationVariantVars;
 * ```
 */
export const orientationVariantVarOptions = orientationVariantTuple[1];
