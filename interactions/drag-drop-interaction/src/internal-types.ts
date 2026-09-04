// React:
import {
    // Types:
    type Dispatch,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Types:
    type EventHandler,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Types:
import {
    // Data:
    type DropMetadata,
    
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
 * A registry entry representing a single droppable zone.
 * 
 * Stored in the global registry so the engine can resolve hit-testing,
 * handshake negotiation, evaluation feedback,
 * and final drop delivery.
 */
export interface DroppableEntry<TElement extends Element = HTMLElement> {
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
     * Invoked continuously during drag gesture movements
     * while a draggable hovers over this droppable.
     * 
     * Allows the droppable to validate the draggable's payload and responds with acceptance or rejection.
     */
    handleDropHandshake  : (event: DropHandshakeEvent<TElement>) => Promise<void>
    
    /**
     * Invoked continuously after handshake negotiation,
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
    
    
    
    // Reactive states:
    
    /**
     * Updates whether a drag gesture is currently targeting this droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside this zone, or either side has not responded
     * - `false`     → drag gesture active over this zone but rejected by one or both sides
     * - `true`      → drag gesture active over this zone and mutually accepted
     */
    setDropStatus        : Dispatch<DroppableState['dropStatus' ]>
    
    /**
     * Updates the exposed payload from the draggable source
     * currently hovering over this droppable.
     */
    setDragPayload       : Dispatch<DroppableState['dragPayload']>
}



/**
 * Represents the currently active droppable state.
 * 
 * Bundles the droppable entry, acceptance status, and the
 * DOM elements needed to construct the committed event.
 */
export interface ActiveDroppableState {
    /**
     * References to currently active droppable entry.
     * 
     * Used for cleanup when switching to another droppable
     * or when unmounting.
     */
    entry               : DroppableEntry< Element>
    
    /**
     * Indicating whether both draggable and droppable sides accepted.
     * 
     * Used at the commit stage (pointerup) to decide
     * if `DraggedEvent` and `DroppedEvent` should be dispatched.
     */
    isAccepted          : boolean
    
    /**
     * The element currently pointed by the drag gesture.
     */
    pointedElement      : Element
    
    /**
     * The droppable element currently active.
     */
    dropElement         : Element
    
    /**
     * The most recent native 'pointerup' event from the browser captured during a drag gesture.
     */
    lastPointerUpEvent ?: PointerEvent
}
