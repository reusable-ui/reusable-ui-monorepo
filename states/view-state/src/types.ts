// React:
import {
    // Types:
    type CSSProperties,
}                           from 'react'

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
 * Props for controlling the current view index of the component.
 * 
 * Provides a declarative way to control the current view index of the component,
 * along with an optional callback to handle user-initiated change requests.
 * 
 * Accepts an optional `viewIndex` prop, defaulting to `undefined` (uncontrolled mode) when not provided.
 * 
 * @template TChangeEvent The type of the event triggering the change request (e.g. tab click, swipe gesture).
 */
export interface ViewStateProps<TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionStateProps<number, number, TChangeEvent>, 'defaultState' | 'state' | 'onStateChange'>
{
    /**
     * Specifies the initial view index for uncontrolled mode:
     * - `0`, `1`, `2`, … : the component is initially showing the view at the given index
     * 
     * Defaults to `0` (first view).
     */
    defaultViewIndex     ?: InteractionStateProps<number, number, TChangeEvent>['defaultState']
    
    /**
     * Controls the current view index:
     * - `0`, `1`, `2`, … : the component is showing the view at the given index
     * 
     * Defaults to `undefined` (uncontrolled mode).
     */
    viewIndex            ?: InteractionStateProps<number, number, TChangeEvent>['state']
    
    /**
     * Handles user-initiated requests to change the view index:
     * - `0`, `1`, `2`, … : request to navigate to the given index
     * 
     * This is a user-driven signal dispatched via `dispatchViewIndexChange()`
     * by action components (e.g. Button, Switch, Selection).
     * The parent may choose to honor or ignore this request.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, view-switch requests are ignored internally, so this callback is never invoked.
     * - When restriction is lifted, the callback will be invoked in response to user interactions
     *   requesting navigation to a new view index.
     */
    onViewIndexChange    ?: InteractionStateProps<number, number, TChangeEvent>['onStateChange']
    
    
    
    /**
     * Called when the advancing (next) view transition begins.
     * 
     * Triggered when the component starts animating toward a higher index.
     */
    onViewAdvancingStart ?: ValueChangeHandler<ViewPhase, unknown>
    
    /**
     * Called when the advancing (next) view transition completes.
     * 
     * Triggered when the component settles at the target index after moving forward.
     */
    onViewAdvancingEnd   ?: ValueChangeHandler<ViewPhase, unknown>
    
    /**
     * Called when the receding (previous) view transition begins.
     * 
     * Triggered when the component starts animating toward a lower index.
     */
    onViewRecedingStart  ?: ValueChangeHandler<ViewPhase, unknown>
    
    /**
     * Called when the receding (previous) view transition completes.
     * 
     * Triggered when the component settles at the target index after moving backward.
     */
    onViewRecedingEnd    ?: ValueChangeHandler<ViewPhase, unknown>
}

/**
 * Options for customizing the view index change dispatcher behavior.
 * 
 * @template TChangeEvent The type of the event triggering the change request (e.g. tab click, swipe gesture).
 */
export interface ViewIndexChangeDispatcherOptions<TChangeEvent = unknown>
    extends
        // Bases:
        InteractionStateChangeDispatcherOptions<number, TChangeEvent>
{
    /* no additional options yet - reserved for future extensions */
}

/**
 * Optional configuration options for customizing view-switching behavior and its animation lifecycle.
 */
export interface ViewStateOptions
    extends
        // Bases:
        Omit<InteractionStateOptions<number>, 'defaultState'>
{
    /**
     * Specifies the initial view index for uncontrolled mode when no `defaultViewIndex` prop is explicitly provided:
     * - `0`, `1`, `2`, … : the component is initially showing the view at the given index
     * 
     * Defaults to `0` (first view).
     */
    defaultViewIndex  ?: InteractionStateOptions<number>['defaultState']
    
    /**
     * The minimum allowed view index.
     * 
     * This defines the lower bound of the valid view range.
     * Values below this will be clamped to `minViewIndex`.
     * 
     * Defaults to `0`, aligning with zero-based indexing conventions (e.g., arrays).
     */
    minViewIndex      ?: number
    
    /**
     * The maximum allowed view index.
     * 
     * This defines the upper bound of the valid view range.
     * Values above this will be clamped to `maxViewIndex`.
     * 
     * Defaults to `Infinity`, allowing unrestricted view navigation unless explicitly clamped.
     */
    maxViewIndex      ?: number
    
    /**
     * The step size or resolution for view index values.
     * 
     * This controls snapping behavior. A value of `1` enables integer-based snapping.
     * To allow fractional scrolling or smooth syncing, use a smaller value (e.g., `0.01`) or `0`.
     * 
     * Defaults to `1`, enabling snapping to nearest integer value.
     */
    viewIndexStep     ?: number
    
    /**
     * Defines the pattern used to identify view-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the forward/backward transition lifecycle.
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
     * Defaults to `['view-advancing', 'view-receding']`.
     */
    animationPattern  ?: InteractionStateOptions<number>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    bubblingAnimation ?: InteractionStateOptions<number>['bubblingAnimation']
}

/**
 * Represents the resolved (settled) phase of the view-switching lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'view-settled'   ✅ fully settled at the target index
 */
export type ResolvedViewPhase =
    | 'view-settled'

