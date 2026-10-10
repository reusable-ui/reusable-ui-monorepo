import React, { useState } from 'react'
import {
    type DragPayload,
    type DragPresenceEvent,
    type DragAbsenceEvent,
    type DropHandshakeEvent,
    type DropEvaluationEvent,
    type DropCommitEvent,
    type DroppableStateProps,
    useDroppableState,
} from '../dist/index.js'
import { handleAcceptDropHandshake, handleRejectDropHandshake } from './drag-drop-handler-test.js'
import { mockEventElement } from './utilities.js'



export interface DroppableStateTestProps
    extends
        DroppableStateProps<HTMLDivElement>
{
    index: number
    simulateDropAccept ?: boolean
}
export const DroppableStateTest = (props: DroppableStateTestProps) => {
    const {
        index,
        simulateDropAccept = true,
        dropMetadata,
        ...restProps
    } = props;
    const [dropped, setDropped] = useState<DragPayload | undefined>(undefined);
    
    const {
        dropStatus,
        dragPayload,
        ref,
    } = useDroppableState<HTMLDivElement>({
        ...restProps,
        onDragPresence(event) {
            props.onDragPresence?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget : mockEventElement(event.currentTarget) as any,
                target        : mockEventElement(event.target) as any,
                relatedTarget : mockEventElement(event.relatedTarget) as any,
            } satisfies DragPresenceEvent<HTMLDivElement>);
        },
        onDragAbsence(event) {
            props.onDragAbsence?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget : mockEventElement(event.currentTarget) as any,
                target        : mockEventElement(event.target) as any,
                relatedTarget : mockEventElement(event.relatedTarget) as any,
            } satisfies DragAbsenceEvent<HTMLDivElement>);
        },
        async onDropHandshake(event) {
            (simulateDropAccept ? handleAcceptDropHandshake : handleRejectDropHandshake)(event);
            await props.onDropHandshake?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget : mockEventElement(event.currentTarget) as any,
                target        : mockEventElement(event.target) as any,
                relatedTarget : mockEventElement(event.relatedTarget) as any,
            } satisfies DropHandshakeEvent<HTMLDivElement>);
        },
        onDropEvaluation(event) {
            props.onDropEvaluation?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget : mockEventElement(event.currentTarget) as any,
                target        : mockEventElement(event.target) as any,
                relatedTarget : mockEventElement(event.relatedTarget) as any,
            } satisfies DropEvaluationEvent<HTMLDivElement>);
        },
        onDropCommit(event) {
            props.onDropCommit?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(event.dragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget : mockEventElement(event.currentTarget) as any,
                target        : mockEventElement(event.target) as any,
                relatedTarget : mockEventElement(event.relatedTarget) as any,
            } satisfies DropCommitEvent<HTMLDivElement>);
            setDropped(event.dragPayload);
        },
        dropMetadata: dropMetadata && !(dropMetadata instanceof Map) ? new Map(Object.entries(dropMetadata)) : dropMetadata, // a fix for playwright serializing problem
    });
    
    return (
        <div
            ref={ref}
            className='droppable-state-test'
            data-testid={`droppable-state-test-${index}`}
            data-status={String(dropStatus)}
            data-payload={dragPayload ? JSON.stringify(Object.fromEntries(dragPayload)) : 'undefined'}
            data-dropped={dropped ? JSON.stringify(Object.fromEntries(dropped)) : 'undefined'}
        >
            Droppable State Test {index}
        </div>
    );
};
