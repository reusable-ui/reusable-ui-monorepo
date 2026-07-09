// Types:
import {
    type DragStateProps,
    type DragStateOptions,
    type DragPhase,
    type DragClassname,
}                           from './types.js'
import {
    type DragStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.



/** Resolves the semantic transition phase for drag/drop state behavior. */
export const resolveDragTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, DragStateProps, DragStateOptions, DragStateDefinition>): DragPhase => {
    if (isTransitioning) return settledState ? 'dragging' : 'dropping';
    return settledState ? 'dragged' : 'dropped';
};

/** Resolves the semantic transition classname for drag/drop state behavior. */
export const resolveDragTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, DragPhase, DragStateProps, DragStateOptions, DragStateDefinition>): DragClassname => {
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for drag/drop state behavior. */
export const triggerDragPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, DragPhase, DragStateProps, DragStateOptions, DragStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'dragging' : props.onDraggingStart?.(changedTransitionPhase, undefined); break;
        case 'dragged'  : props.onDraggingEnd?.(changedTransitionPhase, undefined);   break;
        case 'dropping' : props.onDroppingStart?.(changedTransitionPhase, undefined); break;
        case 'dropped'  : props.onDroppingEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
