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
    type DragPresenceEvent,
    type DragAbsenceEvent,
    
    // Handshakes:
    type DropHandshakeEvent,
    
    // Evaluations:
    type DropEvaluationEvent,
    
    // Commits:
    type DroppedEvent,
    
    // Reactive states:
    type DroppableState,
}                           from './types.js'



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
    
    
    
    // Interaction states:
    
    /**
     * Indicating whether both draggable and droppable sides accepted.
     * 
     * Used at the commit stage (pointerup) to decide
     * if `DraggedEvent` and `DroppedEvent` should be dispatched.
     * 
     * Becomes `undefined` if no drag-drop handshake was performed.
     */
    isAccepted           : boolean | undefined
    
    /**
     * The element currently pointed by the drag gesture.
     * 
     * Becomes `null` if the pointed element is not available,
     * e.g. when the drag gesture is outside any droppable.
     */
    pointedElement       : Element | null
    
    /**
     * The droppable element currently active.
     * 
     * Becomes `null` if the droppable element is not available,
     * e.g. when the drag gesture is outside any droppable.
     */
    dropElement          : Element | null
    
    
    
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
