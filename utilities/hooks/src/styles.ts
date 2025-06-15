// React:
import {
    // Types:
    type CSSProperties,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    type Optional,
    type MaybeDeepArray,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Utilities:
import {
    // Hooks:
    useMergeClasses as importedUseMergeClasses,
    useMergeStyles  as importedUseMergeStyles,
}                           from '@reusable-ui/styles'          // A utility package for merging and optimizing styles and class names in React applications.



/**
 * @deprecated - Use `mergeClasses` from '@reusable-ui/callbacks' instead.
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
export const useMergeClasses = (...classes: MaybeDeepArray<Optional<string>>[]): Optional<string>[] => importedUseMergeClasses(...classes);



/**
 * @deprecated - Use `useMergeStyles` from '@reusable-ui/callbacks' instead.
 * 
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
export const useMergeStyles = (...styles: Optional<CSSProperties>[]): CSSProperties | undefined => importedUseMergeStyles(...styles);
