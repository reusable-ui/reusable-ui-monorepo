// Reusable-ui states:
import {
    // Types:
    type ResolveDriverStateArgs,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.

// Types:
import {
    type FeedbackStateProps,
    type FeedbackStateOptions,
    
    type FeedbackStateDefinition,
}                           from './types.js'



/**
 * Resolves the **driver state** for feedback-based components.
 * 
 * In feedback-state (focus, hover, press, validity, disabled, read-only):
 * - The driver is always the externally provided `props.effectiveState`.
 * - Controlled-only mode: there is no fallback to internal state.
 * 
 * Declarative keywords (`'auto'`, `'inherit'`, etc.) must be normalized externally
 * before being passed into `effectiveState`.
 * 
 * @returns The resolved driver state taken directly from props.
 */
export const useResolvedFeedbackDriverState = <TState extends {} | null, TPhase extends string, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>(args: ResolveDriverStateArgs<TState, FeedbackStateProps<TState>, FeedbackStateOptions<TState>, FeedbackStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>>): TState => {
    // Return the resolved state from props:
    return args.props.effectiveState;
};
