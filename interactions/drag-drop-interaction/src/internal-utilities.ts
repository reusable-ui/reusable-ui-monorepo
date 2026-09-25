// React:
import {
    // Types:
    type Dispatch,
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
    
    // Props:
    type DraggableStateProps,
    
    // Reactive states:
    type DraggableState,
}                           from './types.js'
import {
    type DroppableEntry,
    type ActiveDroppableState,
    
    // Probings:
    type DragProbeEvent,
}                           from './internal-types.js'

// Utilities:
import {
    droppableRegistry,
}                           from './internal-registry.js'
import {
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
}

/**
 * Attempts drag-drop handshake negotiation between a draggable source and candidate droppable targets.
 * 
 * Walks up the ancestor chain from the pointed element (probe event's target element)
 * to locate the nearest registered droppable entry,
 * then invokes both sides' handshake handlers to negotiate acceptance.
 * 
 * @returns A negotiation result if both sides respond, a fallback if only one side responds, or `false` if no target is found.
 */
const attemptNegotiation = async <TElement extends Element = HTMLElement>({
    // Events:
    dragProbeEvent,
    
    // Stable event handlers:
    handleDragHandshake,
    
    // Actual states:
    isMountedRef,
}: {
    // Events:
    /**
     * The originating probe event.
     */
    dragProbeEvent          : DragProbeEvent<TElement>
    
    // Stable event handlers:
    /**
     * Invoked continuously on every pointer movement during drag gesture movements
     * while the draggable hovers over a droppable.
     * 
     * Allows the draggable to validate the target's business context (metadata) and responds with acceptance or rejection.
     */
    handleDragHandshake     : (event: DragHandshakeEvent<TElement>) => Promise<void>
    
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
}): Promise<NegotiationResult<TElement> | false> => {
    // Holds the nearest candidate that did not achieve a full dual-response:
    let nonResponsiveCandidate : NegotiationResult<TElement> | undefined = undefined;
    
    // Walk up the ancestor chain to find the nearest droppable entry:
    const pointedElement = dragProbeEvent.target as Element;
    for (const candidateElement of iterateElementAndAncestors(pointedElement)) {
        // Find the corresponding droppable entry by its element:
        // - Skip the disabled ones.
        const activeDroppableEntry = droppableRegistry.get(candidateElement);
        if (!activeDroppableEntry || !activeDroppableEntry.dropEnabled) continue;
        
        
        
        // The candidate element becomes the active drop element since it found in the registry:
        const dropElement : Element = candidateElement;
        
        
        
        // Perform handshake on both sides in parallel:
        const {
            dragHandshakeEvent,
            dropHandshakeEvent,
        } = await dispatchHandshakeEvents<TElement>({
            // Event metadata:
            dragProbeEvent,
            dropElement,
            
            // Stable event handlers:
            handleDragHandshake,
            
            // Actual states:
            isMountedRef,
            activeDroppableEntry,
        });
        
        
        
        // Build the negotiation result for the current iteration:
        const negotiationResult : NegotiationResult<TElement> = {
            // Events:
            dragHandshakeEvent,
            dropHandshakeEvent,
            
            // Data:
            activeDroppableEntry,
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
 * Clears the active droppable state when the drag gesture is no longer valid.
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
 */
const clearActiveDroppable                = ({
    // Actual states:
    isMountedRef,
    activeDroppableRef,
    
    // Reactive states:
    setDragStatus,
    setDropMetadata,
}: {
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
    /**
     * The draggable's ref holding the active droppable state.
     */
    activeDroppableRef      : RefObject<ActiveDroppableState | null>
    
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
    // Deactivate the previously active droppable side:
    deactivateDroppable({
        // Data:
        inactiveDropStatus: null, // `null` → drag gesture active but outside this droppable zone.
        
        // Actual states:
        activeDroppableRef,
    });
    
    
    
    // Deactivate the draggable side:
    deactivateDraggable({
        // Data:
        inactiveDragStatus: null, // `null` → drag gesture active but outside all droppable zones.
        
        // Actual states:
        isMountedRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
};

/**
 * Swaps the active droppable state when the target or acceptance changes.
 * 
 * - Skips unnecessary reactivation if both entry and acceptance are unchanged.
 *   Avoids redundant updates when the pointer wiggles inside the same droppable.
 * - Cleans up the previously active droppable (status + payload) when switching entries.
 * - Updates draggable state (status + metadata).
 * - Updates the new active droppable state (status + payload).
 * - Updates both entry and acceptance together in the ref, along with the pointed and drop elements.
 */
const swapActiveDroppable                 = <TElement extends Element = HTMLElement>({
    // Events:
    dragHandshakeEvent,
    dropHandshakeEvent,
    
    // Actual states:
    isMountedRef,
    activeDroppableEntry,
    activeDroppableRef,
    
    // Reactive states:
    setDragStatus,
    setDropMetadata,
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
    /**
     * The droppable entry currently under negotiation.
     */
    activeDroppableEntry    : DroppableEntry<Element>
    /**
     * The draggable's ref holding the active droppable state.
     */
    activeDroppableRef      : RefObject<ActiveDroppableState | null>
    
    // Reactive states:
    /**
     * Updates whether a drag gesture is currently targeting a droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     * - `false`     → drag gesture active over a droppable zone but rejected by one or both sides
     * - `true`      → drag gesture active over a droppable zone and mutually accepted
     */
    setDragStatus           : Dispatch<DraggableState<TElement>['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState<TElement>['dropMetadata']>
}): void => {
    // Determine if both sides accepted:
    // - `undefined` is treated as `false`.
    const isAccepted = !!dragHandshakeEvent.dragResponse && !!dropHandshakeEvent.dropResponse;
    
    
    
    // Skip if both entry and acceptance are unchanged:
    const prevActiveDroppableState = activeDroppableRef.current;
    if ((activeDroppableEntry === prevActiveDroppableState?.entry) && (isAccepted === prevActiveDroppableState.isAccepted)) return;
    
    
    
    // If entry changed, deactivate the previously active droppable side before swapping:
    if (prevActiveDroppableState && (prevActiveDroppableState.entry !== activeDroppableEntry)) {
        deactivateDroppable({
            // Data:
            inactiveDropStatus: null, // `null` → drag gesture active but outside this droppable zone.
            
            // Actual states:
            activeDroppableRef,
        });
    } // if
    
    
    
    // Update both entry and acceptance together, along with the pointed and drop elements:
    activeDroppableRef.current = {
        entry: activeDroppableEntry,
        isAccepted,
        pointedElement : dragHandshakeEvent.target        as Element,
        dropElement    : dragHandshakeEvent.relatedTarget as Element,
    } satisfies ActiveDroppableState;
    
    
    
    // Activate the draggable side:
    activateDraggable({
        // Data:
        isAccepted,
        dropMetadata: activeDroppableEntry.dropMetadata,
        
        // Actual states:
        isMountedRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
    
    
    
    // Activate the droppable side:
    activateDroppable({
        // Data:
        isAccepted,
        dragPayload: dropHandshakeEvent.dragPayload,
        
        // Actual states:
        activeDroppableRef,
    });
};

/**
 * Sets up or cleans up the global drag lifecycle state.
 * 
 * - On setup   : marks the draggable as active and broadcasts active state to all droppables.
 * - On cleanup : resets the draggable to inactive, broadcasts inactive state,
 *   and clears the previously active droppable entry (including payload + acceptance).
 */
export const updateDragLifecycle          = ({
    // Lifecycle configs:
    isSetup,
    
    // Actual states:
    isMountedRef,
    activeDroppableRef,
    
    // Reactive states:
    setDragStatus,
    setDropMetadata,
}: {
    // Lifecycle configs:
    /**
     * Specifies whether to set up (true) or clean up (false) the draggable lifecycle.
     */
    isSetup                 : boolean
    
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
    /**
     * Reference to the currently active droppable state.
     */
    activeDroppableRef      : RefObject<ActiveDroppableState | null>
    
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
    if (!isSetup) {
        // Deactivate the previously active droppable side:
        deactivateDroppable({
            // Data:
            inactiveDropStatus: undefined, // `undefined` → no drag activity at all.
            
            // Actual states:
            activeDroppableRef,
        });
    } // if
    
    
    
    // Deactivate the draggable side:
    deactivateDraggable({
        // Data:
        inactiveDragStatus: isSetup ? null : undefined, // `null` → drag gesture active but outside all droppable zones, `undefined` → no drag activity at all.
        
        // Actual states:
        isMountedRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
    
    // Deactivate the rest droppable sides (broadcast):
    deactivateRestDroppables({
        // Data:
        inactiveDropStatus: isSetup ? null : undefined, // `null` → drag gesture active but outside all droppable zones, `undefined` → no drag activity at all.
        
        // Actual states:
        activeDroppableRef,
    });
};

/**
 * Updates global `pointermove` listener for drag gestures.
 * 
 * - Attaches `pointermove` (probe/evaluation) handler
 *   when drag is active.
 * - Removes it when drag ends.
 */
export const updateGlobalPointerListeners = ({
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
 * - Registers the droppable entry on mount.
 * - Unregisters it on unmount to prevent leaks and stale references.
 * 
 */
export const updateDroppableRegistry      = <TElement extends Element = HTMLElement>({
    // Lifecycle configs:
    isSetup,
    
    // Data:
    dropElement,
    
    // Actual states:
    droppableEntry,
}: {
    // Lifecycle configs:
    /**
     * Specifies whether to set up (true) or clean up (false) the droppable lifecycle.
     */
    isSetup                 : boolean
    
    // Data:
    /**
     * The reference to the DOM element that backing the droppable zone,
     * becomes the key of the registry entry.
     */
    dropElement             : Element
    
    // Actual states:
    /**
     * The droppable entry metadata and callbacks.
     */
    droppableEntry          : DroppableEntry<TElement>
}): void => {
    if (isSetup) {
        droppableRegistry.set(dropElement, droppableEntry as DroppableEntry< Element>);
    }
    else {
        droppableRegistry.delete(dropElement);
    } // if
};

/**
 * Lazily initializes a droppable entry and stores it in the given ref.
 * 
 * - Creates a new entry if none exists.
 * - Reuses the existing entry otherwise.
 * 
 * @returns The current droppable entry (newly created or reused).
 */
export const lazyInitializeDroppableEntry = <TElement extends Element = HTMLElement>({
    // Actual states:
    droppableEntryRef,
    
    // Rest:
    ...initialDroppableEntry
}: DroppableEntry<TElement> & {
    // Actual states:
    /**
     * The droppable's ref holding the current droppable entry.
     */
    droppableEntryRef       : RefObject<DroppableEntry<TElement> | undefined>
}): DroppableEntry<TElement> => {
    const initializedDroppableEntry = droppableEntryRef.current;
    if (initializedDroppableEntry) return initializedDroppableEntry;
    
    
    
    droppableEntryRef.current = initialDroppableEntry;
    return initialDroppableEntry;
};

/**
 * Synchronizes droppable entry flags with the latest props.
 */
export const syncDroppableEntry           = <TElement extends Element = HTMLElement>({
    // Data:
    dropMetadata,
    
    // Behaviors:
    dropEnabled,
    
    // Actual states:
    droppableEntry,
}: Pick<DroppableEntry<TElement>,
    // Data:
    | 'dropMetadata'
    
    // Behaviors:
    | 'dropEnabled'
> & {
    // Actual states:
    /**
     * The droppable entry to update.
     */
    droppableEntry          : DroppableEntry<TElement>
}): void => {
    droppableEntry.dropMetadata = dropMetadata;
    droppableEntry.dropEnabled  = dropEnabled;
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
    // Data:
    dragPayload,
    
    // Refs:
    dragElement,
    lastPointerDownEventRef,
    
    // Behaviors:
    dropPredicate,
    
    // Stable event handlers:
    handleDragActivated,
    
    // Actual states:
    isMountedRef,
    
    // Utility functions:
    isDragReady,
}: Pick<Required<DraggableStateProps<TElement>>,
    // Data:
    | 'dragPayload'
> & Pick<DraggableStateProps<TElement>,
    // Behaviors:
    | 'dropPredicate'
> & {
    // Refs:
    /**
     * The reference to the DOM element that serves as the draggable source.
     */
    dragElement             : TElement | null
    /**
     * A shared reference to the most recent native `pointerdown` event.
     */
    lastPointerDownEventRef : RefObject<PointerEvent | undefined> | undefined,
    
    // Stable event handlers:
    /**
     * Invoked once the drag gesture begins on the draggable side.
     * 
     * Signals the draggable to initialize its own styling, ghost image,
     * or other resources tied to the drag activity lifecycle.
     */
    handleDragActivated     : Required<DraggableStateProps<TElement>>['onDragActivated']
    
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
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
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
    const pointedElement = resolvePointedElement(lastPointerDownEvent, dropPredicate);
    
    
    
    // Dispatch the initial activation events:
    const dragDropActivatedEvent = createDragDropActivatedEvent<TElement>({
        // Event metadata:
        lastPointerDownEvent,
        dragElement,
        pointedElement,
        
        // Data:
        dragPayload,
    });
    dispatchActivatedEvents<TElement>({
        // Event metadata:
        dragDropActivatedEvent,
        
        // Stable event handlers:
        handleDragActivated,
        
        // Actual states:
        isMountedRef,
    });
};

/**
 * Processes the drag-drop deactivation operation when a drag gesture ends.
 * 
 * - Validates drag context.
 * - Dispatches final `DragDeactivatedEvent` for the draggable side.
 * - Dispatches `DragAbsenceEvent` for the droppable side (active and broadcast).
 * - Clears the active droppable reference and its bundled data.
 */
export const processDragDropDeactivate = <TElement extends Element = HTMLElement>({
    // Data:
    dragPayload,
    
    // Refs:
    dragElement,
    activeDroppableRef,
    lastPointerUpEventRef,
    
    // Stable event handlers:
    handleDragDeactivated,
    
    // Actual states:
    isMountedRef,
    
    // Utility functions:
    isDragReady,
}: Pick<Required<DraggableStateProps<TElement>>,
    // Data:
    | 'dragPayload'
> & {
    // Refs:
    /**
     * The reference to the DOM element that serves as the draggable source.
     */
    dragElement             : TElement | null
    /**
     * The draggable's ref holding the active droppable state.
     */
    activeDroppableRef      : RefObject<ActiveDroppableState | null>
    /**
     * A shared reference to the most recent native `pointerup` event.
     */
    lastPointerUpEventRef   : RefObject<PointerEvent | undefined> | undefined,
    
    // Stable event handlers:
    /**
     * Invoked once the drag gesture ends on the draggable side.
     * 
     * Signals the draggable to reset its own styling, ghost image,
     * or other resources tied to the drag activity lifecycle.
     */
    handleDragDeactivated   : Required<DraggableStateProps<TElement>>['onDragDeactivated']
    
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
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
}): void => {
    // Capture and clear the active droppable reference and its bundled data:
    const activeDroppableState = activeDroppableRef.current;
    activeDroppableRef.current = null;
    
    
    
    // Abort deactivate if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    // - No pointerup event was captured.
    const lastPointerUpEvent = lastPointerUpEventRef?.current;
    if (!isDragReady() || !lastPointerUpEvent) return;
    
    
    
    // Extract properties from the active droppable state for convenience:
    // - Defaults all properties to null if no active droppable state.
    const {
        entry : activeDroppableEntry,
        pointedElement,
        dropElement,
    } = activeDroppableState ?? {
        entry          : null,
        pointedElement : null,
        dropElement    : null
    };
    
    
    
    // Dispatch the final deactivation events:
    const dragDropDeactivatedEvent = createDragDropDeactivatedEvent<TElement>({
        // Event metadata:
        lastPointerUpEvent,
        dragElement,
        pointedElement,
        dropElement,
        
        // Data:
        dragPayload,
    });
    dispatchDeactivatedEvents<TElement>({
        // Event metadata:
        dragDropDeactivatedEvent,
        
        // Data:
        activeDroppableEntry,
        
        // Stable event handlers:
        handleDragDeactivated,
        
        // Actual states:
        isMountedRef,
    });
};

/**
 * Processes a drag probe during pointer movement.
 * 
 * - Resolves the pointed element under the cursor.
 * - Initiates handshake negotiation between draggable and droppable.
 * - Dispatches evaluation events.
 * - Updates the active droppable state when the target or acceptance changes.
 */
export const processDragProbe          = async <TElement extends Element = HTMLElement>({
    // Events:
    pointerMoveEvent,
    
    // Data:
    dragPayload,
    
    // Refs:
    dragElement,
    activeDroppableRef,
    
    // Behaviors:
    dropPredicate,
    
    // Stable event handlers:
    handleDragHandshake,
    handleDragEvaluation,
    
    // Actual states:
    isMountedRef,
    
    // Reactive states:
    setDragStatus,
    setDropMetadata,
    
    // Utility functions:
    isDragReady,
}: Pick<Required<DraggableStateProps<TElement>>,
    // Data:
    | 'dragPayload'
> & Pick<DraggableStateProps<TElement>,
    // Behaviors:
    | 'dropPredicate'
> & {
    // Events:
    /**
     * The originating native 'pointermove' event from the browser.
     */
    pointerMoveEvent        : PointerEvent
    
    // Refs:
    /**
     * The reference to the DOM element that serves as the draggable source.
     */
    dragElement             : TElement | null
    /**
     * The draggable's ref holding the active droppable state.
     */
    activeDroppableRef      : RefObject<ActiveDroppableState | null>
    
    // Stable event handlers:
    /**
     * Invoked continuously on every pointer movement during drag gesture movements
     * while the draggable hovers over a droppable.
     * 
     * Allows the draggable to validate the target's business context (metadata) and responds with acceptance or rejection.
     */
    handleDragHandshake     : (event: DragHandshakeEvent<TElement>) => Promise<void>
    /**
     * Invoked continuously on every pointer movement after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     * 
     * Enables live feedback from the draggable side during a drag gesture,
     * such as "drop here" indicators, cursor changes,
     * or other contextual hints.
     */
    handleDragEvaluation    : Required<DraggableStateProps<TElement>>['onDragEvaluation']
    
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
    setDragStatus           : Dispatch<DraggableState<TElement>['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState<TElement>['dropMetadata']>
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
}): Promise<void> => {
    // Abort probing if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    if (!isDragReady()) {
        clearActiveDroppable({
            // Actual states:
            isMountedRef,
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
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
        dragElement,
        pointedElement,
        
        // Data:
        dragPayload,
    });
    
    
    
    // If no element under the pointer → "no contact":
    if (!pointedElement) {
        clearActiveDroppable({
            // Actual states:
            isMountedRef,
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        // Dispatch "no contact" evaluation events:
        dispatchEvaluationEvents<TElement>({
            // Event metadata:
            dragHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            dropHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            
            // Data:
            activeDroppableEntry : null, // All droppables are inactive due to no contact.
            
            // Stable event handlers:
            handleDragEvaluation,
            
            // Actual states:
            isMountedRef,
        });
        
        return;
    } // if
    
    
    
    // Initiate handshake negotiation between draggable and droppable:
    const negotiationResult = await attemptNegotiation<TElement>({
        // Events:
        dragProbeEvent,
        
        // Stable event handlers:
        handleDragHandshake,
        
        // Actual states:
        isMountedRef,
    });
    
    
    
    // After await completion, abort probing if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    // - Droppable is disabled (if has negotiation).
    if (!isDragReady() || (negotiationResult && !negotiationResult.activeDroppableEntry.dropEnabled)) {
        clearActiveDroppable({
            // Actual states:
            isMountedRef,
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        return;
    } // if
    
    
    
    // No negotiation → assume as "no contact":
    if (!negotiationResult) {
        clearActiveDroppable({
            // Actual states:
            isMountedRef,
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        // Dispatch "no contact" evaluation events:
        dispatchEvaluationEvents<TElement>({
            // Event metadata:
            dragHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            dropHandshakeEvent   : dragProbeEvent, // No handshake was performed (no contact) → fallback to probe event.
            
            // Data:
            activeDroppableEntry : null, // All droppables are inactive due to no contact.
            
            // Stable event handlers:
            handleDragEvaluation,
            
            // Actual states:
            isMountedRef,
        });
        
        return;
    } // if
    
    
    
    // Extract negotiation results and droppable entry for convenience:
    const {
        // Events:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Data:
        activeDroppableEntry,
    } = negotiationResult;
    
    
    
    // Dispatch evaluation events:
    dispatchEvaluationEvents<TElement>({
        // Event metadata:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Data:
        activeDroppableEntry,
        
        // Stable event handlers:
        handleDragEvaluation,
        
        // Actual states:
        isMountedRef,
    });
    
    
    
    // Update the active droppable entry when the pointed target changes:
    swapActiveDroppable<TElement>({
        // Events:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Actual states:
        isMountedRef,
        activeDroppableEntry,
        activeDroppableRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
};

/**
 * Processes the drag-drop commit operation when the lifecycle ends.
 * 
 * - Validates drag context and acceptance.
 * - Dispatches final dragged/dropped events.
 */
export const processDragDropCommit     = <TElement extends Element = HTMLElement>({
    // Data:
    dragPayload,
    
    // Refs:
    dragElement,
    activeDroppableRef,
    lastPointerUpEventRef,
    
    // Stable event handlers:
    handleDragged,
    
    // Actual states:
    isMountedRef,
    
    // Utility functions:
    isDragReady,
}: Pick<Required<DraggableStateProps<TElement>>,
    // Data:
    | 'dragPayload'
> & {
    // Refs:
    /**
     * The reference to the DOM element that serves as the draggable source.
     */
    dragElement             : TElement | null
    /**
     * The draggable's ref holding the active droppable state.
     */
    activeDroppableRef      : RefObject<ActiveDroppableState | null>
    /**
     * A shared reference to the most recent native `pointerup` event.
     */
    lastPointerUpEventRef   : RefObject<PointerEvent | undefined> | undefined,
    
    // Stable event handlers:
    /**
     * Invoked once the drag gesture ends on this draggable
     * but only if both draggable and droppable sides accepted.
     * 
     * Allows the draggable to peek the target's business context (metadata) for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDragged           : Required<DraggableStateProps<TElement>>['onDragged']
    
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
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
}): void => {
    // Abort commit if:
    // - Draggable element is missing.
    // - Draggable is unmounted.
    // - Draggable is disabled.
    // - No pointerup event was captured.
    // - No active droppable was accepted during the drag gesture.
    const lastPointerUpEvent = lastPointerUpEventRef?.current;
    const activeDroppableState = activeDroppableRef.current;
    if (!isDragReady() || !lastPointerUpEvent || !activeDroppableState?.isAccepted) return;
    
    
    
    // Extract properties from the active droppable state for convenience:
    const {
        entry : activeDroppableEntry,
        pointedElement,
        dropElement,
    } = activeDroppableState;
    const {
        dropMetadata,
    } = activeDroppableEntry;
    
    
    
    // Dispatch the final commit events:
    const dragDropCommittedEvent = createDragDropCommittedEvent<TElement>({
        // Event metadata:
        lastPointerUpEvent,
        dragElement,
        pointedElement,
        dropElement,
        
        // Data:
        dragPayload,
        dropMetadata,
    });
    dispatchCommittedEvents<TElement>({
        // Event metadata:
        dragDropCommittedEvent,
        
        // Stable event handlers:
        handleDragged,
        
        // Actual states:
        isMountedRef,
        activeDroppableEntry,
    });
};
