// Cssfn:
import {
    // Arrays:
    type MaybeArray,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Writes css in javascript:
    states,
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type AnimationCase,
}                           from './css-types.js'



/**
 * Applies animation cases for styling.
 * 
 * Runs the corresponding animation automatically whenever `useAnimationState()` activates the matching classname.
 * 
 * Accepts either:
 * - A single `AnimationCase`
 * - An array of `AnimationCase[]`
 * 
 * @param animationCases - One or more animation case definitions.
 * @returns A `CssRule` that applies the specified animations when their state conditions are met.
 * 
 * @example
 * ```ts
 * // Single animation case:
 * const validatingAnimation : CssRule = usesAnimationState({
 *     ifState   : ifValidating,
 *     variable  : validityStateVars.animationValidating,
 *     animation : options.animationValidating,
 * });
 * 
 * // Multiple animation cases:
 * const validityAnimations : CssRule = usesAnimationState([
 *     {
 *         ifState   : ifInvalidating,
 *         variable  : validityStateVars.animationInvalidating,
 *         animation : options.animationInvalidating,
 *     },
 *     {
 *         ifState   : ifUnvalidating,
 *         variable  : validityStateVars.animationUnvalidating,
 *         animation : options.animationUnvalidating,
 *     },
 * ]);
 * 
 * return style({
 *     ...validatingAnimation,
 *     ...validityAnimations,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usesAnimationState = (animationCases: MaybeArray<AnimationCase>): CssRule => {
    // Normalize input: always work with an array internally:
    const normalizedAnimationCases = (
        Array.isArray(animationCases)
        ? animationCases
        : [animationCases]
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
