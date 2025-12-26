// Types:
import {
    type CollapseStateProps,
    type CollapseStateOptions,
    type ExpandPhase,
    type ExpandClassname,
}                           from './types.js'
import {
    type CollapseBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Resolves the semantic transition phase for expanded/collapsed state behavior. */
export const resolveExpandTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, CollapseStateProps, CollapseStateOptions, CollapseBehaviorStateDefinition>): ExpandPhase => {
    if (isTransitioning) return settledState ? 'expanding' : 'collapsing';
    return settledState ? 'expanded' : 'collapsed';
};

/** Resolves the semantic transition classname for expanded/collapsed state behavior. */
export const resolveExpandTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, ExpandPhase, CollapseStateProps, CollapseStateOptions, CollapseBehaviorStateDefinition>): ExpandClassname => {
    return `is-${transitionPhase}`;
};
