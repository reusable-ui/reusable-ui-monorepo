// Types:
import {
    type CollapseStateProps,
    type CollapseStateOptions,
    type ExpandPhase,
    type ExpandClassname,
}                           from './types.js'
import {
    type CollapseStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Resolves the semantic transition phase for expand/collapse state behavior. */
export const resolveExpandTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, CollapseStateProps<unknown>, CollapseStateOptions, CollapseStateDefinition>): ExpandPhase => {
    if (isTransitioning) return settledState ? 'expanding' : 'collapsing';
    return settledState ? 'expanded' : 'collapsed';
};

/** Resolves the semantic transition classname for expand/collapse state behavior. */
export const resolveExpandTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, ExpandPhase, CollapseStateProps<unknown>, CollapseStateOptions, CollapseStateDefinition>): ExpandClassname => {
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for expand/collapse state behavior. */
export const triggerExpandPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, ExpandPhase, CollapseStateProps<unknown>, CollapseStateOptions, CollapseStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'expanding'  : props.onExpandingStart?.(changedTransitionPhase, undefined);  break;
        case 'expanded'   : props.onExpandingEnd?.(changedTransitionPhase, undefined);    break;
        case 'collapsing' : props.onCollapsingStart?.(changedTransitionPhase, undefined); break;
        case 'collapsed'  : props.onCollapsingEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
