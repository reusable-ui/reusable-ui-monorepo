// Types:
import {
    type FocusPhase,
}                           from './types.js'



/**
 * Resolves the current focus/blur lifecycle phase based on focus state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'focusing'` or `'blurring'`
 * - Otherwise, returns the settled phase:
 *   - `'focused'` or `'blurred'`
 * 
 * @param settledFocused - The currently settled (laggy) focus state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `FocusPhase` value.
 */
export const resolveFocusPhase = (settledFocused: boolean, isTransitioning: boolean): FocusPhase => {
    if (isTransitioning) {
        return settledFocused ? 'focusing' : 'blurring';
    } // if
    
    
    
    return settledFocused ? 'focused' : 'blurred';
};



/**
 * Resolves the CSS class name for the given focus/blur lifecycle phase.
 * 
 * Maps each `focusPhase` to a semantic class name:
 * - Resolved phases:
 *   - `'focused'`  → `'is-focused'`
 *   - `'blurred'`  → `'is-blurred'`
 * 
 * - Transitioning phases:
 *   - `'focusing'` → `'is-focusing'`
 *   - `'blurring'` → `'is-blurring'`
 * 
 * If `inputLikeFocus` is enabled, appends `'input-like-focus'` to signal input-style focus ring behavior.
 * 
 * @param focusPhase - The current lifecycle phase of the component.
 * @param inputLikeFocus - Whether input-like focus styling should be applied.
 * @returns A CSS class name reflecting the phase.
 */
export const getFocusClassname = (focusPhase: FocusPhase, inputLikeFocus: boolean): `is-${FocusPhase}` | `is-${FocusPhase} input-like-focus` => {
    // Return the corresponding class name:
    return (
        inputLikeFocus
        ? `is-${focusPhase} input-like-focus`
        : `is-${focusPhase}`
    );
};
