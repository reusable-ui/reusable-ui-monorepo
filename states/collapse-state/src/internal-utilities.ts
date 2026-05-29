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
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Resolves the semantic transition phase for expanded/collapsed state behavior. */
export const resolveExpandTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, CollapseStateProps<unknown>, CollapseStateOptions, CollapseBehaviorStateDefinition>): ExpandPhase => {
    if (isTransitioning) return settledState ? 'expanding' : 'collapsing';
    return settledState ? 'expanded' : 'collapsed';
};

/** Resolves the semantic transition classname for expanded/collapsed state behavior. */
export const resolveExpandTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, ExpandPhase, CollapseStateProps<unknown>, CollapseStateOptions, CollapseBehaviorStateDefinition>): ExpandClassname => {
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for expanded/collapsed state behavior. */
export const triggerExpandPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, ExpandPhase, CollapseStateProps<unknown>, CollapseStateOptions, CollapseBehaviorStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'expanding'  : props.onExpandingStart?.(changedTransitionPhase, undefined);  break;
        case 'expanded'   : props.onExpandingEnd?.(changedTransitionPhase, undefined);    break;
        case 'collapsing' : props.onCollapsingStart?.(changedTransitionPhase, undefined); break;
        case 'collapsed'  : props.onCollapsingEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
