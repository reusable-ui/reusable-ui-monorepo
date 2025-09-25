// Types:
import {
    type DisabledPhase,
}                           from './types.js'



/**
 * Resolves the current enable/disable lifecycle phase based on disabling state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'enabling'` or `'disabling'`
 * - Otherwise, falls back to the resolved state:
 *   - `'enabled'` or `'disabled'`
 * 
 * @param disabled - The current resolved disabled state.
 * @param runningIntent - The target disabled state being animated toward.
 * @returns The current `DisabledPhase` value.
 */
export const resolveDisabledPhase = (disabled: boolean, runningIntent: boolean | undefined): DisabledPhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'disabling' : 'enabling';
    } // if
    
    
    
    return disabled ? 'disabled' : 'enabled';
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
