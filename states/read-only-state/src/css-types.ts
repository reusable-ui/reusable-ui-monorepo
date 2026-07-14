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
 * A list of editable/read-only-related CSS variables used for read-only-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ReadOnlyStateVars {
    /**
     * References an animation used during the thawing transition.
     * It becomes invalid (`unset`) when not actively thawing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationThawing   : unknown
    
    /**
     * References an animation used during the freezing transition.
     * It becomes invalid (`unset`) when not actively freezing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationFreezing  : unknown
    
    /**
     * Applies when the component is either thawing or fully editable.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either thawing or fully editable:
     *     backgroundColor : `${readOnlyStateVars.isEditable} blue`,
     *     cursor          : `${readOnlyStateVars.isEditable} text`,
     * });
     * ```
     */
    isEditable         : unknown
    
    /**
     * Applies when the component is either freezing or fully read-only.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either freezing or fully read-only:
     *     backgroundColor : `${readOnlyStateVars.isReadOnly} gray`,
     *     cursor          : `${readOnlyStateVars.isReadOnly} not-allowed`,
     * });
     * ```
     */
    isReadOnly         : unknown
    
    /**
     * A normalized, animatable factor representing the **read-only lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled editable
     * - **1**     : settled read-only
     * - **0 → 1** : freezing transition (editable → read-only)
     * - **1 → 0** : thawing transition (read-only → editable)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a freezing animation might interpolate `readOnlyFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     */
    readOnlyFactor     : unknown
    
    /**
     * A conditional mirror of `readOnlyFactor` representing the **read-only lifecycle state**.
     * Mirrors `readOnlyFactor` during transitions and when fully read-only, but is explicitly
     * set to `unset` once the component reaches its baseline editable state.
     * 
     * ### Expected values:
     * - **unset** : settled editable (baseline inactive, declaration dropped)
     * - **1**     : settled read-only (mirrors `readOnlyFactor`)
     * - **0 → 1** : freezing transition (mirrors `readOnlyFactor`)
     * - **1 → 0** : thawing transition (mirrors `readOnlyFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline editable state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when editable.
     * - During animations and in the fully read-only state, `readOnlyFactorCond` mirrors the numeric
     *   value of `readOnlyFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     */
    readOnlyFactorCond : unknown
}



/**
 * Configuration options for customizing editable/read-only animations.
 */
export interface CssReadOnlyStateOptions {
    /**
     * Defines the animation to apply during the thawing transition.
     * 
     * When the `readOnly` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationThawing  ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the freezing transition.
     * 
     * When the `readOnly` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationFreezing ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the editable/read-only animations based on current read-only state.
 */
export interface CssReadOnlyState {
    /**
     * Generates CSS rules that conditionally apply the editable/read-only animations based on current read-only state.
     * 
     * Typically used to toggle animation variables during thawing or freezing transitions.
     */
    readOnlyStateRule : Lazy<CssRule>
    
    /**
     * Exposes editable/read-only-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationThawing`  : Active during the thawing transition.
     * - `animationFreezing` : Active during the freezing transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    readOnlyStateVars : CssVars<ReadOnlyStateVars>
}
