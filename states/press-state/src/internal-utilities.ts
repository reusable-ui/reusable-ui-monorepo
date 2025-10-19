// Types:
import {
    type PressPhase,
}                           from './types.js'



/**
 * Resolves the current press/release lifecycle phase based on press state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'pressing'` or `'releasing'`
 * - Otherwise, falls back to the resolved state:
 *   - `'pressed'` or `'released'`
 * 
 * @param pressed - The current resolved press state.
 * @param runningIntent - The target press state being animated toward.
 * @returns The current `PressPhase` value.
 */
export const resolvePressPhase = (pressed: boolean, runningIntent: boolean | undefined): PressPhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'pressing' : 'releasing';
    } // if
    
    
    
    return pressed ? 'pressed' : 'released';
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
