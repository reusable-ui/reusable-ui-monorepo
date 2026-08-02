// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ExcitedEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultExcitedEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



const excitedEffectTuple = cssVars<ExcitedEffectVars>({ prefix: defaultExcitedEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of excitement-related CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const excitedEffectVars = excitedEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **excited effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all excited effect variables.
 * ```ts
 * excitedEffectVarOptions.prefix = 'exce';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * excitedEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     excitedFilter,    // Resolves to: 'var(--exce-excitedFilter)'
 *     excitedTransform, // Resolves to: 'var(--exce-excitedTransform)'
 * } = excitedEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     excitedFilter,    // Resolves to: 'var(--v0)'
 *     excitedTransform, // Resolves to: 'var(--v1)'
 * } = excitedEffectVars;
 * ```
 */
export const excitedEffectVarOptions = excitedEffectTuple[1];

// Register the excitement-related filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(excitedEffectVars.excitedFilter);

// Register the excitement-related transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(excitedEffectVars.excitedTransform);
