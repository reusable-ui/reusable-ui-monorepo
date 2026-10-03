// Reusable-ui utilities:
import {
    // Utilities:
    createSyntheticPointerEvent,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Types:
import {
    // Data:
    type DropMetadata,
    
    // Lifecycles:
    type DragDropActivationEvent,
    type DragStartEvent,
    type DragPresenceEvent,
    type DragDropDeactivationEvent,
    type DragEndEvent,
    type DragAbsenceEvent,
    
    // Handshakes:
    type DragHandshakeEvent,
    type DropHandshakeEvent,
    
    // Evaluations:
    type DragEvaluationEvent,
    type DropEvaluationEvent,
    
    // Commits:
    type DragDropCommitEvent,
    type DragCommitEvent,
    type DropCommitEvent,
}                           from './types.js'
import {
    type DraggableContext,
    type DroppableContext,
    
    // Probings:
    type DragProbeEvent,
}                           from './internal-types.js'

// Utilities:
import {
    droppableRegistry,
}                           from './internal-registry.js'
import {
    // State checks:
    isDragReady,
    isDropReady,
}                           from './internal-state-utilities.js'



// Event factories:

/**
 * Creates a synthetic activation event at the start of a drag gesture.
 * 
 * Wraps the native 'pointerdown' event into a React synthetic event,
 * establishing the draggable as `currentTarget` and the pointed element as `target`.
 * 
 * This represents the initial stage of the drag-drop lifecycle,
 * fired when the user presses down on the draggable element to initiate a drag gesture.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param lastPointerDownEvent The most recent native 'pointerdown' event from the browser captured during a drag gesture.
 * @param pointedElement The reference to the DOM element that currently under the pointer, set as `target`.
 * Pass `null` if no valid element is detected
 * (e.g. pointer is only over the draggable itself or filtered out by `dropPredicate`).
 * 
 * @returns A synthetic `DragDropActivationEvent` representing the activation stage.
 */
export const createDragDropActivationEvent   = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    lastPointerDownEvent      : PointerEvent,
    pointedElement            : Element | null,
): DragDropActivationEvent<TElement> => {
    // Extract properties from the draggable context for convenience:
    const {
        // Data:
        dragPayload,
        
        // Actual states:
        dragElementRef,
    } = draggable;
    
    return {
        ...createSyntheticPointerEvent<TElement, PointerEvent>({
            // Event metadata:
            
            nativeEvent       : lastPointerDownEvent,
            
            // type           : 'pointerdown',                       // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget     : dragElementRef.current ?? undefined, // The draggable element initiating the activation.
            target            : pointedElement         ?? undefined, // The element under the pointer at press.
            // relatedTarget  : dropElement,                         // Not yet defined at start stage.
        }),
        
        // Data:
        dragPayload, // The payload carried by the draggable source.
    };
};

/**
 * Creates a synthetic deactivation event at the end of a drag gesture.
 * 
 * Wraps the native 'pointerup' event into a React synthetic event,
 * establishing the draggable as `currentTarget`, the pointed element as `target`,
 * and the droppable element in contact (if any) as `relatedTarget`.
 * 
 * This represents the final stage of the drag-drop lifecycle,
 * fired when the user releases the pointer on the draggable element to conclude the drag gesture.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param lastPointerUpEvent The most recent native 'pointerup' event from the browser captured during a drag gesture.
 * @returns A synthetic `DragDropDeactivationEvent` representing the deactivation stage.
 */
export const createDragDropDeactivationEvent = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    lastPointerUpEvent        : PointerEvent,
): DragDropDeactivationEvent<TElement> => {
    // Extract properties from the draggable context for convenience:
    const {
        // Actual states:
        dragElementRef,
        dragSession,
    } = draggable;
    
    // Extract properties from the drag session for convenience:
    // - Defaults all properties to null if no active droppable side.
    const {
        // Interaction states:
        pointedElement,
        dropElement,
    } = dragSession ?? {
        pointedElement : null,
        dropElement    : null,
    };
    
    return {
        ...createSyntheticPointerEvent<TElement, PointerEvent>({
            // Event metadata:
            
            nativeEvent       : lastPointerUpEvent,
            
            // type           : 'pointerup',                         // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget     : dragElementRef.current ?? undefined, // The draggable element initiating the deactivation.
            target            : pointedElement         ?? undefined, // The element under the pointer at release.
            relatedTarget     : dropElement,                         // The droppable element in contact, if any.
        }),
        
        // Data:
        dragPayload: draggable.dragPayload, // The payload carried by the draggable source.
    };
};



