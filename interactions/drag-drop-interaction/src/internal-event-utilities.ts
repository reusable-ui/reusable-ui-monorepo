// Reusable-ui utilities:
import {
    // Types:
    type EventHandler,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Utilities:
    createSyntheticPointerEvent,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Types:
import {
    // Data:
    type DragPayload,
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
    type DroppableEntry,
    
    // Probings:
    type DragProbeEvent,
}                           from './internal-types.js'

// Utilities:
import {
    droppableRegistry,
}                           from './internal-registry.js'



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
    dragElement,
    pointedElement,
    
    // Data:
    dragPayload,
}: {
    // Event metadata:
    /**
     * The most recent native 'pointerdown' event from the browser captured during a drag gesture.
     */
    lastPointerDownEvent    : PointerEvent
    /**
     * The reference to the DOM element that serves as the draggable element itself, set as `currentTarget`.
     * Pass `null` if the drag element is not available, e.g. dragging a file.
     */
    dragElement             : TElement | null
    /**
     * The reference to the DOM element that currently under the pointer, set as `target`.
     */
    pointedElement          : Element
    
    // Data:
    /**
     * The payload carried by the draggable source.
     */
    dragPayload             : DragPayload
}): DragDropActivatedEvent<TElement> => ({
    ...createSyntheticPointerEvent<TElement, PointerEvent>({
        // Event metadata:
        
        nativeEvent      : lastPointerDownEvent,
        
        // type          : 'pointerdown',            // Defaults to `nativeEvent.type`, no override needed.
        
        currentTarget    : dragElement ?? undefined, // The draggable element initiating the activation.
        target           : pointedElement,           // The element under the pointer at press.
        // relatedTarget : dropElement,              // Not yet defined at start stage.
    }),
    
    // Data:
    dragPayload, // The payload carried by the draggable source.
});

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
    dragElement,
    pointedElement,
    dropElement,
    
    // Data:
    dragPayload,
}: {
    // Event metadata:
    /**
     * The most recent native 'pointerup' event from the browser captured during a drag gesture.
     */
    lastPointerUpEvent      : PointerEvent
    /**
     * The reference to the DOM element that serves as the draggable element itself, set as `currentTarget`.
     * Pass `null` if the drag element is not available, e.g. dragging a file.
     */
    dragElement             : TElement | null
    /**
     * The reference to the DOM element that currently under the pointer, set as `target`.
     */
    pointedElement          : Element
    /**
     * The reference to the DOM element that serves as the droppable element in contact, set as `relatedTarget`.
     * Pass `null` if the droppable element is not available, e.g. when the drag gesture ends outside any droppable.
     */
    dropElement             : Element | null
    
    // Data:
    /**
     * The payload carried by the draggable source.
     */
    dragPayload             : DragPayload
}): DragDropDeactivatedEvent<TElement> => ({
    ...createSyntheticPointerEvent<TElement, PointerEvent>({
        // Event metadata:
        
        nativeEvent      : lastPointerUpEvent,
        
        // type          : 'pointerup',              // Defaults to `nativeEvent.type`, no override needed.
        
        currentTarget    : dragElement ?? undefined, // The draggable element initiating the deactivation.
        target           : pointedElement,           // The element under the pointer at release.
        relatedTarget    : dropElement,              // The droppable element in contact, if any.
    }),
    
    // Data:
    dragPayload, // The payload carried by the draggable source.
});



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
    dropMetadata            : DropMetadata
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
    
    // Data:
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The synthetic deactivation event created earlier.
     */
    dragDropDeactivatedEvent : DragDropDeactivatedEvent<TElement>
    
    // Data:
    /**
     * The metadata exposed by the active droppable target (if any).
     */
    dropMetadata            : DropMetadata | undefined
}): DragDeactivatedEvent<TElement> => ({
    // Event metadata:
    ...dragDropDeactivatedEvent,
    type             : 'dragdeactivated',
    
    // Data:
    dropMetadata, // The metadata exposed by the droppable target, if any.
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
    
    // Data:
    dropMetadata,
    isTargeted,
}: {
    // Event metadata:
    /**
     * The synthetic deactivation event created earlier.
     */
    dragDropDeactivatedEvent : DragDropDeactivatedEvent<TElement>
    
    // Data:
    /**
     * The metadata exposed by the droppable target.
     */
    dropMetadata            : DropMetadata
    /**
     * Indicates whether the pointer was positioned over *this* droppable
     * at the exact moment the drag gesture ended.
     * 
     * - `true` → The draggable had already made contact with this droppable,
     *   meaning the handshake was performed here just before the gesture concluded.
     * - `false` → The pointer was elsewhere when the gesture ended,
     *   so no handshake was performed on this droppable.
     * 
     * Useful for distinguishing between global absence broadcasts
     * (sent to all droppables for cleanup)
     * and the droppable that was actually under the pointer at the end of the gesture.
     */
    isTargeted              : boolean
}): DragAbsenceEvent<TElement> => ({
    // Event metadata:
    ...dragDropDeactivatedEvent,
    type             : 'dragabsence',
    
    // On the droppable side, `currentTarget` points to the droppable itself.
    // The draggable that was `currentTarget` in the deactivation stage is now `relatedTarget`,
    // and vice versa for the droppable.
    // This swap reflects perspective: each side treats itself as current, partner as related.
    currentTarget    : dragDropDeactivatedEvent.relatedTarget as TElement,
    relatedTarget    : dragDropDeactivatedEvent.currentTarget,
    
    // Data:
    dropMetadata, // The metadata exposed by the droppable target.
    isTargeted,   // Whether the pointer was positioned over *this* droppable.
});



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
export const createDragProbeEvent         = <TElement extends Element = HTMLElement>({
    // Event metadata:
    pointerMoveEvent,
    dragElement,
    pointedElement,
    
    // Data:
    dragPayload,
}: {
    // Event metadata:
    /**
     * The originating native 'pointermove' event from the browser.
     */
    pointerMoveEvent        : PointerEvent
    /**
     * The reference to the DOM element that serves as the draggable element itself, set as `currentTarget`.
     * Pass `null` if the drag element is not available, e.g. dragging a file.
     */
    dragElement             : TElement | null
    /**
     * The reference to the DOM element that currently under the pointer, set as `target`.
     * 
     * Pass `null` if the pointer is not over any valid droppable candidate,
     * e.g. hovering outside the viewport or over an excluded element (filtered out by `dropCandidate`).
     */
    pointedElement          : Element | null
    
    // Data:
    /**
     * The payload associated with the current drag gesture.
     */
    dragPayload             : DragPayload
}): DragProbeEvent<TElement> => ({
    // Event metadata:
    ...createSyntheticPointerEvent<TElement, PointerEvent>({
        // Event metadata:
        
        nativeEvent      : pointerMoveEvent,
        
        // type          : 'pointermove',               // Defaults to `nativeEvent.type`, no override needed.
        
        currentTarget    : dragElement    ?? undefined, // The draggable element initiating the probe.
        target           : pointedElement ?? undefined, // The element currently under the pointer.
        // relatedTarget : dropElement,                 // Not yet defined at probe stage.
    }),
    
    // Data:
    dragPayload, // The payload associated with the current drag gesture.
});



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
const createDragHandshakeEvent            = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragProbeEvent,
    dropElement,
    
    // Data:
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent          : DragProbeEvent<TElement>
    /**
     * The reference to the DOM element that serves as the droppable element in contact, set as `relatedTarget`.
     */
    dropElement             : Element
    
    // Data:
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata            : DropMetadata
}): DragHandshakeEvent<TElement> => ({
    // Event metadata:
    ...dragProbeEvent,
    type             : 'draghandshake',
    relatedTarget    : dropElement, // The droppable element now in contact.
    
    // Data:
    dropMetadata,                   // The metadata exposed by the droppable side.
    dragResponse     : undefined,   // Default: no decision yet from draggable.
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
const createDropHandshakeEvent            = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragProbeEvent,
    dropElement,
    
    // Data:
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent          : DragProbeEvent<TElement>
    /**
     * The reference to the DOM element that serves as the droppable element in contact itself, set as `currentTarget`.
     */
    dropElement             : TElement
    
    // Data:
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata            : DropMetadata
}): DropHandshakeEvent<TElement> => ({
    // Event metadata:
    ...dragProbeEvent,
    type             : 'drophandshake',
    
    // On the droppable side, `currentTarget` points to the droppable itself.
    // The draggable that was `currentTarget` in the probe stage is now `relatedTarget`.
    // This swap reflects perspective: each side treats itself as current, partner as related.
    currentTarget    : dropElement,
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
const createDragEvaluationEvent           = <TElement extends Element = HTMLElement>({
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
    dragHandshakeEvent      : DragHandshakeEvent<TElement> | DragProbeEvent<TElement>
    
    // Data:
    /**
     * The droppable's acceptance/rejection result.
     */
    dropResponse            : boolean | undefined
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
const createDropEvaluationEvent           = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dropHandshakeEvent,
    
    // Data:
    dropMetadata,
    dragResponse,
    isTargeted,
}: {
    // Event metadata:
    /**
     * The synthetic handshake event from the droppable side.
     * 
     * Pass `DragProbeEvent` if no handshake was performed,
     * e.g. when the draggable is not hovering over any droppable.
     */
    dropHandshakeEvent      : DropHandshakeEvent<TElement> | DragProbeEvent<TElement>
    
    // Data:
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata            : DropMetadata
    /**
     * The draggable's acceptance/rejection result.
     */
    dragResponse            : boolean | undefined
    /**
     * Indicates whether the pointer is positioned over *this* droppable
     * during the current pointer movement.
     * 
     * - `true` → This evaluation event corresponds to this droppable element,
     *   meaning the draggable is actively being evaluated here,
     *   with the handshake performed against this droppable.
     * - `false` → The pointer is elsewhere, and this event is broadcast
     *   for another droppable, so this droppable is not the subject
     *   of the current evaluation.
     * 
     * Useful for distinguishing between global evaluation broadcasts
     * (sent to all droppables for live feedback)
     * and the droppable that is actually under the pointer at the moment.
     */
    isTargeted              : boolean
}): DropEvaluationEvent<TElement> => ({
    // Defaults for non-handshake events:
    dropResponse     : undefined,
    
    // Event metadata:
    ...dropHandshakeEvent,
    type             : 'dropevaluation',
    
    // Data:
    dropMetadata, // The metadata exposed by the droppable side.
    dragResponse, // Draggable's acceptance/rejection result.
    isTargeted,   // Whether the pointer is positioned over *this* droppable.
});



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
export const createDragDropCommittedEvent = <TElement extends Element = HTMLElement>({
    // Event metadata:
    lastPointerUpEvent,
    dragElement,
    pointedElement,
    dropElement,
    
    // Data:
    dragPayload,
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The most recent native 'pointerup' event from the browser captured during a drag gesture.
     */
    lastPointerUpEvent      : PointerEvent
    /**
     * The reference to the DOM element that serves as the draggable element itself, set as `currentTarget`.
     * Pass `null` if the drag element is not available, e.g. dragging a file.
     */
    dragElement             : TElement | null
    /**
     * The reference to the DOM element that currently under the pointer, set as `target`.
     */
    pointedElement          : Element
    /**
     * The reference to the DOM element that serves as the droppable element in contact, set as `relatedTarget`.
     */
    dropElement             : Element
    
    // Data:
    /**
     * The payload delivered by the draggable source.
     */
    dragPayload             : DragPayload
    /**
     * The metadata exposed by the accepted droppable target.
     */
    dropMetadata            : DropMetadata
}): DragDropCommittedEvent<TElement> => ({
    ...createSyntheticPointerEvent<TElement, PointerEvent>({
        // Event metadata:
        
        nativeEvent      : lastPointerUpEvent,
        
        // type          : 'pointerup',              // Defaults to `nativeEvent.type`, no override needed.
        
        currentTarget    : dragElement ?? undefined, // The draggable element initiating the commit.
        target           : pointedElement,           // The element under the pointer at release.
        relatedTarget    : dropElement,              // The droppable element in contact.
    }),
    // Reassign the `relatedTarget` to satisfy the TS:
    relatedTarget        : dropElement,              // The droppable element in contact.
    
    // Data:
    dragPayload,  // The payload delivered by the draggable source.
    dropMetadata, // The metadata exposed by the accepted droppable target.
});



/**
 * Creates a synthetic committed event on the draggable side.
 * 
 * Extends the committed event by carrying the droppable's metadata,
 * exposing the target's business context (metadata) for the business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * @returns A synthetic `DraggedEvent` representing the committed transaction.
 */
const createDraggedEvent                  = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropCommittedEvent,
}: {
    // Event metadata:
    /**
     * The synthetic committed event from the draggable side.
     */
    dragDropCommittedEvent  : DragDropCommittedEvent<TElement>
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
const createDroppedEvent                  = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropCommittedEvent,
}: {
    // Event metadata:
    /**
     * The synthetic committed event from the droppable side.
     */
    dragDropCommittedEvent  : DragDropCommittedEvent<TElement>
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
 * Dispatches the handshake events for both draggable and droppable sides.
 * 
 * - Creates handshake events from the probe stage.
 * - Invokes both draggable and droppable handshake handlers in parallel.
 * - Returns both events for use in the evaluation phase.
 */
export const dispatchHandshakeEvents      = async <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragProbeEvent,
    dropElement,
    
    // Data:
    dropMetadata,
    
    // Stable event handlers:
    handleDragHandshake,
    handleDropHandshake,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent          : DragProbeEvent<TElement>
    /**
     * The reference to the DOM element that serves as the droppable element in contact, set as `relatedTarget`.
     */
    dropElement             : Element
    
    // Data:
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata            : DropMetadata
    
    // Stable event handlers:
    /**
     * Invoked continuously on every pointer movement during drag gesture movements
     * while the draggable hovers over a droppable.
     * 
     * Allows the draggable to validate the target's business context (metadata) and responds with acceptance or rejection.
     */
    handleDragHandshake     : (event: DragHandshakeEvent<TElement>) => Promise<void>
    /**
     * Invoked continuously on every pointer movement during drag gesture movements
     * while a draggable hovers over a droppable.
     * 
     * Allows the droppable to validate the draggable's payload and responds with acceptance or rejection.
     */
    handleDropHandshake     : (event: DropHandshakeEvent< Element>) => Promise<void>
}): Promise<{
    // Events:
    /**
     * The synthetic handshake event from the draggable side.
     */
    dragHandshakeEvent      : DragHandshakeEvent<TElement>
    /**
     * The synthetic handshake event from the droppable side.
     */
    dropHandshakeEvent      : DropHandshakeEvent< Element>
}> => {
    const dragHandshakeEvent = createDragHandshakeEvent<TElement>({
        // Event metadata:
        dragProbeEvent,
        dropElement,
        
        // Data:
        dropMetadata,
    });
    const dropHandshakeEvent = createDropHandshakeEvent< Element>({
        // Event metadata:
        dragProbeEvent,
        dropElement,
        
        // Data:
        dropMetadata,
    });
    await Promise.all([
        handleDragHandshake(dragHandshakeEvent),
        handleDropHandshake(dropHandshakeEvent),
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
export const dispatchEvaluationEvents     = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragHandshakeEvent,
    dropHandshakeEvent,
    
    // Data:
    activeDroppableEntry,
    
    // Stable event handlers:
    handleDragEvaluation,
}: {
    // Event metadata:
    /**
     * The synthetic handshake event from the draggable side.
     * 
     * Pass `DragProbeEvent` if no handshake was performed,
     * e.g. when the draggable is not hovering over any droppable.
     */
    dragHandshakeEvent      : DragHandshakeEvent<TElement> | DragProbeEvent<TElement>
    /**
     * The synthetic handshake event from the droppable side.
     * 
     * Pass `DragProbeEvent` if no handshake was performed,
     * e.g. when the draggable is not hovering over any droppable.
     */
    dropHandshakeEvent      : DropHandshakeEvent< Element> | DragProbeEvent< Element>
    
    // Data:
    /**
     * The droppable entry metadata and handlers associated with the matched target.
     * 
     * Pass `null` if no handshake was performed (all droppables are inactive),
     * e.g. when the draggable is not hovering over any droppable.
     */
    activeDroppableEntry    : DroppableEntry< Element> | null
    
    // Stable event handlers:
    /**
     * Invoked continuously on every pointer movement after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     * 
     * Enables live feedback from the draggable side during a drag gesture,
     * such as "drop here" indicators, cursor changes,
     * or other contextual hints.
     */
    handleDragEvaluation    : EventHandler<DragEvaluationEvent<TElement>>
}): void => {
    const dragEvaluationEvent = createDragEvaluationEvent<TElement>({
        // Event metadata:
        dragHandshakeEvent,
        
        // Data:
        dropResponse: ('dropResponse' in dropHandshakeEvent) ? dropHandshakeEvent.dropResponse : undefined, // No dropResponse for non-handshake events.
    });
    handleDragEvaluation(dragEvaluationEvent);
    
    
    
    // Dispatch evaluation for the active droppable:
    if (activeDroppableEntry) {
        const activeDropEvaluationEvent   = createDropEvaluationEvent< Element>({
            // Event metadata:
            dropHandshakeEvent,
            
            // Data:
            dropMetadata: activeDroppableEntry.dropMetadata,
            dragResponse: ('dragResponse' in dragHandshakeEvent) ? dragHandshakeEvent.dragResponse : undefined, // No dragResponse for non-handshake events.
            isTargeted: true, // This droppable is the current target.
        });
        activeDroppableEntry.handleDropEvaluation(activeDropEvaluationEvent);
    } // if
    
    // Dispatch evaluation broadcast for all inactive droppables:
    for (const eachDroppableEntry of droppableRegistry.values()) {
        // Skip the active droppable:
        if (eachDroppableEntry === activeDroppableEntry) continue;
        
        // Skip disabled droppables:
        if (!eachDroppableEntry.dropEnabled) continue;
        
        
        
        const inactiveDropEvaluationEvent = createDropEvaluationEvent< Element>({
            // Event metadata:
            dropHandshakeEvent,
            
            // Data:
            dropMetadata: eachDroppableEntry.dropMetadata,
            dragResponse: ('dragResponse' in dragHandshakeEvent) ? dragHandshakeEvent.dragResponse : undefined, // No dragResponse for non-handshake events.
            isTargeted: false, // Not the current target (broadcast only).
        });
        eachDroppableEntry.handleDropEvaluation(inactiveDropEvaluationEvent);
    } // for
};

/**
 * Dispatches the final committed events once both sides have agreed.
 * 
 * - Creates the dragged and dropped commit events from the committed stage.
 * - Invokes both draggable and droppable commit handlers.
 * - Does not return events, since commit and deactivation phases are based on `lastPointerUpEvent`.
 */
export const dispatchCommittedEvents      = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropCommittedEvent,
    
    // Stable event handlers:
    handleDragged,
    handleDropped,
}: {
    // Event metadata:
    /**
     * The synthetic committed event created earlier.
     */
    dragDropCommittedEvent  : DragDropCommittedEvent<TElement>
    
    // Stable event handlers:
    /**
     * Invoked once the drag gesture ends on the draggable
     * but only if both draggable and droppable sides accepted.
     * 
     * Allows the draggable to peek the target's business context (metadata) for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDragged           : EventHandler<DraggedEvent<TElement>>
    /**
     * Invoked once the drag gesture ends on the droppable side,
     * but only if both draggable and droppable sides accepted.
     * 
     * Delivers the draggable's payload for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDropped           : EventHandler<DroppedEvent< Element>>
}): void => {
    const draggedEvent = createDraggedEvent<TElement>({
        // Event metadata:
        dragDropCommittedEvent,
    });
    const droppedEvent = createDroppedEvent< Element>({
        // Event metadata:
        dragDropCommittedEvent,
    });
    handleDragged(draggedEvent);
    handleDropped(droppedEvent);
};
