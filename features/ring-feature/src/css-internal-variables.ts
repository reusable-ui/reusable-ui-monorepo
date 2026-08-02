// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultRingFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type RingFeatureVars,
}                           from './css-types.js'



const ringFeatureTuple = cssVars<RingFeatureVars>({ prefix: defaultRingFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of ring-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const ringFeatureVars       = ringFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **ring feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all ring feature variables.
 * ```ts
 * ringFeatureVarOptions.prefix = 'rg';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * ringFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     regularRingCond,  // Resolves to: 'var(--rg-regularRingCond)'
 *     ringVariantColor, // Resolves to: 'var(--rg-ringVariantColor)'
 * } = ringFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     regularRingCond,  // Resolves to: 'var(--v0)'
 *     ringVariantColor, // Resolves to: 'var(--v1)'
 * } = ringFeatureVars;
 * ```
 */
export const ringFeatureVarOptions = ringFeatureTuple[1];