/**
 * Creates a synthetic activation event on the draggable side.
 * 
 * Extends the activation event by carrying the draggable's payload,
 * exposing the actual data being dragged (payload) for the business logic
 * such as initializing state, preparing initial data, or applying side effects.
 * 
 * @param dragDropActivationEvent The synthetic activation event created earlier.
 * @returns A synthetic `DragStartEvent` representing the draggable activation.
 */
const createDragStartEvent                   = <TElement extends Element = HTMLElement>(
    dragDropActivationEvent   : DragDropActivationEvent<TElement>,
): DragStartEvent<TElement> => ({
    // Event metadata:
    ...dragDropActivationEvent,
    type             : 'dragstart',
});

/**
 * Creates a synthetic presence event on each droppable side.
 * 
 * Extends the activation event by carrying the droppable's metadata,
 * exposing the target's business context (metadata) for the business logic
 * such as initializing state, preparing initial data, or applying side effects.
 * 
 * The draggable element is swapped from `currentTarget` to `relatedTarget`,
 * and the droppable element becomes `currentTarget`,
 * reflecting the droppable's perspective: self as current, partner as related.
 * 
 * @param dragDropActivationEvent The synthetic activation event created earlier.
 * @param dropMetadata The metadata exposed by the droppable target.
 * @returns A synthetic `DragPresenceEvent` representing the drag activity presence.
 */
const createDragPresenceEvent                = <TElement extends Element = HTMLElement>(
    dragDropActivationEvent   : DragDropActivationEvent<TElement>,
    dropMetadata              : DropMetadata,
): DragPresenceEvent<TElement> => ({
    // Event metadata:
    ...dragDropActivationEvent,
    type             : 'dragpresence',
    
    // On the droppable side, `currentTarget` points to the droppable itself.
    // The draggable that was `currentTarget` in the activation stage is now `relatedTarget`,
    // and vice versa for the droppable.
    // This swap reflects perspective: each side treats itself as current, partner as related.
    currentTarget    : dragDropActivationEvent.relatedTarget as TElement,
    relatedTarget    : dragDropActivationEvent.currentTarget,
    
    // Data:
    dropMetadata, // The metadata exposed by the droppable target.
});

/**
 * Creates a synthetic deactivation event on the draggable side.
 * 
 * Extends the deactivation event by carrying the draggable's payload,
 * exposing the actual data being dragged (payload) for the business logic
 * such as resetting state, clearing temporary data, or removing side effects.
 * 
 * @param droppable The droppable side associated with the drag absence event.
 * Pass `null` if no handshake was performed (all droppables are inactive),
 * e.g. when the draggable is not hovering over any droppable.
 * 
 * @param dragDropDeactivationEvent The synthetic deactivation event created earlier.
 * @returns A synthetic `DragEndEvent` representing the draggable deactivation.
 */
const createDragEndEvent                     = <TElement extends Element = HTMLElement>(
    droppable                 : DroppableContext< Element> | null,
    dragDropDeactivationEvent : DragDropDeactivationEvent<TElement>,
): DragEndEvent<TElement> => ({
    // Event metadata:
    ...dragDropDeactivationEvent,
    type             : 'dragend',
    
    // Data:
    dropMetadata: droppable?.dropMetadata, // The metadata exposed by the droppable target, if any.
});

