// Types:
import {
    type ExpandPhase,
}                           from './types.js'



/**
 * Resolves the current expand/collapse lifecycle phase based on expansion state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'expanding'` or `'collapsing'`
 * - Otherwise, falls back to the resolved state:
 *   - `'expanded'` or `'collapsed'`
 * 
 * @param expanded - The current resolved expanded state.
 * @param runningIntent - The target expanded state being animated toward.
 * @returns The current `ExpandPhase` value.
 */
export const resolveExpandPhase = (expanded: boolean, runningIntent: boolean | undefined): ExpandPhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'expanding' : 'collapsing';
    } // if
    
    
    
    return expanded ? 'expanded' : 'collapsed';
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
