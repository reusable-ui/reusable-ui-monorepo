// Types:
import {
    type ActivePhase,
}                           from './types.js'



/**
 * Resolves the current activate/deactivate lifecycle phase based on activation state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'activating'` or `'deactivating'`
 * - Otherwise, falls back to the resolved state:
 *   - `'active'` or `'inactive'`
 * 
 * @param active - The current resolved active state.
 * @param runningIntent - The target active state being animated toward.
 * @returns The current `ActivePhase` value.
 */
export const resolveActivePhase = (active: boolean, runningIntent: boolean | undefined): ActivePhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'activating' : 'deactivating';
    } // if
    
    
    
    return active ? 'active' : 'inactive';
};



/**
 * Resolves the CSS class name for the given activate/deactivate lifecycle phase.
 * 
 * Maps each `activePhase` to a semantic class name:
 * - Resolved phases:
 *   - `'active'`       → `'is-active'`
 *   - `'inactive'`     → `'is-inactive'`
 * 
 * - Transitioning phases:
 *   - `'activating'`   → `'is-activating'`
 *   - `'deactivating'` → `'is-deactivating'`
 * 
 * @param {ActivePhase} activePhase - The current lifecycle phase of the component.
 * @returns {`is-${ActivePhase}`} A CSS class name reflecting the phase.
 */
export const getActiveClassname = (activePhase: ActivePhase): `is-${ActivePhase}` => {
    // Return the corresponding class name:
    return `is-${activePhase}`;
};
