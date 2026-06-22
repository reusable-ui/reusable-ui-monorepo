// React:
import {
    // Types:
    type PointerEventHandler,
    type KeyboardEventHandler,
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
 * Props for controlling the pressed/released state of the component.
 * 
 * Provides a declarative way to control whether the component is pressed or released,
 * along with an optional callback to synchronize when that state changes.
 * 
 * Accepts an optional `pressed` prop, defaulting to `'auto'` (automatically determine press state) when not provided.
 * 
 * When `pressed` prop is set to `'auto'`, the component derives its press state from either:
 * - an externally provided `computedPress`, or
 * - internal press observer via pointer and keyboard handlers.
 */
export interface PressStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState' | 'onStateUpdate'>
{
    /**
     * Controls the current press state:
     * - `true`   : the component is pressed
     * - `false`  : the component is released
     * - `'auto'` : automatically determine press state
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as released (`false`), regardless of `pressed`.
     * - When re-enabled:
     *   - `'auto'` mode (internal press observer): remains released until the user explicitly re-presses.
     *   - Explicit (`true`/`false`) or external (`computedPress`): resumes following the provided value.
     * - To enforce a "remain released until user re-presses" contract in these declarative modes,
     *   implementors must manage a persistent release in their own state (e.g. suppressing `true` until a new `pointerdown` or `keydown` event is observed).
     * 
     * Defaults to `'auto'` (automatically determine press state).
     */
    pressed          ?: FeedbackStateProps<boolean>['effectiveState'] | 'auto'
    
    /**
     * Synchronizes companion components whenever the resolved press state changes:
     * - `true`  → the component is now pressed
     * - `false` → the component is now released
     * 
     * This is a passive synchronization signal used to keep companion components
     * (e.g. Button, Toggle, Switch) aligned with the component's state.
     * 
     * Triggered on both initial render and subsequent changes.
     * 
     * ⚠️ Important: This callback must not directly or indirectly update the `pressed` prop,
     * otherwise an unwanted circular re-render may occur.
     */
    onPressUpdate    ?: FeedbackStateProps<boolean>['onStateUpdate']
    
    /**
     * The derived press value used when `pressed` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM pointer events,
     * layout containment, or accessibility-driven logic. It is ignored when `pressed` is explicitly set.
     * 
     * If not provided, the component falls back to internal press observer via pointer and keyboard handlers.
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as released (`false`), regardless of `computedPress`.
     * - When re-enabled, the component resumes following the passed `computedPress` value.
     * - To enforce a "remain released until user re-presses" contract in this mode,
     *   implementors must manage a persistent release in their own state (e.g. suppressing `true` until a new `pointerdown` or `keydown` event is observed).
     * 
     * This property is intended for **component developers** who need to customize press resolution.
     * For **application developers**, prefer using the `pressed` prop directly.
     */
    computedPress    ?: FeedbackStateProps<boolean>['effectiveState']
    
    
    
    /**
     * Called when the pressing transition begins.
     */
    onPressingStart  ?: ValueChangeHandler<PressPhase, unknown>
    
    /**
     * Called when the pressing transition completes.
     */
    onPressingEnd    ?: ValueChangeHandler<PressPhase, unknown>
    
    /**
     * Called when the releasing transition begins.
     */
    onReleasingStart ?: ValueChangeHandler<PressPhase, unknown>
    
    /**
     * Called when the releasing transition completes.
     */
    onReleasingEnd   ?: ValueChangeHandler<PressPhase, unknown>
}

/**
 * Optional configuration options for customizing press/release behavior and animation lifecycle.
 */
export interface PressStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default press state when no `pressed` prop is explicitly provided:
     * - `true`   : the component is pressed
     * - `false`  : the component is released
     * - `'auto'` : automatically determine press state
     * 
     * Defaults to `'auto'` (automatically determine press state).
     */
    defaultPressed         ?: boolean | 'auto'
    
    /**
     * Defines which keyboard keys simulate press interactions.
     * 
     * When a matching key is pressed, the component enters the pressed state;
     * when released, it exits the pressed state.
     * 
     * Accepts:
     * - A single key string
     * - An array of key strings
     * - `null` to disable key-based press simulation
     * 
     * Defaults to `'Space'`, matching native button behavior.
     */
    pressKeys              ?: string | string[] | null
    
    /**
     * Defines which keyboard keys trigger a synthetic click event.
     * 
     * When a matching key is pressed, a synthetic click event is dispatched on the component.
     * 
     * Accepts:
     * - A single key string
     * - An array of key strings
     * - `null` to disable key-based click triggering
     * 
     * Defaults to `'Enter'`, matching native button behavior.
     */
    clickKeys              ?: string | string[] | null
    
    /**
     * Determines whether a synthetic click event should be triggered after key release.
     * 
     * Applies only to keys defined in `pressKeys`.
     * 
     * Defaults to `true`, matching native button behavior for keys defined in `pressKeys`.
     */
    triggerClickOnKeyUp    ?: boolean
    
    /**
     * A list of mouse buttons that activate press state.
     * 
     * When a matching button is pressed, the component enters the pressed state;
     * when released, it exits the pressed state.
     * 
     * Accepts:
     * - `0`: activates press on left mouse button
     * - `1`: activates press on middle mouse button
     * - `2`: activates press on right mouse button
     * - An array of button values
     * - `null` to disable mouse-based press activation
     */
    pressButtons           ?: number | number[] | null
    
    /**
     * The minimum pressure threshold required to activate press state for pen devices.
     * 
     * Ensures that only deliberate stylus contact (not hover or accidental proximity) triggers press.
     * 
     * Accepts:
     * - Range: `0.0` (light press) to `1.0` (full press)
     * - Default: `0.005` — activates press when pressure is ≥ 0.005
     * - `-1` to disable stylus-based press activation
     */
    pressPressure          ?: number
    
    /**
     * The exact number of fingers required to activate press state for touch devices.
     * 
     * Ensures that only the specified number of touches triggers press.
     * 
     * Accepts:
     * - `1`: activates press on single-finger touch.
     * - Any other number: requires exact number of finger touches
     * - `0` to disable touch-based press activation
     */
    pressFingers           ?: number
    
    /**
     * Disables the global pointer release fallback mechanism.
     * 
     * When enabled (`true`), the press state will no longer rely on a global `pointerup`/`pointercancel` listener
     * to detect premature releases outside the component boundary (e.g. portals, shadow DOM, or lost focus).
     * 
     * ⚠️ When `true`, the implementor must guarantee that either `handlePointerUp()` or `handlePointerCancel()` 
     * will be invoked after `handlePointerDown()` — otherwise, the press state may remain stuck indefinitely.
     * 
     * Defaults to `false`.
     */
    noGlobalPointerRelease ?: boolean
    
    /**
     * Disables the global key release fallback mechanism.
     * 
     * When enabled (`true`), the press state will no longer rely on a global `keyup` listener
     * to detect premature releases outside the component boundary (e.g. portals, shadow DOM, or lost focus).
     * 
     * ⚠️ When `true`, the implementor must guarantee that `handleKeyUp()`
     * will be invoked after `handleKeyDown()` — otherwise, the press state may remain stuck indefinitely.
     * 
     * Defaults to `false`.
     */
    noGlobalKeyRelease     ?: boolean
    
    /**
     * Defines the pattern used to identify press/release-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the pressing/releasing transition lifecycle.
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
     * Defaults to `['pressing', 'releasing']`.
     */
    animationPattern       ?: FeedbackStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling      ?: FeedbackStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the press/release lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'pressed'  🖱️ fully pressed
 * - 'released' 🌫️ fully released
 */
export type ResolvedPressPhase =
    | 'pressed'
    | 'released'

/**
 * Represents the transitional phase of the press/release lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'pressing'  🔄 transitioning toward pressed
 * - 'releasing' 🔄 transitioning toward released
 */
export type TransitioningPressPhase =
    | 'pressing'
    | 'releasing'

/**
 * Represents the current transition phase of the press/release lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'pressed', 'released'
 * - Transitional: 'pressing', 'releasing'
 */
export type PressPhase =
    | ResolvedPressPhase
    | TransitioningPressPhase

/**
 * A CSS class name reflecting the current press/release phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type PressClassname = `is-${PressPhase}`

/**
 * An API for accessing the resolved pressed/released state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface PressBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackState<boolean, PressPhase, PressClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled pressed/released state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the pressed/released state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in pressed state
     * - `false` : the component has visually settled in released state
     */
    pressed             : FeedbackState<boolean, PressPhase, PressClassname, TElement>['state']
    
    /**
     * The actual resolved pressed/released state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `pressed`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be pressed
     * - `false` : the component is intended to be released
     */
    actualPressed       : FeedbackState<boolean, PressPhase, PressClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the press/release lifecycle.
     * 
     * Reflects both transitional states (`pressing`, `releasing`) and resolved states (`pressed`, `released`).
     */
    pressPhase          : FeedbackState<boolean, PressPhase, PressClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current press/release phase.
     * 
     * Possible values:
     * - `'is-released'`
     * - `'is-releasing'`
     * - `'is-pressing'`
     * - `'is-pressed'`
     */
    pressClassname      : FeedbackState<boolean, PressPhase, PressClassname, TElement>['transitionClassname']
    
    /**
     * Event handler for pointerdown events.
     * 
     * Signals that the pointer is pressing the component.
     * Typically used when `pressed` is set to `'auto'` and `computedPress` is not provided.
     * 
     * Supports mouse, touch, and stylus inputs.
     */
    handlePointerDown   : PointerEventHandler<TElement>
    
    /**
     * Event handler for pointerup events.
     * 
     * Signals that the pointer has released the component.
     * Typically used when `pressed` is set to `'auto'` and `computedPress` is not provided.
     * 
     * Complements `pointerdown` for unified input lifecycle.
     */
    handlePointerUp     : PointerEventHandler<TElement>
    
    /**
     * Event handler for pointercancel events.
     * 
     * Signals that the pointer interaction was interrupted and will not complete normally.
     * Used to safely reset the press state in edge cases like gesture takeover, app switch, or input loss.
     */
    handlePointerCancel : PointerEventHandler<TElement>
    
    /**
     * Event handler for keydown events.
     * 
     * Simulates press interactions based on the configured `pressKeys`,
     * and triggers synthetic click events for keys defined in `clickKeys`.
     */
    handleKeyDown       : KeyboardEventHandler<TElement>
    
    /**
     * Event handler for keyup events.
     * 
     * Simulates release interactions for keys defined in `pressKeys`,
     * and optionally triggers synthetic click events if `triggerClickOnKeyUp` is enabled.
     */
    handleKeyUp         : KeyboardEventHandler<TElement>
}
