// Types:
import {
    type ActivePhase,
}                           from './types.js'



/**
 * Resolves the current activate/deactivate lifecycle phase based on active state and animation intent.
 * 
 * - If `runningIntent` is defined, returns `'activating'` or `'deactivating'` accordingly.
 * - Otherwise, falls back to the resolved state: `'active'` or `'inactive'`.
 * 
 * @param isActive - Whether the component is currently active.
 * @param runningIntent - Whether the component is actively transitioning to active/inactive.
 * @returns The current `ActivePhase` value.
 */
export const resolveActivePhase = (isActive: boolean, runningIntent: boolean | undefined): ActivePhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'activating' : 'deactivating';
    } // if
    
    
    
    return isActive ? 'active' : 'inactive';
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
