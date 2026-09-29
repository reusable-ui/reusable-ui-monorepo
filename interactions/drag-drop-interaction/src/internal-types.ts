// React:
import {
    // Types:
    type Dispatch,
    type PointerEvent as ReactPointerEvent,
    type RefObject,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Types:
    type EventHandler,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Types:
import {
    // Data:
    type DragPayload,
    type DropMetadata,
    
    // Lifecycles:
    type DragActivatedEvent,
    type DragPresenceEvent,
    type DragDeactivatedEvent,
    type DragAbsenceEvent,
    
    // Handshakes:
    type DragHandshakeEvent,
    type DropHandshakeEvent,
    
    // Evaluations:
    type DragEvaluationEvent,
    type DropEvaluationEvent,
    
    // Commits:
    type DraggedEvent,
    type DroppedEvent,
    
    // Reactive states:
    type DraggableState,
    type DroppableState,
}                           from './types.js'



/**
 * Represents the current interaction between a draggable and a droppable.
 * 
 * Stores the interaction state between the draggable side and the
 * currently active droppable side.
 * 
 * A drag session is created when a draggable successfully identifies a
 * droppable candidate and begins the handshake/evaluation process.
 */
export interface DragSession {
    /**
     * The active droppable side participating in this session.
     * 
     * Represents the droppable that participated in the
     * handshake, evaluation, and commit process with the current draggable.
     * 
     * Provides access to the droppable's metadata, handlers,
     * and runtime state for inspection and manipulation during
     * the lifetime of this drag-drop interaction.
    */
    droppable      : DroppableContext< Element>
    
    /**
     * Indicates whether both draggable and droppable sides have mutually
     * accepted the current interaction.
     * 
     * Used during drop commit stage (pointerup) to determine whether
     * `DraggedEvent` and `DroppedEvent` should be dispatched.
     */
    isAccepted     : boolean
    
    /**
     * The deepest DOM element currently pointed by the drag gesture.
     * 
     * This may be the droppable element itself or one of its descendants.
     * 
     * Useful for constructing synthetic events whose
     * `target` reflects the actual element under the pointer.
     */
    pointedElement : Element
    
    /**
     * The active droppable element associated with this session.
     * 
     * Represents the droppable zone that participated in the
     * handshake, evaluation, and commit process with the current draggable.
     * 
     * Useful for constructing synthetic events whose
     * `relatedTarget` or `currentTarget` references the accepted droppable zone.
     */
    dropElement    : Element
}

/**
 * Represents the draggable side of a drag-drop interaction.
 * 
 * Exposes the draggable's payload, handlers, and runtime state
 * for inspection and manipulation by the drag-drop engine.
 */
export interface DraggableContext<TElement extends Element = HTMLElement> {
    // Data:
    
    /**
     * The exposed payload of this draggable source.
     * 
     * Will be inspected by droppables during handshake negotiation.
     */
    dragPayload           : DragPayload
    
    
    
    // Behaviors:
    
    /**
     * The exposed flag indicating whether this draggable is currently active
     * and able to participate in drag-drop interactions.
     */
    dragEnabled           : boolean
    
    /**
     * Filters candidate elements to determine valid drop targets.
     */
    dropPredicate         : ((dropCandidate: Element) => boolean) | undefined
    
    
    
    // Stable event handlers:
    
    /**
     * Invoked once the drag gesture begins on the draggable side.
     * 
     * Signals the draggable to initialize its own styling, ghost image,
     * or other resources tied to the drag activity lifecycle.
     */
    handleDragActivated   : EventHandler<DragActivatedEvent<TElement>>
    
    /**
     * Invoked once the drag gesture ends on the draggable side.
     * 
     * Signals the draggable to reset its own styling, ghost image,
     * or other resources tied to the drag activity lifecycle.
     */
    handleDragDeactivated : EventHandler<DragDeactivatedEvent<TElement>>
    
    /**
     * Invoked continuously on every pointer movement during drag gesture movements
     * while this draggable hovers over a droppable.
     * 
     * Allows the draggable to validate the droppable's metadata and responds with acceptance or rejection.
     */
    handleDragHandshake   : (event: DragHandshakeEvent<TElement>) => Promise<void>
    
    /**
     * Invoked continuously on every pointer movement after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     * 
     * Enables live feedback from the draggable side during a drag gesture,
     * such as "drop here" indicators, cursor changes,
     * or other contextual hints.
     */
    handleDragEvaluation  : EventHandler<DragEvaluationEvent<TElement>>
    
    /**
     * Invoked once the drag gesture ends on this draggable side,
     * but only if both draggable and droppable sides accepted.
     * 
     * Peeks the droppable's metadata for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDragged         : EventHandler<DraggedEvent<TElement>>
    
    
    
    // Actual states:
    
    /**
     * Tests whether the draggable component is still mounted:
     * - `undefined`: The draggable has not yet mounted.
     * - `true`: The draggable is still mounted.
     * - `false`: The draggable has been unmounted.
     * 
     * Prevents accidental state updates after unmounted.
     * E.g., deactivating the currently active draggable side (but now unmounted) when leaving a draggable.
     */
    isMountedRef          : RefObject<boolean | undefined>
    
    /**
     * The reference to the DOM element that serves as the draggable source.
     */
    dragElementRef        : RefObject<TElement | null>
    
    /**
     * The current drag-drop interaction session.
     * 
     * Stores the interaction state between this draggable side and the
     * currently active droppable side.
     * 
     * Becomes `null` when:
     * - No drag gesture is active.
     * - The pointer is outside any droppable zone.
     * - No droppable side has participated in the handshake process.
     */
    dragSession           : DragSession | null
    
    
    
    // Reactive states:
    
    /**
     * Updates whether a drag gesture is currently targeting a droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     * - `false`     → drag gesture active over a droppable zone but rejected by one or both sides
     * - `true`      → drag gesture active over a droppable zone and mutually accepted
     */
    setDragStatus         : Dispatch<DraggableState<TElement>['dragStatus'  ]>
    
    /**
     * Updates the exposed metadata of the droppable target
     * currently hovered by this draggable.
     */
    setDropMetadata       : Dispatch<DraggableState<TElement>['dropMetadata']>
    
    
    
    // Utility functions:
    isDragReady           : () => boolean
}

/**
 * Represents the droppable side of a drag-drop interaction.
 * 
 * Exposes the droppable's metadata, handlers, and runtime state
 * for inspection and manipulation by the drag-drop engine.
 */
export interface DroppableContext<TElement extends Element = HTMLElement> {
    // Data:
    
    /**
     * The exposed metadata of this droppable target.
     * 
     * Will be inspected by draggables during handshake negotiation.
     */
    dropMetadata         : DropMetadata
    
    
    
    // Behaviors:
    
    /**
     * The exposed flag indicating whether this droppable is currently active
     * and able to participate in drag-drop interactions.
     */
    dropEnabled          : boolean
    
    
    
    // Stable event handlers:
    
    /**
     * Invoked once the drag gesture begins on each droppable side.
     * 
     * Signals droppables to initialize their own styling, image preview,
     * or other resources tied to the drag activity lifecycle.
     */
    handleDragPresence   : EventHandler<DragPresenceEvent<TElement>>
    
    /**
     * Invoked once the drag gesture ends on each droppable side.
     * 
     * Signals droppables to reset their own styling, image preview,
     * or other resources tied to the drag activity lifecycle.
     */
    handleDragAbsence    : EventHandler<DragAbsenceEvent<TElement>>
    
    /**
     * Invoked continuously on every pointer movement during drag gesture movements
     * while a draggable hovers over this droppable.
     * 
     * Allows the droppable to validate the draggable's payload and responds with acceptance or rejection.
     */
    handleDropHandshake  : (event: DropHandshakeEvent<TElement>) => Promise<void>
    
    /**
     * Invoked continuously on every pointer movement after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     * 
     * Enables live feedback from the droppable side during a drag gesture,
     * such as "drop here" highlights, glow effects,
     * or other contextual hints.
     */
    handleDropEvaluation : EventHandler<DropEvaluationEvent<TElement>>
    
    /**
     * Invoked once the drag gesture ends on this droppable side,
     * but only if both draggable and droppable sides accepted.
     * 
     * Delivers the draggable's payload for the business logic
     * such as updating state, persisting data, or triggering side effects.
     */
    handleDropped        : EventHandler<DroppedEvent<TElement>>
    
    
    
    // Actual states:
    
    /**
     * Tests whether the droppable component is still mounted:
     * - `undefined`: The droppable has not yet mounted.
     * - `true`: The droppable is still mounted.
     * - `false`: The droppable has been unmounted.
     * 
     * Prevents accidental state updates after unmounted.
     * E.g., deactivating the previously active droppable side (but now unmounted) when switching to another droppable.
     */
    isMountedRef         : RefObject<boolean | undefined>
    
    
    
    // Reactive states:
    
    /**
     * Updates whether a drag gesture is currently targeting this droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside this zone, or either side has not responded
     * - `false`     → drag gesture active over this zone but rejected by one or both sides
     * - `true`      → drag gesture active over this zone and mutually accepted
     */
    setDropStatus        : Dispatch<DroppableState<TElement>['dropStatus' ]>
    
    /**
     * Updates the exposed payload from the draggable source
     * currently hovering over this droppable.
     */
    setDragPayload       : Dispatch<DroppableState<TElement>['dragPayload']>
}



// Probings:

/**
 * Emitted continuously on every pointer movement during a drag gesture.
 * 
 * Carries the current pointer position and the draggable's payload.
 * 
 * Used for hit-testing for searching the top-most droppable under the pointer.
 */
export interface DragProbeEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        ReactPointerEvent<TElement>
{
    /**
     * The payload associated with the current drag gesture.
     */
    readonly dragPayload  : DragPayload
}
