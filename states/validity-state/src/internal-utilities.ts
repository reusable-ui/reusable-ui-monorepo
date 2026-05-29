// Types:
import {
    type ValidityStateProps,
    type ValidityStateOptions,
    type ResolvedValidityPhase,
    type ValidityPhase,
    type ValidityClassname,
}                           from './types.js'
import {
    type ValidityBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for validity state behavior. */
export const resolveValidityTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean | null, ValidityStateProps, ValidityStateOptions, ValidityBehaviorStateDefinition>): ValidityPhase => {
    if (isTransitioning) {
        switch (settledState) {
            case true  : return 'validating';
            case false : return 'invalidating';
            default    : return 'unvalidating';
        } // switch
    } // if
    
    
    
    switch (settledState) {
        case true  : return 'valid';
        case false : return 'invalid';
        default    : return 'unvalidated';
    } // switch
};

/**
 * Resolves the semantic transition classname for validity state behavior.
 * 
 * If in a transitioning phase, includes a `was-*` suffix to indicate the previous resolved state.
 */
export const resolveValidityTransitionClassname = ({ prevSettledState = null, transitionPhase, ...restArgs }: ResolveTransitionClassnameArgs<boolean | null, ValidityPhase, ValidityStateProps, ValidityStateOptions, ValidityBehaviorStateDefinition>): ValidityClassname => {
    switch (transitionPhase) {
        case 'validating':
        case 'invalidating':
        case 'unvalidating': {
            // Determine the previous phase:
            const prevPhase = resolveValidityTransitionPhase({
                prevSettledState : undefined,
                settledState     : prevSettledState,
                isTransitioning  : false,
                ...restArgs,
            }) as ResolvedValidityPhase;
            
            // Return the classname with `was-*` suffix:
            return `is-${transitionPhase} was-${prevPhase}`;
        } // case
        
        default:
            return `is-${transitionPhase}`;
    } // switch
};

/** Triggers the appropriate lifecycle events for validity state behavior. */
export const triggerValidityPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean | null, ValidityPhase, ValidityStateProps, ValidityStateOptions, ValidityBehaviorStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'validating'   : props.onValidatingStart?.(changedTransitionPhase, undefined);   break;
        case 'valid'        : props.onValidatingEnd?.(changedTransitionPhase, undefined);     break;
        case 'invalidating' : props.onInvalidatingStart?.(changedTransitionPhase, undefined); break;
        case 'invalid'      : props.onInvalidatingEnd?.(changedTransitionPhase, undefined);   break;
        case 'unvalidating' : props.onUnvalidatingStart?.(changedTransitionPhase, undefined); break;
        case 'unvalidated'  : props.onUnvalidatingEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
