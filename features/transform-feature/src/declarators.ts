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
    type TransformFeatureVars,
    type CssTransformFeatureOptions,
    type CssTransformFeature,
}                           from './types.js'

// Registries:
import {
    transformRegistry,
}                           from './registry.js'



/**
 * A strongly typed global mapping of transform-related CSS variables used for composing transform stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [transformFeatureVars] = cssVars<TransformFeatureVars>({ prefix: 'tm', minify: false });

/**
 * Composes custom and registered transforms into a unified stack
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing transform behavior.
 * @returns A CSS API for composing a unified transform stack from custom and registered state packages.
 */
export const usesTransformFeature = (options?: CssTransformFeatureOptions): CssTransformFeature => {
    // Extract options and assign defaults:
    const {
        transform : customTransforms = null,
    } = options ?? {};
    
    
    
    return {
        transformFeatureRule : () => {
            // No peer variant dependencies yet.
            
            
            
            return style({
                // Pre-reset registered transform variables to prevent inheritance and ensuring the final `transform` property remains valid—even when no transforms are active:
                ...fallback({ // The `fallback()` ensures the resets are written before any other declarations.
                    ...rules(
                        transformRegistry.transforms.map((variable) =>
                            vars({
                                [variable]: 'translate(0)', // no-op transform
                            })
                        )
                    ),
                }),
                
                
                
                // Final composed transform stack:
                ...vars({
                    [transformFeatureVars.transform]: [[
                        // Custom transforms (if provided):
                        ...((
                            !Array.isArray(customTransforms)
                            
                            // Handle string and null:
                            ? (
                                (customTransforms === null)
                                
                                ? [
                                    /* No custom transform */
                                ]
                                
                                : [
                                    /* Single custom transform */
                                    customTransforms as CssKnownValueOf<'transform'>,
                                ]
                            )
                            
                            // Handle `[value1, value2, ...]`, `[[value1, value2, ...]]`, `[value1, value2, ..., '!important']`, `[[value1, value2, ...], '!important']`:
                            : ((): CssKnownValueOf<'transform'>[] => {
                                /**
                                 * Strip `!important` suffix if present.
                                 * 
                                 * Examples:
                                 * - Single transform:
                                 * ```
                                 *     ['contrast(0.75)', '!important']
                                 *     =>
                                 *     ['contrast(0.75)']
                                 * ```
                                 * 
                                 * - Multiple transforms:
                                 * ```ts
                                 *     [[
                                 *         'contrast(0.75)',
                                 *         'sepia(0.25)',
                                 *         'opacity(0.85)',
                                 *     ], '!important']
                                 *     =>
                                 *     [[
                                 *         'contrast(0.75)',
                                 *         'sepia(0.25)',
                                 *         'opacity(0.85)',
                                 *     ]]
                                 * ```
                                 */
                                const rawValues = (
                                    (customTransforms.at(-1) !== '!important')
                                    // Already not having `!important` suffix:
                                    ? customTransforms              as MaybeArray<CssKnownValueOf<'transform'>>[]
                                    
                                    // Remove `!important` suffix:
                                    : customTransforms.slice(0, -1) as MaybeArray<CssKnownValueOf<'transform'>>[]
                                );
                                
                                
                                
                                // Return single custom transform (multi of single):
                                if (rawValues.some((rawValue) => !Array.isArray(rawValue))) return (
                                    rawValues as CssKnownValueOf<'transform'>[]
                                );
                                
                                
                                
                                // Unwrap multi custom transforms:
                                return rawValues.flat() satisfies CssKnownValueOf<'transform'>[];
                            })()
                        ) satisfies CssKnownValueOf<'transform'>[]),
                        
                        
                        
                        // Registered transforms:
                        ...transformRegistry.transforms.map((variable) =>
                            variable satisfies CssKnownValueOf<'transform'>
                        ) satisfies CssKnownValueOf<'transform'>[],
                    ]] satisfies CssKnownValueOf<'transform'>[][],
                }),
            });
        },
        
        transformFeatureVars,
    } satisfies CssTransformFeature;
};
