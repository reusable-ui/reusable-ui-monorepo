'use client' // The exported utilities are client side only.

// Types:
import {
    // Integrations:
    type NativeDragIntegration,
}                           from './types.js'

// Utilities:
import {
    emptyMap,
}                           from './internal-defaults.js'
import {
    // Updates:
    updateDragLifecycle,
    
    // Processes:
    processDragActivation,
    processDragDeactivation,
    processDragProbe,
    processDragCommit,
}                           from './internal-utilities.js'
import {
    // Contexts:
    draggable,
    
    // Events:
    createPointerEventFromDragEvent,
}                           from './internal-simulate-utilities.js'
import {
    // Classes:
    SecureDragPayload,
    
    // Utilities:
    secureResolvePayload,
}                           from './internal-secure-drag-payload.js'



// Global states:

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
 * Holds the current `AbortController` for global event listeners.
 * 
 * Allows all listeners to be detached in one call during cleanup.
 */
let globalAbortController     : AbortController | null = null;



// Global lifecycle handlers:
// - Handles drag lifecycle state:
//   - Broadcasts active state on start, inactive state on end.
//   - Resets the previously active droppable states (status + payload) when drag ends.
const handleLifecycleChange = (isSetup: boolean): Promise<void> => {
    // Setup   : Mark draggable as active and broadcast active state to all droppables.
    // Cleanup : Reset the draggable side to inactive, broadcast inactive state to all droppables, and resets the previously active droppable side.
    updateDragLifecycle(draggable, isSetup);
    
    
    
    // Wait until the state is settled:
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 0);
    });
};
const handleGlobalDragStart = (event: DragEvent): void => {
    // Setup when drag starts:
    
    // Assign the drag element reference:
    draggable.dragElementRef.current = event.target as Element | null;
    
    // Assign the drag payload for reuse during drag movements:
    const { dataTransfer } = event;
    draggable.dragPayload = dataTransfer ? new SecureDragPayload(dataTransfer) : emptyMap;
    
    // Setup when drag starts:
    handleLifecycleChange(true)
    
    
    
    // Wait until the state is settled:
    .then(() => {
        // Dispatch activation events after state is settled:
        processDragActivation(draggable, createPointerEventFromDragEvent(event, 'pointerdown'));
        
        
        
        // Prime the probe immediately:
        handleGlobalDragOver(event);
    });
};
const handleGlobalDragEnd   = (event: DragEvent): void => {
    // Cleanup when drag ends:
    handleLifecycleChange(false)
    
    
    
    // Wait until the state is settled:
    .then(() => {
        // Dispatch deactivation events after state is settled:
        processDragDeactivation(draggable, createPointerEventFromDragEvent(event, 'pointerup'));
        
        
        
        // Clear the drag payload after drag end:
        draggable.dragPayload = emptyMap;
        
        // Clear the drag element reference:
        draggable.dragElementRef.current = null;
    });
};

// Global dragenter handler (External Drag Initialization):
// - Acts as a surrogate `dragstart` for external items (OS files, text, links).
// - External drags do not fire `dragstart` because they originate outside the DOM.
const handleGlobalDragEnter = (event: DragEvent): void => {
    // Skip if a session is already active. This prevents:
    // - Overriding the current drag session.
    // - Re-initializing when transitioning into nested child elements.
    if (draggable.dragSession !== null) return;
    
    
    
    // Simulate `dragstart` to bootstrap the session for the incoming external item:
    handleGlobalDragStart(event);
};

// Global dragleave handler (External Drag Cancellation):
// - Acts as a surrogate `dragend` for external items (OS files, text, links).
// - External drags do not fire `dragend` because they originate outside the DOM.
const handleGlobalDragLeave = (event: DragEvent): void => {
    // Skip if a session is already terminated. This prevents:
    // - Unnecessary cleanup tasks.
    if (draggable.dragSession === null) return;
    
    
    
    // ⚠️ CRITICAL: `dragleave` fires repeatly when transitioning between nested child elements.
    // We MUST verify `relatedTarget === null`, which exclusively happens when the pointer 
    // completely exits the browser window back to the OS.
    if (!event.relatedTarget) {
        // Simulate `dragend` to safely terminate the abandoned session:
        handleGlobalDragEnd(event);
    } // if
};