/**
 * Creates a synthetic absence event on each droppable side.
 * 
 * Extends the deactivation event by carrying the droppable's metadata,
 * exposing the target's business context (metadata) for the business logic
 * such as resetting state, clearing temporary data, or removing side effects.
 * 
 * The draggable element is swapped from `currentTarget` to `relatedTarget`,
 * and the droppable element becomes `currentTarget`,
 * reflecting the droppable's perspective: self as current, partner as related.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param droppable Each droppable side associated with the drag absence broadcast event.
 * @param dragDropDeactivationEvent The synthetic deactivation event created earlier.
 * @returns A synthetic `DragAbsenceEvent` representing the drag activity absence.
 */
const createDragAbsenceEvent                 = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    droppable                 : DroppableContext< Element>,
    dragDropDeactivationEvent : DragDropDeactivationEvent< Element>,
): DragAbsenceEvent< Element> => {
    // Extract properties from the droppable context for convenience:
    const {
        // Data:
        dropMetadata,
    } = droppable;
    const isTargeted = (droppable === draggable.dragSession?.droppable);
    
    
    
    return {
        // Event metadata:
        ...dragDropDeactivationEvent,
        type             : 'dragabsence',
        
        // On the droppable side, `currentTarget` points to the droppable itself.
        // The draggable that was `currentTarget` in the deactivation stage is now `relatedTarget`,
        // and vice versa for the droppable.
        // This swap reflects perspective: each side treats itself as current, partner as related.
        currentTarget    : dragDropDeactivationEvent.relatedTarget as Element,
        relatedTarget    : dragDropDeactivationEvent.currentTarget,
        
        // Data:
        dropMetadata, // The metadata exposed by the droppable target.
        isTargeted,   // Whether the pointer was positioned over *this* droppable.
    };
};



/**
 * Creates a synthetic probe event at the hit-test stage on the draggable side.
 * 
 * Wraps the native 'pointermove' event into a React synthetic event,
 * establishing the draggable as `currentTarget` and the pointed element as `target`.
 * At this stage, no droppable is yet in contact, so `relatedTarget` remains undefined.
 * 
 * Useful for initiating drag-drop negotiation by encapsulating the raw pointer event.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param pointerMoveEvent The originating native 'pointermove' event from the browser.
 * @param pointedElement The reference to the DOM element that currently under the pointer, set as `target`.
 * Pass `null` if no valid element is detected
 * (e.g. pointer is only over the draggable itself or filtered out by `dropPredicate`).
 * 
 * @returns A synthetic `DragProbeEvent` representing the probe stage.
 */
export const createDragProbeEvent            = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    pointerMoveEvent          : PointerEvent,
    pointedElement            : Element | null,
): DragProbeEvent<TElement> => {
    // Extract properties from the draggable context for convenience:
    const {
        // Data:
        dragPayload,
        
        // Actual states:
        dragElementRef,
    } = draggable;
    
    
    
    return {
        // Event metadata:
        ...createSyntheticPointerEvent<TElement, PointerEvent>({
            // Event metadata:
            
            nativeEvent       : pointerMoveEvent,
            
            // type           : 'pointermove',                       // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget     : dragElementRef.current ?? undefined, // The draggable element initiating the probe.
            target            : pointedElement         ?? undefined, // The element currently under the pointer.
            // relatedTarget  : dropElement,                         // Not yet defined at probe stage.
        }),
        
        // Data:
        dragPayload, // The payload associated with the current drag gesture.
    };
};



/**
 * Creates a synthetic handshake event on the draggable side.
 * 
 * Extends the probe event with the droppable element (`relatedTarget`)
 * and carrying the droppable's metadata,
 * enabling the draggable to inspect the target's business context before deciding acceptance.
 * 
 * Carries a mutable `dragResponse` field, defaulting to `undefined`
 * until the draggable responds its decision.
 * 
 * @param candidateDroppable The droppable side currently under negotiation.
 * @param dragProbeEvent The synthetic probe event created earlier.
 * @param candidateDropElement The candidate droppable element, set as `relatedTarget`.
 * @returns A synthetic `DragHandshakeEvent` for negotiation.
 */
