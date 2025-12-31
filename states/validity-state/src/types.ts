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
    type FeedbackStateProps,
    type FeedbackStateUpdateProps,
    type FeedbackStateOptions,
    type FeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Props for controlling the validity state of the component.
 * 
 * Accepts an optional `validity` prop, defaulting to `'auto'` (automatically determine validity state) when not provided.
 */
export interface ValidityStateProps
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean | null>, 'effectiveState'>
{
    /**
     * Specifies the current validity state:
     * - `true`   : the component is valid
     * - `false`  : the component is invalid
     * - `null`   : the component is unvalidated
     * - `'auto'` : automatically determine validity state
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, the component is always treated as invalid (`false`), regardless of `validity`.
     * - When restriction is lifted:
     *   - `'auto'` mode (external validity recomputation): immediately re-evaluates based on the provided `computedValidity`.
     *   - Explicit (`true`/`false`/`null`) or external (`computedValidity`): resumes following the provided value.
     * 
     * Defaults to `'auto'` (automatically determine validity state).
     */
    validity         ?: FeedbackStateProps<boolean | null>['effectiveState'] | 'auto'
    
    /**
     * The derived validity value used when `validity` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on input, async validation,
     * or domain-specific logic. It is ignored when `validity` is explicitly set.
     * 
     * Restricted behavior (`disabled` or `readonly`):
     * - When restricted, the component is always treated as invalid (`false`), regardless of `computedValidity`.
     * - When restriction is lifted, the component resumes following the passed `computedValidity` value.
     * 
     * This property is intended for **component developers** who need to customize validity resolution.
     * For **application developers**, prefer using the `validity` prop directly.
     */
    computedValidity ?: FeedbackStateProps<boolean | null>['effectiveState']
}

/**
 * Props for reporting updates to the validity state.
 * 
 * Typically used in editable components (e.g. Input, Select, Option) to notify external systems
 * when the resolved validity state changes—whether due to user input, async validation, or validity constraints changes.
 */
export interface ValidityStateUpdateProps
    extends
        // Bases:
        Omit<FeedbackStateUpdateProps<boolean | null>, 'onStateUpdate'>
{
    /**
     * Reports the updated validity state whenever it changes:
     * - `true`  → the component is now valid
     * - `false` → the component is now invalid
     * - `null`  → the component is now unvalidated
     * 
     * This is a passive notification; it does not request a change to the validity state.
     */
    onValidityUpdate ?: FeedbackStateUpdateProps<boolean | null>['onStateUpdate']
}

/**
 * Props for listening lifecycle events triggered by validity phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface ValidityStatePhaseEventProps {
    /**
     * Called when the validating transition begins.
     */
    onValidatingStart   ?: ValueChangeEventHandler<ValidityPhase, unknown>
    
    /**
     * Called when the validating transition completes.
     */
    onValidatingEnd     ?: ValueChangeEventHandler<ValidityPhase, unknown>
    
    /**
     * Called when the invalidating transition begins.
     */
    onInvalidatingStart ?: ValueChangeEventHandler<ValidityPhase, unknown>
    
    /**
     * Called when the invalidating transition completes.
     */
    onInvalidatingEnd   ?: ValueChangeEventHandler<ValidityPhase, unknown>
    
    /**
     * Called when the unvalidating transition begins.
     */
    onUnvalidatingStart ?: ValueChangeEventHandler<ValidityPhase, unknown>
    
    /**
     * Called when the unvalidating transition completes.
     */
    onUnvalidatingEnd   ?: ValueChangeEventHandler<ValidityPhase, unknown>
}

/**
 * Optional configuration options for customizing validity behavior and animation lifecycle.
 */
export interface ValidityStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean | null>
{
    /**
     * Specifies the default validity state when no `validity` prop is explicitly provided:
     * - `true`   : the component is valid
     * - `false`  : the component is invalid
     * - `null`   : the component is unvalidated
     * - `'auto'` : automatically determine validity state
     * 
     * Defaults to `'auto'` (automatically determine validity state).
     */
    defaultValidity   ?: boolean | null | 'auto'
    
    /**
     * Specifies the fallback validity state when no effective validity value can be resolved:
     * - `true`  : the component is valid
     * - `false` : the component is invalid
     * - `null`  : the component is unvalidated
     * 
     * This fallback applies when `validity` prop is set to `'auto'` but no `computedValidity` is provided.
     * 
     * Defaults to `null` (unvalidated).
     */
    fallbackValidity  ?: boolean | null
    
