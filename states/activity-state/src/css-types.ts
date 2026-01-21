// Cssfn:
import {
    // Arrays:
    type MaybeArray,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // Types:
    type AnimationCase,
    type AnimationBehavior,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Defines a single activity animation case for *visual effects* whenever an activity is in progress.
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
export interface ActivityAnimationCase
    extends
        // Bases:
        AnimationCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifPreparing`, `ifShipping`, `ifDelivering`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-preparing', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : AnimationCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `orderStateVars.animationPreparing` (recommended)
     */
    variable   : AnimationCase['variable']
    
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
    animation ?: AnimationCase['animation']
}



/**
 * Describes how activity styling should behave.
 * 
 * Defines **animations** for *visual effects* whenever the corresponding activity is in progress.
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
 * ```
 */
export interface ActivityBehavior
    extends
        // Bases:
        AnimationBehavior
{
    /**
     * Defines activity animation cases for *visual effects* whenever the corresponding activity is in progress.
     * 
     * Automatically runs the corresponding animation whenever the component's activity is in progress.
     * 
     * Accepts either:
     * - A single `ActivityAnimationCase`
     * - An array of `ActivityAnimationCase[]`
     */
    animations ?: MaybeArray<ActivityAnimationCase>
}
