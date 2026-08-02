// Cssfn:
import {
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui defaults:
import {
    defaultAnimationFeaturePrefix,
}                           from '@reusable-ui/css-prefix-default'  // A centralized default CSS variable prefixes across the Reusable-UI core system, ensuring unique, predictable, and consistent prefixes.

// Types:
import {
    type AnimationFeatureVars,
}                           from './css-types.js'



const animationFeatureTuple = cssVars<AnimationFeatureVars>({ prefix: defaultAnimationFeaturePrefix, minify: false });

/**
 * A strongly typed global mapping of animation-related CSS variables used for composing animation stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const animationFeatureVars       = animationFeatureTuple[0];

/**
 * A `LiveCssVarsOptions` object manages configuration for the **animation feature variables**.
 * It controls prefixes and minification.
 * 
 * - **Prefix Management:**  
 * Defines the prefix used for all animation feature variables.
 * ```ts
 * animationFeatureVarOptions.prefix = 'an';
 * ```
 * 
 * - **Minification Control:**  
 * Replaces the original variable names with unique shorter names.
 * ```ts
 * animationFeatureVarOptions.minify = true;
 * ```
 * 
 * #### **Rendered CSS Variables Example**
 * 
 * Example with `minify = false`:
 * ```ts
 * const {
 *     animation, // Resolves to: 'var(--an-animation)'
 * } = animationFeatureVars;
 * ```
 * 
 * Example with `minify = true`:
 * ```ts
 * const {
 *     animation, // Resolves to: 'var(--v0)'
 * } = animationFeatureVars;
 * ```
 */
export const animationFeatureVarOptions = animationFeatureTuple[1];
