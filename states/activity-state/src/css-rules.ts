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
 * Applies live CSS variables for activity styling, including:
 * - **Animation variables** for *visual effects* whenever the corresponding activity becomes active
 * - **Factor variables** for *movement drivers* of the activity's motion.
 * 
 * @param activityBehavior - The activity styling behaviors to apply.
 * @returns A `CssRule` that enables activity styling to work correctly and dynamically.
 * 
 * @example
 * ```ts
 * // Describe how order animations should behave:
 * const orderAnimations : CssRule = usesActivityState({
 *     animations      : [
 *         {
 *             ifState   : ifPreparing,
 *             variable  : orderStateVars.animationPreparing,
 *             animation : options.animationPreparing,
 *         },
 *         {
 *             ifState   : ifShipping,
 *             variable  : orderStateVars.animationShipping,
 *             animation : options.animationShipping,
 *         },
 *         {
 *             ifState   : ifDelivering,
 *             variable  : orderStateVars.animationDelivering,
 *             animation : options.animationDelivering,
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
export const usesActivityState = (activityBehavior: ActivityBehavior): CssRule => usesAnimationState(activityBehavior);
