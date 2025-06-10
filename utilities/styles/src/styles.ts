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
    type Optional,
    type OptionalOrBoolean,
    type MaybeDeepArray,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Utilities:
import {
    // Utilities:
    ClassCollector,
    StyleCollector,
    deepReduce,
}                           from './collector-utilities.js'



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
 * @deprecated - Use `mergeClasses` instead.
 * 
 * Merges multiple class names into a **memoized array**, preserving stability where possible.
 * 
 * - Supports **static, dynamic, mapped, and deeply nested conditional class names**.
 * - Recursively flattens **nested arrays** and objects containing class mappings.
 * - Filters out `undefined`, `null`, booleans (`true`, `false`), and empty strings.
 * - Preserves the same reference **if the elements remain unchanged**.
 * - Generates a **new array** only when the `classes` actually changes.
 * 
 * @param {MaybeDeepArray<OptionalOrBoolean<string | Record<string, unknown>>>[]} classes
 *    - List of class names or mapping objects.
 *    - Strings are added as-is.
 *    - Objects allow conditional inclusion based on key-value pairs (`{ className: condition }`).
 *    - Nested arrays and objects are fully supported.
 * @returns {Optional<string>[]} A memoized array of class names.
 * 
 * @example
 * ```tsx
 * <div classes={useMergeClasses(
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
export const useMergeClasses = (...classes: MaybeDeepArray<OptionalOrBoolean<string | Record<string, unknown>>>[]): Optional<string>[] => {
    // Collect class names from deeply nested inputs:
    const classCollector = new ClassCollector();
    deepReduce(classCollector, classes);
    const mergedClassNames = classCollector.collected;
    
    
    
    // Preserve memoized reference for performance optimization:
    return useMemo<Optional<string>[]>(() => {
        // Split the concatenated class names into an array:
        return (
            // Optimization: Avoid unnecessary `.split(' ')` for single-class cases.
            // If `mergedClassNames` contains only one class (without spaces), splitting is redundant.
            mergedClassNames.includes(' ')
            ? mergedClassNames.split(' ')
            : [mergedClassNames]
        );
    }, [mergedClassNames]);
};

/**
 * @deprecated This version is unoptimized. Use `useMergeClasses` instead.
 */
export const useMergeClasses_BAK = (...classes: MaybeDeepArray<OptionalOrBoolean<string | Record<string, unknown>>>[]): Optional<string>[] => {
    // Flatten class names while ensuring correct order:
    const flattenedClasses = (
        ((classes as unknown[]).flat(Infinity) as string[]) // Recursively flattens nested arrays.
        .filter(isValidClass)                               // Filter out invalid class names (`undefined`, `null`, `true`, `false`, and empty strings).
        .flatMap((className) => className.split(' '))       // Expands space-separated class names into individual entries.
        .filter(isValidClass)                               // Ensures no empty strings remain after splitting.
    );
    
    
    
    // Preserve memoized reference for performance optimization:
    return useMemo<Optional<string>[]>(() => {
        return flattenedClasses;
    }, [JSON.stringify(flattenedClasses)]);
    // Performance Note: `JSON.stringify` works well for <20 items, ensuring stable references while avoiding complex comparisons.
};



/**
 * Determines if a given `className` is a valid class name.
 * 
 * - Accepts **only** non-empty strings.
 * - Rejects `undefined`, `null`, `true`, `false`, and empty strings.
 * 
 * @param {OptionalOrBoolean<string>} className - The value to validate, can be a string, `undefined`, `null`, `true`, or `false`.
 * @returns {boolean} `true` if valid, otherwise `false`.
 */
const isValidClass = (className: OptionalOrBoolean<string>): className is string => {
    return typeof className === 'string' && className.trim() !== '';
};

/**
 * Merges multiple class names into a single optimized string.
 * 
 * - Supports **static, dynamic, mapped, and deeply nested conditional class names**.
 * - Recursively flattens **nested arrays** and objects containing class mappings.
 * - Filters out `undefined`, `null`, booleans (`true`, `false`), and empty strings.
 * 
 * @param {MaybeDeepArray<OptionalOrBoolean<string | Record<string, unknown>>>[]} classes
 *    - List of class names or mapping objects.
 *    - Strings are added as-is.
 *    - Objects allow conditional inclusion based on key-value pairs (`{ className: condition }`).
 *    - Nested arrays and objects are fully supported.
 * @returns {string} A space-separated string of valid class names.
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
    // Collect class names from deeply nested inputs:
    const classCollector = new ClassCollector();
    deepReduce(classCollector, classes);
    return classCollector.collected;
};

/**
 * @deprecated This version is unoptimized. Use `mergeClasses` instead.
 */
export const mergeClasses_BAK = (...classes: MaybeDeepArray<OptionalOrBoolean<string | Record<string, unknown>>>[]): string => {
    return (
        ((classes as unknown[]).flat(Infinity) as string[]) // Recursively flattens nested arrays.
        .filter(isValidClass)                               // Filter out invalid class names (`undefined`, `null`, `true`, `false`, and empty strings).
        .flatMap((className) => className.split(' '))       // Expands space-separated class names into individual entries.
        .filter(isValidClass)                               // Ensures no empty strings remain after splitting.
        .join(' ')                                          // Join valid class names with a space.
    );
};



/**
 * Determines if a given `style` is a valid CSS style object.
 * 
 * - Accepts **only non-null objects** representing valid CSS properties.
 * - Rejects `undefined`, `null`, `true`, `false`, and non-object values.
 * 
 * @param {OptionalOrBoolean<CSSProperties>} style - The value to validate.
 * @returns {boolean} `true` if valid, otherwise `false`.
 */
const isValidStyle = (style: OptionalOrBoolean<CSSProperties>): style is CSSProperties => {
    return (typeof style === 'object') && (style !== null);
};

/**
 * Merges multiple style objects into a **single optimized style object**.
 * 
 * - Supports **static, dynamic, and deeply nested conditional styles**.
 * - Recursively flattens **nested arrays** of styles into a unified object.
 * - Filters out `undefined`, `null`, booleans (`true`, `false`), and non-object values.
 * - Preserves reference stability, generating a **new object only when styles change**.
 * 
 * @param { MaybeDeepArray<OptionalOrBoolean<CSSProperties>>[]} styles - List of style objects, including deeply nested structures and conditional values.
 * @returns {CSSProperties} A memoized merged style object.
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
    // Collect style properties from deeply nested inputs:
    const styleCollector = new StyleCollector();
    deepReduce(styleCollector, styles);
    const mergedStyles = styleCollector.collected;
    
    
    
    // Preserve memoized reference for performance optimization:
    return useMemo<CSSProperties>(() => {
        return mergedStyles;
    }, [JSON.stringify(mergedStyles)]);
    // Performance Note: `JSON.stringify` works well for small inline styles, ensuring stable references while avoiding complex comparisons.
};

/**
 * @deprecated This version is unoptimized. Use `useMergeStyles` instead.
 */
export const useMergeStyles_BAK = (...styles: MaybeDeepArray<OptionalOrBoolean<CSSProperties>>[]): CSSProperties => {
    // Flatten and filter valid styles:
    const validStyles = (
        ((styles as unknown[]).flat(Infinity) as CSSProperties[]) // Recursively flattens nested arrays.
        .filter(isValidStyle)                                     // Filter out invalid styles (`undefined`, `null`, `true`, `false`, and empty strings).
    );
    
    
    
    // Preserve memoized reference for performance optimization:
    return useMemo<CSSProperties>(() => {
        // // Return `undefined` if no valid styles exist:
        // if (!validStyles.length) return undefined;
        
        
        
        // Merge styles into a single object:
        const mergedStyles = Object.assign({}, ...validStyles) as CSSProperties;
        
        
        
        // // Return `undefined` if no styles exist:
        // if (!Object.keys(mergedStyles).length) return undefined;
        
        
        
        // Return the merged styles object:
        return mergedStyles;
    }, [JSON.stringify(validStyles)]);
    // Performance Note: `JSON.stringify` works well for small inline styles, ensuring stable references while avoiding complex comparisons.
};
