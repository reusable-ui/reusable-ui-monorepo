// React:
import {
    // Types:
    type RefObject,
    type MouseEventHandler,
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
 * Props for controlling the pressed/released state of the component.
 * 
 * Accepts an optional `pressed` prop, defaulting to `'auto'` (automatically determine press state) when not provided.
 * 
 * When `pressed` prop is set to `'auto'`, the component derives its press state from either:
 * - an externally provided `computedPress`, or
 * - internal press observer via `ref`, `handleMouseDown()`, and `handleMouseUp()` callbacks.
 */
export interface PressStateProps {
    /**
     * Specifies the current press state:
     * - `true`   : the component is pressed
     * - `false`  : the component is released
     * - `'auto'` : automatically determine press state
     * 
     * Defaults to `'auto'` (automatically determine press state).
     */
    pressed       ?: boolean | 'auto'
    
    /**
     * The derived press value used when `pressed` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM pointer events,
     * layout containment, or accessibility-driven logic. It is ignored when `pressed` is explicitly set.
     * 
     * If not provided, the component falls back to internal press observer via `ref`, `handleMouseDown()`, and `handleMouseUp()` callbacks.
     * 
     * This property is intended for **component developers** who need to customize press resolution.
     * For **application developers**, prefer using the `pressed` prop directly.
     */
    computedPress ?: boolean
}

/**
 * Props for reporting updates to the press state.
 * 
 * Typically used in interactive components (e.g. Button, Select, MenuItem ) to notify external systems
 * when the resolved press state changes—whether due to user interaction, pointer events, or layout triggers.
 */
export interface PressStateUpdateProps {
    /**
     * Reports the updated press state whenever it changes:
     * - `true`  → the component is now pressed
     * - `false` → the component is now released
     * 
     * This is a passive notification; it does not request a change to the press state.
     */
    onPressUpdate ?: ValueChangeEventHandler<boolean, unknown>
}

/**
 * Props for listening lifecycle events triggered by press/release phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface PressStatePhaseEventProps {
    /**
     * Called when the pressing transition begins.
     */
    onPressingStart  ?: ValueChangeEventHandler<PressPhase, unknown>
    
    /**
     * Called when the pressing transition completes.
     */
    onPressingEnd    ?: ValueChangeEventHandler<PressPhase, unknown>
    
    /**
     * Called when the releasing transition begins.
     */
    onReleasingStart ?: ValueChangeEventHandler<PressPhase, unknown>
    
    /**
     * Called when the releasing transition completes.
     */
    onReleasingEnd   ?: ValueChangeEventHandler<PressPhase, unknown>
}

/**
 * Optional configuration options for customizing press/release behavior and animation lifecycle.
 */
export interface PressStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<boolean>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * Specifies the default press state when no `pressed` prop is explicitly provided:
     * - `true`   : the component is pressed
     * - `false`  : the component is released
     * - `'auto'` : automatically determine press state
     * 
     * Defaults to `'auto'` (automatically determine press state).
     */
    defaultPressed    ?: boolean | 'auto'
    
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
 * An API for accessing the resolved pressed/released state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface PressBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates the current resolved press state.
     * This reflects the final diagnostic status, not the transitional intent.
     * 
     * Possible values:
     * - `true`  : the component is pressed
     * - `false` : the component is released
     */
    pressed         : boolean
    
    /**
     * The current transition phase of the press/release lifecycle.
     * 
     * Reflects both transitional states (`pressing`, `releasing`) and resolved states (`pressed`, `released`).
     */
    pressPhase      : PressPhase
    
    /**
     * A CSS class name reflecting the current press/release phase.
     * 
     * Possible values:
     * - `'is-released'`
     * - `'is-releasing'`
     * - `'is-pressing'`
     * - `'is-pressed'`
     */
    pressClassname  : `is-${PressPhase}`
    
    /**
     * Ref to the pressable DOM element.
     * 
     * Enables initial press detection and diagnostic tooling.
     * 
     * If the component is already pressed on mount (e.g. via pointer resting),
     * but React hasn't yet hydrated, this ref allows detection of the
     * pre-existing press state.
     */
    ref             : RefObject<TElement | null>
    
    /**
     * Event handler for mousedown events.
     * 
     * Used to signal that the pointer is pressing the component,
     * typically when `pressed` prop is set to `'auto'` and `computedPress` is not provided.
     */
    handleMouseDown : MouseEventHandler<TElement>
    
    /**
     * Event handler for mouseup events.
     * 
     * Used to signal that the pointer has released the component,
     * typically when `pressed` prop is set to `'auto'` and `computedPress` is not provided.
     */
    handleMouseUp   : MouseEventHandler<TElement>
}



/**
 * A list of press/release-related CSS variables used for press-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface PressStateVars {
    /**
     * References an animation used during the pressing transition.
     * It becomes invalid (`unset`) when not actively pressing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationPressing  : unknown
    
    /**
     * References an animation used during the releasing transition.
     * It becomes invalid (`unset`) when not actively releasing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationReleasing : unknown
    
    /**
     * Applies when the component is either pressing or fully pressed.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either pressing or fully pressed:
     *     backgroundColor : `${pressStateVars.isPressed} darkblue`,
     *     color           : `${pressStateVars.isPressed} black`,
     * });
     * ```
     */
    isPressed          : unknown
    
    /**
     * Applies when the component is either releasing or fully released.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either releasing or fully released:
     *     backgroundColor : `${pressStateVars.isReleased} blue`,
     *     color           : `${pressStateVars.isReleased} lightblue`,
     * });
     * ```
     */
    isReleased         : unknown
}



/**
 * Configuration options for customizing press/release animations.
 */
export interface CssPressStateOptions {
    /**
     * Defines the animation to apply during the pressing transition.
     * 
     * When the `pressed` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationPressing  ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the releasing transition.
     * 
     * When the `pressed` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationReleasing ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the press/release animations based on current pressed state.
 */
export interface CssPressState {
    /**
     * Generates CSS rules that conditionally apply the press/release animations based on current pressed state.
     * 
     * Typically used to toggle animation variables during pressing or releasing transitions.
     */
    pressStateRule : Lazy<CssRule>
    
    /**
     * Exposes press/release-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationPressing`  : Active during the pressing transition.
     * - `animationReleasing` : Active during the releasing transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    pressStateVars : CssVars<PressStateVars>
}