/**
 * Represents the transitional phase of the view-switching lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'view-advancing' 🔄 transitioning to a higher index
 * - 'view-receding'  🔄 transitioning to a lower index
 */
export type TransitioningViewPhase =
    | 'view-advancing'
    | 'view-receding'

/**
 * Represents the current transition phase of the view-switching lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'view-settled'
 * - Transitional: 'view-advancing', 'view-receding'
 */
export type ViewPhase =
    | ResolvedViewPhase
    | TransitioningViewPhase

/**
 * A CSS classname for toggling the view-switching phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type ViewClassname = ViewPhase

/**
 * An API for accessing the resolved view index, current transition phase, associated CSS classname, change dispatcher, and animation event handlers.
 * 
 * @template TElement The type of the target DOM element.
 * @template TChangeEvent The type of the event triggering the change request (e.g. tab click, swipe gesture).
 */
export interface ViewState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        Omit<InteractionState<number, ViewPhase, ViewClassname, TElement, TChangeEvent>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
            | 'dispatchStateChange'
        >
{
    /**
     * The current settled view index used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved index due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the active view in sync with animation lifecycle.
     * 
     * Possible values:
     * - `0`, `1`, `2`, … : the component has visually settled on the view at the given index
     */
    viewIndex               : InteractionState<number, ViewPhase, ViewClassname, TElement, TChangeEvent>['state']
    
    /**
     * The previously settled view index before the most recent transition.
     * 
     * This value trails one step behind `viewIndex`.
     * It updates only after a transition completes, and persists even after settling.
     * When no prior view exists, it resolves to `undefined`.
     * 
     * Useful for rendering both origin and destination views during animations,
     * and for inferring transition direction or layout comparisons.
     * 
     * Possible values:
     * - `undefined` : there is no prior view (e.g., on initial render)
     * - `0`, `1`, `2`, … : the component was previously settled on the view at the given index
     */
    prevViewIndex           : InteractionState<number, ViewPhase, ViewClassname, TElement, TChangeEvent>['prevSettledState']
    
    /**
     * The lower bound of the currently visible view range.
     * 
     * During transitions, this reflects the smaller index between the origin and target views.
     * When settled, it equals the current `viewIndex`.
     * 
     * May be fractional if `viewIndexStep` option allows non-integer values, indicating partial visibility.
     * 
     * Useful for conditionally rendering views within the visible range,
     * minimizing unnecessary (invisible) DOM nodes.
     * 
     * For rendering discrete view elements, consider applying `Math.floor(minVisibleViewIndex)`.
     */
    minVisibleViewIndex     : number
    
    /**
     * The upper bound of the currently visible view range.
     * 
     * During transitions, this reflects the larger index between the origin and target views.
     * When settled, it equals the current `viewIndex`.
     * 
     * May be fractional if `viewIndexStep` option allows non-integer values, indicating partial visibility.
     * 
     * Useful for conditionally rendering views within the visible range,
     * minimizing unnecessary (invisible) DOM nodes.
     * 
     * For rendering discrete view elements, consider applying `Math.ceil(maxVisibleViewIndex)`.
     */
    maxVisibleViewIndex     : number
    
    /**
     * The actual resolved view index, regardless of animation state.
     * 
     * This reflects the current target index based on controlled or uncontrolled mode.
     * Unlike `viewIndex`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target view, independent of animation lifecycle.
     * 
     * Possible values:
     * - `0`, `1`, `2`, … : the component is intended to be settled on the view at the given index
     */
    actualViewIndex         : InteractionState<number, ViewPhase, ViewClassname, TElement, TChangeEvent>['actualState']
    
    /**
     * The current transition phase of the view-switching lifecycle.
     * 
     * Reflects both transitional states (`view-advancing`, `view-receding`) and resolved state (`view-settled`).
     */
    viewPhase               : InteractionState<number, ViewPhase, ViewClassname, TElement, TChangeEvent>['transitionPhase']
    
    /**
     * A CSS classname for toggling the view-switching phase.
     * 
     * Possible values:
     * - `'view-settled'`
     * - `'view-advancing'`
     * - `'view-receding'`
     */
    viewClassname           : InteractionState<number, ViewPhase, ViewClassname, TElement, TChangeEvent>['transitionClassname']
    
    /**
     * A set of inline CSS variables that reflect the current view lifecycle state.
     * 
     * Includes `--vi-viewIndex` and `--vi-prevViewIndex`, enabling animation authors to drive layout,
     * transitions, and directional inference directly from CSS.
     * 
     * The returned style object is referentially stable as long as the variable values remain unchanged.
     * This ensures predictable rendering behavior and avoids unnecessary re-renders in React.
     * 
     * These variables are updated synchronously and are safe to use in style definitions,
     * keyframes, and conditional selectors.
     */
    viewStyle               : CSSProperties
    
    /**
     * Requests a change to the view index.
     * 
     * - In uncontrolled mode (no `viewIndex` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onViewIndexChange`, if provided, regardless of control mode.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, view-switch requests are ignored and the component remains at its last view index.
     * - When restriction is lifted, `dispatchViewIndexChange()` resumes normal operation.
     */
    dispatchViewIndexChange : InteractionState<number, ViewPhase, ViewClassname, TElement, TChangeEvent>['dispatchStateChange']
}
