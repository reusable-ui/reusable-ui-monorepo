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
 * Represents a key press tracker.
 * 
 * This interface provides:
 * - A stable function for tracking key press transitions.
 * - A stable function for checking whether the current key state satisfies the configured press gesture.
 */
export interface KeyPressTracker {
    /**
     * A stable function for tracking key press transitions.
     * 
     * Usage:
     * - On `keydown`, call `track(keyCode, true)` to track the key and activate press state if needed.
     * - On `keyup`, call `track(keyCode, false)` to untrack the key and deactivate press state if all keys are released.
     * 
     * Returns `true` if:
     * - The key was successfully tracked (on press), or
     * - Successfully untracked with no remaining pressed keys (on release).
     * 
     * Returns `false` if:
     * - The key does not match the `pressKeys` filter, or
     * - Other keys are still pressed (on release).
     */
    track(keyCode: string, isPressed: boolean): boolean
    
    /**
     * Returns `true` if the current key state satisfies the configured press gesture.
     * 
     * This includes:
     * - At least one valid key currently pressed, matching the `pressKeys` filter.
     */
    isPressed(): boolean
}



/**
 * Provides a stable imperative function for tracking key press state transitions.
 * 
 * This hook maintains an internal `Set<string>` of currently pressed keys and exposes
 * a `track()` function to be used inside `keydown` and `keyup` handlers.
 * 
 * Usage:
 * - On `keydown`, call `track(keyCode, true)` to track the key and activate press state if needed.
 * - On `keyup`, call `track(keyCode, false)` to untrack the key and deactivate press state if all keys are released.
 * 
 * Keys are only tracked if they match the provided `pressKeys` filter.
 * 
 * Notes:
 * - The returned function is referentially stable via `useStableCallback`.
 * 
 * @param pressKeys - A key or list of keys to track (e.g. 'Enter', ['Space', 'ArrowDown']).
 * @returns A `KeyPressTracker` object containing:
 *   - `track(keyCode, isPressed)` → `true` if the key was successfully tracked (on press), or successfully untracked with no remaining active keys (on release).
 *   - `isPressed()` → `true` if the current key state satisfies the configured press gesture.
 */
export const useKeyPressTracker = (pressKeys: string | string[] | null): KeyPressTracker => {
    // States and flags:
    
    // Internal memory for tracking currently pressed keys:
    const activeKeysRef = useRef<Set<string> | undefined>(undefined);
    if (activeKeysRef.current === undefined) activeKeysRef.current = new Set<string>(); // Lazy initialization
    const activeKeys = activeKeysRef.current;
    
    
    
    // Stable callback functions:
    
    const isPressed = useStableCallback((): boolean => {
        return (activeKeys.size !== 0);
    });
    
    const track     = useStableCallback((keyCode: string, isPressing: boolean) => {
        if (!matchesKey(keyCode, pressKeys)) return false; // The key does not match the expected => failed
        
        
        
        if (isPressing) {
            // Track the key:
            activeKeys.add(keyCode);
            
            
            
            // Successfully tracked:
            return true;
        }
        else {
            // Untrack the key:
            activeKeys.delete(keyCode);
            
            
            
            // If other keys are still tracked, it is considered not fully untracked:
            if (isPressed()) return false; // Still partially tracked => failed
            
            
            
            // Fully untracked:
            return true;
        } // if
    });
    
    
    
    // Return the key press tracker:
    return {
        track,
        isPressed,
    } satisfies KeyPressTracker;
};
