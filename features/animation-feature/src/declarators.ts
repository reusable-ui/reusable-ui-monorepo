// Cssfn:
import {
    // Arrays:
    type MaybeArray,
    
    
    
    // Cssfn css specific types:
    type CssKnownValueOf,
    type CssCustomKeyframesRef,
    
    
    
    // Writes css in javascript:
    rules,
    fallback,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type AnimationFeatureVars,
    type CssAnimationFeatureOptions,
    type CssAnimationFeature,
}                           from './types.js'

// Registries:
import {
    animationRegistry,
}                           from './registry.js'



/**
 * A strongly typed global mapping of animation-related CSS variables used for composing animation stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [animationFeatureVars] = cssVars<AnimationFeatureVars>({ prefix: 'an', minify: false });

/**
 * Composes custom and registered animations into a unified stack
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing animation behavior.
 * @returns A CSS API for composing an animation stack from custom and registered state packages.
 */
export const usesAnimationFeature = (options?: CssAnimationFeatureOptions): CssAnimationFeature => {
    // Extract options and assign defaults:
    const {
        animation : customAnimations = null,
    } = options ?? {};
    
    
    
    return {
        animationFeatureRule : () => {
            // No peer variant dependencies yet.
            
            
            
            return style({
                // Pre-reset registered animation variables to prevent inheritance and ensuring the final `animation` property remains valid—even when no animations are active:
                ...fallback({ // The `fallback()` ensures the resets are written before any other declarations.
                    ...rules(
                        animationRegistry.animations.map((variable) =>
                            vars({
                                [variable]: 'none',
                            })
                        )
                    ),
                }),
                
                
                
                // Final composed animation stack:
                ...vars({
                    [animationFeatureVars.animation]: [
                        // Custom animations (if provided):
                        ...((
                            !Array.isArray(customAnimations)
                            
                            // Handle string, number, null, and `CssCustomKeyframesRef`:
                            ? (
                                (customAnimations === null)
                                
                                ? [
                                    /* No custom animation */
                                ]
                                
                                : [
                                    /* Single custom animation */
                                    [customAnimations satisfies string | number | CssCustomKeyframesRef],
                                ]
                            )
                            
                            // Handle `[value1, value2, ...]`, `[[value1, value2, ...]]`, `[value1, value2, ..., '!important']`, `[[value1, value2, ...], '!important']`:
                            : ((): (CssKnownValueOf<'animation'> | CssCustomKeyframesRef)[][] => {
                                /**
                                 * Strip `!important` suffix if present.
                                 * 
                                 * Examples:
                                 * - Single animation:
                                 * ```
                                 *     ['300ms', 'ease-out', 'both', 'fadeIn', '!important']
                                 *     =>
                                 *     ['300ms', 'ease-out', 'both', 'fadeIn']
                                 * ```
                                 * 
                                 * - Multiple animations:
                                 * ```ts
                                 *     [
                                 *         ['300ms', 'ease-out', 'both', 'fadeIn'],
                                 *         ['500ms', 'ease-in', 'backwards', 'slide'],
                                 *         ['200ms', 'ease-in-out', 'forwards', 'bounce'],
                                 *         '!important',
                                 *     ]
                                 *     =>
                                 *     [
                                 *         ['300ms', 'ease-out', 'both', 'fadeIn'],
                                 *         ['500ms', 'ease-in', 'backwards', 'slide'],
                                 *         ['200ms', 'ease-in-out', 'forwards', 'bounce'],
                                 *     ]
                                 * ```
                                 */
                                const rawValues = (
                                    (customAnimations.at(-1) !== '!important')
                                    // Already not having `!important` suffix:
                                    ? customAnimations              as MaybeArray<CssKnownValueOf<'animation'> | CssCustomKeyframesRef>[]
                                    
                                    // Remove `!important` suffix:
                                    : customAnimations.slice(0, -1) as MaybeArray<CssKnownValueOf<'animation'> | CssCustomKeyframesRef>[]
                                );
                                
                                
                                
                                // Wrap single custom animation (multi of single):
                                if (rawValues.some((rawValue) => !Array.isArray(rawValue))) return [
                                    rawValues as (CssKnownValueOf<'animation'> | CssCustomKeyframesRef)[]
                                ];
                                
                                
                                
                                // Return multi custom animations:
                                return rawValues as (CssKnownValueOf<'animation'> | CssCustomKeyframesRef)[][];
                            })()
                        ) satisfies (CssKnownValueOf<'animation'> | CssCustomKeyframesRef)[][]),
                        
                        
                        
                        // Registered animations:
                        ...animationRegistry.animations.map((variable) =>
                            [variable] satisfies CssKnownValueOf<'animation'>[]
                        ) satisfies (CssKnownValueOf<'animation'> | CssCustomKeyframesRef)[][],
                    ] satisfies (CssKnownValueOf<'animation'> | CssCustomKeyframesRef)[][],
                }),
            });
        },
        
        animationFeatureVars,
    } satisfies CssAnimationFeature;
};
