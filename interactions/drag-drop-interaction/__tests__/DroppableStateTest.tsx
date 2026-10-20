import React, { useState, useLayoutEffect } from 'react'
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
import { mockEventElement, resolveMockedDragPayload } from './utilities.js'



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
        dragPayload : dragPayloadRaw,
        ref,
    } = useDroppableState<HTMLDivElement>({
        ...restProps,
        async onDragPresence(event) {
            const resolvedDragPayload = await resolveMockedDragPayload(event.dragPayload);
            
            props.onDragPresence?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(resolvedDragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget  : mockEventElement(event.currentTarget) as any,
                target         : mockEventElement(event.target) as any,
                relatedTarget  : mockEventElement(event.relatedTarget) as any,
                pointedElement : mockEventElement(event.pointedElement) as any,
            } satisfies DragPresenceEvent<HTMLDivElement>);
        },
        async onDragAbsence(event) {
            const resolvedDragPayload = await resolveMockedDragPayload(event.dragPayload);
            
            props.onDragAbsence?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(resolvedDragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget  : mockEventElement(event.currentTarget) as any,
                target         : mockEventElement(event.target) as any,
                relatedTarget  : mockEventElement(event.relatedTarget) as any,
                pointedElement : mockEventElement(event.pointedElement) as any,
            } satisfies DragAbsenceEvent<HTMLDivElement>);
        },
        async onDropHandshake(event) {
            const resolvedDragPayload = await resolveMockedDragPayload(event.dragPayload);
            
            (simulateDropAccept ? handleAcceptDropHandshake : handleRejectDropHandshake)(event);
            await props.onDropHandshake?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(resolvedDragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget  : mockEventElement(event.currentTarget) as any,
                target         : mockEventElement(event.target) as any,
                relatedTarget  : mockEventElement(event.relatedTarget) as any,
                pointedElement : mockEventElement(event.pointedElement) as any,
            } satisfies DropHandshakeEvent<HTMLDivElement>);
        },
        async onDropEvaluation(event) {
            const resolvedDragPayload = await resolveMockedDragPayload(event.dragPayload);
            
            props.onDropEvaluation?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(resolvedDragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget  : mockEventElement(event.currentTarget) as any,
                target         : mockEventElement(event.target) as any,
                relatedTarget  : mockEventElement(event.relatedTarget) as any,
                pointedElement : mockEventElement(event.pointedElement) as any,
            } satisfies DropEvaluationEvent<HTMLDivElement>);
        },
        async onDropCommit(event) {
            const resolvedDragPayload = await resolveMockedDragPayload(event.dragPayload);
            
            props.onDropCommit?.({
                ...event,
                
                // a fix for playwright serializing problem:
                dragPayload: Object.fromEntries(resolvedDragPayload),
                dropMetadata: Object.fromEntries(event.dropMetadata),
                
                currentTarget  : mockEventElement(event.currentTarget) as any,
                target         : mockEventElement(event.target) as any,
                relatedTarget  : mockEventElement(event.relatedTarget) as any,
                pointedElement : mockEventElement(event.pointedElement) as any,
            } satisfies DropCommitEvent<HTMLDivElement>);
            setDropped(resolvedDragPayload);
        },
        dropMetadata: dropMetadata && !(dropMetadata instanceof Map) ? new Map(Object.entries(dropMetadata)) : dropMetadata, // a fix for playwright serializing problem
    });
    
    const [dragPayload, setDragPayload] = useState<any>(undefined);
    useLayoutEffect(() => {
        const promisedDragPayload = resolveMockedDragPayload(dragPayloadRaw);
        if (!(promisedDragPayload instanceof Promise)) {
            setDragPayload(promisedDragPayload);
            return;
        } // if
        
        promisedDragPayload.then((dragPayload) => {
            setDragPayload(dragPayload);
        });
    }, [dragPayloadRaw]);
    
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
