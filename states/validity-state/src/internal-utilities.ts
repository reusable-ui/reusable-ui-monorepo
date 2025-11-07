// Types:
import {
    type ResolvedValidityPhase,
    type TransitioningValidityPhase,
    type ValidityPhase,
}                           from './types.js'



/**
 * Resolves the current validity lifecycle phase based on validity state and transition status.
 * 
 * - If a transition is in progress, returns a transitional phase:
 *   - `'validating'`, `'invalidating'`, or `'unvalidating'`
 * - Otherwise, returns the settled phase:
 *   - `'valid'`, `'invalid'`, or `'unvalidated'`
 * 
 * @param settledValidity - The currently settled (laggy) validity state.
 * @param isTransitioning - Whether a transition is currently in progress.
 * @returns The current `ValidityPhase` value.
 */
export const resolveValidityPhase = (settledValidity: boolean | null, isTransitioning: boolean): ValidityPhase => {
    if (isTransitioning) {
        switch (settledValidity) {
            case true  : return 'validating';
            case false : return 'invalidating';
            default    : return 'unvalidating';
        } // switch
    } // if
    
    
    
    switch (settledValidity) {
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
 * @param prevSettledValidity - The previously settled validity state, used to trace transition origin.
 * @returns {`is-${ValidityPhase}`} A CSS class name reflecting the phase, optionally including the previous state.
 */
export const getValidityClassname = (validityPhase: ValidityPhase, prevSettledValidity: boolean | null = null): `is-${ResolvedValidityPhase}` | `is-${TransitioningValidityPhase} was-${ResolvedValidityPhase}` => {
    // Return the corresponding class name:
    switch (validityPhase) {
        case 'validating':
        case 'invalidating':
        case 'unvalidating': {
            const prevPhase = resolveValidityPhase(prevSettledValidity, false) as ResolvedValidityPhase;
            return `is-${validityPhase} was-${prevPhase}`;
        } // case
        
        default:
            return `is-${validityPhase}`;
    } // switch
};