    /**
     * Defines the pattern used to identify validity-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the validity transition lifecycle.
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
     * Defaults to `['validating', 'invalidating', 'unvalidating']`.
     */
    animationPattern  ?: FeedbackStateOptions<boolean | null>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: FeedbackStateOptions<boolean | null>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the validity lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'valid'        ✅ fully valid
 * - 'invalid'      ❌ fully invalid
 * - 'unvalidated'  ➖ not yet validated
 */
export type ResolvedValidityPhase =
    | 'valid'
    | 'invalid'
    | 'unvalidated'

/**
 * Represents the transitional phase of the validity lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'validating'   🔄 transitioning toward valid
 * - 'invalidating' 🔄 transitioning toward invalid
 * - 'unvalidating' 🔄 transitioning toward unvalidated
 */
export type TransitioningValidityPhase =
    | 'validating'
    | 'invalidating'
    | 'unvalidating'

/**
 * Represents the current transition phase of the validity lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'valid', 'invalid', 'unvalidated'
 * - Transitional: 'validating', 'invalidating', 'unvalidating'
 */
export type ValidityPhase =
    | ResolvedValidityPhase
    | TransitioningValidityPhase

/**
 * A CSS class name reflecting the current validity phase.
 * 
 * Used for styling based on the lifecycle phase.
 * 
 * If in a transitioning phase, includes a `was-*` suffix to indicate the previous resolved state.
 */
export type ValidityClassname = `is-${ResolvedValidityPhase}` | `is-${TransitioningValidityPhase} was-${ResolvedValidityPhase}`

/**
 * An API for accessing the resolved validity state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ValidityBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackBehaviorState<boolean | null, ValidityPhase, ValidityClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current settled validity state used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved state due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation lifecycle.
     * 
     * Useful for rendering the validity state in sync with animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component has visually settled in valid state
     * - `false` : the component has visually settled in invalid state
     * - `null`  : the component has visually settled in unvalidated state
     */
    validity          : FeedbackBehaviorState<boolean | null, ValidityPhase, ValidityClassname, TElement>['state']
    
    /**
     * The actual resolved validity state, regardless of animation state.
     * 
     * This reflects the current target state based on the final diagnostic status.
     * Unlike `validity`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target state, independent of animation lifecycle.
     * 
     * Possible values:
     * - `true`  : the component is intended to be valid
     * - `false` : the component is intended to be invalid
     * - `null`  : the component is intended to be unvalidated
     */
    actualValidity    : FeedbackBehaviorState<boolean | null, ValidityPhase, ValidityClassname, TElement>['actualState']
    
    /**
     * The current transition phase of the validity lifecycle.
     * 
     * Reflects both transitional states (`validating`, `invalidating`, `unvalidating`) and resolved states (`valid`, `invalid`, `unvalidated`).
     */
    validityPhase     : FeedbackBehaviorState<boolean | null, ValidityPhase, ValidityClassname, TElement>['transitionPhase']
    
    /**
     * A CSS class name reflecting the current validity phase.
     * 
     * Possible values:
     * - `'is-valid'`
     * - `'is-invalid'`
     * - `'is-unvalidated'`
     * - `'is-validating'`
     * - `'is-invalidating'`
     * - `'is-unvalidating'`
     * 
     * If in a transitioning phase, includes a `was-*` suffix to indicate the previous resolved state.
     */
    validityClassname : FeedbackBehaviorState<boolean | null, ValidityPhase, ValidityClassname, TElement>['transitionClassname']
}



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
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationValidating   : unknown
    
    /**
     * References an animation used during the invalidating transition.
     * It becomes invalid (`unset`) when not actively invalidating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationInvalidating : unknown
    
    /**
     * References an animation used during the unvalidating transition.
     * It becomes invalid (`unset`) when not actively unvalidating.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationUnvalidating : unknown
    
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
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle states (valid/invalid), not the baseline (unvalidated).  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `validityFactor = 0`  : unvalidated (baseline lifecycle state)  
     *     - `validityFactor = +1` : valid (active lifecycle state)  
     *     - `validityFactor = -1` : invalid (active lifecycle state)  
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
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the active lifecycle states (valid/invalid), not the baseline (unvalidated).  
     *   - Mirrors the active lifecycle states (valid/invalid) during transitions and when settled valid/invalid.  
     *   - Drops to `unset` only when fully unvalidated, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `validityFactorCond = unset`: settled unvalidated (baseline inactive, declaration dropped)
     *     - `validityFactorCond = 0`: unvalidated during transition (numeric interpolation)
     *     - `validityFactorCond = +1`: valid (settled active lifecycle state)  
     *     - `validityFactorCond = -1`: invalid (settled active lifecycle state)
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor during transitions
     *     and when valid/invalid, but conditionally drops to `unset` at baseline unvalidated.
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
    animationValidating   ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the invalidating transition.
     * 
     * When the `validity` state changes away from `invalid`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationInvalidating ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the unvalidating transition.
     * 
     * When the `validity` state changes away from `unvalidated`, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationUnvalidating ?: CssKnownProps['animation']
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
     * - `animationValidating`   : Active during the validating transition.
     * - `animationInvalidating` : Active during the invalidating transition.
     * - `animationUnvalidating` : Active during the unvalidating transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    validityStateVars : CssVars<ValidityStateVars>
}
