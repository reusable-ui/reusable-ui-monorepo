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
     * The unique CSS variable reference representing an animation layer.
     */
    variable : CssCustomSimpleRef
    
    /**
     * Determines stacking order; higher values appear later in the animation stack.
     */
    priority : number
}



/**
 * An internal store of registered animation entries.
 * 
 * Maintains insertion order and priority-based stacking for animation resolution.
 */
const registeredAnimations : AnimationEntry[] = [];

/**
 * Event stream for notifying animation registry changes.
 */
const subscribers = new Subject<CssCustomSimpleRef>();

/**
 * Reactive interface for subscribing to animation registry updates.
 */
const onAnimationChange : Subscribable<CssCustomSimpleRef> = {
    subscribe: subscribers.subscribe,
};



/**
 * A registry for unifying animation layers across independent state packages.
 * 
 * Supports dynamic registration of animation variables with priority-based stacking.
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
        
        
        
        // Find insertion index based on the effective priority:
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
