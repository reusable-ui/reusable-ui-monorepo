// Types:
import {
    type DraggableContext,
    type DroppableContext,
}                           from './internal-types.js'

// Utilities:
import {
    droppableRegistry,
}                           from './internal-registry.js'



// State checks:

/**
 * Determines whether the draggable side is currently available
 * for state updates and re-renders.
 * 
 * The draggable must:
 * - exist
 * - be mounted
 */
export const isDragMounted = <TElement extends Element = HTMLElement>(draggable: DraggableContext<TElement> | null | undefined): draggable is DraggableContext<TElement> & { dragMountedRef: { current: true } } => {
    return !!draggable?.dragMountedRef.current;
};

/**
 * Determines whether the droppable side is currently available
 * for state updates and re-renders.
 * 
 * The droppable must:
 * - exist
 * - be mounted
 */
export const isDropMounted = <TElement extends Element = HTMLElement>(droppable: DroppableContext<TElement> | null | undefined): droppable is DroppableContext<TElement> & { dropMountedRef: { current: true } } => {
    return !!droppable?.dropMountedRef.current;
};

/**
 * Determines whether the draggable side is currently available
 * for drag-drop interactions.
 * 
 * The draggable must:
 * - exist
 * - be mounted
 * - be enabled
 */
export const isDragReady   = <TElement extends Element = HTMLElement>(draggable: DraggableContext<TElement> | null | undefined): draggable is DraggableContext<TElement> & { dragMountedRef: { current: true }, dragEnabled: true } => {
    return isDragMounted<TElement>(draggable) && draggable.dragEnabled;
};

/**
 * Determines whether the droppable side is currently available
 * for drag-drop interactions.
 * 
 * The droppable must:
 * - exist
 * - be mounted
 * - be enabled
 */
export const isDropReady   = <TElement extends Element = HTMLElement>(droppable: DroppableContext<TElement> | null | undefined): droppable is DroppableContext<TElement> & { dropMountedRef: { current: true }, dropEnabled: true } => {
    return isDropMounted<TElement>(droppable) && droppable.dropEnabled;
};



// State updates:

/**
 * Activates the draggable side.
 * 
 * @param draggable The draggable side to activate.
 */
export const activateDraggable        = <TElement extends Element = HTMLElement>(
    draggable               : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> },
): void => {
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
    if (!isDragMounted(draggable)) return;
    
    
    
    draggable.setDragStatus(isAccepted);                              // Set status.
    draggable.setDropMetadata(isAccepted ? dropMetadata : undefined); // Expose metadata, if both draggable and droppable sides accepted.
};

/**
 * Activates the droppable side.
 * 
 * @param draggable The draggable side contains droppable to activate.
 */
export const activateDroppable        = <TElement extends Element = HTMLElement>(
    draggable               : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> },
): void => {
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
    if (!isDropMounted(droppable)) return;
    
    
    
    droppable.setDropStatus(isAccepted);                            // Set status.
    droppable.setDragPayload(isAccepted ? dragPayload : undefined); // Expose payload, if both draggable and droppable sides accepted.
};


/**
 * Deactivates the draggable side.
 * 
 * @param draggable The draggable side to deactivate.
 * @param inactiveDragStatus Specifies the inactive draggable status:
 * - `undefined` → no drag activity at all
 * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
 */
export const deactivateDraggable      = <TElement extends Element = HTMLElement>(
    draggable               : DraggableContext<TElement>,
    inactiveDragStatus      : null | undefined,
): void => {
    // Ignore unmounted draggable:
    if (!isDragMounted(draggable)) return;
    
    
    
    draggable.setDragStatus(inactiveDragStatus); // Reset status.
    draggable.setDropMetadata(undefined);        // Clear metadata.
};

/**
 * Deactivates the currently active droppable side.
 * 
 * Do nothing if no corresponding droppable in the specified draggable.
 * 
 * @param draggable The draggable side that may contains droppable to deactivate.
 * @param inactiveDropStatus Specifies the inactive droppable status:
 * - `undefined` → no drag activity at all
 * - `null`      → drag gesture active but outside this zone, or either side has not responded
 */
export const deactivateDroppable      = <TElement extends Element = HTMLElement>(
    draggable               : DraggableContext<TElement>,
    inactiveDropStatus      : null | undefined,
): void => {
    // Extract properties from the draggable context for convenience:
    const droppable = draggable.dragSession?.droppable;
    
    
    
    // Ignore unmounted droppable:
    if (!isDropMounted(droppable)) return;
    
    
    
    droppable.setDropStatus(inactiveDropStatus); // Reset status.
    droppable.setDragPayload(undefined);         // Clear payload.
};

/**
 * Deactivates the rest droppable sides (broadcast).
 * 
 * All droppable sides except the specified one will be reset.
 * 
 * @param draggable The draggable side that may contains droppable to exclude.
 * @param inactiveDropStatus Specifies the inactive droppable status:
 * - `undefined` → no drag activity at all
 * - `null`      → drag gesture active but outside this zone, or either side has not responded
 */
export const deactivateRestDroppables = <TElement extends Element = HTMLElement>(
    draggable               : DraggableContext<TElement>,
    inactiveDropStatus      : null | undefined,
): void => {
    // Extract properties from the draggable context for convenience:
    const droppable = draggable.dragSession?.droppable;
    
    
    
    for (const restDroppable of droppableRegistry.values()) {
        // Skip unmounted droppables:
        if (!isDropMounted(restDroppable)) continue;
        
        // Skip the previously active droppable:
        if (restDroppable === droppable) continue;
        
        
        
        restDroppable.setDropStatus(inactiveDropStatus); // Reset status.
        
        // No need to clear their payload:
        // - They never come into contact with the draggable element.
        // restDroppable.setDragPayload(undefined);         // Clear payload.
    } // for
};
