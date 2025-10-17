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
 * Props for controlling the hovered/leaved state of the component.
 * 
 * Accepts an optional `hovered` prop, defaulting to `'auto'` (automatically determine hover state) when not provided.
 * 
 * When `hovered` prop is set to `'auto'`, the component derives its hover state from either:
 * - an externally provided `computedHover`, or
 * - internal hover observer via `ref`, `handleMouseEnter()`, and `handleMouseLeave()` callbacks.
 */
export interface HoverStateProps {
    /**
     * Specifies the current hover state:
     * - `true`   : the component is hovered
     * - `false`  : the component is leaved
     * - `'auto'` : automatically determine hover state
     * 
     * Defaults to `'auto'` (automatically determine hover state).
     */
    hovered       ?: boolean | 'auto'
    
    /**
     * The derived hover value used when `hovered` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM pointer events,
     * layout containment, or accessibility-driven logic. It is ignored when `hovered` is explicitly set.
     * 
     * If not provided, the component falls back to internal hover observer via `ref`, `handleMouseEnter()`, and `handleMouseLeave()` callbacks.
     * 
     * This property is intended for **component developers** who need to customize hover resolution.
     * For **application developers**, prefer using the `hovered` prop directly.
     */
    computedHover ?: boolean
}

/**
 * Props for reporting updates to the hover state.
 * 
 * Typically used in interactive components (e.g. Button, Select, MenuItem ) to notify external systems
 * when the resolved hover state changes—whether due to user interaction, pointer movement, or layout triggers.
 */
export interface HoverStateUpdateProps {
    /**
     * Reports the updated hover state whenever it changes:
     * - `true`  → the component is now hovered
     * - `false` → the component is now leaved
     * 
     * This is a passive notification; it does not request a change to the hover state.
     */
    onHoverUpdate ?: ValueChangeEventHandler<boolean, unknown>
}

/**
 * Props for listening lifecycle events triggered by hover/leave phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface HoverStatePhaseEventProps {
    /**
     * Called when the hovering transition begins.
     */
    onHoveringStart ?: ValueChangeEventHandler<HoverPhase, unknown>
    
    /**
     * Called when the hovering transition completes.
     */
    onHoveringEnd   ?: ValueChangeEventHandler<HoverPhase, unknown>
    
    /**
     * Called when the leaving transition begins.
     */
    onLeavingStart  ?: ValueChangeEventHandler<HoverPhase, unknown>
    
    /**
     * Called when the leaving transition completes.
     */
    onLeavingEnd    ?: ValueChangeEventHandler<HoverPhase, unknown>
}

/**
 * Optional configuration options for customizing hover/leave behavior and animation lifecycle.
 */
export interface HoverStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<boolean>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * Specifies the default hover state when no `hovered` prop is explicitly provided:
     * - `true`   : the component is hovered
     * - `false`  : the component is leaved
     * - `'auto'` : automatically determine hover state
     * 
     * Defaults to `'auto'` (automatically determine hover state).
     */
    defaultHovered    ?: boolean | 'auto'
    
    /**
     * Defines the pattern used to identify hover/leave-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the hovering/leaving transition lifecycle.
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
     * Defaults to `['hovering', 'leaving']`.
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
 * Represents the resolved (settled) phase of the hover/leave lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'hovered'  🖱️ fully hovered
 * - 'leaved'   🌫️ fully leaved
 */
export type ResolvedHoverPhase =
    | 'hovered'
    | 'leaved'

/**
 * Represents the transitional phase of the hover/leave lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'hovering' 🔄 transitioning toward hovered
 * - 'leaving'  🔄 transitioning toward leaved
 */
export type TransitioningHoverPhase =
    | 'hovering'
    | 'leaving'

/**
 * Represents the current transition phase of the hover/leave lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'hovered', 'leaved'
 * - Transitional: 'hovering', 'leaving'
 */
export type HoverPhase =
    | ResolvedHoverPhase
    | TransitioningHoverPhase

/**
 * An API for accessing the resolved hovered/leaved state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface HoverBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates the current resolved hover state.
     * This reflects the final diagnostic status, not the transitional intent.
     * 
     * Possible values:
     * - `true`  : the component is hovered
     * - `false` : the component is leaved
     */
    hovered           : boolean
    
    /**
     * The current transition phase of the hover/leave lifecycle.
     * 
     * Reflects both transitional states (`hovering`, `leaving`) and resolved states (`hovered`, `leaved`).
     */
    hoverPhase        : HoverPhase
    
    /**
     * A CSS class name reflecting the current hover/leave phase.
     * 
     * Possible values:
     * - `'is-leaved'`
     * - `'is-leaving'`
     * - `'is-hovering'`
     * - `'is-hovered'`
     */
    hoverClassname    : `is-${HoverPhase}`
    
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
 * A list of hover/leave-related CSS variables used for hover-aware styling.
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
    animationHovering : unknown
    
    /**
     * References an animation used during the leaving transition.
     * It becomes invalid (`unset`) when not actively leaving.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationLeaving  : unknown
    
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
    isHovered         : unknown
    
    /**
     * Applies when the component is either leaving or fully leaved.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either leaving or fully leaved:
     *     outline : `${hoverStateVars.isLeaved} none`,
     *     opacity : `${hoverStateVars.isLeaved} 50%`,
     * });
     * ```
     */
    isLeaved          : unknown
}



/**
 * Configuration options for customizing hover/leave animations.
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
    animationHovering ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the leaving transition.
     * 
     * When the `hovered` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationLeaving  ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the hover/leave animations based on current hovered state.
 */
export interface CssHoverState {
    /**
     * Generates CSS rules that conditionally apply the hover/leave animations based on current hovered state.
     * 
     * Typically used to toggle animation variables during hovering or leaving transitions.
     */
    hoverStateRule : Lazy<CssRule>
    
    /**
     * Exposes hover/leave-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationHovering` : Active during the hovering transition.
     * - `animationLeaving`  : Active during the leaving transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    hoverStateVars : CssVars<HoverStateVars>
}
