// React:
import {
    // Types:
    type CSSProperties,
    type PointerEventHandler,
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
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.



/**
 * Props for controlling the dragged/dropped state of the component.
 * 
 * Accepts an optional `dragged` prop, defaulting to `'auto'` (automatically determine drag state) when not provided.
 */
export interface DragStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState'>
{
    /**
     * Specifies the current drag state:
     * - `true`   : the component is dragged (placed to the pointer position and continuously follows it)
     * - `false`  : the component is dropped (placed at the target or original position)
     * - `'auto'` : automatically determine drag state
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as dropped (`false`), regardless of `dragged`.
     * - When re-enabled:
     *   - `'auto'` → follows the `computedDrag`.
     *   - Explicit (`true`/`false`) → follows the provided value directly.
     * - To enforce a "remain dropped until user re-drags" contract in these declarative modes,
     *   implementors must manage a persistent dropped state in their own logic (e.g. suppressing `true` until a new `pointerdown` event is observed).
     * 
     * Defaults to `'auto'` (automatically determine drag state).
     */
    dragged      ?: FeedbackStateProps<boolean>['effectiveState'] | 'auto'
    
    /**
     * The computed drag value used when `dragged` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM pointer events,
     * layout containment, or domain-specific logic. It is ignored when `dragged` is explicitly set.
     * 
     * Developers must supply `computedDrag` for correctness; otherwise, the component stays dropped.
     * Commonly supplied from the resolved `actualPressed` state returned by `usePressBehaviorState()` or alternatively
     * the returned value from `usePressState()`.
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as dropped (`false`), regardless of `computedDrag`.
     * - When re-enabled, the component resumes following the passed `computedDrag` value.
     * - To enforce a "remain dropped until user re-drags" contract in this mode,
     *   implementors must manage a persistent dropped state in their own logic (e.g. suppressing `true` until a new `pointerdown` event is observed).
     *   The returned state from `usePressBehaviorState()` or `usePressState()` already implements this persistence.
     * 
     * This property is intended for **component developers** who need to customize drag resolution.
     * For **application developers**, prefer using the `dragged` prop directly.
     */
    computedDrag ?: FeedbackStateProps<boolean>['effectiveState']
}

/**
 * Props for reporting updates to the drag state.
 * 
 * Typically used in draggable components (e.g. PickItem, slider ThumbButton, splitter GripHandle) to notify external systems
 * when the resolved drag state changes—whether due to user interaction, pointer events, or layout triggers.
 */
export interface DragStateUpdateProps
    extends
        // Bases:
        Omit<FeedbackStateUpdateProps<boolean>, 'onStateUpdate'>
{
    /**
     * Reports the updated drag state whenever it changes:
     * - `true`  → the component is now dragged (placed to the pointer position and continuously follows it)
     * - `false` → the component is now dropped (placed at the target or original position)
     * 
     * This is a passive notification; it does not request a change to the drag state.
     */
    onDragUpdate ?: FeedbackStateUpdateProps<boolean>['onStateUpdate']
}

/**
 * Props for listening to lifecycle events triggered by drag/drop phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface DragStatePhaseEventProps {
    /**
     * Called when the dragging transition begins.
     */
    onDraggingStart ?: ValueChangeEventHandler<DragPhase, unknown>
    
    /**
     * Called when the dragging transition completes.
     */
    onDraggingEnd   ?: ValueChangeEventHandler<DragPhase, unknown>
    
    /**
     * Called when the dropping transition begins.
     */
    onDroppingStart ?: ValueChangeEventHandler<DragPhase, unknown>
    
    /**
     * Called when the dropping transition completes.
     */
    onDroppingEnd   ?: ValueChangeEventHandler<DragPhase, unknown>
}

/**
 * Optional configuration options for customizing drag/drop behavior and animation lifecycle.
 */
export interface DragStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default drag state when no `dragged` prop is explicitly provided:
     * - `true`   : the component is dragged (placed to the pointer position and continuously follows it)
     * - `false`  : the component is dropped (placed at the target or original position)
     * - `'auto'` : automatically determine drag state
     * 
     * Defaults to `'auto'` (automatically determine drag state).
     */
    defaultDragged    ?: boolean | 'auto'
    
    /**
     * Specifies the fallback drag state when no effective drag value can be resolved:
     * - `true`  : the component is dragged (placed to the pointer position and continuously follows it)
     * - `false` : the component is dropped (placed at the target or original position)
     * 
     * This fallback applies when `dragged` prop is set to `'auto'` but no `computedDrag` is provided.
     * 
     * Defaults to `false` (dropped).
     */
    fallbackDragged  ?: boolean
    
    /**
     * Defines the pattern used to identify drag/drop-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the dragging/dropping transition lifecycle.
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
     * Defaults to `['dragging', 'dropping']`.
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
 * Represents the resolved (settled) phase of the drag/drop lifecycle.
 * 
 * These states indicate that the component has completed its transition
 * and is exactly at a stable position:
 * - 'dragged'  🎯 exactly at the pointer position, continuously following
 *               the pointer position with no animation/transition delay.
 *               Even if the pointer moves quickly, the component stays perfectly aligned (no lag).
 * - 'dropped'  ✅ baseline inactive position, placed at the target or original position after release.
 */
