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

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateProps,
    type FeedbackStateUpdateProps,
    type FeedbackStateOptions,
    type FeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Props for controlling the hovered/unhovered state of the component.
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
        Omit<FeedbackStateProps<boolean>, 'effectiveState'>
{
    /**
     * Specifies the current hover state:
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
    hovered       ?: FeedbackStateProps<boolean>['effectiveState'] | 'auto'
    
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
    computedHover ?: FeedbackStateProps<boolean>['effectiveState']
}

/**
 * Props for reporting updates to the hover state.
 * 
 * Typically used in interactive components (e.g. Button, Select, MenuItem ) to notify external systems
 * when the resolved hover state changes—whether due to user interaction, pointer movement, or layout triggers.
 */
export interface HoverStateUpdateProps
    extends
        // Bases:
        Omit<FeedbackStateUpdateProps<boolean>, 'onStateUpdate'>
{
    /**
     * Reports the updated hover state whenever it changes:
     * - `true`  → the component is now hovered
     * - `false` → the component is now unhovered
     * 
     * This is a passive notification; it does not request a change to the hover state.
     */
    onHoverUpdate ?: FeedbackStateUpdateProps<boolean>['onStateUpdate']
}

/**
 * Props for listening lifecycle events triggered by hover/unhover phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface HoverStatePhaseEventProps {
    /**
     * Called when the hovering transition begins.
     */
    onHoveringStart   ?: ValueChangeEventHandler<HoverPhase, unknown>
    
    /**
     * Called when the hovering transition completes.
     */
    onHoveringEnd     ?: ValueChangeEventHandler<HoverPhase, unknown>
    
    /**
     * Called when the unhovering transition begins.
     */
    onUnhoveringStart ?: ValueChangeEventHandler<HoverPhase, unknown>
    
    /**
     * Called when the unhovering transition completes.
     */
    onUnhoveringEnd   ?: ValueChangeEventHandler<HoverPhase, unknown>
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
export interface HoverBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackBehaviorState<boolean, HoverPhase, HoverClassname, TElement>,
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
    hovered           : FeedbackBehaviorState<boolean, HoverPhase, HoverClassname, TElement>['state']
    
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
    actualHovered     : FeedbackBehaviorState<boolean, HoverPhase, HoverClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the hover/unhover lifecycle.
     * 
     * Reflects both transitional states (`hovering`, `unhovering`) and resolved states (`hovered`, `unhovered`).
     */
    hoverPhase        : FeedbackBehaviorState<boolean, HoverPhase, HoverClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current hover/unhover phase.
     * 
     * Possible values:
     * - `'is-unhovered'`
     * - `'is-unhovering'`
     * - `'is-hovering'`
     * - `'is-hovered'`
     */
    hoverClassname    : FeedbackBehaviorState<boolean, HoverPhase, HoverClassname, TElement>['transitionClassname']
    
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



/**
 * A list of hover/unhover-related CSS variables used for hover-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface HoverStateVars {
    /**
     * References an animation used during the hovering transition.
     * It becomes invalid (`unset`) when not actively hovering.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationHovering   : unknown
    
    /**
     * References an animation used during the unhovering transition.
     * It becomes invalid (`unset`) when not actively unhovering.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationUnhovering : unknown
    
    /**
     * Applies when the component is either hovering or fully hovered.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either hovering or fully hovered:
     *     outline : `${hoverStateVars.isHovered} 2px solid blue`,
     *     opacity : `${hoverStateVars.isHovered} 100%`,
     * });
     * ```
     */
    isHovered           : unknown
    
    /**
     * Applies when the component is either unhovering or fully unhovered.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either unhovering or fully unhovered:
     *     outline : `${hoverStateVars.isUnhovered} none`,
     *     opacity : `${hoverStateVars.isUnhovered} 50%`,
     * });
     * ```
     */
    isUnhovered         : unknown
    
    /**
     * A normalized, animatable factor representing the **hover lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled unhovered
     * - **1**     : settled hovered
     * - **0 → 1** : hovering transition (unhovered → hovered)
     * - **1 → 0** : unhovering transition (hovered → unhovered)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `outline`, `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a hovering animation might interpolate `hoverFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (hovered), not the baseline (unhovered).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `hoverFactor = 0`: unhovered (baseline lifecycle state)  
     *     - `hoverFactor = 1`: hovered (active lifecycle state)  
     */
    hoverFactor         : unknown
    
    /**
     * A conditional mirror of `hoverFactor` representing the **hover lifecycle state**.
     * Mirrors `hoverFactor` during transitions and when fully hovered, but is explicitly
     * set to `unset` once the component reaches its baseline unhovered state.
     * 
     * ### Expected values:
     * - **unset** : settled unhovered (baseline inactive, declaration dropped)
     * - **1**     : settled hovered (mirrors `hoverFactor`)
     * - **0 → 1** : hovering transition (mirrors `hoverFactor`)
     * - **1 → 0** : unhovering transition (mirrors `hoverFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline unhovered state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when unhovered.
     * - During animations and in the fully hovered state, `hoverFactorCond` mirrors the numeric
     *   value of `hoverFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (hovered), not the baseline (unhovered).  
     *   - Mirrors the active lifecycle state (hovered) during transitions and when settled hovered.  
     *   - Drops to `unset` only when fully unhovered, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `hoverFactorCond = unset`: settled unhovered (baseline inactive, declaration dropped)
     *     - `hoverFactorCond = 0`: unhovered during transition (numeric interpolation)
     *     - `hoverFactorCond = 1`: hovered (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when hovered, but conditionally drops to `unset` at baseline unhovered.
     */
    hoverFactorCond     : unknown
}



/**
 * Configuration options for customizing hover/unhover animations.
 */
export interface CssHoverStateOptions {
    /**
     * Defines the animation to apply during the hovering transition.
     * 
     * When the `hovered` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationHovering   ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the unhovering transition.
     * 
     * When the `hovered` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationUnhovering ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the hover/unhover animations based on current hovered state.
 */
export interface CssHoverState {
    /**
     * Generates CSS rules that conditionally apply the hover/unhover animations based on current hovered state.
     * 
     * Typically used to toggle animation variables during hovering or unhovering transitions.
     */
    hoverStateRule : Lazy<CssRule>
    
    /**
     * Exposes hover/unhover-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationHovering`   : Active during the hovering transition.
     * - `animationUnhovering` : Active during the unhovering transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    hoverStateVars : CssVars<HoverStateVars>
}
