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
    type DragDropActivatedEvent,
    type DragActivatedEvent,
    type DragPresenceEvent,
    type DragDropDeactivatedEvent,
    type DragDeactivatedEvent,
    type DragAbsenceEvent,
    
    // Handshakes:
    type DragHandshakeEvent,
    type DropHandshakeEvent,
    
    // Evaluations:
    type DragEvaluationEvent,
    type DropEvaluationEvent,
    
    // Commits:
    type DragDropCommittedEvent,
    type DraggedEvent,
    type DroppedEvent,
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
 * @returns A synthetic `DragDropActivatedEvent` representing the activation stage.
 */
export const createDragDropActivatedEvent   = <TElement extends Element = HTMLElement>({
    // Event metadata:
    lastPointerDownEvent,
    pointedElement,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The most recent native 'pointerdown' event from the browser captured during a drag gesture.
     */
    lastPointerDownEvent     : PointerEvent
    /**
     * The reference to the DOM element that currently under the pointer, set as `target`.
     * 
     * Pass `null` if no valid element is detected
     * (e.g. pointer is only over the draggable itself or filtered out by `dropPredicate`).
     */
    pointedElement           : Element | null
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
}): DragDropActivatedEvent<TElement> => {
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
            
            nativeEvent      : lastPointerDownEvent,
            
            // type          : 'pointerdown',                       // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget    : dragElementRef.current ?? undefined, // The draggable element initiating the activation.
            target           : pointedElement         ?? undefined, // The element under the pointer at press.
            // relatedTarget : dropElement,                         // Not yet defined at start stage.
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
 * @returns A synthetic `DragDropDeactivatedEvent` representing the deactivation stage.
 */
export const createDragDropDeactivatedEvent = <TElement extends Element = HTMLElement>({
    // Event metadata:
    lastPointerUpEvent,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The most recent native 'pointerup' event from the browser captured during a drag gesture.
     */
    lastPointerUpEvent       : PointerEvent
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
}): DragDropDeactivatedEvent<TElement> => {
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
            
            nativeEvent      : lastPointerUpEvent,
            
            // type          : 'pointerup',                         // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget    : dragElementRef.current ?? undefined, // The draggable element initiating the deactivation.
            target           : pointedElement         ?? undefined, // The element under the pointer at release.
            relatedTarget    : dropElement,                         // The droppable element in contact, if any.
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
 * @returns A synthetic `DragActivatedEvent` representing the draggable activation.
 */
const createDragActivatedEvent              = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropActivatedEvent,
}: {
    // Event metadata:
    /**
     * The synthetic activation event created earlier.
     */
    dragDropActivatedEvent   : DragDropActivatedEvent<TElement>
}): DragActivatedEvent<TElement> => ({
    // Event metadata:
    ...dragDropActivatedEvent,
    type             : 'dragactivated',
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
 * @returns A synthetic `DragPresenceEvent` representing the drag activity presence.
 */
const createDragPresenceEvent               = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropActivatedEvent,
    
    // Data:
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The synthetic activation event created earlier.
     */
    dragDropActivatedEvent   : DragDropActivatedEvent<TElement>
    
    // Data:
    /**
     * The metadata exposed by the droppable target.
     */
    dropMetadata             : DropMetadata
}): DragPresenceEvent<TElement> => ({
    // Event metadata:
    ...dragDropActivatedEvent,
    type             : 'dragpresence',
    
    // On the droppable side, `currentTarget` points to the droppable itself.
    // The draggable that was `currentTarget` in the activation stage is now `relatedTarget`,
    // and vice versa for the droppable.
    // This swap reflects perspective: each side treats itself as current, partner as related.
    currentTarget    : dragDropActivatedEvent.relatedTarget as TElement,
    relatedTarget    : dragDropActivatedEvent.currentTarget,
    
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
 * @returns A synthetic `DragDeactivatedEvent` representing the draggable deactivation.
 */
const createDragDeactivatedEvent            = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropDeactivatedEvent,
    
    // Contexts:
    droppable,
}: {
    // Event metadata:
    /**
     * The synthetic deactivation event created earlier.
     */
    dragDropDeactivatedEvent : DragDropDeactivatedEvent<TElement>
    
    // Contexts:
    /**
     * The droppable side associated with the drag absence event.
     * 
     * Pass `null` if no handshake was performed (all droppables are inactive),
     * e.g. when the draggable is not hovering over any droppable.
     */
    droppable                : DroppableContext< Element> | null
}): DragDeactivatedEvent<TElement> => ({
    // Event metadata:
    ...dragDropDeactivatedEvent,
    type             : 'dragdeactivated',
    
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
 * @returns A synthetic `DragAbsenceEvent` representing the drag activity absence.
 */
const createDragAbsenceEvent                = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropDeactivatedEvent,
    
    // Contexts:
    draggable,
    droppable,
}: {
    // Event metadata:
    /**
     * The synthetic deactivation event created earlier.
     */
    dragDropDeactivatedEvent : DragDropDeactivatedEvent< Element>
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
    /**
     * Each droppable side associated with the drag absence broadcast event.
     */
    droppable                : DroppableContext< Element>
}): DragAbsenceEvent< Element> => {
    // Extract properties from the droppable context for convenience:
    const {
        // Data:
        dropMetadata,
    } = droppable;
    const isTargeted = (droppable === draggable.dragSession?.droppable);
    
    
    
    return {
        // Event metadata:
        ...dragDropDeactivatedEvent,
        type             : 'dragabsence',
        
        // On the droppable side, `currentTarget` points to the droppable itself.
        // The draggable that was `currentTarget` in the deactivation stage is now `relatedTarget`,
        // and vice versa for the droppable.
        // This swap reflects perspective: each side treats itself as current, partner as related.
        currentTarget    : dragDropDeactivatedEvent.relatedTarget as Element,
        relatedTarget    : dragDropDeactivatedEvent.currentTarget,
        
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
 * @returns A synthetic `DragProbeEvent` representing the probe stage.
 */
export const createDragProbeEvent           = <TElement extends Element = HTMLElement>({
    // Event metadata:
    pointerMoveEvent,
    pointedElement,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The originating native 'pointermove' event from the browser.
     */
    pointerMoveEvent         : PointerEvent
    /**
     * The reference to the DOM element that currently under the pointer, set as `target`.
     * 
     * Pass `null` if no valid element is detected
     * (e.g. pointer is only over the draggable itself or filtered out by `dropPredicate`).
     */
    pointedElement           : Element | null
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
}): DragProbeEvent<TElement> => {
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
            
            nativeEvent      : pointerMoveEvent,
            
            // type          : 'pointermove',                       // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget    : dragElementRef.current ?? undefined, // The draggable element initiating the probe.
            target           : pointedElement         ?? undefined, // The element currently under the pointer.
            // relatedTarget : dropElement,                         // Not yet defined at probe stage.
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
 * @returns A synthetic `DragHandshakeEvent` for negotiation.
 */
const createDragHandshakeEvent              = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragProbeEvent,
    candidateDropElement,
    
    // Data:
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent           : DragProbeEvent<TElement>
    /**
     * The candidate droppable element, set as `relatedTarget`.
     */
    candidateDropElement     : Element
    
    // Data:
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata             : DropMetadata
}): DragHandshakeEvent<TElement> => ({
    // Event metadata:
    ...dragProbeEvent,
    type             : 'draghandshake',
    relatedTarget    : candidateDropElement, // The droppable element now in contact.
    
    // Data:
    dropMetadata,                            // The metadata exposed by the droppable side.
    dragResponse     : undefined,            // Default: no decision yet from draggable.
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
 * @returns A synthetic `DropHandshakeEvent` for negotiation.
 */
const createDropHandshakeEvent              = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragProbeEvent,
    candidateDropElement,
    
    // Data:
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent           : DragProbeEvent<TElement>
    /**
     * The candidate droppable element itself, set as `currentTarget`.
     */
    candidateDropElement     : TElement
    
    // Data:
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata             : DropMetadata
}): DropHandshakeEvent<TElement> => ({
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
    dropMetadata,                 // The metadata exposed by the droppable side.
    dropResponse     : undefined, // Default: no decision yet from droppable.
});



/**
 * Creates a synthetic evaluation event on the draggable side.
 * 
 * Extends the handshake event by carrying the droppable's response,
 * enabling live feedback from the draggable side during a drag gesture.
 * 
 * @returns A synthetic `DragEvaluationEvent` for live feedback.
 */
const createDragEvaluationEvent             = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragHandshakeEvent,
    
    // Data:
    dropResponse,
}: {
    // Event metadata:
    /**
     * The synthetic handshake event from the draggable side.
     * 
     * Pass `DragProbeEvent` if no handshake was performed,
     * e.g. when the draggable is not hovering over any droppable.
     */
    dragHandshakeEvent       : DragHandshakeEvent<TElement> | DragProbeEvent<TElement>
    
    // Data:
    /**
     * The droppable's acceptance/rejection result.
     */
    dropResponse             : boolean | undefined
}): DragEvaluationEvent<TElement> => ({
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
 * @returns A synthetic `DropEvaluationEvent` for live feedback.
 */
const createDropEvaluationEvent             = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dropHandshakeEvent,
    
    // Data:
    dragResponse,
    
    // Contexts:
    draggable,
    droppable,
}: {
    // Event metadata:
    /**
     * The synthetic handshake event from the droppable side.
     * 
     * Pass `DragProbeEvent` if no handshake was performed,
     * e.g. when the draggable is not hovering over any droppable.
     */
    dropHandshakeEvent       : DropHandshakeEvent< Element> | DragProbeEvent< Element>
    
    // Data:
    /**
     * The draggable's acceptance/rejection result.
     */
    dragResponse             : boolean | undefined
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
    /**
     * Each droppable side associated with the drag evaluation broadcast event.
     */
    droppable                : DroppableContext< Element>
}): DropEvaluationEvent< Element> => {
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
 * @returns A synthetic `DragDropCommittedEvent` representing the committed stage.
 */
export const createDragDropCommittedEvent   = <TElement extends Element = HTMLElement>({
    // Event metadata:
    lastPointerUpEvent,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The most recent native 'pointerup' event from the browser captured during a drag gesture.
     */
    lastPointerUpEvent       : PointerEvent
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> }
}): DragDropCommittedEvent<TElement> => {
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
            
            nativeEvent      : lastPointerUpEvent,
            
            // type          : 'pointerup',                         // Defaults to `nativeEvent.type`, no override needed.
            
            currentTarget    : dragElementRef.current ?? undefined, // The draggable element initiating the commit.
            target           : pointedElement         ?? undefined, // The element under the pointer at release.
            relatedTarget    : dropElement,                         // The droppable element in contact.
        }),
        // Reassign the `relatedTarget` to satisfy the TS:
        relatedTarget        : dropElement,                         // The droppable element in contact.
        
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
 * @returns A synthetic `DraggedEvent` representing the committed transaction.
 */
