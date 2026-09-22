// React:
import {
    // Types:
    type RefObject,
}                           from 'react'



// Global states:

/**
 * Tracks the most recent native `pointerdown` event globally.
 * 
 * Updated whenever a pointer press occurs,
 * allowing draggable hooks to access the latest native event when performing activation.
 */
const lastPointerDownEventRef : RefObject<PointerEvent | undefined> = { current: undefined };

/**
 * Tracks the most recent native `pointerup` event globally.
 * 
 * Updated whenever a pointer release occurs,
 * allowing draggable hooks to access the latest native event when performing drop commit and deactivation.
 */
const lastPointerUpEventRef   : RefObject<PointerEvent | undefined> = { current: undefined };

/**
 * Tracks the number of active integrations.
 * 
 * Used for reference-counted setup/cleanup:
 * - Incremented when a new integration is created.
 * - Decremented when an integration is disintegrated.
 * - Setup runs when count goes from 0 → 1.
 * - Cleanup runs when count goes from 1 → 0.
 */
let globalIntegrationRefCount : number                 = 0;

/**
 * Holds the current `AbortController` for global pointer listeners.
 * 
 * Allows all listeners to be detached in one call during cleanup.
 */
let globalAbortController     : AbortController | null = null;



// Global lifecycle handlers:

/**
 * Updates the `lastPointerDownEventRef` with the most recent native event,
 * making it available to draggable state hooks for activation logic.
 */
const handleGlobalPointerDown = (event: PointerEvent): void => {
    lastPointerDownEventRef.current = event;
};

/**
 * Updates the `lastPointerUpEventRef` with the most recent native event,
 * making it available to draggable state hooks for drop commit and deactivation logic.
 */
const handleGlobalPointerUp   = (event: PointerEvent): void => {
    lastPointerUpEventRef.current = event;
};



// Global setup/cleanup integrations:

/**
 * Performs global setup for pointerdown and pointerup tracker integration.
 * 
 * - Creates an `AbortController` to manage event listener lifetimes.
 * - Attaches global `pointerdown` and `pointerup` event handlers
 *   to the window with the controller's signal.
 * 
 * Executed once when the first integration is created
 * (i.e. when at least one draggable is enabled).
 */
const setupGlobalIntegration = (): void => {
    // Setups:
    globalAbortController = new AbortController();
    const options : AddEventListenerOptions = { signal: globalAbortController.signal };
    window.addEventListener('pointerdown', handleGlobalPointerDown, options);
    window.addEventListener('pointerup'  , handleGlobalPointerUp  , options);
};

/**
 * Performs global cleanup for pointerdown and pointerup tracker integration.
 * 
 * - Aborts global `pointerdown` and `pointerup` listeners attached during setup.
 * - Clears `AbortController` reference.
 * 
 * Executed once when the last integration is disintegrated
 * (i.e. when no draggables remain enabled).
 */
const cleanupGlobalIntegration = (): void => {
    // Cleanups:
    globalAbortController?.abort();
    globalAbortController = null;
};

/**
 * Represents an attached integration handler that bridges global `pointerdown` and `pointerup` events
 * into the `useDraggableState()` system.
 * 
 * Each call to `integrateGlobalPointer()` produces a handler that manages its own lifecycle:
 * - Setup runs once globally when the first handle is created.
 * - Cleanup runs once globally when the last handle is disintegrated.
 * - `disintegrate()` is idempotent: only the first call per handle is effective.
 */
export interface GlobalPointerIntegration {
    /**
     * Cleans up this integration instance.
     * 
     * Idempotent: only the first call per instance is effective;
     * subsequent calls are ignored.
     */
    disintegrate            : () => void
    
    /**
     * A shared reference to the most recent native `pointerdown` event.
     * 
     * Updated whenever a pointer press occurs,
     * allowing draggable hooks to access the latest native event when performing activation.
     */
    lastPointerDownEventRef : RefObject<PointerEvent | undefined>
    
    /**
     * A shared reference to the most recent native `pointerup` event.
     * 
     * Updated whenever a pointer release occurs,
     * allowing draggable hooks to access the latest native event when performing drop commit and deactivation.
     */
    lastPointerUpEventRef   : RefObject<PointerEvent | undefined>
}

/**
 * Integrates global `pointerdown` and `pointerup` tracking
 * into the `useDraggableState()` system.
 * 
 * @returns An integration handler with a `disintegrate()` callback for releasing the integration
 * alongside shared references to the most recent native `pointerdown` and `pointerup` events.
 */
export const integrateGlobalPointer = (): GlobalPointerIntegration => {
    // No integration on server side:
    if (typeof window === 'undefined') return {
        disintegrate: () => {
            // noop
        },
        lastPointerDownEventRef,
        lastPointerUpEventRef,
    } satisfies GlobalPointerIntegration;
    
    
    
    // Increment global counter and run setup if this is the first integration:
    if (globalIntegrationRefCount++ === 0) setupGlobalIntegration();
    
    
    
    // Per-instance guard to enforce idempotency:
    let isActive = true;
    return {
        disintegrate: () => {
            // Ignore subsequent calls:
            if (!isActive) return;
            isActive = false;
            
            
            
            // Decrement global counter and run cleanup if this was the last integration:
            if (--globalIntegrationRefCount === 0) cleanupGlobalIntegration();
        },
        lastPointerDownEventRef,
        lastPointerUpEventRef,
    } satisfies GlobalPointerIntegration;
};
