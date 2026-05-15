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
}                           from './types.js'



/**
 * A strongly typed global mapping of animation-related CSS variables used for composing animation stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
export const [animationFeatureVars] = cssVars<AnimationFeatureVars>({ prefix: defaultAnimationFeaturePrefix, minify: false });
