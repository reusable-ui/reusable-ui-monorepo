// Types:
import {
    type DisabledPhase,
}                           from './types.js'



/**
 * Resolves the current enable/disable lifecycle phase based on disabled state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'enabling'` or `'disabling'`
 * - Otherwise, returns the settled phase:
 *   - `'enabled'` or `'disabled'`
 * 
 * @param settledDisabled - The currently settled (laggy) disabled state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `DisabledPhase` value.
 */
export const resolveDisabledPhase = (settledDisabled: boolean, isTransitioning: boolean): DisabledPhase => {
    if (isTransitioning) {
        return settledDisabled ? 'disabling' : 'enabling';
    } // if
    
    
    
    return settledDisabled ? 'disabled' : 'enabled';
};



/**
 * Resolves the CSS class name for the given enable/disable lifecycle phase.
 * 
 * Maps each `disabledPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'enabled'`  → `'is-enabled'`
 *   - `'disabled'` → `'is-disabled'`
 * 
 * - Transitioning phases:
 *   - `'enabling'`  → `'is-enabling'`
 *   - `'disabling'` → `'is-disabling'`
 * 
 * @param {DisabledPhase} disabledPhase - The current lifecycle phase of the component.
 * @returns {`is-${DisabledPhase}`} A CSS class name reflecting the phase.
 */
export const getDisabledClassname = (disabledPhase: DisabledPhase): `is-${DisabledPhase}` => {
    // Return the corresponding class name:
    return `is-${disabledPhase}`;
};
