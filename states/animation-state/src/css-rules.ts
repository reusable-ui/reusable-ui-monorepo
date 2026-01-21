// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Writes css in javascript:
    states,
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type AnimationBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for animation styling.
 * 
 * Activates **animation variables** for *visual effects* whenever the corresponding state becomes active.
 * 
 * Each animation case provides:
 * - **`ifState`**
 *   Determines when the animation applies.
 * - **`variable`**
 *   Specifies the CSS variable to assign when the state condition is met.
 * - **`animation`**
 *   Specifies the animation value or reference to apply to the variable.
 * 
 * @param animationBehavior - The animation styling behaviors to apply.
 * @returns A `CssRule` that enables animation styling to work correctly and dynamically.
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
 * 
 * // Apply validity animations alongside other styles:
 * return style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     
 *     // Apply validity state rule:
 *     ...validityStateRule,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usesAnimationState = (animationBehavior: AnimationBehavior): CssRule => {
    // Extract animation behavior and assign defaults:
    const {
        animations = [],
    } = animationBehavior;
    
    
    
    // Normalize input: always work with an array internally:
    const normalizedAnimationCases = (
        Array.isArray(animations)
        ? animations
        : [animations]
    );
    
    
    
    return style({
        ...states(
            // Declare conditional animation for each case:
            normalizedAnimationCases.map(({ ifState, variable, animation }) =>
                // Only apply the animation if the state condition is met:
                ifState(
                    vars({
                        // Assign the CSS variable with the provided animation.
                        // - [variable] => ['var(--var-name)'] → normalized internally to ['--var-name']
                        // - If `animation` is undefined, fallback to 'none'.
                        //   Note: avoid nullish coalescing (??) because `null` is a valid explicit value.
                        [variable]: (animation !== undefined) ? animation : 'none',
                    })
                )
            )
        ),
    });
};
