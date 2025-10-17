// Types:
import {
    type FocusPhase,
}                           from './types.js'



/**
 * Resolves the current focus/blur lifecycle phase based on focus state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'focusing'` or `'blurring'`
 * - Otherwise, falls back to the resolved state:
 *   - `'focused'` or `'blurred'`
 * 
 * @param focused - The current resolved focus state.
 * @param runningIntent - The target focus state being animated toward.
 * @returns The current `FocusPhase` value.
 */
export const resolveFocusPhase = (focused: boolean, runningIntent: boolean | undefined): FocusPhase => {
    if (runningIntent !== undefined) {
        return runningIntent ? 'focusing' : 'blurring';
    } // if
    
    
    
    return focused ? 'focused' : 'blurred';
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
