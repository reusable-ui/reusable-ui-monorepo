'use client' // The exported `usePointerPressTracker()` hook is client side only.

// React:
import {
    // Types:
    type PointerEvent,
    
    
    
    // Hooks:
    useRef,
}                           from 'react'

// Utilities:
import {
    matchesButton,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * A stable function for tracking pointer press transitions.
 * 
 * Usage:
 * - On `pointerdown`, call `trackPointerPressState(event, true)` to track the pointer and activate press state if needed.
 * - On `pointerup` or `pointercancel`, call `trackPointerPressState(event, false)` to untrack the pointer and deactivate press state if all pointers are released.
 * 
 * Returns `true` if:
 * - The pointer was successfully tracked (on press), or
 * - Successfully untracked with no remaining pressed pointers (on release).
 * 
 * Returns `false` if:
 * - The pointer does not match any of `pressButtons`, `pressPressure`, `pressFingers` filters, or
 * - Other pointers are still pressed (on release).
 */
export type TrackPointerPressStateFunction = (event: PointerEvent, isPressed: boolean) => boolean;



/**
 * Provides a stable imperative function for tracking pointer press state transitions.
 * 
 * This hook maintains an internal `Set<number>` of currently pressed pointer IDs and exposes
 * a `trackPointerPressState()` function to be used inside `pointerdown`, `pointerup`, and `pointercancel` handlers.
 * 
 * Usage:
 * - On `pointerdown`, call `trackPointerPressState(event, true)` to track the pointer and activate press state if needed.
 * - On `pointerup` or `pointercancel`, call `trackPointerPressState(event, false)` to untrack the pointer and deactivate press state if all pointers are released.
 * 
 * Pointers are only tracked if they match the provided press filters:
 * - `pressButtons` for mouse
 * - `pressPressure` for pen
 * - `pressFingers` for touch
 * 
 * Notes:
 * - The returned function is referentially stable via `useStableCallback`.
 * 
 * @param pressButtons - A button or list of buttons to track (e.g. 0, [0, 1]).
 * @param pressPressure - The minimum pressure threshold for pen input.
 * @param pressFingers - The exact number of fingers required for touch input.
 * @returns A `TrackPointerPressStateFunction` that returns:
 *   - `true` if the pointer was successfully tracked (on press), or successfully untracked with no remaining pressed pointers (on release).
 *   - `false` if the pointer does not match any of `pressButtons`, `pressPressure`, `pressFingers` filters, or other pointers are still pressed (on release).
 */
export const usePointerPressTracker = (pressButtons: number | number[] | null, pressPressure: number, pressFingers: number): TrackPointerPressStateFunction => {
    // States and flags:
    
    // Internal memory for tracking currently pressed pointer IDs:
    const pressedPointersRef = useRef<Set<number> | undefined>(undefined);
    if (!pressedPointersRef.current) pressedPointersRef.current = new Set<number>(); // Lazy initialization
    const pressedPointers = pressedPointersRef.current;
    
    
    
    // Stable tracker function:
    const trackPointerPressState : TrackPointerPressStateFunction = useStableCallback((event, isPressed) => {
        // Extract pointer event states:
        const {
            pointerType,
            button,
            pressure,
            pointerId,
        } = event;
        
        
        
        if (isPressed) {
            // Mouse: filter by allowed buttons:
            if ((pointerType === 'mouse') && !matchesButton(button, pressButtons)) return false; // Mouse button does not match the expected => failed
            
            // Pen: filter by pressure threshold:
            if ((pointerType === 'pen') && (pressure < pressPressure)) return false; // Pen pressure is below threshold => failed
            
            // Track pointer before evaluating touch threshold:
            pressedPointers.add(pointerId);
            
            // Touch: only activate if total touches match pressFingers exactly:
            if ((pointerType === 'touch') && (pressedPointers.size !== pressFingers)) return false; // The number of touches does not match the expected => failed
            
            
            
            // Successfully tracked:
            return true;
        }
        else {
            // Always untrack pointer:
            pressedPointers.delete(pointerId);
            
            
            
            // If other pointers are still tracked, it is considered not fully untracked:
            if (pressedPointers.size !== 0) return false; // Still partially tracked => failed
            
            
            
            // Fully untracked:
            return true;
        } // if
    });
    
    
    
    // Return the pointer press tracker function:
    return trackPointerPressState;
};