export type ResolvedDragPhase =
    | 'dragged'
    | 'dropped'

/**
 * Represents the transitional phase of the drag/drop lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'dragging'  🔄 transitioning toward the pointer position (initial grab).
 * - 'dropping'  🔄 transitioning back to the target or original position (release).
 */
export type TransitioningDragPhase =
    | 'dragging'
    | 'dropping'

/**
 * Represents the current transition phase of the drag/drop lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'dragged', 'dropped'
 * - Transitional: 'dragging', 'dropping'
 */
export type DragPhase =
    | ResolvedDragPhase
    | TransitioningDragPhase

/**
 * A CSS class name reflecting the current drag/drop phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type DragClassname = `is-${DragPhase}`

/**
 * Represents a 2D coordinate relative to a chosen origin.
 * 
 * Note:
 * - These are **physical coordinates** derived from pointer events.
 * - They are not logical layout values.
 * - Always recompute when the DOM changes.
 */
export interface DragPosition {
    /**
     * The horizontal coordinate relative to the viewport.
     */
    x : number
    
    /**
     * The vertical coordinate relative to the viewport.
     */
    y : number
}

/**
 * An API for accessing the resolved dragged/dropped state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface DragBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackBehaviorState<boolean, DragPhase, DragClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled dragged/dropped state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the dragged/dropped state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in dragged state (placed to the pointer position and continuously follows it)
     * - `false` : the component has visually settled in dropped state (placed at the target or original position)
     */
    dragged           : FeedbackBehaviorState<boolean, DragPhase, DragClassname, TElement>['state']
    
    /**
     * Represents how far the pointer has moved horizontally and vertically
     * from the original grab point inside the element to the current pointer position.
     * 
     * Live updates during dragging and remains at the last position during dropping.
     * 
     * This value may slightly lag behind the actual dragged intent due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Apply this as a translation (e.g. `transform: translate(...)`)
     * to move the element so the cursor remains aligned with the grab point.
     */
    dragOffset        : DragPosition
    
    /**
     * The actual resolved dragged/dropped state, regardless of animation state.
     * 
     * This reflects the current target state based on the latest intent.
     * Unlike `dragged`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be dragged (placed to the pointer position and continuously follows it)
     * - `false` : the component is intended to be dropped (placed at the target or original position)
     */
    actualDragged     : FeedbackBehaviorState<boolean, DragPhase, DragClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the drag/drop lifecycle.
     * 
     * Reflects both transitional states (`dragging`, `dropping`) and resolved states (`dragged`, `dropped`).
     */
    dragPhase         : FeedbackBehaviorState<boolean, DragPhase, DragClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current drag/drop phase.
     * 
     * Possible values:
     * - `'is-dropped'`
     * - `'is-dropping'`
     * - `'is-dragging'`
     * - `'is-dragged'`
     */
    dragClassname     : FeedbackBehaviorState<boolean, DragPhase, DragClassname, TElement>['transitionClassname']
    
    /**
     * A set of inline CSS variables that expose the current drag offsets.
     * 
     * Includes `--dr-dragOffsetX` and `--dr-dragOffsetY`, enabling animation authors to drive layout,
     * transitions, and directional inference directly from CSS.
     * 
     * The returned style object is referentially stable as long as the variable values remain unchanged.
     * This ensures predictable rendering behavior and avoids unnecessary re-renders in React.
     * 
     * These variables are updated synchronously and are safe to use in style definitions,
     * keyframes, and conditional selectors.
     */
    dragStyle         : CSSProperties
    
    /**
     * Event handler for pointerdown events.
     * 
     * Captures the initial grab offset inside the element.
     * 
     * Supports mouse, touch, and stylus inputs.
     */
    handlePointerDown : PointerEventHandler<TElement>
    
    /**
     * Event handler for pointermove events.
     * 
     * Updates the grab offset for the active pointer.
     * Especially important for stylus devices where pressure changes
     * may be reported via `pointermove` with/without coordinate changes.
     * 
     * Additional support for stylus devices:
     * When the initial `pointerdown` is very light and does not yet activate the drag-state,
     * subsequent `pointermove` events (with the same or slightly different coordinates) should refresh the grab point.
     * This increases the accuracy of the grab point for stylus devices when the activation happens at different coordinates than the initial `pointerdown`.
     */
    handlePointerMove : PointerEventHandler<TElement>
}



