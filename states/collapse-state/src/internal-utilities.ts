// Types:
import {
    type ExpandPhase,
}                           from './types.js'



/**
 * Resolves the current expand/collapse lifecycle phase based on expansion state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'expanding'` or `'collapsing'`
 * - Otherwise, returns the settled phase:
 *   - `'expanded'` or `'collapsed'`
 * 
 * @param settledExpanded - The currently settled (laggy) expansion state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `ExpandPhase` value.
 */
export const resolveExpandPhase = (settledExpanded: boolean, isTransitioning: boolean): ExpandPhase => {
    if (isTransitioning) {
        return settledExpanded ? 'expanding' : 'collapsing';
    } // if
    
    
    
    return settledExpanded ? 'expanded' : 'collapsed';
};



/**
 * Resolves the CSS class name for the given expand/collapse lifecycle phase.
 * 
 * Maps each `expandPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'expanded'`   → `'is-expanded'`
 *   - `'collapsed'`  → `'is-collapsed'`
 * 
 * - Transitioning phases:
 *   - `'expanding'`  → `'is-expanding'`
 *   - `'collapsing'` → `'is-collapsing'`
 * 
 * @param {ExpandPhase} expandPhase - The current lifecycle phase of the component.
 * @returns {`is-${ExpandPhase}`} A CSS class name reflecting the phase.
 */
export const getExpandClassname = (expandPhase: ExpandPhase): `is-${ExpandPhase}` => {
    // Return the corresponding class name:
    return `is-${expandPhase}`;
};