const createDragHandshakeEvent               = <TElement extends Element = HTMLElement>(
    candidateDroppable        : DroppableContext< Element>,
    dragProbeEvent            : DragProbeEvent<TElement>,
    candidateDropElement      : Element,
): DragHandshakeEvent<TElement> => ({
    // Event metadata:
    ...dragProbeEvent,
    type             : 'draghandshake',
    relatedTarget    : candidateDropElement,            // The droppable element now in contact.
    
    // Data:
    dropMetadata     : candidateDroppable.dropMetadata, // The metadata exposed by the droppable side.
    dragResponse     : undefined,                       // Default: no decision yet from draggable.
});

/**
 * Creates a synthetic handshake event on the droppable side.
 * 
 * Extends the probe event with the droppable element (`currentTarget`)
 * and carrying the draggable's payload,
 * enabling the droppable to inspect the actual data being dragged before deciding acceptance.
 * 
 * The draggable element swapped from `currentTarget` to `relatedTarget`,
 * reflecting the droppable's perspective: self as current, partner as related.
 * 
 * Carries a mutable `dropResponse` field, defaulting to `undefined`
 * until the droppable responds its decision.
 * 
 * @param candidateDroppable The droppable side currently under negotiation.
 * @param dragProbeEvent The synthetic probe event created earlier.
 * @param candidateDropElement The candidate droppable element itself, set as `currentTarget`.
 * @returns A synthetic `DropHandshakeEvent` for negotiation.
 */
const createDropHandshakeEvent               = <TElement extends Element = HTMLElement>(
    candidateDroppable        : DroppableContext< Element>,
    dragProbeEvent            : DragProbeEvent<TElement>,
    candidateDropElement      : TElement,
): DropHandshakeEvent<TElement> => ({
    // Event metadata:
    ...dragProbeEvent,
    type             : 'drophandshake',
    
    // On the droppable side, `currentTarget` points to the droppable itself.
    // The draggable that was `currentTarget` in the probe stage is now `relatedTarget`.
    // This swap reflects perspective: each side treats itself as current, partner as related.
    currentTarget    : candidateDropElement,
    relatedTarget    : dragProbeEvent.currentTarget,
    
    // Data:
    // dragPayload,               // The payload carried by the draggable side (already carried in `dragProbeEvent`).
    dropMetadata     : candidateDroppable.dropMetadata, // The metadata exposed by the droppable side.
    dropResponse     : undefined,                       // Default: no decision yet from droppable.
});



/**
 * Creates a synthetic evaluation event on the draggable side.
 * 
 * Extends the handshake event by carrying the droppable's response,
 * enabling live feedback from the draggable side during a drag gesture.
 * 
 * @param dragHandshakeEvent The synthetic handshake event from the draggable side.
 * Pass `DragProbeEvent` if no handshake was performed,
 * e.g. when the draggable is not hovering over any droppable.
 * 
 * @param dropResponse The droppable's acceptance/rejection result.
 * @returns A synthetic `DragEvaluationEvent` for live feedback.
 */
const createDragEvaluationEvent              = <TElement extends Element = HTMLElement>(
    dragHandshakeEvent        : DragHandshakeEvent<TElement> | DragProbeEvent<TElement>,
    dropResponse              : boolean | undefined,
): DragEvaluationEvent<TElement> => ({
    // Defaults for non-handshake events:
    dragResponse     : undefined,
    dropMetadata     : undefined,
    
    // Event metadata:
    ...dragHandshakeEvent,
    type             : 'dragevaluation',
    
    // Data:
    dropResponse, // Droppable's acceptance/rejection result.
});

/**
 * Creates a synthetic evaluation event on the droppable side.
 * 
 * Extends the handshake event by carrying the draggable's response,
 * enabling live feedback from the droppable side during a drag gesture.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param droppable Each droppable side associated with the drag evaluation broadcast event.
 * @param dropHandshakeEvent The synthetic handshake event from the droppable side.
 * Pass `DragProbeEvent` if no handshake was performed,
 * e.g. when the draggable is not hovering over any droppable.
 * 
 * @param dragResponse The draggable's acceptance/rejection result.
 * @returns A synthetic `DropEvaluationEvent` for live feedback.
 */
