import React, { useState } from 'react'
import {
    type DropMetadata,
    type DragStartEvent,
    type DragEndEvent,
    type DragHandshakeEvent,
    type DragEvaluationEvent,
    type DragCommitEvent,
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
        ...restProps
    } = props;
    const [dragged, setDragged] = useState<DropMetadata | undefined>(undefined);
    
    const {
        dragStatus,
        dropMetadata,
        ref,
    } = useDraggableState<HTMLDivElement>({
        ...restProps,
        onDragStart(event) {
            props.onDragStart?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
            } satisfies DragStartEvent<HTMLDivElement>);
        },
        onDragEnd(event) {
            props.onDragEnd?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: event.dropMetadata ? Object.fromEntries(event.dropMetadata) : undefined,
            } satisfies DragEndEvent<HTMLDivElement>);
        },
        async onDragHandshake(event) {
            (simulateDragAccept ? handleAcceptDragHandshake : handleRejectDragHandshake)(event);
            await props.onDragHandshake?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
            } satisfies DragHandshakeEvent<HTMLDivElement>);
        },
        onDragEvaluation(event) {
            props.onDragEvaluation?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: event.dropMetadata ? Object.fromEntries(event.dropMetadata) : undefined,
            } satisfies DragEvaluationEvent<HTMLDivElement>);
        },
        onDragCommit(event) {
            props.onDragCommit?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
            } satisfies DragCommitEvent<HTMLDivElement>);
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