const createDraggedEvent                    = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropCommittedEvent,
}: {
    // Event metadata:
    /**
     * The synthetic committed event from the draggable side.
     */
    dragDropCommittedEvent   : DragDropCommittedEvent<TElement>
}): DraggedEvent<TElement> => ({
    // Event metadata:
    ...dragDropCommittedEvent,
    type             : 'dragged',
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
 * @returns A synthetic `DroppedEvent` representing the committed transaction.
 */
const createDroppedEvent                    = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropCommittedEvent,
}: {
    // Event metadata:
    /**
     * The synthetic committed event from the droppable side.
     */
    dragDropCommittedEvent   : DragDropCommittedEvent<TElement>
}): DroppedEvent<TElement> => ({
    // Event metadata:
    ...dragDropCommittedEvent,
    type             : 'dropped',
    
    // On the droppable side, `currentTarget` points to the droppable itself.
    // The draggable that was `currentTarget` in the committed stage is now `relatedTarget`,
    // and vice versa for the droppable.
    // This swap reflects perspective: each side treats itself as current, partner as related.
    currentTarget    : dragDropCommittedEvent.relatedTarget as TElement,
    relatedTarget    : dragDropCommittedEvent.currentTarget,
});



// Event dispatchers:

/**
 * Dispatches the activation events for both draggable and droppable sides.
 * 
 * - Creates and invokes the draggable activation event.
 * - Creates and broadcasts droppable presence events to all registered droppables.
 * - Does not return events, since the handshake phase is based on `dragProbeEvent`.
 */
