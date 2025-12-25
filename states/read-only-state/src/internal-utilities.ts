// Types:
import {
    type ReadOnlyStateProps,
    type ReadOnlyStateOptions,
    type ReadOnlyPhase,
    type ReadOnlyClassname,
}                           from './types.js'
import {
    type ReadOnlyBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for editable/read-only state behavior. */
export const resolveReadOnlyTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, ReadOnlyStateProps, ReadOnlyStateOptions, ReadOnlyBehaviorStateDefinition>): ReadOnlyPhase => {
    if (isTransitioning) return settledState ? 'freezing' : 'thawing';
    return settledState ? 'readonly' : 'editable';
};

/** Resolves the semantic transition classname for editable/read-only state behavior. */
export const resolveReadOnlyTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, ReadOnlyPhase, ReadOnlyStateProps, ReadOnlyStateOptions, ReadOnlyBehaviorStateDefinition>): ReadOnlyClassname => {
    return `is-${transitionPhase}`;
};
