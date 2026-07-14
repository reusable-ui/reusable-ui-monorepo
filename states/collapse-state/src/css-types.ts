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
 * A list of expand/collapse-related CSS variables used for expansion-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface CollapseStateVars {
    /**
     * References an animation used during the expanding transition.
     * It becomes invalid (`unset`) when not actively expanding.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    expandingAnimation  : unknown
    
    /**
     * References an animation used during the collapsing transition.
     * It becomes invalid (`unset`) when not actively collapsing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    collapsingAnimation : unknown
    
    /**
     * Applies when the component is either expanding or fully expanded.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either expanding or fully expanded:
     *     blockSize : `${collapseStateVars.isExpanded} 100px`,
     *     opacity   : `${collapseStateVars.isExpanded} 100%`,
     * });
     * ```
     */
    isExpanded          : unknown
    
    /**
     * Applies when the component is either collapsing or fully collapsed.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is either collapsing or fully collapsed:
     *     blockSize : `${collapseStateVars.isCollapsed} 0px`,
     *     opacity   : `${collapseStateVars.isCollapsed} 0%`,
     * });
     * ```
     */
    isCollapsed         : unknown
    
    /**
     * A normalized, animatable factor representing the **expand/collapse lifecycle state**.
     * 
     * ### Expected values:
     * - **0**     : settled collapsed
     * - **1**     : settled expanded
     * - **0 → 1** : expanding transition (collapsed → expanded)
     * - **1 → 0** : collapsing transition (expanded → collapsed)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `height`, `opacity`, `transform`, `rotation`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, an expanding animation might interpolate `expandFactor` from 0 → 1.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     * 
     * ### Note:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     */
    expandFactor        : unknown
    
    /**
     * A conditional mirror of `expandFactor` representing the **expand/collapse lifecycle state**.
     * Mirrors `expandFactor` during transitions and when fully expanded, but is explicitly
     * set to `unset` once the component reaches its baseline collapsed state.
     * 
     * ### Expected values:
     * - **unset** : settled collapsed (baseline inactive, declaration dropped)
     * - **1**     : settled expanded (mirrors `expandFactor`)
     * - **0 → 1** : expanding transition (mirrors `expandFactor`)
     * - **1 → 0** : collapsing transition (mirrors `expandFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline collapsed state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when collapsed.
     * - During animations and in the fully expanded state, `expandFactorCond` mirrors the numeric
     *   value of `expandFactor`, ensuring smooth transitions and consistency.
     * - Applicable to numeric-based properties such as `opacity`, `color`, `transform`, `box-shadow`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating a dynamic rebound before settling.
     */
    expandFactorCond    : unknown
}



/**
 * Configuration options for customizing expand/collapse animations.
 */
export interface CssCollapseStateOptions {
    /**
     * Defines the animation to apply during the expanding transition.
     * 
     * When the `expanded` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    expandingAnimation  ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the collapsing transition.
     * 
     * When the `expanded` state changes away from `false`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    collapsingAnimation ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the expand/collapse animations based on current expanded state.
 */
export interface CssCollapseState {
    /**
     * Generates CSS rules that conditionally apply the expand/collapse animations based on current expanded state.
     * 
     * Typically used to toggle animation variables during expanding or collapsing transitions.
     */
    collapseStateRule : Lazy<CssRule>
    
    /**
     * Exposes expand/collapse-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `expandingAnimation`  : Active during the expanding transition.
     * - `collapsingAnimation` : Active during the collapsing transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    collapseStateVars : CssVars<CollapseStateVars>
}
