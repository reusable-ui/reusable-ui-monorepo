// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DisabledEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultDisabledEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.



const disabledEffectTuple = cssVars<DisabledEffectVars>({ prefix: defaultDisabledEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of disabled-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const disabledEffectVars       = disabledEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **disabled effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all disabled effect variables.
 * ```ts
 * disabledEffectVarOptions.prefix = 'dise';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * disabledEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     disabledFilter, // Resolves to: 'var(--dise-disabledFilter)'
 *     disabledCursor, // Resolves to: 'var(--dise-disabledCursor)'
 * } = disabledEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     disabledFilter, // Resolves to: 'var(--v0)'
 *     disabledCursor, // Resolves to: 'var(--v1)'
 * } = disabledEffectVars;
 * ```
 */
export const disabledEffectVarOptions = disabledEffectTuple[1];

// Register the disabled filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(disabledEffectVars.disabledFilter);
