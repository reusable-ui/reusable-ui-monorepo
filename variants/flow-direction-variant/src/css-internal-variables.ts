// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultFlowDirectionVariantPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type FlowDirectionVariantVars,
}                           from './css-types.js'



const flowDirectionVariantTuple = cssVars<FlowDirectionVariantVars>({ prefix: defaultFlowDirectionVariantPrefix, minify: false });

/**
 * A strongly typed global mapping of flow-direction-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const flowDirectionVariantVars       = flowDirectionVariantTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **flow direction variant variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all flow direction variant variables.
 * ```ts
 * flowDirectionVariantVarOptions.prefix = 'fd';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * flowDirectionVariantVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     isFlowDirectionStart, // Resolves to: 'var(--fd-isFlowDirectionStart)'
 *     isFlowDirectionEnd,   // Resolves to: 'var(--fd-isFlowDirectionEnd)'
 * } = flowDirectionVariantVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     isFlowDirectionStart, // Resolves to: 'var(--v0)'
 *     isFlowDirectionEnd,   // Resolves to: 'var(--v1)'
 * } = flowDirectionVariantVars;
 * ```
 */
export const flowDirectionVariantVarOptions = flowDirectionVariantTuple[1];