// Global drag handler:
// - Drives synchronization between draggable and droppable states during drag movements.
// - Why `dragover` instead of `drag`?
//   1. Continuous Probing: `dragover` provides a reliable, high-frequency coordinate stream 
//      to drive `processDragProbe()` across all browsers.
//   2. External File Support: OS-level file drags do not originate from a DOM element, 
//      so they never fire `drag` events. Document-level `dragover` correctly captures 
//      both internal HTML elements and external file drops.
//   3. Centralized Drop Acceptance: Intercepts `dragover` at the document root to conditionally 
//      invoke `preventDefault()`, enabling native `drop` events without requiring individual 
//      droppable elements to attach their own native listeners.
const handleGlobalDragOver  = (event: DragEvent): void => {
    processDragProbe(draggable, createPointerEventFromDragEvent(event, 'pointermove'));
    
    
    
    // Centralized native drop zone acceptance:
    // - Conditionally calls `preventDefault()` on behalf of active droppable targets.
    // - Only intercepts if the negotiated handshake is accepted.
    // - Prevents interference with non-integrated native droppable zones on the page.
    // - Crucial: Calling `preventDefault()` is what authorizes the browser to fire the subsequent native `drop` event.
    // - Uses `.contains()` because `event.target` might be a nested child element 
    //   (like an icon or text) inside the actual `dropElement`.
    const { dragSession } = draggable;
    if (dragSession?.interaction?.isAccepted && dragSession.interaction.dropElement.contains(event.target as Element)) {
        event.preventDefault();
    } // if
};



// Global drop handler:
// - Manages event prevention, secure payload extraction, and drop commitment.
const handleGlobalDrop      = async (event: DragEvent): Promise<void> => {
    const { dragSession, dragPayload } = draggable;
    
    
    
    // Intercept and prevent default browser drop behavior synchronously:
    // - Conditionally calls `preventDefault()` on behalf of active droppable targets.
    // - Must occur before any `await` to ensure the browser respects it.
    // - Only intercepts if the negotiated handshake is accepted.
    // - Prevents interference with non-integrated native droppable zones on the page.
    // - Crucial: Calling `preventDefault()` here stops the browser's default drop behavior
    //   (e.g., preventing the browser from navigating away to open a dropped file).
    // - Uses `.contains()` because `event.target` might be a nested child element 
    //   (like an icon or text) inside the actual `dropElement`.
    if (dragSession?.interaction?.isAccepted && dragSession.interaction.dropElement.contains(event.target as Element)) {
        event.preventDefault();
    } // if
    
    
    
    // Securely resolve and unmask the drag payload data:
    // - Unlocks DataTransfer readers and awaits completion of any asynchronous extractions.
    const { dataTransfer } = event;
    if (dataTransfer) await secureResolvePayload(dragPayload, dataTransfer);
    
    
    
    // Immediately commits after the capture:
    processDragCommit(draggable, createPointerEventFromDragEvent(event, 'pointerup'));
};



// Global setup/cleanup integrations:

/**
 * Performs global setup for native drag integration.
 * 
 * - Creates an `AbortController` to manage event listener lifetimes.
 * - Attaches global drag event handlers (`dragstart`, `dragend`, `drag`, `drop`)
 *   to the document with the controller's signal.
 * 
 * Executed once when the first integration is created.
 */
const setupGlobalIntegration = (): void => {
    // Setups:
    draggable.dragMountedRef.current = true;
    globalAbortController = new AbortController();
    const options : AddEventListenerOptions = { signal: globalAbortController.signal };
    document.addEventListener('dragstart', handleGlobalDragStart, options);
    document.addEventListener('dragend'  , handleGlobalDragEnd  , options);
    document.addEventListener('dragenter', handleGlobalDragEnter, options);
    document.addEventListener('dragleave', handleGlobalDragLeave, options);
    document.addEventListener('dragover' , handleGlobalDragOver , options);
    document.addEventListener('drop'     , handleGlobalDrop     , options);
};

/**
 * Performs global cleanup for native drag integration.
 * 
 * - Aborts all event listeners attached during setup.
 * - Reset and dereference the active droppable.
 * - Clears references to the drag payload.
 * 
 * Executed once when the last integration is disintegrated.
 */
const cleanupGlobalIntegration = (): void => {
    // Cleanups:
    draggable.dragMountedRef.current = false;
    globalAbortController?.abort();
    globalAbortController = null;
    
    
    
    // Additional cleanups for disintegration prior to drag end:
    
    // Reset the drag session:
    draggable.dragSession = null;
    
    // Clear the drag payload:
    draggable.dragPayload = emptyMap;
};



