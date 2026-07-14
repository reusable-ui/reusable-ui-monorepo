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
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationDragging : unknown
    
    /**
     * References an animation used during the dropping transition.
     * It becomes invalid (`unset`) when not actively dropping.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
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
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
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
     */
    dragFactorCond    : unknown
    
    /**
     * Translates the draggable element to the current pointer position during dragging.
     * 
     * Provides the current horizontal offset (x axis) from the original grab point to the pointer position.
     * 
     * When multiplied by `dragFactor` (transitioning from 0 → 1 during dragging),
     * this offset creates a transition from the original position to the pointer position.
     * 
     * When the pointer position changes (during dragging),
     * the offset updates to maintain alignment with the pointer.
     * 
     * Useful for animation authors who need direct numeric horizontal offsets for
     * aligning the draggable element with the current pointer position during dragging.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use with `calc(... * 1px)` to apply as a pixel translation.
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
     * Translates the draggable element to the current pointer position during dragging.
     * 
     * Provides the current vertical offset (y axis) from the original grab point to the pointer position.
     * 
     * When the pointer position changes (during dragging),
     * the offset updates to maintain alignment with the pointer.
     * 
     * When multiplied by `dragFactor` (transitioning from 0 → 1 during dragging),
     * this offset creates a transition from the original position to the pointer position.
     * 
     * Useful for animation authors who need direct numeric vertical offsets for
     * aligning the draggable element with the current pointer position during dragging.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use with `calc(... * 1px)` to apply as a pixel translation.
     * 
     * @example
     * ```ts
     * export const draggableComponentStyle = () => style({
     *     // Translate the component vertically based on the relative drag offset:
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
