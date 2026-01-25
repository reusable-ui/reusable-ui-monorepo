// React:
import {
    // Types:
    type RefObject,
}                           from 'react'



/**
 * Defines how the observer behaves when the component enters a restricted state
 * (such as disabled or read-only).
 * 
 * - `discrete`: Resets to the inactive state when restricted.
 *   Requires a new user action to reactivate (e.g. focus, press).
 * - `continuous`: Treats as an inactive state when restricted.
 *   When restriction is lifted, recomputes the actual DOM condition (e.g. hover).
 */
export type ObserverRestrictionBehavior =
    | 'discrete'
    | 'continuous'



/**
 * Props for an observer instance.
 * 
 * Describes external conditions that control whether the observer
 * is allowed to update its state.
 * 
 * This prop is intended to be dynamic and may change over the lifetime of the component.
 */
export interface ObserverProps {
    /**
     * Indicates whether the component is externally controlled.
     * 
     * If true, the observer becomes inactive and stops emitting state updates.
     * 
     * In this mode, `observedState` should be considered *unreliable*,
     * and the component must rely on its externally controlled state instead.
     */
    isControlled : boolean
    
    /**
     * Indicates whether the component is in a restricted state
     * (e.g. disabled, read-only).
     * 
     * If true, the state is always treated as inactive, regardless of incoming updates.
     * 
     * In this mode, `observedState` remains *reliable* for reflecting the restricted condition.
     */
    isRestricted : boolean
}



/**
 * Options for customizing observer behavior.
 * 
 * These options are intended to be static for the lifetime of each component.
 * They define how state updates are committed.
 * 
 * @template TState - The type of the state value.
 */
export interface ObserverOptions<TState extends {} | null> {
    /**
     * Customizes commit logic for applying a new state.
     * 
     * - Must eventually call `setState(newState)` unless the update
     *   is intentionally suppressed (e.g. canceled timer).
     * - Can be used to implement deferred state transitions.
     */
    commitState ?: (newState: TState, setState: (newState: TState) => void) => void
}



/**
 * Definition for an observer type.
 * 
 * Describes the default semantics for each observer type (hover, press, focus, etc.).
 * 
 * Unlike `options`, which are instance-level and optional, definitions are package-level and mandatory.
 * 
 * Must be statically defined and remain consistent for each `**-observer` hook type.
 * 
 * @template TState - The type of the state value.
 * @template TElement - The type of the target DOM element.
 */
export interface ObserverDefinition<TState extends {} | null, TElement extends Element> {
    /**
     * Defines the baseline inactive state (e.g. `false` for boolean observers).
     * 
     * - Always applied when `isRestricted` prop is `true`.
     * - Always resets the state if `restrictionBehavior` is `'discrete'`.
     * - Common values: `false` for `TState = boolean`, or `0` for `TState = number`.
     */
    inactiveState        : TState
    
    /**
     * Specifies how state is handled when the component is in a restricted state
     * (e.g. disabled, read-only).
     */
    restrictionBehavior  : ObserverRestrictionBehavior
    
    /**
     * Measures the current state of the DOM element.
     * 
     * Used when `newState` is not explicitly provided (automatic detection).
     */
    getCurrentState     ?: (element: TElement) => TState
}



/**
 * An API for accessing the current observed state and supporting properties needed to update or measure it.
 * 
 * @template TState - The type of the state value.
 * @template TElement - The type of the target DOM element.
 */
export interface ObserverState<TState extends {} | null, TElement extends Element> {
    /**
     * The current observed state.
     * 
     * - Always equals `inactiveState` when in a restricted state.
     * - For `'discrete'` behavior, remains `inactiveState` until a new user action occurs.
     * - For `'continuous'` behavior, recomputes when restriction is lifted.
     */
    observedState   : TState
    
    /**
     * Points to the target DOM element for supporting automatic state detection
     * via `getCurrentState()`.
     */
    elementRef      : RefObject<TElement | null>
    
    /**
     * Safely updates the state in response to event handlers.
     * 
     * - Should be invoked inside pointer, keyboard, or focus event handlers.
     * - If called while the component is in a restricted state,
     *   the update is considered invalid and will be silently ignored.
     */
    safeUpdateState : (element: TElement, newState?: TState) => void    
}
