// React:
import {
    // Types:
    type RefObject,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Types:
    type EventHandler,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Types:
import {
    // Handshakes:
    type DragHandshakeEvent,
    type DropHandshakeEvent,
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
    isDropReady,
    
    
    
    // State updates:
    activateDraggable,
    activateDroppable,
    
    deactivateDraggable,
    deactivateDroppable,
    deactivateRestDroppables,
}                           from './internal-state-utilities.js'
import {
    // Event factories:
    createDragDropActivatedEvent,
    createDragDropDeactivatedEvent,
    createDragProbeEvent,
    createDragDropCommittedEvent,
    
    // Event dispatchers:
    dispatchActivatedEvents,
    dispatchDeactivatedEvents,
    dispatchHandshakeEvents,
    dispatchEvaluationEvents,
    dispatchCommittedEvents,
}                           from './internal-event-utilities.js'



// Tests:

/**
 * Determines whether the specified draggable context has an existing drag session.
 */
const hasDragSession = <TElement extends Element = HTMLElement>(draggable: DraggableContext<TElement>): draggable is DraggableContext<TElement> & { dragSession: Exclude<DraggableContext<TElement>['dragSession'], null> } => {
    return !!draggable.dragSession;
};



// Resolvers:

/**
 * Resolves the top-most DOM element at the given pointer coordinates.
 * 
 * Ensures hit-testing lands on a valid candidate element
 * by bypassing non-target overlays such as floating drag previews
 * or cursor indicators.
 * 
 * @param pointerMoveEvent A native pointer event containing horizontal and vertical coordinates.
 * @param dropPredicate An optional predicate to filter candidate elements.
 * @returns The top-most matching element, or `null` if no candidate is found.
 */
const resolvePointedElement = (pointerMoveEvent: PointerEvent, dropPredicate?: (dropCandidate: Element) => boolean): Element | null => {
    // Extract pointer coordinates for convenience:
    const {
        clientX,
        clientY,
    } = pointerMoveEvent;
    
    
    
    // Fast path: direct DOM lookup when no filter predicate is specified:
    if (!dropPredicate) return document.elementFromPoint(clientX, clientY);
    
    
    
    // Filtered path: find the first element matching the predicate:
    return document.elementsFromPoint(clientX, clientY).filter(dropPredicate)[0] ?? null;
};

/**
 * Walks up the DOM hierarchy starting from the given pointed element.
 * 
 * Sequentially yields each element from self up to root,
 * allowing consumers to short-circuit early
 * once a valid droppable candidate is found during hit-testing.
 * 
 * @param pointedElement The initial element detected under the pointer via `resolvePointedElement()`.
 * @yields Each element in the ancestor chain, starting with the given element itself.
 */
function* iterateElementAndAncestors(pointedElement: Element): Generator<Element> {
    // First, yield the given element itself:
    yield pointedElement;
    
    
    
    // Then, yield the parent, up until the root:
    for (let parent = pointedElement.parentElement; parent; parent = parent.parentElement) {
        yield parent;
    } // for
}



// Negotiations:

/**
 * Represents the outcome of a drag-drop negotiation
 * between a draggable source and a droppable target.
 */
interface NegotiationResult<TElement extends Element = HTMLElement> {
    // Events:
    
    /**
     * The synthetic handshake event from the draggable side.
     */
    dragHandshakeEvent : DragHandshakeEvent<TElement>
    
    /**
     * The synthetic handshake event from the droppable side.
     */
    dropHandshakeEvent : DropHandshakeEvent< Element>
    
    
    
    // Contexts:
    
    /**
     * The droppable side associated with the matched target.
     */
    droppable          : DroppableContext< Element>
}

/**
 * Attempts drag-drop handshake negotiation between a draggable source and candidate droppable targets.
 * 
 * Walks up the ancestor chain from the pointed element (probe event's target element)
 * to locate the nearest registered droppable side,
 * then invokes both sides' handshake handlers to negotiate acceptance.
 * 
 * @returns A negotiation result if both sides respond, a fallback if only one side responds, or `false` if no target is found.
 */
const attemptNegotiation = async <TElement extends Element = HTMLElement>({
    // Events:
    dragProbeEvent,
    
    // Contexts:
    draggable,
}: {
    // Events:
    /**
     * The originating probe event.
     */
    dragProbeEvent          : DragProbeEvent<TElement>
    
    // Contexts:
    /**
     * The draggable side currently under negotiation.
     */
    draggable               : DraggableContext<TElement>
}): Promise<NegotiationResult<TElement> | false> => {
    // Holds the nearest candidate that did not achieve a full dual-response:
    let nonResponsiveCandidate : NegotiationResult<TElement> | undefined = undefined;
    
    // Walk up the ancestor chain to find the nearest droppable side:
    const pointedElement = dragProbeEvent.target as Element;
    for (const candidateDropElement of iterateElementAndAncestors(pointedElement)) {
        // Find the corresponding droppable side by its element:
        // - Skip the disabled ones.
        const candidateDroppable = droppableRegistry.get(candidateDropElement);
        if (!isDropReady(candidateDroppable)) continue;
        
        
        
        // Perform handshake on both sides in parallel:
        const {
            dragHandshakeEvent,
            dropHandshakeEvent,
        } = await dispatchHandshakeEvents<TElement>({
            // Event metadata:
            dragProbeEvent,
            candidateDropElement,
            
            // Contexts:
            draggable,
            candidateDroppable,
        });
        
        
        
        // Build the negotiation result for the current iteration:
        const negotiationResult : NegotiationResult<TElement> = {
            // Events:
            dragHandshakeEvent,
            dropHandshakeEvent,
            
            // Contexts:
            droppable: candidateDroppable,
        };
        
        // If both sides responded → negotiation complete:
        if ((dragHandshakeEvent.dragResponse !== undefined) && (dropHandshakeEvent.dropResponse !== undefined)) return negotiationResult;
        
        // Otherwise, keep as fallback (non-responsive candidate):
        nonResponsiveCandidate = negotiationResult;
    } // for
    
    
    
    // Return fallback if available, otherwise no negotiation:
    return nonResponsiveCandidate ?? false;
};



// Updates:

/**
 * Clears the active droppable side when the drag gesture is no longer valid.
 * 
 * Intended to be called when:
 * - The drag gesture is still active but the draggable is no longer over any droppable zone.
 * - The draggable is disabled or unmounted during a drag gesture.
 * - The pointer moves outside any droppable zone.
 * - The negotiation fails to find a valid droppable candidate.
 * 
 * - Resets the droppable's status to `null` (drag gesture active but outside any droppable zone).
 * - Clears the droppable's payload.
 * - Clears the draggable's status to `null` (drag gesture active but outside any droppable zone).
 * - Clears the draggable's metadata.
 * - Clears the active droppable reference and its interaction states.
 */
const clearActiveDroppable                  = <TElement extends Element = HTMLElement>({
    // Contexts:
    draggable,
}: {
    // Contexts:
    /**
     * The draggable side to deactivate.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    try {
        // Deactivate the previously active droppable side:
        deactivateDroppable({
            // Data:
            inactiveDropStatus: null, // `null` → drag gesture active but outside this droppable zone.
            
            // Contexts:
            draggable,
        });
        
        
        
        // Deactivate the draggable side:
        deactivateDraggable<TElement>({
            // Data:
            inactiveDragStatus: null, // `null` → drag gesture active but outside all droppable zones.
            
            // Contexts:
            draggable,
        });
    }
    finally {
        // Reset the drag session:
        draggable.dragSession = null;
    } // try
};

/**
 * Swaps the active droppable side when the pointed target or acceptance changes.
 * 
 * - Skips unnecessary reactivation if the droppable reference and its acceptance are unchanged.
 *   Avoids redundant updates when the pointer wiggles inside the same droppable.
 * - Resets the previously active droppable side (status + payload) when switching to another droppable.
 * - Updates draggable side (status + metadata).
 * - Updates the new active droppable side (status + payload).
 * - Updates droppable reference, along with acceptance, pointed element, and drop element.
 */
const swapActiveDroppable                   = <TElement extends Element = HTMLElement>({
    // Events:
    dragHandshakeEvent,
    dropHandshakeEvent,
    
    // Contexts:
    draggable,
    droppable,
}: {
    // Events:
    /**
     * The handshake event from the draggable side.
     */
    dragHandshakeEvent      : DragHandshakeEvent<TElement>
    /**
     * The handshake event from the droppable side.
     */
    dropHandshakeEvent      : DropHandshakeEvent<Element>
    
    // Contexts:
    /**
     * The draggable side currently under negotiation.
     */
    draggable               : DraggableContext<TElement>
    /**
     * The droppable side currently under negotiation.
     */
    droppable               : DroppableContext< Element>
}): void => {
    // Determine if both sides accepted:
    // - `undefined` is treated as `false`.
    const isAccepted = !!dragHandshakeEvent.dragResponse && !!dropHandshakeEvent.dropResponse;
    
    
    
    // Skip if the droppable reference and its acceptance are unchanged:
    const {
        // Actual states:
        dragSession,
    } = draggable;
    if (dragSession && (droppable === dragSession.droppable) && (isAccepted === dragSession.isAccepted)) return;
    
    
    
    // Deactivate the previously active droppable side (if any) before swapping:
    deactivateDroppable({
        // Data:
        inactiveDropStatus: null, // `null` → drag gesture active but outside this droppable zone.
        
        // Contexts:
        draggable, // The draggable side that *may contains* droppable to deactivate.
    });
    
    
    
    // Update the drag session:
    draggable.dragSession = {
        droppable,  // Replace with the new droppable.
        isAccepted, // Replace with the new acceptance value.
        pointedElement : dragHandshakeEvent.target        as Element,
        dropElement    : dragHandshakeEvent.relatedTarget as Element,
    };
    // A TS fix to guarantee the existence of `draggable.dragSession`:
    if (!hasDragSession(draggable)) return;
    
    
    
    // Activate the draggable side:
    activateDraggable<TElement>({
        // Contexts:
        draggable,
    });
    
    
    
    // Activate the droppable side:
    activateDroppable({
        // Contexts:
        draggable,
    });
};

/**
 * Sets up or cleans up the global drag lifecycle state.
 * 
 * - On setup   : marks the draggable as active and broadcasts active state to all droppables.
 * - On cleanup : resets the draggable side to inactive, resets the previously active droppable side,
 *   and broadcasts inactive state.
 */
export const updateDragLifecycle            = <TElement extends Element = HTMLElement>({
    // Lifecycle configs:
    isSetup,
    
    // Contexts:
    draggable,
}: {
    // Lifecycle configs:
    /**
     * Specifies whether to set up (true) or clean up (false) the draggable lifecycle.
     */
    isSetup                 : boolean
    
    // Contexts:
    /**
     * The draggable side to deactivate.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    if (!isSetup) {
        // Deactivate the previously active droppable side:
        deactivateDroppable({
            // Data:
            inactiveDropStatus: undefined, // `undefined` → no drag activity at all.
            
            // Contexts:
            draggable,
        });
    } // if
    
    
    
    // Deactivate the draggable side:
    deactivateDraggable<TElement>({
        // Data:
        inactiveDragStatus: isSetup ? null : undefined, // `null` → drag gesture active but outside all droppable zones, `undefined` → no drag activity at all.
        
        // Contexts:
        draggable,
    });
    
    // Deactivate the rest droppable sides (broadcast):
    deactivateRestDroppables({
        // Data:
        inactiveDropStatus: isSetup ? null : undefined, // `null` → drag gesture active but outside all droppable zones, `undefined` → no drag activity at all.
        
        // Contexts:
        draggable,
    });
};

/**
 * Updates global `pointermove` listener for drag gestures.
 * 
 * - Attaches `pointermove` (probe/evaluation) handler
 *   when drag is active.
 * - Removes it when drag ends.
 */
export const updateGlobalPointerListeners   = ({
    // Lifecycle configs:
    isSetup,
    
    // Stable event handlers:
    handleGlobalPointerMove,
}: {
    // Lifecycle configs:
    /**
     * Specifies whether to set up (true) or clean up (false) the listener's lifecycle.
     */
    isSetup                 : boolean
    
    // Stable event handlers:
    /**
     * Invoked continuously during pointer movements.
     * 
     * Allows the drag-drop engine to trigger handshake and evaluation events correctly.
     */
    handleGlobalPointerMove : EventHandler<PointerEvent>
}): void => {
    if (isSetup) {
        window.addEventListener('pointermove', handleGlobalPointerMove);
    }
    else {
        window.removeEventListener('pointermove', handleGlobalPointerMove);
    } // if
};

/**
 * Updates the global droppable registry when a droppable mounts or unmounts.
 * 
 * - Registers the droppable context on mount.
 * - Unregisters it on unmount to prevent leaks and stale references.
 * 
 */
export const updateDroppableRegistry        = <TElement extends Element = HTMLElement>({
    // Lifecycle configs:
    isSetup,
    
    // Data:
    dropElement,
    
    // Actual states:
    droppableContext,
}: {
    // Lifecycle configs:
    /**
     * Specifies whether to set up (true) or clean up (false) the droppable lifecycle.
     */
    isSetup                 : boolean
    
    // Data:
    /**
     * The reference to the DOM element that backing the droppable zone,
     * becomes the key of the droppable registry.
     */
    dropElement             : Element
    
    // Actual states:
    /**
     * The droppable context to register or unregister.
     */
    droppableContext        : DroppableContext<TElement>
}): void => {
    if (isSetup) {
        droppableRegistry.set(dropElement, droppableContext as DroppableContext< Element>);
    }
    else {
        droppableRegistry.delete(dropElement);
    } // if
};

/**
 * Lazily initializes a draggable context and stores it in the given ref.
 * 
 * - Creates a new context if none exists.
 * - Reuses the existing context otherwise.
 * 
 * @returns The current draggable context (newly created or reused).
 */
export const lazyInitializeDraggableContext = <TElement extends Element = HTMLElement>({
    // Actual states:
    draggableContextRef,
    
    // Rest:
    ...data
}: Omit<DraggableContext<TElement>,
    // Interaction states:
    | 'dragSession'
> & {
    // Actual states:
    /**
     * The draggable's ref holding the current draggable context.
     */
    draggableContextRef     : RefObject<DraggableContext<TElement> | undefined>
}): DraggableContext<TElement> => {
    const initializedDraggableContext = draggableContextRef.current;
    if (initializedDraggableContext) return initializedDraggableContext;
    
    
    const initialDraggableContext : DraggableContext<TElement> = {
        // Interaction states:
        dragSession : null,
        
        // Rest:
        ...data,
    };
    draggableContextRef.current = initialDraggableContext;
    return initialDraggableContext;
};

/**
 * Lazily initializes a droppable context and stores it in the given ref.
 * 
 * - Creates a new context if none exists.
 * - Reuses the existing context otherwise.
 * 
 * @returns The current droppable context (newly created or reused).
 */
export const lazyInitializeDroppableContext = <TElement extends Element = HTMLElement>({
    // Actual states:
    droppableContextRef,
    
    // Rest:
    ...initialDroppableContext
}: DroppableContext<TElement> & {
    // Actual states:
    /**
     * The droppable's ref holding the current droppable context.
     */
    droppableContextRef     : RefObject<DroppableContext<TElement> | undefined>
}): DroppableContext<TElement> => {
    const initializedDroppableContext = droppableContextRef.current;
    if (initializedDroppableContext) return initializedDroppableContext;
    
    
    droppableContextRef.current = initialDroppableContext;
    return initialDroppableContext;
};

/**
 * Synchronizes draggable context flags with the latest props.
 */
export const syncDraggableContext           = <TElement extends Element = HTMLElement>({
    // Data:
    dragPayload,
    
    // Behaviors:
    dragEnabled,
    
    // Actual states:
    draggable,
}: Pick<DraggableContext<TElement>,
    // Data:
    | 'dragPayload'
    
    // Behaviors:
    | 'dragEnabled'
> & {
    // Actual states:
    /**
     * The draggable context to update.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    draggable.dragPayload = dragPayload;
    draggable.dragEnabled = dragEnabled;
};

/**
 * Synchronizes droppable context flags with the latest props.
 */
export const syncDroppableContext           = <TElement extends Element = HTMLElement>({
    // Data:
    dropMetadata,
    
    // Behaviors:
    dropEnabled,
    
    // Actual states:
    droppableContext,
}: Pick<DroppableContext<TElement>,
    // Data:
    | 'dropMetadata'
    
    // Behaviors:
    | 'dropEnabled'
> & {
    // Actual states:
    /**
     * The droppable context to update.
     */
    droppableContext        : DroppableContext<TElement>
}): void => {
    droppableContext.dropMetadata = dropMetadata;
    droppableContext.dropEnabled  = dropEnabled;
};



// Processes:

/**
 * Processes the drag-drop activation operation when a drag gesture begins.
 * 
 * - Validates drag context.
 * - Dispatches initial `DragActivatedEvent` for the draggable side.
 * - Dispatches `DragPresenceEvent` for the droppable side (broadcast).
 */
export const processDragDropActivate   = <TElement extends Element = HTMLElement>({
    // Refs:
    lastPointerDownEventRef,
    
    // Utility functions:
    isDragReady,
    
    // Contexts:
    draggable,
}: {
    // Refs:
    /**
     * A shared reference to the most recent native `pointerdown` event.
     */
    lastPointerDownEventRef : RefObject<PointerEvent | undefined> | undefined,
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
    
    // Contexts:
    /**
     * The draggable side to activate.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    // Abort activate if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    // - No pointerdown event was captured.
    const lastPointerDownEvent = lastPointerDownEventRef?.current;
    if (!isDragReady() || !lastPointerDownEvent) return;
    
    
    
    // Resolve the top-most element under the cursor:
    // - Ignore the "ghost dragging image".
    const pointedElement = resolvePointedElement(lastPointerDownEvent, draggable.dropPredicate);
    
    
    
    // Dispatch the initial activation events:
    const dragDropActivatedEvent = createDragDropActivatedEvent<TElement>({
        // Event metadata:
        lastPointerDownEvent,
        pointedElement,
        
        // Contexts:
        draggable,
    });
    dispatchActivatedEvents<TElement>({
        // Event metadata:
        dragDropActivatedEvent,
        
        // Contexts:
        draggable,
    });
};

/**
 * Processes the drag-drop deactivation operation when a drag gesture ends.
 * 
 * - Validates drag context.
 * - Dispatches final `DragDeactivatedEvent` for the draggable side.
 * - Dispatches `DragAbsenceEvent` for the droppable side (active and broadcast).
 * - Clears the active droppable reference and its interaction states.
 */
export const processDragDropDeactivate = <TElement extends Element = HTMLElement>({
    // Refs:
    lastPointerUpEventRef,
    
    // Utility functions:
    isDragReady,
    
    // Contexts:
    draggable,
}: {
    // Refs:
    /**
     * A shared reference to the most recent native `pointerup` event.
     */
    lastPointerUpEventRef   : RefObject<PointerEvent | undefined> | undefined,
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
    
    // Contexts:
    /**
     * The draggable side to deactivate.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    try {
        // Abort deactivate if:
        // - Draggable element is missing.
        // - Draggable is unmounted.
        // - Draggable is disabled.
        // - No pointerup event was captured.
        const lastPointerUpEvent = lastPointerUpEventRef?.current;
        if (!isDragReady() || !lastPointerUpEvent) return;
        
        
        
        // Dispatch the final deactivation events:
        const dragDropDeactivatedEvent = createDragDropDeactivatedEvent<TElement>({
            // Event metadata:
            lastPointerUpEvent,
            
            // Contexts:
            draggable,
        });
        dispatchDeactivatedEvents<TElement>({
            // Event metadata:
            dragDropDeactivatedEvent,
            
            // Contexts:
            draggable,
        });
    }
    finally {
        // Reset the drag session:
        draggable.dragSession = null;
    } // try
};

/**
 * Processes a drag probe during pointer movement.
 * 
 * - Resolves the pointed element under the cursor.
 * - Initiates handshake negotiation between draggable and droppable.
 * - Dispatches evaluation events.
 * - Updates the active droppable side when the pointed target or acceptance changes.
 */
export const processDragProbe          = async <TElement extends Element = HTMLElement>({
    // Events:
    pointerMoveEvent,
    
    // Contexts:
    draggable,
}: {
    // Events:
    /**
     * The originating native 'pointermove' event from the browser.
     */
    pointerMoveEvent        : PointerEvent
    
    // Contexts:
    /**
     * The draggable side currently under negotiation.
     */
    draggable               : DraggableContext<TElement>
}): Promise<void> => {
    // Extract properties from the draggable context for convenience:
    const {
        // Behaviors:
        dropPredicate,
        
        // Utility functions:
        isDragReady,
    } = draggable;
    
    
    
    // Abort probing if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    if (!isDragReady()) {
        clearActiveDroppable<TElement>({
            // Contexts:
            draggable,
        });
        
        return;
    } // if
    
    
    
    // Resolve the top-most element under the cursor:
    // - Ignore the "ghost dragging image".
    const pointedElement = resolvePointedElement(pointerMoveEvent, dropPredicate);
    
    // Create a synthetic probe event for the current pointer position:
    const dragProbeEvent = createDragProbeEvent<TElement>({
        // Event metadata:
        pointerMoveEvent,
        pointedElement,
        
        // Contexts:
        draggable,
    });
    
    
    
    // If no element under the pointer → "no contact":
    if (!pointedElement) {
        clearActiveDroppable<TElement>({
            // Contexts:
            draggable,
        });
        
        // Dispatch "no contact" evaluation events:
        dispatchEvaluationEvents<TElement>({
            // Event metadata:
            dragHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            dropHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            
            // Contexts:
            draggable,
        });
        
        return;
    } // if
    
    
    
    // Initiate handshake negotiation between draggable and droppable:
    const negotiationResult = await attemptNegotiation<TElement>({
        // Events:
        dragProbeEvent,
        
        // Contexts:
        draggable,
    });
    
    
    
    // After await completion, abort probing if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    // - Droppable is disabled (if has negotiation).
    if (!isDragReady() || (negotiationResult && !isDropReady(negotiationResult.droppable))) {
        clearActiveDroppable<TElement>({
            // Contexts:
            draggable,
        });
        
        return;
    } // if
    
    
    
    // No negotiation → assume as "no contact":
    if (!negotiationResult) {
        clearActiveDroppable<TElement>({
            // Contexts:
            draggable,
        });
        
        // Dispatch "no contact" evaluation events:
        dispatchEvaluationEvents<TElement>({
            // Event metadata:
            dragHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            dropHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            
            // Contexts:
            draggable,
        });
        
        return;
    } // if
    
    
    
    // Extract negotiation result for convenience:
    const {
        // Events:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Contexts:
        droppable,
    } = negotiationResult;
    
    
    
    // Update the active droppable side when the pointed target or acceptance changes:
    swapActiveDroppable<TElement>({
        // Events:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Contexts:
        draggable,
        droppable,
    });
    
    // Dispatch evaluation events:
    dispatchEvaluationEvents<TElement>({
        // Event metadata:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Contexts:
        draggable,
    });
};

/**
 * Processes the drag-drop commit operation when the lifecycle ends.
 * 
 * - Validates drag context and acceptance.
 * - Dispatches final dragged/dropped events.
 */
export const processDragDropCommit     = <TElement extends Element = HTMLElement>({
    // Refs:
    lastPointerUpEventRef,
    
    // Utility functions:
    isDragReady,
    
    // Contexts:
    draggable,
}: {
    // Refs:
    /**
     * A shared reference to the most recent native `pointerup` event.
     */
    lastPointerUpEventRef   : RefObject<PointerEvent | undefined> | undefined,
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
    
    // Contexts:
    /**
     * The draggable context to commit.
     */
    draggable               : DraggableContext<TElement>
}): void => {
    // Abort commit if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    // - No pointerup event was captured.
    // - No active droppable side was accepted during the drag gesture.
    const lastPointerUpEvent = lastPointerUpEventRef?.current;
    if (!isDragReady() || !lastPointerUpEvent || !hasDragSession(draggable) || !draggable.dragSession.isAccepted) return;
    
    
    
    // Dispatch the final commit events:
    const dragDropCommittedEvent = createDragDropCommittedEvent<TElement>({
        // Event metadata:
        lastPointerUpEvent,
        
        // Contexts:
        draggable,
    });
    dispatchCommittedEvents<TElement>({
        // Event metadata:
        dragDropCommittedEvent,
        
        // Contexts:
        draggable,
    });
};
