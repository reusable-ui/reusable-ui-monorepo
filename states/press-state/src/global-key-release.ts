'use client' // The exported `useGlobalKeyRelease()` hook is client side only.

// React:
import {
    // Hooks:
    useRef,
    useEffect,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * Controls the global fallback mechanism for key release detection.
 */
export interface GlobalKeyReleaseController {
    /**
     * Registers a global `keyup` listener for the specified keyCode.
     * 
     * Should be called during `keydown` to track the active key lifecycle.
     * The listener self-tears after firing or can be manually aborted.
     */
    register : (keyCode: string) => void
    
    /**
     * Aborts the global fallback listener and cancels any pending release timeout.
     * 
     * Should be called during `keyup` or synthetic release
     * to prevent the fallback from invoking `onRelease()`.
     */
    abort    : () => void
}



/**
 * Provides a global fallback mechanism for key release detection.
 * 
 * Useful when a `keyup` event might occur
 * outside the component boundary (e.g. portals, shadow DOM, or lost focus).
 * 
 * Behaviors:
 * - Registered dynamically via `register(keyCode)`
 * - Self-tears after firing (mimicking `{ once: true }`)
 * - Defers invocation to a macrotask to allow local handlers to run first
 * - Cleaned up on unmount or manually via `abort()`
 * 
 * @param onRelease - Callback to invoke when the global fallback detects a release
 * @returns A controller with `register()` and `abort()` methods
 */
export const useGlobalKeyRelease = (onRelease: (event: KeyboardEvent) => void): GlobalKeyReleaseController => {
    // States:
    
    // Tracks the active keyCode for matching:
    const keyCodeRef = useRef<string | null>(null);
    
    // Tracks the pending release timeout:
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    
    
    // Stable callbacks:
    
    /**
     * Removes global listeners and cancels any pending release timeout.
     * Called on unmount or when synthetic release overrides the fallback.
     */
    const abort = useStableCallback(() => {
        // Unregister global release event:
        window.removeEventListener('keyup', handleGlobalRelease, { capture: true });
        
        
        
        // Forget the related keyCode:
        keyCodeRef.current = null;
        
        
        
        // Cancels deferred release invocation:
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        } // if
    });
    
    /**
     * Global handler for `keyup`.
     * Verifies the keyCode, then schedules the `onRelease()` callback.
     */
    const handleGlobalRelease = useStableCallback((event: KeyboardEvent) => {
        // Ignore non matching keyCode:
        if (event.code !== keyCodeRef.current) return;
        
        
        
        // Self-destruct after firing:
        abort();
        
        
        
        // Defer to macrotask to allow local bubbling handlers to run first:
        timeoutRef.current = setTimeout(() => {
            onRelease(event);
            timeoutRef.current = null;
        }, 0);
    });
    
    /**
     * Registers the global fallback listener for the given keyCode.
     * Should be called during `keydown`.
     */
    const register = useStableCallback((keyCode: string) => {
        // Remember the related keyCode for matching:
        keyCodeRef.current = keyCode;
        
        
        
        // Register global release event:
        window.addEventListener('keyup', handleGlobalRelease, { capture: true });
    });
    
    
    
    // Cleanup on unmount to prevent memory leaks or late callbacks:
    useEffect(() => abort, []);
    
    
    
    // Expose the global fallback controller:
    return {
        register,
        abort,
    } satisfies GlobalKeyReleaseController;
};
