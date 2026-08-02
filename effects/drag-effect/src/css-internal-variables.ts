// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type DragEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultDragEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



const dragEffectTuple = cssVars<DragEffectVars>({ prefix: defaultDragEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of drag-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const dragEffectVars = dragEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **drag effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all drag effect variables.
 * ```ts
 * dragEffectVarOptions.prefix = 'drage';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * dragEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     dragFilter,    // Resolves to: 'var(--drage-dragFilter)'
 *     dragTransform, // Resolves to: 'var(--drage-dragTransform)'
 * } = dragEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     dragFilter,    // Resolves to: 'var(--v0)'
 *     dragTransform, // Resolves to: 'var(--v1)'
 * } = dragEffectVars;
 * ```
 */
export const dragEffectVarOptions = dragEffectTuple[1];

// Register the drag filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(dragEffectVars.dragFilter);

// Register the drag transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(dragEffectVars.dragTransform);
