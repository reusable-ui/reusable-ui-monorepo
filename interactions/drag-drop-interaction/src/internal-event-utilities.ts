// React:
import {
    // Types:
    type PointerEvent as ReactPointerEvent,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Utilities:
    createSyntheticPointerEvent,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Types:
import {
    // Data:
    type DragPayload,
    type DropMetadata,
    
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
}                           from './internal-types.js'

// Utilities:
import {
    droppableRegistry,
}                           from './internal-registry.js'



// Event factories:

/**
 * Creates a synthetic probe event at the hit-test stage on the draggable side.
 * 
 * Wraps the native 'pointermove' event into a React synthetic event,
 * establishing the draggable as `currentTarget` and the pointed element as `target`.
 * At this stage, no droppable is yet in contact, so `relatedTarget` remains undefined.
 * 
 * Useful for initiating drag-drop negotiation by encapsulating the raw pointer event.
 * 
 * @returns A synthetic React `PointerEvent` representing the probe stage.
 */
export const createDragProbeEvent         = <TElement extends Element = HTMLElement>({
    // Event metadata:
    pointerMoveEvent,
    dragElement,
    pointedElement,
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
     */
    pointedElement          : Element
}): ReactPointerEvent<TElement> => createSyntheticPointerEvent<TElement, PointerEvent>({
    // Event metadata:
    
    nativeEvent      : pointerMoveEvent,
    
    // type          : 'pointermove',            // Defaults to `nativeEvent.type`, no override needed.
    
    currentTarget    : dragElement ?? undefined, // The draggable element initiating the probe.
    target           : pointedElement,           // The element currently under the pointer.
    // relatedTarget : dropElement,              // Not yet defined at probe stage.
});



/**
 * Creates a synthetic handshake event on the draggable side.
 * 
 * Extends the probe event with the droppable element (`relatedTarget`) and carrying its metadata,
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
    dragProbeEvent          : ReactPointerEvent<TElement>
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
    dragPayload,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent          : ReactPointerEvent<TElement>
    /**
     * The reference to the DOM element that serves as the droppable element in contact itself, set as `currentTarget`.
     */
    dropElement             : TElement
    
    // Data:
    /**
     * The payload carried by the draggable side.
     */
    dragPayload             : DragPayload
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
    dragPayload,                  // The payload carried by the draggable side.
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
     */
    dragHandshakeEvent      : DragHandshakeEvent<TElement>
    
    // Data:
    /**
     * The droppable's acceptance/rejection result.
     */
    dropResponse            : boolean | undefined
}): DragEvaluationEvent<TElement> => ({
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
    dragResponse,
    isTargeted,
}: {
    // Event metadata:
    /**
     * The synthetic handshake event from the droppable side.
     */
    dropHandshakeEvent      : DropHandshakeEvent<TElement>
    
    // Data:
    /**
     * The draggable's acceptance/rejection result.
     */
    dragResponse            : boolean | undefined
    /**
     * Indicates whether the draggable is currently hovering over *this* droppable.
     * 
     * - `true` → The evaluation event corresponds to this droppable element,
     *   meaning it is the active candidate under the pointer.
     * - `false` → The evaluation event was broadcast for another droppable,
     *   so this droppable is not the current target.
     * 
     * Useful for distinguishing between global evaluation broadcasts and
     * the droppable that is actually being pointed at.
     */
    isTargeted              : boolean
}): DropEvaluationEvent<TElement> => ({
    // Event metadata:
    ...dropHandshakeEvent,
    type             : 'dropevaluation',
    
    // Data:
    dragResponse, // Draggable's acceptance/rejection result.
    isTargeted,   // Whether the draggable is currently hovering over *this* droppable.
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
}): DragDropCommittedEvent<TElement> => createSyntheticPointerEvent<TElement, PointerEvent>({
    // Event metadata:
    
    nativeEvent      : lastPointerUpEvent,
    
    // type          : 'pointerup',              // Defaults to `nativeEvent.type`, no override needed.
    
    currentTarget    : dragElement ?? undefined, // The draggable element initiating the commit.
    target           : pointedElement,           // The element under the pointer at release.
    relatedTarget    : dropElement,              // The droppable element in contact.
}) as DragDropCommittedEvent<TElement>;



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
    
    // Data:
    dropMetadata,
}: {
    // Event metadata:
    /**
     * The synthetic committed event from the draggable side.
     */
    dragDropCommittedEvent  : DragDropCommittedEvent<TElement>
    
    // Data:
    /**
     * The metadata exposed by the accepted droppable target.
     */
    dropMetadata            : DropMetadata
}): DraggedEvent<TElement> => ({
    // Event metadata:
    ...dragDropCommittedEvent,
    type             : 'dragged',
    
    // Data:
    dropMetadata, // The metadata exposed by the accepted droppable target.
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
    
    // Data:
    dragPayload,
}: {
    // Event metadata:
    /**
     * The synthetic committed event from the droppable side.
     */
    dragDropCommittedEvent  : DragDropCommittedEvent<TElement>
    
    // Data:
    /**
     * The payload delivered by the draggable source.
     */
    dragPayload             : DragPayload
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
    
    // Data:
    dragPayload, // The payload delivered by the draggable source.
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
    dragPayload,
    dropMetadata,
    
    // Stable event handlers:
    handleDragHandshake,
    handleDropHandshake,
}: {
    // Event metadata:
    /**
     * The synthetic probe event created earlier.
     */
    dragProbeEvent          : ReactPointerEvent<TElement>
    /**
     * The reference to the DOM element that serves as the droppable element in contact, set as `relatedTarget`.
     */
    dropElement             : Element
    
    // Data:
    /**
     * The payload carried by the draggable side.
     */
    dragPayload             : DragPayload
    /**
     * The metadata exposed by the droppable side.
     */
    dropMetadata            : DropMetadata
    
    // Stable event handlers:
    /**
     * Invoked continuously during drag gesture movements
     * while the draggable hovers over a droppable.
     * 
     * Allows the draggable to validate the target's business context (metadata) and responds with acceptance or rejection.
     */
    handleDragHandshake     : (event: DragHandshakeEvent<TElement>) => Promise<void>
    /**
     * Invoked continuously during drag gesture movements
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
        dragPayload,
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
 * - Creates and broadcasts the droppable evaluation event to all registered droppables.
 * - Does not return events, since commit phase is based on pointerup.
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
     */
    dragHandshakeEvent      : DragHandshakeEvent<TElement>
    /**
     * The synthetic handshake event from the droppable side.
     */
    dropHandshakeEvent      : DropHandshakeEvent< Element>
    
    // Data:
    /**
     * The droppable entry metadata and handlers associated with the matched target.
     */
    activeDroppableEntry    : DroppableEntry< Element>
    
    // Stable event handlers:
    /**
     * Invoked continuously after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     * 
     * Enables live feedback from the draggable side during a drag gesture,
     * such as "drop here" indicators, cursor changes,
     * or other contextual hints.
     */
    handleDragEvaluation    : (event: DragEvaluationEvent<TElement>) => void
}): void => {
    const dragEvaluationEvent = createDragEvaluationEvent<TElement>({
        // Event metadata:
        dragHandshakeEvent,
        
        // Data:
        dropResponse: dropHandshakeEvent.dropResponse,
    });
    handleDragEvaluation(dragEvaluationEvent);
    
    
    
    // Dispatch evaluation for the active droppable:
    const activeDropEvaluationEvent   = createDropEvaluationEvent< Element>({
        // Event metadata:
        dropHandshakeEvent,
        
        // Data:
        dragResponse: dragHandshakeEvent.dragResponse,
        isTargeted: true, // This droppable is the current target.
    });
    activeDroppableEntry.handleDropEvaluation(activeDropEvaluationEvent);
    
    // Dispatch evaluation broadcast for all inactive droppables:
    const inactiveDropEvaluationEvent = createDropEvaluationEvent< Element>({
        // Event metadata:
        dropHandshakeEvent,
        
        // Data:
        dragResponse: dragHandshakeEvent.dragResponse,
        isTargeted: false, // Not the current target (broadcast only).
    });
    for (const droppableEntry of droppableRegistry.values()) {
        // Skip the active droppable:
        if (droppableEntry === activeDroppableEntry) continue;
        
        // Skip disabled droppables:
        if (!droppableEntry.dropEnabled) continue;
        
        droppableEntry.handleDropEvaluation(inactiveDropEvaluationEvent);
    } // for
};

