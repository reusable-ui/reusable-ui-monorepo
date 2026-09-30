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
export const isDragMounted = (draggable: DraggableContext | null | undefined): draggable is DraggableContext & { dragMountedRef: { current: true } } => {
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
export const isDropMounted = (droppable: DroppableContext | null | undefined): droppable is DroppableContext & { dropMountedRef: { current: true } } => {
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
export const isDragReady = (draggable: DraggableContext | null | undefined): draggable is DraggableContext & { dragMountedRef: { current: true }, dragEnabled: true } => {
    return isDragMounted(draggable) && draggable.dragEnabled;
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
export const isDropReady = (droppable: DroppableContext | null | undefined): droppable is DroppableContext & { dropMountedRef: { current: true }, dropEnabled: true } => {
    return isDropMounted(droppable) && droppable.dropEnabled;
};



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
    if (!draggable.dragMountedRef.current) return;
    
    
    
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
    if (!droppable.dropMountedRef.current) return;
    
    
    
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
    if (!draggable.dragMountedRef.current) return;
    
    
    
    draggable.setDragStatus(inactiveDragStatus); // Reset status.
    draggable.setDropMetadata(undefined);        // Clear metadata.
};

/**
 * Deactivates the currently active droppable side.
 * 
 * Do nothing if no corresponding droppable in the specified draggable.
 */
export const deactivateDroppable      = <TElement extends Element = HTMLElement>({
    // Data:
    inactiveDropStatus,
    
    // Contexts:
    draggable,
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
     * The draggable side that may contains droppable to deactivate.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    // Extract properties from the draggable context for convenience:
    const droppable = draggable.dragSession?.droppable;
    
    
    
    // Ignore unmounted droppable:
    if (!droppable?.dropMountedRef.current) return;
    
    
    
    droppable.setDropStatus(inactiveDropStatus); // Reset status.
    droppable.setDragPayload(undefined);         // Clear payload.
};

/**
 * Deactivates the rest droppable sides (broadcast).
 * 
 * All droppable sides except the specified one will be reset.
 */
export const deactivateRestDroppables = <TElement extends Element = HTMLElement>({
    // Data:
    inactiveDropStatus,
    
    // Contexts:
    draggable,
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
     * The draggable side that may contains droppable to exclude.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    // Extract properties from the draggable context for convenience:
    const droppable = draggable.dragSession?.droppable;
    
    
    
    for (const restDroppable of droppableRegistry.values()) {
        // Skip unmounted droppables:
        if (!restDroppable.dropMountedRef.current) continue;
        
        // Skip the previously active droppable:
        if (restDroppable === droppable) continue;
        
        
        
        restDroppable.setDropStatus(inactiveDropStatus); // Reset status.
        
        // No need to clear their payload:
        // - They never come into contact with the draggable element.
        // restDroppable.setDragPayload(undefined);         // Clear payload.
    } // for
};
