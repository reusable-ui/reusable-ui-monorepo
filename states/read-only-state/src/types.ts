// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeHandler,
}                           from '@reusable-ui/controllable'        // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateProps,
    type FeedbackStateOptions,
    type FeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Props for controlling the editable/read-only state of the component.
 * 
 * Provides a declarative way to control whether the component is editable or read-only,
 * along with an optional callback to synchronize when that state changes.
 * 
 * Accepts an optional `readOnly` prop, defaulting to `false` (editable) when not provided.
 */
export interface ReadOnlyStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState' | 'onStateUpdate'>
{
    /**
     * Controls the current read-only state:
     * - `true`  : the component is read-only
     * - `false` : the component is editable
     * 
     * Defaults to `false` (editable).
     */
    readOnly         ?: FeedbackStateProps<boolean>['effectiveState']
    
    /**
     * Synchronizes companion components whenever the resolved read-only state changes:
     * - `true`  → the component is now read-only
     * - `false` → the component is now editable
     * 
     * This is a passive synchronization signal used to keep companion components
     * (e.g. Button, Toggle, Switch) aligned with the component's state.
     * 
     * Triggered on both initial render and subsequent changes.
     * 
     * ⚠️ Important: This callback must not directly or indirectly update the `readOnly` prop,
     * otherwise an unwanted circular re-render may occur.
     */
    onReadOnlyUpdate ?: FeedbackStateProps<boolean>['onStateUpdate']
    
    /**
     * Controls whether the component can become read-only via parent context:
     * - `true`  : allows the component to be made read-only via parent context
     * - `false` : the component can only be made read-only directly via its own `readOnly` prop
     * 
     * Defaults to `true` (allows contextual read-only).
     */
    cascadeReadOnly  ?: boolean
    
    
    
    /**
     * Called when the thawing transition begins.
     */
    onThawingStart   ?: ValueChangeHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the thawing transition completes.
     */
    onThawingEnd     ?: ValueChangeHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the freezing transition begins.
     */
    onFreezingStart  ?: ValueChangeHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the freezing transition completes.
     */
    onFreezingEnd    ?: ValueChangeHandler<ReadOnlyPhase, unknown>
}

/**
 * Optional configuration options for customizing editable/read-only behavior and animation lifecycle.
 */
export interface ReadOnlyStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default read-only state when no `readOnly` prop is explicitly provided:
     * - `true`  : the component is read-only
     * - `false` : the component is editable
     * 
     * Defaults to `false` (editable).
     */
    defaultReadOnly        ?: boolean
    
    /**
     * Specifies the default cascade behavior when no `cascadeReadOnly` prop is explicitly provided:
     * - `true`  : allows the component to be made read-only via parent context
     * - `false` : the component can only be made read-only directly via its own `readOnly` prop
     * 
     * Defaults to `true` (allows contextual read-only).
     */
    defaultCascadeReadOnly ?: boolean
    
    /**
     * Defines the pattern used to identify editable/read-only-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the thawing/freezing transition lifecycle.
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
     * Defaults to `['thawing', 'freezing']`.
     */
    animationPattern       ?: FeedbackStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    bubblingAnimation      ?: FeedbackStateOptions<boolean>['bubblingAnimation']
}

/**
 * Represents the resolved (settled) phase of the editable/read-only lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'editable'  ✍🏻 fully editable
 * - 'readonly'  🔏 fully read-only
 */
export type ResolvedReadOnlyPhase =
    | 'editable'
    | 'readonly'

/**
 * Represents the transitional phase of the editable/read-only lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'thawing'   🔄 transitioning toward editable
 * - 'freezing'  🔄 transitioning toward read-only
 */
export type TransitioningReadOnlyPhase =
    | 'thawing'
    | 'freezing'

/**
 * Represents the current transition phase of the editable/read-only lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'editable', 'readonly'
 * - Transitional: 'thawing', 'freezing'
 */
export type ReadOnlyPhase =
    | ResolvedReadOnlyPhase
    | TransitioningReadOnlyPhase

/**
 * A CSS class name reflecting the current editable/read-only phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type ReadOnlyClassname = `is-${ReadOnlyPhase}`

/**
 * An API for accessing the resolved editable/read-only state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ReadOnlyState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackState<boolean, ReadOnlyPhase, ReadOnlyClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled editable/read-only state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the editable/read-only state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in read-only state
     * - `false` : the component has visually settled in editable state
     */
    readOnly          : FeedbackState<boolean, ReadOnlyPhase, ReadOnlyClassname, TElement>['state']
    
    /**
     * The actual resolved editable/read-only state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `readOnly`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be read-only
     * - `false` : the component is intended to be editable
     */
    actualReadOnly    : FeedbackState<boolean, ReadOnlyPhase, ReadOnlyClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the editable/read-only lifecycle.
     * 
     * Reflects both transitional states (`thawing`, `freezing`) and resolved states (`editable`, `readonly`).
     */
    readOnlyPhase     : FeedbackState<boolean, ReadOnlyPhase, ReadOnlyClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current editable/read-only phase.
     * 
     * Possible values:
     * - `'is-readonly'`
     * - `'is-freezing'`
     * - `'is-thawing'`
     * - `'is-editable'`
     */
    readOnlyClassname : FeedbackState<boolean, ReadOnlyPhase, ReadOnlyClassname, TElement>['transitionClassname']
}
