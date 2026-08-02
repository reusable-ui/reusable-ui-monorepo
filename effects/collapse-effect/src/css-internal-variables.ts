// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CollapseEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultCollapseEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



const collapseEffectTuple = cssVars<CollapseEffectVars>({ prefix: defaultCollapseEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of collapse-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const collapseEffectVars = collapseEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **collapse effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all collapse effect variables.
 * ```ts
 * collapseEffectVarOptions.prefix = 'cole';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * collapseEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     measuredInlineSize, // Resolves to: 'var(--cole-measuredInlineSize)'
 *     measuredBlockSize,  // Resolves to: 'var(--cole-measuredBlockSize)'
 * } = collapseEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     measuredInlineSize, // Resolves to: 'var(--v0)'
 *     measuredBlockSize,  // Resolves to: 'var(--v1)'
 * } = collapseEffectVars;
 * ```
 */
export const collapseEffectVarOptions = collapseEffectTuple[1];

// Register the overshoot transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(collapseEffectVars.overshootTransform);
