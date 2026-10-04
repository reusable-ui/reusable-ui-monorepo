import React, { useState } from 'react'
import {
    type DragPayload,
    type DroppableStateProps,
    useDroppableState,
} from '../dist/index.js'
import { handleAcceptDropHandshake, handleRejectDropHandshake } from './drag-drop-handler-test.js'



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
        onDropHandshake    : onDropHandshakeProp,
        onDropCommit       : onDropCommitProp,
        ...restProps
    } = props;
    const [dropped, setDropped] = useState<DragPayload | undefined>(undefined);
    
    const {
        dropStatus,
        dragPayload,
        ref,
    } = useDroppableState<HTMLDivElement>({
        ...restProps,
        async onDropHandshake(event) {
            (simulateDropAccept ? handleAcceptDropHandshake : handleRejectDropHandshake)(event);
            await onDropHandshakeProp?.(event);
        },
        onDropCommit(event) {
            onDropCommitProp?.(event);
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
