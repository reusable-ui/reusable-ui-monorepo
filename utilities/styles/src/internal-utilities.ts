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



export const hasOwn = {}.hasOwnProperty;



/**
 * Recursively reduces deeply nested arrays into collected values.
 * @param collector - The collector instance managing accumulation.
 * @param values - Deeply nested array structure containing values.
 */
export function deepReduce<TCollected, TValue>(collector: Collector<TCollected, TValue>, values: MaybeDeepArray<OptionalOrBoolean<TValue>>[]): void {
    // Iterate through each value in the array:
    for (const value of values) {
        // Skip invalid values (`undefined`, `null`, `false`, and `true`):
        
        // FASTER:
        if (!value || (value === true)) continue; // Assumes `TValue` type always truthy.
        
        // SLOWER:
        // if ((value === undefined) || (value === null) || (value === true) || (value === false)) continue;
        
        
        
        if (Array.isArray(value)) {
            // Recursively process nested values:
            deepReduce(collector, value);
            continue; // Continue to the next iteration.
        } // if
        
        
        
        // Append extracted value:
        collector.append(value);
    } // for
}
