// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeHandler,
}                           from '@reusable-ui/controllable'        // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).

// Reusable-ui states:
import {
    // Types:
    type InteractionStateProps,
    type InteractionStateChangeDispatcherOptions,
    type InteractionStateOptions,
    type InteractionBehaviorState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/**
 * Props for controlling the active/inactive state of the component.
 * 
 * Provides a declarative way to control whether the component is active or inactive,
 * along with an optional callback to handle user-initiated change requests.
 * 
 * Accepts an optional `active` prop, defaulting to `undefined` (uncontrolled mode) when not provided.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface ActiveStateProps<TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionStateProps<boolean, boolean, TChangeEvent>, 'state' | 'onStateChange'>
{
    /**
     * Specifies the initial active state for uncontrolled mode:
     * - `true`  : the component is initially active
     * - `false` : the component is initially inactive
     * 
     * Defaults to `false` (inactive).
     */
    defaultActive       ?: InteractionStateProps<boolean, boolean, TChangeEvent>['defaultState']
    
    /**
     * Controls the current active state:
     * - `true`  : the component is active
     * - `false` : the component is inactive
     * 
     * Defaults to `undefined` (uncontrolled mode).
     */
    active              ?: InteractionStateProps<boolean, boolean, TChangeEvent>['state']
    
    /**
     * Handles user-initiated requests to change the active state:
     * - `true`  → request to activate
     * - `false` → request to deactivate
     * 
     * This is a user-driven signal dispatched via `dispatchActiveChange()`
     * by action components (e.g. Button, Switch, Selection).
     * The parent may choose to honor or ignore this request.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, activation requests are ignored internally, so this callback is never invoked.
     * - When restriction is lifted, the callback will be invoked in response to user interactions
     *   requesting to activate or deactivate.
     */
    onActiveChange      ?: InteractionStateProps<boolean, boolean, TChangeEvent>['onStateChange']
    
    /**
     * Controls whether the component can be activated via parent context:
     * - `true`  : allows the component to be activated via parent context
     * - `false` : the component can only be activated directly via its own `active` prop
     * 
     * Defaults to `false` (prevents contextual activation).
     */
    cascadeActive       ?: boolean
    
    
    
    /**
     * Called when the activating transition begins.
     */
    onActivatingStart   ?: ValueChangeHandler<ActivePhase, unknown>
    
    /**
     * Called when the activating transition completes.
     */
    onActivatingEnd     ?: ValueChangeHandler<ActivePhase, unknown>
    
    /**
     * Called when the deactivating transition begins.
     */
    onDeactivatingStart ?: ValueChangeHandler<ActivePhase, unknown>
    
    /**
     * Called when the deactivating transition completes.
     */
    onDeactivatingEnd   ?: ValueChangeHandler<ActivePhase, unknown>
}

/**
 * Options for customizing the active change dispatcher behavior.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface ActiveChangeDispatcherOptions<TChangeEvent = unknown>
    extends
        // Bases:
        InteractionStateChangeDispatcherOptions<boolean, TChangeEvent>
{
    /* no additional options yet - reserved for future extensions */
}

/**
 * Optional configuration options for customizing activate/deactivate behavior and animation lifecycle.
 */
export interface ActiveStateOptions
    extends
        // Bases:
        Omit<InteractionStateOptions<boolean>, 'defaultState'>
{
    /**
     * Specifies the initial active state for uncontrolled mode when no `defaultActive` prop is explicitly provided:
     * - `true`  : the component is initially active
     * - `false` : the component is initially inactive
     * 
     * Defaults to `false` (inactive).
     */
    defaultActive        ?: InteractionStateOptions<boolean>['defaultState']
    
    /**
     * Specifies the default cascade behavior when no `cascadeActive` prop is explicitly provided:
     * - `true`  : allows the component to be activated via parent context
     * - `false` : the component can only be activated directly via its own `active` prop
     * 
     * Defaults to `false` (prevents contextual activation).
     */
    defaultCascadeActive ?: boolean
    
    /**
     * Defines the pattern used to identify activate/deactivate-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the activating/deactivating transition lifecycle.
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
     * Defaults to `['activating', 'deactivating']`.
     */
    animationPattern     ?: InteractionStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling    ?: InteractionStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the activate/deactivate lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'active'       ▶️ fully active
 * - 'inactive'     ⏹️ fully inactive
 */
export type ResolvedActivePhase =
    | 'active'
    | 'inactive'

/**
 * Represents the transitional phase of the activate/deactivate lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'activating'   🔄 transitioning toward active
 * - 'deactivating' 🔄 transitioning toward inactive
 */
export type TransitioningActivePhase =
    | 'activating'
    | 'deactivating'

/**
 * Represents the current transition phase of the activate/deactivate lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'active', 'inactive'
 * - Transitional: 'activating', 'deactivating'
 */
export type ActivePhase =
    | ResolvedActivePhase
    | TransitioningActivePhase

/**
 * A CSS class name reflecting the current activate/deactivate phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type ActiveClassname = `is-${ActivePhase}`

/**
 * An API for accessing the resolved active/inactive state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface ActiveBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionBehaviorState<boolean, ActivePhase, ActiveClassname, TElement, TChangeEvent>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
            | 'dispatchStateChange'
        >
{
    /**
     * The current settled active/inactive state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the active/inactive state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in active state
     * - `false` : the component has visually settled in inactive state
     */
    active               : InteractionBehaviorState<boolean, ActivePhase, ActiveClassname, TElement, TChangeEvent>['state']
    
    /**
     * The actual resolved active/inactive state, regardless of animation state.
     * 
     * This reflects the current target state based on controlled or uncontrolled mode.
     * Unlike `active`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be active
     * - `false` : the component is intended to be inactive
     */
    actualActive         : InteractionBehaviorState<boolean, ActivePhase, ActiveClassname, TElement, TChangeEvent>['actualState']
    
    /**
     * The current transition phase of the activate/deactivate lifecycle.
     * 
     * Reflects both transitional states (`activating`, `deactivating`) and resolved states (`active`, `inactive`).
     */
    activePhase          : InteractionBehaviorState<boolean, ActivePhase, ActiveClassname, TElement, TChangeEvent>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current activate/deactivate phase.
     * 
     * Possible values:
     * - `'is-inactive'`
     * - `'is-deactivating'`
     * - `'is-activating'`
     * - `'is-active'`
     */
    activeClassname      : InteractionBehaviorState<boolean, ActivePhase, ActiveClassname, TElement, TChangeEvent>['transitionClassname']
    
    /**
     * Requests a change to the active state.
     * 
     * - In uncontrolled mode (no `active` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onActiveChange`, if provided, regardless of control mode.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, activation requests are ignored and the component remains in its last active/inactive state.
     * - When restriction is lifted, `dispatchActiveChange()` resumes normal operation.
     */
    dispatchActiveChange : InteractionBehaviorState<boolean, ActivePhase, ActiveClassname, TElement, TChangeEvent>['dispatchStateChange']
}
