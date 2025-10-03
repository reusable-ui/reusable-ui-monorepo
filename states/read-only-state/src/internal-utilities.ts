// Types:
import {
    type ReadOnlyPhase,
}                           from './types.js'



/**
 * Resolves the current editable/read-only lifecycle phase based on read-only state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'thawing'` or `'freezing'`
 * - Otherwise, falls back to the resolved state:
 *   - `'editable'` or `'readonly'`
 * 
 * @param readOnly - The current resolved read-only state.
 * @param runningIntent - The target read-only state being animated toward.
 * @returns The current `ReadOnlyPhase` value.
 */
export const resolveReadOnlyPhase = (readOnly: boolean, runningIntent: boolean | undefined): ReadOnlyPhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'freezing' : 'thawing';
    } // if
    
    
    
    return readOnly ? 'readonly' : 'editable';
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
