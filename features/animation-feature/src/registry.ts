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
 * A store for registered animation variables.
 */
const registeredAnimations = new Set<CssCustomSimpleRef>();

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
 * Enables dynamic registration of animation variables and ensures
 * safe stacking via fallbacking to `none`.
 */
export const animationRegistry : CssAnimationRegistry = {
    get animations() {
        return Array.from(registeredAnimations);
    },
    
    registerAnimation(animation) {
        // Register:
        registeredAnimations.add(animation);
        subscribers.next(animation);
        
        
        
        return () => {
            // Unregister:
            registeredAnimations.delete(animation);
            subscribers.next(animation);
        };
    },
    
    onAnimationChange,
};
