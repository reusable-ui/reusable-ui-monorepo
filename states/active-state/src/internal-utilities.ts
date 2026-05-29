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
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Resolves the semantic transition phase for active/inactive state behavior. */
export const resolveActiveTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, ActiveStateProps<unknown>, ActiveStateOptions, ActiveBehaviorStateDefinition>): ActivePhase => {
    if (isTransitioning) return settledState ? 'activating' : 'deactivating';
    return settledState ? 'active' : 'inactive';
};

/** Resolves the semantic transition classname for active/inactive state behavior. */
export const resolveActiveTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, ActivePhase, ActiveStateProps<unknown>, ActiveStateOptions, ActiveBehaviorStateDefinition>): ActiveClassname => {
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for active/inactive state behavior. */
export const triggerActivePhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, ActivePhase, ActiveStateProps<unknown>, ActiveStateOptions, ActiveBehaviorStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'activating'   : props.onActivatingStart?.(changedTransitionPhase, undefined);   break;
        case 'active'       : props.onActivatingEnd?.(changedTransitionPhase, undefined);     break;
        case 'deactivating' : props.onDeactivatingStart?.(changedTransitionPhase, undefined); break;
        case 'inactive'     : props.onDeactivatingEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
