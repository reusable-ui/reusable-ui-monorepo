// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ActiveEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultActiveEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.



const activeEffectTuple = cssVars<ActiveEffectVars>({ prefix: defaultActiveEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of active-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const activeEffectVars       = activeEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **active effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all active effect variables.
 * ```ts
 * activeEffectVarOptions.prefix = 'acte';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * activeEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     bumpFactorCond,      // Resolves to: 'var(--acte-bumpFactorCond)'
 *     effectiveFactorCond, // Resolves to: 'var(--acte-effectiveFactorCond)'
 * } = activeEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     bumpFactorCond,      // Resolves to: 'var(--v0)'
 *     effectiveFactorCond, // Resolves to: 'var(--v1)'
 * } = activeEffectVars;
 * ```
 */
export const activeEffectVarOptions = activeEffectTuple[1];



// Side Effects:

// Register the active filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(activeEffectVars.activeFilter);
