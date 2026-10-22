import React from 'react'
import {
    type DraggableStateProps,
    useNativeDragIntegration,
} from '../dist/index.js'



export interface NativeDraggableStateTestProps
    extends
        Pick<DraggableStateProps<HTMLDivElement>, 'dragPayload'>
{
    index: number
    dragEnabled ?: boolean
}
export const NativeDraggableStateTest = (props: NativeDraggableStateTestProps) => {
    const {
        index,
        dragEnabled = true,
        dragPayload : dragPayloadRaw,
    } = props;
    const dragPayload = dragPayloadRaw && !(dragPayloadRaw instanceof Map) ? new Map(Object.entries(dragPayloadRaw)) : dragPayloadRaw; // a fix for playwright serializing problem
    
    useNativeDragIntegration();
    
    return (
        <div
            className='draggable-state-test'
            data-testid={`draggable-state-test-${index}`}
            draggable={dragEnabled}
            onDragStart={(event) => {
                if (dragPayload) {
                    event.dataTransfer.setData('text/mock-data', JSON.stringify(Object.fromEntries(dragPayload)));
                }
                else {
                    event.dataTransfer.clearData('text/mock-data');
                } // if
            }}
        >
            Draggable State Test {index}
        </div>
    );
};
