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
    type InteractionState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/**
 * Props for controlling the expand/collapse state of the component.
 * 
 * Provides a declarative way to control whether the component is expanded or collapsed,
 * along with an optional callback to handle user-initiated change requests.
 * 
 * Accepts an optional `expanded` prop, defaulting to `undefined` (uncontrolled mode) when not provided.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseStateProps<TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionStateProps<boolean, boolean, TChangeEvent>, 'defaultState' | 'state' | 'onStateChange'>
{
    /**
     * Specifies the initial expanded state for uncontrolled mode:
     * - `true`  : the component is initially expanded
     * - `false` : the component is initially collapsed
     * 
     * Defaults to `false` (collapsed).
     */
    defaultExpanded   ?: InteractionStateProps<boolean, boolean, TChangeEvent>['defaultState']
    
    /**
     * Controls the current expanded state:
     * - `true`  : the component is expanded
     * - `false` : the component is collapsed
     * 
     * Defaults to `undefined` (uncontrolled mode).
     */
    expanded          ?: InteractionStateProps<boolean, boolean, TChangeEvent>['state']
    
    /**
     * Handles user-initiated requests to change the expanded state:
     * - `true`  → request to expand
     * - `false` → request to collapse
     * 
     * This is a user-driven signal dispatched via `dispatchExpandedChange()`
     * by action components (e.g. Button, Switch, Selection).
     * The parent may choose to honor or ignore this request.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, expansion requests are ignored internally, so this callback is never invoked.
     * - When restriction is lifted, the callback will be invoked in response to user interactions
     *   requesting to expand or collapse.
     */
    onExpandedChange  ?: InteractionStateProps<boolean, boolean, TChangeEvent>['onStateChange']
    
    
    
    /**
     * Called when the expanding transition begins.
     */
    onExpandingStart  ?: ValueChangeHandler<ExpandPhase, unknown>
    
    /**
     * Called when the expanding transition completes.
     */
    onExpandingEnd    ?: ValueChangeHandler<ExpandPhase, unknown>
    
    /**
     * Called when the collapsing transition begins.
     */
    onCollapsingStart ?: ValueChangeHandler<ExpandPhase, unknown>
    
    /**
     * Called when the collapsing transition completes.
     */
    onCollapsingEnd   ?: ValueChangeHandler<ExpandPhase, unknown>
}

/**
 * Options for customizing the expanded change dispatcher behavior.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseChangeDispatcherOptions<TChangeEvent = unknown>
    extends
        // Bases:
        InteractionStateChangeDispatcherOptions<boolean, TChangeEvent>
{
    /* no additional options yet - reserved for future extensions */
}

/**
 * Optional configuration options for customizing expand/collapse behavior and animation lifecycle.
 */
export interface CollapseStateOptions
    extends
        // Bases:
        Omit<InteractionStateOptions<boolean>, 'defaultState'>
{
    /**
     * Specifies the initial expanded state for uncontrolled mode when no `defaultExpanded` prop is explicitly provided:
     * - `true`  : the component is initially expanded
     * - `false` : the component is initially collapsed
     * 
     * Defaults to `false` (collapsed).
     */
    defaultExpanded   ?: InteractionStateOptions<boolean>['defaultState']
    
    /**
     * Defines the pattern used to identify expand/collapse-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the expanding/collapsing transition lifecycle.
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
     * Defaults to `['expanding', 'collapsing']`.
     */
    animationPattern  ?: InteractionStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: InteractionStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the expand/collapse lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'expanded'   ☂️ fully expanded
 * - 'collapsed'  🌂 fully collapsed
 */
export type ResolvedExpandPhase =
    | 'expanded'
    | 'collapsed'

/**
 * Represents the transitional phase of the expand/collapse lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'expanding'  🔄 transitioning toward expanded
 * - 'collapsing' 🔄 transitioning toward collapsed
 */
export type TransitioningExpandPhase =
    | 'expanding'
    | 'collapsing'

/**
 * Represents the current transition phase of the expand/collapse lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'expanded', 'collapsed'
 * - Transitional: 'expanding', 'collapsing'
 */
export type ExpandPhase =
    | ResolvedExpandPhase
    | TransitioningExpandPhase

/**
 * A CSS class name reflecting the current expand/collapse phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type ExpandClassname = `is-${ExpandPhase}`

/**
 * An API for accessing the resolved expand/collapse state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 */
export interface CollapseState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionState<boolean, ExpandPhase, ExpandClassname, TElement, TChangeEvent>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
            | 'dispatchStateChange'
        >
{
    /**
     * The current settled expand/collapse state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the expand/collapse state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in expanded state
     * - `false` : the component has visually settled in collapsed state
     */
    expanded               : InteractionState<boolean, ExpandPhase, ExpandClassname, TElement, TChangeEvent>['state']
    
    /**
     * The actual resolved expand/collapse state, regardless of animation state.
     * 
     * This reflects the current target state based on controlled or uncontrolled mode.
     * Unlike `expanded`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be expanded
     * - `false` : the component is intended to be collapsed
     */
    actualExpanded         : InteractionState<boolean, ExpandPhase, ExpandClassname, TElement, TChangeEvent>['actualState']
    
    /**
     * The current transition phase of the expand/collapse lifecycle.
     * 
     * Reflects both transitional states (`expanding`, `collapsing`) and resolved states (`expanded`, `collapsed`).
     */
    expandPhase            : InteractionState<boolean, ExpandPhase, ExpandClassname, TElement, TChangeEvent>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current expand/collapse phase.
     * 
     * Possible values:
     * - `'is-collapsed'`
     * - `'is-collapsing'`
     * - `'is-expanding'`
     * - `'is-expanded'`
     */
    expandClassname        : InteractionState<boolean, ExpandPhase, ExpandClassname, TElement, TChangeEvent>['transitionClassname']
    
    /**
     * Requests a change to the expanded state.
     * 
     * - In uncontrolled mode (no `expanded` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onExpandedChange`, if provided, regardless of control mode.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, expansion requests are ignored and the component remains in its last expanded/collapsed state.
     * - When restriction is lifted, `dispatchExpandedChange()` resumes normal operation.
     */
    dispatchExpandedChange : InteractionState<boolean, ExpandPhase, ExpandClassname, TElement, TChangeEvent>['dispatchStateChange']
}
