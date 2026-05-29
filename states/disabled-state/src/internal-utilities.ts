// Types:
import {
    type DisabledStateProps,
    type DisabledStateOptions,
    type DisabledPhase,
    type DisabledClassname,
}                           from './types.js'
import {
    type DisabledBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for enabled/disabled state behavior. */
export const resolveDisabledTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, DisabledStateProps, DisabledStateOptions, DisabledBehaviorStateDefinition>): DisabledPhase => {
    if (isTransitioning) return settledState ? 'disabling' : 'enabling';
    return settledState ? 'disabled' : 'enabled';
};

/** Resolves the semantic transition classname for enabled/disabled state behavior. */
export const resolveDisabledTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, DisabledPhase, DisabledStateProps, DisabledStateOptions, DisabledBehaviorStateDefinition>): DisabledClassname => {
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for enabled/disabled state behavior. */
export const triggerDisabledPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, DisabledPhase, DisabledStateProps, DisabledStateOptions, DisabledBehaviorStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'enabling'  : props.onEnablingStart?.(changedTransitionPhase, undefined);  break;
        case 'enabled'   : props.onEnablingEnd?.(changedTransitionPhase, undefined);    break;
        case 'disabling' : props.onDisablingStart?.(changedTransitionPhase, undefined); break;
        case 'disabled'  : props.onDisablingEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
