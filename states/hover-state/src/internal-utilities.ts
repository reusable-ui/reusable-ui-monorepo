// Types:
import {
    type HoverPhase,
}                           from './types.js'



/**
 * Resolves the current hover/leave lifecycle phase based on hover state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'hovering'` or `'leaving'`
 * - Otherwise, returns the settled phase:
 *   - `'hovered'` or `'leaved'`
 * 
 * @param settledHovered - The currently settled (laggy) hover state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `HoverPhase` value.
 */
export const resolveHoverPhase = (settledHovered: boolean, isTransitioning: boolean): HoverPhase => {
    if (isTransitioning) {
        return settledHovered ? 'hovering' : 'leaving';
    } // if
    
    
    
    return settledHovered ? 'hovered' : 'leaved';
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
