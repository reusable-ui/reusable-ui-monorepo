// Cssfn:
import {
    // Cssfn general types:
    type OptionalOrBoolean,
    type MaybeDeepArray,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type Collector,
}                           from './internal-types.js'



/**
 * Recursively flattens deeply nested arrays into collected values.
 * 
 * @param collector - The collector instance.
 * @param values - Deeply nested array structure containing values.
 */
export function flattenDeep<TValue>(collector: Collector<TValue>, values: MaybeDeepArray<OptionalOrBoolean<TValue>>[]): void {
    // Iterate through each value in the array:
    for (const value of values) {
        // Skip invalid values (`undefined`, `null`, `false`, and `true`):
        
        // FASTER:
        if (!value || (value === true)) continue; // Assumes `TValue` type always truthy.
        
        // SLOWER:
        // if ((value === undefined) || (value === null) || (value === true) || (value === false)) continue;
        
        
        
        if (Array.isArray(value)) {
            // Recursively process nested values:
            flattenDeep(collector, value);
            continue; // Continue to the next iteration.
        } // if
        
        
        
        // Append extracted value:
        collector.append(value);
    } // for
}
