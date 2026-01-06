// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeDispatcher,
    type ValueChangeEventHandler,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Reusable-ui states:
import {
    // Types:
    type TransitionStateProps,
    type TransitionStateOptions,
    type TransitionBehaviorStateDefinition,
    type TransitionBehaviorState,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.
export {
    // Re-exports these types for feedback-state consumers:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.



/**
 * Props for controlling an interaction-based state of the component.
 * 
 * Accepts an optional **declarative state**, defaulting to `undefined` (uncontrolled mode).
 * 
 * Declarative values (e.g. `'auto'`, `'inherit'`) are normalized
 * into effective concrete values by the `useResolveEffectiveState` in the behavior definition.
 * 
 * This prop is intended to be dynamic and may change over the lifetime of the component.
 * 
 * @template TDeclarativeState - The declarative type of the state value (may include keywords).
 */
export interface InteractionStateProps<TDeclarativeState extends {} | null>
    extends
        // Bases:
        Omit<TransitionStateProps<{}>, 'effectiveState'>
{
    /**
     * Specifies the current state for controlled mode.
     * Can be a concrete value (already resolved) or a declarative keyword (`'auto'`, `'inherit'`, etc).
     * 
     * Common source:
     * - `props.state`
     * 
     * Defaults to `undefined` (uncontrolled mode).
     */
    state ?: TDeclarativeState
}

/**
 * Props for initializing the state in uncontrolled components.
 * 
 * Enables default state behavior when the parent does not actively manage state.
 * Commonly used in components that enhance interactivity
 * without requiring external control or feedback loops.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface UncontrollableInteractionStateProps<TState extends {} | null> {
    /**
     * Specifies the initial state for uncontrolled mode.
     * Must be a concrete value (already resolved, not a declarative keyword).
     * 
     * Common source:
     * - `props.defaultState`
     * 
     * Defaults to `options.defaultState`, falls back to `definition.defaultInitialState`.
     */
    defaultState ?: TState
}

/**
 * Props for reporting proactive change requests to the state.
 * 
 * Typically used in interactive components that may initiate state changes
 * through user actions such as mouse clicks, keyboard input, or other events.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TChangeEvent - The type of the event triggering the change request (e.g. mouse click, keyboard event).
 */
export interface InteractionStateChangeProps<TState extends {} | null, TChangeEvent = unknown> {
    /**
     * Signals intent to change the state.
     * 
     * The parent may choose to honor or ignore this request.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, change requests are ignored internally, so this callback is never invoked.
     * - When restriction is lifted, the callback will be invoked in response to user interactions
     *   requesting to change the state.
     */
    onStateChange ?: ValueChangeEventHandler<TState, TChangeEvent>
}

/**
 * Options for customizing the state change dispatcher behavior.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TChangeEvent - The type of the event triggering the change request (e.g. mouse click, keyboard event).
 */
export interface InteractionStateChangeDispatcherOptions<TState extends {} | null, TChangeEvent = unknown> {
    /**
     * Optional callback invoked when an internal state update should occur.
     * 
     * - Typically used in **uncontrolled mode** to update internal state.
     * - In controlled mode, this callback is usually omitted since the parent
     *   component dictates the state.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, change requests are ignored internally, so this callback is never invoked.
     * - When restriction is lifted, the callback will be invoked in response to user interactions
     *   requesting to change the state.
     */
    onInternalChange ?: ValueChangeEventHandler<TState, TChangeEvent>
}

/**
 * Options for customizing interaction-based behavior and animation lifecycle.
 * 
 * These options are intended to be static for the lifetime of each component.
 * They define how interaction states initialize and synchronize with the animation system.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface InteractionStateOptions<TState extends {} | null>
    extends
        // Bases:
        TransitionStateOptions<TState>
{
    /**
     * Specifies the initial state for uncontrolled mode when no `defaultState` prop is provided.
     * 
     * Defaults to `definition.defaultInitialState`.
     */
    defaultState ?: TState
}

/**
 * Provides the inputs required to resolve the effective state.
 * 
 * The effective state normalizes declarative values (`'auto'`, `'inherit'`, etc.)
 * into concrete values after applying inference rules such as disabled/read-only restrictions
 * or contextual inheritance.
 * 
 * @template TDeclarativeState - The declarative type of the state value (may include keywords).
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface ResolveEffectiveStateArgs<TDeclarativeState extends {} | null, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition> {
    /**
     * The current declarative state.
     * 
     * Primary input for resolving the effective state.
     */
    declarativeState : TDeclarativeState
    
    /**
     * The behavior-specific props.
     * Forwarded directly from the `use**BehaviorState(props, ...)` call.
     * 
     * May contain props that influence how the effective state is resolved.
     */
    props            : TBehaviorProps
    
    /**
     * The behavior-specific options.
     * Forwarded directly from the `use**BehaviorState(..., options, ...)` call.
     * 
     * May contain options that influence how the effective state is resolved.
     */
    options          : TBehaviorOptions | undefined
    
    /**
     * The behavior-specific definition.
     * Forwarded directly from the `use**BehaviorState(..., definition)` call.
     * 
     * May contain definition properties that influence how the effective state is resolved.
     */
    definition       : TBehaviorDefinition
}

/**
 * Definition for interaction-based state behavior.
 * 
 * Describes how interaction states (collapse, active, view, etc.)
 * integrate with the interaction lifecycle.
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
export interface InteractionBehaviorStateDefinition<TDeclarativeState extends {} | null, TState extends TDeclarativeState, TPhase extends string, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
    extends
        Omit<TransitionBehaviorStateDefinition<TState, TPhase, TClassname,
            TBehaviorProps,
            TBehaviorOptions,
            TBehaviorDefinition
        >, 'useResolveDriverState'> // Exclude the driver state resolver (will be defined specifically for interaction states).
{
    /**
     * A system default initial state when neither `defaultState` prop nor `defaultState` option is provided.
     */
    defaultInitialState      : TState
    
    /**
     * Resolves a **declarative state** (`true`, `false`, `'auto'`, `'inherit'`, etc.)
     * into an **effective concrete value** after applying inference rules such as:
     * - disabled/read-only restrictions
     * - cascade/inheritance from parent context
     * - other domain-specific adjustments
     * 
     * Example: even if the concrete value is `true`, if the component is disabled,
     * the effective state becomes `false`.
     * 
     * This definition property is a hook because implementors may call other hooks (`useContext`, `useDisabledState`, etc.)
     * to resolve the result.
     */
    useResolveEffectiveState : (arg: ResolveEffectiveStateArgs<TDeclarativeState, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>) => TState
}

/**
 * An API for accessing the resolved state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * This interface represents the common contract returned by all interaction-based state hooks.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. mouse click, keyboard event).
 */
export interface InteractionBehaviorState<TState extends {} | null, TPhase extends string, TClassname extends string, TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        TransitionBehaviorState<TState, TPhase, TClassname, TElement>
{
    /**
     * Requests a change to the state.
     * 
     * - In uncontrolled mode (no `state` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onStateChange`, if provided, regardless of control mode.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, change requests are ignored and the component remains in its last state.
     * - When restriction is lifted, `dispatchStateChange()` resumes normal operation.
     */
    dispatchStateChange : ValueChangeDispatcher<TState, TChangeEvent>
}
