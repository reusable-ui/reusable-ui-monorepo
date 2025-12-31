// React:
import {
    // Types:
    type RefObject,
    type FocusEventHandler,
    type KeyboardEventHandler,
}                           from 'react'

// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeEventHandler,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateProps,
    type FeedbackStateUpdateProps,
    type FeedbackStateOptions,
    type FeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Props for controlling the focused/blurred state of the component.
 * 
 * Accepts an optional `focused` prop, defaulting to `'auto'` (automatically determine focus state) when not provided.
 * 
 * When `focused` prop is set to `'auto'`, the component derives its focus state from either:
 * - an externally provided `computedFocus`, or
 * - internal focus observer via `ref`, `handleFocus()`, `handleBlur()`, and `handleKeyDown()` callbacks.
 */
export interface FocusStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState'>
{
    /**
     * Specifies the current focus state:
     * - `true`   : the component is focused
     * - `false`  : the component is blurred
     * - `'auto'` : automatically determine focus state
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as blurred (`false`), regardless of `focused`.
     * - When re-enabled:
     *   - `'auto'` mode (internal focus observer): remains blurred until the user explicitly refocuses.
     *   - Explicit (`true`/`false`) or external (`computedFocus`): resumes following the provided value.
     * - To enforce a "remain blurred until user refocuses" contract in these declarative modes,
     *   implementors must manage a persistent blur in their own state (e.g. suppressing `true` until a new `focus` event is observed).
     * 
     * Defaults to `'auto'` (automatically determine focus state).
     */
    focused       ?: FeedbackStateProps<boolean>['effectiveState'] | 'auto'
    
    /**
     * The derived focus value used when `focused` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM focus events,
     * keyboard navigation, or accessibility-driven logic. It is ignored when `focused` is explicitly set.
     * 
     * If not provided, the component falls back to internal focus observer via `ref`, `handleFocus()`, `handleBlur()`, and `handleKeyDown()` callbacks.
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as blurred (`false`), regardless of `computedFocus`.
     * - When re-enabled, the component resumes following the passed `computedFocus` value.
     * - To enforce a "remain blurred until user refocuses" contract in this mode,
     *   implementors must manage a persistent blur in their own state (e.g. suppressing `true` until a new `focus` event is observed).
     * 
     * This property is intended for **component developers** who need to customize focus resolution.
     * For **application developers**, prefer using the `focused` prop directly.
     */
    computedFocus ?: FeedbackStateProps<boolean>['effectiveState']
}

/**
 * Props for reporting updates to the focus state.
 * 
 * Typically used in interactive components (e.g. Button, Select, Input ) to notify external systems
 * when the resolved focus state changes—whether due to user interaction, keyboard navigation, or accessibility triggers.
 */
export interface FocusStateUpdateProps
    extends
        // Bases:
        Omit<FeedbackStateUpdateProps<boolean>, 'onStateUpdate'>
{
    /**
     * Reports the updated focus state whenever it changes:
     * - `true`  → the component is now focused
     * - `false` → the component is now blurred
     * 
     * This is a passive notification; it does not request a change to the focus state.
     */
    onFocusUpdate ?: FeedbackStateUpdateProps<boolean>['onStateUpdate']
}

/**
 * Props for listening lifecycle events triggered by focus/blur phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface FocusStatePhaseEventProps {
    /**
     * Called when the focusing transition begins.
     */
    onFocusingStart ?: ValueChangeEventHandler<FocusPhase, unknown>
    
    /**
     * Called when the focusing transition completes.
     */
    onFocusingEnd   ?: ValueChangeEventHandler<FocusPhase, unknown>
    
    /**
     * Called when the blurring transition begins.
     */
    onBlurringStart ?: ValueChangeEventHandler<FocusPhase, unknown>
    
    /**
     * Called when the blurring transition completes.
     */
    onBlurringEnd   ?: ValueChangeEventHandler<FocusPhase, unknown>
}

/**
 * Optional configuration options for customizing focus/blur behavior and animation lifecycle.
 */
