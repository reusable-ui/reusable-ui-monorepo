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
 * A list of filter-related CSS variables used for styling component’s filter.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface FilterFeatureVars {
    //#region Final resolved variables (always valid) 
    /**
     * References the final composed filter stack from custom and registered state packages.
     * Always valid via internal pre-reset declarations.
     * 
     * Includes:
     * - Custom filters (if provided)
     * - Registered filters from independent state packages
     * 
     * All registered variables are internally pre-reset with `brightness(1)` (a no-op filter) to prevent inheritance and
     * ensuring the final `filter` property remains valid—even when no filters are active.
     */
    filter : unknown
    //#endregion Final resolved variables (always valid) 
}



/**
 * Configuration options for styling component’s filter.
 * 
 * These options represent the component’s intended filter behavior —
 * which is appended to the final composed filter stack.
 */
export interface CssFilterFeatureOptions
    extends
        // Bases:
        Pick<CssKnownProps,
            | 'filter'
        >
{
    /**
     * A custom filter stack to append to the final composed output.
     * Accepts a single filter or multiple chained filters.
     */
    filter ?: CssKnownProps['filter']
}



/**
 * A registry for unifying filter layers across independent state packages.
 * 
 * Supports dynamic registration of filter variables with priority-aware stacking.
 */
export interface CssFilterRegistry {
    /**
     * Retrieves the list of registered filter variables.
     * 
     * Each entry is a CSS variable reference intended for use in the final filter stack.
     * The order reflects stacking priority (lower specificity appears first).
     */
    get filters(): CssCustomSimpleRef[]
    
    /**
     * Registers a filter variable with optional stacking priority.
     * 
     * @param filterVariable - A CSS variable reference representing a filter layer.
     * @param priority - Optional stacking priority; higher values override lower ones.
     * @returns - An unregister function to remove the variable.
     */
    registerFilter(filterVariable: CssCustomSimpleRef, priority?: number): () => void
    
    /**
     * Subscribes a callback listener for filter registry changes.
     * 
     * Useful for memoizing styles, triggering recomputation, or syncing registry state.
     */
    onFilterChange: Subscribable<CssCustomSimpleRef>
}



/**
 * Provides a CSS API for composing a unified filter stack from custom and registered state packages.
 */
export interface CssFilterFeature {
    /**
     * Generates CSS rules that compose custom and registered filters into a unified stack.
     * 
     * These rules use internal pre-reset with `brightness(1)` (a no-op filter) to prevent inheritance and
     * ensuring the final `filter` property remains valid—even when no filters are active.
     */
    filterFeatureRule : Lazy<CssRule>
    
    /**
     * Exposes filter-related CSS variables for styling component’s filter.
     * 
     * Includes:
     * - `filter`: Final composed filter stack from custom and registered state packages.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    filterFeatureVars : CssVars<FilterFeatureVars>
}
