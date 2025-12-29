// Reusable-ui states:
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for initializing a transition-based state of the component.
 * 
 * Provides an **effective initial state** for initializing the internal animation lifecycle.
 * 
 * This prop is intended to be dynamic and may change over the lifetime of the component.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface TransitionStateProps<TState extends {} | null> {
    /**
     * Specifies the **effective state** used to initialize the transition system.
     * 
     * - Must be a concrete value (already normalized, not a declarative keyword).
     * - Influence rules (disabled/read‑only, cascade, clamp, etc.) must already be applied.
     * - Consumed only once at mount to seed the `initialIntent` of `useAnimationState`.
     *   Subsequent changes to this prop are ignored by the transition system.
     * 
     * Common sources:
     * - `props.defaultState` for constraint-state
     * - initial observer result for feedback-state
     */
    effectiveState : TState
}

/**
 * Options for customizing transition-based behavior and animation lifecycle.
 * 
 * These options are intended to be static for the lifetime of each component.
 * They define how the animation system interprets and propagates transitions.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface TransitionStateOptions<TState extends {} | null>
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<TState>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * Defines the pattern used to identify state-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the state transition lifecycle.
     * 
     * Supports:
     * - A string suffix (with word-boundary awareness)
     * - An array of suffixes
     * - A RegExp for advanced matching
     * 
     * Word-boundary behavior mimics regex `\b` semantics:
     * - If the matched pattern starts with a non-word character, it’s always considered boundary-safe.
     * - Otherwise, the character preceding the suffix must be a non-word character or undefined.
     * 
     * Defaults to `definition.defaultAnimationPattern`.
     */
    animationPattern  ?: AnimationStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `definition.defaultAnimationBubbling`.
     */
    animationBubbling ?: AnimationStateOptions<boolean>['animationBubbling']
}

/**
 * Provides the input choices to drive the animation lifecycle.
 * 
 * The implementor should decides which state drives the lifecycle:
 * - from props → controlled only
 * - from internal state → uncontrolled only
 * - prefer props, fallback to internal state → hybrid
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface ResolveDriverStateArgs<TState extends {} | null, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * The current internal state (uncontrolled mode).
     * 
     * Primary input when the component operates in uncontrolled mode.
     */
    internalState : TState
    
    /**
     * The behavior-specific props (may contain controlled state).
     * Forwarded directly from the `use**BehaviorState(props, ...)` call.
     * 
     * Primary input when the component operates in controlled mode.
     */
    props         : TBehaviorProps
    
    /**
     * The behavior-specific options.
     * Forwarded directly from the `use**BehaviorState(..., options, ...)` call.
     * 
     * May contain options that influence how the driver state is resolved.
     */
    options       : TBehaviorOptions | undefined
    
    /**
     * The behavior-specific definition.
     * Forwarded directly from the `use**BehaviorState(..., definition)` call.
     * 
     * May contain definition properties that influence how the driver state is resolved.
     */
    definition    : TBehaviorDefinition
}

/**
 * Provides the inputs required to resolve the semantic transition phase.
 * 
 * The semantic transition phase reflects whether the state is currently settled or in transition.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface ResolveTransitionPhaseArgs<TState extends {} | null, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * The previously settled state before the current `settledState`.
     * Only available if `useResolvePreviousState` is provided in the behavior definition.
     * 
     * This value trails one step behind `settledState`.
     * It updates only after a transition completes, and persists even after settling.
     * When no prior `settledState` exists, it resolves to `undefined`.
     * 
     * Secondary input for resolving direction-aware transition phase.
     * 
     * Possible values:
     * - `undefined` : there is no prior `settledState` (e.g., on initial render)
     * - `TState`    : the component was previously settled in this state
     */
    prevSettledState : TState | undefined
    
    /**
     * The most recent settled state after the transition animation completes.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Primary input for resolving the semantic transition phase.
     */
    settledState     : TState
    
    /**
     * Indicates whether a transition toward the effective state is currently in progress.
     * 
     * Primary input for determining whether the phase should be transitional (`**ing`) or settled (`**ed`).
     */
    isTransitioning  : boolean
    
    /**
     * The behavior-specific props.
     * Forwarded directly from the `use**BehaviorState(props, ...)` call.
     * 
     * May contain props that influence how the transition phase is resolved.
     */
    props            : TBehaviorProps
    
    /**
     * The behavior-specific options.
     * Forwarded directly from the `use**BehaviorState(..., options, ...)` call.
     * 
     * May contain options that influence how the transition phase is resolved.
     */
    options          : TBehaviorOptions | undefined
    
    /**
     * The behavior-specific definition.
     * Forwarded directly from the `use**BehaviorState(..., definition)` call.
     * 
     * May contain definition properties that influence how the transition phase is resolved.
     */
    definition       : TBehaviorDefinition
}