export interface FocusStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default focus state when no `focused` prop is explicitly provided:
     * - `true`   : the component is focused
     * - `false`  : the component is blurred
     * - `'auto'` : automatically determine focus state
     * 
     * Defaults to `'auto'` (automatically determine focus state).
     */
    defaultFocused    ?: boolean | 'auto'
    
    /**
     * Enables input-like focus behavior for styling purposes.
     * 
     * When `true`, the component will always show a focus ring when focused—
     * mimicking native `<input>` semantics, even on mouse click.
     * 
     * Defaults to `false`, relying on `:focus-visible` heuristics.
     */
    inputLikeFocus    ?: boolean
    
    /**
     * Defines the pattern used to identify focus/blur-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the focusing/blurring transition lifecycle.
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
     * Defaults to `['focusing', 'blurring']`.
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
 * Represents the resolved (settled) phase of the focus/blur lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'focused'  🎯 fully focused
 * - 'blurred'  🌫️ fully blurred
 */
export type ResolvedFocusPhase =
    | 'focused'
    | 'blurred'

/**
 * Represents the transitional phase of the focus/blur lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'focusing'  🔄 transitioning toward focused
 * - 'blurring'  🔄 transitioning toward blurred
 */
export type TransitioningFocusPhase =
    | 'focusing'
    | 'blurring'

/**
 * Represents the current transition phase of the focus/blur lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'focused', 'blurred'
 * - Transitional: 'focusing', 'blurring'
 */
export type FocusPhase =
    | ResolvedFocusPhase
    | TransitioningFocusPhase

/**
 * A CSS class name reflecting the current focus/blur phase.
 * 
 * Used for styling based on the lifecycle phase.
 * 
 * If input-like focus behavior is enabled, the class name will include `'input-like-focus'`
 * to signal that the component should visually behave like a native input.
 */
export type FocusClassname = `is-${FocusPhase}` | `is-${FocusPhase} input-like-focus`

/**
 * An API for accessing the resolved focused/blurred state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface FocusBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackBehaviorState<boolean, FocusPhase, FocusClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled focused/blurred state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the focused/blurred state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in focused state
     * - `false` : the component has visually settled in blurred state
     */
    focused        : FeedbackBehaviorState<boolean, FocusPhase, FocusClassname, TElement>['state']
    
    /**
     * The actual resolved focused/blurred state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `focused`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be focused
     * - `false` : the component is intended to be blurred
     */
    actualFocused  : FeedbackBehaviorState<boolean, FocusPhase, FocusClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the focus/blur lifecycle.
     * 
     * Reflects both transitional states (`focusing`, `blurring`) and resolved states (`focused`, `blurred`).
     */
    focusPhase     : FeedbackBehaviorState<boolean, FocusPhase, FocusClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current focus/blur phase.
     * 
     * Possible values:
     * - `'is-blurred'`
     * - `'is-blurring'`
     * - `'is-focusing'`
     * - `'is-focused'`
     * 
     * If input-like focus behavior is enabled, the class name will include `'input-like-focus'`
     * to signal that the component should visually behave like a native input.
     */
    focusClassname : FeedbackBehaviorState<boolean, FocusPhase, FocusClassname, TElement>['transitionClassname']
    
    /**
     * Ref to the focusable DOM element.
     * 
     * Enables initial focus detection and diagnostic tooling.
     * 
     * If the component is already focused on mount (e.g. via `autoFocus`),
     * but React hasn't yet hydrated, this ref allows detection of the
     * pre-existing focus state.
     */
    ref            : RefObject<TElement | null>
    
    /**
     * Event handler for focus events.
     * 
     * Used to signal that the component has received focus,
     * typically when `focused` prop is set to `'auto'` and `computedFocus` is not provided.
     */
    handleFocus    : FocusEventHandler<TElement>
    
    /**
     * Event handler for blur events.
     * 
     * Used to signal that the component has lost focus,
     * typically when `focused` prop is set to `'auto'` and `computedFocus` is not provided.
     */
    handleBlur     : FocusEventHandler<TElement>
    
    /**
     * Keydown handler to detect modality transitions while focused.
     * 
     * Used to catch cases where focus was established via mouse,
     * but the user begins interacting via keyboard — triggering `:focus-visible`.
     * 
     * This handler ensures that the focus ring becomes visible when appropriate,
     * even if the initial focus did not activate `:focus-visible`.
     * 
     * ✅ Lifecycle-safe: runs only while the element is focused
     * ✅ Performance-aware: skips evaluation if already visibly focused
     * ✅ Edge-case resilient:
     *   - Handles mouse-to-keyboard transitions (e.g. pressing [Space] or [Enter])
     *   - Ignores `[Tab]` transitions that shift focus away
     *   - Avoids redundant updates when already focused
     *   - Aligns with native browser behavior for `:focus-visible`
     */
    handleKeyDown  : KeyboardEventHandler<TElement>
}



