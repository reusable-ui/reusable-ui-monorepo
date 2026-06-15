'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type Dispatch,
    type AnimationEventHandler,
    
    
    
    // Hooks:
    useReducer,
    useRef,
    useEffect,
}                           from 'react'

// Types:
import {
    type AnimationStateOptions,
    type SetAnimationIntentAction,
    type AnimationStateHandlers,
    type AnimationStateApi,
}                           from './types.js'

// Utilities:
import {
    // Hooks:
    useStableEventHandler,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Hooks:
    useRequestAnimationFrame,
}                           from '@reusable-ui/timers'          // A collection of reusable timing utilities for UI components.
import {
    // Utilities:
    animationNameMatches,
}                           from './utilities.js'
import {
    // Utilities:
    animationStateReducer,
}                           from './internal-utilities.js'



/**
 * Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing,
 * making motion predictable and enhancing visual feedback.
 * 
 * Lifecycle Principles:
 * - 🚫 Never interrupts animations mid-flight.
 * - 🕒 Defers new intent until the current animation completes.
 * - 🧹 Discards outdated transitions during overlapping changes.
 * - 🔁 Resumes the latest intent once prior animation finishes.
 * 
 * @template TState - The type representing the animated state value.
 * @template TElement - The type of the target DOM element.
 * @param options - Configuration options that define animation behavior and recognition.
 * @returns API for accessing and controlling animation state with both tuple-style and named properties.
 */
export const useAnimationState = <TState extends {} | null, TElement extends Element = HTMLElement>(options: AnimationStateOptions<TState>): AnimationStateApi<TState, TElement> => {
    // Extract options and assign defaults:
    const {
        initialIntent,
        animationPattern,
        animationBubbling = false,
    } = options;
    
    
    
    // States:
    
    // Animation lifecycle state:
    const [state, dispatch] = useReducer(animationStateReducer<TState>, {
        intent  : initialIntent, // The initial intent value before any animation begins.
        running : undefined,     // Initially no active animation at startup.
    });
    
    // Reference to track which animation is actively running:
    const actualRunningAnimation = useRef<TState | undefined>(undefined);
    
    
    
    // Effects:
    
    // Managed, promise-based animation frame scheduler (auto-cleans up):
    const requestAnimationFrameAsync = useRequestAnimationFrame();
    
    // Verifies that the animation started correctly:
    useEffect(() => {
        // No need to verify if the state is not running:
        if (state.running === undefined) return;
        
        
        
        // Verify that the expected animation begins within 3 frames:
        (async (): Promise<void> => {
            // Attempts for up to 3 frames:
            for (let attempts = 3; attempts > 0; attempts--) {
                // Wait for the next frame:
                const timestampOrAborted = await requestAnimationFrameAsync();
                
                
                
                // If the request was aborted, exit early:
                if (timestampOrAborted === false) return;
                
                
                
                // The expected animation confirmed — no further checks needed:
                if (Object.is(actualRunningAnimation.current, /* expected: */ state.running)) return;
            } // for
            
            
            
            // Animation didn't start in time — mark as complete:
            dispatch({ type: 'done' });
        })();
    }, [state.running]);
    
    
    
    // Stable callbacks:
    
    // Setter to trigger animation state change:
    const setIntent            : Dispatch<SetAnimationIntentAction<TState>> = useStableEventHandler((newIntent) => {
        dispatch({ type: 'change', newIntent });
    });
    
    // Handler for animation starts:
    const handleAnimationStart : AnimationEventHandler<TElement>            = useStableEventHandler((event) => {
        // Ensure the event is bubbling if required:
        if (!animationBubbling && event.target !== event.currentTarget) return;
        
        // Ensure the animation matches the expected pattern:
        if (!animationNameMatches(event.animationName, animationPattern)) return;
        
        
        
        // Update the reference to the currently running animation:
        // This is used to verify that the expected animation started correctly.
        actualRunningAnimation.current = state.running;
    });
    
    // Handler for animation completion or cancellation:
    const handleAnimationEnd   : AnimationEventHandler<TElement>            = useStableEventHandler((event) => {
        // Ensure the event is bubbling if required:
        if (!animationBubbling && event.target !== event.currentTarget) return;
        
        // Ensure the animation matches the expected pattern:
        if (!animationNameMatches(event.animationName, animationPattern)) return;
        
        
        
        // Clear the reference to the currently running animation:
        actualRunningAnimation.current = undefined;
        
        // Update the state to indicate the animation is done:
        dispatch({ type: 'done' });
    });
    
    
    
    // Handlers for animation lifecycle events:
    const animationHandlers : AnimationStateHandlers<TElement> = {
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel : handleAnimationEnd, // Reuse the end handler for cancellation.
    };
    
    // List of named accessors for the animation state API:
    type NamedAccessorKeys = keyof Pick<AnimationStateApi<TState, TElement>,
        | 'intent'
        | 'setIntent'
        | 'running'
        
        | 'handleAnimationStart'
        | 'handleAnimationEnd'
        | 'handleAnimationCancel'
    >
    
    // Tuple-style accessors for array destructuring:
    const animationStateTuple : Omit<AnimationStateApi<TState, TElement>, NamedAccessorKeys> = [
        state.intent,
        setIntent,
        state.running,
        animationHandlers,
    ];
    
    // Named-property accessors for direct property usage:
    const animationStateNamed : Pick<AnimationStateApi<TState, TElement>, NamedAccessorKeys> = {
        intent    : state.intent,
        setIntent : setIntent,
        running   : state.running,
        ...animationHandlers,
    }
    
    // Combine both tuple and named accessors into a single API object:
    const animationStateApi = Object.assign(animationStateTuple, animationStateNamed) as AnimationStateApi<TState, TElement>;
    
    // Return the complete API object:
    return animationStateApi;
};
