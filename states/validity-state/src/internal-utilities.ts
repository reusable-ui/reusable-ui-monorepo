// Types:
import {
    type ResolvedValidityPhase,
    type TransitioningValidityPhase,
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
 * - Resolved phases:
 *   - `'valid'`        → `'is-valid'`
 *   - `'invalid'`      → `'is-invalid'`
 *   - `'unvalidated'`  → `'is-unvalidated'`
 * 
 * - Transitioning phases:
 *   - `'validating'`   → `'is-validating was-valid|was-invalid|was-unvalidated'`
 *   - `'invalidating'` → `'is-invalidating was-valid|was-invalid|was-unvalidated'`
 *   - `'unvalidating'` → `'is-unvalidating was-valid|was-invalid|was-unvalidated'`
 * 
 * The `was-*` suffix reflects the previous resolved state, enabling animation authors
 * to target transitions with precision.
 * 
 * @param {ValidityPhase} validityPhase - The current lifecycle phase of the component.
 * @param prevResolvedValidity - The previous resolved validity state, used to trace transition origin.
 * @returns {`is-${ValidityPhase}`} A CSS class name reflecting the phase, optionally including the previous state.
 */
export const getValidityClassname = (validityPhase: ValidityPhase, prevResolvedValidity: boolean | null = null): `is-${ResolvedValidityPhase}` | `is-${TransitioningValidityPhase} was-${ResolvedValidityPhase}` => {
    // Return the corresponding class name:
    switch (validityPhase) {
        case 'validating':
        case 'invalidating':
        case 'unvalidating': {
            const prevPhase = resolveValidityPhase(prevResolvedValidity, undefined) as ResolvedValidityPhase;
            return `is-${validityPhase} was-${prevPhase}`;
        } // case
        
        default:
            return `is-${validityPhase}`;
    } // switch
};
