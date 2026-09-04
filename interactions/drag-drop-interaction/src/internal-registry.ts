// Types:
import {
    // Data:
    type DroppableEntry,
}                           from './internal-types.js'



/**
 * Global registry of droppable entries, keyed by their backing DOM element.
 * 
 * During hit-testing, the drag-drop engine walks the hovered element's
 * ancestor chain and consults this registry to resolve the nearest
 * registered droppable zone.
 * 
 * A pointer is considered inside a droppable zone if it is over:
 * - the droppable element itself, or
 * - any of its descendant elements in the DOM tree.
 * 
 * Note:
 * Children rendered via React Portal are not considered descendants.
 * If the portal content is intended to serve a droppable zone, its container
 * must be explicitly registered as a separate droppable.
 */
export const droppableRegistry = new Map< Element, DroppableEntry< Element>>();
