// React:
import {
    // Types:
    type CSSProperties,
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



/**
 * Utility alias for `Object.prototype.hasOwnProperty`.
 */
const hasOwn = {}.hasOwnProperty;



/**
 * Recursively flattens deeply nested arrays into accumulated values.
 * 
 * @param buffer - The mutable accumulator reference.
 * @param values - Deeply nested array of values.
 * @param accumulate - Function that appends a single value into the buffer.
 */
export const flattenDeep = <TBuffer, TValue>(buffer: TBuffer, values: MaybeDeepArray<OptionalOrBoolean<TValue>>[], accumulate: (buffer: TBuffer, value: TValue) => void): void => {
    // Iterate through each value in the array:
    for (const value of values) {
        // Skip invalid values (`undefined`, `null`, `false`, and `true`):
        
        // FASTER:
        if (!value || (value === true)) continue; // Assumes `TValue` type always truthy.
        
        // SLOWER:
        // if ((value === undefined) || (value === null) || (value === true) || (value === false)) continue;
        
        
        
        if (Array.isArray(value)) {
            // Recursively process nested values:
            flattenDeep(buffer, value, accumulate);
            continue; // Continue to the next iteration.
        } // if
        
        
        
        // Append extracted value:
        accumulate(buffer, value);
    } // for
};

/**
 * Accumulates a class name or conditional mapping object into a buffer.
 * 
 * @param buffer - The class names buffer.
 * @param value - A class name or mapping object.
 */
export const accumulateClassName = (buffer: ClassNamesBuffer, value: string | Record<string, unknown>): void => {
    if (typeof value === 'string') {
        // Ignore empty string:
        if (value === '') return;
        
        
        
        // Append the class name directly:
        appendClassWithSpace(buffer, value);
    }
    else {
        // FASTER:
        for (const key in value) {
            // Skip properties that are not directly owned or are falsy:
            // - E.g: `{ boo: true, foo: false, bar: isEnabled }` → take 'boo' and 'bar' (if `isEnabled` is truthy).
            if (!hasOwn.call(value, key) || !value[key]) continue;
            
            
            
            // Append the class name from the key:
            appendClassWithSpace(buffer, key);
        } // if
        
        // SLOWER:
        // for (const entry of Object.entries(value)) {
        //     // Skip properties that are falsy:
        //     if (!entry[1]) continue;
        //     
        //     
        //     
        //     // Append the class name from the key:
        //     appendClassWithSpace(buffer, entry[0]);
        // } // for
    } // if
};

/**
 * Adds a class name with proper spacing.
 * 
 * @param buffer - The class names buffer.
 * @param className - The class name to append.
 */
const appendClassWithSpace = (buffer: ClassNamesBuffer, className: string) => {
    // Append with spacing if needed:
    if (buffer.value === '') {
        // If no classes collected yet, set directly:
        buffer.value = className;
    }
    else {
        // If classes already collected, append with a space:
        buffer.value += (' ' + className);
    } // if
};



/**
 * Accumulates a style object into a buffer by merging properties.
 * 
 * @param buffer - The style buffer (`CSSProperties` object).
 * @param value - The style object to merge.
 */
export const accumulateStyle = (buffer: CSSProperties, value: CSSProperties): void => {
    Object.assign(buffer, value);
};
