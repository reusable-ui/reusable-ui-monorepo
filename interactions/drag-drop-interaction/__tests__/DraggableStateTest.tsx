import React, { useState } from 'react'
import {
    type DropMetadata,
    type DraggableStateProps,
    useDraggableState,
} from '../dist/index.js'
import { handleAcceptDragHandshake } from './drag-drop-handler-test.js'



export interface DraggableStateTestProps
    extends
        DraggableStateProps<HTMLDivElement>
{
    index: number
}
export const DraggableStateTest = (props: DraggableStateTestProps) => {
    const {
        index,
        computedDrag,
        onDragHandshake = handleAcceptDragHandshake,
        dragPayload,
    } = props;
    const [dragged, setDragged] = useState<DropMetadata | undefined>(undefined);
    
    const {
        dragStatus,
        dropMetadata,
        dragRef,
    } = useDraggableState<HTMLDivElement>({
        ...props,
        computedDrag,
        onDragHandshake,
        onDragged(event) {
            setDragged(event.dropMetadata);
        },
        dragPayload: dragPayload && !(dragPayload instanceof Map) ? new Map(Object.entries(dragPayload)) : dragPayload, // a fix for playwright serializing problem
    });
    
    return (
        <div
            ref={dragRef}
            className='draggable-state-test'
            data-testid={`draggable-state-test-${index}`}
            data-status={String(dragStatus)}
            data-metadata={dropMetadata ? JSON.stringify(Object.fromEntries(dropMetadata)) : 'undefined'}
            data-dragged={dragged ? JSON.stringify(Object.fromEntries(dragged)) : 'undefined'}
        >
            Draggable State Test {index}
        </div>
    );
};
