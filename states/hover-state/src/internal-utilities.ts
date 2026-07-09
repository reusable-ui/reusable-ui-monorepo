// Types:
import {
    type HoverStateProps,
    type HoverStateOptions,
    type HoverPhase,
    type HoverClassname,
}                           from './types.js'
import {
    type HoverStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for hover/unhover state behavior. */
export const resolveHoverTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, HoverStateProps, HoverStateOptions, HoverStateDefinition>): HoverPhase => {
    if (isTransitioning) return settledState ? 'hovering' : 'unhovering';
    return settledState ? 'hovered' : 'unhovered';
};

/** Resolves the semantic transition classname for hover/unhover state behavior. */
export const resolveHoverTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, HoverPhase, HoverStateProps, HoverStateOptions, HoverStateDefinition>): HoverClassname => {
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for hover/unhover state behavior. */
export const triggerHoverPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, HoverPhase, HoverStateProps, HoverStateOptions, HoverStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'hovering'   : props.onHoveringStart?.(changedTransitionPhase, undefined);   break;
        case 'hovered'    : props.onHoveringEnd?.(changedTransitionPhase, undefined);     break;
        case 'unhovering' : props.onUnhoveringStart?.(changedTransitionPhase, undefined); break;
        case 'unhovered'  : props.onUnhoveringEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
