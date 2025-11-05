// Types:
import {
    type ActivePhase,
}                           from './types.js'



/**
 * Resolves the current activate/deactivate lifecycle phase based on activation state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'activating'` or `'deactivating'`
 * - Otherwise, returns the settled phase:
 *   - `'active'` or `'inactive'`
 * 
 * @param settledActive - The currently settled (laggy) active state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `ActivePhase` value.
 */
export const resolveActivePhase = (settledActive: boolean, isTransitioning: boolean): ActivePhase => {
    if (isTransitioning) {
        return settledActive ? 'activating' : 'deactivating';
    } // if
    
    
    
    return settledActive ? 'active' : 'inactive';
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
