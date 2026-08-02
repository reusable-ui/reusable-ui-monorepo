// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ReadOnlyStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultReadOnlyStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



const readOnlyStateTuple = cssVars<ReadOnlyStateVars>({ prefix: defaultReadOnlyStatePrefix, minify: false });

/**
 * A strongly typed global mapping of editable/read-only-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const readOnlyStateVars       = readOnlyStateTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **read only state variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all read only state variables.
 * ```ts
 * readOnlyStateVarOptions.prefix = 'ro';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * readOnlyStateVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     thawingAnimation,  // Resolves to: 'var(--ro-thawingAnimation)'
 *     freezingAnimation, // Resolves to: 'var(--ro-freezingAnimation)'
 * } = readOnlyStateVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     thawingAnimation,  // Resolves to: 'var(--v0)'
 *     freezingAnimation, // Resolves to: 'var(--v1)'
 * } = readOnlyStateVars;
 * ```
 */
export const readOnlyStateVarOptions = readOnlyStateTuple[1];



// Side Effects:

// Register the editable/read-only-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(readOnlyStateVars.thawingAnimation);
animationRegistry.registerAnimation(readOnlyStateVars.freezingAnimation);
