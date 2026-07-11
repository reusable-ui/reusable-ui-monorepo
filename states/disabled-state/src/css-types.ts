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
 * A list of enabled/disabled-related CSS variables used for disabling-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface DisabledStateVars {
    /**
     * References an animation used during the enabling transition.
     * It becomes invalid (`unset`) when not actively enabling.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationEnabling  : unknown
    
    /**
     * References an animation used during the disabling transition.
     * It becomes invalid (`unset`) when not actively disabling.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationDisabling : unknown
    
    /**
     * Applies when the component is either enabling or fully enabled.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either enabling or fully enabled:
     *     backgroundColor : `${disabledStateVars.isEnabled} blue`,
     *     cursor          : `${disabledStateVars.isEnabled} pointer`,
     * });
     * ```
     */
    isEnabled          : unknown
    
    /**
     * Applies when the component is either disabling or fully disabled.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either disabling or fully disabled:
     *     backgroundColor : `${disabledStateVars.isDisabled} gray`,
     *     cursor          : `${disabledStateVars.isDisabled} not-allowed`,
     * });
     * ```
     */
    isDisabled         : unknown
    
    /**
     * A normalized, animatable factor representing the **disabled lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled enabled
     * - **1**     : settled disabled
     * - **0 → 1** : disabling transition
     * - **1 → 0** : enabling transition
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a disabling animation might interpolate `disabledFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (disabled), not the baseline (enabled).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `disabledFactor = 0`: enabled (baseline lifecycle state)  
     *     - `disabledFactor = 1`: disabled (active lifecycle state)  
     * - **Naming rationale:**  
     *   - `disabledFactor` instead of `disabledFactor`: factors consistently use the *base form* of the active state (`disabled`, `readOnly`, `expand`, etc.).  
     */
    disabledFactor     : unknown
    
    /**
     * A conditional mirror of `disabledFactor` representing the **disabled lifecycle state**.
     * Mirrors `disabledFactor` during transitions and when fully disabled, but is explicitly
     * set to `unset` once the component reaches its baseline enabled state.
     * 
     * ### Expected values:
     * - **unset** : settled enabled (baseline inactive, declaration dropped)
     * - **1**     : settled disabled (mirrors `disabledFactor`)
     * - **0 → 1** : disabling transition (mirrors `disabledFactor`)
     * - **1 → 0** : enabling transition (mirrors `disabledFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline enabled state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when enabled.
     * - During animations and in the fully disabled state, `disabledFactorCond` mirrors the numeric
     *   value of `disabledFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (disabled), not the baseline (enabled).  
     *   - Mirrors the active lifecycle state (disabled) during transitions and when settled disabled.  
     *   - Drops to `unset` only when fully enabled, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `disabledFactorCond = unset`: settled enabled (baseline inactive, declaration dropped)
     *     - `disabledFactorCond = 0`: enabled during transition (numeric interpolation)
     *     - `disabledFactorCond = 1`: disabled (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `disabledFactorCond` instead of `disabledFactorCond`: factors consistently use the *base form* of the active state (`disabled`, `readOnly`, `expand`, etc.).  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when disabled, but conditionally drops to `unset` at baseline enabled.
     */
    disabledFactorCond : unknown
}



/**
 * Configuration options for customizing enabled/disabled animations.
 */
export interface CssDisabledStateOptions {
    /**
     * Defines the animation to apply during the enabling transition.
     * 
     * When the `disabled` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationEnabling  ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the disabling transition.
     * 
     * When the `disabled` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationDisabling ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the enabled/disabled animations based on current disabled state.
 */
export interface CssDisabledState {
    /**
     * Generates CSS rules that conditionally apply the enabled/disabled animations based on current disabled state.
     * 
     * Typically used to toggle animation variables during enabling or disabling transitions.
     */
    disabledStateRule : Lazy<CssRule>
    
    /**
     * Exposes enabled/disabled-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationEnabling`  : Active during the enabling transition.
     * - `animationDisabling` : Active during the disabling transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    disabledStateVars : CssVars<DisabledStateVars>
}