/**
 * A list of focus/blur-related CSS variables used for focus-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface FocusStateVars {
    /**
     * References an animation used during the focusing transition.
     * It becomes invalid (`unset`) when not actively focusing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationFocusing : unknown
    
    /**
     * References an animation used during the blurring transition.
     * It becomes invalid (`unset`) when not actively blurring.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationBlurring : unknown
    
    /**
     * Applies when the component is either focusing or fully focused.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either focusing or fully focused:
     *     outline : `${focusStateVars.isFocused} 2px solid blue`,
     *     opacity : `${focusStateVars.isFocused} 100%`,
     * });
     * ```
     */
    isFocused         : unknown
    
    /**
     * Applies when the component is either blurring or fully blurred.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either blurring or fully blurred:
     *     outline : `${focusStateVars.isBlurred} none`,
     *     opacity : `${focusStateVars.isBlurred} 50%`,
     * });
     * ```
     */
    isBlurred         : unknown
    
    /**
     * A normalized, animatable factor representing the **focus lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled blurred
     * - **1**     : settled focused
     * - **0 → 1** : focusing transition (blurred → focused)
     * - **1 → 0** : blurring transition (focused → blurred)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `outline`, `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a focusing animation might interpolate `focusFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (focused), not the baseline (blurred).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `focusFactor = 0`: blurred (baseline lifecycle state)  
     *     - `focusFactor = 1`: focused (active lifecycle state)  
     */
    focusFactor       : unknown
    
    /**
     * A conditional mirror of `focusFactor` representing the **focus lifecycle state**.
     * Mirrors `focusFactor` during transitions and when fully focused, but is explicitly
     * set to `unset` once the component reaches its baseline blurred state.
     * 
     * ### Expected values:
     * - **unset** : settled blurred (baseline inactive, declaration dropped)
     * - **1**     : settled focused (mirrors `focusFactor`)
     * - **0 → 1** : focusing transition (mirrors `focusFactor`)
     * - **1 → 0** : blurring transition (mirrors `focusFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline blurred state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when blurred.
     * - During animations and in the fully focused state, `focusFactorCond` mirrors the numeric
     *   value of `focusFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (focused), not the baseline (blurred).  
     *   - Mirrors the active lifecycle state (focused) during transitions and when settled focused.  
     *   - Drops to `unset` only when fully blurred, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `focusFactorCond = unset`: settled blurred (baseline inactive, declaration dropped)
     *     - `focusFactorCond = 0`: blurred during transition (numeric interpolation)
     *     - `focusFactorCond = 1`: focused (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when focused, but conditionally drops to `unset` at baseline blurred.
     */
    focusFactorCond   : unknown
}



/**
 * Configuration options for customizing focus/blur animations.
 */
export interface CssFocusStateOptions {
    /**
     * Defines the animation to apply during the focusing transition.
     * 
     * When the `focused` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationFocusing ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the blurring transition.
     * 
     * When the `focused` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationBlurring ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the focus/blur animations based on current focused state.
 */
export interface CssFocusState {
    /**
     * Generates CSS rules that conditionally apply the focus/blur animations based on current focused state.
     * 
     * Typically used to toggle animation variables during focusing or blurring transitions.
     */
    focusStateRule : Lazy<CssRule>
    
    /**
     * Exposes focus/blur-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationFocusing` : Active during the focusing transition.
     * - `animationBlurring` : Active during the blurring transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    focusStateVars : CssVars<FocusStateVars>
}
