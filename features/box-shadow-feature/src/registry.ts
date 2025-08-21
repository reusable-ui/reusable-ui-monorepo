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
    type CssBoxShadowRegistry,
}                           from './types.js'



/**
 * Represents a single entry in the box shadow registry.
 * 
 * Each entry defines a CSS variable reference and its stacking priority.
 */
interface BoxShadowEntry {
    /**
     * A unique CSS variable reference representing a box shadow layer.
     */
    variable : CssCustomSimpleRef
    
    /**
     * A stacking priority. Higher values appear later in the composed box shadow stack.
     */
    priority : number
}



/**
 * An internal store of registered box shadow entries.
 * 
 * Preserves insertion order and supports priority-aware stacking for box shadow resolution.
 */
const registeredBoxShadows : BoxShadowEntry[] = [];

/**
 * An event stream for broadcasting box shadow registry changes.
 */
const subscribers = new Subject<CssCustomSimpleRef>();

/**
 * A reactive interface for subscribing to box shadow registry updates.
 */
const onBoxShadowChange : Subscribable<CssCustomSimpleRef> = {
    subscribe: subscribers.subscribe,
};



/**
 * A registry for unifying box shadow layers across independent state packages.
 * 
 * Supports dynamic registration of box shadow variables with priority-aware stacking.
 */
export const boxShadowRegistry : CssBoxShadowRegistry = {
    get boxShadows() {
        return registeredBoxShadows.map(({ variable }) => variable);
    },
    
    registerBoxShadow(boxShadowVariable, priority) {
        // Remove existing entry if re-registering:
        const existingIndex = registeredBoxShadows.findIndex(({ variable }) => (variable === boxShadowVariable));
        if (existingIndex >= 0) registeredBoxShadows.splice(existingIndex, 1);
        
        
        
        // Resolve effective priority:
        const effectivePriority = (
            // Use the provided priority:
            priority
            
            ??
            
            // Fallback to the same priority of the last entry:
            registeredBoxShadows.at(-1)?.priority
            
            ??
            
            // Fallback to `0`:
            0
        );
        
        
        
        // Determine insertion index based on the effective priority:
        const insertIndex = registeredBoxShadows.findIndex(({ priority }) => (priority > effectivePriority));
        
        
        
        // Insert a new entry in sorted order:
        const newEntry : BoxShadowEntry = { variable: boxShadowVariable, priority: effectivePriority };
        if (insertIndex < 0) {
            registeredBoxShadows.push(newEntry);
        }
        else {
            registeredBoxShadows.splice(insertIndex, 0, newEntry);
        } // if
        
        
        
        // Notify subscribers of registry change:
        subscribers.next(boxShadowVariable);
        
        
        
        // Return unregister function:
        return () => {
            // Remove current entry if found:
            const deleteIndex = registeredBoxShadows.findIndex(({ variable }) => (variable === boxShadowVariable));
            if (deleteIndex < 0) return; // Nothing to delete, exit early.
            registeredBoxShadows.splice(deleteIndex, 1);
            
            
            
            // Notify subscribers of registry change:
            subscribers.next(boxShadowVariable);
        };
    },
    
    onBoxShadowChange,
};
