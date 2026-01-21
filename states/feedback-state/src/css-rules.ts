// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // Hooks:
    usesTransitionState,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.

// Types:
import {
    type FeedbackBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for feedback styling, including:
 * - **Animation variables** for *visual effects* whenever a feedback state changes
 * - **Flag variables** for *discrete switches* in conditional styling
 * - **Factor variables** for *gradual drivers* in transitional styling
 * 
 * @param feedbackBehavior - The feedback styling behaviors to apply.
 * @returns A `CssRule` that enables feedback styling to work correctly and dynamically.
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
 * 
 * // Apply focus states alongside other styles:
 * return style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     
 *     // Apply focus state rule:
 *     ...focusStateRule,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usesFeedbackState = (feedbackBehavior: FeedbackBehavior): CssRule => usesTransitionState(feedbackBehavior);
