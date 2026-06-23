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
    type TransitionStateDefinition,
    
    
    
    // Hooks:
    useTransitionState,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.

// Types:
import {
    type FeedbackStateProps,
    type FeedbackStateOptions,
    
    type FeedbackBehaviorStateDefinition,
    
    type FeedbackState,
}                           from './types.js'

// Hooks:
import {
    useResolvedFeedbackDriverState,
}                           from './internal-general-hooks.js'



/**
 * Provides abstract controlled feedback state with animation lifecycle integration.  
 * Specialize it into **focus-state**, **hover-state**, **press-state**, or **validity-state** by defining the `definition` parameter and supplying normalized concrete state to `effectiveState`.  
 * 
 * To implement live updates, dynamically supply the domain-specific observer result into `effectiveState`.  
 * 
 * Constraint-based states can also be implemented using this base, without observers.  
 * Specialize it into **disabled-state** or **read-only-state** by defining the `definition` parameter and directly supplying normalized concrete state to `effectiveState`.  
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
 * before passing into `effectiveState`.
 * 
 * @param props - The behavior-specific props, including the externally controlled `effectiveState` and optional update callback.
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
export const useFeedbackState = <
    TState     extends {} | null,
    TPhase     extends string,
    TClassname extends string,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TElement   extends Element = HTMLElement
>(
    props      : FeedbackStateProps<TState>,
    options    : FeedbackStateOptions<TState> | undefined,
    definition : FeedbackBehaviorStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
): FeedbackState<TState, TPhase, TClassname, TElement> => {
    // Extract props:
    const {
        effectiveState,
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    const [transitionBehaviorState] = useTransitionState<
        TState,
        TPhase,
        TClassname,
        
        FeedbackStateProps<TState>,
        FeedbackStateOptions<TState>,
        FeedbackBehaviorStateDefinition<TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>,
        
        TElement
    >(
    props,
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
        useResolvedDriverState : useResolvedFeedbackDriverState, // Controlled mode only.
    } satisfies TransitionStateDefinition<TState, TPhase, TClassname,
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
    
    
    
    // Observer effect: emits state update events on `effectiveState` updates.
    // Use `useLayoutEffect()` to ensure the update is emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Emits state update events:
        handleStateUpdate(effectiveState);
    }, [effectiveState]);
    
    
    
    // Return resolved feedback state API:
    return transitionBehaviorState satisfies FeedbackState<TState, TPhase, TClassname, TElement>;
};
