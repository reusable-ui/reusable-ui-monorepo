// React:
import {
    // Types:
    type CSSProperties,
    
    
    
    // Hooks:
    useMemo as useMemoConditional,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    type OptionalOrBoolean,
    type MaybeDeepArray,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type ClassNamesBuffer,
}                           from './internal-types.js'

// Utilities:
import {
    flattenDeep,
    accumulateClassName,
    accumulateStyle,
}                           from './internal-utilities.js'



/**
 * Conditionally overrides React's `useMemo` for benchmarking mode.
 * 
 * - **Production Mode (`NODE_ENV !== 'benchmark`)** → Uses the standard `useMemo` from React.
 * - **Benchmark Mode (`NODE_ENV === 'benchmark`)** → Disables memoization by executing the factory function directly.
 * - **Prevents dependency tracking** to measure raw execution time.
 */
const useMemo : typeof useMemoConditional = (process.env.NODE_ENV !== 'benchmark') ? useMemoConditional : <T>(factory: () => T) => factory();



// Hooks:

/**
 * Merges multiple class names into a single normalized string.
 * 
 * - Supports **static, dynamic, mapped, and deeply nested conditional class names**.
 * - Recursively flattens **nested arrays** and objects containing class mappings.
 * - Filters out `undefined`, `null`, booleans (`true`, `false`), and empty strings.
 * 
 * @param classes - Class name strings, conditional objects, or nested arrays.
 *    - Strings are added as-is.
 *    - Objects include keys conditionally (`{ className: condition }`).
 *    - Nested arrays and objects are fully supported.
 * @returns A space-separated string of valid class names.
 * 
 * @example
 * ```tsx
 * <div className={mergeClasses(
 *     // Preserves existing class names:
 *     props.className,
 *     
 *     // Static class:
 *     'base-class',
 *     
 *     Conditional classes:
 *     condition1 && 'c1',                 // Conditional class (truthy)
 *     condition2 && ['c2', ['c3']],       // Deeply nested conditional classes
 *     condition3 ? 'c4' : null,           // Ternary-based conditional class
 *     condition4 ? undefined : 'c5',      // Handles undefined cases
 *     condition5 ? ['c6', ['c7']] : 'c8', // Conditional deep array vs single class
 *     condition6 ? 'c9 c10' : 'c11 c12',  // Space-separated class variations
 *     
 *     // Object-based conditional mapping:
 *     {
 *        primary: isPrimary,              // Adds "primary" if `isPrimary` is truthy
 *        secondary: isSecondary,          // Adds "secondary" if `isSecondary` is truthy
 *     },
 *     
 *     // Nested objects inside arrays:
 *     [
 *       { active: isActive },
 *       ['rounded', { shadow: hasShadow }]
 *     ]
 * )}>
 *     Content
 * </div>
 * ```
 */
export const mergeClasses = (...classes: MaybeDeepArray<OptionalOrBoolean<string | Record<string, unknown>>>[]): string => {
    // Holds the accumulated class string:
    const buffer : ClassNamesBuffer = { value: '' };
    
    
    
    // Traverse and flatten all nested inputs, appending valid class names into the buffer:
    flattenDeep(buffer, classes, accumulateClassName);
    
    
    
    // Return the final space-separated class string:
    return buffer.value;
};



/**
 * Merges multiple style objects into a single normalized `CSSProperties` object.
 * 
 * - Supports **static, dynamic, and deeply nested conditional styles**.
 * - Recursively flattens **nested arrays** of styles into one object.
 * - Filters out `undefined`, `null`, booleans (`true`, `false`), and non-object values.
 * - Preserves reference stability by memoizing the merged result.
 * 
 * @param styles - List of style objects, including deeply nested structures and conditional values.
 * @returns A memoized merged style object.
 * 
 * @example
 * ```tsx
 * <div style={useMergeStyles(
 *     // Preserve existing inline style:
 *     props.style,
 *     
 *     // Static styles:
 *     { display: 'grid', overflow: 'hidden' },
 *     
 *     // Conditional styles:
 *     condition1 && { color: 'red' },                           // Conditional styles (truthy)
 *     condition2 && [{ padding: '10px' }, [{ margin: '5px' }]], // Deeply nested conditional styles
 *     condition3 ? { opacity: 0.8 } : null,                     // Ternary-based conditional styles
 *     condition4 ? undefined : { border: '1px solid' },         // Handling undefined cases
 *     condition5 ? [{ fontSize: '16px' }, [{ fontWeight: 'bold' }]] : { fontStyle: 'italic' }, // Conditional deep array vs single object
 * )}>
 *     Content
 * </div>
 * ```
 */
export const useMergeStyles = (...styles: MaybeDeepArray<OptionalOrBoolean<CSSProperties>>[]): CSSProperties => {
    // Holds the accumulated style object:
    const buffer : CSSProperties = {};
    
    
    
    // Traverse and flatten all nested inputs, merging style properties into the buffer:
    flattenDeep(buffer, styles, accumulateStyle);
    
    
    
    // Memoize the merged style object for stable reference and performance optimization:
    return useMemo<CSSProperties>(() => {
        return buffer;
    }, [JSON.stringify(buffer)]);
    // Note: `JSON.stringify` is effective for small inline styles,
    // ensuring stable references without requiring deep comparison logic.
};
