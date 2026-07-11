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
 * A list of excitement-related CSS variables used for excitement-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ExciteStateVars {
    /**
     * References an animation used during the exciting activity.
     * It becomes invalid (`unset`) when no longer excited.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usingAnimationFeature();`
     */
    animationExciting : unknown
    
    /**
     * A normalized, animatable factor representing the **exciting activity state**.
     * 
     * ### Expected values:
     * - **0**                        : idle state (no activity)
     * - Oscillates between **0 ↔ 1** : exciting activity (a continuously changing movement value)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `scale`, `opacity`, `transform`, `color`, etc.
     * - Implementators are responsible for assigning movement values in their animations.
     *   For example, an exciting activity might interpolate `exciteFactor` between 0 ↔ 1,
     *   oscillating back and forth several times before settling.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating an over-exciting effect.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active activity state (exciting), not the baseline (idle).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `exciteFactor = 0`: idle (baseline activity state)  
     *     - `exciteFactor` oscillates between `0 ↔ 1`: exciting activity (active activity state)  
     */
    exciteFactor      : unknown
    
    /**
     * A conditional mirror of `exciteFactor` representing the **exciting activity state**.
     * Mirrors `exciteFactor` during active activities, but is explicitly
     * set to `unset` once the component returns to its baseline idle state.
     * 
     * ### Expected values:
     * - **unset**                    : idle state (no activity, declaration dropped)
     * - Oscillates between **0 ↔ 1** : exciting activity (a continuously changing movement value, mirrors `exciteFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline idle state.
     *   Example: gating `scale`, `opacity`, or other overrides that should disappear when idle.
     * - During active activities, `exciteFactorCond` mirrors the numeric
     *   value of `exciteFactor`, ensuring smooth movement and consistency.
     * - Applicable to numeric-based properties such as `scale`, `opacity`, `transform`, `color`, etc.
     * - Values outside the 0–1 range are allowed, and implementators must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 0`, `90%: 1.2`, `100%: 1`  
     *   The overshoot value `1.2` at `90%` is intentional, creating an over-exciting effect.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active activity state (exciting), not the baseline (idle).  
     *   - Mirrors the active activity state (exciting) during active activities.  
     *   - Drops to `unset` only when idle, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `exciteFactorCond = unset`: idle (baseline inactive, declaration dropped)
     *     - `exciteFactorCond` oscillates between `0 ↔ 1`: exciting activity (running active activity state)  
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during active activities,
     *     but conditionally drops to `unset` at baseline idle.
     */
    exciteFactorCond  : unknown
}



/**
 * Configuration options for customizing excitement animation.
 */
export interface CssExciteStateOptions {
    /**
     * Defines the animation to apply repeatedly while the component is in an excited state.
     * 
     * The animation should be designed for seamless continuity across iterations to ensure smooth and uninterrupted visual feedback.
     * 
     * The `useExciteState()` hook will replay the exciting animation as long as the `excited` prop remains `true`.
     * When the `excited` state changes away from `true`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationExciting ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the excitement animation based on current excited state.
 */
export interface CssExciteState {
    /**
     * Generates CSS rules that conditionally apply the excitement animation based on current excited state.
     * 
     * Typically used to toggle animation variables when the component is excited.
     */
    exciteStateRule : Lazy<CssRule>
    
    /**
     * Exposes excitement-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationExciting`: Active when the component is excited.
     * 
     * ⚠️ **Caution**: The `animationExciting` variable becomes invalid when the component is idle.
     * If used improperly, it can invalidate the entire CSS declaration.
     * Always wrap it with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    exciteStateVars : CssVars<ExciteStateVars>
}
