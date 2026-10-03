// Types:
import {
    // Data:
    type DroppableContext,
}                           from './internal-types.js'



/**
 * Global registry of droppable contexts, keyed by their backing DOM element.
 * 
 * Each registered context represents the droppable side of a drag-drop interaction
 * and exposes the metadata, handlers, and runtime state required by the drag-drop engine.
 * 
 * During the probing process, the engine walks the hovered element's ancestor chain
 * and consults this registry to resolve the nearest registered droppable zone.
 * 
 * A pointer is considered inside a droppable zone if it is over:
 * - the droppable element itself, or
 * - any of its descendant elements in the DOM tree.
 * 
 * Note:
 * Children rendered through React Portal are not considered descendants.
 * If portal content should participate as a droppable zone,
 * its container must be registered separately.
 */
export const droppableRegistry = new Map< Element, DroppableContext< Element>>();
