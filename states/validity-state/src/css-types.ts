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
 * A list of validity-related CSS variables used for validation-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ValidityStateVars {
    /**
     * References an animation used during the validating transition.
     * It becomes invalid (`unset`) when not actively validating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    validatingAnimation   : unknown
    
    /**
     * References an animation used during the invalidating transition.
     * It becomes invalid (`unset`) when not actively invalidating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    invalidatingAnimation : unknown
    
    /**
     * References an animation used during the unvalidating transition.
     * It becomes invalid (`unset`) when not actively unvalidating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    unvalidatingAnimation : unknown
    
    /**
     * Applies when the component is either validating or fully valid.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either validating or fully valid:
     *     backgroundColor : `${validityStateVars.isValid} green`,
     *     color           : `${validityStateVars.isValid} lightgreen`,
     * });
     * ```
     */
    isValid               : unknown
    
    /**
     * Applies when the component is either invalidating or fully invalid.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either invalidating or fully invalid:
     *     backgroundColor : `${validityStateVars.isInvalid} red`,
     *     color           : `${validityStateVars.isInvalid} pink`,
     * });
     * ```
     */
    isInvalid             : unknown
    
    /**
     * Applies when the component is either unvalidating or fully unvalidated.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either unvalidating or fully unvalidated:
     *     backgroundColor : `${validityStateVars.isUnvalidated} blue`,
     *     color           : `${validityStateVars.isUnvalidated} lightblue`,
     * });
     * ```
     */
    isUnvalidated         : unknown
    
    /**
     * Applies when the component has just transitioned from a valid state.
     * 
     * This variable is available only during the transition phase and becomes invalid once the animation completes.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component was previously valid:
     *     boxShadow : `${validityStateVars.wasValid} 0 0 0 2px lime`,
     * });
     * ```
     */
    wasValid              : unknown
    
    /**
     * Applies when the component has just transitioned from an invalid state.
     * 
     * This variable is available only during the transition phase and becomes invalid once the animation completes.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component was previously invalid:
     *     boxShadow : `${validityStateVars.wasInvalid} 0 0 0 2px crimson`,
     * });
     * ```
     */
    wasInvalid            : unknown
    
    /**
     * Applies when the component has just transitioned from an unvalidated state.
     * 
     * This variable is available only during the transition phase and becomes invalid once the animation completes.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component was previously unvalidated:
     *     boxShadow : `${validityStateVars.wasUnvalidated} 0 0 0 2px dodgerblue`,
     * });
     * ```
     */
    wasUnvalidated        : unknown
    
    /**
     * A normalized, animatable factor representing the **validity lifecycle state**.
     * 
     * ### Expected values:
     * - **0**         : settled unvalidated (unknown, unchecked)
     * - **+1**        : settled valid
     * - **-1**        : settled invalid
     * - **±1 → 0**    : unvalidating transition (valid/invalid → unvalidated)
     * - **0/-1 → +1** : validating transition (unvalidated/invalid → valid)
     * - **0/+1 → -1** : invalidating transition (unvalidated/valid → invalid)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `color`, `opacity`, `transform`, `scale`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a validating animation might interpolate `validityFactor` from 0/-1 → +1.
     * - Values outside the -1…+1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     */
    validityFactor        : unknown
    
    /**
     * A conditional mirror of `validityFactor` representing the **validity lifecycle state**.
     * Mirrors `validityFactor` during transitions and when fully valid/invalid, but is explicitly
     * set to `unset` once the component reaches its baseline unvalidated state.
     * 
     * ### Expected values:
     * - **unset**     : settled unvalidated (baseline inactive, declaration dropped)
     * - **+1**        : settled valid (mirrors `validityFactor`)
     * - **-1**        : settled invalid (mirrors `validityFactor`)
     * - **±1 → 0**    : unvalidating transition (mirrors `validityFactor`)
     * - **0/-1 → +1** : validating transition (mirrors `validityFactor`)
     * - **0/+1 → -1** : invalidating transition (mirrors `validityFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline unvalidated state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when unvalidated.
     * - During animations and in the fully valid/invalid states, `validityFactorCond` mirrors the numeric
     *   value of `validityFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `color`, `opacity`, `transform`, `scale`, etc.
     * - Values outside the -1…+1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     */
    validityFactorCond    : unknown
}



/**
 * Configuration options for customizing validity animations.
 */
export interface CssValidityStateOptions {
    /**
     * Defines the animation to apply during the validating transition.
     * 
     * When the `validity` state changes away from `valid`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    validatingAnimation   ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the invalidating transition.
     * 
     * When the `validity` state changes away from `invalid`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    invalidatingAnimation ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the unvalidating transition.
     * 
     * When the `validity` state changes away from `unvalidated`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    unvalidatingAnimation ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the validation animations based on current validity state.
 */
export interface CssValidityState {
    /**
     * Generates CSS rules that conditionally apply the validation animations based on current validity state.
     * 
     * Typically used to toggle animation variables during validating, invalidating, or unvalidating transitions.
     */
    validityStateRule : Lazy<CssRule>
    
    /**
     * Exposes validity-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `validatingAnimation`   : Active during the validating transition.
     * - `invalidatingAnimation` : Active during the invalidating transition.
     * - `unvalidatingAnimation` : Active during the unvalidating transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    validityStateVars : CssVars<ValidityStateVars>
}
