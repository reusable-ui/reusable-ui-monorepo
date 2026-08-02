// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type HoverEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultHoverEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.



const hoverEffectTuple = cssVars<HoverEffectVars>({ prefix: defaultHoverEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of hover-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const hoverEffectVars       = hoverEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **hover effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all hover effect variables.
 * ```ts
 * hoverEffectVarOptions.prefix = 'hove';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * hoverEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     hoverFilter,         // Resolves to: 'var(--hove-hoverFilter)'
 *     hoverTextDecoration, // Resolves to: 'var(--hove-hoverTextDecoration)'
 * } = hoverEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     hoverFilter,         // Resolves to: 'var(--v0)'
 *     hoverTextDecoration, // Resolves to: 'var(--v1)'
 * } = hoverEffectVars;
 * ```
 */
export const hoverEffectVarOptions = hoverEffectTuple[1];



// Side Effects:

// Register the hover filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(hoverEffectVars.hoverFilter);
