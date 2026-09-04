import {
    type DragHandshakeEvent,
    type DropHandshakeEvent,
} from '../dist/index.js'



/**
 * Always accept any droppable's metadata and allow the drag-drop operation to continue.
 */
export const handleAcceptDragHandshake = (event: DragHandshakeEvent<HTMLElement>) => {
    event.dragResponse = true;
};
/**
 * Always accept any draggable's payload and allow the drag-drop operation to continue.
 */
export const handleAcceptDropHandshake = (event: DropHandshakeEvent<HTMLElement>) => {
    event.dropResponse = true;
};



/**
 * Always reject any droppable's metadata and disallow the drag-drop operation to continue.
 */
export const handleRejectDragHandshake = (event: DragHandshakeEvent<HTMLElement>) => {
    event.dragResponse = false;
};
/**
 * Always reject any draggable's payload and disallow the drag-drop operation to continue.
 */
export const handleRejectDropHandshake = (event: DropHandshakeEvent<HTMLElement>) => {
    event.dropResponse = false;
};
