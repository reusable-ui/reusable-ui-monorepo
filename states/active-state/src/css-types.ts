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
 * A list of activate/deactivate-related CSS variables used for activation-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ActiveStateVars {
    /**
     * References an animation used during the activating transition.
     * It becomes invalid (`unset`) when not actively activating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationActivating   : unknown
    
    /**
     * References an animation used during the deactivating transition.
     * It becomes invalid (`unset`) when not actively deactivating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationDeactivating : unknown
    
    /**
     * Applies when the component is either activating or fully active.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either activating or fully active:
     *     fontWeight : `${activeStateVars.isActive} bold`,
     *     opacity    : `${activeStateVars.isActive} 100%`,
     * });
     * ```
     */
    isActive              : unknown
    
    /**
     * Applies when the component is either deactivating or fully inactive.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either deactivating or fully inactive:
     *     fontWeight : `${activeStateVars.isInactive} normal`,
     *     opacity    : `${activeStateVars.isInactive} 60%`,
     * });
     * ```
     */
    isInactive            : unknown
    
    /**
     * A normalized, animatable factor representing the **active lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled inactive
     * - **1**     : settled active
     * - **0 → 1** : activating transition (inactive → active)
     * - **1 → 0** : deactivating transition (active → inactive)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `color`, `opacity`, `transform`, `scale`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, an activating animation might interpolate `activeFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     */
    activeFactor          : unknown
    
    /**
     * A conditional mirror of `activeFactor` representing the **active lifecycle state**.
     * Mirrors `activeFactor` during transitions and when fully active, but is explicitly
     * set to `unset` once the component reaches its baseline inactive state.
     * 
     * ### Expected values:
     * - **unset** : settled inactive (baseline inactive, declaration dropped)
     * - **1**     : settled active (mirrors `activeFactor`)
     * - **0 → 1** : activating transition (mirrors `activeFactor`)
     * - **1 → 0** : deactivating transition (mirrors `activeFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline inactive state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when inactive.
     * - During animations and in the fully active state, `activeFactorCond` mirrors the numeric
     *   value of `activeFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     */
    activeFactorCond      : unknown
}



/**
 * Configuration options for customizing activate/deactivate animations.
 */
export interface CssActiveStateOptions {
    /**
     * Defines the animation to apply during the activating transition.
     * 
     * When the `active` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationActivating   ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the deactivating transition.
     * 
     * When the `active` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationDeactivating ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the activate/deactivate animations based on current active state.
 */
export interface CssActiveState {
    /**
     * Generates CSS rules that conditionally apply the activate/deactivate animations based on current active state.
     * 
     * Typically used to toggle animation variables during activating or deactivating transitions.
     */
    activeStateRule : Lazy<CssRule>
    
    /**
     * Exposes activate/deactivate-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationActivating`   : Active during the activating transition.
     * - `animationDeactivating` : Active during the deactivating transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    activeStateVars : CssVars<ActiveStateVars>
}
