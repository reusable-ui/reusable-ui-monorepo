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
 * A list of transform-related CSS variables used for styling component’s transform.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface TransformFeatureVars {
    //#region Final resolved variables (always valid) 
    /**
     * References the final composed transform stack from custom and registered state packages.
     * Always valid via internal pre-reset declarations.
     * 
     * Includes:
     * - Custom transforms (if provided)
     * - Registered transforms from independent state packages
     * 
     * All registered variables are internally pre-reset with `translate(0)` (a no-op transform) to prevent inheritance and
     * ensuring the final `transform` property remains valid—even when no transforms are active.
     */
    transform : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for styling component’s transform.
 * 
 * These options represent the component’s intended transform behavior —
 * which is appended to the final composed transform stack.
 */
export interface CssTransformFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'transform'
        >
{
    /**
     * A custom transform stack to append to the final composed output.
     * Accepts a single transform or multiple chained transforms.
     */
    transform ?: CssKnownProps['transform']
}



/**
 * A registry for unifying transform layers across independent state packages.
 * 
 * Supports dynamic registration of transform variables with priority-aware stacking.
 */
export interface CssTransformRegistry {
    /**
     * Retrieves the list of registered transform variables.
     * 
     * Each entry is a CSS variable reference intended for use in the final transform stack.
     * The order reflects stacking priority (lower specificity appears first).
     */
    get transforms(): CssCustomSimpleRef[]
    
    /**
     * Registers a transform variable with optional stacking priority.
     * 
     * @param transformVariable - A CSS variable reference representing a transform layer.
     * @param priority - Optional stacking priority; higher values override lower ones.
     * @returns - An unregister function to remove the variable.
     */
    registerTransform(transformVariable: CssCustomSimpleRef, priority?: number): () => void
    
    /**
     * Subscribes a callback listener for transform registry changes.
     * 
     * Useful for memoizing styles, triggering recomputation, or syncing registry state.
     */
    onTransformChange: Subscribable<CssCustomSimpleRef>
}



/**
 * Provides a CSS API for composing a unified transform stack from custom and registered state packages.
 */
export interface CssTransformFeature {
    /**
     * Generates CSS rules that compose custom and registered transforms into a unified stack.
     * 
     * These rules use internal pre-reset with `translate(0)` (a no-op transform) to prevent inheritance and
     * ensuring the final `transform` property remains valid—even when no transforms are active.
     */
    transformFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes transform-related CSS variables for styling component’s transform.
     * 
     * Includes:
     * - `transform`: Final composed transform stack from custom and registered state packages.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    transformFeatureVars : CssVars<TransformFeatureVars>
}
