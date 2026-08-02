// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ValidityStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultValidityStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



const validityStateTuple = cssVars<ValidityStateVars>({ prefix: defaultValidityStatePrefix, minify: false });

/**
 * A strongly typed global mapping of validity-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const validityStateVars       = validityStateTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **validity state variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all validity state variables.
 * ```ts
 * validityStateVarOptions.prefix = 'val';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * validityStateVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     validatingAnimation,   // Resolves to: 'var(--val-validatingAnimation)'
 *     invalidatingAnimation, // Resolves to: 'var(--val-invalidatingAnimation)'
 * } = validityStateVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     validatingAnimation,   // Resolves to: 'var(--v0)'
 *     invalidatingAnimation, // Resolves to: 'var(--v1)'
 * } = validityStateVars;
 * ```
 */
export const validityStateVarOptions = validityStateTuple[1];



// Side Effects:

// Register the validity-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(validityStateVars.validatingAnimation);
animationRegistry.registerAnimation(validityStateVars.invalidatingAnimation);
animationRegistry.registerAnimation(validityStateVars.unvalidatingAnimation);
