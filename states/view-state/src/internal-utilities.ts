// Types:
import {
    type ViewPhase,
}                           from './types.js'



/**
 * Resolves the current view-switching lifecycle phase based on index movement and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'view-progressing'` or `'view-regressing'`
 * - Otherwise, falls back to the resolved state:
 *   - `'view-settled'`
 * 
 * @param prevViewIndex - The previous resolved view index.
 * @param runningIntent - The target view index being animated toward.
 * @returns The current `ViewPhase` value.
 */
export const resolveViewPhase = (prevViewIndex: number | undefined, runningIntent: number | undefined): ViewPhase => {
    if ((runningIntent !== undefined) && (prevViewIndex !== undefined)) {
        return (
            // Determine the direction of movement (the same index counts as **forward**, which should never happen):
            (runningIntent >= prevViewIndex)
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
