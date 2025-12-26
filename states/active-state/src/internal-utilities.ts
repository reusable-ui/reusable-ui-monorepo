// Types:
import {
    type ActiveStateProps,
    type ActiveStateOptions,
    type ActivePhase,
    type ActiveClassname,
}                           from './types.js'
import {
    type ActiveBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Resolves the semantic transition phase for active/inactive state behavior. */
export const resolveActiveTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, ActiveStateProps, ActiveStateOptions, ActiveBehaviorStateDefinition>): ActivePhase => {
    if (isTransitioning) return settledState ? 'activating' : 'deactivating';
    return settledState ? 'active' : 'inactive';
};

/** Resolves the semantic transition classname for active/inactive state behavior. */
export const resolveActiveTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, ActivePhase, ActiveStateProps, ActiveStateOptions, ActiveBehaviorStateDefinition>): ActiveClassname => {
    return `is-${transitionPhase}`;
};
