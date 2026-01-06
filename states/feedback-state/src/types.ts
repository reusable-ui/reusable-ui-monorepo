// Reusable-ui utilities:
import {
    // Types:
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
 * Props for controlling a feedback-based state of the component.
 * 
 * Provides an **effective controlled state** for driving the internal animation lifecycle.
 * 
 * This prop is intended to be dynamic and may change over the lifetime of the component.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface FeedbackStateProps<TState extends {} | null>
    extends
        // Bases:
        TransitionStateProps<TState>
{
    /**
     * Specifies the **effective state** supplied externally to the feedback system.
     * 
     * - Must be a concrete value (already normalized, not a declarative keyword).
     * - Influence rules (disabled/read‑only, cascade, clamp, etc.) must already be applied.
     * - Respected on **every render** so that feedback‑state can respond
     *   to live updates from external sources.
     * 
     * Common sources:
     * - `props.state` for constraint-state
     * - live observer result for feedback-state
     */
    effectiveState : TransitionStateProps<TState>['effectiveState']
}

/**
 * Props for reporting passive updates to the state.
 * 
 * Typically used in interactive components to notify external systems
 * when the resolved state changes—whether due to `state` prop changes, user interaction, or contextual overrides.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface FeedbackStateUpdateProps<TState extends {} | null> {
    /**
     * Reports the updated state whenever the state changes.
     * 
     * This is a passive notification; it does not request a change to the state.
     */
    onStateUpdate ?: ValueChangeEventHandler<TState, unknown>
}

/**
 * Options for customizing feedback-based behavior and animation lifecycle.
 * 
 * These options are intended to be static for the lifetime of each component.
 * They define how feedback states synchronize with the animation system.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 */
export interface FeedbackStateOptions<TState extends {} | null>
    extends
        // Bases:
        TransitionStateOptions<TState>
{
    /* no additional options yet - reserved for future extensions */
}

/**
 * Definition for feedback-based state behavior.
 * 
 * Describes how feedback states (focus, hover, press, validity, etc.)
 * integrate with the feedback lifecycle.
 * 
 * Unlike `options`, which are instance-level and optional, definitions are package-level and mandatory.
 * 
 * Must be statically defined and remain consistent for each `**-state` hook type.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 */
export interface FeedbackBehaviorStateDefinition<TState extends {} | null, TPhase extends string, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
    extends
        Omit<TransitionBehaviorStateDefinition<TState, TPhase, TClassname,
            TBehaviorProps,
            TBehaviorOptions,
            TBehaviorDefinition
        >, 'useResolveDriverState'> // Exclude the driver state resolver (will be defined specifically for feedback states).
{
    /* no additional definition yet - reserved for future extensions */
}

/**
 * An API for accessing the resolved state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * This interface represents the common contract returned by all feedback-based state hooks.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TElement - The type of the target DOM element.
 */
export interface FeedbackBehaviorState<TState extends {} | null, TPhase extends string, TClassname extends string, TElement extends Element = HTMLElement>
    extends
        TransitionBehaviorState<TState, TPhase, TClassname, TElement>
{
    /* no additional behavior yet - reserved for future extensions */
}
