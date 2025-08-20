// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomSimpleRef,
}                           from '@cssfn/core'          // Writes css in javascript.

// Other libs:
import {
    // Types:
    type Subscribable,
    
    
    
    // Observables:
    Subject,
}                           from 'rxjs'

// Types:
import {
    type CssFilterRegistry,
}                           from './types.js'



/**
 * Represents a single entry in the filter registry.
 * 
 * Each entry defines a CSS variable reference and its stacking priority.
 */
interface FilterEntry {
    /**
     * A unique CSS variable reference representing a filter layer.
     */
    variable : CssCustomSimpleRef
    
    /**
     * Determines stacking order; higher values appear later in the filter stack.
     */
    priority : number
}



/**
 * An internal store of registered filter entries.
 * 
 * Preserves insertion order and supports priority-aware stacking for filter resolution.
 */
const registeredFilters : FilterEntry[] = [];

/**
 * Event stream for notifying filter registry changes.
 */
const subscribers = new Subject<CssCustomSimpleRef>();

/**
 * Reactive interface for subscribing to filter registry updates.
 */
const onFilterChange : Subscribable<CssCustomSimpleRef> = {
    subscribe: subscribers.subscribe,
};



/**
 * A registry for unifying filter layers across independent state packages.
 * 
 * Supports dynamic registration of filter variables with priority-aware stacking.
 */
export const filterRegistry : CssFilterRegistry = {
    get filters() {
        return registeredFilters.map(({ variable }) => variable);
    },
    
    registerFilter(filterVariable, priority) {
        // Remove existing entry if re-registering:
        const existingIndex = registeredFilters.findIndex(({ variable }) => (variable === filterVariable));
        if (existingIndex >= 0) registeredFilters.splice(existingIndex, 1);
        
        
        
        // Resolve effective priority:
        const effectivePriority = (
            // Use the provided priority:
            priority
            
            ??
            
            // Fallback to the same priority of the last entry:
            registeredFilters.at(-1)?.priority
            
            ??
            
            // Fallback to `0`:
            0
        );
        
        
        
        // Determine insertion index based on the effective priority:
        const insertIndex = registeredFilters.findIndex(({ priority }) => (priority > effectivePriority));
        
        
        
        // Insert a new entry in sorted order:
        const newEntry : FilterEntry = { variable: filterVariable, priority: effectivePriority };
        if (insertIndex < 0) {
            registeredFilters.push(newEntry);
        }
        else {
            registeredFilters.splice(insertIndex, 0, newEntry);
        } // if
        
        
        
        // Notify subscribers of registry change:
        subscribers.next(filterVariable);
        
        
        
        // Return unregister function:
        return () => {
            // Remove current entry if found:
            const deleteIndex = registeredFilters.findIndex(({ variable }) => (variable === filterVariable));
            if (deleteIndex < 0) return; // Nothing to delete, exit early.
            registeredFilters.splice(deleteIndex, 1);
            
            
            
            // Notify subscribers of registry change:
            subscribers.next(filterVariable);
        };
    },
    
    onFilterChange,
};
