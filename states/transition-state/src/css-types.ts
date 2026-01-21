// Cssfn:
import {
    // Arrays:
    type MaybeArray,
    
    
    
    // Cssfn css specific types:
    type CssCustomSimpleRef,
    type CssRule,
    type CssStyleCollection,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // Types:
    type AnimationCase,
    type AnimationBehavior,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Defines a single transitional animation case for *visual effects* whenever a transitional state changes.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * const validatingCase : TransitionAnimationCase = {
 *     ifState   : ifValidating,
 *     variable  : validityStateVars.animationValidating,
 *     animation : options.animationValidating,
 * };
 * ```
 */
export interface TransitionAnimationCase
    extends
        // Bases:
        AnimationCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifValidating`, `ifInvalidating`, `ifUnvalidating`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-validating', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : AnimationCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `validityStateVars.animationValidating` (recommended)
     */
    variable   : AnimationCase['variable']
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'validating']]`
     * - A strongly typed reference, e.g. `options.animationValidating` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: AnimationCase['animation']
}



/**
 * Defines a single flag case for conditional styling.
 * 
 * Conditionally sets or unsets a boolean-like CSS variable based on the specified state condition.
 * 
 * When set, the variable holds an empty string (won't carry any meaningful value) and acts as an **active switch**.  
 * When unset, the variable invalidates dependent properties, causing the browser to ignore them.
 * 
 * @example
 * ```ts
 * const isValidatingOrValid : TransitionFlagCase = {
 *     ifState  : ifValidatingOrValid,
 *     variable : validityStateVars.isValid,
 * };
 * ```
 */
export interface TransitionFlagCase {
    /**
     * Determines when the flag variable is set.
     * 
     * Guidelines:
     * - Match settled or transitional states for `is**ed` variables.
     * - Match only transitional states for `is**ing` variables.
     * - Match previous settled states for `was**ed` variables.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifValidatingOrValid`, `ifInvalidatingOrInvalid`, `ifUnvalidatingOrUnvalidated`
     * - A custom function using `rule()`, e.g. `(styles) => rule(':is(.is-validating, .is-valid)', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState  : (styles: CssStyleCollection) => CssRule
    
    /**
     * Specifies the boolean-like CSS variable to set when the state condition is met.
     * 
     * Behavior:
     * - **Set** → assigns an empty string (won't carry any meaningful value) and acts as an **active switch**.
     * - **Unset** → invalidates dependent properties, causing the browser to ignore them.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `validityStateVars.isValid` (recommended)
     */
    variable : CssCustomSimpleRef
}



/**
 * Defines a single factor case for holding final numeric value once a transition settles.
 * 
 * Assigns a discrete value for keeping `factorVar` and `factorCondVar`
 * *stick* at their final value after the transition finishes.
 * 
 * Note:
 * - During an animation, factor values are smoothly driven by the animation's keyframes.
 * 
 * @example
 * ```ts
 * const validFactor : TransitionFactorCase = {
 *     ifState : ifValid,
 *     factor  : 1,
 * };
 * ```
 */
export interface TransitionFactorCase {
    /**
     * Determines when the `factorVar` is set.
     * 
     * Guidelines:
     * - Match only fully settled states.
     * - Do not match transitional states — let animations drive interpolation.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifValid`, `ifInvalid`, `ifUnvalidated`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-valid', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState : (styles: CssStyleCollection) => CssRule
    
    /**
     * Defines the discrete value to assign to `factorVar`.
     * 
     * Guidelines:
     * - `0` → inactive baseline
     * - `1` → active state
     * - `-1` → negative active state (directional)
     * - Positive/negative integers → multi-valued states
     * - Any numeric value → custom use cases
     */
    factor  : number
}



