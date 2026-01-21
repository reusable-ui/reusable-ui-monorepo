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
 * const validatingCase : AnimationCase = {
 *     ifState   : ifValidating,
 *     variable  : validityStateVars.animationValidating,
 *     animation : options.animationValidating,
 * };
 * ```
 */
export interface AnimationCase {
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifValidating`, `ifInvalidating`, `ifUnvalidating`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-validating', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : (styles: CssStyleCollection) => CssRule
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `validityStateVars.animationValidating` (recommended)
     */
    variable   : CssCustomSimpleRef
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'validating']]`
     * - A strongly typed reference, e.g. `options.animationValidating` (recommended)
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
 * // Describe how validity animations should behave:
 * const validityStateRule : CssRule = usesAnimationState({
 *     // Animations for visual effects whenever a validation process runs:
 *     animations : [
 *         {
 *             ifState   : ifValidating,
 *             variable  : validityStateVars.animationValidating,
 *             animation : options.animationValidating,
 *         },
 *         {
 *             ifState   : ifInvalidating,
 *             variable  : validityStateVars.animationInvalidating,
 *             animation : options.animationInvalidating,
 *         },
 *         {
 *             ifState   : ifUnvalidating,
 *             variable  : validityStateVars.animationUnvalidating,
 *             animation : options.animationUnvalidating,
 *         },
 *     ],
 * });
 * ```
 */
export interface AnimationBehavior {
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
