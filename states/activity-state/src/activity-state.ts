'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type AnimationEvent,
    type AnimationEventHandler,
    
    
    
    // Hooks:
    useRef,
    useLayoutEffect,
}                           from 'react'

// Types:
import {
    type ActivityStateProps,
    type ActivityStateChangeProps,
    type ActivityStateOptions,
    
    type ResolveActivityClassnameArgs,
    type ActivityBehaviorStateDefinition,
    
    type ActivityBehaviorState,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableEventHandler,
    useMergeEventHandlers,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Hooks:
    useRequestAnimationFrame,
}                           from '@reusable-ui/timers'              // A collection of reusable timing utilities for UI components.
import {
    // Hooks:
    useControllableValueChange,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Reusable-ui states:
import {
    // Hooks:
    useAnimationState,
    
    
    
    // Utilities:
    animationNameMatches,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Represents **state-driven animations** with full lifecycle awareness in React components.  
 * It synchronizes an externally controlled state (`effectiveState`) with the animation system,
 * ensuring animations start, stop, or switch gracefully without interruption.  
 * 
 * By supplying a `definition` that declares the inactive baseline, animation patterns, and classname resolver,
 * you can specialize this hook into domain-specific behaviors such as `busy-state`, `processing-state`, or `excite-state`.  
 * 
 * To implement live updates, dynamically supply the domain-specific observer result into `effectiveState`.  
 * 
 * **Definition parameters:**
 * - **Activity state classname resolver**  
 *   Resolves the semantic classname from the current activity.
 * - **Default animation pattern**  
 *   Default animation names to match against.
 * - **Default animation bubbling**  
 *   Whether to enable bubbling from nested child elements.
 * - **Inactive state**  
 *   The baseline state that indicates no activity.
 * 
 * Supports controlled mode only with automatic re-triggering if the parent
 * does not reset its `state` prop after animation completion.  
 * 
 * Declarative keywords (`'auto'`, `'inherit'`, etc.) must be resolved externally
 * before passing into `effectiveState`.  
 * 
 * @param props - The behavior-specific props, including the externally controlled `effectiveState` and optional update callback.
 * @param options - Optional per-component customization for animation lifecycle (pattern, bubbling, etc.).
 * @param definition - The behavior-specific definition that declares how inactive state and classnames are resolved.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TClassname - The type representing semantic activity classnames.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 * @template TElement - The type of the target DOM element.
 * 
 * @returns The resolved activity behavior state API.
 */
export const useActivityBehaviorState = <
    TState     extends {} | null,
    TClassname extends string,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TElement   extends Element = HTMLElement
>(
    props      : ActivityStateProps<TState> & ActivityStateChangeProps<TState>,
    options    : ActivityStateOptions<TState> | undefined,
    definition : ActivityBehaviorStateDefinition<TState, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
): ActivityBehaviorState<TState, TClassname, TElement> => {
    // Extract definition and assign defaults:
    const {
        defaultAnimationPattern,
        defaultAnimationBubbling = false, // No bubbling by default.
        
        inactiveState,
        resolveActivityClassname,
    } = definition;
    
    
    
    // Extract options and assign defaults:
    const {
        animationPattern  = defaultAnimationPattern,
        animationBubbling = defaultAnimationBubbling,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        effectiveState,
        onStateChange,
    } = props;
    
    
    
    // States and flags:
    
    // Controlled activity state:
    const {
        value               : driverState,
        dispatchValueChange : requestStopOrChange,
    } = useControllableValueChange<TState, AnimationEvent>({
        value               : effectiveState,
        onValueChange       : onStateChange,
    });
    
    // Internal state with animation lifecycle:
    const [, setAnimationIntent, actualAnimationState, animationHandlers] = useAnimationState<TState, TElement>({
        initialIntent : inactiveState, // Initially stopped.
        animationPattern,
        animationBubbling,
    });
    
    // The current visual state of the animation — what is actually being displayed in the browser:
    // - Derived from `actualAnimationState` (raw hook output).
    // - During animation, reflects the active target (`actualAnimationState`).
    // - If no animation is active, falls back to `inactiveState`.
    // - Always yields a concrete `TState`, so safe to use for styling and classnames.
    // - May briefly differ from `driverState` during restart/switch procedures.
    const visualState = (actualAnimationState !== undefined) ? actualAnimationState : inactiveState; // Do not use "nullish coalescing operator", because `TState` may be `null` which is a valid state.
    
    // Tracks the animation event that triggered the activity animation:
    const activityAnimationEventRef = useRef<AnimationEvent<TElement> | undefined>(undefined);
    
    // Derive semantic activity classname from the current activity state:
    const activityClassname = resolveActivityClassname({
        visualState,
        props      : props      as TBehaviorProps,
        options    : options    as TBehaviorOptions,
        definition : definition as TBehaviorDefinition,
    } satisfies ResolveActivityClassnameArgs<TState, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>);
    
    
    
    // Handlers:
    
    /**
     * Capture the first matching animation event.
     */
    const handleCaptureAnimationEvent : AnimationEventHandler<TElement> = useStableEventHandler((event) => {
        // Ensure the event is bubbling if required:
        if (!animationBubbling && event.target !== event.currentTarget) return;
        
        // Ignore if the event is already captured:
        if (activityAnimationEventRef.current) return;
        
        // Ignore non matching animation:
        if (!animationNameMatches(event.animationName, animationPattern)) return;
        
        
        
        // Capture the event object:
        activityAnimationEventRef.current = event;
    });
    
    /**
     * Merge animation end handlers with capture logic.
     */
    const mergedHandleAnimationEnd    = useMergeEventHandlers(
        // The original event handler of animation lifecycle state:
        animationHandlers.handleAnimationEnd,
        
        // The additional event handler for capturing animation event:
        handleCaptureAnimationEvent,
    );
    
    /**
     * Merge animation cancel handlers with capture logic.
     */
    const mergedHandleAnimationCancel = useMergeEventHandlers(
        // The original event handler of animation lifecycle state:
        animationHandlers.handleAnimationCancel,
        
        // The additional event handler for capturing animation event:
        handleCaptureAnimationEvent,
    );
    
    
    
    // Async scheduler:
    // - A managed, promise-based wrapper around `requestAnimationFrame`.
    // - Returns an abortable promise that resolves on the next animation frame.
    // - Automatically cleans up if aborted or unmounted, preventing memory leaks.
    const requestAnimationFrameAsync  = useRequestAnimationFrame();
    
    
    
    // Synchronize the internal animation state with the externally controlled driver state:
    // 
    // Why `useLayoutEffect` instead of `useEffect`?
    // - Ensures the sync runs before the browser paints.
    // - Prevents losing a frame tick, which could cause animations to desync.
    // 
    // Why schedule a one-frame delay?
    // - Browsers often ignore re-triggering the **same** CSS animation name unless it is cleared first.
    // - By waiting one frame, we guarantee the DOM sees a **reset** before re-applying the same animation.
    // 
    // Why call `requestStopOrChange()`?
    // - Notifies the parent via `onStateChange` when an animation completes.
    // - Allows the parent to perform timing-sensitive DOM operations before the next paint.
    useLayoutEffect(() => {
        // Exit early if the current visual state is already in sync with the driver intent:
        if (Object.is(visualState, driverState)) return;
        
        
        
        // Holds a deferred restart procedure (if scheduled):
        let deferredRestartProcedure : ReturnType<typeof requestAnimationFrameAsync> | undefined = undefined;
        
        
        
        if (Object.is(driverState, inactiveState)) {
            // Driver intent: STOP the activity animation.
            
            
            
            // Stop the current activity animation gracefully:
            // - Do not interrupt mid-flight.
            // - `useAnimationState` ensures the current animation finishes gracefully.
            setAnimationIntent(inactiveState);
            
            // Clear any captured animation event reference:
            activityAnimationEventRef.current = undefined;
        }
        else {
            // Driver intent: RESTART or SWITCH to another animation.
            
            
            
            if (Object.is(visualState, inactiveState)) {
                (async (): Promise<void> => {
                    // Restart procedure (currently stopped).
                    
                    
                    
                    // Clear the stopped animation from the DOM to allow re-trigger:
                    setAnimationIntent(inactiveState);
                    
                    
                    
                    // Backup and clear the captured animation event object:
                    const stoppedAnimationEvent = activityAnimationEventRef.current;
                    activityAnimationEventRef.current = undefined;
                    
                    // Notify parent that the previous animation has ended:
                    if (stoppedAnimationEvent) requestStopOrChange(inactiveState, stoppedAnimationEvent);
                    
                    
                    
                    // Wait one frame so the browser accepts a re-trigger:
                    deferredRestartProcedure = requestAnimationFrameAsync();
                    const timestampOrAborted = await deferredRestartProcedure;
                    deferredRestartProcedure = undefined; // Awaits completes, clear reference.
                    
                    
                    
                    // Abort if parent changed intent during the delay:
                    if (timestampOrAborted === false) return;
                    
                    
                    
                    // Restart with the same animation:
                    setAnimationIntent(driverState);
                })();
            }
            else {
                // Switch procedure (already running).
                
                
                
                // Switch to another animation immediately:
                // - Simply set the new driver intent.
                // - `useAnimationState` ensures the current animation finishes gracefully before starting the new one.
                setAnimationIntent(driverState);
            } // if
        } // if
        
        
        
        return () => {
            // Cleanup: abort any pending deferred restart procedure:
            deferredRestartProcedure?.abort();
        };
    }, [visualState, driverState]);
    
    
    
    // Return resolved activity state API:
    return {
        state                 : visualState, // Use `visualState` instead of `driverState` to reflect the visually active activity animation on screen.
        actualState           : driverState, // Exposes the actual effective state for advanced use cases.
        activityClassname,
        ...animationHandlers,
        handleAnimationEnd    : mergedHandleAnimationEnd,
        handleAnimationCancel : mergedHandleAnimationCancel,
    } satisfies ActivityBehaviorState<TState, TClassname, TElement>;
};
