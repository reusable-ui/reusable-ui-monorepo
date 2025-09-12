// Types:
import {
    type ExpandPhase,
}                           from './types.js'



/**
 * Resolves the current expand/collapse lifecycle phase based on expansion state and animation intent.
 * 
 * - If `runningIntent` is defined, returns `'expanding'` or `'collapsing'` accordingly.
 * - Otherwise, falls back to the resolved state: `'expanded'` or `'collapsed'`.
 * 
 * @param isExpanded - Whether the component is currently expanded.
 * @param runningIntent - Whether the component is actively transitioning to expanded/collapsed.
 * @returns The current `ExpandPhase` value.
 */
export const resolveExpandPhase = (isExpanded: boolean, runningIntent: boolean | undefined): ExpandPhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'expanding' : 'collapsing';
    } // if
    
    
    
    return isExpanded ? 'expanded' : 'collapsed';
};



/**
 * Resolves the CSS class name for the given expand/collapse lifecycle phase.
 * 
 * Maps each `expandPhase` to a semantic class name:
 * - `'expanding'`  → `'is-expanding'`
 * - `'collapsing'` → `'is-collapsing'`
 * - `'expanded'`   → `'is-expanded'`
 * - `'collapsed'`  → `'is-collapsed'`
 * 
 * @param {ExpandPhase} expandPhase - The current lifecycle phase of the component.
 * @returns {`is-${ExpandPhase}`} A CSS class name reflecting the phase.
 */
export const getExpandClassname = (expandPhase: ExpandPhase): `is-${ExpandPhase}` => {
    // Return the corresponding class name:
    return `is-${expandPhase}`;
};
