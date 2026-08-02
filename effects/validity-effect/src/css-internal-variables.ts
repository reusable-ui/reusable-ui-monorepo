// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ValidityEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultValidityEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.



const validityEffectTuple = cssVars<ValidityEffectVars>({ prefix: defaultValidityEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of validity-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const validityEffectVars       = validityEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **validity effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all validity effect variables.
 * ```ts
 * validityEffectVarOptions.prefix = 'vale';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * validityEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     validSwitch,   // Resolves to: 'var(--vale-validSwitch)'
 *     invalidSwitch, // Resolves to: 'var(--vale-invalidSwitch)'
 * } = validityEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     validSwitch,   // Resolves to: 'var(--v0)'
 *     invalidSwitch, // Resolves to: 'var(--v1)'
 * } = validityEffectVars;
 * ```
 */
export const validityEffectVarOptions = validityEffectTuple[1];
