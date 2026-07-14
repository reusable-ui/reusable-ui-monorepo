// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // Hooks:
    usingTransitionState,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.

// Types:
import {
    type CssInteractionBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for interaction styling, including:
 * - **Animation variables** for *visual effects* whenever an interaction state changes
 * - **Flag variables** for *discrete switches* in conditional styling
 * - **Factor variables** for *gradual drivers* in transitional styling
 * 
 * @param interactionBehavior - The interaction styling behaviors to apply.
 * @returns A `CssRule` that enables interaction styling to work correctly and dynamically.
 * 
 * @example
 * ```ts
 * // Describe how interaction collapse state should behave:
 * const collapseStateRule : CssRule = usingInteractionState({
 *     // Interaction animations for visual effects whenever an interaction state changes:
 *     animations      : [
 *         {
 *             ifState   : ifExpanding,
 *             variable  : collapseStateVars.expandingAnimation,
 *             animation : options.expandingAnimation,
 *         },
 *         {
 *             ifState   : ifCollapsing,
 *             variable  : collapseStateVars.collapsingAnimation,
 *             animation : options.collapsingAnimation,
 *         },
 *     ],
 *     
 *     // Flags for discrete switches in conditional styling:
 *     flags           : [
 *         // Current flags:
 *         {
 *             ifState  : ifExpandingOrExpanded,
 *             variable : collapseStateVars.isExpanded,
 *         },
 *         {
 *             ifState  : ifCollapsingOrCollapsed,
 *             variable : collapseStateVars.isCollapsed,
 *         },
 *     ],
 *     
 *     // Factor variables for gradual drivers in transitional styling:
 *     factorVar       : collapseStateVars.expandFactor,
 *     factorCondVar   : collapseStateVars.expandFactorCond,
 *     ifInactiveState : ifCollapsed,
 *     activeFactors   : [
 *         {
 *             ifState : ifExpanded,
 *             factor  : 1,
 *         },
 *     ],
 * });
 * 
 * // Apply collapse states alongside other styles:
 * return style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     
 *     // Apply collapse state rule:
 *     ...collapseStateRule,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usingInteractionState = (interactionBehavior: CssInteractionBehavior): CssRule => usingTransitionState(interactionBehavior);