const createDropEvaluationEvent              = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    droppable                 : DroppableContext< Element>,
    dropHandshakeEvent        : DropHandshakeEvent< Element> | DragProbeEvent< Element>,
    dragResponse              : boolean | undefined,
): DropEvaluationEvent< Element> => {
    // Extract properties from the droppable context for convenience:
    const {
        // Data:
        dropMetadata,
    } = droppable;
    const isTargeted = (droppable === draggable.dragSession?.droppable);
    
    
    
    return {
        // Defaults for non-handshake events:
        dropResponse     : undefined,
        
        // Event metadata:
        ...dropHandshakeEvent,
        type             : 'dropevaluation',
        
        // Data:
        dropMetadata, // The metadata exposed by the droppable side.
        dragResponse, // Draggable's acceptance/rejection result.
        isTargeted,   // Whether the pointer is positioned over *this* droppable.
    };
};



/**
 * Creates a synthetic committed event on the draggable side.
 * 
 * Wraps the native 'pointerup' event into a React synthetic event,
 * establishing the draggable as `currentTarget`, the pointed element as `target`,
 * and the droppable element in contact as `relatedTarget`.
 * 
 * This represents the final committed stage of the drag-drop lifecycle,
 * fired when the user releases the pointer to complete the transaction.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param lastPointerUpEvent The most recent native 'pointerup' event from the browser captured during a drag gesture.
 * @returns A synthetic `DragDropCommitEvent` representing the committed stage.
 */
export const createDragDropCommitEvent       = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> },
    lastPointerUpEvent        : PointerEvent,
): DragDropCommitEvent<TElement> => {
    // Extract properties from the draggable context for convenience:
    const {
        // Data:
        dragPayload,
        
        // Actual states:
        dragElementRef,
        dragSession : {
            droppable : {
                dropMetadata,
            },
            pointedElement,
            dropElement,
        },
    } = draggable;
    
    
    
    return {
        ...createSyntheticPointerEvent<TElement, PointerEvent>({
            // Event metadata:
            
            nativeEvent       : lastPointerUpEvent,
            
            // type           : 'pointerup',                         // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget     : dragElementRef.current ?? undefined, // The draggable element initiating the commit.
            target            : pointedElement         ?? undefined, // The element under the pointer at release.
            relatedTarget     : dropElement,                         // The droppable element in contact.
        }),
        // Reassign the `relatedTarget` to satisfy the TS:
        relatedTarget         : dropElement,                         // The droppable element in contact.
        
        // Data:
        dragPayload,  // The payload delivered by the draggable source.
        dropMetadata, // The metadata exposed by the accepted droppable target.
    };
};



/**
 * Creates a synthetic committed event on the draggable side.
 * 
 * Extends the committed event by carrying the droppable's metadata,
 * exposing the target's business context (metadata) for the business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * @param dragDropCommitEvent The synthetic committed event from the draggable side.
 * @returns A synthetic `DragCommitEvent` representing the committed transaction.
 */
const createDragCommitEvent                  = <TElement extends Element = HTMLElement>(
    dragDropCommitEvent       : DragDropCommitEvent<TElement>
): DragCommitEvent<TElement> => ({
    // Event metadata:
    ...dragDropCommitEvent,
    type             : 'dragcommit',
});

/**
 * Creates a synthetic committed event on the droppable side.
 * 
 * Extends the committed event by carrying the draggable's payload,
 * delivering the actual data being dragged (payload) for the business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * The draggable element swapped from `currentTarget` to `relatedTarget`
 * and vice versa for the droppable element,
 * reflecting the droppable's perspective: self as current, partner as related.
 * 
 * @param dragDropCommitEvent The synthetic committed event from the droppable side.
 * @returns A synthetic `DropCommitEvent` representing the committed transaction.
 */
