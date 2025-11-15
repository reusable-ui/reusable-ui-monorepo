'use client' // The exported `useGlobalPointerRelease()` hook is client side only.

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
 * Controls the global fallback mechanism for pointer release detection.
 */
export interface GlobalPointerReleaseController {
    /**
     * Registers a global `pointerup` and `pointercancel` listener for the specified pointerId.
     * 
     * Should be called during `pointerdown` to track the active pointer lifecycle.
     * The listener self-tears after firing or can be manually aborted.
     */
    register : (pointerId: number) => void
    
    /**
     * Aborts the global fallback listener and cancels any pending release timeout.
     * 
     * Should be called during `pointerup`, `pointercancel`, or synthetic release
     * to prevent the fallback from invoking `onRelease()`.
     */
    abort    : () => void
}



/**
 * Provides a global fallback mechanism for pointer release detection.
 * 
 * Useful when a `pointerup` or `pointercancel` event might occur
 * outside the component boundary (e.g. portals, shadow DOM, or lost focus).
 * 
 * Behaviors:
 * - Registered dynamically via `register(pointerId)`
 * - Self-tears after firing (mimicking `{ once: true }`)
 * - Defers invocation to a macrotask to allow local handlers to run first
 * - Cleaned up on unmount or manually via `abort()`
 * 
 * @param onRelease - Callback to invoke when the global fallback detects a release
 * @returns A controller with `register()` and `abort()` methods
 */
export const useGlobalPointerRelease = (onRelease: (event: PointerEvent) => void): GlobalPointerReleaseController => {
    // States:
    
    // Tracks the active pointerId for matching:
    const pointerIdRef = useRef<number | null>(null);
    
    // Tracks the pending release timeout:
    const timeoutRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    
    
    // Stable callbacks:
    
    /**
     * Removes global listeners and cancels any pending release timeout.
     * Called on unmount or when synthetic release overrides the fallback.
     */
    const abort = useStableCallback(() => {
        // Unregister global release event:
        window.removeEventListener('pointerup'     , handleGlobalRelease, { capture: true });
        window.removeEventListener('pointercancel' , handleGlobalRelease, { capture: true });
        
        
        
        // Forget the related pointerId:
        pointerIdRef.current = null;
        
        
        
        // Cancels deferred release invocation:
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        } // if
    });
    
    /**
     * Global handler for `pointerup` and `pointercancel`.
     * Verifies the pointerId, then schedules the `onRelease()` callback.
     */
    const handleGlobalRelease = useStableCallback((event: PointerEvent) => {
        // Ignore non matching pointerId:
        if (event.pointerId !== pointerIdRef.current) return;
        
        
        
        // Self-destruct after firing:
        abort();
        
        
        
        /**
         * Defers the global pointer release fallback with a *double* macrotask tick.
         * 
         * Why:
         * - Ensures this fallback runs *after* both the click event and the press_release_update commit.
         * - Acts as a safety net if a real `pointerup` is missed.
         * 
         * How:
         * - Immediately aborted in the `pointerup` and `pointercancel` handlers indicating a *real* release has occurred.
         * - Double macrotask is chosen because macrotask+microtask ordering would run too early (before click). Double macrotask ensures "last in line."
         * - `timeoutRef.current` is reassigned each time to track the latest timer ID.
         */
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = setTimeout(() => {
                onRelease(event);
                timeoutRef.current = null;
            }, 0);
        }, 0);
    });
    
    /**
     * Registers the global fallback listener for the given pointerId.
     * Should be called during `pointerdown`.
     */
    const register = useStableCallback((pointerId: number) => {
        // Remember the related pointerId for matching:
        pointerIdRef.current = pointerId;
        
        
        
        // Register global release event:
        window.addEventListener('pointerup'     , handleGlobalRelease, { capture: true });
        window.addEventListener('pointercancel' , handleGlobalRelease, { capture: true });
    });
    
    
    
    // Cleanup on unmount to prevent memory leaks or late callbacks:
    useEffect(() => abort, []);
    
    
    
    // Expose the global fallback controller:
    return {
        register,
        abort,
    } satisfies GlobalPointerReleaseController;
};