/**
 * A list of drag/drop-related CSS variables used for drag-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface DragStateVars {
    /**
     * References an animation used during the dragging transition.
     * It becomes invalid (`unset`) when not actively dragging.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationDragging : unknown
    
    /**
     * References an animation used during the dropping transition.
     * It becomes invalid (`unset`) when not actively dropping.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationDropping : unknown
    
    /**
     * Applies when the component is either in the dragging transition or fully dragged.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either in the dragging transition or fully dragged:
     *     opacity       : `${dragStateVars.isDragged} 0.5`,
     *     pointerEvents : `${dragStateVars.isDragged} none`,
     * });
     * ```
     */
    isDragged         : unknown
    
    /**
     * Applies when the component is either in the dropping transition or fully dropped.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either in the dropping transition or fully dropped:
     *     opacity       : `${dragStateVars.isDropped} 1`,
     *     pointerEvents : `${dragStateVars.isDropped} auto`,
     * });
     * ```
     */
    isDropped         : unknown
    
    /**
     * A normalized, animatable factor representing the **drag lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled dropped
     * - **1**     : settled dragged
     * - **0 → 1** : dragging transition (dropped → dragged)
     * - **1 → 0** : dropping transition (dragged → dropped)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `opacity`, `transform`, `color`, `box-shadow`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a dragging animation might interpolate `dragFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (dragged), not the baseline (dropped).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `dragFactor = 0`: dropped (baseline lifecycle state)  
     *     - `dragFactor = 1`: dragged (active lifecycle state)  
     */
    dragFactor        : unknown
    
    /**
     * A conditional mirror of `dragFactor` representing the **drag lifecycle state**.
     * Mirrors `dragFactor` during transitions and when fully dragged, but is explicitly
     * set to `unset` once the component reaches its baseline dropped state.
     * 
     * ### Expected values:
     * - **unset** : settled dropped (baseline inactive, declaration dropped)
     * - **1**     : settled dragged (mirrors `dragFactor`)
     * - **0 → 1** : dragging transition (mirrors `dragFactor`)
     * - **1 → 0** : dropping transition (mirrors `dragFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline dropped state.
     *   Example: gating `transform`, `opacity`, or other overrides that should disappear when dropped.
     * - During animations and in the fully dragged state, `dragFactorCond` mirrors the numeric
     *   value of `dragFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `transform`, `color`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (dragged), not the baseline (dropped).  
     *   - Mirrors the active lifecycle state (dragged) during transitions and when settled dragged.  
     *   - Drops to `unset` only when fully dropped, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `dragFactorCond = unset`: settled dropped (baseline inactive, declaration dropped)
     *     - `dragFactorCond = 0`: dropped during transition (numeric interpolation)
     *     - `dragFactorCond = 1`: dragged (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when dragged, but conditionally drops to `unset` at baseline dropped.
     */
    dragFactorCond    : unknown
    
    /**
     * Represents how far the pointer has moved horizontally
     * from the original grab point inside the element to the current pointer position.
     * 
     * Live updates during dragging and remains at the last position during dropping.
     * 
     * This value may slightly lag behind the actual dragged intent due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation state.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use this with `calc(... * 1px)` to apply as a pixel translation.
     * 
     * Useful for styling to align the component to the pointer position during dragging.
     * 
     * @example
     * ```ts
     * export const draggableComponentStyle = () => style({
     *     // Translate the component horizontally based on the relative drag offset:
     *     transform : `translateX(calc(${dragStateVars.dragOffsetX} * 1px))`,
     * });
     * ```
     */
    dragOffsetX       : unknown
    
    /**
     * Represents how far the pointer has moved vertically
     * from the original grab point inside the element to the current pointer position.
     * 
     * Live updates during dragging and remains at the last position during dropping.
     * 
     * This value may slightly lag behind the actual dragged intent due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation state.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use this with `calc(... * 1px)` to apply as a pixel translation.
     * 
     * Useful for styling to align the component to the pointer position during dragging.
     * 
     * @example
     * ```ts
     * export const draggableComponentStyle = () => style({
     *     // Translate the component horizontally based on the relative drag offset:
     *     transform : `translateY(calc(${dragStateVars.dragOffsetY} * 1px))`,
     * });
     * ```
     */
    dragOffsetY       : unknown
}



/**
 * Configuration options for customizing drag/drop animations.
 */
export interface CssDragStateOptions {
    /**
     * Defines the animation to apply during the dragging transition.
     * 
     * When the `dragged` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationDragging ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the dropping transition.
     * 
     * When the `dragged` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationDropping ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the drag/drop animations based on current dragged state.
 */
export interface CssDragState {
    /**
     * Generates CSS rules that conditionally apply the drag/drop animations based on current dragged state.
     * 
     * Typically used to toggle animation variables during dragging or dropping transitions.
     */
    dragStateRule : Lazy<CssRule>
    
    /**
     * Exposes drag/drop-related CSS variables for use in conditional styling.
     * 
     * Includes:
     * - `animationDragging` : Active during the dragging transition.
     * - `animationDropping` : Active during the dropping transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    dragStateVars : CssVars<DragStateVars>
}
