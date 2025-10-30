// Types:
import {
    type ViewPhase,
}                           from './types.js'



/**
 * Resolves the current view-switching lifecycle phase based on directional movement and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'view-progressing'` or `'view-regressing'`
 * - Otherwise, returns the settled phase:
 *   - `'view-settled'`
 * 
 * @param prevSettledViewIndex - The previously settled view index.
 * @param settledViewIndex - The currently settled (laggy) view index.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `ViewPhase` value.
 */
export const resolveViewPhase = (prevSettledViewIndex: number | undefined, settledViewIndex: number, isTransitioning: boolean): ViewPhase => {
    if (isTransitioning && (prevSettledViewIndex !== undefined)) {
        return (
            // Determine the direction of movement (the same index counts as **forward**, which should never happen):
            (settledViewIndex >= prevSettledViewIndex)
            ? 'view-progressing'
            : 'view-regressing'
        );
    } // if
    
    
    
    return 'view-settled';
};



/**
 * Resolves the CSS class name for the given view-switching lifecycle phase.
 * 
 * Maps each `viewPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'view-settled'`     → `'view-settled'`
 * 
 * - Transitioning phases:
 *   - `'view-progressing'` → `'view-progressing'`
 *   - `'view-regressing'`  → `'view-regressing'`
 * 
 * @param {ViewPhase} viewPhase - The current lifecycle phase of the component.
 * @returns {ViewPhase} A CSS class name reflecting the phase.
 */
export const getViewClassname = (viewPhase: ViewPhase): ViewPhase => {
    // Return the corresponding class name:
    return viewPhase;
};
