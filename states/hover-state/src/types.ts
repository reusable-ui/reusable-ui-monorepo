// React:
import {
    // Types:
    type RefObject,
    type MouseEventHandler,
}                           from 'react'

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
 * Props for controlling the hovered/unhovered state of the component.
 * 
 * Provides a declarative way to control whether the component is hovered or unhovered,
 * along with an optional callback to synchronize when that state changes.
 * 
 * Accepts an optional `hovered` prop, defaulting to `'auto'` (automatically determine hover state) when not provided.
 * 
 * When `hovered` prop is set to `'auto'`, the component derives its hover state from either:
 * - an externally provided `computedHover`, or
 * - internal hover observer via `ref`, `handleMouseEnter()`, and `handleMouseLeave()` callbacks.
 */
export interface HoverStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState' | 'onStateUpdate'>
{
    /**
     * Controls the current hover state:
     * - `true`   : the component is hovered
     * - `false`  : the component is unhovered
     * - `'auto'` : automatically determine hover state
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as unhovered (`false`), regardless of `hovered`.
     * - When re-enabled:
     *   - `'auto'` mode (internal hover observer): immediately re-evaluates based on current pointer position and containment.
     *   - Explicit (`true`/`false`) or external (`computedHover`): resumes following the provided value.
     * 
     * Defaults to `'auto'` (automatically determine hover state).
     */
    hovered           ?: FeedbackStateProps<boolean>['effectiveState'] | 'auto'
    
    /**
     * Synchronizes companion components whenever the resolved hover state changes:
     * - `true`  → the component is now hovered
     * - `false` → the component is now unhovered
     * 
     * This is a passive synchronization signal used to keep companion components
     * (e.g. Button, Toggle, Switch) aligned with the component's state.
     * 
     * Triggered on both initial render and subsequent changes.
     * 
     * ⚠️ Important: This callback must not directly or indirectly update the `hovered` prop,
     * otherwise an unwanted circular re-render may occur.
     */
    onHoverUpdate     ?: FeedbackStateProps<boolean>['onStateUpdate']
    
    /**
     * The derived hover value used when `hovered` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM pointer events,
     * layout containment, or accessibility-driven logic. It is ignored when `hovered` is explicitly set.
     * 
     * If not provided, the component falls back to internal hover observer via `ref`, `handleMouseEnter()`, and `handleMouseLeave()` callbacks.
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as unhovered (`false`), regardless of `computedHover`.
     * - When re-enabled, the component resumes following the passed `computedHover` value.
     * 
     * This property is intended for **component developers** who need to customize hover resolution.
     * For **application developers**, prefer using the `hovered` prop directly.
     */
    computedHover     ?: FeedbackStateProps<boolean>['effectiveState']
    
    
    
    /**
     * Called when the hovering transition begins.
     */
    onHoveringStart   ?: ValueChangeHandler<HoverPhase, unknown>
    
    /**
     * Called when the hovering transition completes.
     */
    onHoveringEnd     ?: ValueChangeHandler<HoverPhase, unknown>
    
    /**
     * Called when the unhovering transition begins.
     */
    onUnhoveringStart ?: ValueChangeHandler<HoverPhase, unknown>
    
    /**
     * Called when the unhovering transition completes.
     */
    onUnhoveringEnd   ?: ValueChangeHandler<HoverPhase, unknown>
}

/**
 * Optional configuration options for customizing hover/unhover behavior and animation lifecycle.
 */
export interface HoverStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default hover state when no `hovered` prop is explicitly provided:
     * - `true`   : the component is hovered
     * - `false`  : the component is unhovered
     * - `'auto'` : automatically determine hover state
     * 
     * Defaults to `'auto'` (automatically determine hover state).
     */
    defaultHovered    ?: boolean | 'auto'
    
    /**
     * Defines the pattern used to identify hover/unhover-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the hovering/unhovering transition lifecycle.
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
     * Defaults to `['hovering', 'unhovering']`.
     */
    animationPattern  ?: FeedbackStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: FeedbackStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the hover/unhover lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'hovered'    🖱️ fully hovered
 * - 'unhovered'  🌫️ fully unhovered
 */
export type ResolvedHoverPhase =
    | 'hovered'
    | 'unhovered'

/**
 * Represents the transitional phase of the hover/unhover lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'hovering'   🔄 transitioning toward hovered
 * - 'unhovering' 🔄 transitioning toward unhovered
 */
export type TransitioningHoverPhase =
    | 'hovering'
    | 'unhovering'

/**
 * Represents the current transition phase of the hover/unhover lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'hovered', 'unhovered'
 * - Transitional: 'hovering', 'unhovering'
 */
export type HoverPhase =
    | ResolvedHoverPhase
    | TransitioningHoverPhase

/**
 * A CSS class name reflecting the current hover/unhover phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type HoverClassname = `is-${HoverPhase}`

/**
 * An API for accessing the resolved hovered/unhovered state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface HoverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackState<boolean, HoverPhase, HoverClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled hovered/unhovered state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the hovered/unhovered state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in hovered state
     * - `false` : the component has visually settled in unhovered state
     */
    hovered           : FeedbackState<boolean, HoverPhase, HoverClassname, TElement>['state']
    
    /**
     * The actual resolved hovered/unhovered state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `hovered`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be hovered
     * - `false` : the component is intended to be unhovered
     */
    actualHovered     : FeedbackState<boolean, HoverPhase, HoverClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the hover/unhover lifecycle.
     * 
     * Reflects both transitional states (`hovering`, `unhovering`) and resolved states (`hovered`, `unhovered`).
     */
    hoverPhase        : FeedbackState<boolean, HoverPhase, HoverClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current hover/unhover phase.
     * 
     * Possible values:
     * - `'is-unhovered'`
     * - `'is-unhovering'`
     * - `'is-hovering'`
     * - `'is-hovered'`
     */
    hoverClassname    : FeedbackState<boolean, HoverPhase, HoverClassname, TElement>['transitionClassname']
    
    /**
     * Ref to the hoverable DOM element.
     * 
     * Enables initial hover detection and diagnostic tooling.
     * 
     * If the component is already hovered on mount (e.g. via pointer resting),
     * but React hasn't yet hydrated, this ref allows detection of the
     * pre-existing hover state.
     */
    ref               : RefObject<TElement | null>
    
    /**
     * Event handler for mouseenter events.
     * 
     * Used to signal that the cursor is hovering over the component,
     * typically when `hovered` prop is set to `'auto'` and `computedHover` is not provided.
     */
    handleMouseEnter  : MouseEventHandler<TElement>
    
    /**
     * Event handler for mouseleave events.
     * 
     * Used to signal that the cursor has left the component,
     * typically when `hovered` prop is set to `'auto'` and `computedHover` is not provided.
     */
    handleMouseLeave  : MouseEventHandler<TElement>
}
