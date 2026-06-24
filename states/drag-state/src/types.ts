// React:
import {
    // Types:
    type CSSProperties,
    type PointerEventHandler,
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
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.



/**
 * Props for controlling the dragged/dropped state of the component.
 * 
 * Provides a declarative way to control whether the component is dragged or dropped,
 * along with an optional callback to synchronize when that state changes.
 * 
 * Accepts an optional `dragged` prop, defaulting to `'auto'` (automatically determine drag state) when not provided.
 */
export interface DragStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState' | 'onStateUpdate'>
{
    /**
     * Controls the current drag state:
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
    dragged         ?: FeedbackStateProps<boolean>['effectiveState'] | 'auto'
    
    /**
     * Synchronizes companion components whenever the resolved drag state changes:
     * - `true`  → the component is now dragged (placed to the pointer position and continuously follows it)
     * - `false` → the component is now dropped (placed at the target or original position)
     * 
     * This is a passive synchronization signal used to keep companion components
     * (e.g. Button, Toggle, Switch) aligned with the component's state.
     * 
     * Triggered on both initial render and subsequent changes.
     * 
     * ⚠️ Important: This callback must not directly or indirectly update the `dragged` prop,
     * otherwise an unwanted circular re-render may occur.
     */
    onDragUpdate    ?: FeedbackStateProps<boolean>['onStateUpdate']
    
    /**
     * The computed drag value used when `dragged` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on DOM pointer events,
     * layout containment, or domain-specific logic. It is ignored when `dragged` is explicitly set.
     * 
     * Developers must supply `computedDrag` for correctness; otherwise, the component stays dropped.
     * Commonly supplied from the resolved `actualPressed` state returned by `usePressState()` or alternatively
     * the returned value from `useResolvedPressed()`.
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as dropped (`false`), regardless of `computedDrag`.
     * - When re-enabled, the component resumes following the passed `computedDrag` value.
     * - To enforce a "remain dropped until user re-drags" contract in this mode,
     *   implementors must manage a persistent dropped state in their own logic (e.g. suppressing `true` until a new `pointerdown` event is observed).
     *   The returned state from `usePressState()` or `useResolvedPressed()` already implements this persistence.
     * 
     * This property is intended for **component developers** who need to customize drag resolution.
     * For **application developers**, prefer using the `dragged` prop directly.
     */
    computedDrag    ?: FeedbackStateProps<boolean>['effectiveState']
    
    
    
    /**
     * Called when the dragging transition begins.
     */
    onDraggingStart ?: ValueChangeHandler<DragPhase, unknown>
    
    /**
     * Called when the dragging transition completes.
     */
    onDraggingEnd   ?: ValueChangeHandler<DragPhase, unknown>
    
    /**
     * Called when the dropping transition begins.
     */
    onDroppingStart ?: ValueChangeHandler<DragPhase, unknown>
    
    /**
     * Called when the dropping transition completes.
     */
    onDroppingEnd   ?: ValueChangeHandler<DragPhase, unknown>
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
 * Represents a relative translation (delta) for a draggable element.
 * 
 * Note:
 * - These are **physical coordinates** (pixel deltas) derived directly from pointer events.
 * - They describe how far the pointer has moved from the original grab point along the x/y axes.
 * - Always recomputed whenever the cursor position changes during an active drag.
 * - They are not logical layout values.
 */
export interface DragOffset {
    /**
     * Horizontal delta in pixels.
     * Positive values move the element to the right,
     * negative values move it to the left.
     */
    x : number
    
    /**
     * Vertical delta in pixels.
     * Positive values move the element downward,
     * negative values move it upward.
     */
    y : number
}

/**
 * An API for accessing the resolved dragged/dropped state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface DragState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackState<boolean, DragPhase, DragClassname, TElement>,
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
    dragged           : FeedbackState<boolean, DragPhase, DragClassname, TElement>['state']
    
    /**
     * Translates the draggable element to the current pointer position during dragging.
     * 
     * Provides the current offset (x, y) from the original grab point to the pointer position.
     * 
     * When multiplied by `dragFactor` (transitioning from 0 → 1 during dragging),
     * these offsets create a transition from the original position to the pointer position.
     * 
     * When the pointer position changes (during dragging),
     * the offsets update to maintain alignment with the pointer.
     * 
     * Useful for animation authors who need direct numeric offsets for
     * aligning the draggable element with the current pointer position during dragging.
     */
    dragOffset        : DragOffset
    
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
    actualDragged     : FeedbackState<boolean, DragPhase, DragClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the drag/drop lifecycle.
     * 
     * Reflects both transitional states (`dragging`, `dropping`) and resolved states (`dragged`, `dropped`).
     */
    dragPhase         : FeedbackState<boolean, DragPhase, DragClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current drag/drop phase.
     * 
     * Possible values:
     * - `'is-dropped'`
     * - `'is-dropping'`
     * - `'is-dragging'`
     * - `'is-dragged'`
     */
    dragClassname     : FeedbackState<boolean, DragPhase, DragClassname, TElement>['transitionClassname']
    
    /**
     * Provides inline CSS variables for the draggable element
     * that expose the current drag offsets in a styling-friendly form.
     * 
     * The element receives `--dr-dragOffsetX` and `--dr-dragOffsetY`,
     * providing the translation from the original grab point to the current pointer position.
     * 
     * When multiplied by `dragFactor` (transitioning from 0 → 1 during dragging),
     * these offsets create a transition from the original position to the pointer position.
     * 
     * When the pointer position changes (during dragging),
     * the offsets update to maintain alignment with the pointer.
     * 
     * Useful for animation authors who need direct numeric offsets for
     * aligning the draggable element with the current pointer position during dragging.
     * 
     * The returned style object is referentially stable
     * when not actively dragging or if the pointer position remains unchanged (during dragging),
     * avoiding unnecessary re-renders.
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
