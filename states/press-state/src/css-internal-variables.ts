// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type PressStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultPressStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



const pressStateTuple = cssVars<PressStateVars>({ prefix: defaultPressStatePrefix, minify: false });

/**
 * A strongly typed global mapping of press/release-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const pressStateVars = pressStateTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **press state variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all press state variables.
 * ```ts
 * pressStateVarOptions.prefix = 'prss';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * pressStateVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     pressingAnimation,  // Resolves to: 'var(--prss-pressingAnimation)'
 *     releasingAnimation, // Resolves to: 'var(--prss-releasingAnimation)'
 * } = pressStateVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     pressingAnimation,  // Resolves to: 'var(--v0)'
 *     releasingAnimation, // Resolves to: 'var(--v1)'
 * } = pressStateVars;
 * ```
 */
export const pressStateVarOptions = pressStateTuple[1];

// Register the press/release-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(pressStateVars.pressingAnimation);
animationRegistry.registerAnimation(pressStateVars.releasingAnimation);
