// React:
import {
    // Types:
    type Dispatch,
    type AnimationEventHandler,
}                           from 'react'



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
     * This pattern determines which animation names are recognized as part of the intent lifecycle (e.g. `'expand'`, `'collapse'`).
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
     * Defaults to `false` (no bubbling).
     */
    bubblingAnimation ?: boolean
}

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
