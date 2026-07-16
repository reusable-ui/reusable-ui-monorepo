// Types:
import {
    type SetAnimationIntentAction,
}                           from './types.js'



/**
 * Represents the animation-aware state model,
 * combining the latest user intent with any ongoing animation.
 * 
 * @template TState The type representing the animated state value.
 */
export interface AnimationState<TState extends {} | null> {
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
 * @template TState The type representing the animated state value.
 */
export type AnimationAction<TState extends {} | null> =
    | AnimationChangeAction<TState>
    | AnimationDoneAction

/**
 * Describes an intent-driven request to update the animated state.
 * 
 * A new animation will be triggered if the `newIntent` value differs from the current lifecycle state.
 * 
 * @template TState The type representing the animated state value.
 */
export interface AnimationChangeAction<TState extends {} | null> {
    type      : 'change'
    newIntent : SetAnimationIntentAction<TState>
}

/**
 * Indicates that the currently running animation has finished.
 * 
 * If the current intent differs from the completed animation state,
 * a new animation may be triggered to reflect the pending transition.
 */
export interface AnimationDoneAction {
    type     : 'done'
}
