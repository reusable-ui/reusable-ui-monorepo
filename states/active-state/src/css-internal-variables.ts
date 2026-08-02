// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ActiveStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultActiveStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



const activeStateTuple = cssVars<ActiveStateVars>({ prefix: defaultActiveStatePrefix, minify: false });

/**
 * A strongly typed global mapping of activate/deactivate-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const activeStateVars = activeStateTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **active state variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all active state variables.
 * ```ts
 * activeStateVarOptions.prefix = 'act';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * activeStateVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     activatingAnimation,   // Resolves to: 'var(--act-activatingAnimation)'
 *     deactivatingAnimation, // Resolves to: 'var(--act-deactivatingAnimation)'
 * } = activeStateVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     activatingAnimation,   // Resolves to: 'var(--v0)'
 *     deactivatingAnimation, // Resolves to: 'var(--v1)'
 * } = activeStateVars;
 * ```
 */
export const activeStateVarOptions = activeStateTuple[1];

// Register the activate/deactivate-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(activeStateVars.activatingAnimation);
animationRegistry.registerAnimation(activeStateVars.deactivatingAnimation);
