import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DraggableDroppableTest } from './DraggableDroppableTest.js'
import { DraggableStateTest } from './DraggableStateTest.js'
import { DroppableStateTest } from './DroppableStateTest.js'
import {
    type DragPayload,
    type DropMetadata,
    type DraggableStateProps,
    type DroppableStateProps,
} from '../dist/index.js'
import {
    TEST_PAYLOAD,
    TEST_METADATA_1,
    TEST_METADATA_2,
    TEST_METADATA_3,
} from './drag-drop-data-test.js'
import {
    handleRejectDragHandshake,
    handleRejectDropHandshake,
} from './drag-drop-handler-test.js'



/**
 * Represents a single drag-drop test scenario.
 * Each scenario consists of a sequence of update steps with expected outcomes.
 */
interface DragDropTestCase {
    // Test Inputs:
    
    /**
     * A descriptive label of the overall test case.
     */
    title            : string
    
    /**
     * Optional custom drag handshake handler for the draggable side.
     * 
     * Defaults to always accepting any droppable's metadata and allowing the drag-drop operation to continue.
     */
    onDragHandshake ?: DraggableStateProps<HTMLDivElement>['onDragHandshake']
    
    /**
     * Optional custom drop handshake handler for the droppable side.
     * 
     * Defaults to always accepting any draggable's payload and allowing the drag-drop operation to continue.
     */
    onDropHandshake ?: DroppableStateProps<HTMLDivElement>['onDropHandshake']
    
    /**
     * A sequence of drag state updates and assertions.
     */
    updates          : {
        // Test Inputs:
        
        /**
         * A descriptive label of the individual update step.
         */
        title                : string
        
        /**
         * Simulates whether the draggable is actively pressed/held:
         * - `true` → drag gesture active
         * - `false` → drag gesture released
         * - `undefined` → no change (skip update)
         */
        computedDrag        ?: boolean
        
        /**
         * Simulates the horizontal cursor position relative to the
         * center of the draggable element.
         * Vertical position is fixed to the center for simplicity.
         * 
         * Layout assumption (each block 100px wide):
         * [draggable] [gap] [droppable-1] [gap] [droppable-2] [gap] [droppable-3]
         */
        pointerPos          ?: number
        
        /**
         * Controls whether this draggable is currently active:
         * - `true`  → participates in drag-drop interactions
         * - `false` → no drag interaction
         * 
         * Defaults to `true` (active drag zone).
         */
        dragEnabled         ?: boolean
        
        /**
         * Controls whether this droppable is currently active:
         * - `true`  → participates in drag-drop interactions
         * - `false` → no zone feedback and no drop acceptance
         * 
         * Defaults to `true` (active drop zone).
         */
        dropEnabled         ?: boolean
        
        /**
         * Delay (in milliseconds) after applying the update before asserting results.
         * 
         * - `undefined` : check immediately (no delay).
         * - `0`         : defer until the next event loop tick.
         * - `>0`        : wait for the specified duration before checking.
         */
        delay               ?: number
        
        // Expected Outcomes:
        
        // Statuses:
        
        /**
         * The expected drag status at the draggable side:
         * - `undefined` → no drag activity at all
         * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
         * - `false`     → drag gesture active over a droppable zone but rejected by one or both sides
         * - `true`      → drag gesture active over a droppable zone and mutually accepted
         * - `no-expect` → skip assertion for this status
         * 
         * Defaults to `no-expect` (skip assertion) if not specified.
         */
        expectedDragStatus  ?: undefined | null | boolean | 'no-expect'
        
        /**
         * The expected drop status at the droppable-1 zone:
         * - `undefined` → no drag activity at all
         * - `null`      → drag gesture active but outside this zone, or either side has not responded
         * - `false`     → drag gesture active over this zone but rejected by one or both sides
         * - `true`      → drag gesture active over this zone and mutually accepted
         */
        expectedDropStatus1 ?: undefined | null | boolean | 'no-expect'
        expectedDropStatus2 ?: undefined | null | boolean | 'no-expect'
        expectedDropStatus3 ?: undefined | null | boolean | 'no-expect'
        
        
        // Data:
        
        /**
         * The expected exposed metadata at the draggable side:
         * - `TEST_METADATA_1` → The droppable-1 metadata.
         * - `TEST_METADATA_2` → The droppable-2 metadata.
         * - `TEST_METADATA_3` → The droppable-3 metadata.
         * - `undefined`       → No exposed metadata.
         * - `no-expect`       → Skip assertion for this metadata.
         * 
         * Defaults to `no-expect` (skip assertion) if not specified.
         */
        expectedMetadata    ?: DropMetadata | undefined | 'no-expect'
        
        /**
         * The expected exposed payload at the droppable-1 zone:
         * - `TEST_PAYLOAD` → The draggable payload.
         * - `undefined`    → No exposed payload.
         */
        expectedPayload1    ?: DragPayload | null | undefined | 'no-expect'
        expectedPayload2    ?: DragPayload | null | undefined | 'no-expect'
        expectedPayload3    ?: DragPayload | null | undefined | 'no-expect'
        
        
        // Events:
        
        /**
         * The expected dragged metadata at the draggable side:
         * - `TEST_METADATA_1` → The droppable-1 metadata.
         * - `TEST_METADATA_2` → The droppable-2 metadata.
         * - `TEST_METADATA_3` → The droppable-3 metadata.
         * - `undefined`       → No dragged metadata.
         * - `no-expect`       → Skip assertion for this metadata.
         * 
         * Defaults to `no-expect` (skip assertion) if not specified.
         */
        expectedDragged     ?: DropMetadata | undefined | 'no-expect'
        
        /**
         * The expected dropped payload at the droppable-1 zone:
         * - `TEST_PAYLOAD` → The draggable payload.
         * - `undefined`    → No dropped payload.
         * - `no-expect`    → Skip assertion for this payload.
         * 
         * Defaults to `no-expect` (skip assertion) if not specified.
         */
        expectedDropped1    ?: DragPayload | null | undefined | 'no-expect'
        expectedDropped2    ?: DragPayload | null | undefined | 'no-expect'
        expectedDropped3    ?: DragPayload | null | undefined | 'no-expect'
    }[]
}



