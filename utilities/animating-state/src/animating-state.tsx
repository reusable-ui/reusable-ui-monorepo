// react:
import {
    // types:
    SetStateAction,
    Reducer,
    Dispatch,
    AnimationEventHandler,
    
    
    
    // hooks:
    useReducer,
    useRef,
    useEffect,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
}                           from '@reusable-ui/hooks'           // react helper hooks



interface AnimatingState<TState extends ({}|null)> {
    /**
     * The current state.
     */
    state     : TState
    
    /**
     * The animation of transition state -or- `undefined` if the transition was done.
     */
    animation : TState|undefined
}

const enum AnimatingStateActionType {
    /**
     * Changes the current state to a new state.
     */
    Change,
    
    /**
     * Marks the current transition state is done.
     */
    Done,
}

interface AnimatingStateChangeAction<TState extends ({}|null)> {
    type      : AnimatingStateActionType.Change,
    newState  : SetStateAction<TState>
}
interface AnimatingStateDoneAction {
    type      : AnimatingStateActionType.Done,
}
type AnimatingStateAction<TState extends ({}|null)> =
    |AnimatingStateChangeAction<TState>
    |AnimatingStateDoneAction

/**
 * Reducer function to manage the state of an animation.
 * 
 * @template TState - The type of the state, which can be an object or null.
 * @param {AnimatingState<TState>} oldState - The previous state of the animation.
 * @param {AnimatingStateAction<TState>} action - The action to be performed on the state.
 * @returns {AnimatingState<TState>} - The new state of the animation.
 */
const animatingStateReducer = <TState extends ({}|null)>(oldState: AnimatingState<TState>, action: AnimatingStateAction<TState>): AnimatingState<TState> => {
    switch (action.type) {
        case AnimatingStateActionType.Change:
            /*
                * It checks if the new state is different from the old state.
                * If they are different, it updates the state and decides whether to start a new animation immediately or continue running the current animation until it finishes.
            */
            {
                const newState = (typeof(action.newState) !== 'function') ? action.newState : (action.newState as ((prevState: TState) => TState))(oldState.state);
                if (!Object.is(oldState.state, newState)) {    // the newly *incoming* animation is *different* from the *previous* one
                    return {
                        state     : newState,                  // remember the newly *incoming* animation
                        animation : (
                            (oldState.animation === undefined) // if not currently *being* animated
                            ?
                            newState                           // immediately start the newly *incoming* animation
                            :
                            oldState.animation                 // continue running the unfinished *previous* animation, once it finishes, we plan to start the newly *incoming* animation
                        ),
                    };
                } // if
            }
            break;
        
        case AnimatingStateActionType.Done:
            /*
                * It checks if there is a running animation.
                * If the current animation has finished, it marks that there is no running animation.
                * If there is a pending new animation, it starts the new animation.
            */
            if (oldState.animation !== undefined) { // there is a *remaining* running animation
                return {
                    state     : oldState.state,
                    animation : (
                        Object.is(oldState.animation, oldState.state)
                        
                        ?              // the current animation has *finished*
                        undefined      // => mark that there is *no running* animation
                        
                        :              // there is a pending newly *incoming* animation
                        oldState.state // => start the newly *incoming* animation
                    ),
                };
            } // if
            break;
    } // switch
    
    
    
    // no change:
    return oldState;
};



export interface AnimatingStateOptions<TState extends ({}|null)> {
    initialState       : TState        // required
    
    animationBubbling ?: boolean       // optional
    animationName      : string|RegExp // required
};
export const useAnimatingState = <TState extends ({}|null), TElement extends Element = HTMLElement>(options: AnimatingStateOptions<TState>) => {
    // options:
    const {
        initialState,
        
        animationBubbling = false,
        animationName,
    } = options;
    
    
    
    // states:
    const [state, dispatchState] = useReducer<Reducer<AnimatingState<TState>, AnimatingStateAction<TState>>>(animatingStateReducer, {
        // initials:
        state     : initialState,
        animation : undefined,
    });
    const expectedAnimation = useRef<TState|undefined>(undefined);
    
    
    
    // dom effects:
    useEffect(() => {
        // conditions:
        if (state.animation === undefined) return; // no animation => no expected animation to be verified
        
        
        
        // setups:
        let asyncCheckRunningAnimation = requestAnimationFrame(() => {
            // tests:
            if (Object.is(expectedAnimation.current, state.animation)) return; // the expected animation is running => verified
            
            
            
            // retry 1:
            asyncCheckRunningAnimation = requestAnimationFrame(() => {
                // tests:
                if (Object.is(expectedAnimation.current, state.animation)) return; // the expected animation is running => verified
                
                
                
                // retry 2:
                asyncCheckRunningAnimation = requestAnimationFrame(() => {
                    // tests:
                    if (Object.is(expectedAnimation.current, state.animation)) return; // the expected animation is running => verified
                    
                    
                    
                    // the expected animation is not running within 2 frames => NOT verified => mark as finished_animation:
                    dispatchState({ type: AnimatingStateActionType.Done });
                });
            });
        });
        
        
        
        // cleanups:
        return () => {
            cancelAnimationFrame(asyncCheckRunningAnimation);
        };
    }, [state.animation]);
    
    
    
    // handlers:
    const setState              = useEvent<Dispatch<SetStateAction<TState>>>((newState) => {
        // update with a new state:
        dispatchState({ type: AnimatingStateActionType.Change, newState });
    });
    const handleAnimationStart  = useEvent<AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (!animationBubbling && (event.target !== event.currentTarget)) return; // if not bubbling => ignores bubbling
        if (!event.animationName.match(animationName))                    return; // ignores foreign animations
        
        
        
        // mark the expected_css_animation has started:
        expectedAnimation.current = state.animation;
    });
    const handleAnimationEnd    = useEvent<AnimationEventHandler<TElement>>((event) => {
        // conditions:
        if (!animationBubbling && (event.target !== event.currentTarget)) return; // if not bubbling => ignores bubbling
        if (!event.animationName.match(animationName))                    return; // ignores foreign animations
        
        
        
        // mark the expected_css_animation has stopped:
        expectedAnimation.current = undefined;
        
        // clean up finished_animation:
        dispatchState({ type: AnimatingStateActionType.Done });
    });
    const handleAnimationCancel = handleAnimationEnd;
    
    
    // interfaces:
    return [
        state.state,               // getter    state
        setState,                  // setter    state
        state.animation,           // animation state
        {
            handleAnimationStart,  // animation-start  handler
            handleAnimationEnd,    // animation-end    handler
            handleAnimationCancel, // animation-cancel handler
        },
    ] as const;
};
