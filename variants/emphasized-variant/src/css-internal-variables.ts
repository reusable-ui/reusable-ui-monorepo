// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultEmphasizedVariantPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type EmphasizedVariantVars,
}                           from './css-types.js'



const emphasizedVariantTuple = cssVars<EmphasizedVariantVars>({ prefix: defaultEmphasizedVariantPrefix, minify: false });

/**
 * A strongly typed global mapping of emphasized-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const emphasizedVariantVars = emphasizedVariantTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **emphasized variant variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all emphasized variant variables.
 * ```ts
 * emphasizedVariantVarOptions.prefix = 'em';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * emphasizedVariantVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     isEmphasized,  // Resolves to: 'var(--em-isEmphasized)'
 *     notEmphasized, // Resolves to: 'var(--em-notEmphasized)'
 * } = emphasizedVariantVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     isEmphasized,  // Resolves to: 'var(--v0)'
 *     notEmphasized, // Resolves to: 'var(--v1)'
 * } = emphasizedVariantVars;
 * ```
 */
export const emphasizedVariantVarOptions = emphasizedVariantTuple[1];
