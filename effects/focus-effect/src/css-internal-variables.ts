// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type FocusEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultFocusEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    boxShadowRegistry,
}                           from '@reusable-ui/box-shadow-feature'  // A styling utility for composing a unified box shadow stack from custom and registered state packages.



const focusEffectTuple = cssVars<FocusEffectVars>({ prefix: defaultFocusEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of focus-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const focusEffectVars = focusEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **focus effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all focus effect variables.
 * ```ts
 * focusEffectVarOptions.prefix = 'foce';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * focusEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     focusBoxShadow, // Resolves to: 'var(--foce-focusBoxShadow)'
 * } = focusEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     focusBoxShadow, // Resolves to: 'var(--v0)'
 * } = focusEffectVars;
 * ```
 */
export const focusEffectVarOptions = focusEffectTuple[1];

// Register the focus box shadow globally for composing a unified box shadow stack across effect packages:
boxShadowRegistry.registerBoxShadow(focusEffectVars.focusBoxShadow);
