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
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    focusingAnimation : unknown
    
    /**
     * References an animation used during the blurring transition.
     * It becomes invalid (`unset`) when not actively blurring.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    blurringAnimation : unknown
    
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
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
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
    focusingAnimation ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the blurring transition.
     * 
     * When the `focused` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    blurringAnimation ?: CssKnownProps['animation']
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
     * - `focusingAnimation` : Active during the focusing transition.
     * - `blurringAnimation` : Active during the blurring transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    focusStateVars : CssVars<FocusStateVars>
}
