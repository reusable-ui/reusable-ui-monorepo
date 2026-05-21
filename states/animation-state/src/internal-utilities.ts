// Types:
import {
    type AnimationState,
    type AnimationAction,
}                           from './internal-types.js'



/**
 * Reducer for managing animation-aware intent and transition state.
 * 
 * Handles user-driven updates (`intent`) alongside the active animation state (`running`),
 * ensuring lifecycle integrity and smooth transitions.
 * 
 * Lifecycle Principles:
 * - 🚫 Never interrupts animations mid-flight.
 * - 🕒 Defers new intent until the current animation completes.
 * - 🧹 Discards outdated transitions during overlapping changes.
 * - 🔁 Resumes the latest intent once prior animation finishes.
 * 
 * @template TState - The type representing the animated state value.
 * @param prev - The previous animation state, including intent and running animation.
 * @param action - The dispatched action that modifies the animation state.
 * @returns The updated animation state after applying the reducer logic.
 */
export const animationStateReducer = <TState extends {} | null>(prev: AnimationState<TState>, action: AnimationAction<TState>): AnimationState<TState> => {
    switch (action.type) {
        case 'change': {
            // Resolve the next user intent:
            const nextIntent = (
                (typeof action.newIntent === 'function')
                ? action.newIntent(prev.intent, prev.running)
                : action.newIntent
            );
            
            
            
            // Skip update if the intent hasn't changed:
            if (Object.is(prev.intent, nextIntent)) return prev;
            
            
            
            // If no animation is currently running, start the new animation immediately:
            if (prev.running === undefined) {
                return {
                    intent  : nextIntent,   // Update user intent.
                    running : nextIntent,   // Begin animation immediately.
                } satisfies AnimationState<TState>;
            } // if
            
            
            
            // Otherwise, update the intent (as pending) while allowing the current animation to finish.
            // Only the latest intent is retained — intermediate changes are discarded.
            // Intermediate changes are safely discarded — no side effects has been applied.
            return {
                intent  : nextIntent,   // Update user intent.
                running : prev.running, // Continue running animation until it finishes.
            } satisfies AnimationState<TState>;
        } // case
        
        
        
        case 'done': {
            // Ignore if no animation is currently running:
            // Prevents for accidentally **resume** (restarting) the **already** stopped animation:
            if (prev.running === undefined) return prev;
            
            
            
            // If the running animation matches the current intent, stop the animation:
            if (Object.is(prev.running, prev.intent)) {
                return {
                    intent  : prev.intent, // Preserve user intent.
                    running : undefined,   // Animation is complete.
                } satisfies AnimationState<TState>;
            } // if
            
            
            
            // Otherwise, start animating the pending intent:
            return {
                intent  : prev.intent, // Preserve user intent.
                running : prev.intent, // Begin animation for the pending intent.
            } satisfies AnimationState<TState>;
        } // case
    } // switch
    
    
    
    // Fallback: return previous state unchanged:
    return prev;
};
