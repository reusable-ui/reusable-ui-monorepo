// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ViewEffectVars,
}                           from './css-types.js'

// Reusable-ui defaults:
import {
    defaultViewEffectPrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Reusable-ui features:
import {
    transformRegistry,
}                           from '@reusable-ui/transform-feature'   // A styling utility for composing a unified transform stack from custom and registered state packages.



const viewEffectTuple = cssVars<ViewEffectVars>({ prefix: defaultViewEffectPrefix, minify: false });

/**
 * A strongly typed global mapping of view-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const viewEffectVars       = viewEffectTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **view effect variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all view effect variables.
 * ```ts
 * viewEffectVarOptions.prefix = 'viewe';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * viewEffectVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     writingDirectionFactor, // Resolves to: 'var(--viewe-writingDirectionFactor)'
 *     writingModeFactor,      // Resolves to: 'var(--viewe-writingModeFactor)'
 * } = viewEffectVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     writingDirectionFactor, // Resolves to: 'var(--v0)'
 *     writingModeFactor,      // Resolves to: 'var(--v1)'
 * } = viewEffectVars;
 * ```
 */
export const viewEffectVarOptions = viewEffectTuple[1];

// Register the view transform globally for composing a unified transform stack across effect packages:
transformRegistry.registerTransform(viewEffectVars.viewTransform);
