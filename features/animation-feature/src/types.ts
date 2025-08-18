// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssCustomSimpleRef,
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Other libs:
import {
    type Subscribable,
}                           from 'rxjs'



/**
 * A list of animation-related CSS variables used for styling component’s animation.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface AnimationFeatureVars {
    //#region Final resolved variables (always valid) 
    /**
     * References the final composed animation stack from custom and registered state packages.
     * Always valid via internal pre-reset declarations.
     * 
     * Includes:
     * - Custom animations (if provided)
     * - Registered animations from independent state packages
     * 
     * All registered variables are internally pre-reset with `none` to prevent inheritance and
     * ensuring the final `animation` property is always valid—even when no animations are active.
     */
    animation : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for styling component’s animation.
 * 
 * These options represent the component’s intended animation behavior —
 * appended to the final composed animation stack.
 */
export interface CssAnimationFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'animation'
        >
{
    /**
     * A custom animation stack to append to the final composed output.
     * Accepts a single animation or multiple layered animations.
     */
    animation ?: CssKnownProps['animation']
}



/**
 * A registry for unifying animation layers across independent state packages.
 * 
 * Enables dynamic registration of animation variables and guarantees
 * safe stacking via internal pre-reset with `none`.
 * 
 * Prevents inherited animations from leaking into components
 * unless explicitly redefined.
 */
export interface CssAnimationRegistry {
    /**
     * Returns the list of registered animation variables.
     * 
     * Each entry is a CSS variable reference intended for use in the final animation stack.
     * The order reflects stacking priority (lowest specificity first).
     */
    get animations(): CssCustomSimpleRef[]
    
    /**
     * Registers a new animation variable into the stack and returns an unregister function.
     * 
     * @param animation - A CSS variable reference representing an animation layer.
     */
    registerAnimation(animation: CssCustomSimpleRef): () => void
    
    /**
     * Subscribes a callback listener for animation registry changes.
     * 
     * Useful for memoizing styles or triggering recomputation.
     */
    onAnimationChange: Subscribable<CssCustomSimpleRef>
}



/**
 * Provides a CSS API for composing animation stack from custom and registered state packages.
 */
export interface CssAnimationFeature {
    /**
     * Generates CSS rules that compose custom and registered animations into a single stack.
     * 
     * These rules use internal pre-reset with `none` to prevent inheritance and
     * ensuring the final `animation` property is always valid—even when no animations are active.
     */
    animationFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes animation-related CSS variables for styling component’s animation.
     * 
     * Includes:
     * - `animation`: Final composed animation stack from custom and registered state packages.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    animationFeatureVars : CssVars<AnimationFeatureVars>
}
