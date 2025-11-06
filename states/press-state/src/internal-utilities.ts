// Types:
import {
    type PressPhase,
}                           from './types.js'



/**
 * Resolves the current press/release lifecycle phase based on press state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'pressing'` or `'releasing'`
 * - Otherwise, returns the settled phase:
 *   - `'pressed'` or `'released'`
 * 
 * @param settledPressed - The currently settled (laggy) press state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `PressPhase` value.
 */
export const resolvePressPhase = (settledPressed: boolean, isTransitioning: boolean): PressPhase => {
    if (isTransitioning) {
        return settledPressed ? 'pressing' : 'releasing';
    } // if
    
    
    
    return settledPressed ? 'pressed' : 'released';
};



/**
 * Resolves the CSS class name for the given press/release lifecycle phase.
 * 
 * Maps each `pressPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'pressed'`   → `'is-pressed'`
 *   - `'released'`  → `'is-released'`
 * 
 * - Transitioning phases:
 *   - `'pressing'`  → `'is-pressing'`
 *   - `'releasing'` → `'is-releasing'`
 * 
 * @param pressPhase - The current lifecycle phase of the component.
 * @returns A CSS class name reflecting the phase.
 */
export const getPressClassname = (pressPhase: PressPhase): `is-${PressPhase}` => {
    // Return the corresponding class name:
    return `is-${pressPhase}`;
};
