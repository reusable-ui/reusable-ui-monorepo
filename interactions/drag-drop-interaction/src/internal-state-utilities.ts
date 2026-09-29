// Types:
import {
    type DraggableContext,
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
export const activateDraggable        = <TElement extends Element = HTMLElement>({
    // Contexts:
    draggable,
}: {
    // Contexts:
    /**
     * The draggable side to activate.
     */
    draggable               : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> }
}): void => {
    // Extract properties from the draggable context for convenience:
    const {
        // Actual states:
        dragSession : {
            droppable : {
                dropMetadata,
            },
            isAccepted,
        },
    } = draggable;
    
    
    
    // Ignore unmounted draggable:
    if (!draggable.isMountedRef.current) return;
    
    
    
    draggable.setDragStatus(isAccepted);                              // Set status.
    draggable.setDropMetadata(isAccepted ? dropMetadata : undefined); // Expose metadata, if both draggable and droppable sides accepted.
};

/**
 * Activates the droppable side.
 */
export const activateDroppable        = <TElement extends Element = HTMLElement>({
    // Contexts:
    draggable,
}: {
    // Contexts:
    /**
     * The draggable side contains droppable to activate.
     */
    draggable               : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> }
}): void => {
    // Extract properties from the draggable context for convenience:
    const {
        // Data:
        dragPayload,
        
        // Actual states:
        dragSession : {
            droppable,
            isAccepted,
        },
    } = draggable;
    
    
    
    // Ignore unmounted droppable:
    if (!droppable.isMountedRef.current) return;
    
    
    
    droppable.setDropStatus(isAccepted);                            // Set status.
    droppable.setDragPayload(isAccepted ? dragPayload : undefined); // Expose payload, if both draggable and droppable sides accepted.
};


/**
 * Deactivates the draggable side.
 */
export const deactivateDraggable      = <TElement extends Element = HTMLElement>({
    // Data:
    inactiveDragStatus,
    
    // Contexts:
    draggable,
}: {
    // Data:
    /**
     * Specifies the inactive draggable status:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     */
    inactiveDragStatus      : null | undefined
    
    // Contexts:
    /**
     * The draggable side to deactivate.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    // Ignore unmounted draggable:
    if (!draggable.isMountedRef.current) return;
    
    
    
    draggable.setDragStatus(inactiveDragStatus); // Reset status.
    draggable.setDropMetadata(undefined);        // Clear metadata.
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
