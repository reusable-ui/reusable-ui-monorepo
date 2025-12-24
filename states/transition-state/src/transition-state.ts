'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type Dispatch,
    
    
    
    // Hooks:
    useLayoutEffect,
}                           from 'react'

// Reusable-ui states:
import {
    // Types:
    type SetAnimationIntentAction,
    
    
    
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Types:
import {
    type TransitionStateProps,
    type TransitionStateOptions,
    
    type ResolveDriverStateArgs,
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TransitionBehaviorStateDefinition,
    
    type TransitionBehaviorState,
}                           from './types.js'



/**
 * A no-op hook for retrieving a previous settled state.
 * 
 * Always returns `undefined`, serving as the internal fallback
 * when `useResolvePreviousState` is not supplied in the behavior definition.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * 
 * @param _settledState - The most recent settled state after the transition animation completes.
 * @returns Always `undefined`.
 */
const useUndefinedPreviousState = <TState extends {} | null>(_settledState: TState): TState | undefined => undefined;



/**
 * Provides abstract transition state management with animation lifecycle integration.  
 * Specialize it into **constraint-based**, **feedback-based**, or **interaction-based** states by defining the `definition` parameter.
 * 
 * **Definition parameters:**
 * - **Driver state resolver**  
 *   Decides which state drives the lifecycle:  
 *   - from props → controlled only  
 *   - from internal state → uncontrolled only  
 *   - prefer props, fallback to internal state → hybrid  
 *   Must return a concrete value (no declarative keywords). Declarative values must be normalized before returning.  
 *   Observation logic hook (e.g. live online status) can be applied here.
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
 * @param props - The behavior-specific props, including the `initialResolvedState` for setting up the transition state.
 * @param options - Optional per-component customization for animation lifecycle (pattern, bubbling, etc.).
 * @param definition - The behavior-specific definition that declares how driver state, transition phases, and transition classnames are resolved.
 * 
 * @template TDeclarativeState - The declarative type of the state value (may include keywords).
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 * @template TElement - The type of the target DOM element.
 * 
 * @returns A tuple containing:
 * - The resolved transition behavior state API.
 * - A setter for updating the internal state.
 */
export const useTransitionBehaviorState = <
    TDeclarativeState extends {} | null,
    TState            extends TDeclarativeState,
    TPhase            extends string,
    TClassname        extends string,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TElement          extends Element = HTMLElement
>(
    props      : TransitionStateProps<TState>,
    options    : TransitionStateOptions<TState> | undefined,
    definition : TransitionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>,
): readonly [TransitionBehaviorState<TState, TPhase, TClassname, TElement>, Dispatch<SetAnimationIntentAction<TState>>] => {
    // Extract definition and assign defaults:
    const {
        defaultAnimationPattern,
        defaultAnimationBubbling = false, // No bubbling by default.
        
        useResolveDriverState,
        useResolvePreviousState  = useUndefinedPreviousState,
        
        resolveTransitionPhase,
        resolveTransitionClassname,
    } = definition;
    
    
    
    // Extract options and assign defaults:
    const {
        animationPattern  = defaultAnimationPattern,
        animationBubbling = defaultAnimationBubbling,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        initialResolvedState,
    } = props;
    
    
    
    // States and flags:
    
    // Internal state with animation lifecycle:
    const [internalState, setInternalState, runningIntent, animationHandlers] = useAnimationState<TState, TElement>({
        initialIntent: initialResolvedState,
        animationPattern,
        animationBubbling,
    });
    
    // Controlled vs uncontrolled resolution:
    const driverState         = useResolveDriverState({
        internalState,
        props      : props      as TBehaviorProps,
        options    : options    as TBehaviorOptions,
        definition : definition as TBehaviorDefinition,
    } as ResolveDriverStateArgs<TState, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>);
    
    // The current settled or animating state.
    // During animation, this reflects the active target (`runningIntent`).
    // If no animation is active, it reflects the latest declared intent (`driverState`), even if not yet committed.
    // This optimistic fallback ensures transition logic and styling remain in sync with declared transitions.
    // Deferred or discarded intents are never reflected here.
    const settledState        = (runningIntent !== undefined) ? runningIntent : driverState; // Do not use "nullish coalescing operator", because `TState` may be `null` which is a valid state.
    
    // The previously settled state before the most recent transition (if applicable).
    // This value trails one step behind `settledState`.
    // It updates only after a transition completes, and persists even after settling.
    // When no prior settled state exists, it resolves to `undefined`.
    // Useful for directional inference, layout comparisons, and transition-aware animations.
    const prevSettledState    = useResolvePreviousState(settledState);
    
    // Determine whether a transition toward the effective state is currently in progress:
    const isTransitioning     = (
        // An in-flight animation is active toward a target state:
        (runningIntent !== undefined)
        
        ||
        
        // An optimistic transition is pending: the intent has changed, but React has not yet re-rendered to reflect it.
        // This mismatch is expected and resolves once `setInternalState(driverState)` takes effect.
        (internalState !== driverState)
    );
    
    // Derive semantic transition phase from the settled state and transition flag:
    const transitionPhase     = resolveTransitionPhase({
        prevSettledState,
        settledState,
        isTransitioning,
        props      : props      as TBehaviorProps,
        options    : options    as TBehaviorOptions,
        definition : definition as TBehaviorDefinition,
    } satisfies ResolveTransitionPhaseArgs<TState, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>); // `**ed`, `**ing`
    
    // Derive semantic transition classname from the current transition phase:
    const transitionClassname = resolveTransitionClassname({
        prevSettledState,
        transitionPhase,
        props      : props      as TBehaviorProps,
        options    : options    as TBehaviorOptions,
        definition : definition as TBehaviorDefinition,
    } satisfies ResolveTransitionClassnameArgs<TState, TPhase, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>);
    
    
    
    // Sync animation state with effective state:
    // Use `useLayoutEffect()` to ensure the intent is registered before the browser fires `animationstart`.
    // This guarantees the animation lifecycle handshake completes correctly.
    // The `useAnimationState()` hook internally treats missing animation events as immediately completed transitions.
    useLayoutEffect(() => {
        // The `setInternalState()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalState(driverState);
        
        // Note: If `setInternalState()` is delayed (e.g. by React's render scheduler),
        // both `internalState` and `runningIntent` may remain stale temporarily.
        // This introduces a brief pre-transition ambiguity, safely handled by `isTransitioning` logic.
    }, [driverState]);
    
    
    
    // Return resolved transitional state API along with setter state:
    const transitionBehaviorState : TransitionBehaviorState<TState, TPhase, TClassname, TElement> = {
        prevSettledState,
        state       : settledState, // Use `settledState` instead of `driverState`, because during animation, the settled state reflects the visually committed state.
        actualState : driverState,  // Expose the actual effective state for advanced use cases.
        transitionPhase,
        transitionClassname,
        ...animationHandlers,
    };
    return [
        // Resolved transition behavior state:
        transitionBehaviorState,
        
        // Setter for updating state intent:
        setInternalState,
    ] satisfies readonly [TransitionBehaviorState<TState, TPhase, TClassname, TElement>, Dispatch<SetAnimationIntentAction<TState>>];
};
