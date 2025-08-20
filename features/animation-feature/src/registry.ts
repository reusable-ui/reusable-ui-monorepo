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
    type CssAnimationRegistry,
}                           from './types.js'



/**
 * Represents a single entry in the animation registry.
 * 
 * Each entry defines a CSS variable reference and its stacking priority.
 */
interface AnimationEntry {
    /**
     * A unique CSS variable reference representing an animation layer.
     */
    variable : CssCustomSimpleRef
    
    /**
     * A stacking priority. Higher values appear later in the composed animation stack.
     */
    priority : number
}



/**
 * An internal store of registered animation entries.
 * 
 * Preserves insertion order and supports priority-aware stacking for animation resolution.
 */
const registeredAnimations : AnimationEntry[] = [];

/**
 * An event stream for broadcasting animation registry changes.
 */
const subscribers = new Subject<CssCustomSimpleRef>();

/**
 * A reactive interface for subscribing to animation registry updates.
 */
const onAnimationChange : Subscribable<CssCustomSimpleRef> = {
    subscribe: subscribers.subscribe,
};



/**
 * A registry for unifying animation layers across independent state packages.
 * 
 * Supports dynamic registration of animation variables with priority-aware stacking.
 */
export const animationRegistry : CssAnimationRegistry = {
    get animations() {
        return registeredAnimations.map(({ variable }) => variable);
    },
    
    registerAnimation(animationVariable, priority) {
        // Remove existing entry if re-registering:
        const existingIndex = registeredAnimations.findIndex(({ variable }) => (variable === animationVariable));
        if (existingIndex >= 0) registeredAnimations.splice(existingIndex, 1);
        
        
        
        // Resolve effective priority:
        const effectivePriority = (
            // Use the provided priority:
            priority
            
            ??
            
            // Fallback to the same priority of the last entry:
            registeredAnimations.at(-1)?.priority
            
            ??
            
            // Fallback to `0`:
            0
        );
        
        
        
        // Determine insertion index based on the effective priority:
        const insertIndex = registeredAnimations.findIndex(({ priority }) => (priority > effectivePriority));
        
        
        
        // Insert a new entry in sorted order:
        const newEntry : AnimationEntry = { variable: animationVariable, priority: effectivePriority };
        if (insertIndex < 0) {
            registeredAnimations.push(newEntry);
        }
        else {
            registeredAnimations.splice(insertIndex, 0, newEntry);
        } // if
        
        
        
        // Notify subscribers of registry change:
        subscribers.next(animationVariable);
        
        
        
        // Return unregister function:
        return () => {
            // Remove current entry if found:
            const deleteIndex = registeredAnimations.findIndex(({ variable }) => (variable === animationVariable));
            if (deleteIndex < 0) return; // Nothing to delete, exit early.
            registeredAnimations.splice(deleteIndex, 1);
            
            
            
            // Notify subscribers of registry change:
            subscribers.next(animationVariable);
        };
    },
    
    onAnimationChange,
};
