// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // CSS hooks:
    usingAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Types:
import {
    type CssActivityBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for activity styling, including:
 * - **Animation variables** for *visual effects* whenever the corresponding activity becomes active
 * - **Factor variables** for *movement drivers* of the activity's motion.
 * 
 * @param activityBehavior The activity styling behaviors to apply.
 * @returns A `CssRule` that enables activity styling to work correctly and dynamically.
 * 
 * @example
 * ```ts
 * // Describe how order animations should behave:
 * const orderAnimations : CssRule = usingActivityState({
 *     animations      : [
 *         {
 *             ifState   : ifPreparing,
 *             variable  : orderStateVars.preparingAnimation,
 *             animation : options.preparingAnimation,
 *         },
 *         {
 *             ifState   : ifShipping,
 *             variable  : orderStateVars.shippingAnimation,
 *             animation : options.shippingAnimation,
 *         },
 *         {
 *             ifState   : ifDelivering,
 *             variable  : orderStateVars.deliveringAnimation,
 *             animation : options.deliveringAnimation,
 *         },
 *     ],
 *     
 *     // Optional factor variables for movement drivers of activity animation:
 *     factorVar       : orderStateVars.orderFactor,
 *     factorCondVar   : orderStateVars.orderFactorCond,
 *     ifInactiveState : ifIdle,
 *     baselineFactor  : 0,
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
export const usingActivityState = (activityBehavior: CssActivityBehavior): CssRule => usingAnimationState(activityBehavior);
