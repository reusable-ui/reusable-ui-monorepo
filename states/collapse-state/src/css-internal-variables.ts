// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CollapseStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultCollapseStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



const collapseStateTuple = cssVars<CollapseStateVars>({ prefix: defaultCollapseStatePrefix, minify: false });

/**
 * A strongly typed global mapping of expand/collapse-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const collapseStateVars       = collapseStateTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **collapse state variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all collapse state variables.
 * ```ts
 * collapseStateVarOptions.prefix = 'col';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * collapseStateVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     expandingAnimation,  // Resolves to: 'var(--col-expandingAnimation)'
 *     collapsingAnimation, // Resolves to: 'var(--col-collapsingAnimation)'
 * } = collapseStateVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     expandingAnimation,  // Resolves to: 'var(--v0)'
 *     collapsingAnimation, // Resolves to: 'var(--v1)'
 * } = collapseStateVars;
 * ```
 */
export const collapseStateVarOptions = collapseStateTuple[1];

// Register the expand/collapse-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(collapseStateVars.expandingAnimation);
animationRegistry.registerAnimation(collapseStateVars.collapsingAnimation);
