// Types:
import {
    type HoverPhase,
}                           from './types.js'



/**
 * Resolves the current hover/leave lifecycle phase based on hover state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'hovering'` or `'leaving'`
 * - Otherwise, falls back to the resolved state:
 *   - `'hovered'` or `'leaved'`
 * 
 * @param hovered - The current resolved hover state.
 * @param runningIntent - The target hover state being animated toward.
 * @returns The current `HoverPhase` value.
 */
export const resolveHoverPhase = (hovered: boolean, runningIntent: boolean | undefined): HoverPhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'hovering' : 'leaving';
    } // if
    
    
    
    return hovered ? 'hovered' : 'leaved';
};



/**
 * Resolves the CSS class name for the given hover/leave lifecycle phase.
 * 
 * Maps each `hoverPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'hovered'`  → `'is-hovered'`
 *   - `'leaved'`   → `'is-leaved'`
 * 
 * - Transitioning phases:
 *   - `'hovering'` → `'is-hovering'`
 *   - `'leaving'`  → `'is-leaving'`
 * 
 * @param hoverPhase - The current lifecycle phase of the component.
 * @returns A CSS class name reflecting the phase.
 */
export const getHoverClassname = (hoverPhase: HoverPhase): `is-${HoverPhase}` => {
    // Return the corresponding class name:
    return `is-${hoverPhase}`;
};
