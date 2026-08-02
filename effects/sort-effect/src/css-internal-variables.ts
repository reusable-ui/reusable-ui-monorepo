// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type SortEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultSortEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



const sortEffectTuple = cssVars<SortEffectVars>({ prefix: defaultSortEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of sorting effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const sortEffectVars       = sortEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **sort effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all sort effect variables.
 * ```ts
 * sortEffectVarOptions.prefix = 'sorte';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * sortEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     sortTransform, // Resolves to: 'var(--sorte-sortTransform)'
 * } = sortEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     sortTransform, // Resolves to: 'var(--v0)'
 * } = sortEffectVars;
 * ```
 */
export const sortEffectVarOptions = sortEffectTuple[1];



// Side Effects:

// Register the sort transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(sortEffectVars.sortTransform);
