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
 * Props for controlling the enabled/disabled state of the component.
 * 
 * Provides a declarative way to control whether the component is enabled or disabled,
 * along with an optional callback to synchronize when that state changes.
 * 
 * Accepts an optional `disabled` prop, defaulting to `false` (enabled) when not provided.
 */
export interface DisabledStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState' | 'onStateUpdate'>
{
    /**
     * Controls the current disabled state:
     * - `true`  : the component is disabled
     * - `false` : the component is enabled
     * 
     * Defaults to `false` (enabled).
     */
    disabled         ?: FeedbackStateProps<boolean>['effectiveState']
    
    /**
     * Synchronizes companion components whenever the resolved disabled state changes:
     * - `true`  → the component is now disabled
     * - `false` → the component is now enabled
     * 
     * This is a passive synchronization signal used to keep companion components
     * (e.g. Button, Toggle, Switch) aligned with the component's state.
     * 
     * Triggered on both initial render and subsequent changes.
     * 
     * ⚠️ Important: This callback must not directly or indirectly update the `disabled` prop,
     * otherwise an unwanted circular re-render may occur.
     */
    onDisabledUpdate ?: FeedbackStateProps<boolean>['onStateUpdate']
    
    /**
     * Controls whether the component can be disabled via parent context:
     * - `true`  : allows the component to be disabled via parent context
     * - `false` : the component can only be disabled directly via its own `disabled` prop
     * 
     * Defaults to `true` (allows contextual disabling).
     */
    cascadeDisabled  ?: boolean
    
    
    
    /**
     * Called when the enabling transition begins.
     */
    onEnablingStart  ?: ValueChangeHandler<DisabledPhase, unknown>
    
    /**
     * Called when the enabling transition completes.
     */
    onEnablingEnd    ?: ValueChangeHandler<DisabledPhase, unknown>
    
    /**
     * Called when the disabling transition begins.
     */
    onDisablingStart ?: ValueChangeHandler<DisabledPhase, unknown>
    
    /**
     * Called when the disabling transition completes.
     */
    onDisablingEnd   ?: ValueChangeHandler<DisabledPhase, unknown>
}

/**
 * Optional configuration options for customizing enabled/disabled behavior and animation lifecycle.
 */
export interface DisabledStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default disabled state when no `disabled` prop is explicitly provided:
     * - `true`  : the component is disabled
     * - `false` : the component is enabled
     * 
     * Defaults to `false` (enabled).
     */
    defaultDisabled        ?: boolean
    
    /**
     * Specifies the default cascade behavior when no `cascadeDisabled` prop is explicitly provided:
     * - `true`  : allows the component to be disabled via parent context
     * - `false` : the component can only be disabled directly via its own `disabled` prop
     * 
     * Defaults to `true` (allows contextual disabling).
     */
    defaultCascadeDisabled ?: boolean
    
    /**
     * Defines the pattern used to identify enabled/disabled-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the enabling/disabling transition lifecycle.
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
     * Defaults to `['enabling', 'disabling']`.
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
 * Represents the resolved (settled) phase of the enabled/disabled lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'enabled'   ☂️ fully enabled
 * - 'disabled'  🌂 fully disabled
 */
export type ResolvedDisabledPhase =
    | 'enabled'
    | 'disabled'

/**
 * Represents the transitional phase of the enabled/disabled lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'enabling'  🔄 transitioning toward enabled
 * - 'disabling' 🔄 transitioning toward disabled
 */
export type TransitioningDisabledPhase =
    | 'enabling'
    | 'disabling'

/**
 * Represents the current transition phase of the enabled/disabled lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'enabled', 'disabled'
 * - Transitional: 'enabling', 'disabling'
 */
export type DisabledPhase =
    | ResolvedDisabledPhase
    | TransitioningDisabledPhase

/**
 * A CSS class name reflecting the current enabled/disabled phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type DisabledClassname = `is-${DisabledPhase}`

/**
 * An API for accessing the resolved enabled/disabled state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface DisabledState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackState<boolean, DisabledPhase, DisabledClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled enabled/disabled state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the enabled/disabled state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in disabled state
     * - `false` : the component has visually settled in enabled state
     */
    disabled          : FeedbackState<boolean, DisabledPhase, DisabledClassname, TElement>['state']
    
    /**
     * The actual resolved enabled/disabled state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `disabled`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be disabled
     * - `false` : the component is intended to be enabled
     */
    actualDisabled    : FeedbackState<boolean, DisabledPhase, DisabledClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the enabled/disabled lifecycle.
     * 
     * Reflects both transitional states (`enabling`, `disabling`) and resolved states (`enabled`, `disabled`).
     */
    disabledPhase     : FeedbackState<boolean, DisabledPhase, DisabledClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current enabled/disabled phase.
     * 
     * Possible values:
     * - `'is-disabled'`
     * - `'is-disabling'`
     * - `'is-enabling'`
     * - `'is-enabled'`
     */
    disabledClassname : FeedbackState<boolean, DisabledPhase, DisabledClassname, TElement>['transitionClassname']
}
