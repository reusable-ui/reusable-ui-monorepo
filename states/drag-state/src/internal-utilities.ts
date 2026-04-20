// Types:
import {
    type DragStateProps,
    type DragStateOptions,
    type DragPhase,
    type DragClassname,
}                           from './types.js'
import {
    type DragBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.



/** Resolves the semantic transition phase for dragged/dropped state behavior. */
export const resolveDragTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, DragStateProps, DragStateOptions, DragBehaviorStateDefinition>): DragPhase => {
    if (isTransitioning) return settledState ? 'dragging' : 'dropping';
    return settledState ? 'dragged' : 'dropped';
};

/** Resolves the semantic transition classname for dragged/dropped state behavior. */
export const resolveDragTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, DragPhase, DragStateProps, DragStateOptions, DragBehaviorStateDefinition>): DragClassname => {
    return `is-${transitionPhase}`;
};
