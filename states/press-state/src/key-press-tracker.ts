'use client' // The exported `useKeyPressTracker()` hook is client side only.

// React:
import {
    // Hooks:
    useRef,
}                           from 'react'

// Utilities:
import {
    matchesKey,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * A stable function for tracking key press transitions.
 * 
 * Usage:
 * - On `keydown`, call `trackKeyPressState(keyCode, true)` to track the key and activate press state if needed.
 * - On `keyup`, call `trackKeyPressState(keyCode, false)` to untrack the key and deactivate press state if all keys are released.
 * 
 * Returns `true` if:
 * - The key was successfully tracked (on press), or
 * - Successfully untracked with no remaining pressed keys (on release).
 * 
 * Returns `false` if:
 * - The key does not match the `pressKeys` filter, or
 * - Other keys are still pressed (on release).
 */
export type TrackKeyPressStateFunction = (keyCode: string, isPressed: boolean) => boolean;



/**
 * Provides a stable imperative function for tracking key press state transitions.
 * 
 * This hook maintains an internal `Set<string>` of currently pressed keys and exposes
 * a `trackKeyPressState()` function to be used inside `keydown` and `keyup` handlers.
 * 
 * Usage:
 * - On `keydown`, call `trackKeyPressState(keyCode, true)` to track the key and activate press state if needed.
 * - On `keyup`, call `trackKeyPressState(keyCode, false)` to untrack the key and deactivate press state if all keys are released.
 * 
 * Keys are only tracked if they match the provided `pressKeys` filter.
 * 
 * Notes:
 * - The returned function is referentially stable via `useStableCallback`.
 * 
 * @param pressKeys - A key or list of keys to track (e.g. 'Enter', ['Space', 'ArrowDown']).
 * @returns A `TrackKeyPressStateFunction` that returns:
 *   - `true` if the key was successfully tracked (on press), or successfully untracked with no remaining pressed keys (on release).
 *   - `false` if the key does not match the `pressKeys` filter, or other keys are still pressed (on release).
 */
export const useKeyPressTracker = (pressKeys: string | string[] | null): TrackKeyPressStateFunction => {
    // States and flags:
    
    // Internal memory for tracking currently pressed keys:
    const pressedKeysRef = useRef<Set<string> | undefined>(undefined);
    if (pressedKeysRef.current === undefined) pressedKeysRef.current = new Set<string>(); // Lazy initialization
    const pressedKeys = pressedKeysRef.current;
    
    
    
    // Stable tracker function:
    const trackKeyPressState : TrackKeyPressStateFunction = useStableCallback((keyCode, isPressed) => {
        if (!matchesKey(keyCode, pressKeys)) return false; // The key does not match the expected => failed
        
        
        
        if (isPressed) {
            // Track the key:
            pressedKeys.add(keyCode);
            
            
            
            // Successfully tracked:
            return true;
        }
        else {
            // Untrack the key:
            pressedKeys.delete(keyCode);
            
            
            
            // If other keys are still tracked, it is considered not fully untracked:
            if (pressedKeys.size !== 0) return false; // Still partially tracked => failed
            
            
            
            // Fully untracked:
            return true;
        } // if
    });
    
    
    
    // Return the key press tracker function:
    return trackKeyPressState;
};
