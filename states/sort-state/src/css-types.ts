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
 * A list of sort-related CSS variables used for sorting-transition styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface SortStateVars {
    /**
     * References an animation used during sorting actions.
     * It becomes invalid (`unset`) when no sorting animation is running.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationSorting : unknown
    
    /**
     * A normalized, animatable factor representing the **sorting progress**.
     * 
     * ### Expected values:
     * - **1**     : unsorted illusion (items offset back to their original unsorted positions)
     * - **0**     : fully sorted baseline (items settled into their sorted positions)
     * - **1 → 0** : sorting progress (unsorted → sorted)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `translate`, `opacity`, `scale`, `color`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a sorting animation might interpolate `sortFactor` from 1 → 0.
     * - Values outside the 0–1 range are allowed, and implementors must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 1`, `90%: -0.2`, `100%: 0`  
     *   The undershoot value `-0.2` at `90%` is intentional, creating an "elastic" effect.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the sorting progress, not a persistent condition.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `sortFactor = 1`: active unsorted illusion  
     *     - `sortFactor = 0`: idle, fully sorted baseline
     */
    sortFactor       : unknown
    
    /**
     * A conditional mirror of `sortFactor` representing the **sorting progress**.
     * Mirrors `sortFactor` during animation, but is explicitly
     * set to `unset` once the animation completes.
     * 
     * ### Expected values:
     * - **1**     : unsorted illusion (items offset back to their original unsorted positions, mirrors `sortFactor`)
     * - **unset** : fully sorted baseline (items settled into their sorted positions, declaration dropped)
     * - **1 → 0** : sorting progress (unsorted → sorted)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) once idle.
     *   Example: gating `translate`, `opacity`, or other overrides that should disappear when idle.
     * - During animation, `sortFactorCond` mirrors the numeric
     *   value of `sortFactor`, ensuring smooth progress and consistency.
     * - Applicable to numeric-based properties such as `translate`, `opacity`, `scale`, `color`, etc.
     * - Values outside the 0–1 range are allowed, and implementors must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 1`, `90%: -0.2`, `100%: 0`  
     *   The undershoot value `-0.2` at `90%` is intentional, creating an over-trip effect.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the sorting progress, not a persistent condition.  
     *   - Mirrors the sorting progress while the animation is running.  
     *   - Drops to `unset` only when idle, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `sortFactorCond = 1`: active unsorted illusion  
     *     - `sortFactorCond = unset`: idle (fully sorted baseline, declaration dropped)  
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor while the animation is running,
     *     but conditionally drops to `unset` at baseline idle.
     */
    sortFactorCond   : unknown
    
    /**
     * Translates the current sortable element back to its **unsorted position**.
     * 
     * Provides the raw horizontal delta (x axis) for this element,
     * translating from its sorted placement to its original unsorted coordinate.
     * 
     * When multiplied by `sortFactor` (transitioning from 1 → 0),
     * this offset creates the illusion that the item remains in its unsorted position
     * while gradually settling into its sorted order.
     * 
     * Useful for animation authors who need direct numeric deltas for
     * driving custom sorting transitions.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use with `calc(... * 1px)` to apply as a pixel translation.
     * 
     * @example
     * ```ts
     * export const sortableComponentItemStyle = () => style({
     *     // Translate the item horizontally back to its unsorted position:
     *     transform : `translateX(calc(${sortStateVars.sortOffsetX} * 1px))`,
     * });
     * ```
     */
    sortOffsetX      : unknown
    
    /**
     * Translates the current sortable element back to its **unsorted position**.
     * 
     * Provides the raw vertical delta (y axis) for this element,
     * translating from its sorted placement to its original unsorted coordinate.
     * 
     * When multiplied by `sortFactor` (transitioning from 1 → 0),
     * this offset creates the illusion that the item remains in its unsorted position
     * while gradually settling into its sorted order.
     * 
     * Useful for animation authors who need direct numeric deltas for
     * driving custom sorting transitions.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use with `calc(... * 1px)` to apply as a pixel translation.
     * 
     * @example
     * ```ts
     * export const sortableComponentItemStyle = () => style({
     *     // Translate the item vertically back to its unsorted position:
     *     transform : `translateY(calc(${sortStateVars.sortOffsetY} * 1px))`,
     * });
     * ```
     */
    sortOffsetY      : unknown
}



/**
 * Configuration options for customizing sorting transitions.
 */
export interface CssSortStateOptions {
    /**
     * Defines the animation to apply during sorting actions.
     * 
     * When the `stagedSortData` prop changes, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationSorting ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the sorting transition whenever a sorting action occurs.
 */
export interface CssSortState {
    /**
     * Generates CSS rules that conditionally apply the sorting transition whenever a sorting action occurs.
     * 
     * Typically used to toggle animation variables during sorting actions.
     */
    sortStateRule : Lazy<CssRule>
    
    /**
     * Exposes sort-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationSorting`: Active during sorting actions.
     * 
     * ⚠️ **Caution**: The `animationSorting` variable becomes invalid when the component is idle.
     * If used improperly, it can invalidate the entire CSS declaration.
     * Always wrap it with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    sortStateVars : CssVars<SortStateVars>
}
