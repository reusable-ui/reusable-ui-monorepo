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
    type FilterFeatureVars,
    type CssFilterFeatureOptions,
    type CssFilterFeature,
}                           from './types.js'

// Registries:
import {
    filterRegistry,
}                           from './registry.js'



/**
 * A strongly typed global mapping of filter-related CSS variables used for composing filter stacks.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [filterFeatureVars] = cssVars<FilterFeatureVars>({ prefix: 'fr', minify: false });

/**
 * Composes custom and registered filters into a unified stack
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing filter behavior.
 * @returns A CSS API for composing a filter stack from custom and registered state packages.
 */
export const usesFilterFeature = (options?: CssFilterFeatureOptions): CssFilterFeature => {
    // Extract options and assign defaults:
    const {
        filter : customFilters = null,
    } = options ?? {};
    
    
    
    return {
        filterFeatureRule : () => {
            // No peer variant dependencies yet.
            
            
            
            return style({
                // Pre-reset registered filter variables to prevent inheritance and ensuring the final `filter` property remains valid—even when no filters are active:
                ...fallback({ // The `fallback()` ensures the resets are written before any other declarations.
                    ...rules(
                        filterRegistry.filters.map((variable) =>
                            vars({
                                [variable]: 'brightness(1)', // no-op filter
                            })
                        )
                    ),
                }),
                
                
                
                // Final composed filter stack:
                ...vars({
                    [filterFeatureVars.filter]: [[
                        // Custom filters (if provided):
                        ...((
                            !Array.isArray(customFilters)
                            
                            // Handle string and null:
                            ? (
                                (customFilters === null)
                                
                                ? [
                                    /* No custom filter */
                                ]
                                
                                : [
                                    /* Single custom filter */
                                    customFilters as CssKnownValueOf<'filter'>,
                                ]
                            )
                            
                            // Handle `[value1, value2, ...]`, `[[value1, value2, ...]]`, `[value1, value2, ..., '!important']`, `[[value1, value2, ...], '!important']`:
                            : ((): CssKnownValueOf<'filter'>[] => {
                                /**
                                 * Strip `!important` suffix if present.
                                 * 
                                 * Examples:
                                 * - Single filter:
                                 * ```
                                 *     ['contrast(0.75)', '!important']
                                 *     =>
                                 *     ['contrast(0.75)']
                                 * ```
                                 * 
                                 * - Multiple filters:
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
                                    (customFilters.at(-1) !== '!important')
                                    // Already not having `!important` suffix:
                                    ? customFilters              as MaybeArray<CssKnownValueOf<'filter'>>[]
                                    
                                    // Remove `!important` suffix:
                                    : customFilters.slice(0, -1) as MaybeArray<CssKnownValueOf<'filter'>>[]
                                );
                                
                                
                                
                                // Return single custom filter (multi of single):
                                if (rawValues.some((rawValue) => !Array.isArray(rawValue))) return (
                                    rawValues as CssKnownValueOf<'filter'>[]
                                );
                                
                                
                                
                                // Unwrap multi custom filters:
                                return rawValues.flat() satisfies CssKnownValueOf<'filter'>[];
                            })()
                        ) satisfies CssKnownValueOf<'filter'>[]),
                        
                        
                        
                        // Registered filters:
                        ...filterRegistry.filters.map((variable) =>
                            variable satisfies CssKnownValueOf<'filter'>
                        ) satisfies CssKnownValueOf<'filter'>[],
                    ]] satisfies CssKnownValueOf<'filter'>[][],
                }),
            });
        },
        
        filterFeatureVars,
    } satisfies CssFilterFeature;
};
