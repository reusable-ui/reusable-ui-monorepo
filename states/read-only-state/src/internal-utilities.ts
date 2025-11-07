// Types:
import {
    type ReadOnlyPhase,
}                           from './types.js'



/**
 * Resolves the current editable/read-only lifecycle phase based on read-only state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'thawing'` or `'freezing'`
 * - Otherwise, returns the settled phase:
 *   - `'editable'` or `'readonly'`
 * 
 * @param settledReadOnly - The currently settled (laggy) read-only state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `ReadOnlyPhase` value.
 */
export const resolveReadOnlyPhase = (settledReadOnly: boolean, isTransitioning: boolean): ReadOnlyPhase => {
    if (isTransitioning) {
        return settledReadOnly ? 'freezing' : 'thawing';
    } // if
    
    
    
    return settledReadOnly ? 'readonly' : 'editable';
};



/**
 * Resolves the CSS class name for the given editable/read-only lifecycle phase.
 * 
 * Maps each `readOnlyPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'editable'` → `'is-editable'`
 *   - `'readonly'` → `'is-readonly'`
 * 
 * - Transitioning phases:
 *   - `'thawing'`  → `'is-thawing'`
 *   - `'freezing'` → `'is-freezing'`
 * 
 * @param {ReadOnlyPhase} readOnlyPhase - The current lifecycle phase of the component.
 * @returns {`is-${ReadOnlyPhase}`} A CSS class name reflecting the phase.
 */
export const getReadOnlyClassname = (readOnlyPhase: ReadOnlyPhase): `is-${ReadOnlyPhase}` => {
    // Return the corresponding class name:
    return `is-${readOnlyPhase}`;
};
