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
    type CssTransformRegistry,
}                           from './types.js'



/**
 * Represents a single entry in the transform registry.
 * 
 * Each entry defines a CSS variable reference and its stacking priority.
 */
interface TransformEntry {
    /**
     * A unique CSS variable reference representing a transform layer.
     */
    variable : CssCustomSimpleRef
    
    /**
     * A stacking priority. Higher values appear later in the composed transform stack.
     */
    priority : number
}



/**
 * An internal store of registered transform entries.
 * 
 * Preserves insertion order and supports priority-aware stacking for transform resolution.
 */
const registeredTransforms : TransformEntry[] = [];

/**
 * An event stream for broadcasting transform registry changes.
 */
const subscribers = new Subject<CssCustomSimpleRef>();

/**
 * A reactive interface for subscribing to transform registry updates.
 */
const onTransformChange : Subscribable<CssCustomSimpleRef> = {
    subscribe: subscribers.subscribe,
};



/**
 * A registry for unifying transform layers across independent state packages.
 * 
 * Supports dynamic registration of transform variables with priority-aware stacking.
 */
export const transformRegistry : CssTransformRegistry = {
    get transforms() {
        return registeredTransforms.map(({ variable }) => variable);
    },
    
    registerTransform(transformVariable, priority) {
        // Remove existing entry if re-registering:
        const existingIndex = registeredTransforms.findIndex(({ variable }) => (variable === transformVariable));
        if (existingIndex >= 0) registeredTransforms.splice(existingIndex, 1);
        
        
        
        // Resolve effective priority:
        const effectivePriority = (
            // Use the provided priority:
            priority
            
            ??
            
            // Fallback to the same priority of the last entry:
            registeredTransforms.at(-1)?.priority
            
            ??
            
            // Fallback to `0`:
            0
        );
        
        
        
        // Determine insertion index based on the effective priority:
        const insertIndex = registeredTransforms.findIndex(({ priority }) => (priority > effectivePriority));
        
        
        
        // Insert a new entry in sorted order:
        const newEntry : TransformEntry = { variable: transformVariable, priority: effectivePriority };
        if (insertIndex < 0) {
            registeredTransforms.push(newEntry);
        }
        else {
            registeredTransforms.splice(insertIndex, 0, newEntry);
        } // if
        
        
        
        // Notify subscribers of registry change:
        subscribers.next(transformVariable);
        
        
        
        // Return unregister function:
        return () => {
            // Remove current entry if found:
            const deleteIndex = registeredTransforms.findIndex(({ variable }) => (variable === transformVariable));
            if (deleteIndex < 0) return; // Nothing to delete, exit early.
            registeredTransforms.splice(deleteIndex, 1);
            
            
            
            // Notify subscribers of registry change:
            subscribers.next(transformVariable);
        };
    },
    
    onTransformChange,
};
