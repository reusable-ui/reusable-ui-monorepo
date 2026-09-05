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
    processDragProbe,
    processDropCandidate,
    processDragDropCommit,
}                           from './internal-utilities.js'
import {
    // States:
    activeDroppableRef,
    dragPayloadRef,
    
    // Functions:
    isDragReady,
    extractPayloadFromDataTransfer,
    
    // Setters:
    setDragStatus,
    setDropMetadata,
    
    // Handlers:
    handleDragHandshake,
    handleDragEvaluation,
    handleDragged,
    
    // Events:
    createPointerEventFromDragEvent,
}                           from './internal-simulate-utilities.js'



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
// - Handles drag lifecycle state.
// - Broadcasts active state on start, inactive state on end.
// - Cleans up the previously active droppable entry when drag ends.
const handleGlobalDragStart = (event: DragEvent): void => {
    // Setup when drag starts:
    
    // Mark draggable as active and broadcast active state to all droppables:
    updateDragLifecycle({
        // Lifecycle configs:
        isSetup: true, // ⚙️ `true` → setup
        
        // Actual states:
        activeDroppableRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
    
    // Assign the drag payload for reuse during drag over:
    dragPayloadRef.current = extractPayloadFromDataTransfer(event.dataTransfer);
    
    
    
    // Prime the probe immediately:
    handleGlobalDragOver(event);
};
const handleGlobalDragEnd   = (): void => {
    // Reset draggable to inactive, broadcast inactive state to all droppables, and clears the previously active droppable entry:
    updateDragLifecycle({
        // Lifecycle configs:
        isSetup: false, // 🧹 `false` → cleanup
        
        // Actual states:
        activeDroppableRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
    
    // Clear the drag payload:
    dragPayloadRef.current = null;
};



// Global drag over handler:
// - Drives synchronization between draggable and droppable states during drag gestures.
const handleGlobalDragOver  = (event: DragEvent): void => {
    const pointerMoveEvent = createPointerEventFromDragEvent(event, 'pointermove');
    processDragProbe<Element>({
        // Events:
        pointerMoveEvent,
        
        // Data:
        dragPayload: dragPayloadRef.current ?? emptyMap,
        
        // Refs:
        dragElement: event.target as Element | null,
        activeDroppableRef,
        
        // Behaviors:
        dropPredicate: undefined,
        
        // Stable event handlers:
        handleDragHandshake,
        handleDragEvaluation,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
        
        // Utility functions:
        isDragReady,
    });
};



// Global drop handler:
// - Simulates capture the most recent pointerup event during drag gestures for later commit.
// - Immediately commits after the capture.
const handleGlobalDrop      = (event: DragEvent): void => {
    // Simulates capture the most recent pointerup event:
    const pointerUpEvent = createPointerEventFromDragEvent(event, 'pointerup');
    processDropCandidate({
        // Events:
        pointerUpEvent,
        
        // Refs:
        activeDroppableRef,
        
        // Utility functions:
        isDragReady,
    });
    
    // Immediately commits after the capture:
    processDragDropCommit<Element>({
        // Data:
        dragPayload: dragPayloadRef.current ?? emptyMap,
        
        // Refs:
        dragElement: event.target as Element | null,
        activeDroppableRef,
        
        // Stable event handlers:
        handleDragged,
        
        // Utility functions:
        isDragReady,
    });
};



// Global setup/cleanup integrations:

/**
 * Performs global setup for native drag integration.
 * 
 * - Creates an `AbortController` to manage event listener lifetimes.
 * - Attaches global drag event handlers (`dragstart`, `dragend`, `dragover`, `drop`)
 *   to the document with the controller's signal.
 * 
 * Executed once when the first integration is created.
 */
const setupGlobalIntegration = (): void => {
    // Setups:
    globalAbortController = new AbortController();
    const options : AddEventListenerOptions = { signal: globalAbortController.signal };
    document.addEventListener('dragstart', handleGlobalDragStart, options);
    document.addEventListener('dragend'  , handleGlobalDragEnd  , options);
    document.addEventListener('dragover' , handleGlobalDragOver , options);
    document.addEventListener('drop'     , handleGlobalDrop     , options);
};

/**
 * Performs global cleanup for native drag integration.
 * 
 * - Aborts all event listeners attached during setup.
 * - Clears references to the active droppable and drag payload.
 * 
 * Executed once when the last integration is disintegrated.
 */
const cleanupGlobalIntegration = (): void => {
    // Cleanups:
    globalAbortController?.abort();
    globalAbortController = null;
    
    
    
    // Additional cleanups for disintegration prior to drag end:
    
    // Clear active droppable reference and its bundled data:
    activeDroppableRef.current = null;
    
    // Clear the drag payload:
    dragPayloadRef.current = null;
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
 *     const { dropStatus, dragPayload } = useDroppableState({
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
