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
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationHovering   : unknown
    
    /**
     * References an animation used during the unhovering transition.
     * It becomes invalid (`unset`) when not actively unhovering.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
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
