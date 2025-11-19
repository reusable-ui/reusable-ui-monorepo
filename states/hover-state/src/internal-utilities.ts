// Types:
import {
    type HoverPhase,
}                           from './types.js'



/**
 * Resolves the current hover/unhover lifecycle phase based on hover state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'hovering'` or `'unhovering'`
 * - Otherwise, returns the settled phase:
 *   - `'hovered'` or `'unhovered'`
 * 
 * @param settledHovered - The currently settled (laggy) hover state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `HoverPhase` value.
 */
export const resolveHoverPhase = (settledHovered: boolean, isTransitioning: boolean): HoverPhase => {
    if (isTransitioning) {
        return settledHovered ? 'hovering' : 'unhovering';
    } // if
    
    
    
    return settledHovered ? 'hovered' : 'unhovered';
};



/**
 * Resolves the CSS class name for the given hover/unhover lifecycle phase.
 * 
 * Maps each `hoverPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'hovered'`    → `'is-hovered'`
 *   - `'unhovered'`  → `'is-unhovered'`
 * 
 * - Transitioning phases:
 *   - `'hovering'`   → `'is-hovering'`
 *   - `'unhovering'` → `'is-unhovering'`
 * 
 * @param hoverPhase - The current lifecycle phase of the component.
 * @returns A CSS class name reflecting the phase.
 */
export const getHoverClassname = (hoverPhase: HoverPhase): `is-${HoverPhase}` => {
    // Return the corresponding class name:
    return `is-${hoverPhase}`;
};