/**
 * Dispatches the final committed events once both sides have agreed.
 * 
 * - Creates the dragged and dropped commit events from the committed stage.
 * - Invokes both draggable and droppable commit handlers.
 * - Does not return events, since no more further phase.
 */
export const dispatchCommittedEvents      = <TElement extends Element = HTMLElement>({
    // Event metadata:
    dragDropCommittedEvent,
    
    // Data:
    dragPayload,
    dropMetadata,
    
    // Stable event handlers:
    handleDragged,
    handleDropped,
}: {
    // Event metadata:
    /**
     * The synthetic committed event created earlier.
     */
    dragDropCommittedEvent  : DragDropCommittedEvent<TElement>
    
    // Data:
    /**
     * The payload delivered by the draggable source.
     */
    dragPayload             : DragPayload
    /**
     * The metadata exposed by the accepted droppable target.
     */
    dropMetadata            : DropMetadata
    
    // Stable event handlers:
    /**
     * Invoked once the drag gesture ends on the draggable
     * but only if both draggable and droppable sides accepted.
     * 
     * Allows the draggable to peek the target's business context (metadata) for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDragged           : (event: DraggedEvent<TElement>) => void
    /**
     * Invoked once the drag gesture ends on the droppable side,
     * but only if both draggable and droppable sides accepted.
     * 
     * Delivers the draggable's payload for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDropped           : (event: DroppedEvent< Element>) => void
}): void => {
    const draggedEvent = createDraggedEvent<TElement>({
        // Event metadata:
        dragDropCommittedEvent,
        
        // Data:
        dropMetadata,
    });
    const droppedEvent = createDroppedEvent< Element>({
        // Event metadata:
        dragDropCommittedEvent,
        
        // Data:
        dragPayload,
    });
    handleDragged(draggedEvent);
    handleDropped(droppedEvent);
};
