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



/**
 * Represents the animation-aware state model,
 * combining the latest user intent with any ongoing animation.
 * 
 * @template TState - The type representing the animated state value.
 */
interface AnimationState<TState extends {} | null> {
    /**
     * The most recent user-intended value.
     */
    intent  : TState
    
    /**
     * The value currently undergoing animation.
     * If `undefined`, no animation is actively running.
     */
    running : TState | undefined
}



/**
 * Defines the actions used to update the animation state reducer.
 * 
 * @template TState - The type representing the animated state value.
 */
type AnimationAction<TState extends {} | null> =
    | AnimationChangeAction<TState>
    | AnimationDoneAction

/**
 * Represents an action that updates the animation intent state.
 * 
 * Can be a direct value, or a function that derives the next intent
 * based on the current intent and any ongoing animation.
 * 
 * @template TState - The type representing the animated state value.
 */
export type SetAnimationIntentAction<TState extends {} | null> =
    | TState
    | ((currentIntent: TState, currentRunning: TState | undefined) => TState)

/**
 * Describes an intent-driven request to update the animated state.
 * 
 * A new animation will be triggered if the `newIntent` value differs from the current lifecycle state.
 * 
 * @template TState - The type representing the animated state value.
 */
interface AnimationChangeAction<TState extends {} | null> {
    type      : 'change'
    newIntent : SetAnimationIntentAction<TState>
}

/**
 * Indicates that the currently running animation has finished.
 * 
 * If the current intent differs from the completed animation state,
 * a new animation may be triggered to reflect the pending transition.
 */
interface AnimationDoneAction {
    type     : 'done'
}

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
const animationStateReducer = <TState extends {} | null>(prev: AnimationState<TState>, action: AnimationAction<TState>): AnimationState<TState> => {
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



/**
 * Configuration options for the `useAnimationState` hook.
 * 
 * Defines the initial intent state, animation pattern recognition, and event listening strategy.
 * 
 * @template TState - The type representing the animated state value.
 */
export interface AnimationStateOptions<TState extends {} | null> {
    /**
     * The initial intent value before any animation begins.
     */
    initialIntent      : TState
    
    /**
     * Defines the pattern used to identify the related animation names.
     * 
     * This pattern determines which animations are considered part of the intent lifecycle. (e.g. `'expand'`, `'collapse'`).
     * 
     * Supports:
     * - A string suffix (with word-boundary awareness)
     * - An array of suffixes
     * - A RegExp for advanced matching
     * 
     * Word-boundary behavior mimics regex `\b` semantics:
     * - If the matched pattern starts with a non-word character, it’s always considered boundary-safe.
     * - Otherwise, the character preceding the suffix must be a non-word character or undefined.
     */
    animationPattern   : string | string[] | RegExp
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false`.
     */
    animationBubbling ?: boolean
}

/**
 * Event handlers required for tracking animation lifecycle on a target element.
 * 
 * These handlers should be attached to the element to ensure the animation state
 * is updated correctly in response to animation events.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface AnimationStateHandlers<TElement extends Element = HTMLElement> {
    /**
     * Called when an animation begins on the target element.
     */
    handleAnimationStart  : AnimationEventHandler<TElement>
    
    /**
     * Called when an animation completes naturally.
     */
    handleAnimationEnd    : AnimationEventHandler<TElement>
    
    /**
     * Called when an animation is interrupted or canceled.
     */
    handleAnimationCancel : AnimationEventHandler<TElement>
}

/**
 * An API for managing animation state within the component.
 * 
 * Supports both tuple-style destructuring and named properties
 * for ergonomic use in hooks and JSX event bindings.
 * 
 * @template TState - The type representing the animated state value.
 * @template TElement - The type of the target DOM element.
 */
export interface AnimationStateApi<TState extends {} | null, TElement extends Element = HTMLElement>
    extends
        // Tuple-style accessors:
        ReadonlyArray<
            | TState                                     // intent
            | Dispatch<SetAnimationIntentAction<TState>> // setIntent
            | TState | undefined                         // running
            | AnimationStateHandlers<TElement>           // handlers
        >,
        
        // Named property accessors:
        AnimationStateHandlers<TElement>
{
    //#region Tuple-style accessors
    /**
     * The current user intent value — reflects the desired end state.
     */
    0         : TState
    
    /**
     * Updates the intent value — triggers a new animation if necessary.
     */
    1         : Dispatch<SetAnimationIntentAction<TState>>
    
    /**
     * The value currently being animated. `undefined` means no animation in progress.
     */
    2         : TState | undefined
    
    /**
     * Event handlers required for tracking animation lifecycle on a target element.
     * 
     * These handlers should be attached to the element to ensure the animation state
     * is updated correctly in response to animation events.
     */
    3         : AnimationStateHandlers<TElement>
    //#endregion Tuple-style accessors
    
    
    
    //#region Named-property accessors
    /**
     * The current user intent value — reflects the desired end state.
     */
    intent    : TState
    
    /**
     * Updates the intent value — triggers a new animation if necessary.
     */
    setIntent : Dispatch<SetAnimationIntentAction<TState>>
    
    /**
     * The value currently being animated. `undefined` means no animation in progress.
     */
    running   : TState | undefined
    //#endregion Named-property accessors
}

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
