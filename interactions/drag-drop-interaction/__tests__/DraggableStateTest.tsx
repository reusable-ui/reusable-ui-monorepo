import React, { useState } from 'react'
import {
    type DropMetadata,
    type DraggableStateProps,
    useDraggableState,
} from '../dist/index.js'
import { handleAcceptDragHandshake, handleRejectDragHandshake } from './drag-drop-handler-test.js'



export interface DraggableStateTestProps
    extends
        DraggableStateProps<HTMLDivElement>
{
    index: number
    simulateDragAccept ?: boolean
}
export const DraggableStateTest = (props: DraggableStateTestProps) => {
    const {
        index,
        simulateDragAccept = true,
        dragPayload,
        onDragHandshake    : onDragHandshakeProp,
        onDragCommit       : onDragCommitProp,
        ...restProps
    } = props;
    const [dragged, setDragged] = useState<DropMetadata | undefined>(undefined);
    
    const {
        dragStatus,
        dropMetadata,
        ref,
    } = useDraggableState<HTMLDivElement>({
        ...restProps,
        async onDragHandshake(event) {
            (simulateDragAccept ? handleAcceptDragHandshake : handleRejectDragHandshake)(event);
            await onDragHandshakeProp?.(event);
        },
        onDragCommit(event) {
            onDragCommitProp?.(event);
            setDragged(event.dropMetadata);
        },
        dragPayload: dragPayload && !(dragPayload instanceof Map) ? new Map(Object.entries(dragPayload)) : dragPayload, // a fix for playwright serializing problem
    });
    
    return (
        <div
            ref={ref}
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
