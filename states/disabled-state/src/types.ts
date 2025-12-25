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
 * Props for controlling the enabled/disabled state of the component.
 * 
 * Accepts an optional `disabled` prop, defaulting to `false` (enabled) when not provided.
 */
export interface DisabledStateProps {
    /**
     * Specifies the current disabled state:
     * - `true`  : the component is disabled
     * - `false` : the component is enabled
     * 
     * Defaults to `false` (enabled).
     */
    disabled        ?: boolean
    
    /**
     * Specifies whether the component can be disabled via parent context:
     * - `true`  : allows the component to be disabled via parent context
     * - `false` : the component can only be disabled directly via its own `disabled` prop
     * 
     * Defaults to `true` (allows contextual disabling).
     */
    cascadeDisabled ?: boolean
}

/**
 * Props for reporting updates to the enabled/disabled state.
 * 
 * Typically used in interactive components (e.g. Button, Input, Select) to notify external systems
 * when the resolved enabled/disabled state changes—whether due to `disabled` prop changes or contextual override.
 */
export interface DisabledStateUpdateProps {
    /**
     * Reports the updated disabled state whenever it changes:
     * - `true`  → the component is now disabled
     * - `false` → the component is now enabled
     * 
     * This is a passive notification; it does not request a change to the disabled state.
     */
    onDisabledUpdate ?: ValueChangeEventHandler<boolean, unknown>
}

/**
 * Props for listening lifecycle events triggered by enable/disable phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface DisabledStatePhaseEventProps {
    /**
     * Called when the enabling transition begins.
     */
    onEnablingStart  ?: ValueChangeEventHandler<DisabledPhase, unknown>
    
    /**
     * Called when the enabling transition completes.
     */
    onEnablingEnd    ?: ValueChangeEventHandler<DisabledPhase, unknown>
    
    /**
     * Called when the disabling transition begins.
     */
    onDisablingStart ?: ValueChangeEventHandler<DisabledPhase, unknown>
    
    /**
     * Called when the disabling transition completes.
     */
    onDisablingEnd   ?: ValueChangeEventHandler<DisabledPhase, unknown>
}

/**
 * Optional configuration options for customizing enable/disable behavior and animation lifecycle.
 */
export interface DisabledStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Specifies the default disabled state when no `disabled` prop is explicitly provided:
     * - `true`  : the component is disabled
     * - `false` : the component is enabled
     * 
     * Defaults to `false` (enabled).
     */
    defaultDisabled        ?: boolean
    
    /**
     * Specifies the default cascade behavior when no `cascadeDisabled` prop is explicitly provided:
     * - `true`  : allows the component to be disabled via parent context
     * - `false` : the component can only be disabled directly via its own `disabled` prop
     * 
     * Defaults to `true` (allows contextual disabling).
     */
    defaultCascadeDisabled ?: boolean
    
    /**
     * Defines the pattern used to identify enable/disable-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the enabling/disabling transition lifecycle.
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
     * Defaults to `['enabling', 'disabling']`.
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
 * Represents the resolved (settled) phase of the enable/disable lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'enabled'   ☂️ fully enabled
 * - 'disabled'  🌂 fully disabled
 */
export type ResolvedDisabledPhase =
    | 'enabled'
    | 'disabled'

/**
 * Represents the transitional phase of the enable/disable lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'enabling'  🔄 transitioning toward enabled
 * - 'disabling' 🔄 transitioning toward disabled
 */
export type TransitioningDisabledPhase =
    | 'enabling'
    | 'disabling'

/**
 * Represents the current transition phase of the enable/disable lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'enabled', 'disabled'
 * - Transitional: 'enabling', 'disabling'
 */
export type DisabledPhase =
    | ResolvedDisabledPhase
    | TransitioningDisabledPhase

/**
 * A CSS class name reflecting the current enable/disable phase.
 * 
 * Used for styling based on the lifecycle phase.
 */
export type DisabledClassname = `is-${DisabledPhase}`

/**
 * An API for accessing the resolved enabled/disabled state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface DisabledBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackBehaviorState<boolean, DisabledPhase, DisabledClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled enabled/disabled state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the enabled/disabled state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in disabled state
     * - `false` : the component has visually settled in enabled state
     */
    disabled          : boolean
    
    /**
     * The actual resolved enabled/disabled state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `disabled`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be disabled
     * - `false` : the component is intended to be enabled
     */
    actualDisabled    : boolean
    
    /**
     * The current transition phase of the enable/disable lifecycle.
     * 
     * Reflects both transitional states (`enabling`, `disabling`) and resolved states (`enabled`, `disabled`).
     */
    disabledPhase     : DisabledPhase
    
    /**
     * A CSS class name reflecting the current enable/disable phase.
     * 
     * Possible values:
     * - `'is-disabled'`
     * - `'is-disabling'`
     * - `'is-enabling'`
     * - `'is-enabled'`
     */
    disabledClassname : DisabledClassname
}



/**
 * A list of enable/disable-related CSS variables used for disabling-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface DisabledStateVars {
    /**
     * References an animation used during the enabling transition.
     * It becomes invalid (`unset`) when not actively enabling.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationEnabling  : unknown
    
    /**
     * References an animation used during the disabling transition.
     * It becomes invalid (`unset`) when not actively disabling.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
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
     *   For example, a disabling animation might interpolate `disableFactor` from 0 → 1.
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
     *     - `disableFactor = 0`: enabled (baseline lifecycle state)  
     *     - `disableFactor = 1`: disabled (active lifecycle state)  
     * - **Naming rationale:**  
     *   - `disableFactor` instead of `disabledFactor`: factors consistently use the *base form* of the active state (`disable`, `readOnly`, `expand`, etc.).  
     */
    disableFactor      : unknown
    
    /**
     * A conditional mirror of `disableFactor` representing the **disabled lifecycle state**.
     * Mirrors `disableFactor` during transitions and when fully disabled, but is explicitly
     * set to `unset` once the component reaches its baseline enabled state.
     * 
     * ### Expected values:
     * - **unset** : settled enabled (baseline inactive, declaration dropped)
     * - **1**     : settled disabled (mirrors `disableFactor`)
     * - **0 → 1** : disabling transition (mirrors `disableFactor`)
     * - **1 → 0** : enabling transition (mirrors `disableFactor`)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) in the baseline enabled state.
     *   Example: gating `filter`, `color-mix`, or other overrides that should disappear when enabled.
     * - During animations and in the fully disabled state, `disableFactorCond` mirrors the numeric
     *   value of `disableFactor`, ensuring smooth transitions and consistency.
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
     *     - `disableFactorCond = unset`: settled enabled (baseline inactive, declaration dropped)
     *     - `disableFactorCond = 0`: enabled during transition (numeric interpolation)
     *     - `disableFactorCond = 1`: disabled (settled active lifecycle state)  
     * - **Naming rationale:**  
     *   - `disableFactorCond` instead of `disabledFactorCond`: factors consistently use the *base form* of the active state (`disable`, `readOnly`, `expand`, etc.).  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when disabled, but conditionally drops to `unset` at baseline enabled.
     */
    disableFactorCond  : unknown
}



/**
 * Configuration options for customizing enable/disable animations.
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
 * Provides a CSS API for conditionally apply the enable/disable animations based on current disabled state.
 */
export interface CssDisabledState {
    /**
     * Generates CSS rules that conditionally apply the enable/disable animations based on current disabled state.
     * 
     * Typically used to toggle animation variables during enabling or disabling transitions.
     */
    disabledStateRule : Lazy<CssRule>
    
    /**
     * Exposes enable/disable-related CSS variables for conditional animation.
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
