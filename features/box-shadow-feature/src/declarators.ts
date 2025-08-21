// Cssfn:
import {
    // Arrays:
    type MaybeArray,
    
    
    
    // Cssfn css specific types:
    type CssKnownValueOf,
    
    
    
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
    type BoxShadowFeatureVars,
    type CssBoxShadowFeatureOptions,
    type CssBoxShadowFeature,
}                           from './types.js'

// Registries:
import {
    boxShadowRegistry,
}                           from './registry.js'



/**
 * A strongly typed global mapping of box-shadow-related CSS variables used for composing box shadow stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [boxShadowFeatureVars] = cssVars<BoxShadowFeatureVars>({ prefix: 'bw', minify: false });

/**
 * Composes custom and registered box shadows into a unified stack
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing box shadow behavior.
 * @returns A CSS API for composing a unified box shadow stack from custom and registered state packages.
 */
export const usesBoxShadowFeature = (options?: CssBoxShadowFeatureOptions): CssBoxShadowFeature => {
    // Extract options and assign defaults:
    const {
        boxShadow : customBoxShadows = null,
    } = options ?? {};
    
    
    
    return {
        boxShadowFeatureRule : () => {
            // No peer variant dependencies yet.
            
            
            
            return style({
                // Pre-reset registered box shadow variables to prevent inheritance and ensuring the final `boxShadow` property remains valid—even when no box shadows are active:
                ...fallback({ // The `fallback()` ensures the resets are written before any other declarations.
                    ...rules(
                        boxShadowRegistry.boxShadows.map((variable) =>
                            vars({
                                [variable]: 'transparent 0 0', // no-op box shadow
                            })
                        )
                    ),
                }),
                
                
                
                // Final composed box shadow stack:
                ...vars({
                    [boxShadowFeatureVars.boxShadow]: [
                        // Custom box shadows (if provided):
                        ...((
                            !Array.isArray(customBoxShadows)
                            
                            // Handle string, number, and null:
                            ? (
                                (customBoxShadows === null)
                                
                                ? [
                                    /* No custom box shadow */
                                ]
                                
                                : [
                                    /* Single custom box shadow */
                                    [customBoxShadows as CssKnownValueOf<'boxShadow'>],
                                ]
                            )
                            
                            // Handle `[value1, value2, ...]`, `[[value1, value2, ...]]`, `[value1, value2, ..., '!important']`, `[[value1, value2, ...], '!important']`:
                            : ((): CssKnownValueOf<'boxShadow'>[][] => {
                                /**
                                 * Strip `!important` suffix if present.
                                 * 
                                 * Examples:
                                 * - Single box shadow:
                                 * ```
                                 *     ['red', '10px', '5px', '5px', '!important']
                                 *     =>
                                 *     ['red', '10px', '5px', '5px']
                                 * ```
                                 * 
                                 * - Multiple box shadows:
                                 * ```ts
                                 *     [
                                 *         ['red', '10px', '5px', '5px'],
                                 *         ['teal', '60px', '-16px'],
                                 *         ['gold', '5em', '1em', 'inset'],
                                 *         '!important',
                                 *     ]
                                 *     =>
                                 *     [
                                 *         ['red', '10px', '5px', '5px'],
                                 *         ['teal', '60px', '-16px'],
                                 *         ['gold', '5em', '1em', 'inset'],
                                 *     ]
                                 * ```
                                 */
                                const rawValues = (
                                    (customBoxShadows.at(-1) !== '!important')
                                    // Already not having `!important` suffix:
                                    ? customBoxShadows              as MaybeArray<CssKnownValueOf<'boxShadow'>>[]
                                    
                                    // Remove `!important` suffix:
                                    : customBoxShadows.slice(0, -1) as MaybeArray<CssKnownValueOf<'boxShadow'>>[]
                                );
                                
                                
                                
                                // Wrap single custom box shadow (multi of single):
                                if (rawValues.some((rawValue) => !Array.isArray(rawValue))) return [
                                    rawValues as CssKnownValueOf<'boxShadow'>[]
                                ];
                                
                                
                                
                                // Return multi custom box shadows:
                                return rawValues as CssKnownValueOf<'boxShadow'>[][];
                            })()
                        ) satisfies CssKnownValueOf<'boxShadow'>[][]),
                        
                        
                        
                        // Registered box shadows:
                        ...boxShadowRegistry.boxShadows.map((variable) =>
                            [variable] satisfies CssKnownValueOf<'boxShadow'>[]
                        ) satisfies CssKnownValueOf<'boxShadow'>[][],
                    ] satisfies CssKnownValueOf<'boxShadow'>[][],
                }),
            });
        },
        
        boxShadowFeatureVars,
    } satisfies CssBoxShadowFeature;
};
