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
    type CssEphemeralBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for ephemeral styling, including:
 * - **Animation variables** for *visual effects* whenever an activity or status change occurs
 * - **Factor variables** for *gradual drivers* that control activity animations
 * 
 * @param ephemeralBehavior The ephemeral styling behaviors to apply.
 * @returns A `CssRule` that enables ephemeral styling to work correctly and dynamically.
 * 
 * @example
 * ```ts
 * // Describe how a "like" button should animate:
 * const likeStateRule : CssRule = usingEphemeralState({
 *     // Ephemeral animations for visual effects whenever an activity or status change occurs:
 *     animations      : [
 *         // Animates a "like" button when toggled:
 *         {
 *             // Condition: when the button is in the "liked" state:
 *             ifState   : ifLiked,
 *             
 *             // CSS variable to assign when the condition is met:
 *             variable  : likeStateVars.likedAnimation,
 *             
 *             // Animation reference or value to apply:
 *             animation : options.likedAnimation,
 *         },
 *         
 *         // Animates an "unlike" button when toggled:
 *         {
 *             ifState   : ifUnliked,
 *             variable  : likeStateVars.unlikedAnimation,
 *             animation : options.unlikedAnimation,
 *         },
 *     ],
 *     
 *     // Factor variables for gradual drivers that control activity animations:
 *     factorVar       : likeStateVars.likeFactor,
 *     factorCondVar   : likeStateVars.likeFactorCond,
 *     ifInactiveState : ifIdle,
 * });
 * 
 * // Apply ephemeral styling alongside other styles:
 * return style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     
 *     // Apply "like" state rule:
 *     ...likeStateRule,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usingEphemeralState = (ephemeralBehavior: CssEphemeralBehavior): CssRule => usingAnimationState(ephemeralBehavior);
