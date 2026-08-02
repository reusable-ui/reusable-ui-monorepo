// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ExcitedStateVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultExcitedStatePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



const excitedStateTuple = cssVars<ExcitedStateVars>({ prefix: defaultExcitedStatePrefix, minify: false });

/**
 * A strongly typed global mapping of excitement-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const excitedStateVars       = excitedStateTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **excited state variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all excited state variables.
 * ```ts
 * excitedStateVarOptions.prefix = 'exc';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * excitedStateVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     excitingAnimation, // Resolves to: 'var(--exc-excitingAnimation)'
 *     excitedFactor,     // Resolves to: 'var(--exc-excitedFactor)'
 * } = excitedStateVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     excitingAnimation, // Resolves to: 'var(--v0)'
 *     excitedFactor,     // Resolves to: 'var(--v1)'
 * } = excitedStateVars;
 * ```
 */
export const excitedStateVarOptions = excitedStateTuple[1];

// Register the excitement-related animation globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(excitedStateVars.excitingAnimation);
