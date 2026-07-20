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
 * Defines a single ephemeral animation case for *visual effects* whenever an activity or status change occurs.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * // Animates a "like" button when toggled:
 * const likedCase : CssEphemeralAnimationCase = {
 *     // Condition: when the button is in the "liked" state:
 *     ifState   : ifLiked,
 *     
 *     // CSS variable to assign when the condition is met:
 *     variable  : likeStateVars.likedAnimation,
 *     
 *     // Animation reference or value to apply:
 *     animation : options.likedAnimation,
 * };
 * 
 * // Animates an "unlike" button when toggled:
 * const unlikedCase : CssEphemeralAnimationCase = {
 *     ifState   : ifUnliked,
 *     variable  : likeStateVars.unlikedAnimation,
 *     animation : options.unlikedAnimation,
 * };
 * ```
 */
export interface CssEphemeralAnimationCase
    extends
        // Bases:
        CssAnimationCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifSorting`, `ifLiked`, `ifUnliked`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-sorting', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : CssAnimationCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `likeStateVars.likedAnimation` (recommended)
     */
    variable   : CssAnimationCase['variable']
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'liked']]`
     * - A strongly typed reference, e.g. `options.likedAnimation` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: CssAnimationCase['animation']
}



/**
 * Describes how ephemeral styling should behave:
 * - **Animations** for *visual effects* whenever an activity or status change occurs
 * - **Factors** for *gradual drivers* that control activity animations
 * 
 * Notes:
 * - During an animation, factor values are smoothly driven by the animation's keyframes.
 * - Once the animation completes, the factor *resets* to `unset`.
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
 * ```
 */
export interface CssEphemeralBehavior
    extends
        // Bases:
        CssAnimationBaseBehavior,
        CssAnimationFactorBehavior
{
    /**
     * Defines ephemeral animation cases for *visual effects* whenever an activity or status change occurs.
     * 
     * Automatically runs the corresponding animation whenever the component's activity or status change occurs.
     * 
     * Accepts either:
     * - A single `CssEphemeralAnimationCase`
     * - An array of `CssEphemeralAnimationCase[]`
     */
    animations      ?: MaybeArray<CssEphemeralAnimationCase>
    
    /**
     * Specifies a CSS variable for smooth transitions.
     * 
     * Provides a numeric variable for *gradual driver* that control activity animations.
     * Properties can fade in, fade out, or blend proportionally instead of switching abruptly.
     * 
     * Typical implementation: zero value represents starting activities, non-zero values represent in-progress activities.
     * Example range: 1 (unsorted illusion position) … 0 (original sorted position).
     * 
     * Always resolves to `baselineFactor` once the animation completes,
     * ensuring consistency across idle states.
     */
    factorVar        : CssAnimationFactorBehavior['factorVar']
    
    /**
     * Specifies a CSS variable for smooth transitions with idle fallback.
     * 
     * Provides a numeric variable for *gradual driver* that control activity animations,
     * with `unset` fallback behavior once the animation completes.
     * Properties can fade in, fade out, or blend proportionally instead of switching abruptly.
     * 
     * Typical implementation: zero value represents starting activities, non-zero values represent in-progress activities,
     * and `unset` represents idle state.
     * Example range: 1 (unsorted illusion position) … 0 (original sorted position) … unset (idle).
     * 
     * Always resolves to `unset` once the animation completes,
     * making it easier for default styles to take over gracefully.
     */
    factorCondVar    : CssAnimationFactorBehavior['factorCondVar']
    
    /**
     * Defines the condition for the idle baseline state.
     * 
     * Provides a way for `factorCondVar` to reset (`unset`) once the animation completes.
     */
    ifInactiveState  : CssAnimationFactorBehavior['ifInactiveState']
}