/**
 * Provides the inputs required to resolve the semantic transition classname.
 * 
 * The semantic transition classname reflects the current transition phase.
 * 
 * May optionally include previous transition phase information for direction-aware styling,
 * and can also contain customization flags from props or options.
 * 
 * The common implementation maps `transitionPhase` directly to corresponding class names,
 * but more complex logic can be implemented as needed.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface ResolveTransitionClassnameArgs<TState extends {} | null, TPhase extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * The previously settled state before the current `settledState`.
     * Only available if `useResolvePreviousState` is provided in the behavior definition.
     * 
     * This value trails one step behind `settledState`.
     * It updates only after a transition completes, and persists even after settling.
     * When no prior `settledState` exists, it resolves to `undefined`.
     * 
     * Secondary input for resolving direction-aware transition classname.
     * 
     * Possible values:
     * - `undefined` : there is no prior `settledState` (e.g., on initial render)
     * - `TState`    : the component was previously settled in this state
     */
    prevSettledState : TState | undefined
    
    /**
     * The current transition phase of the state lifecycle.
     * 
     * Reflects both transitional states (`**ing`) and resolved states (`**ed`).
     * 
     * Primary input for resolving the semantic transition classname.
     */
    transitionPhase  : TPhase
    
    /**
     * The behavior-specific props.
     * Forwarded directly from the `use**BehaviorState(props, ...)` call.
     * 
     * May contain props that influence how the transition classname is resolved.
     */
    props            : TBehaviorProps
    
    /**
     * The behavior-specific options.
     * Forwarded directly from the `use**BehaviorState(..., options, ...)` call.
     * 
     * May contain options that influence how the transition classname is resolved.
     */
    options          : TBehaviorOptions | undefined
    
    /**
     * The behavior-specific definition.
     * Forwarded directly from the `use**BehaviorState(..., definition)` call.
     * 
     * May contain definition properties that influence how the transition classname is resolved.
     */
    definition       : TBehaviorDefinition
}

/**
 * Definition for transition-based state behavior.
 * 
 * Describes how the driver state is resolved, how transition phases are derived, and
 * how transition classnames are generated, etc.
 * 
 * Unlike `options`, which are instance-level and optional, definitions are package-level and mandatory.
 * 
 * Must be statically defined and remain consistent for each `**-state` hook type.
 * 
 * @template TDeclarativeState - The declarative type of the state value (may include keywords).
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface TransitionBehaviorStateDefinition<TDeclarativeState extends {} | null, TState extends TDeclarativeState, TPhase extends string, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * A system default animation pattern when `animationPattern` option is not provided.
     * 
     * This pattern determines which animation names are recognized as part of the corresponding transition lifecycle.
     */
    defaultAnimationPattern     : AnimationStateOptions<TDeclarativeState>['animationPattern']
    
    /**
     * A system default bubbling behavior when `animationBubbling` option is not provided.
     * 
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    defaultAnimationBubbling   ?: AnimationStateOptions<TDeclarativeState>['animationBubbling']
    
    /**
     * Decides which state drives the lifecycle:
     * - from props → controlled only
     * - from internal state → uncontrolled only
     * - prefer props, fallback to internal state → hybrid
     * 
     * Must return a concrete value (no declarative keywords). Declarative values must be normalized before returning.
     * 
     * This parameter is a hook because implementors may call other hooks (`useContext`, `useDisabledState`, etc.)
     * to resolve the result.  
     * Observation logic hook (e.g. live online status) can be applied here.
     * 
     * Implementation notes:
     * - In feedback-state: always returns `props.effectiveState` (controlled mode).
     * - In interaction-state: prefers `props.state` if provided (controlled mode),
     *   otherwise falls back to `internalState` (uncontrolled mode).
     */
    useResolveDriverState       : (args: ResolveDriverStateArgs<TState, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>) => TState
    
    /**
     * (Optional) Tracks the previously settled state for direction-aware styling.
     * 
     * Defaults to a no-op returning `undefined`.
     */
    useResolvePreviousState    ?: (settledState: TState) => TState | undefined
    
    /**
     * Resolves the semantic transition phase from the given settled state and transition flag.
     */
    resolveTransitionPhase      : (args: ResolveTransitionPhaseArgs<TState, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>) => TPhase
    
    /**
     * Resolves the semantic transition classname from the given transition phase.
     */
    resolveTransitionClassname  : (args: ResolveTransitionClassnameArgs<TState, TPhase, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>) => TClassname
}

/**
 * An API for accessing the resolved state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * This interface represents the common contract returned by all transition-based state hooks.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TElement - The type of the target DOM element.
 */
export interface TransitionBehaviorState<TState extends {} | null, TPhase extends string, TClassname extends string, TElement extends Element = HTMLElement>
    extends
        AnimationStateHandlers<TElement>
{
    /**
     * The previously settled state before the current `state`.
     * Only available if `useResolvePreviousState` is provided in the behavior definition.
     * 
     * This value trails one step behind `state`.
     * It updates only after a transition completes, and persists even after settling.
     * When no prior `state` exists, it resolves to `undefined`.
     * 
     * Rarely used, but useful for direction-aware rendering and
     * inferring transition direction or layout comparisons.
     * 
     * Possible values:
     * - `undefined` : there is no prior `state` (e.g., on initial render)
     * - `TState`    : the component was previously settled in this state
     */
    prevSettledState    : TState | undefined
    
    /**
     * The current settled state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Everyday usage for conditional rendering in sync with animation lifecycle.
     * 
     * Alias for `settledState`.
     * Renamed to shorter name for clarity.
     */
    state               : TState
    
    /**
     * The actual resolved state, regardless of animation state.
     * 
     * This reflects the current target state based on the latest intent.
     * Unlike `state`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for advanced logic that needs the latest intent or target state,
     * independent of animation lifecycle. May appear visually out of sync.
     * 
     * Alias for `driverState`.
     * Renamed to shorter name for clarity.
     */
    actualState         : TState
    
    /**
     * The current transition phase of the state lifecycle.
     * 
     * Reflects both transitional states (`**ing`) and resolved states (`**ed`).
     */
    transitionPhase     : TPhase
    
    /**
     * A CSS class name reflects the current transition phase.
     * 
     * May optionally include previous transition phase information for direction-aware styling,
     * and can also contain customization flags from props or options.
     * 
     * Useful for applying semantic styling tied to the transition lifecycle.
     */
    transitionClassname : TClassname
}
