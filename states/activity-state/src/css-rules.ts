// Cssfn:
import {
    // Arrays:
    type MaybeArray,
    
    
    
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
    type ActivityCase,
}                           from './css-types.js'



/**
 * Applies activity cases for styling.
 * 
 * Automatically runs the corresponding animation whenever a state is still active.
 * 
 * Accepts either:
 * - A single `ActivityCase`
 * - An array of `ActivityCase[]`
 * 
 * @param activityCases - One or more activity case definitions.
 * @returns A `CssRule` that applies the specified animations when their activity state conditions are met.
 * 
 * @example
 * ```ts
 * // Single activity case:
 * const preparingAnimation : CssRule = usesActivityState({
 *     ifState   : ifPreparing,
 *     variable  : orderStateVars.animationPreparing,
 *     animation : options.animationPreparing,
 * });
 * 
 * // Multiple activity cases:
 * const orderAnimations : CssRule = usesActivityState([
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
 * ]);
 * 
 * return style({
 *     ...preparingAnimation,
 *     ...orderAnimations,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usesActivityState = (activityCases: MaybeArray<ActivityCase>): CssRule => usesAnimationState(activityCases);
