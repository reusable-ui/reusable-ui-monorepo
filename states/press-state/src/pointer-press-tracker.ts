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
 * Represents a modality-aware pointer press tracker.
 * 
 * This interface provides:
 * - A stable function for tracking pointer press transitions.
 * - A stable function for checking whether the current pointer state satisfies the configured press gesture.
 */
export interface PointerPressTracker {
    /**
     * A stable function for tracking pointer press transitions.
     * 
     * Usage:
     * - On `pointerdown`, call `track(event, true)` to track the pointer and activate press state if needed.
     * - On `pointerup` or `pointercancel`, call `track(event, false)` to untrack the pointer and deactivate press state if all pointers are released.
     * 
     * Returns `true` if:
     * - The pointer was successfully tracked (on press), or
     * - Successfully untracked with no remaining pressed pointers (on release).
     * 
     * Returns `false` if:
     * - The pointer does not match any of `pressButtons`, `pressPressure`, `pressFingers` filters, or
     * - Other pointers are still pressed (on release).
     */
    track(event: PointerEvent, isPressed: boolean): boolean
    
    /**
     * Returns `true` if the current pointer state satisfies the configured press gesture.
     * 
     * This includes:
     * - A valid mouse or pen press, or
     * - The exact number of active touch points matching `pressFingers`.
     */
    isPressed(): boolean
}



/**
 * Tracks active pointer IDs per modality for press gesture validation.
 */
interface ActivePointers {
    /**
     * Currently pressed mouse pointer ID (only one mouse pointer at a time).
     */
    mouse : number | null
    
    /**
     * Currently pressed pen pointer ID (only one pen pointer at a time).
     */
    pen   : number | null
    
    /**
     * Set of currently pressed touch pointer IDs (multi-touch supported).
     */
    touch : Set<number>
}



/**
 * Provides a stable imperative function for tracking pointer press state transitions.
 * 
 * This hook maintains an internal `Set<number>` of currently pressed pointer IDs and exposes
 * a `track()` function to be used inside `pointerdown`, `pointerup`, and `pointercancel` handlers.
 * 
 * Usage:
 * - On `pointerdown`, call `track(event, true)` to track the pointer and activate press state if needed.
 * - On `pointerup` or `pointercancel`, call `track(event, false)` to untrack the pointer and deactivate press state if all pointers are released.
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
 * @returns A `PointerPressTracker` object containing:
 *   - `track(event, isPressed)` → `true` if the pointer was successfully tracked (on press), or successfully untracked with no remaining active pointers (on release).
 *   - `isPressed()` → `true` if the current pointer state satisfies the configured press gesture.
 */
export const usePointerPressTracker = (pressButtons: number | number[] | null, pressPressure: number, pressFingers: number): PointerPressTracker => {
    // States and flags:
    
    // Internal memory for tracking currently pressed pointer IDs:
    const activePointersRef = useRef<ActivePointers | undefined>(undefined);
    if (!activePointersRef.current) activePointersRef.current = { mouse: null, pen: null, touch: new Set<number>() } satisfies ActivePointers; // Lazy initialization
    const activePointers = activePointersRef.current;
    
    
    
    // Stable callback functions:
    
    const isPressed = useStableCallback((): boolean => {
        return (
            (activePointers.mouse !== null)
            ||
            (activePointers.pen !== null)
            ||
            (activePointers.touch.size === pressFingers)
        );
    });
    
    const track     = useStableCallback((event: PointerEvent, isPressing: boolean) => {
        // Extract pointer event states:
        const {
            pointerType,
            button,
            pressure,
            pointerId,
        } = event;
        
        
        
        if (isPressing) {
            // Track pointer by type:
            switch (pointerType) {
                case 'mouse':
                    // Validate the allowed buttons:
                    if (!matchesButton(button, pressButtons)) return false;
                    
                    // Remember the mouse id:
                    activePointers.mouse = pointerId;
                    
                    break;
                
                case 'pen':
                    // Validate the pressure threshold:
                    if (pressure < pressPressure) return false;
                    
                    // Remember the pen id:
                    activePointers.pen = pointerId;
                    
                    break;
                
                case 'touch':
                    // Track pointer before evaluating touch threshold:
                    activePointers.touch.add(pointerId);
                    
                    // Validate the exact number of fingers required for touch input:
                    if (activePointers.touch.size !== pressFingers) return false;
                    
                    break;
                
                default:
                    // Unknown pointer type:
                    return false;
            } // switch
            
            
            
            // Successfully tracked:
            return true;
        }
        else {
            // Always untrack pointer:
            switch (pointerType) {
                case 'mouse':
                    // Forget the mouse id:
                    activePointers.mouse = null;
                    
                    break;
                
                case 'pen':
                    // Forget the pen id:
                    activePointers.pen = null;
                    
                    break;
                
                case 'touch':
                    // Untrack pointer:
                    activePointers.touch.delete(pointerId);
                    
                    break;
                
                default:
                    // Unknown pointer type:
                    return false;
            } // switch
            
            
            
            // If other pointers are still tracked, it is considered not fully untracked:
            if (isPressed()) return false; // Still partially tracked => failed
            
            
            
            // Fully untracked:
            return true;
        } // if
    });
    
    
    
    // Return the pointer press tracker:
    return {
        track,
        isPressed,
    } satisfies PointerPressTracker;
};
