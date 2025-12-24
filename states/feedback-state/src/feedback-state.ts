'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useLayoutEffect,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Reusable-ui states:
import {
    // Types:
    type ResolveDriverStateArgs,
    type TransitionBehaviorStateDefinition,
    
    
    
    // Hooks:
    useTransitionBehaviorState,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.

// Types:
import {
    type FeedbackStateProps,
    type FeedbackStateUpdateProps,
    type FeedbackStateOptions,
    
    type FeedbackBehaviorStateDefinition,
    
    type FeedbackBehaviorState,
}                           from './types.js'



/**
 * Provides abstract controlled feedback state with animation lifecycle integration.  
 * Specialize it into **focus-state**, **hover-state**, **press-state**, or **validity-state** by defining the `definition` parameter and supplying normalized concrete state to `resolvedState`.  
 * 
 * To implement live updates, dynamically supply the domain-specific observer result into `resolvedState`.  
 * 
 * Constraint-based states can also be implemented using this base, without observers.  
 * Specialize it into **disabled-state** or **read-only-state** by defining the `definition` parameter and directly supplying normalized concrete state to `resolvedState`.  
 * 
 * **Definition parameters:**
 * - **Transition phase resolver**  
 *   Resolves the semantic phase from the settled state and transition flag.
 * - **Transition classname resolver**  
 *   Resolves the semantic classname from the current phase.
 * - **Previous state resolver (optional)**  
 *   Tracks the previously settled state for direction-aware styling.
 * - **Default animation pattern**  
 *   Default animation names to match against.
 * - **Default animation bubbling**  
 *   Whether to enable bubbling from nested child elements.
 * 
 * Supports controlled mode only.
 * 
 * Declarative keywords (`'auto'`, `'inherit'`, etc.) must be resolved externally
 * before passing into `resolvedState`.
 * 
 * @param props - The behavior-specific props, including the externally controlled `resolvedState` and optional update callback.
 * @param options - Optional per-component customization for animation lifecycle (pattern, bubbling, etc.).
 * @param definition - The feedback-specific definition that declares how phases and classnames are resolved.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 * @template TElement - The type of the target DOM element.
 * 
 * @returns The resolved feedback behavior state API.
 */
export const useFeedbackBehaviorState = <
    TState     extends {} | null,
    TPhase     extends string,
    TClassname extends string,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TElement   extends Element = HTMLElement
>(
    props      : FeedbackStateProps<TState> & FeedbackStateUpdateProps<TState>,
    options    : FeedbackStateOptions<TState> | undefined,
    definition : FeedbackBehaviorStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
): FeedbackBehaviorState<TState, TPhase, TClassname, TElement> => {
    // Extract props:
    const {
        resolvedState,
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    const [transitionBehaviorState] = useTransitionBehaviorState<
        TState,
        TState,
        TPhase,
        TClassname,
        
        FeedbackStateProps<TState>,
        FeedbackStateOptions<TState>,
        FeedbackBehaviorStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>,
        
        TElement
    >({
        initialResolvedState  : resolvedState, // Pass the already normalized resolved state.
    },
    options,
    {
        // Force `TBehavior**` => `Feedback**`:
        ...definition satisfies FeedbackBehaviorStateDefinition<TState, TPhase, TClassname,
            TBehaviorProps,
            TBehaviorOptions,
            TBehaviorDefinition
        > as unknown as FeedbackBehaviorStateDefinition<TState, TPhase, TClassname,
            FeedbackStateProps<TState>,
            FeedbackStateOptions<TState>,
            FeedbackBehaviorStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
        >,
        useResolveDriverState : useResolveFeedbackDriverState, // Controlled mode only.
    } satisfies TransitionBehaviorStateDefinition<TState, TState, TPhase, TClassname,
        FeedbackStateProps<TState>,
        FeedbackStateOptions<TState>,
        FeedbackBehaviorStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
    >);
    
    
    
    // A stable dispatcher for emitting state update events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleStateUpdate = useStableCallback((currentState: TState): void => {
        props.onStateUpdate?.(currentState, undefined);
    });
    
    
    
    // Observer effect: emits state update events on `resolvedState` updates.
    // Use `useLayoutEffect()` to ensure the update is emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Emits state update events:
        handleStateUpdate(resolvedState);
    }, [resolvedState]);
    
    
    
    // Return resolved feedback state API:
    return transitionBehaviorState satisfies FeedbackBehaviorState<TState, TPhase, TClassname, TElement>;
};

/**
 * Resolves the **driver state** for feedback-based components.
 * 
 * In feedback-state (focus, hover, press, validity, disabled, read-only):
 * - The driver is always the externally provided `props.resolvedState`.
 * - Controlled-only mode: there is no fallback to internal state.
 * 
 * Declarative keywords (`'auto'`, `'inherit'`, etc.) must be normalized externally
 * before being passed into `resolvedState`.
 * 
 * @returns The resolved driver state taken directly from props.
 */
const useResolveFeedbackDriverState = <TState extends {} | null, TPhase extends string, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>(args: ResolveDriverStateArgs<TState, FeedbackStateProps<TState>, FeedbackStateOptions<TState>, FeedbackBehaviorStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>>): TState => {
    // Return the resolved state from props:
    return args.props.resolvedState;
};