const testCases : DragDropTestCase[] = [
    {
        title           : 'Simple drag activity',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-1',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : TEST_METADATA_1,
                expectedDropped1    : TEST_PAYLOAD,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag activity with transitions',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : true,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_2,
                expectedPayload1    : undefined,
                expectedPayload2    : TEST_PAYLOAD,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-3',
                computedDrag        : true,
                pointerPos          : 600,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : true,
                
                expectedMetadata    : TEST_METADATA_3,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : TEST_PAYLOAD,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-3',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : TEST_METADATA_3,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : TEST_PAYLOAD,
            },
        ],
    },
    
    
    
    {
        title           : 'Dropped outside any droppable zone',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped outside any droppable zone',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Dropped outside any droppable zone with transitions',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : true,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_2,
                expectedPayload1    : undefined,
                expectedPayload2    : TEST_PAYLOAD,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped outside any droppable zone',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    
    
    
    {
        title           : 'Simple drag canceled by draggable side',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Disabling draggable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
            },
            {
                title               : 'Dropped on droppable-1 but draggable was disabled',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag canceled by droppable side',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Disabling droppable-1 before dropping',
                computedDrag        : true,  // Still dragging while disabling the droppable
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
            },
            {
                title               : 'Dropped on droppable-1 but it was disabled',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag canceled by both sides',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Disabling draggable and droppable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable and droppable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
            },
            {
                title               : 'Dropped on droppable-1 but draggable and droppable was disabled',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag canceled by draggable side with transitions',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : true,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_2,
                expectedPayload1    : undefined,
                expectedPayload2    : TEST_PAYLOAD,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-3',
                computedDrag        : true,
                pointerPos          : 600,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : true,
                
                expectedMetadata    : TEST_METADATA_3,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : TEST_PAYLOAD,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Disabling draggable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
            },
            {
                title               : 'Dropped on droppable-3',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag canceled by droppable side with transitions',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : true,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_2,
                expectedPayload1    : undefined,
                expectedPayload2    : TEST_PAYLOAD,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-3',
                computedDrag        : true,
                pointerPos          : 600,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : true,
                
                expectedMetadata    : TEST_METADATA_3,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : TEST_PAYLOAD,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Disabling droppable-1 before dropping',
                computedDrag        : true,  // Still dragging while disabling the droppable
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
            },
            {
                title               : 'Dropped on droppable-3',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag canceled by both sides with transitions',
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : true,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_1,
                expectedPayload1    : TEST_PAYLOAD,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : true,
                expectedDropStatus3 : null,
                
                expectedMetadata    : TEST_METADATA_2,
                expectedPayload1    : undefined,
                expectedPayload2    : TEST_PAYLOAD,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-3',
                computedDrag        : true,
                pointerPos          : 600,
                
                expectedDragStatus  : true,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : true,
                
                expectedMetadata    : TEST_METADATA_3,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : TEST_PAYLOAD,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Disabling draggable and droppable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable and droppable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
            },
            {
                title               : 'Dropped on droppable-3',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    
    
    
    {
        title           : 'Simple drag handshake rejected by draggable side',
        onDragHandshake : handleRejectDragHandshake,
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : false,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-1 but draggable rejected the handshake',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag handshake rejected by droppable side',
        onDropHandshake : handleRejectDropHandshake,
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : false,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-1 but it rejected the handshake',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag handshake rejected by both sides',
        onDragHandshake : handleRejectDragHandshake,
        onDropHandshake : handleRejectDropHandshake,
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : false,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-1 but draggable and droppable rejected the handshake',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag handshake rejected by draggable side with transitions',
        onDragHandshake : handleRejectDragHandshake,
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : false,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : null,
                expectedDropStatus2 : false,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-3',
                computedDrag        : true,
                pointerPos          : 600,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : false,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-3',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag handshake rejected by droppable side with transitions',
        onDropHandshake : handleRejectDropHandshake,
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : false,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : null,
                expectedDropStatus2 : false,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-3',
                computedDrag        : true,
                pointerPos          : 600,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : false,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-3',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
    {
        title           : 'Simple drag handshake rejected by both sides with transitions',
        onDragHandshake : handleRejectDragHandshake,
        onDropHandshake : handleRejectDropHandshake,
        updates         : [
            {
                title               : 'No drag',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Start dragging',
                computedDrag        : true,
                pointerPos          : 0,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between draggable and droppable-1',
                computedDrag        : true,
                pointerPos          : 100,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-1',
                computedDrag        : true,
                pointerPos          : 200,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : false,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-1 and droppable-2',
                computedDrag        : true,
                pointerPos          : 300,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-2',
                computedDrag        : true,
                pointerPos          : 400,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : null,
                expectedDropStatus2 : false,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Between droppable-2 and droppable-3',
                computedDrag        : true,
                pointerPos          : 500,
                
                expectedDragStatus  : null,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : null,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'At droppable-3',
                computedDrag        : true,
                pointerPos          : 600,
                
                expectedDragStatus  : false,
                expectedDropStatus1 : null,
                expectedDropStatus2 : null,
                expectedDropStatus3 : false,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
            {
                title               : 'Dropped on droppable-3',
                computedDrag        : false,
                
                expectedDragStatus  : undefined,
                expectedDropStatus1 : undefined,
                expectedDropStatus2 : undefined,
                expectedDropStatus3 : undefined,
                
                expectedMetadata    : undefined,
                expectedPayload1    : undefined,
                expectedPayload2    : undefined,
                expectedPayload3    : undefined,
                
                expectedDragged     : undefined,
                expectedDropped1    : undefined,
                expectedDropped2    : undefined,
                expectedDropped3    : undefined,
            },
        ],
    },
];

test.describe('useDraggableState() + useDroppableState()', () => {
    let currentDragged        = false;
    let currentPointerPressed = false;
    let currentDragEnabled    = true;
    let currentDropEnabled    = true;
    for (const {
        title,
        onDragHandshake,
        onDropHandshake,
        updates,
    } of testCases) {
        test(title, async ({ mount, page }) => {
            // First render:
            const component = await mount(
                <DraggableDroppableTest>
                    {/* `Object.fromEntries(Map)` => a fix for playwright serializing problem */}
                    <DraggableStateTest index={0} dragPayload={Object.fromEntries(TEST_PAYLOAD) as typeof TEST_PAYLOAD} computedDrag={currentDragged} dragEnabled={currentDragEnabled} onDragHandshake={onDragHandshake} />
                    <DroppableStateTest index={0} dropMetadata={Object.fromEntries(TEST_METADATA_1) as typeof TEST_METADATA_1} dropEnabled={currentDropEnabled} onDropHandshake={onDropHandshake} />
                    <DroppableStateTest index={1} dropMetadata={Object.fromEntries(TEST_METADATA_2) as typeof TEST_METADATA_2} dropEnabled={currentDropEnabled} onDropHandshake={onDropHandshake} />
                    <DroppableStateTest index={2} dropMetadata={Object.fromEntries(TEST_METADATA_3) as typeof TEST_METADATA_3} dropEnabled={currentDropEnabled} onDropHandshake={onDropHandshake} />
                </DraggableDroppableTest>
            );
            
            
            
            // Ensure the component is rendered correctly:
            const container = component.getByTestId('draggable-droppable-test');
            await expect(container).toContainClass('draggable-droppable-test');
            const draggable = component.getByTestId('draggable-state-test-0');
            await expect(draggable).toContainClass('draggable-state-test');
            const droppable1 = component.getByTestId('droppable-state-test-0');
            await expect(droppable1).toContainClass('droppable-state-test');
            const droppable2 = component.getByTestId('droppable-state-test-1');
            await expect(droppable2).toContainClass('droppable-state-test');
            const droppable3 = component.getByTestId('droppable-state-test-2');
            await expect(droppable3).toContainClass('droppable-state-test');
            
            
            
            // Apply update scenarios:
            for (const {
                title,
                computedDrag,
                pointerPos,
                dragEnabled = true,
                dropEnabled = true,
                delay,
                
                expectedDragStatus   = 'no-expect',
                expectedDropStatus1  = 'no-expect',
                expectedDropStatus2  = 'no-expect',
                expectedDropStatus3  = 'no-expect',
                
                expectedMetadata     = 'no-expect',
                expectedPayload1     = 'no-expect',
                expectedPayload2     = 'no-expect',
                expectedPayload3     = 'no-expect',
                
                expectedDragged      = 'no-expect',
                expectedDropped1     = 'no-expect',
                expectedDropped2     = 'no-expect',
                expectedDropped3     = 'no-expect',
            } of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (computedDrag !== undefined) currentDragged     = computedDrag;
                if (dragEnabled  !== undefined) currentDragEnabled = dragEnabled;
                if (dropEnabled  !== undefined) currentDropEnabled = dropEnabled;
                
                
                
                // Simulate pointer press/release:
                if (currentPointerPressed !== currentDragged) {
                    currentPointerPressed = currentDragged;
                    if (currentDragged) {
                        await page.mouse.down();
                    } else {
                        await page.mouse.up();
                    } // if
                } // if
                
                
                
                // Re-render with updated drag state:
                await component.update(
                    <DraggableDroppableTest>
                        {/* `Object.fromEntries(Map)` => a fix for playwright serializing problem */}
                        <DraggableStateTest index={0} dragPayload={Object.fromEntries(TEST_PAYLOAD) as typeof TEST_PAYLOAD} computedDrag={currentDragged} dragEnabled={currentDragEnabled} onDragHandshake={onDragHandshake} />
                        <DroppableStateTest index={0} dropMetadata={Object.fromEntries(TEST_METADATA_1) as typeof TEST_METADATA_1} dropEnabled={currentDropEnabled} onDropHandshake={onDropHandshake} />
                        <DroppableStateTest index={1} dropMetadata={Object.fromEntries(TEST_METADATA_2) as typeof TEST_METADATA_2} dropEnabled={currentDropEnabled} onDropHandshake={onDropHandshake} />
                        <DroppableStateTest index={2} dropMetadata={Object.fromEntries(TEST_METADATA_3) as typeof TEST_METADATA_3} dropEnabled={currentDropEnabled} onDropHandshake={onDropHandshake} />
                    </DraggableDroppableTest>
                );
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const container = component.getByTestId('draggable-droppable-test');
                await expect(container).toContainClass('draggable-droppable-test');
                const draggable = component.getByTestId('draggable-state-test-0');
                await expect(draggable).toContainClass('draggable-state-test');
                const droppable1 = component.getByTestId('droppable-state-test-0');
                await expect(droppable1).toContainClass('droppable-state-test');
                const droppable2 = component.getByTestId('droppable-state-test-1');
                await expect(droppable2).toContainClass('droppable-state-test');
                const droppable3 = component.getByTestId('droppable-state-test-2');
                await expect(droppable3).toContainClass('droppable-state-test');
                
                
                
                // Simulate pointer move:
                if (pointerPos !== undefined) {
                    const draggableBox = await draggable.boundingBox();
                    if (!draggableBox) throw 'draggable does not exist';
                    const centerX = draggableBox.x + draggableBox.width / 2;
                    const centerY = draggableBox.y + draggableBox.height / 2;
                    await page.mouse.move(centerX + pointerPos, centerY);
                } // if
                
                
                
                // Verify the expected statuses:
                if (expectedDragStatus  !== 'no-expect') await expect(draggable) .toHaveAttribute('data-status', String(expectedDragStatus));
                if (expectedDropStatus1 !== 'no-expect') await expect(droppable1).toHaveAttribute('data-status', String(expectedDropStatus1));
                if (expectedDropStatus2 !== 'no-expect') await expect(droppable2).toHaveAttribute('data-status', String(expectedDropStatus2));
                if (expectedDropStatus3 !== 'no-expect') await expect(droppable3).toHaveAttribute('data-status', String(expectedDropStatus3));
                
                
                
                // Verify the expected metadata/payload:
                if (expectedMetadata !== 'no-expect') await expect(draggable) .toHaveAttribute('data-metadata', expectedMetadata ? JSON.stringify(Object.fromEntries(expectedMetadata)) : String(expectedMetadata));
                if (expectedPayload1 !== 'no-expect') await expect(droppable1).toHaveAttribute('data-payload',  expectedPayload1 ? JSON.stringify(Object.fromEntries(expectedPayload1)) : String(expectedPayload1));
                if (expectedPayload2 !== 'no-expect') await expect(droppable2).toHaveAttribute('data-payload',  expectedPayload2 ? JSON.stringify(Object.fromEntries(expectedPayload2)) : String(expectedPayload2));
                if (expectedPayload3 !== 'no-expect') await expect(droppable3).toHaveAttribute('data-payload',  expectedPayload3 ? JSON.stringify(Object.fromEntries(expectedPayload3)) : String(expectedPayload3));
                
                
                
                // Verify the expected dragged/dropped events:
                if (expectedDragged  !== 'no-expect') await expect(draggable) .toHaveAttribute('data-dragged', expectedDragged  ? JSON.stringify(Object.fromEntries(expectedDragged))  : String(expectedDragged));
                if (expectedDropped1 !== 'no-expect') await expect(droppable1).toHaveAttribute('data-dropped', expectedDropped1 ? JSON.stringify(Object.fromEntries(expectedDropped1)) : String(expectedDropped1));
                if (expectedDropped2 !== 'no-expect') await expect(droppable2).toHaveAttribute('data-dropped', expectedDropped2 ? JSON.stringify(Object.fromEntries(expectedDropped2)) : String(expectedDropped2));
                if (expectedDropped3 !== 'no-expect') await expect(droppable3).toHaveAttribute('data-dropped', expectedDropped3 ? JSON.stringify(Object.fromEntries(expectedDropped3)) : String(expectedDropped3));
            } // for
        });
    } // for
});