/**
 * Integrates native HTML Drag & Drop events (including file drags and third-party draggables)
 * into the `useDroppableState()` system.
 * 
 * Useful for:
 * - Handling **file drags** from the operating system.
 * - Interoperating with **third-party draggable components**
 *   that rely on the native HTML Drag & Drop API.
 * 
 * ⚠️ Use this integration only as a fallback:
 * - If you only need drag-drop across React components,
 *   prefer `useDraggableState()` and `useDroppableState()`.
 * - This integration exists as a compatibility layer, not the primary API.
 * 
 * Internally, this simulates `useDraggableState()` without exposing
 * reactive states — serving purely as a compatibility layer.
 * 
 * Each call to `integrateNativeDrag()` produces a handler that manages its own lifecycle:
 * - Setup runs once globally when the first handle is created.
 * - Cleanup runs once globally when the last handle is disintegrated.
 * - `disintegrate()` is idempotent: only the first call per handle is effective.
 * 
 * @returns An integration handler with a `disintegrate()` callback for releasing the integration.
 * 
 * @remarks
 * #### 🔒 Native Drag Payload Behavior & Browser Security
 * 
 * Due to browser-enforced **Protected Mode** sandboxing, native drag-and-drop operations impose strict limitations on when data can be accessed.  
 * To comply with these security policies while maintaining predictable UI reactivity, the native `DragPayload` operates in a **Two-Phase State Model**:
 * 
 * 1. **Masked Phase (Pre-Commit):**  
 *    Prior to the drop commit (`DragPresenceEvent`, `DropHandshakeEvent`, `DropEvaluationEvent`),  
 *    browser security rules prevent scripts from reading raw data.  
 *    Only metadata (item kinds, MIME types, and counts) is visible, while all underlying values are masked to `null`.  
 *    * *Example:* `DragPayload { 'text/html' => [null, null] }` (Indicates an HTML type carrying two masked items).
 * 
 * 2. **Resolved Phase (Post-Commit):**  
 *    Once the drop commit occurs (`DropCommitEvent`),  
 *    native readers unlock, and values are fully resolved into `string` or `File` instances in-place.  
 *    * *Example:* `DragPayload { 'text/html' => ['<!DOCTYPE html>...', File] }` (Indicates an HTML type carrying actual resolved data).
 * 
 * The table below outlines how `dragPayload` appears across various droppable event phases:
 * 
 * |    Event Phase    |       Event Name      | `dragPayload` Condition |                                  Description                                 |
 * | ----------------- | --------------------- | ----------------------- | ---------------------------------------------------------------------------- |
 * | **Activations**   | `DragPresenceEvent`   | 🛡️ **Masked** (`null`) | Hover active; metadata visible, data locked by browser sandbox.              |
 * | **Handshakes**    | `DropHandshakeEvent`  | 🛡️ **Masked** (`null`) | Target negotiation ongoing; data remains protected.                          |
 * | **Evaluations**   | `DropEvaluationEvent` | 🛡️ **Masked** (`null`) | Drop eligibility evaluated; data remains protected.                          |
 * | **Commits**       | `DropCommitEvent`     | ✨ **Fully Resolved**  | Drop completed; native readers unlock, values populated.                     |
 * | **Deactivations** | `DragAbsenceEvent`    | 🔀 **Conditional**     | Fully resolved if the drop committed successfully; otherwise remains masked. |
 * 
 * ℹ️ **Note on Draggable Events:**  
 * There are no draggable-side events (`DragStartEvent`, `DragHandshakeEvent`, `DragEvaluationEvent`, `DragCommitEvent`, `DragEndEvent`)  
 * for native drags because the draggable side is **virtually simulated** by the library wrapper.
 * 
 * 📌 **Reference Stability:**  
 * The `.dragPayload` property exposed via `useDroppableState()` and all drag/drop event objects share the exact same instance reference throughout the gesture.  
 * The values are initially masked (`null`) and automatically transition to `string` or `File` in-place once the drop commit occurs.
 * 
 * @example
 * ```tsx
 * import React, { FC, useEffect } from 'react';
 * import { integrateNativeDrag } from '@reusable-ui/drag-drop-interaction';
 * 
 * export const FileDropZone: FC = () => {
 *     useEffect(() => {
 *         const integration = integrateNativeDrag();
 *         
 *         return () => {
 *             integration.disintegrate();
 *         };
 *     }, []);
 *     
 *     // Orchestrates the file transaction logic for droppables:
 *     const { dropStatus, dragPayload } = useDroppableState<HTMLDivElement>({
 *         ......
 *     });
 *     
 *     return (
 *         <div className='file-drop-zone'>
 *             <span>Live acceptance feedback</span>
 *             {dropStatus === true
 *                 ? '✅ Drop file(s) here!'
 *                 : dropStatus === null
 *                     ? 'Drag file(s) into this zone'
 *                     : ''}
 *         </div>
 *     );
 * };
 * ```
 */
export const integrateNativeDrag = (): NativeDragIntegration => {
    // Increment global counter and run setup if this is the first integration:
    if (globalIntegrationRefCount++ === 0) setupGlobalIntegration();
    
    
    
    // Per-instance guard to enforce idempotency:
    let isActive = true;
    
    // Exposes an integration handler:
    return {
        disintegrate: () => {
            // Ignore subsequent calls:
            if (!isActive) return;
            isActive = false;
            
            
            
            // Decrement global counter and run cleanup if this was the last integration:
            if (--globalIntegrationRefCount === 0) cleanupGlobalIntegration();
        },
    } satisfies NativeDragIntegration;
};