export const dispatchActivatedEvents        = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropActivatedEvent,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The synthetic activation event created earlier.
     */
    dragDropActivatedEvent   : DragDropActivatedEvent<TElement>
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
}): void => {
    if (draggable.dragMountedRef.current) {
        // Dispatch activation for the draggable:
        const dragActivatedEvent    = createDragActivatedEvent<TElement>({
            // Event metadata:
            dragDropActivatedEvent,
        });
        draggable.handleDragActivated(dragActivatedEvent);
    } // if
    
    
    
    // Dispatch presence broadcast for all droppables:
    for (const eachDroppable of droppableRegistry.values()) {
        // Skip disabled droppables:
        // - Also skip unmounted ones.
        if (!isDropReady(eachDroppable)) continue;
        
        
        
        const eachDragPresenceEvent = createDragPresenceEvent< Element>({
            // Event metadata:
            dragDropActivatedEvent,
            
            // Data:
            dropMetadata: eachDroppable.dropMetadata,
        });
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
 */
export const dispatchDeactivatedEvents      = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropDeactivatedEvent,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The synthetic deactivation event created earlier.
     */
    dragDropDeactivatedEvent : DragDropDeactivatedEvent<TElement>
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
}): void => {
    if (draggable.dragMountedRef.current) {
        // Dispatch deactivation for the draggable:
        const dragDeactivatedEvent = createDragDeactivatedEvent<TElement>({
            // Event metadata:
            dragDropDeactivatedEvent,
            
            // Contexts:
            droppable: draggable.dragSession?.droppable ?? null,
        });
        draggable.handleDragDeactivated(dragDeactivatedEvent);
    } // if
    
    
    
    // Dispatch absence broadcast for all droppables:
    for (const eachDroppable of droppableRegistry.values()) {
        // Skip disabled droppables:
        // - Also skip unmounted ones.
        if (!isDropReady(eachDroppable)) continue;
        
        
        
        const eachDragAbsenceEvent = createDragAbsenceEvent<TElement>({
            // Event metadata:
            dragDropDeactivatedEvent,
            
            // Contexts:
            draggable,
            droppable: eachDroppable,
        });
        eachDroppable.handleDragAbsence(eachDragAbsenceEvent);
    } // for
};

