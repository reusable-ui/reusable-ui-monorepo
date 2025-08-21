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
 * A list of box-shadow-related CSS variables used for styling component’s box shadow.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface BoxShadowFeatureVars {
    //#region Final resolved variables (always valid) 
    /**
     * References the final composed box shadow stack from custom and registered state packages.
     * Always valid via internal pre-reset declarations.
     * 
     * Includes:
     * - Custom box shadows (if provided)
     * - Registered box shadows from independent state packages
     * 
     * All registered variables are internally pre-reset with `transparent 0 0` (a no-op box shadow) to prevent inheritance and
     * ensuring the final `boxShadow` property remains valid—even when no box shadows are active.
     */
    boxShadow : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for styling component’s box shadow.
 * 
 * These options represent the component’s intended box shadow behavior —
 * which is appended to the final composed box shadow stack.
 */
export interface CssBoxShadowFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'boxShadow'
        >
{
    /**
     * A custom box shadow stack to append to the final composed output.
     * Accepts a single box shadow or multiple layered box shadows.
     */
    boxShadow ?: CssKnownProps['boxShadow']
}



/**
 * A registry for unifying box shadow layers across independent state packages.
 * 
 * Supports dynamic registration of box shadow variables with priority-aware stacking.
 */
export interface CssBoxShadowRegistry {
    /**
     * Retrieves the list of registered box shadow variables.
     * 
     * Each entry is a CSS variable reference intended for use in the final box shadow stack.
     * The order reflects stacking priority (lower specificity appears first).
     */
    get boxShadows(): CssCustomSimpleRef[]
    
    /**
     * Registers a box shadow variable with optional stacking priority.
     * 
     * @param boxShadowVariable - A CSS variable reference representing a box shadow layer.
     * @param priority - Optional stacking priority; higher values override lower ones.
     * @returns - An unregister function to remove the variable.
     */
    registerBoxShadow(boxShadowVariable: CssCustomSimpleRef, priority?: number): () => void
    
    /**
     * Subscribes a callback listener for box shadow registry changes.
     * 
     * Useful for memoizing styles, triggering recomputation, or syncing registry state.
     */
    onBoxShadowChange: Subscribable<CssCustomSimpleRef>
}



/**
 * Provides a CSS API for composing a unified box shadow stack from custom and registered state packages.
 */
export interface CssBoxShadowFeature {
    /**
     * Generates CSS rules that compose custom and registered box shadows into a unified stack.
     * 
     * These rules use internal pre-reset with `transparent 0 0` (a no-op box shadow) to prevent inheritance and
     * ensuring the final `boxShadow` property remains valid—even when no box shadows are active.
     */
    boxShadowFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes box-shadow-related CSS variables for styling component’s box shadow.
     * 
     * Includes:
     * - `boxShadow`: Final composed box shadow stack from custom and registered state packages.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    boxShadowFeatureVars : CssVars<BoxShadowFeatureVars>
}
