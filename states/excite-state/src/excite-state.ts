'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type AnimationEvent,
    type AnimationEventHandler,
    
    
    
    // Hooks:
    useRef,
    useEffect,
}                           from 'react'

// Types:
import {
    type ExciteStateProps,
    type ExciteStateOptions,
    type ExciteBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeExcited,
}                           from './internal-defaults.js'

// Utilities:
import {
    getExciteClassname,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableEventHandler,
    useMergeEventHandlers,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Hooks:
    useSetTimeout,
    useRequestAnimationFrame,
}                           from '@reusable-ui/timers'              // A collection of reusable timing utilities for UI components.
import {
    // Hooks:
    useControllableValueChange,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Hooks:
    useAnimationState,
    
    
    
    // Utilities:
    animationNameMatches,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Resolves the current excited state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `excited` state and **forward** it to a base component.
 * 
 * - Does not contain internal state.
 * - Ideal for components that **consume** the resolved `excited` state.
 * 
 * @param props - The component props that may include a controlled `excited` value.
 * @param options - An optional configuration for customizing excitement behavior.
 * @returns The resolved excited state.
 */
export const useExciteState = (props: ExciteStateProps, options?: Pick<ExciteStateOptions, 'defaultExcited'>): boolean => {
    // Extract options and assign defaults:
    const {
        defaultExcited      = defaultDeclarativeExcited,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        excited : controlledExcited = defaultExcited,
    } = props;
    
    
    
    // Return the resolved excited state:
    return controlledExcited;
};



/**
 * Resolves the excited state, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 *
 * Supports controlled excitement with automatic re-triggering if the parent
 * does not reset the `excited` prop after animation completion.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param {ExciteStateProps} props - The component props that may include a controlled `excited` value and an `onExcitedChange` callback.
 * @param {ExciteStateOptions} options - An optional configuration for customizing excitement behavior and animation lifecycle.
 * @returns {ExciteBehaviorState<TElement>} - The resolved excited state, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useExciteBehaviorState,
 *     ExciteStateProps,
 * } from '@reusable-ui/excite-state';
 * import styles from './ExcitableBox.module.css';
 * 
 * export interface ExcitableBoxProps extends ExciteStateProps {}
 * 
 * // A box that can be excited.
 * export const ExcitableBox: FC<ExcitableBoxProps> = (props) => {
 *     const {
 *         excited,
 *         exciteClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useExciteBehaviorState(props, {
 *         defaultExcited    : false,          // Defaults the `excited` prop to `false` if not provided.
 *         animationPattern  : 'box-exciting', // Matches animation names ending with 'box-exciting'.
 *         animationBubbling : false,          // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${exciteClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {excited && <span className={styles.badge}>🔔</span>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useExciteBehaviorState = <TElement extends Element = HTMLElement>(props: ExciteStateProps, options?: ExciteStateOptions): ExciteBehaviorState<TElement> => {
    // Extract options and assign defaults:
    const {
        defaultExcited      = defaultDeclarativeExcited,
        animationPattern    = 'exciting',
        animationBubbling   = false,
        
        retriggerDelayTicks = 3,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        excited : controlledExcited = defaultExcited,
        onExcitedChange,
    } = props;
    
    
    
    // States and flags:
    
    // Controlled excitement state:
    const {
        value               : effectiveExcited,
        dispatchValueChange : requestExcitedReset,
    } = useControllableValueChange<boolean, AnimationEvent>({
        value               : controlledExcited,
        onValueChange       : onExcitedChange,
    });
    
    // Animation lifecycle state:
    const [, setExcitedAnimation, runningAnimation, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent : false, // Initially is **Stopped** (false).
        animationPattern,
        animationBubbling,
    });
    
    // Animation status (fallback to false if idle):
    const exciteAnimation = runningAnimation ?? false;
    
    // Tracks the animation event that triggered the excitement:
    const exciteAnimationEventRef = useRef<AnimationEvent<TElement> | undefined>(undefined);
    
    
    
    // Handlers:
    
    /**
     * Capture the first matching animation event.
     */
    const handleCaptureAnimationEvent : AnimationEventHandler<TElement> = useStableEventHandler((event) => {
        // Ensure the event is bubbling if required:
        if (!animationBubbling && event.target !== event.currentTarget) return;
        
        // Ignore if the event is already captured:
        if (exciteAnimationEventRef.current) return;
        
        // Ignore non matching animation:
        if (!animationNameMatches(event.animationName, animationPattern)) return;
        
        
        
        // Capture the event object:
        exciteAnimationEventRef.current = event;
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
    
    
    
    // Async schedulers:
    
    // Managed, promise-based timeout scheduler (auto-cleans up):
    const setTimeoutAsync            = useSetTimeout();
    
    // Managed, promise-based animation frame scheduler (auto-cleans up):
    const requestAnimationFrameAsync = useRequestAnimationFrame();
    
    
    
    // Sync animation state with effective excitement state:
    useEffect(() => {
        // Exit early if the animation state is already in sync with the intended one:
        if (exciteAnimation === effectiveExcited) return;
        
        
        
        // Holds in-flight promises:
        let tickPromise  : ReturnType<typeof setTimeoutAsync>            | undefined = undefined;
        let framePromise : ReturnType<typeof requestAnimationFrameAsync> | undefined = undefined;
        
        
        
        if (!effectiveExcited) {
            // Stop animation immediately:
            setExcitedAnimation(false); // Not really stopped immediately, the already running animation will finish properly (not interrupted).
            
            // Clear the captured animation event object:
            exciteAnimationEventRef.current = undefined;
        }
        else {
            // Clear animation to allow re-trigger:
            setExcitedAnimation(false);
            
            // Backup and clear the captured animation event object:
            const stoppedAnimationEvent = exciteAnimationEventRef.current;
            exciteAnimationEventRef.current = undefined;
            
            
            
            // Notify parent to reset excitement:
            if (stoppedAnimationEvent) {
                requestExcitedReset(false, stoppedAnimationEvent);
            } // if
            
            
            
            (async (): Promise<void> => {
                // Wait at least one frame to allow animation re-trigger:
                framePromise = requestAnimationFrameAsync();
                
                
                
                // Wait for N ticks to give parent time to reset `excited`:
                for (let ticks = 0; ticks < retriggerDelayTicks; ticks++) {
                    tickPromise = setTimeoutAsync(0);
                    const isCompleted = await tickPromise;
                    tickPromise = undefined;
                    
                    // Ensures no interruptions occur during the delay:
                    if (isCompleted === false) return;
                } // for
                
                
                
                // Ensures the one frame delay has completed:
                const timestampOrAborted = await framePromise;
                framePromise = undefined;
                
                // Ensures no interruptions occur during the delay:
                if (timestampOrAborted === false) return;
                
                
                
                // Restart animation:
                setExcitedAnimation(true);
            })();
        } // if
        
        
        
        return () => {
            // Abort the in-flight promises (if any):
            tickPromise?.abort();
            framePromise?.abort();
        };
    }, [exciteAnimation, effectiveExcited]);
    
    
    
    // Return resolved excitement attributes:
    return {
        excited               : effectiveExcited,
        exciteClassname       : getExciteClassname(exciteAnimation),
        ...animationHandlers,
        handleAnimationEnd    : mergedHandleAnimationEnd,
        handleAnimationCancel : mergedHandleAnimationCancel,
    } satisfies ExciteBehaviorState<TElement>;
};
