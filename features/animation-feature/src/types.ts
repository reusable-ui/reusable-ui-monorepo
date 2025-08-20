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
     * ensuring the final `animation` property remains valid—even when no animations are active.
     */
    animation : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for styling component’s animation.
 * 
 * These options represent the component’s intended animation behavior —
 * which is appended to the final composed animation stack.
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
 * Supports dynamic registration of animation variables with priority-aware stacking.
 */
export interface CssAnimationRegistry {
    /**
     * Retrieves the list of registered animation variables.
     * 
     * Each entry is a CSS variable reference intended for use in the final animation stack.
     * The order reflects stacking priority (lower specificity appears first).
     */
    get animations(): CssCustomSimpleRef[]
    
    /**
     * Registers an animation variable with optional stacking priority.
     * 
     * @param animationVariable - A CSS variable reference representing an animation layer.
     * @param priority - Optional stacking priority; higher values override lower ones.
     * @returns - An unregister function to remove the variable.
     */
    registerAnimation(animationVariable: CssCustomSimpleRef, priority?: number): () => void
    
    /**
     * Subscribes a callback listener for animation registry changes.
     * 
     * Useful for memoizing styles, triggering recomputation, or syncing registry state.
     */
    onAnimationChange: Subscribable<CssCustomSimpleRef>
}



/**
 * Provides a CSS API for composing an animation stack from custom and registered state packages.
 */
export interface CssAnimationFeature {
    /**
     * Generates CSS rules that compose custom and registered animations into a unified stack.
     * 
     * These rules use internal pre-reset with `none` to prevent inheritance and
     * ensuring the final `animation` property remains valid—even when no animations are active.
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
