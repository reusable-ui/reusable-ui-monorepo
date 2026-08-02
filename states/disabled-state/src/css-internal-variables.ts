// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DisabledStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultDisabledStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



const disabledStateTuple = cssVars<DisabledStateVars>({ prefix: defaultDisabledStatePrefix, minify: false });

/**
 * A strongly typed global mapping of enabled/disabled-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const disabledStateVars = disabledStateTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **disabled state variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all disabled state variables.
 * ```ts
 * disabledStateVarOptions.prefix = 'dis';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * disabledStateVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     enablingAnimation,  // Resolves to: 'var(--dis-enablingAnimation)'
 *     disablingAnimation, // Resolves to: 'var(--dis-disablingAnimation)'
 * } = disabledStateVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     enablingAnimation,  // Resolves to: 'var(--v0)'
 *     disablingAnimation, // Resolves to: 'var(--v1)'
 * } = disabledStateVars;
 * ```
 */
export const disabledStateVarOptions = disabledStateTuple[1];

// Register the enabled/disabled-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(disabledStateVars.enablingAnimation);
animationRegistry.registerAnimation(disabledStateVars.disablingAnimation);
