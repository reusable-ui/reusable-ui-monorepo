// Types:
import {
    type HoverStateProps,
    type HoverStateOptions,
    type HoverPhase,
    type HoverClassname,
}                           from './types.js'
import {
    type HoverBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for hovered/unhovered state behavior. */
export const resolveHoverTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, HoverStateProps, HoverStateOptions, HoverBehaviorStateDefinition>): HoverPhase => {
    if (isTransitioning) return settledState ? 'hovering' : 'unhovering';
    return settledState ? 'hovered' : 'unhovered';
};

/** Resolves the semantic transition classname for hovered/unhovered state behavior. */
export const resolveHoverTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, HoverPhase, HoverStateProps, HoverStateOptions, HoverBehaviorStateDefinition>): HoverClassname => {
    return `is-${transitionPhase}`;
};
