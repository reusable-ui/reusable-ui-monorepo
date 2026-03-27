// Cssfn:
import {
    // Arrays:
    type MaybeArray,
    
    
    
    // Cssfn css specific types:
    type CssCustomSimpleRef,
    type CssKnownProps,
    type CssRule,
    type CssStyleCollection,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * Defines a single animation case.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * const preparingCase : ActivityAnimationCase = {
 *     ifState   : ifPreparing,
 *     variable  : orderStateVars.animationPreparing,
 *     animation : options.animationPreparing,
 * };
 * ```
 */
export interface AnimationCase {
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifPreparing`, `ifShipping`, `ifDelivering`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-preparing', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : (styles: CssStyleCollection) => CssRule
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `orderStateVars.animationPreparing` (recommended)
     */
    variable   : CssCustomSimpleRef
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'preparing']]`
     * - A strongly typed reference, e.g. `options.animationPreparing` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: CssKnownProps['animation']
}



/**
 * Describes how animation styling should behave.
 * 
 * Defines **animations** for *visual effects* whenever the corresponding state becomes active.
 * 
 * @example
 * ```ts
 * // Describe how order animations should behave:
 * const orderAnimations : CssRule = usesAnimationState({
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
 * });
 * ```
 */
export interface AnimationBaseBehavior {
    /**
     * Defines animation cases for *visual effects* whenever the corresponding state becomes active.
     * 
     * Automatically runs the corresponding animation whenever the component's state becomes active.
     * 
     * Accepts either:
     * - A single `AnimationCase`
     * - An array of `AnimationCase[]`
     */
    animations ?: MaybeArray<AnimationCase>
}

/**
 * Describes how animation factor variables should behave.
 * 
 * Provides **numeric drivers** that represent the movement of the active animation.
 * These values can be applied to numeric-based properties (e.g. `scale`, `opacity`, `transform`, `color`, etc.)
 * to visualize the animation's motion in a proportional way.
 * 
 * By using a single factor variable, complex behaviors (such as blinking, pulsing, oscillating, or multi-step activities)
 * can be expressed more cleanly, without requiring multiple overlapping keyframe definitions.
 * 
 * @example
 * ```ts
 * // Describe how order animation factors should behave:
 * const orderAnimations : CssRule = usesAnimationState({
 *     animations : [
 *         // animation cases...
 *     ],
 * } & {
 *     // Factor variables for movement drivers of animation:
 *     factorVar       : orderStateVars.orderFactor,
 *     factorCondVar   : orderStateVars.orderFactorCond,
 *     ifInactiveState : ifIdle,
 *     baselineFactor  : 0,
 * } satisfies AnimationBaseBehavior);
 * ```
 */
export interface AnimationFactorBehavior {
    /**
     * Specifies a CSS variable for driving animation movement.
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
    factorVar        : CssCustomSimpleRef
    
    /**
     * Specifies a CSS variable for driving animation movement with inactive fallback.
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
    factorCondVar    : CssCustomSimpleRef
    
    /**
     * Defines the condition for the inactive baseline state.
     * 
     * Provides a way for `factorCondVar` to reset (`unset`) when the inactive baseline state is reached.
     */
    ifInactiveState  : (styles: CssStyleCollection) => CssRule
    
    /**
     * Defines the default baseline factor value used when no animation is actively running.
     * 
     * Serves as the safe fallback value to prevent unexpected behavior
     * when no other factor can be resolved.
     * 
     * Defaults to `0`.
     */
    baselineFactor  ?: number
}

/**
 * Describes how animation styling should behave, with optional factor behavior.
 * 
 * Defines **animations** for *visual effects* whenever the corresponding state becomes active.
 * Optionally includes factor variables to drive proportional animation movement.
 * 
 * @example
 * ```ts
 * // Describe how order animations should behave:
 * const orderAnimations : CssRule = usesAnimationState({
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
 *     // Optional factor variables for movement drivers of animation:
 *     factorVar       : orderStateVars.orderFactor,
 *     factorCondVar   : orderStateVars.orderFactorCond,
 *     ifInactiveState : ifIdle,
 *     baselineFactor  : 0,
 * });
 * ```
 */
export type AnimationBehavior =
    |  AnimationBaseBehavior
    | (AnimationBaseBehavior & AnimationFactorBehavior)
