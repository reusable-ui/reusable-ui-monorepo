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
 * A list of view-related CSS variables used for view-switching-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ViewStateVars {
    /**
     * References an animation used during the advancing (next) view transition.
     * It becomes invalid (`unset`) when not actively animating toward a higher index.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    viewAdvancingAnimation : unknown
    
    /**
     * References an animation used during the receding (previous) view transition.
     * It becomes invalid (`unset`) when not actively animating toward a lower index.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    viewRecedingAnimation  : unknown
    
    /**
     * Applies when the component is in a fully settled state (not transitioning between views).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is in a fully settled state:
     *     opacity : `${viewStateVars.isViewSettled} 100%`,
     *     scale   : `${viewStateVars.isViewSettled} 100%`,
     * });
     * ```
     */
    isViewSettled          : unknown
    
    /**
     * Applies when the component is currently advancing toward the next view (higher index).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is currently advancing toward the next view:
     *     opacity : `${viewStateVars.isViewAdvancing} 50%`,
     *     scale   : `${viewStateVars.isViewAdvancing} 80%`,
     * });
     * ```
     */
    isViewAdvancing        : unknown
    
    /**
     * Applies when the component is currently receding toward the previous view (lower index).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is currently receding toward the previous view:
     *     opacity : `${viewStateVars.isViewReceding} 50%`,
     *     scale   : `${viewStateVars.isViewReceding} 80%`,
     * });
     * ```
     */
    isViewReceding         : unknown
    
    /**
     * Applies when the component is currently transitioning, either advancing or receding between views.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is currently transitioning, either advancing or receding between views:
     *     opacity : `${viewStateVars.isViewTransitioning} 50%`,
     *     scale   : `${viewStateVars.isViewTransitioning} 80%`,
     * });
     * ```
     */
    isViewTransitioning    : unknown
    
    /**
     * The current settled or animating target view index of the component.
     * 
     * This value may slightly lag behind the actual resolved index due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation state.
     * Always resolves to a numeric unitless value.
     * 
     * Useful for index-based layout, directional styling, and animation targeting.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // Slide the correct view into place based on the current view index:
     *     translate : `calc(${viewStateVars.viewIndex} * -100%)`,
     * });
     * ```
     */
    viewIndex              : unknown
    
    /**
     * The previously settled view index before the most recent transition.
     * 
     * This value trails one step behind `viewIndex`.
     * It updates only after a transition completes, and persists even after settling.
     * When no prior view exists, it resolves to `unset`.
     * 
     * Useful for directional inference, layout comparisons, and transition-aware animations.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // Animate sliding from the previous view to the current view:
     *     ...keyframes('slide-view-advancing', {
     *         from : {
     *             translate : `calc(${viewStateVars.prevViewIndex} * -100%)`,
     *         },
     *         to   : {
     *             translate : `calc(${viewStateVars.viewIndex} * -100%)`,
     *         },
     *     }),
     * });
     * ```
     */
    prevViewIndex          : unknown
    
    /**
     * A normalized transient, animatable factor representing the **view-switching lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled single view (origin or destination)
     * - **0 → +1**: advancing transition (origin → next)
     * - **0 → -1**: receding transition (origin → previous)
     * 
     * ### Lifecycle:
     * - Starts at `0` (origin view).
     * - Interpolates toward `+1` or `-1` during transition.
     * - The factor **resets back to `0`** once the animation completes,
     *   to reflect the collapsed single-view rendering.
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `margin`, `transform`, `rotation`, `opacity`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, an advancing animation might interpolate `viewFactor` from 0 → +1.
     * - Values outside the -1…+1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     */
    viewFactor             : unknown
    
    /**
     * A conditional mirror of `viewFactor` representing the **view-switching lifecycle state**.
     * Mirrors `viewFactor` during advancing/receding transitions, but is explicitly
     * set to `unset` once the view is settled (baseline single-view rendering).
     * 
     * ### Expected values:
     * - **unset**   : settled single view (baseline inactive, declaration dropped)
     * - **0 → +1**  : advancing transition (mirrors `viewFactor`)
     * - **0 → -1**  : receding transition (mirrors `viewFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) once the view is settled.
     *   Example: gating `transform`, `opacity`, or other overrides that should disappear after transition.
     * - During animations, `viewFactorCond` mirrors the numeric value of `viewFactor`,
     *   ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `margin`, `transform`, `rotation`, `opacity`, etc.
     * - Values outside the -1…+1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     */
    viewFactorCond         : unknown
}



/**
 * Configuration options for customizing view-switching animations.
 */
export interface CssViewStateOptions {
    /**
     * Defines the animation to apply during the advancing (next) view transition.
     * 
     * When the `viewIndex` value changes to a lower index, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    viewAdvancingAnimation ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the receding (previous) view transition.
     * 
     * When the `viewIndex` value changes to a higher index, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    viewRecedingAnimation  ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the view-switching animations based on current view index.
 */
export interface CssViewState {
    /**
     * Generates CSS rules that conditionally apply the view-switching animations based on current view index.
     * 
     * Typically used to toggle animation variables during switching-forward or switching-backward transitions.
     */
    viewStateRule : Lazy<CssRule>
    
    /**
     * Exposes view-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `viewAdvancingAnimation` : Active during the advancing (next) view transition.
     * - `viewRecedingAnimation`  : Active during the receding (previous) view transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    viewStateVars : CssVars<ViewStateVars>
}
