// Types:
import {
    type ViewStateOptions,
    type ViewPhase,
}                           from './types.js'

// Defaults:
import {
    defaultMinViewIndex,
    defaultMaxViewIndex,
    defaultViewIndexStep,
}                           from './internal-defaults.js'

// Reusable-ui utilities:
import {
    clamp,
}                           from '@reusable-ui/numbers'             // A lightweight JavaScript library for precise numeric operations.



/**
 * Resolves the current view-switching lifecycle phase based on directional movement and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'view-advancing'` or `'view-receding'`
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
            ? 'view-advancing'
            : 'view-receding'
        );
    } // if
    
    
    
    return 'view-settled';
};



/**
 * Resolves the CSS class name for the given view-switching lifecycle phase.
 * 
 * Maps each `viewPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'view-settled'`   → `'view-settled'`
 * 
 * - Transitioning phases:
 *   - `'view-advancing'` → `'view-advancing'`
 *   - `'view-receding'`  → `'view-receding'`
 * 
 * @param {ViewPhase} viewPhase - The current lifecycle phase of the component.
 * @returns {ViewPhase} A CSS class name reflecting the phase.
 */
export const getViewClassname = (viewPhase: ViewPhase): ViewPhase => {
    // Return the corresponding class name:
    return viewPhase;
};



/**
 * Clamps a raw view index within the configured range and step.
 * 
 * @param rawViewIndex - The raw view index to clamp.
 * @param options - Configuration for clamping behavior.
 * @returns The clamped view index.
 */
export const clampViewIndex = (rawViewIndex: number, options?: Pick<ViewStateOptions, 'minViewIndex' | 'maxViewIndex' | 'viewIndexStep'>): number => {
    // Extract options and assign defaults:
    const {
        minViewIndex  = defaultMinViewIndex,
        maxViewIndex  = defaultMaxViewIndex,
        viewIndexStep = defaultViewIndexStep,
    } = options ?? {};
    
    
    
    // Clamp the value within the range and step:
    return clamp<number>(minViewIndex, rawViewIndex, maxViewIndex, viewIndexStep);
};
