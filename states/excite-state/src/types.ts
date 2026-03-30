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

// Reusable-ui states:
import {
    // Types:
    type ActivityStateProps,
    type ActivityStateChangeProps,
    type ActivityStateOptions,
    type ActivityBehaviorState,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/**
 * Props for controlling the excited state of the component.
 * 
 * Accepts an optional `excited` prop, defaulting to `false` when not provided.
 */
export interface ExciteStateProps
    extends
        // Bases:
        Omit<ActivityStateProps<boolean>, 'effectiveState'>
{
    /**
     * Specifies the current excited state:
     * - `true`  : the component is excited
     * - `false` : the component is idle
     * 
     * Defaults to `false` (idle).
     */
    excited         ?: ActivityStateProps<boolean>['effectiveState']
}

/**
 * Props for reporting proactive stop requests from the current excited state.
 * 
 * Signals intent to change the external `excited` state after an excitement animation cycle completes.
 */
export interface ExciteStateChangeProps
    extends
        // Bases:
        Omit<ActivityStateChangeProps<boolean>, 'onStateChange'>
{
    /**
     * Signals intent to change the external `excited` state after an excitement animation cycle completes.
     * Typically used to reset the external `excited` state.
     * 
     * The parent may choose to honor or ignore this request.
     */
    onExcitedChange ?: ActivityStateChangeProps<boolean>['onStateChange']
}

/**
 * Optional configuration options for customizing excitement behavior and animation lifecycle.
 */
export interface ExciteStateOptions
    extends
        // Bases:
        ActivityStateOptions<boolean>
{
    /**
     * Specifies the default excited state when no `excited` prop is explicitly provided:
     * - `true`  : the component is excited
     * - `false` : the component is idle
     * 
     * Defaults to `false` (idle).
     */
    defaultExcited    ?: boolean
    
    /**
     * Defines the pattern used to identify excite-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the exciting state lifecycle.
     * 
     * Supports:
     * - A string suffix (with word-boundary awareness)
     * - An array of suffixes
     * - A RegExp for advanced matching
     * 
     * Word-boundary behavior mimics regex `\b` semantics:
     * - If the matched pattern starts with a non-word character, it’s always considered boundary-safe.
     * - Otherwise, the character preceding the suffix must be a non-word character or undefined.
     * 
     * Defaults to `'exciting'`.
     */
    animationPattern  ?: ActivityStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: ActivityStateOptions<boolean>['animationBubbling']
}

/**
 * A CSS class name reflecting the current excited state.
 * 
 * Used for styling based on the current excited state.
 */
export type ExciteClassname = 'is-excited' | 'not-excited'

/**
 * An API for accessing the resolved excited state, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ExciteBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<ActivityBehaviorState<boolean, ExciteClassname, TElement>,
            | 'state'
            | 'actualState'
            | 'activityClassname'
        >
{
    /**
     * The current active excitement-animation state used for animation-aware rendering and behavioral coordination.
     * 
     * This reflects whether the excitement animation is actively running.
     * It may slightly lag behind the actual resolved state due to animation lifecycle timing.
     * 
     * Useful for styling and rendering decisions that depend on the visually active excitement-animation on screen.
     * 
     * Possible values:
     * - `true`  : the excitement animation is currently active
     * - `false` : the excitement animation is idle
     */
    excited         : ActivityBehaviorState<boolean, ExciteClassname, TElement>['state']
    
    /**
     * The actual resolved excitement state, regardless of animation state.
     * 
     * This reflects whether the component is intended to be excited.
     * Unlike `excited`, it updates immediately and does not wait for animation lifecycle.
     * 
     * Useful for logic that needs the latest excitement state without animation start/done delays.
     * 
     * Possible values:
     * - `true`  : the component is intended to be excited
     * - `false` : the component is intended to be idle
     */
    actualExcited   : ActivityBehaviorState<boolean, ExciteClassname, TElement>['actualState']
    
    /**
     * A CSS class name reflecting the resolved excitement state.
     * 
     * Possible values:
     * - `'is-excited'`
     * - `'not-excited'`
     */
    exciteClassname : ActivityBehaviorState<boolean, ExciteClassname, TElement>['activityClassname']
}



/**
 * A list of excite-related CSS variables used for excitement-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ExciteStateVars {
    /**
     * References an animation used during the exciting activity.
     * It becomes invalid (`unset`) when no longer excited.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
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
     * The `useExciteBehaviorState()` hook will replay the exciting animation as long as the `excited` prop remains `true`.
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
