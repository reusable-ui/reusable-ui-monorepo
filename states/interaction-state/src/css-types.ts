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
 * Defines a single interaction animation case for *visual effects* whenever an interaction state changes.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * const expandingCase : InteractionCase = {
 *     ifState   : ifExpanding,
 *     variable  : collapseStateVars.animationExpanding,
 *     animation : options.animationExpanding,
 * };
 * ```
 */
export interface InteractionCase
    extends
        // Bases:
        TransitionCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifExpanding`, `ifCollapsing`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-expanding', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : TransitionCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `collapseStateVars.animationExpanding` (recommended)
     */
    variable   : TransitionCase['variable']
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'expanding']]`
     * - A strongly typed reference, e.g. `options.animationExpanding` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: TransitionCase['animation']
}



/**
 * Describes how interaction styling should behave:
 * - **Animations** for *visual effects* whenever an interaction state changes
 * - **Flags** for *discrete switches* in conditional styling
 * - **Factors** for *gradual drivers* in transitional styling
 * 
 * Notes:
 * - During an animation, factor values are smoothly driven by the animation's keyframes.
 * - Once the animation finishes, the factor *sticks* to its final value until the next change.
 * 
 * @example
 * ```ts
 * // Describe how interaction collapse state should behave:
 * const collapseStateRule : CssRule = usesInteractionState({
 *     // Interaction animations for visual effects whenever an interaction state changes:
 *     transitions     : [
 *         {
 *             ifState   : ifExpanding,
 *             variable  : collapseStateVars.animationExpanding,
 *             animation : options.animationExpanding,
 *         },
 *         {
 *             ifState   : ifCollapsing,
 *             variable  : collapseStateVars.animationCollapsing,
 *             animation : options.animationCollapsing,
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
 *     factors         : [
 *         {
 *             ifState : ifExpanded,
 *             factor  : 1,
 *         },
 *         // Not needed: Defaults to 0 when no case matches:
 *         // {
 *         //     ifState : ifCollapsed,
 *         //     factor  : 0,
 *         // },
 *     ],
 * });
 * ```
 */
export interface InteractionBehavior
    extends
        // Bases:
        TransitionBehavior
{
    /**
     * Defines interaction animation cases for *visual effects* whenever an interaction state changes.
     * 
     * Automatically runs the matching animation whenever the component's interaction state changes.
     */
    transitions     ?: InteractionCase[]
    
    /**
     * Specifies a CSS variable for smooth transitions.
     * 
     * Provides a numeric variable for *gradual driver* in transitional styling.
     * Properties can fade in, fade out, or blend proportionally instead of switching abruptly.
     * 
     * Typical implementation: integer values represent settled states, fractional values represent transitioning states.
     * Example range: 0 (baseline) … +0.5 (expanding) … +1 (expanded).
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
     * Example range: unset (baseline) … +0.5 (expanding) … +1 (expanded).
     * 
     * Always resolves to `unset` when the state is fully inactive,
     * making it easier for default styles to take over gracefully.
     */
    factorCondVar    : TransitionBehavior['factorCondVar']
}