const createDropCommitEvent                  = <TElement extends Element = HTMLElement>(
    dragDropCommitEvent       : DragDropCommitEvent<TElement>
): DropCommitEvent<TElement> => ({
    // Event metadata:
    ...dragDropCommitEvent,
    type             : 'dropcommit',
    
    // On the droppable side, `currentTarget` points to the droppable itself.
    // The draggable that was `currentTarget` in the committed stage is now `relatedTarget`,
    // and vice versa for the droppable.
    // This swap reflects perspective: each side treats itself as current, partner as related.
    currentTarget    : dragDropCommitEvent.relatedTarget as TElement,
    relatedTarget    : dragDropCommitEvent.currentTarget,
});



// Event dispatchers:

/**
 * Dispatches the activation events for both draggable and droppable sides.
 * 
 * - Creates and invokes the draggable activation event.
 * - Creates and broadcasts droppable presence events to all registered droppables.
 * - Does not return events, since the handshake phase is based on `dragProbeEvent`.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param dragDropActivationEvent The synthetic activation event created earlier.
 */
export const dispatchActivationEvents        = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    dragDropActivationEvent   : DragDropActivationEvent<TElement>,
): void => {
    if (isDragReady(draggable)) {
        // Dispatch activation for the draggable:
        const dragStartEvent = createDragStartEvent(dragDropActivationEvent);
        draggable.handleDragStart(dragStartEvent);
    } // if
    
    
    
    // Dispatch presence broadcast for all droppables:
    for (const eachDroppable of droppableRegistry.values()) {
        // Skip disabled droppables:
        // - Also skip unmounted ones.
        if (!isDropReady(eachDroppable)) continue;
        
        
        
        const eachDragPresenceEvent = createDragPresenceEvent(dragDropActivationEvent, eachDroppable.dropMetadata);
        eachDroppable.handleDragPresence(eachDragPresenceEvent);
    } // for
};

/**
 * Dispatches the deactivation events for both draggable and droppable sides.
 * 
 * - Creates and invokes the draggable deactivation event.
 * - Creates and invokes the droppable absence event for the active droppable (if any).
 * - Creates and broadcasts droppable absence events to all other registered droppables.
 * - Does not return events, since no more further phase.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param dragDropDeactivationEvent The synthetic deactivation event created earlier.
 */
export const dispatchDeactivationEvents      = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    dragDropDeactivationEvent : DragDropDeactivationEvent<TElement>,
): void => {
    if (isDragReady(draggable)) {
        // Dispatch deactivation for the draggable:
        const dragEndEvent = createDragEndEvent(draggable.dragSession?.droppable ?? null, dragDropDeactivationEvent);
        draggable.handleDragEnd(dragEndEvent);
    } // if
    
    
    
    // Dispatch absence broadcast for all droppables:
    for (const eachDroppable of droppableRegistry.values()) {
        // Skip disabled droppables:
        // - Also skip unmounted ones.
        if (!isDropReady(eachDroppable)) continue;
        
        
        
        const eachDragAbsenceEvent = createDragAbsenceEvent(draggable, eachDroppable, dragDropDeactivationEvent);
        eachDroppable.handleDragAbsence(eachDragAbsenceEvent);
    } // for
};

/**
 * Dispatches the handshake events for both draggable and droppable sides.
 * 
 * - Creates handshake events from the probe stage.
 * - Invokes both draggable and droppable handshake handlers in parallel.
 * - Returns both events for use in the evaluation phase.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param candidateDroppable The droppable side currently under negotiation.
 * @param dragProbeEvent The synthetic probe event created earlier.
 * @param candidateDropElement The candidate droppable element, set as `relatedTarget`.
 */
