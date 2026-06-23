// Types:
import {
    type ReadOnlyStateProps,
    type ReadOnlyStateOptions,
    type ReadOnlyPhase,
    type ReadOnlyClassname,
}                           from './types.js'
import {
    type ReadOnlyStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for editable/read-only state behavior. */
export const resolveReadOnlyTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, ReadOnlyStateProps, ReadOnlyStateOptions, ReadOnlyStateDefinition>): ReadOnlyPhase => {
    if (isTransitioning) return settledState ? 'freezing' : 'thawing';
    return settledState ? 'readonly' : 'editable';
};

/** Resolves the semantic transition classname for editable/read-only state behavior. */
export const resolveReadOnlyTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, ReadOnlyPhase, ReadOnlyStateProps, ReadOnlyStateOptions, ReadOnlyStateDefinition>): ReadOnlyClassname => {
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for editable/read-only state behavior. */
export const triggerReadOnlyPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, ReadOnlyPhase, ReadOnlyStateProps, ReadOnlyStateOptions, ReadOnlyStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'thawing'  : props.onThawingStart?.(changedTransitionPhase, undefined);  break;
        case 'editable' : props.onThawingEnd?.(changedTransitionPhase, undefined);    break;
        case 'freezing' : props.onFreezingStart?.(changedTransitionPhase, undefined); break;
        case 'readonly' : props.onFreezingEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