/**
 * Dispatches the handshake events for both draggable and droppable sides.
 * 
 * - Creates handshake events from the probe stage.
 * - Invokes both draggable and droppable handshake handlers in parallel.
 * - Returns both events for use in the evaluation phase.
 */
export const dispatchHandshakeEvents        = async <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragProbeEvent,
    candidateDropElement,
    
    // Contexts:
    draggable,
    candidateDroppable,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent           : DragProbeEvent<TElement>
    /**
     * The candidate droppable element, set as `relatedTarget`.
     */
    candidateDropElement     : Element
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
    /**
     * The droppable side currently under negotiation.
     */
    candidateDroppable       : DroppableContext< Element>
}): Promise<{
    // Events:
    /**
     * The synthetic handshake event from the draggable side.
     */
    dragHandshakeEvent       : DragHandshakeEvent<TElement>
    /**
     * The synthetic handshake event from the droppable side.
     */
    dropHandshakeEvent       : DropHandshakeEvent< Element>
}> => {
    // Extract properties from the draggable and candidateDroppable context for convenience:
    const {
        // Stable event handlers:
        handleDragHandshake,
    } = draggable;
    const {
        // Data:
        dropMetadata,
        
        // Stable event handlers:
        handleDropHandshake,
    } = candidateDroppable;
    
    
    
    // Dispatch handshake for both sides:
    const dragHandshakeEvent   = createDragHandshakeEvent<TElement>({
        // Event metadata:
        dragProbeEvent,
        candidateDropElement,
        
        // Data:
        dropMetadata,
    });
    const dropHandshakeEvent   = createDropHandshakeEvent< Element>({
        // Event metadata:
        dragProbeEvent,
        candidateDropElement,
        
        // Data:
        dropMetadata,
    });
    await Promise.all([
        isDragReady(draggable)          && handleDragHandshake(dragHandshakeEvent),
        isDropReady(candidateDroppable) && handleDropHandshake(dropHandshakeEvent),
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
 */
export const dispatchEvaluationEvents       = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragHandshakeEvent,
    dropHandshakeEvent,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The synthetic handshake event from the draggable side.
     * 
     * Pass `DragProbeEvent` if no handshake was performed,
     * e.g. when the draggable is not hovering over any droppable.
     */
    dragHandshakeEvent       : DragHandshakeEvent<TElement> | DragProbeEvent<TElement>
    /**
     * The synthetic handshake event from the droppable side.
     * 
     * Pass `DragProbeEvent` if no handshake was performed,
     * e.g. when the draggable is not hovering over any droppable.
     */
    dropHandshakeEvent       : DropHandshakeEvent< Element> | DragProbeEvent< Element>
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement>
}): void => {
    if (draggable.dragMountedRef.current) {
        const dragEvaluationEvent = createDragEvaluationEvent<TElement>({
            // Event metadata:
            dragHandshakeEvent,
            
            // Data:
            dropResponse: ('dropResponse' in dropHandshakeEvent) ? dropHandshakeEvent.dropResponse : undefined, // No dropResponse for non-handshake events.
        });
        draggable.handleDragEvaluation(dragEvaluationEvent);
    } // if
    
    
    
    // Dispatch evaluation broadcast for all droppables:
    for (const eachDroppable of droppableRegistry.values()) {
        // Skip disabled droppables:
        // - Also skip unmounted ones.
        if (!isDropReady(eachDroppable)) continue;
        
        
        
        const eachDropEvaluationEvent = createDropEvaluationEvent<TElement>({
            // Event metadata:
            dropHandshakeEvent,
            
            // Data:
            dragResponse: ('dragResponse' in dragHandshakeEvent) ? dragHandshakeEvent.dragResponse : undefined, // No dragResponse for non-handshake events.
            
            // Contexts:
            draggable,
            droppable: eachDroppable,
        });
        eachDroppable.handleDropEvaluation(eachDropEvaluationEvent);
    } // for
};

/**
 * Dispatches the final committed events once both sides have agreed.
 * 
 * - Creates the dragged and dropped commit events from the committed stage.
 * - Invokes both draggable and droppable commit handlers.
 * - Does not return events, since commit and deactivation phases are based on `lastPointerUpEvent`.
 */
export const dispatchCommittedEvents        = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropCommittedEvent,
    
    // Contexts:
    draggable,
}: {
    // Event metadata:
    /**
     * The synthetic committed event created earlier.
     */
    dragDropCommittedEvent   : DragDropCommittedEvent<TElement>
    
    // Contexts:
    /**
     * The draggable side associated with the drag gesture.
     */
    draggable                : DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> }
}): void => {
    // Extract properties from the draggable context for convenience:
    const {
        // Actual states:
        dragSession : {
            droppable,
        },
    } = draggable;
    
    
    
    if (draggable.dragMountedRef.current) {
        const draggedEvent = createDraggedEvent<TElement>({
            // Event metadata:
            dragDropCommittedEvent,
        });
        draggable.handleDragged(draggedEvent);
    } // if
    
    
    
    // Get the currently active droppable to deactivate, if any:
    if (droppable?.dropMountedRef.current) {
        const droppedEvent = createDroppedEvent< Element>({
            // Event metadata:
            dragDropCommittedEvent,
        });
        droppable.handleDropped(droppedEvent);
    } // if
};
