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
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    pressingAnimation  : unknown
    
    /**
     * References an animation used during the releasing transition.
     * It becomes invalid (`unset`) when not actively releasing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    releasingAnimation : unknown
    
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
    
    /**
     * A normalized, animatable factor representing the **press lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled released
     * - **1**     : settled pressed
     * - **0 → 1** : pressing transition (released → pressed)
     * - **1 → 0** : releasing transition (pressed → released)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `background`, `transform`, `box-shadow`, `opacity`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a pressing animation might interpolate `pressFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     */
    pressFactor        : unknown
    
    /**
     * A conditional mirror of `pressFactor` representing the **press lifecycle state**.
     * Mirrors `pressFactor` during transitions and when fully pressed, but is explicitly
     * set to `unset` once the component reaches its baseline released state.
     * 
     * ### Expected values:
     * - **unset** : settled released (baseline inactive, declaration dropped)
     * - **1**     : settled pressed (mirrors `pressFactor`)
     * - **0 → 1** : pressing transition (mirrors `pressFactor`)
     * - **1 → 0** : releasing transition (mirrors `pressFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline released state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when released.
     * - During animations and in the fully pressed state, `pressFactorCond` mirrors the numeric
     *   value of `pressFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     */
    pressFactorCond    : unknown
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
    pressingAnimation  ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the releasing transition.
     * 
     * When the `pressed` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    releasingAnimation ?: CssKnownProps['animation']
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
     * - `pressingAnimation`  : Active during the pressing transition.
     * - `releasingAnimation` : Active during the releasing transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    pressStateVars : CssVars<PressStateVars>
}
