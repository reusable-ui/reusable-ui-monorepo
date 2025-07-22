// Reusable-ui utilities:
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state' // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * @deprecated - Use `AnimationStateOptions` instead.
 * 
 * Configuration options for the `useAnimatingState` hook.
 * 
 * Defines the initial intent state, animation pattern recognition, and event listening strategy.
 * 
 * @template TState - The type representing the animated state value.
 */
export interface AnimatingStateOptions<TState extends {} | null> {
    /**
     * @deprecated - Use `initialIntent` instead.
     * 
     * The initial intent value before any animation begins.
     */
    initialState       : TState
    
    /**
     * @deprecated - Use `animationPattern` instead.
     * 
     * Defines the pattern used to match relevant animation names.
     * 
     * Used to identify animations that should trigger immediately
     * after the new intent has been applied. (e.g. `'expand'`, `'collapse'`).
     * 
     * Supports regular expression and string suffix matching with word-boundary awareness:
     * - Use a string to match suffixes with word-boundary awareness.
     * - Use an array of strings to match multiple suffixes.
     * - Use a RegExp for custom or complex matching logic.
     */
    animationName      : string | string[] | RegExp
    
    /**
     * Enables listening to animation events bubbling up from child elements.
     * Useful when the animated node is deeply nested.
     * 
     * Defaults to `false`.
     */
    animationBubbling ?: boolean
};

/**
 * @deprecated - Use `useAnimationState` instead.
 * 
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
 * @returns API for accessing and controlling animation state.
 */
export const useAnimatingState = <TState extends {} | null, TElement extends Element = HTMLElement>(options: AnimatingStateOptions<TState>) => {
    // Extract options and assign defaults:
    const {
        initialState,
        
        animationBubbling = false,
        animationName,
    } = options;
    
    
    
    // States:
    const [intent, setIntent, running, animationHandlers] = useAnimationState<TState, TElement>({
        initialIntent     : initialState,
        
        animationPattern  : animationName,
        animationBubbling,
    });
    
    
    
    // Return the API object:
    return [
        intent,            // Getter intent
        setIntent,         // Setter intent
        running,           // Running animation (if any)
        animationHandlers, // Animation handlers
    ] as const;
};