export const dispatchHandshakeEvents         = async <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    candidateDroppable        : DroppableContext< Element>,
    dragProbeEvent            : DragProbeEvent<TElement>,
    candidateDropElement      : Element,
): Promise<{
    // Events:
    /**
     * The synthetic handshake event from the draggable side.
     */
    dragHandshakeEvent        : DragHandshakeEvent<TElement>
    /**
     * The synthetic handshake event from the droppable side.
     */
    dropHandshakeEvent        : DropHandshakeEvent< Element>
}> => {
    // Dispatch handshake for both sides:
    const dragHandshakeEvent   = createDragHandshakeEvent(candidateDroppable, dragProbeEvent, candidateDropElement);
    const dropHandshakeEvent   = createDropHandshakeEvent(candidateDroppable, dragProbeEvent, candidateDropElement);
    await Promise.all([
        isDragReady(draggable)          && draggable.handleDragHandshake(dragHandshakeEvent),
        isDropReady(candidateDroppable) && candidateDroppable.handleDropHandshake(dropHandshakeEvent),
    ]);
    
    
    
    // Return both events for further use:
    return {
        dragHandshakeEvent,
        dropHandshakeEvent,
    };
};

/**
 * Dispatches the evaluation events for both draggable and droppable sides.
 * 
 * - Creates and invokes the draggable evaluation event.
 * - Creates and invokes the droppable evaluation event for the active droppable (if any).
 * - Creates and broadcasts the droppable evaluation events to all other registered droppables.
 * - Does not return events, since commit and deactivation phases are based on `lastPointerUpEvent`.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param dragHandshakeEvent The synthetic handshake event from the draggable side.
 * Pass `DragProbeEvent` if no handshake was performed,
 * e.g. when the draggable is not hovering over any droppable.
 * 
 * @param dropHandshakeEvent The synthetic handshake event from the droppable side.
 * Pass `DragProbeEvent` if no handshake was performed,
 * e.g. when the draggable is not hovering over any droppable.
 */
export const dispatchEvaluationEvents        = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement>,
    dragHandshakeEvent        : DragHandshakeEvent<TElement> | DragProbeEvent<TElement>,
    dropHandshakeEvent        : DropHandshakeEvent< Element> | DragProbeEvent< Element>,
): void => {
    if (isDragReady(draggable)) {
        const dragEvaluationEvent = createDragEvaluationEvent(
            dragHandshakeEvent,
            ('dropResponse' in dropHandshakeEvent) ? dropHandshakeEvent.dropResponse : undefined // No dropResponse for non-handshake events.
        );
        draggable.handleDragEvaluation(dragEvaluationEvent);
    } // if
    
    
    
    // Dispatch evaluation broadcast for all droppables:
    for (const eachDroppable of droppableRegistry.values()) {
        // Skip disabled droppables:
        // - Also skip unmounted ones.
        if (!isDropReady(eachDroppable)) continue;
        
        
        
        const eachDropEvaluationEvent = createDropEvaluationEvent(
            draggable,
            eachDroppable,
            
            dropHandshakeEvent,
            ('dragResponse' in dragHandshakeEvent) ? dragHandshakeEvent.dragResponse : undefined // No dragResponse for non-handshake events.
        );
        eachDroppable.handleDropEvaluation(eachDropEvaluationEvent);
    } // for
};

/**
 * Dispatches the final committed events once both sides have agreed.
 * 
 * - Creates the dragged and dropped commit events from the committed stage.
 * - Invokes both draggable and droppable commit handlers.
 * - Does not return events, since commit and deactivation phases are based on `lastPointerUpEvent`.
 * 
 * @param draggable The draggable side associated with the drag gesture.
 * @param dragDropCommitEvent The synthetic committed event created earlier.
 */
export const dispatchCommitEvents            = <TElement extends Element = HTMLElement>(
    draggable                 : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> },
    dragDropCommitEvent       : DragDropCommitEvent<TElement>,
): void => {
    // Extract properties from the draggable context for convenience:
    const {
        // Actual states:
        dragSession : {
            droppable,
        },
    } = draggable;
    
    
    
    if (isDragReady(draggable)) {
        const dragCommitEvent = createDragCommitEvent(dragDropCommitEvent);
        draggable.handleDragCommit(dragCommitEvent);
    } // if
    
    
    
    // Get the currently active droppable to deactivate, if any:
    if (isDropReady(droppable)) {
        const dropCommitEvent = createDropCommitEvent(dragDropCommitEvent);
        droppable.handleDropCommit(dropCommitEvent);
    } // if
};
