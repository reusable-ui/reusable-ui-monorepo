'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useLayoutEffect,
    useEffect,
    useRef,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * Triggers the appropriate semantic transition events in response to transition phase changes.
 * 
 * Behaviors:
 * - The initial phase is not considered a phase change and does not trigger events.
 * - Emits events on **subsequent updates** before browser paint (`useLayoutEffect`),
 *   ensuring handlers can perform timing-sensitive DOM operations.
 * 
 * @template TPhase - The type representing semantic transition phases.
 * 
 * @param phase - The current transition phase value for changed phase detection.
 * 
 * @param handlePhaseChange - A delegate function that maps the given phase to the appropriate event handler calls.
 * This function should contain the switch/case logic for invoking `onStart`/`onEnd` callbacks.
 * 
 * @example
 * // Disabled-state usage:
 * useTransitionStatePhaseEvents(disabledPhase, (changedTransitionPhase) => {
 *   switch (changedTransitionPhase) {
 *     case 'enabling'  : props.onEnablingStart?.(changedTransitionPhase, undefined);  break;
 *     case 'enabled'   : props.onEnablingEnd?.(changedTransitionPhase, undefined);    break;
 *     case 'disabling' : props.onDisablingStart?.(changedTransitionPhase, undefined); break;
 *     case 'disabled'  : props.onDisablingEnd?.(changedTransitionPhase, undefined);   break;
 *   }
 * });
 * 
 * @remarks
 * - On **initial mount**, no events are emitted. This prevents false positives.
 * - On **subsequent updates**, the delegate is called with the new phase.
 */
export const useTransitionStatePhaseEvents = <TPhase extends string>(phase: TPhase, handlePhaseChange: (changedTransitionPhase: TPhase) => void): void => {
    // Tracks whether the component has passed its initial mount phase.
    // Prevents lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // Ensures referential stability across renders, so it can be safely
    // excluded from the `useEffect` dependency array,
    // preventing unnecessary effect re-runs.
    const stableHandlePhaseChange = useStableCallback(handlePhaseChange);
    
    
    
    /*
        ⚠️ React Strict Mode Consideration:
        - Two effects are used to ensure consistent behavior across strict and non-strict modes.
        - The observer effect emits phase change events.
        - The setup effect tracks mount status.
        - The setup effect must run AFTER the observer effect to ensure
          that events are only emitted for SUBSEQUENT updates.
        - The first render (mount) should not emit any events.
    */
    
    // Observer effect: emits phase change events on `phase` updates.
    // Use `useLayoutEffect()` so events fire before browser paint,
    // useful if handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Skip initial mount:
        if (!hasMountedRef.current) return;
        
        
        
        // Fire phase change event:
        stableHandlePhaseChange(phase);
    }, [phase]);
    
    // Setup effect: marks the component as mounted and resets on unmount.
    // Regular `useEffect()` is sufficient here since mount tracking
    // does not require pre-paint timing.
    useEffect(() => {
        // Mark as mounted:
        hasMountedRef.current = true;
        
        
        
        return () => {
            // Reset mount status on unmount:
            hasMountedRef.current = false;
        };
    }, []);
};
