// React:
import {
    // Types:
    type CSSProperties,
}                           from 'react'

// Types:
import {
    type Collector,
}                           from './internal-types.js'



/**
 * Determines if an object has a property as its own (not inherited) property.
 */
const hasOwn = {}.hasOwnProperty;



/**
 * Collects and merges class names into a single space-separated string.
 */
export class ClassCollector implements Collector<string> {
    /**
     * The accumulated class names.
     */
    collected : string = '';
    
    
    
    /**
     * Appends a class name or conditional mapping object.
     * 
     * @param value - The class name or mapping object.
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
     * Adds a class name with proper spacing.
     * 
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
export class StyleCollector implements Collector<CSSProperties> {
    /**
     * The accumulated style object.
     */
    collected : CSSProperties = {};
    
    
    
    /**
     * Appends a style object by merging properties.
     * 
     * @param value - The style object to merge.
     */
    append(value: CSSProperties): void {
        Object.assign(this.collected, value);
    }
}
