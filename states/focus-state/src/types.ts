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
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for controlling the focused/blurred state of the component.
 * 
 * Accepts an optional `focused` prop, defaulting to `'auto'` (automatically determine focus state) when not provided.
 * 
 * When `focused` prop is set to `'auto'`, the component derives its focus state from either:
 * - an externally provided `computedFocus`, or
 * - internal focus observer via `ref`, `handleFocus()`, `handleBlur()`, and `handleKeyDown()` callbacks.
 */
export interface FocusStateProps {
    /**
     * Specifies the current focus state:
     * - `true`   : the component is focused
     * - `false`  : the component is blurred
     * - `'auto'` : automatically determine focus state
     * 
     * Disabled behavior:
     * - While `disabled`, the component is always treated as blurred (`false`), regardless of `focused`.
     * - When re‑enabled:
     *   - `'auto'` mode (internal focus observer): remains blurred until the user explicitly refocuses.
     *   - Explicit (`true`/`false`) or external (`computedFocus`): resumes following the provided value.
     * - To enforce a "remain blurred until user refocuses" contract in these declarative modes,
     *   implementors must manage a persistent blur in their own state (e.g. suppressing `true` until a new `focus` event is observed).
     * 
     * Defaults to `'auto'` (automatically determine focus state).
     */
    focused       ?: boolean | 'auto'
    
    /**
     * The derived focus value used when `focused` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM focus events,
     * keyboard navigation, or accessibility-driven logic. It is ignored when `focused` is explicitly set.
     * 
     * If not provided, the component falls back to internal focus observer via `ref`, `handleFocus()`, `handleBlur()`, and `handleKeyDown()` callbacks.
     * 
     * Disabled behavior:
     * - While `disabled`, the component is always treated as blurred (`false`), regardless of `computedFocus`.
     * - When re‑enabled, the component resumes following the passed `computedFocus` value.
     * - To enforce a "remain blurred until user refocuses" contract in this mode,
     * implementors must manage a persistent blur in their own state (e.g. suppressing `true` until a new `focus` event is observed).
     * 
     * This property is intended for **component developers** who need to customize focus resolution.
     * For **application developers**, prefer using the `focused` prop directly.
     */
    computedFocus ?: boolean
}

/**
 * Props for reporting updates to the focus state.
 * 
 * Typically used in interactive components (e.g. Button, Select, Input ) to notify external systems
 * when the resolved focus state changes—whether due to user interaction, keyboard navigation, or accessibility triggers.
 */
export interface FocusStateUpdateProps {
    /**
     * Reports the updated focus state whenever it changes:
     * - `true`  → the component is now focused
     * - `false` → the component is now blurred
     * 
     * This is a passive notification; it does not request a change to the focus state.
     */
    onFocusUpdate ?: ValueChangeEventHandler<boolean, unknown>
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
        Partial<Pick<AnimationStateOptions<boolean>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
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
    animationPattern  ?: AnimationStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: AnimationStateOptions<boolean>['animationBubbling']
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
 * An API for accessing the resolved focused/blurred state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface FocusBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
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
    focused        : boolean
    
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
    actualFocused  : boolean
    
    /**
     * The current transition phase of the focus/blur lifecycle.
     * 
     * Reflects both transitional states (`focusing`, `blurring`) and resolved states (`focused`, `blurred`).
     */
    focusPhase     : FocusPhase
    
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
    focusClassname : `is-${FocusPhase}` | `is-${FocusPhase} input-like-focus`
    
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
