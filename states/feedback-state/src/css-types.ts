// Reusable-ui states:
import {
    // Types:
    type TransitionCase,
    type TransitionBehavior,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.
export {
    // Types:
    type FlagCase,
    type FactorCase,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.



/**
 * Defines a single feedback animation case for *visual effects* whenever a feedback state changes.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * const focusingCase : FeedbackCase = {
 *     ifState   : ifFocusing,
 *     variable  : focusStateVars.animationFocusing,
 *     animation : options.animationFocusing,
 * };
 * ```
 */
export interface FeedbackCase
    extends
        // Bases:
        TransitionCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifFocusing`, `ifBlurring`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-focusing', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : TransitionCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `focusStateVars.animationFocusing` (recommended)
     */
    variable   : TransitionCase['variable']
    
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
    animation ?: TransitionCase['animation']
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
 *     transitions     : [
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
     * Automatically runs the matching animation whenever the component's feedback state changes.
     */
    transitions     ?: FeedbackCase[]
    
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
}
