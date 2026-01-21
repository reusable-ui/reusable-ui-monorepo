// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // CSS hooks:
    usesAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Types:
import {
    type ActivityBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for activity styling.
 * 
 * Activates **animation variables** for *visual effects* whenever the corresponding activity is in progress.
 * 
 * Each activity case provides:
 * - **`ifState`**
 *   Determines when the animation applies.
 * - **`variable`**
 *   Specifies the CSS variable to assign when the state condition is met.
 * - **`animation`**
 *   Specifies the animation value or reference to apply to the variable.
 * 
 * @param activityBehavior - The activity styling behaviors to apply.
 * @returns A `CssRule` that enables activity styling to work correctly and dynamically.
 * 
 * @example
 * ```ts
 * // Describe how order animations should behave:
 * const orderAnimations : CssRule = usesActivityState({
 *     {
 *         ifState   : ifPreparing,
 *         variable  : orderStateVars.animationPreparing,
 *         animation : options.animationPreparing,
 *     },
 *     {
 *         ifState   : ifShipping,
 *         variable  : orderStateVars.animationShipping,
 *         animation : options.animationShipping,
 *     },
 *     {
 *         ifState   : ifDelivering,
 *         variable  : orderStateVars.animationDelivering,
 *         animation : options.animationDelivering,
 *     },
 * });
 * 
 * // Apply order animations alongside other styles:
 * return style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     
 *     // Apply activity state rule:
 *     ...orderAnimations,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usesActivityState = (activityBehavior: ActivityBehavior): CssRule => usesAnimationState(activityBehavior);
