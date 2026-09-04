import React, { useRef, useState } from 'react'
import {
    type DragPayload,
    type DroppableStateProps,
    useDroppableState,
} from '../dist/index.js'
import { handleAcceptDropHandshake } from './drag-drop-handler-test.js'



export interface DroppableStateTestProps
    extends
        DroppableStateProps<HTMLDivElement>
{
    index: number
}
export const DroppableStateTest = (props: DroppableStateTestProps) => {
    const internalDropRef = useRef<HTMLDivElement | null>(null);
    const {
        index,
        dropRef = internalDropRef,
        onDropHandshake = handleAcceptDropHandshake,
        dropMetadata,
    } = props;
    const [dropped, setDropped] = useState<DragPayload | undefined>(undefined);
    
    const {
        dropStatus,
        dragPayload,
    } = useDroppableState({
        ...props,
        dropRef,
        onDropHandshake,
        onDropped(event) {
            setDropped(event.dragPayload);
        },
        dropMetadata: dropMetadata && !(dropMetadata instanceof Map) ? new Map(Object.entries(dropMetadata)) : dropMetadata, // a fix for playwright serializing problem
    });
    
    return (
        <div
            ref={internalDropRef}
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
