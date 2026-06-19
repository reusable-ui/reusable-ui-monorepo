// Reusable-ui states:
import {
    // Types:
    type TransitionStateProps,
    type ResolveDriverStateArgs,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.

// Types:
import {
    type InteractionStateProps,
    type InteractionStateOptions,
    
    type InteractionBehaviorStateDefinition,
}                           from './types.js'



/**
 * Resolves the **driver state** for interaction-based components.
 * 
 * In interaction-state (collapse, active, view):
 * - Controlled mode: prefers `props.effectiveState`, if `props.state` is provided.
 * - Uncontrolled mode: falls back to `internalState`.
 * 
 * The driver state must always be a concrete value (no declarative keywords).
 * Declarative inputs are normalized into concrete values before being stored or returned.
 * 
 * @returns The resolved driver state (controlled or uncontrolled), guaranteed to be concrete.
 */
export const useResolvedInteractionDriverState = <TDeclarativeState extends {} | null, TState extends TDeclarativeState, TPhase extends string, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition, TChangeEvent = unknown>(args: ResolveDriverStateArgs<TState, InteractionStateProps<TDeclarativeState, TState, TChangeEvent> & Pick<TransitionStateProps<TState>, 'effectiveState'>, InteractionStateOptions<TState>, InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>>): TState => {
    // Extract args:
    const {
        internalState,
        props,
    } = args;
    
    
    
    // Extract props:
    const {
        state : controlledState,
        effectiveState,
    } = props;
    
    
    
    // States:
    
    // Determine and return the driver state:
    // - Controlled mode → use normalized effective state.
    // - Uncontrolled mode → use internal state.
    return (controlledState !== undefined) ? effectiveState : internalState;
};
