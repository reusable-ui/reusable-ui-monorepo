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

// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeEventHandler,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateOptions,
    type FeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Props for controlling the editable/read-only state of the component.
 * 
 * Accepts an optional `readOnly` prop, defaulting to `false` (editable) when not provided.
 */
export interface ReadOnlyStateProps {
    /**
     * Specifies the current read-only state:
     * - `true`  : the component is read-only
     * - `false` : the component is editable
     * 
     * Defaults to `false` (editable).
     */
    readOnly        ?: boolean
    
    /**
     * Specifies whether the component can become read-only via parent context:
     * - `true`  : allows the component to be made read-only via parent context
     * - `false` : the component can only be made read-only directly via its own `readOnly` prop
     * 
     * Defaults to `true` (allows contextual read-only).
     */
    cascadeReadOnly ?: boolean
}

/**
 * Props for reporting updates to the editable/read-only state.
 * 
 * Typically used in editable components (e.g. Input, TextArea, Select) to notify external systems
 * when the resolved editable/read-only state changes—whether due to `readOnly` prop changes or contextual override.
 */
export interface ReadOnlyStateUpdateProps {
    /**
     * Reports the updated read-only state whenever it changes:
     * - `true`  → the component is now read-only
     * - `false` → the component is now editable
     * 
     * This is a passive notification; it does not request a change to the read-only state.
     */
    onReadOnlyUpdate ?: ValueChangeEventHandler<boolean, unknown>
}

/**
 * Props for listening lifecycle events triggered by editable/read-only phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface ReadOnlyStatePhaseEventProps {
    /**
     * Called when the thawing transition begins.
     */
    onThawingStart  ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the thawing transition completes.
     */
    onThawingEnd    ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the freezing transition begins.
     */
    onFreezingStart ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
    
    /**
     * Called when the freezing transition completes.
     */
    onFreezingEnd   ?: ValueChangeEventHandler<ReadOnlyPhase, unknown>
}

/**
 * Optional configuration options for customizing editable/read-only behavior and animation lifecycle.
 */
export interface ReadOnlyStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default read-only state when no `readOnly` prop is explicitly provided:
     * - `true`  : the component is read-only
     * - `false` : the component is editable
     * 
     * Defaults to `false` (editable).
     */
    defaultReadOnly        ?: boolean
    
    /**
     * Specifies the default cascade behavior when no `cascadeReadOnly` prop is explicitly provided:
     * - `true`  : allows the component to be made read-only via parent context
     * - `false` : the component can only be made read-only directly via its own `readOnly` prop
     * 
     * Defaults to `true` (allows contextual read-only).
     */
    defaultCascadeReadOnly ?: boolean
    
    /**
     * Defines the pattern used to identify editable/read-only-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the thawing/freezing transition lifecycle.
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
     * Defaults to `['thawing', 'freezing']`.
     */
    animationPattern       ?: FeedbackStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling      ?: FeedbackStateOptions<boolean>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the editable/read-only lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'editable'  ✍🏻 fully editable
 * - 'readonly'  🔏 fully read-only
 */
export type ResolvedReadOnlyPhase =
    | 'editable'
    | 'readonly'

/**
 * Represents the transitional phase of the editable/read-only lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'thawing'   🔄 transitioning toward editable
 * - 'freezing'  🔄 transitioning toward read-only
 */
export type TransitioningReadOnlyPhase =
    | 'thawing'
    | 'freezing'

/**
 * Represents the current transition phase of the editable/read-only lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'editable', 'readonly'
 * - Transitional: 'thawing', 'freezing'
 */
export type ReadOnlyPhase =
    | ResolvedReadOnlyPhase
    | TransitioningReadOnlyPhase

/**
 * A CSS class name reflecting the current editable/read-only phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type ReadOnlyClassname = `is-${ReadOnlyPhase}`

/**
 * An API for accessing the resolved editable/read-only state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ReadOnlyBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackBehaviorState<boolean, ReadOnlyPhase, ReadOnlyClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled editable/read-only state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the editable/read-only state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in read-only state
     * - `false` : the component has visually settled in editable state
     */
    readOnly          : boolean
    
    /**
     * The actual resolved editable/read-only state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `readOnly`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be read-only
     * - `false` : the component is intended to be editable
     */
    actualReadOnly    : boolean
    
    /**
     * The current transition phase of the editable/read-only lifecycle.
     * 
     * Reflects both transitional states (`thawing`, `freezing`) and resolved states (`editable`, `readonly`).
     */
    readOnlyPhase     : ReadOnlyPhase
    
    /**
     * A CSS class name reflecting the current editable/read-only phase.
     * 
     * Possible values:
     * - `'is-readonly'`
     * - `'is-freezing'`
     * - `'is-thawing'`
     * - `'is-editable'`
     */
    readOnlyClassname : ReadOnlyClassname
}



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
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationThawing   : unknown
    
    /**
     * References an animation used during the freezing transition.
     * It becomes invalid (`unset`) when not actively freezing.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
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
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (read-only), not the baseline (editable).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `readOnlyFactor = 0`: editable (baseline lifecycle state)  
     *     - `readOnlyFactor = 1`: read-only (active lifecycle state)  
     * - **Naming rationale:**  
     *   - `readOnlyFactor` instead of `editableFactor`: factors consistently use the *base form* of the active state (`disable`, `readOnly`, `expand`, etc.).  
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
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle state (read-only), not the baseline (editable).  
     *   - Mirrors the active lifecycle state (read-only) during transitions and when settled read-only.  
     *   - Drops to `unset` only when fully editable, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `readOnlyFactorCond = unset`: settled editable (baseline inactive, declaration dropped)
     *     - `readOnlyFactorCond = 0`: editable during transition (numeric interpolation)
     *     - `readOnlyFactorCond = 1`: read-only (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `readOnlyFactorCond` instead of `editableFactorCond`: factors consistently use the *base form* of the active state (`disable`, `readOnly`, `expand`, etc.).  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when read-only, but conditionally drops to `unset` at baseline editable.
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
