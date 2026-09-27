// React:
import {
    // Types:
    type Dispatch,
    type RefObject,
}                           from 'react'

// Types:
import {
    // Data:
    type DragPayload,
    type DropMetadata,
    
    // Reactive states:
    type DraggableState,
}                           from './types.js'
import {
    type DroppableContext,
}                           from './internal-types.js'

// Utilities:
import {
    droppableRegistry,
}                           from './internal-registry.js'



// State updates:

/**
 * Activates the draggable side.
 */
export const activateDraggable        = ({
    // Data:
    isAccepted,
    dropMetadata,
    
    // Actual states:
    isMountedRef,
    
    // Reactive states:
    setDragStatus,
    setDropMetadata,
}: {
    // Data:
    /**
     * Indicating whether both draggable and droppable sides accepted.
     */
    isAccepted              : boolean
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata            : DropMetadata
    
    // Actual states:
    /**
     * Tests whether the draggable component is still mounted:
     * - `undefined`: The draggable has not yet mounted.
     * - `true`: The draggable is still mounted.
     * - `false`: The draggable has been unmounted.
     * 
     * Prevents accidental state updates after unmounted.
     * E.g., clearing the draggable's states after unmount when no contact with any droppable zone.
     */
    isMountedRef            : RefObject<boolean | undefined>
    
    // Reactive states:
    /**
     * Updates whether a drag gesture is currently targeting a droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     * - `false`     → drag gesture active over a droppable zone but rejected by one or both sides
     * - `true`      → drag gesture active over a droppable zone and mutually accepted
     */
    setDragStatus           : Dispatch<DraggableState<Element>['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState<Element>['dropMetadata']>
}): void => {
    // Ignore unmounted draggable:
    if (!isMountedRef.current) return;
    
    
    
    setDragStatus(isAccepted);                              // Set status.
    setDropMetadata(isAccepted ? dropMetadata : undefined); // Expose metadata, if both draggable and droppable sides accepted.
};

/**
 * Activates the droppable side.
 */
export const activateDroppable        = ({
    // Data:
    isAccepted,
    dragPayload,
    
    // Contexts:
    droppable,
}: {
    // Data:
    /**
     * Indicating whether both draggable and droppable sides accepted.
     */
    isAccepted              : boolean
    /**
     * The payload carried by the draggable source.
     */
    dragPayload             : DragPayload
    
    // Contexts:
    /**
     * The droppable side to activate.
     */
    droppable               : DroppableContext< Element>
}): void => {
    // Ignore unmounted droppable:
    if (!droppable.isMountedRef.current) return;
    
    
    
    droppable.setDropStatus(isAccepted);                            // Set status.
    droppable.setDragPayload(isAccepted ? dragPayload : undefined); // Expose payload, if both draggable and droppable sides accepted.
};


/**
 * Deactivates the draggable side.
 */
export const deactivateDraggable      = ({
    // Data:
    inactiveDragStatus,
    
    // Actual states:
    isMountedRef,
    
    // Reactive states:
    setDragStatus,
    setDropMetadata,
}: {
    // Data:
    /**
     * Specifies the inactive draggable status:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     */
    inactiveDragStatus      : null | undefined
    
    // Actual states:
    /**
     * Tests whether the draggable component is still mounted:
     * - `undefined`: The draggable has not yet mounted.
     * - `true`: The draggable is still mounted.
     * - `false`: The draggable has been unmounted.
     * 
     * Prevents accidental state updates after unmounted.
     * E.g., clearing the draggable's states after unmount when no contact with any droppable zone.
     */
    isMountedRef            : RefObject<boolean | undefined>
    
    // Reactive states:
    /**
     * Updates whether a drag gesture is currently targeting a droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     * - `false`     → drag gesture active over a droppable zone but rejected by one or both sides
     * - `true`      → drag gesture active over a droppable zone and mutually accepted
     */
    setDragStatus           : Dispatch<DraggableState<Element>['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState<Element>['dropMetadata']>
}): void => {
    // Ignore unmounted draggable:
    if (!isMountedRef.current) return;
    
    
    
    setDragStatus(inactiveDragStatus); // Reset status.
    setDropMetadata(undefined);        // Clear metadata.
};

/**
 * Deactivates the currently active droppable side.
 */
export const deactivateDroppable      = ({
    // Data:
    inactiveDropStatus,
    
    // Contexts:
    droppable,
}: {
    // Data:
    /**
     * Specifies the inactive droppable status:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside this zone, or either side has not responded
     */
    inactiveDropStatus      : null | undefined
    
    // Contexts:
    /**
     * The droppable side to deactivate.
     * 
     * Pass `null` if there is no active droppable (all droppables are inactive),
     * e.g. when the draggable is not hovering over any droppable.
     */
    droppable               : DroppableContext< Element> | null
}): void => {
    // Ignore unmounted droppable:
    if (!droppable?.isMountedRef.current) return;
    
    
    
    droppable.setDropStatus(inactiveDropStatus); // Reset status.
    droppable.setDragPayload(undefined);         // Clear payload.
    
    
    
    // Do not clear the active droppable reference:
    // - It still required by `processDragDropDeactivate()`.
    // activeDroppableRef.current = null;
};

/**
 * Deactivates the rest droppable sides (broadcast).
 * 
 * All droppable sides except the specified one will be reset.
 */
export const deactivateRestDroppables = ({
    // Data:
    inactiveDropStatus,
    
    // Contexts:
    droppable,
}: {
    // Data:
    /**
     * Specifies the inactive droppable status:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside this zone, or either side has not responded
     */
    inactiveDropStatus      : null | undefined
    
    // Contexts:
    /**
     * The previously active droppable side to exclude.
     * 
     * Pass `null` if there is no active droppable (all droppables are inactive),
     * e.g. when the draggable is not hovering over any droppable.
     */
    droppable               : DroppableContext< Element> | null
}): void => {
    for (const restDroppable of droppableRegistry.values()) {
        // Skip unmounted droppables:
        if (!restDroppable.isMountedRef.current) continue;
        
        // Skip the previously active droppable:
        if (restDroppable === droppable) continue;
        
        
        
        restDroppable.setDropStatus(inactiveDropStatus); // Reset status.
        
        // No need to clear their payload:
        // - They never come into contact with the draggable element.
        // restDroppable.setDragPayload(undefined);         // Clear payload.
    } // for
};
