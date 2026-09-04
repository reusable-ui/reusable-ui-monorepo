// React:
import {
    // Types:
    type PointerEvent as ReactPointerEvent,
    type Dispatch,
    type RefObject,
}                           from 'react'

// Types:
import {
    // Data:
    type DragPayload,
    
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
}                           from './internal-types.js'

// Utilities:
import {
    droppableRegistry,
}                           from './internal-registry.js'
import {
    // Event factories:
    createDragProbeEvent,
    createDragDropCommittedEvent,
    
    // Event dispatchers:
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
    
    // Data:
    dragPayload,
    
    // Stable event handlers:
    handleDragHandshake,
}: {
    // Events:
    /**
     * The originating probe event.
     */
    dragProbeEvent          : ReactPointerEvent<TElement>
    
    // Data:
    /**
     * Carries the actual data being dragged (payload) from the draggable source.
     */
    dragPayload             : DragPayload
    
    // Stable event handlers:
    /**
     * Invoked continuously during drag gesture movements
     * while the draggable hovers over a droppable.
     * 
     * Allows the draggable to validate the target's business context (metadata) and responds with acceptance or rejection.
     */
    handleDragHandshake     : (event: DragHandshakeEvent<TElement>) => Promise<void>
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
        
        // Destructure some properties for easier access:
        const {
            dropMetadata,
            handleDropHandshake,
        } = activeDroppableEntry;
        
        
        
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
            
            // Data:
            dragPayload,
            dropMetadata,
            
            // Stable event handlers:
            handleDragHandshake,
            handleDropHandshake,
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
 * - Clears the active droppable reference and its bundled data.
 * - Clears the draggable's status to `null` (drag gesture active but outside any droppable zone).
 * - Clears the draggable's metadata.
 */
const clearActiveDroppable               = ({
    // Actual states:
    activeDroppableRef,
    
    // Reactive states:
    setDragStatus,
    setDropMetadata,
}: {
    // Actual states:
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
    setDragStatus           : Dispatch<DraggableState['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState['dropMetadata']>
}): void => {
    // Skip if no active droppable exists:
    const prevState = activeDroppableRef.current;
    if (prevState) {
        // Clear the previously active droppable entry and its bundled data:
        prevState.entry.setDropStatus(null);       // Drag gesture active but outside any droppable zone.
        prevState.entry.setDragPayload(undefined); // Clear payload.
        activeDroppableRef.current = null;         // Clear active droppable reference and its bundled data.
    } // if
    
    
    
    // Clear draggable state (draggable side):
    setDragStatus(null);        // Drag gesture active but outside any droppable zone.
    setDropMetadata(undefined); // Clear metadata.
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
const swapActiveDroppable               = <TElement extends Element = HTMLElement>({
    // Events:
    dragHandshakeEvent,
    dropHandshakeEvent,
    
    // Actual states:
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
    setDragStatus           : Dispatch<DraggableState['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState['dropMetadata']>
}): void => {
    // Determine if both sides accepted:
    // - `undefined` is treated as `false`.
    const isAccepted = !!dragHandshakeEvent.dragResponse && !!dropHandshakeEvent.dropResponse;
    
    
    
    // Skip if both entry and acceptance are unchanged:
    const prevState = activeDroppableRef.current;
    if ((activeDroppableEntry === prevState?.entry) && (isAccepted === prevState.isAccepted)) return;
    
    
    
    // If entry changed, cleanup previous droppable (droppable side):
    if (prevState && (prevState.entry !== activeDroppableEntry)) {
        prevState.entry.setDropStatus(null);       // Drag gesture active but outside this zone.
        prevState.entry.setDragPayload(undefined); // Clear payload.
    } // if
    
    
    
    // Update draggable state (draggable side):
    setDragStatus(isAccepted);
    setDropMetadata(isAccepted ? activeDroppableEntry.dropMetadata : undefined);
    
    
    
    // Update the new active droppable state (droppable side):
    activeDroppableEntry.setDropStatus(isAccepted);
    activeDroppableEntry.setDragPayload(isAccepted ? dropHandshakeEvent.dragPayload : undefined);
    
    
    
    // Update both entry and acceptance together, along with the pointed and drop elements:
    activeDroppableRef.current = {
        entry: activeDroppableEntry,
        isAccepted,
        pointedElement : dragHandshakeEvent.target        as Element,
        dropElement    : dragHandshakeEvent.relatedTarget as Element,
    } satisfies ActiveDroppableState;
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
    setDragStatus           : Dispatch<DraggableState['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState['dropMetadata']>
}): void => {
    // Mark draggable as active (null) or inactive (undefined):
    setDragStatus(isSetup ? null : undefined);
    
    // Clear metadata at both setup and cleanup:
    setDropMetadata(undefined);
    
    // Broadcast active/inactive state to all droppables:
    for (const droppableEntry of droppableRegistry.values()) {
        droppableEntry.setDropStatus(isSetup ? null : undefined);
    } // for
    
    
    
    if (!isSetup) {
        // Clear the previously active droppable entry and its bundled data:
        const prevState = activeDroppableRef.current;
        if (prevState) {
            prevState.entry.setDragPayload(undefined); // Clear payload.
            activeDroppableRef.current = null;         // Clear active droppable reference and its bundled data.
        } // if
    } // if
};

/**
 * Updates global pointer listeners for drag gestures.
 * 
 * - Attaches `pointermove` (probe/evaluation) and `pointerup` (candidate/commit) handlers
 *   when drag is active.
 * - Removes them when drag ends.
 */
export const updateGlobalPointerListeners = ({
    // Lifecycle configs:
    isSetup,
    
    // Stable event handlers:
    handleGlobalPointerMove,
    handleGlobalPointerUp,
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
    handleGlobalPointerMove : (event: PointerEvent) => void
    /**
     * Invoked once a pointer is released.
     * 
     * Allows the drag-drop engine to trigger dragged and dropped events correctly.
     */
    handleGlobalPointerUp   : (event: PointerEvent) => void
}): void => {
    if (isSetup) {
        window.addEventListener('pointermove', handleGlobalPointerMove);
        window.addEventListener('pointerup'  , handleGlobalPointerUp);
    }
    else {
        window.removeEventListener('pointermove', handleGlobalPointerMove);
        window.removeEventListener('pointerup'  , handleGlobalPointerUp);
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
    const droppableEntry = droppableEntryRef.current;
    if (droppableEntry) return droppableEntry;
    
    
    
    droppableEntryRef.current = initialDroppableEntry;
    return initialDroppableEntry;
};

/**
 * Synchronizes droppable entry flags with the latest props.
 */
export const syncDroppableEntry           = <TElement extends Element = HTMLElement>({
    // Actual states:
    droppableEntry,
    
    // Data:
    dropMetadata,
    
    // Behaviors:
    dropEnabled,
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
 * Processes a drag probe during pointer movement.
 * 
 * - Resolves the pointed element under the cursor.
 * - Initiates handshake negotiation between draggable and droppable.
 * - Dispatches evaluation events.
 * - Updates the active droppable state when the target or acceptance changes.
 */
export const processDragProbe      = async <TElement extends Element = HTMLElement>({
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
     * Invoked continuously during drag gesture movements
     * while the draggable hovers over a droppable.
     * 
     * Allows the draggable to validate the target's business context (metadata) and responds with acceptance or rejection.
     */
    handleDragHandshake     : (event: DragHandshakeEvent<TElement>) => Promise<void>
    /**
     * Invoked continuously after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     * 
     * Enables live feedback from the draggable side during a drag gesture,
     * such as "drop here" indicators, cursor changes,
     * or other contextual hints.
     */
    handleDragEvaluation    : Required<DraggableStateProps<TElement>>['onDragEvaluation']
    
    // Reactive states:
    /**
     * Updates whether a drag gesture is currently targeting a droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     * - `false`     → drag gesture active over a droppable zone but rejected by one or both sides
     * - `true`      → drag gesture active over a droppable zone and mutually accepted
     */
    setDragStatus           : Dispatch<DraggableState['dragStatus'  ]>
    /**
     * Updates the exposed metadata from the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata         : Dispatch<DraggableState['dropMetadata']>
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
}): Promise<void> => {
    // Abort probing if:
    // - Draggable element is missing.
    // - Component has been unmounted.
    // - Draggable is disabled.
    if (!isDragReady()) {
        clearActiveDroppable({
            // Actual states:
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        return;
    } // if
    
    // Now the `dragElement` here is not null
    
    // Resolve the top-most element under the cursor:
    // - Ignore the "ghost dragging image".
    const pointedElement = resolvePointedElement(pointerMoveEvent, dropPredicate);
    // No element under the pointer → abort:
    if (!pointedElement) {
        clearActiveDroppable({
            // Actual states:
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        return;
    } // if
    
    
    
    // Initiate handshake negotiation between draggable and droppable:
    const dragProbeEvent = createDragProbeEvent<TElement>({
        // Event metadata:
        pointerMoveEvent,
        dragElement,
        pointedElement,
    });
    const negotiationResult = await attemptNegotiation<TElement>({
        // Events:
        dragProbeEvent,
        
        // Data:
        dragPayload,
        
        // Stable event handlers:
        handleDragHandshake,
    });
    // No negotiation → abort:
    if (!negotiationResult) {
        clearActiveDroppable({
            // Actual states:
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
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
    
    
    
    // Abort evaluation if:
    // - Draggable element is missing.
    // - Component has been unmounted during async wait.
    // - Draggable is disabled.
    // - Droppable is disabled.
    if (!isDragReady() || !activeDroppableEntry.dropEnabled) {
        clearActiveDroppable({
            // Actual states:
            activeDroppableRef,
            
            // Reactive states:
            setDragStatus,
            setDropMetadata,
        });
        
        return;
    } // if
    
    
    
    // Dispatch evaluation events:
    dispatchEvaluationEvents<TElement>({
        // Event metadata:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Data:
        activeDroppableEntry,
        
        // Stable event handlers:
        handleDragEvaluation,
    });
    
    
    
    // Update the active droppable entry when the pointed target changes:
    swapActiveDroppable<TElement>({
        // Events:
        dragHandshakeEvent,
        dropHandshakeEvent,
        
        // Actual states:
        activeDroppableEntry,
        activeDroppableRef,
        
        // Reactive states:
        setDragStatus,
        setDropMetadata,
    });
};

/**
 * Processes a drop candidate on pointer release.
 * 
 * - Captures the most recent pointerup event for later commit.
 */
export const processDropCandidate  = ({
    // Events:
    pointerUpEvent,
    
    // Refs:
    activeDroppableRef,
    
    // Utility functions:
    isDragReady,
}: {
    // Events:
    /**
     * The originating native 'pointerup' event from the browser during a drag gesture.
     */
    pointerUpEvent          : PointerEvent
    
    // Refs:
    /**
     * The draggable's ref holding the active droppable state.
     */
    activeDroppableRef      : RefObject<ActiveDroppableState | null>
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
}): void => {
    // Do not capturing event if:
    // - Draggable element is missing.
    // - Component has been unmounted.
    // - Draggable is disabled.
    // - No active droppable was accepted during the drag gesture.
    const activeDroppableState = activeDroppableRef.current;
    if (!isDragReady() || !activeDroppableState?.isAccepted) return;
    
    
    
    // Capture the most recent pointerup event for later commit.
    activeDroppableState.lastPointerUpEvent = pointerUpEvent;
};

/**
 * Processes the drag-drop commit operation when the lifecycle ends.
 * 
 * - Validates drag context and acceptance.
 * - Dispatches final dragged/dropped events.
 * - Clears the captured pointerup event to prevent duplicate commits.
 */
export const processDragDropCommit = <TElement extends Element = HTMLElement>({
    // Data:
    dragPayload,
    
    // Refs:
    dragElement,
    activeDroppableRef,
    
    // Stable event handlers:
    handleDragged,
    
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
    
    // Stable event handlers:
    /**
     * Invoked once the drag gesture ends on this draggable
     * but only if both draggable and droppable sides accepted.
     * 
     * Allows the draggable to peek the target's business context (metadata) for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDragged           : Required<DraggableStateProps<TElement>>['onDragged']
    
    // Utility functions:
    /**
     * Determines whether the draggable state is valid for dragging operation.
     */
    isDragReady             : () => boolean
}): void => {
    // Abort commit if:
    // - Draggable element is missing.
    // - Component has been unmounted.
    // - Draggable is disabled.
    // - No active droppable was accepted during the drag gesture.
    // - No pointerup event was captured.
    const activeDroppableState = activeDroppableRef.current;
    if (!isDragReady() || !activeDroppableState?.isAccepted || !activeDroppableState.lastPointerUpEvent) return;
    
    
    
    // Extract properties from the active droppable state for convenience:
    const {
        entry : {
            dropMetadata,
            handleDropped,
        },
        pointedElement,
        dropElement,
        lastPointerUpEvent,
    } = activeDroppableState;
    
    
    
    // Dispatch the final commit events:
    const dragDropCommittedEvent = createDragDropCommittedEvent<TElement>({
        // Event metadata:
        lastPointerUpEvent,
        dragElement,
        pointedElement,
        dropElement,
    });
    dispatchCommittedEvents<TElement>({
        // Event metadata:
        dragDropCommittedEvent,
        
        // Data:
        dragPayload,
        dropMetadata,
        
        // Stable event handlers:
        handleDragged,
        handleDropped,
    });
    
    
    
    // Clear the captured pointerup event after commit:
    // - Prevents accidentally emitting multiple dragged/dropped events.
    activeDroppableState.lastPointerUpEvent = undefined;
};
