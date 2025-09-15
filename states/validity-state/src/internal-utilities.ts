// Types:
import {
    type ValidityPhase,
}                           from './types.js'



/**
 * Resolves the current validity lifecycle phase based on validity state and animation intent.
 * 
 * - If `runningIntent` is defined, returns a transitional phase:
 *   - `'validating'`, `'invalidating'`, or `'unvalidating'`
 * - Otherwise, falls back to the resolved state:
 *   - `'valid'`, `'invalid'`, or `'unvalidated'`
 * 
 * @param validity - The current resolved validity state.
 * @param runningIntent - The target validity state being animated toward.
 * @returns The current `ValidityPhase` value.
 */
export const resolveValidityPhase = (validity: boolean | null, runningIntent: boolean | null | undefined): ValidityPhase => {
    if (runningIntent !== undefined) {
        switch (runningIntent) {
            case true  : return 'validating';
            case false : return 'invalidating';
            default    : return 'unvalidating';
        } // switch
    } // if
    
    
    
    switch (validity) {
        case true  : return 'valid';
        case false : return 'invalid';
        default    : return 'unvalidated';
    } // switch
};



/**
 * Resolves the CSS class name for the given validity lifecycle phase.
 * 
 * Maps each `validityPhase` to a semantic class name:
 * - `'validating'`   → `'is-validating'`
 * - `'invalidating'` → `'is-invalidating'`
 * - `'unvalidating'` → `'is-unvalidating'`
 * - `'valid'`        → `'is-valid'`
 * - `'invalid'`      → `'is-invalid'`
 * - `'unvalidated'`  → `'is-unvalidated'`
 * 
 * @param {ValidityPhase} validityPhase - The current lifecycle phase of the component.
 * @returns {`is-${ValidityPhase}`} A CSS class name reflecting the phase.
 */
export const getValidityClassname = (validityPhase: ValidityPhase): `is-${ValidityPhase}` => {
    // Return the corresponding class name:
    return `is-${validityPhase}`;
};
