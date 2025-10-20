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
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for controlling the validity state of the component.
 * 
 * Accepts an optional `validity` prop, defaulting to `'auto'` (automatically determine validity state) when not provided.
 */
export interface ValidityStateProps {
    /**
     * Specifies the current validity state:
     * - `true`   : the component is valid
     * - `false`  : the component is invalid
     * - `null`   : the component is unvalidated
     * - `'auto'` : automatically determine validity state
     * 
     * Defaults to `'auto'` (automatically determine validity state).
     */
    validity         ?: boolean | null | 'auto'
    
    /**
     * The derived validity value used when `validity` is set to `'auto'`.
     * 
     * This value is typically computed reactively based on input, async validation,
     * or domain-specific logic. It is ignored when `validity` is explicitly set.
     * 
     * This property is intended for **component developers** who need to customize validity resolution.
     * For **application developers**, prefer using the `validity` prop directly.
     */
    computedValidity ?: boolean | null
}

/**
 * Props for reporting updates to the validity state.
 * 
 * Typically used in editable components (e.g. Input, Select, Option) to notify external systems
 * when the resolved validity state changes—whether due to user input, async validation, or validity constraints changes.
 */
export interface ValidityStateUpdateProps {
    /**
     * Reports the updated validity state whenever it changes:
     * - `true`  → the component is now valid
     * - `false` → the component is now invalid
     * - `null`  → the component is now unvalidated
     * 
     * This is a passive notification; it does not request a change to the validity state.
     */
    onValidityUpdate ?: ValueChangeEventHandler<boolean | null, unknown>
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
        Partial<Pick<AnimationStateOptions<boolean | null>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
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
    animationPattern  ?: AnimationStateOptions<boolean | null>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: AnimationStateOptions<boolean | null>['animationBubbling']
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
 * An API for accessing the resolved validity state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface ValidityBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * Indicates the current resolved validity state.
     * This reflects the final diagnostic status, not the transitional intent.
     * 
     * Possible values:
     * - `true`  : the component is valid
     * - `false` : the component is invalid
     * - `null`  : the component is unvalidated
     */
    validity          : boolean | null
    
    /**
     * The current transition phase of the validity lifecycle.
     * 
     * Reflects both transitional states (`validating`, `invalidating`, `unvalidating`) and resolved states (`valid`, `invalid`, `unvalidated`).
     */
    validityPhase     : ValidityPhase
    
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
     */
    validityClassname : `is-${ResolvedValidityPhase}` | `is-${TransitioningValidityPhase} was-${ResolvedValidityPhase}`
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