/**
 * Describes how transitional styling should behave:
 * - **Animations** for *visual effects* whenever a transitional state changes
 * - **Flags** for *discrete switches* in conditional styling
 * - **Factors** for *gradual drivers* in transitional styling
 * 
 * Notes:
 * - During an animation, factor values are smoothly driven by the animation's keyframes.
 * - Once the animation finishes, the factor *sticks* to its final value until the next change.
 * 
 * @example
 * ```ts
 * // Describe how transitional validity state should behave:
 * const validityStateRule : CssRule = usesTransitionState({
 *     // Transitional animations for visual effects whenever a transitional state changes:
 *     animations      : [
 *         {
 *             ifState   : ifValidating,
 *             variable  : validityStateVars.animationValidating,
 *             animation : options.animationValidating,
 *         },
 *         {
 *             ifState   : ifInvalidating,
 *             variable  : validityStateVars.animationInvalidating,
 *             animation : options.animationInvalidating,
 *         },
 *         {
 *             ifState   : ifUnvalidating,
 *             variable  : validityStateVars.animationUnvalidating,
 *             animation : options.animationUnvalidating,
 *         },
 *     ],
 *     
 *     // Flags for discrete switches in conditional styling:
 *     flags           : [
 *         // Current flags:
 *         {
 *             ifState  : ifValidatingOrValid,
 *             variable : validityStateVars.isValid,
 *         },
 *         {
 *             ifState  : ifInvalidatingOrInvalid,
 *             variable : validityStateVars.isInvalid,
 *         },
 *         {
 *             ifState  : ifUnvalidatingOrUnvalidated,
 *             variable : validityStateVars.isUnvalidated,
 *         },
 *         
 *         // Past flags:
 *         {
 *             ifState  : ifWasValid,
 *             variable : validityStateVars.wasValid,
 *         },
 *         {
 *             ifState  : ifWasInvalid,
 *             variable : validityStateVars.wasInvalid,
 *         },
 *         {
 *             ifState  : ifWasUnvalidated,
 *             variable : validityStateVars.wasUnvalidated,
 *         },
 *     ],
 *     
 *     // Factor variables for gradual drivers in transitional styling:
 *     factorVar       : validityStateVars.validityFactor,
 *     factorCondVar   : validityStateVars.validityFactorCond,
 *     ifInactiveState : ifUnvalidated,
 *     factors         : [
 *         {
 *             ifState : ifValid,
 *             factor  : 1,
 *         },
 *         {
 *             ifState : ifInvalid,
 *             factor  : -1,
 *         },
 *         // Not needed: Defaults to 0 when no case matches:
 *         // {
 *         //     ifState : ifUnvalidated,
 *         //     factor  : 0,
 *         // },
 *     ],
 * });
 * ```
 */
export interface TransitionBehavior
    extends
        // Bases:
        AnimationBehavior
{
    /**
     * Defines transitional animation cases for *visual effects* whenever a transitional state changes.
     * 
     * Automatically runs the corresponding animation whenever the component's transitional state changes.
     * 
     * Accepts either:
     * - A single `TransitionAnimationCase`
     * - An array of `TransitionAnimationCase[]`
     */
    animations      ?: MaybeArray<TransitionAnimationCase>
    
    /**
     * Defines flag cases for conditional styling.
     * 
     * Provides boolean-like CSS variables for *discrete switches* in conditional styling.
     * Either fully applied or not at all — never interpolated.
     * 
     * Accepts either:
     * - A single `TransitionFlagCase`
     * - An array of `TransitionFlagCase[]`
     */
    flags           ?: MaybeArray<TransitionFlagCase>
    
    /**
     * Specifies a CSS variable for smooth transitions.
     * 
     * Provides a numeric variable for *gradual driver* in transitional styling.
     * Properties can fade in, fade out, or blend proportionally instead of switching abruptly.
     * 
     * Typical implementation: integer values represent settled states, fractional values represent transitioning states.
     * Example range: -1 (invalid) … -0.5 (invalidating) … 0 (baseline) … +0.5 (validating) … +1 (valid).
     * 
     * Always resolves to `0` when the state is fully inactive,
     * ensuring consistency across state changes.
     */
    factorVar        : CssCustomSimpleRef
    
    /**
     * Specifies a CSS variable for smooth transitions with inactive fallback.
     * 
     * Provides a numeric variable for *gradual driver* in transitional styling,
     * with `unset` fallback behavior when the state is fully inactive.
     * Properties can fade in, fade out, or blend proportionally instead of switching abruptly.
     * 
     * Typical implementation: integer values represent settled states, fractional values represent transitioning states,
     * and `unset` represents settled inactive baseline state.
     * Example range: -1 (invalid) … -0.5 (invalidating) … unset (baseline) … +0.5 (validating) … +1 (valid).
     * 
     * Always resolves to `unset` when the state is fully inactive,
     * making it easier for default styles to take over gracefully.
     */
    factorCondVar    : CssCustomSimpleRef
    
    /**
     * Defines the condition for the inactive baseline state.
     * 
     * Provides a way for `factorCondVar` to reset (`unset`) when the inactive baseline state is reached.
     */
    ifInactiveState  : (styles: CssStyleCollection) => CssRule
    
    /**
     * Defines factor cases for holding final numeric values once a transition settles.
     * 
     * Provides discrete values for keeping `factorVar` and `factorCondVar`
     * *stick* at their final value after the transition finishes.
     * 
     * If no case matches, the factor variables resolve to `0`.
     * 
     * Accepts either:
     * - A single `TransitionFactorCase`
     * - An array of `TransitionFactorCase[]`
     */
    factors         ?: MaybeArray<TransitionFactorCase>
}
