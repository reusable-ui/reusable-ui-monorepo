// Cssfn:
import {
    // Arrays:
    type MaybeArray,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // Types:
    type TransitionAnimationCase,
    type TransitionFlagCase,
    type TransitionFactorCase,
    type TransitionBehavior,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.



/**
 * Defines a single feedback animation case for *visual effects* whenever a feedback state changes.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * const focusingCase : FeedbackAnimationCase = {
 *     ifState   : ifFocusing,
 *     variable  : focusStateVars.animationFocusing,
 *     animation : options.animationFocusing,
 * };
 * ```
 */
export interface FeedbackAnimationCase
    extends
        // Bases:
        TransitionAnimationCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifFocusing`, `ifBlurring`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-focusing', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : TransitionAnimationCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `focusStateVars.animationFocusing` (recommended)
     */
    variable   : TransitionAnimationCase['variable']
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'focusing']]`
     * - A strongly typed reference, e.g. `options.animationFocusing` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: TransitionAnimationCase['animation']
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
 * const isFocusingOrFocused : TransitionFlagCase = {
 *     ifState  : ifFocusingOrFocused,
 *     variable : focusStateVars.isFocused,
 * };
 * ```
 */
export interface FeedbackFlagCase
    extends
        // Bases:
        TransitionFlagCase
{
    /**
     * Determines when the flag variable is set.
     * 
     * Guidelines:
     * - Match settled or transitional states for `is**ed` variables.
     * - Match only transitional states for `is**ing` variables.
     * - Match previous settled states for `was**ed` variables.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifFocusingOrFocused`, `ifBlurringOrBlurred`
     * - A custom function using `rule()`, e.g. `(styles) => rule(':is(.is-focusing, .is-focused)', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState  : TransitionFlagCase['ifState']
    
    /**
     * Specifies the boolean-like CSS variable to set when the state condition is met.
     * 
     * Behavior:
     * - **Set** → assigns an empty string (won't carry any meaningful value) and acts as an **active switch**.
     * - **Unset** → invalidates dependent properties, causing the browser to ignore them.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `focusStateVars.isFocused` (recommended)
     */
    variable : TransitionFlagCase['variable']
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
 * const focusFactor : TransitionFactorCase = {
 *     ifState : ifFocused,
 *     factor  : 1,
 * };
 * ```
 */
export interface FeedbackFactorCase
    extends
        // Bases:
        TransitionFactorCase
{
    /**
     * Determines when the `factorVar` is set.
     * 
     * Guidelines:
     * - Match only fully settled states.
     * - Do not match transitional states — let animations drive interpolation.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifFocused`, `ifBlurred`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-focused', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState : TransitionFactorCase['ifState']
}



/**
 * Describes how feedback styling should behave:
 * - **Animations** for *visual effects* whenever a feedback state changes
 * - **Flags** for *discrete switches* in conditional styling
 * - **Factors** for *gradual drivers* in transitional styling
 * 
 * Notes:
 * - During an animation, factor values are smoothly driven by the animation's keyframes.
 * - Once the animation finishes, the factor *sticks* to its final value until the next change.
 * 
 * @example
 * ```ts
 * // Describe how feedback focus state should behave:
 * const focusStateRule : CssRule = usesFeedbackState({
 *     // Feedback animations for visual effects whenever a feedback state changes:
 *     animations      : [
 *         {
 *             ifState   : ifFocusing,
 *             variable  : focusStateVars.animationFocusing,
 *             animation : options.animationFocusing,
 *         },
 *         {
 *             ifState   : ifBlurring,
 *             variable  : focusStateVars.animationBlurring,
 *             animation : options.animationBlurring,
 *         },
 *     ],
 *     
 *     // Flags for discrete switches in conditional styling:
 *     flags           : [
 *         // Current flags:
 *         {
 *             ifState  : ifFocusingOrFocused,
 *             variable : focusStateVars.isFocused,
 *         },
 *         {
 *             ifState  : ifBlurringOrBlurred,
 *             variable : focusStateVars.isBlurred,
 *         },
 *     ],
 *     
 *     // Factor variables for gradual drivers in transitional styling:
 *     factorVar       : focusStateVars.focusFactor,
 *     factorCondVar   : focusStateVars.focusFactorCond,
 *     ifInactiveState : ifBlurred,
 *     factors         : [
 *         {
 *             ifState : ifFocused,
 *             factor  : 1,
 *         },
 *         // Not needed: Defaults to 0 when no case matches:
 *         // {
 *         //     ifState : ifBlurred,
 *         //     factor  : 0,
 *         // },
 *     ],
 * });
 * ```
 */
export interface FeedbackBehavior
    extends
        // Bases:
        TransitionBehavior
{
    /**
     * Defines feedback animation cases for *visual effects* whenever a feedback state changes.
     * 
     * Automatically runs the corresponding animation whenever the component's feedback state changes.
     * 
     * Accepts either:
     * - A single `FeedbackAnimationCase`
     * - An array of `FeedbackAnimationCase[]`
     */
    animations      ?: MaybeArray<FeedbackAnimationCase>
    
    /**
     * Defines flag cases for conditional styling.
     * 
     * Provides boolean-like CSS variables for *discrete switches* in conditional styling.
     * Either fully applied or not at all — never interpolated.
     * 
     * Accepts either:
     * - A single `FeedbackFlagCase`
     * - An array of `FeedbackFlagCase[]`
     */
    flags           ?: MaybeArray<FeedbackFlagCase>
    
    /**
     * Specifies a CSS variable for smooth transitions.
     * 
     * Provides a numeric variable for *gradual driver* in transitional styling.
     * Properties can fade in, fade out, or blend proportionally instead of switching abruptly.
     * 
     * Typical implementation: integer values represent settled states, fractional values represent transitioning states.
     * Example range: 0 (baseline) … +0.5 (focusing) … +1 (focused).
     * 
     * Always resolves to `0` when the state is fully inactive,
     * ensuring consistency across state changes.
     */
    factorVar        : TransitionBehavior['factorVar']
    
    /**
     * Specifies a CSS variable for smooth transitions with inactive fallback.
     * 
     * Provides a numeric variable for *gradual driver* in transitional styling,
     * with `unset` fallback behavior when the state is fully inactive.
     * Properties can fade in, fade out, or blend proportionally instead of switching abruptly.
     * 
     * Typical implementation: integer values represent settled states, fractional values represent transitioning states,
     * and `unset` represents settled inactive baseline state.
     * Example range: unset (baseline) … +0.5 (focusing) … +1 (focused).
     * 
     * Always resolves to `unset` when the state is fully inactive,
     * making it easier for default styles to take over gracefully.
     */
    factorCondVar    : TransitionBehavior['factorCondVar']
    
    /**
     * Defines factor cases for holding final numeric values once a transition settles.
     * 
     * Provides discrete values for keeping `factorVar` and `factorCondVar`
     * *stick* at their final value after the transition finishes.
     * 
     * If no case matches, the factor variables resolve to `0`.
     * 
     * Accepts either:
     * - A single `FeedbackFactorCase`
     * - An array of `FeedbackFactorCase[]`
     */
    factors         ?: MaybeArray<FeedbackFactorCase>
}
