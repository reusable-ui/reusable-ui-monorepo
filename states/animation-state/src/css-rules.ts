// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Writes css in javascript:
    atRule,
    states,
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type AnimationBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for animation styling, including:
 * - **Animation variables** for *visual effects* whenever the corresponding state becomes active
 * - **Factor variables** for *movement drivers* of the animation's motion.
 * 
 * @param animationBehavior - The animation styling behaviors to apply.
 * @returns A `CssRule` that enables animation styling to work correctly and dynamically.
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
 * 
 * // Apply order animations alongside other styles:
 * return style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     
 *     // Apply animation state rule:
 *     ...orderAnimations,
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
        
        
        
        ...(('factorVar' in animationBehavior) ? (() => {
            // Extract animation factor behavior and assign defaults:
            const {
                factorVar,
                factorCondVar,
                ifInactiveState,
                baselineFactor  = 0,
            } = animationBehavior;
            
            
            
            return {
                // Apply primary factor variable:
                
                // Register `factorVar` as an animatable custom property:
                // - `initialValue: baselineFactor` ensures baseline resolves to `baselineFactor` when not explicitly defined (`unset`).
                ...atRule(`@property ${factorVar.slice(4, -1)}`, { // fix: var(--customProp) => --customProp
                    // @ts-ignore - `csstype` doesn't yet recognize `syntax` @property descriptor.
                    syntax       : '"<number>"',   // Restrict to numeric values.
                    
                    // @ts-ignore - `csstype` doesn't yet recognize `inherits` @property descriptor.
                    inherits     : true,           // Allow inheritance into nested elements.
                    
                    // @ts-ignore - `csstype` doesn't yet recognize `initialValue` @property descriptor.
                    initialValue : baselineFactor, // Default baseline factor = baselineFactor.
                }),
                
                
                
                // Apply conditional factor variable:
                
                // Mirror `factorVar` into `factorCondVar` by default:
                // - During transitions and active states, `factorCondVar` follows `factorVar`.
                ...vars({
                    [factorCondVar]: factorVar,
                }),
                
                // Drop `factorCondVar` when baseline inactive state is reached:
                // - Explicitly set to `unset` so dependent declarations fall back cleanly.
                ...states(
                    // Only unset the variable if the baseline inactive state condition is met:
                    ifInactiveState(
                        vars({
                            [factorCondVar]: 'unset',
                        })
                    )
                ),
            };
        })() : undefined)
    });
};
