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



// Utilities:
const hasOwn = {}.hasOwnProperty;



/**
 * Generic collector interface for accumulating values of type `TCollected`.
 */
interface Collector<TCollected, TValue> {
    /**
     * Appends a value to the collector.
     * @param value - The value to add to the collection.
     */
    append(value: TValue): void
}

/**
 * Collects and merges class names into a single space-separated string.
 */
export class ClassCollector implements Collector<string, string> {
    /**
     * Holds the collected class names.
     */
    collected : string = '';
    
    /**
     * Appends a class name or mapped object to the collection.
     * Ensures proper spacing between multiple class names.
     * @param value - The class name or mapping object to append.
     */
    append(value: string | Record<string, unknown>): void {
        if (typeof value === 'string') {
            // Ignore empty strings:
            if (value === '') return;
            
            
            
            // Append the class name directly:
            this.#appendWithSpace(value);
        }
        else {
            // FASTER:
            for (const key in value) {
                // Skip properties that are not directly owned or are falsy:
                if (!hasOwn.call(value, key) || !value[key]) continue;
                
                
                
                // Append the class name from the key:
                this.#appendWithSpace(key);
            } // if
            
            // SLOWER:
            // for (const entry of Object.entries(value)) {
            //     // Skip properties that are falsy:
            //     if (!entry[1]) continue;
            //     
            //     
            //     
            //     // Append the class name from the key:
            //     this.#appendWithSpace(entry[0]);
            // } // for
        } // if
    }
    
    /**
     * Adds a class name to the collected string with proper spacing.
     * @param className - The class name to append.
     */
    #appendWithSpace(value: string) {
        // Append with spacing if needed:
        if (this.collected === '') {
            // If no classes collected yet, set directly:
            this.collected = value;
        }
        else {
            // If classes already collected, append with a space:
            this.collected += (' ' + value);
        } // if
    }
}

/**
 * Collects and merges style properties into a single `CSSProperties` object.
 */
export class StyleCollector implements Collector<CSSProperties, CSSProperties> {
    /**
     * Holds the collected style properties.
     */
    collected : CSSProperties = {};
    
    /**
     * Appends a new style object to the collection.
     * Uses `Object.assign()` to merge properties.
     * @param value - The style object to append.
     */
    append(value: CSSProperties): void {
        Object.assign(this.collected, value);
    }
}



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
