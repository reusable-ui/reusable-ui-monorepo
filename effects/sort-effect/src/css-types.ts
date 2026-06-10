// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A list of CSS variables used for sorting-effect styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface SortEffectVars {
    /**
     * References the composed transform applied while the component is in a sorting transition.
     * 
     * - Becomes `unset` when the component is idle (not sorting).
     * - Typically not consumed directly — instead use:
     *   `const { transformFeatureVars: { transform } } = usingTransformFeature()`
     */
    sortTransform : unknown
}



/**
 * Configuration options for customizing sorting effects.
 * 
 * Currently no options are available, reserved for future extension.
 */
export interface CssSortEffectOptions {
    /* No options yet. */
}



/**
 * Provides a CSS API for applying sorting effects that animate items from their previous positions into their new sorted order,
 * making components **visually rearranged** during sorting.
 */
export interface CssSortEffect {
    /**
     * Attaches CSS rules for sorting effects that animate items from their previous positions into their new sorted order,
     * making components **visually rearranged** during sorting.
     * 
     * Exposes strongly typed CSS variables for transitional effects.
     * 
     * Behavior:
     * - factor = 1 → full unsorted illusion (items offset back to their original unsorted positions).
     * - factor = 0 → fully sorted baseline (items settled into their new sorted positions).
     * - Between 1 and 0 → smooth interpolation between unsorted and sorted.
     * 
     * Smoothly transitions between unsorted and sorted states
     * by gradually moving each item from its original unsorted position toward its new sorted order.
     */
    sortEffectRule : Lazy<CssRule>
    
    /**
     * Exposes sorting effect CSS variables for transitional effects.
     * 
     * Includes:
     * - `sortTransform` : Positional transform interpolation during sorting transitions.
     * 
     * ⚠️ **Caution**: These variables are invalid when the component is idle (not sorting).
     * If used incorrectly, they can invalidate CSS declarations.
     * Always wrap them with `switchOf(...)` for safe fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    sortEffectVars : CssVars<SortEffectVars>
}
