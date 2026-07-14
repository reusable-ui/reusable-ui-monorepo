// Cssfn:
import {
    // Arrays:
    type MaybeArray,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // Types:
    type CssAnimationCase,
    type CssAnimationBaseBehavior,
    type CssAnimationFactorBehavior,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Defines a single activity animation case for *visual effects* whenever an activity is in progress.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * const preparingCase : CssActivityAnimationCase = {
 *     ifState   : ifPreparing,
 *     variable  : orderStateVars.preparingAnimation,
 *     animation : options.preparingAnimation,
 * };
 * ```
 */
export interface CssActivityAnimationCase
    extends
        // Bases:
        CssAnimationCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifPreparing`, `ifShipping`, `ifDelivering`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-preparing', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : CssAnimationCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `orderStateVars.preparingAnimation` (recommended)
     */
    variable   : CssAnimationCase['variable']
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'preparing']]`
     * - A strongly typed reference, e.g. `options.preparingAnimation` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: CssAnimationCase['animation']
}



/**
 * Describes how activity styling should behave.
 * 
 * Defines **animations** for *visual effects* whenever the corresponding activity is in progress.
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
 * });
 * ```
 */
export interface CssActivityBaseBehavior
    extends
        // Bases:
        CssAnimationBaseBehavior
{
    /**
     * Defines activity animation cases for *visual effects* whenever the corresponding activity is in progress.
     * 
     * Automatically runs the corresponding animation whenever the component's activity is in progress.
     * 
     * Accepts either:
     * - A single `CssActivityAnimationCase`
     * - An array of `CssActivityAnimationCase[]`
     */
    animations ?: MaybeArray<CssActivityAnimationCase>
}

/**
 * Describes how activity animation factor variables should behave.
 * 
 * Provides **numeric drivers** that represent the movement of the active activity animation.
 * These values can be applied to numeric-based properties (e.g. `scale`, `opacity`, `transform`, `color`, etc.)
 * to visualize the activity's motion in a proportional way.
 * 
 * By using a single factor variable, complex behaviors (such as blinking, pulsing, oscillating, or multi-step activities)
 * can be expressed more cleanly, without requiring multiple overlapping keyframe definitions.
 * 
 * @example
 * ```ts
 * // Describe how order animation factors should behave:
 * const orderAnimations : CssRule = usingActivityState({
 *     animations : [
 *         // animation cases...
 *     ],
 * } satisfies CssActivityBaseBehavior & {
 *     // Factor variables for movement drivers of activity animation:
 *     factorVar       : orderStateVars.orderFactor,
 *     factorCondVar   : orderStateVars.orderFactorCond,
 *     ifInactiveState : ifIdle,
 *     baselineFactor  : 0,
 * } satisfies CssActivityFactorBehavior);
 * ```
 */
export interface CssActivityFactorBehavior
    extends
        // Bases:
        CssAnimationFactorBehavior
{
    /**
     * Specifies a CSS variable for driving activity animation movement.
     * 
     * Provides a numeric variable for *movement driver* of the running animation.
     * Properties can fade in, fade out, oscillate, or blend proportionally to the factor.
     * 
     * Typical implementation: integer values represent settled stages, fractional values represent in-motion stages.
     * Example range: 0 (idle) … 0.5 (preparing) … 1 (prepared) … 1.5 (shipping) … 2 (shipped) … 2.5 (delivering) … 3 (delivered).
     * 
     * Always resolves to `baselineFactor` when the state is fully inactive,
     * ensuring consistency across state changes.
     */
    factorVar        : CssAnimationFactorBehavior['factorVar']
    
    /**
     * Specifies a CSS variable for driving activity animation movement with inactive fallback.
     * 
     * Provides a numeric variable for *movement driver* of the running animation,
     * with `unset` fallback behavior when the state is fully inactive.
     * Properties can fade in, fade out, oscillate, or blend proportionally to the factor.
     * 
     * Typical implementation: integer values represent settled stages, fractional values represent in-motion stages,
     * and `unset` represents inactive baseline state.
     * Example range: unset (idle) … 0.5 (preparing) … 1 (prepared) … 1.5 (shipping) … 2 (shipped) … 2.5 (delivering) … 3 (delivered).
     * 
     * Always resolves to `unset` when the state is fully inactive,
     * making it easier for default styles to take over gracefully.
     */
    factorCondVar    : CssAnimationFactorBehavior['factorCondVar']
    
    /**
     * Defines the condition for the inactive baseline state.
     * 
     * Provides a way for `factorCondVar` to reset (`unset`) when the inactive baseline state is reached.
     */
    ifInactiveState  : CssAnimationFactorBehavior['ifInactiveState']
    
    /**
     * Defines the default baseline factor value used when no activity animation is actively running.
     * 
     * Serves as the safe fallback value to prevent unexpected behavior
     * when no other factor can be resolved.
     * 
     * Defaults to `0`.
     */
    baselineFactor  ?: CssAnimationFactorBehavior['baselineFactor']
}

/**
 * Describes how activity styling should behave.
 * 
 * Defines **animations** for *visual effects* whenever the corresponding activity is in progress.
 * Optionally includes factor variables to drive proportional activity animation movement.
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
 * ```
 */
export type CssActivityBehavior =
    |  CssActivityBaseBehavior
    | (CssActivityBaseBehavior & CssActivityFactorBehavior)
