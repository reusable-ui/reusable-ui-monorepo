import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DraggableDroppableTest } from './DraggableDroppableTest.js'
import { DraggableStateTest } from './DraggableStateTest.js'
import { DroppableStateTest } from './DroppableStateTest.js'
import {
    type DragPayload,
    type DropMetadata,
    
    type DragStartEvent,
    type DragPresenceEvent,
    type DragEndEvent,
    type DragAbsenceEvent,
    type DragHandshakeEvent,
    type DropHandshakeEvent,
    type DragEvaluationEvent,
    type DropEvaluationEvent,
    type DragCommitEvent,
    type DropCommitEvent,
} from '../dist/index.js'
import {
    TEST_PAYLOAD,
    TEST_METADATA_1,
    TEST_METADATA_2,
    TEST_METADATA_3,
    TEST_METADATA,
} from './drag-drop-data-test.js'
import {
    getDroppableIndexByPointerPos,
} from './utilities.js'



/**
 * Represents a single drag-drop test scenario.
 * Each scenario consists of a sequence of update steps with expected outcomes.
 */
interface DragDropTestCase {
    // Test Inputs:
    
    /**
     * A descriptive label of the overall test case.
     */
    title               : string
    
    /**
     * Optional custom drag handshake handler for the draggable side.
     * 
     * Defaults to always accepting any droppable's metadata and allowing the drag-drop operation to continue.
     */
    simulateDragAccept ?: boolean
    
    /**
     * Optional custom drop handshake handler for the droppable side.
     * 
     * Defaults to always accepting any draggable's payload and allowing the drag-drop operation to continue.
     */
    simulateDropAccept ?: boolean
    
    /**
     * A sequence of drag state updates and assertions.
     */
    updates             : {
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
        
        
        // Reactive States:
        
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
        
        
        
        // Events:
        expectedEvents       : {
            // Draggable side events:
            // - Set to `true` if the event is expected to be triggered during this update step,
            // otherwise leave it blank or set to `undefined` if the event is not expected.
            dragStart       ?: true
            dragEnd         ?: true
            dragHandshake   ?: true
            dragEvaluation  ?: true
            dragCommit      ?: true
            
            // Droppable side events:
            // - Each droppable zone has its own set of events, represented as an array of three elements.
            // - The first element corresponds to droppable-1, the second to droppable-2, and the third to droppable-3.
            // - Set to `true` if the event is expected to be triggered for that droppable zone during this update step,
            // otherwise leave it blank or set to `undefined` if the event is not expected.
            dragPresence    ?: [true | undefined, true | undefined, true | undefined]
            dragAbsence     ?: [true | undefined, true | undefined, true | undefined]
            dropHandshake   ?: [true | undefined, true | undefined, true | undefined]
            dropEvaluation  ?: [true | undefined, true | undefined, true | undefined]
            dropCommit      ?: [true | undefined, true | undefined, true | undefined]
        }
    }[]
}



const testCases : DragDropTestCase[] = [
    {
        title               : 'Simple drag activity',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released over mutually accepted droppable-1 target.
                    
                    // Delivers payload transaction exclusively to droppable-1:
                    dragCommit      : true,
                    dropCommit      : [true, undefined, undefined], // Targeted commit only for droppable-1.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    {
        title               : 'Simple drag activity with transitions',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-3).
                    
                    // Triggers two-way negotiation between source and droppable-3:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, undefined, true], // Targeted handshake only for droppable-3.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released over mutually accepted droppable-3 target.
                    
                    // Delivers payload transaction exclusively to droppable-3:
                    dragCommit      : true,
                    dropCommit      : [undefined, undefined, true], // Targeted commit only for droppable-3.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    
    
    
    {
        title               : 'Dropped outside any droppable zone',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    {
        title               : 'Dropped outside any droppable zone with transitions',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    
    
    
    {
        title               : 'Simple drag canceled by draggable side',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
            },
            {
                title               : 'Disabling draggable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
            },
        ],
    },
    {
        title               : 'Simple drag canceled by droppable side',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
            },
            {
                title               : 'Disabling droppable before dropping',
                computedDrag        : true,  // Still dragging while disabling the droppable
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any droppable zone.
                    
                    // Notifies source of drag end:
                    dragEnd         : true,
                },
            },
        ],
    },
    {
        title               : 'Simple drag canceled by both sides',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
            },
            {
                title               : 'Disabling draggable and droppable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable and droppable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
            },
        ],
    },
    {
        title               : 'Simple drag canceled by draggable side with transitions',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-3).
                    
                    // Triggers two-way negotiation between source and droppable-3:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, undefined, true], // Targeted handshake only for droppable-3.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
            },
            {
                title               : 'Disabling draggable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
            },
        ],
    },
    {
        title               : 'Simple drag canceled by droppable side with transitions',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-3).
                    
                    // Triggers two-way negotiation between source and droppable-3:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, undefined, true], // Targeted handshake only for droppable-3.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
            },
            {
                title               : 'Disabling droppable before dropping',
                computedDrag        : true,  // Still dragging while disabling the droppable
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any droppable zone.
                    
                    // Notifies source of drag end:
                    dragEnd         : true,
                },
            },
        ],
    },
    {
        title               : 'Simple drag canceled by both sides with transitions',
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-3).
                    
                    // Triggers two-way negotiation between source and droppable-3:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, undefined, true], // Targeted handshake only for droppable-3.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
            },
            {
                title               : 'Disabling draggable and droppable before dropping',
                computedDrag        : true,  // Still dragging while disabling the draggable and droppable
                dragEnabled         : false, // Disable the draggable to make drag-drop operation fail
                dropEnabled         : false, // Disable the droppable to make drag-drop operation fail
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // The draggable was disabled, so no lifecycle events fire.
                },
            },
        ],
    },
    
    
    
    {
        title               : 'Simple drag handshake rejected by draggable side',
        simulateDragAccept  : false,
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any acceptable droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    {
        title               : 'Simple drag handshake rejected by droppable side',
        simulateDropAccept  : false,
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any acceptable droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    {
        title               : 'Simple drag handshake rejected by both sides',
        simulateDragAccept  : false,
        simulateDropAccept  : false,
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any acceptable droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    {
        title               : 'Simple drag handshake rejected by draggable side with transitions',
        simulateDragAccept  : false,
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-3).
                    
                    // Triggers two-way negotiation between source and droppable-3:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, undefined, true], // Targeted handshake only for droppable-3.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any acceptable droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    {
        title               : 'Simple drag handshake rejected by droppable side with transitions',
        simulateDropAccept  : false,
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-3).
                    
                    // Triggers two-way negotiation between source and droppable-3:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, undefined, true], // Targeted handshake only for droppable-3.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any acceptable droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
    {
        title               : 'Simple drag handshake rejected by both sides with transitions',
        simulateDragAccept  : false,
        simulateDropAccept  : false,
        updates             : [
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
                
                expectedEvents      : {
                    // No active drag gesture, so no lifecycle events fire.
                },
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
                
                expectedEvents      : {
                    // An activation gesture begins.
                    
                    // Notifies source of drag start and broadcasts global presence to all registered droppables:
                    dragStart       : true,
                    dragPresence    : [true, true, true],
                    
                    // Emits initial live feedback before hover contact occurs:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-1).
                    
                    // Triggers two-way negotiation between source and droppable-1:
                    dragHandshake   : true,
                    dropHandshake   : [true, undefined, undefined], // Targeted handshake only for droppable-1.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-2).
                    
                    // Triggers two-way negotiation between source and droppable-2:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, true, undefined], // Targeted handshake only for droppable-2.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Continuous pointer movement outside target zones.
                    
                    // Emits updated live feedback with no active handshake contact:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer enters candidate target (droppable-3).
                    
                    // Triggers two-way negotiation between source and droppable-3:
                    dragHandshake   : true,
                    dropHandshake   : [undefined, undefined, true], // Targeted handshake only for droppable-3.
                    
                    // Emits updated live feedback reflecting mutual acceptance:
                    dragEvaluation  : true,
                    dropEvaluation  : [true, true, true],
                },
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
                
                expectedEvents      : {
                    // Pointer released outside any acceptable droppable zone.
                    
                    // Notifies source of drag end and broadcasts global absence to all registered droppables:
                    dragEnd         : true,
                    dragAbsence     : [true, true, true],
                },
            },
        ],
    },
];

test.describe('useDraggableState() + useDroppableState()', () => {
    let currentPointerPos     = -1;
    let currentDragged        = false;
    let currentPointerPressed = false;
    let currentDragEnabled    = true;
    let currentDropEnabled    = true;
    for (const {
        title,
        simulateDragAccept,
        simulateDropAccept,
        updates,
    } of testCases) {
        test(title, async ({ mount, page }) => {
            // Event trackers:
            const dragDropEvents = new Map<string, any[]>();
            
            
            
            // Event handlers:
            const handleDragStart     = (event: DragStartEvent<HTMLDivElement>) => {
                dragDropEvents.set('dragStart', [...(dragDropEvents.get('dragStart') ?? []), event]);
            };
            const handleDragEnd       = (event: DragEndEvent<HTMLDivElement>) => {
                dragDropEvents.set('dragEnd', [...(dragDropEvents.get('dragEnd') ?? []), event]);
            };
            const handleDragHandshake = (event: DragHandshakeEvent<HTMLDivElement>) => {
                dragDropEvents.set('dragHandshake', [...(dragDropEvents.get('dragHandshake') ?? []), event]);
            };
            const handleDragEvaluation  = (event: DragEvaluationEvent<HTMLDivElement>) => {
                dragDropEvents.set('dragEvaluation', [...(dragDropEvents.get('dragEvaluation') ?? []), event]);
            };
            const handleDragCommit = (event: DragCommitEvent<HTMLDivElement>) => {
                dragDropEvents.set('dragCommit', [...(dragDropEvents.get('dragCommit') ?? []), event]);
            }
            
            const handleDragPresence  = (event: DragPresenceEvent<HTMLDivElement>) => {
                dragDropEvents.set('dragPresence', [...(dragDropEvents.get('dragPresence') ?? []), event]);
            };
            const handleDragAbsence  = (event: DragAbsenceEvent<HTMLDivElement>) => {
                dragDropEvents.set('dragAbsence', [...(dragDropEvents.get('dragAbsence') ?? []), event]);
            };
            const handleDropHandshake = (event: DropHandshakeEvent<HTMLDivElement>, index: number) => {
                let arr = dragDropEvents.get('dropHandshake');
                if (!arr) dragDropEvents.set('dropHandshake', arr = []);
                arr[index] = event;
            };
            const handleDropEvaluation  = (event: DropEvaluationEvent<HTMLDivElement>, index: number) => {
                let arr = dragDropEvents.get('dropEvaluation');
                if (!arr) dragDropEvents.set('dropEvaluation', arr = []);
                arr[index] = event;
            };
            const handleDropCommit = (event: DropCommitEvent<HTMLDivElement>, index: number) => {
                let arr = dragDropEvents.get('dropCommit');
                if (!arr) dragDropEvents.set('dropCommit', arr = []);
                arr[index] = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <DraggableDroppableTest>
                    {/* `Object.fromEntries(Map)` => a fix for playwright serializing problem */}
                    <DraggableStateTest index={0} dragPayload={Object.fromEntries(TEST_PAYLOAD) as typeof TEST_PAYLOAD} computedDrag={currentDragged} dragEnabled={currentDragEnabled} simulateDragAccept={simulateDragAccept}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragHandshake={handleDragHandshake}
                        onDragEvaluation={handleDragEvaluation}
                        onDragCommit={handleDragCommit}
                    />
                    <DroppableStateTest index={0} dropMetadata={Object.fromEntries(TEST_METADATA_1) as typeof TEST_METADATA_1} dropEnabled={currentDropEnabled} simulateDropAccept={simulateDropAccept}
                        onDragPresence={handleDragPresence}
                        onDragAbsence={handleDragAbsence}
                        onDropHandshake={(event) => handleDropHandshake(event, 0)}
                        onDropEvaluation={(event) => handleDropEvaluation(event, 0)}
                        onDropCommit={(event) => handleDropCommit(event, 0)}
                    />
                    <DroppableStateTest index={1} dropMetadata={Object.fromEntries(TEST_METADATA_2) as typeof TEST_METADATA_2} dropEnabled={currentDropEnabled} simulateDropAccept={simulateDropAccept}
                        onDragPresence={handleDragPresence}
                        onDragAbsence={handleDragAbsence}
                        onDropHandshake={(event) => handleDropHandshake(event, 1)}
                        onDropEvaluation={(event) => handleDropEvaluation(event, 1)}
                        onDropCommit={(event) => handleDropCommit(event, 1)}
                    />
                    <DroppableStateTest index={2} dropMetadata={Object.fromEntries(TEST_METADATA_3) as typeof TEST_METADATA_3} dropEnabled={currentDropEnabled} simulateDropAccept={simulateDropAccept}
                        onDragPresence={handleDragPresence}
                        onDragAbsence={handleDragAbsence}
                        onDropHandshake={(event) => handleDropHandshake(event, 2)}
                        onDropEvaluation={(event) => handleDropEvaluation(event, 2)}
                        onDropCommit={(event) => handleDropCommit(event, 2)}
                    />
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
            
            
            
            // Verify there's no events yet:
            expect(dragDropEvents.size).toBe(0);
            
            
            
            // Apply update scenarios:
            for (const {
                title,
                computedDrag,
                pointerPos,
                dragEnabled,
                dropEnabled,
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
                
                expectedEvents,
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
                
                
                
                // Clear event trackers:
                dragDropEvents.clear();
                
                
                
                // Re-render with updated drag state:
                await component.update(
                    <DraggableDroppableTest>
                        {/* `Object.fromEntries(Map)` => a fix for playwright serializing problem */}
                        <DraggableStateTest index={0} dragPayload={Object.fromEntries(TEST_PAYLOAD) as typeof TEST_PAYLOAD} computedDrag={currentDragged} dragEnabled={currentDragEnabled} simulateDragAccept={simulateDragAccept}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragHandshake={handleDragHandshake}
                            onDragEvaluation={handleDragEvaluation}
                            onDragCommit={handleDragCommit}
                        />
                        <DroppableStateTest index={0} dropMetadata={Object.fromEntries(TEST_METADATA_1) as typeof TEST_METADATA_1} dropEnabled={currentDropEnabled} simulateDropAccept={simulateDropAccept}
                            onDragPresence={handleDragPresence}
                            onDragAbsence={handleDragAbsence}
                            onDropHandshake={(event) => handleDropHandshake(event, 0)}
                            onDropEvaluation={(event) => handleDropEvaluation(event, 0)}
                            onDropCommit={(event) => handleDropCommit(event, 0)}
                        />
                        <DroppableStateTest index={1} dropMetadata={Object.fromEntries(TEST_METADATA_2) as typeof TEST_METADATA_2} dropEnabled={currentDropEnabled} simulateDropAccept={simulateDropAccept}
                            onDragPresence={handleDragPresence}
                            onDragAbsence={handleDragAbsence}
                            onDropHandshake={(event) => handleDropHandshake(event, 1)}
                            onDropEvaluation={(event) => handleDropEvaluation(event, 1)}
                            onDropCommit={(event) => handleDropCommit(event, 1)}
                        />
                        <DroppableStateTest index={2} dropMetadata={Object.fromEntries(TEST_METADATA_3) as typeof TEST_METADATA_3} dropEnabled={currentDropEnabled} simulateDropAccept={simulateDropAccept}
                            onDragPresence={handleDragPresence}
                            onDragAbsence={handleDragAbsence}
                            onDropHandshake={(event) => handleDropHandshake(event, 2)}
                            onDropEvaluation={(event) => handleDropEvaluation(event, 2)}
                            onDropCommit={(event) => handleDropCommit(event, 2)}
                        />
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
                    currentPointerPos = centerX + pointerPos;
                    await page.mouse.move(currentPointerPos, centerY);
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
                
                
                
                // Event Interface Rules & Verification:
                // 
                // 1. `dragPayload`:
                //    - Always exists on both draggable and droppable events, as a single draggable is active throughout the lifecycle.
                //
                // 2. `dropMetadata`:
                //    - Always exists on droppable events (an inherent property of the droppable side).
                //    - On draggable events:
                //      - Omitted on `dragStart` (no target contacted yet).
                //      - Always exists on `dragHandshake` and `dragCommit` (both sides are in contact).
                //      - Optional (`DropMetadata | undefined`) on `dragEvaluation` and `dragEnd` (target contact is optional).
                //
                // 3. `isTargeted`:
                //    - Only exists on droppable broadcast events (`dropEvaluation` and `dragAbsence`).
                //    - Omitted on `dragPresence` since initial drag start involves no contact.
                //    - On `dropEvaluation`: `true` for the droppable currently hovered, `false` for others.
                //    - On `dragAbsence`: `true` for the droppable receiving the committed drop, `false` for others.
                //
                // 4. Handshake Responses:
                //    - `dragHandshake`: Contains `dragResponse` (draggable decision); omits `dropResponse`.
                //    - `dropHandshake`: Contains `dropResponse` (droppable decision); omits `dragResponse`.
                //
                // 5. Evaluation Responses:
                //    - `dragEvaluation` and `dropEvaluation` contain both `dragResponse` and `dropResponse` to represent the combined status from both sides.
                //
                // 6. Commit Responses:
                //    - `dragCommit` and `dropCommit` omit response flags because triggering a commit inherently implies mutual acceptance.
                
                // Find the corresponding droppable index by pointer position:
                const droppableIndex = getDroppableIndexByPointerPos(currentPointerPos);
                
                // Draggable side events:
                // - Events: dragStart, dragEnd, dragHandshake, dragEvaluation, dragCommit.
                for (const dragSideEventName of [
                    'dragStart',
                    'dragEnd',
                    'dragHandshake',
                    'dragEvaluation',
                    'dragCommit',
                ] as const) {
                    const dragSideEvents = dragDropEvents.get(dragSideEventName) ?? [];
                    dragDropEvents.delete(dragSideEventName);
                    expect(dragSideEvents.length).toBe(expectedEvents[dragSideEventName] ? 1 : 0);
                    
                    const dragSideEvent = dragSideEvents[0];
                    if (dragSideEvent) {
                        // Verify `dragPayload`:
                        // - Always present across all draggable events, as it is the property of the draggable side.
                        expect(dragSideEvent.dragPayload).toEqual(Object.fromEntries(TEST_PAYLOAD));
                        
                        
                        
                        // Verify `dropMetadata`:
                        // - Omitted on `dragStart`.
                        // - Always present on `dragHandshake` and `dragCommit`.
                        // - Present on `dragEvaluation` / `dragEnd` only if contact / commit occurred.
                        if (dragSideEventName === 'dragHandshake') {
                            expect(droppableIndex).not.toBe(-1);
                            expect(dragSideEvent.dropMetadata).toEqual(Object.fromEntries(TEST_METADATA[droppableIndex]));
                        }
                        else if (dragSideEventName === 'dragEvaluation') {
                            if (droppableIndex !== -1) {
                                expect(dragSideEvent.dropMetadata).toEqual(Object.fromEntries(TEST_METADATA[droppableIndex]));
                            }
                            else {
                                expect(dragSideEvent.dropMetadata).toBeUndefined(); // No contact with any droppable.
                            } // if
                        }
                        else if (dragSideEventName === 'dragCommit') {
                            expect(droppableIndex).not.toBe(-1);
                            expect(dragSideEvent.dropMetadata).toEqual(Object.fromEntries(TEST_METADATA[droppableIndex]));
                        }
                        else if (dragSideEventName === 'dragEnd') {
                            if (droppableIndex !== -1) {
                                expect(dragSideEvent.dropMetadata).toEqual(Object.fromEntries(TEST_METADATA[droppableIndex]));
                            }
                            else {
                                expect(dragSideEvent.dropMetadata).toBeUndefined(); // No contact with any droppable.
                            } // if
                        }
                        else {
                            expect('dropMetadata' in dragSideEvent).toBe(false);
                        } // if
                        
                        
                        
                        // Verify `dragResponse`:
                        // - Always present on `dragHandshake`, representing the current side's (draggable) response.
                        // - Maybe missing on `dragEvaluation`, indicating the draggable side is not hovering any droppable.
                        // - Always undefined if not hovering any droppable for `dragEvaluation`.
                        // - Omitted on all other events.
                        const isHoveringAnyDroppable = expectedEvents.dropHandshake?.some(Boolean) ?? false;
                        if (dragSideEventName === 'dragHandshake') {
                            expect(dragSideEvent.dragResponse).toBe(
                                // The default drag response is `true`, unless overriden:
                                simulateDragAccept ?? true
                            );
                        }
                        else if (dragSideEventName === 'dragEvaluation') {
                            expect(dragSideEvent.dragResponse).toBe(
                                isHoveringAnyDroppable
                                
                                // The default drag response is `true`, unless overriden:
                                ? simulateDragAccept ?? true
                                
                                // Not hovering any droppable → always no response:
                                : undefined
                            );
                        }
                        else {
                            expect('dragResponse' in dragSideEvent).toBe(false);
                        } // if
                        
                        
                        
                        // Verify `dropResponse`:
                        // - Always present on `dragEvaluation`, representing the opposite side's (droppable) response.
                        // - Always undefined if not hovering any droppable.
                        // - Omitted on all other events.
                        if (dragSideEventName === 'dragEvaluation') {
                            expect(dragSideEvent.dropResponse).toBe(
                                isHoveringAnyDroppable
                                
                                // The default drop response is `true`, unless overriden:
                                ? simulateDropAccept ?? true
                                
                                // Not hovering any droppable → always no response:
                                : undefined
                            );
                        }
                        else {
                            expect('dropResponse' in dragSideEvent).toBe(false);
                        } // if
                    } // if
                } // for
                
                // Droppable side events:
                // - Events: dragPresence, dragAbsence, dropHandshake, dropEvaluation, dropCommit.
                for (const dropSideEventName of [
                    'dragPresence',
                    'dragAbsence',
                    'dropHandshake',
                    'dropEvaluation',
                    'dropCommit',
                ] as const) {
                    const dropSideEvents = dragDropEvents.get(dropSideEventName) ?? [];
                    dragDropEvents.delete(dropSideEventName);
                    const expectedDropSideEvents = expectedEvents[dropSideEventName] ?? [];
                    
                    // Validate for each droppable side event:
                    // - There are some droppable sides that may or may not receive the event, depending on the draggable's position.
                    // - The expected values are arrays of booleans, representing *which* droppable sides are expected to receive the event.
                    // - If all values are `true`, meaning the event is broadcast to all droppable sides.
                    // - If only one value is `true`, meaning the event is sent to the specific droppable side.
                    for (let position = 0; position < expectedDropSideEvents.length; position++) {
                        const dropSideEvent = dropSideEvents[position];
                        if (expectedDropSideEvents[position]) {
                            // The event is triggered for this droppable position, so the event should be defined:
                            expect(dropSideEvent).toBeDefined();
                            
                            
                            
                            // Verify `dragPayload`:
                            // - Always present across all droppable events, as there is always one active draggable during a drag gesture.
                            expect(dropSideEvent.dragPayload).toEqual(Object.fromEntries(TEST_PAYLOAD));
                            
                            
                            
                            // Verify `dropMetadata`:
                            // - Alaways present across all droppable events, as it is the property of the droppable side.
                            expect(dropSideEvent.dropMetadata).toEqual(Object.fromEntries(TEST_METADATA[position]));
                            
                            
                            
                            // Verify `isTargeted`:
                            // - Always present on droppable broadcast events (`dropEvaluation` and `dragAbsence`),
                            //   except for `dragPresence` since initial drag start involves no contact.
                            // - Omitted on all non-broadcast events (`dropHandshake` and `dropCommit`).
                            // - Becomes `true` if the current droppable is being hovered or committed, otherwise `false`.
                            if (dropSideEventName === 'dropEvaluation') {
                                expect(dropSideEvent.isTargeted).toBe(
                                    // Becomes targeted if it has a handshake with the draggable:
                                    expectedEvents.dropHandshake?.[position] ?? false
                                );
                            }
                            else if (dropSideEventName === 'dragAbsence') {
                                expect(dropSideEvent.isTargeted).toBe(
                                    // Becomes targeted if the pointer is hovering at current droppable:
                                    droppableIndex === position
                                );
                            }
                            else {
                                expect('isTargeted' in dropSideEvent).toBe(false);
                            } // if
                            
                            
                            
                            // Verify `dragResponse`:
                            // - Always present on `dropEvaluation`, representing the opposite side's (draggable) response.
                            // - Always broadcast to all droppable sides, even if not hovered by the draggable.
                            // - Always undefined if no any droppable is hovered by the draggable for `dropEvaluation`.
                            // - Omitted on all other events.
                            const anyHoveredByDraggable = expectedEvents.dropHandshake?.some(Boolean) ?? false;
                            if (dropSideEventName === 'dropEvaluation') {
                                expect(dropSideEvent.dragResponse).toBe(
                                    anyHoveredByDraggable
                                    
                                    // The default drag response is `true`, unless overriden:
                                    ? simulateDragAccept ?? true
                                    
                                    // No hovered by the draggable → always no response:
                                    : undefined
                                );
                            }
                            else {
                                expect('dragResponse' in dropSideEvent).toBe(false);
                            } // if
                            
                            
                            
                            // Verify `dropResponse`:
                            // - Always present on `dropHandshake`, representing the *active* droppable's response.
                            // - Maybe missing on `dropEvaluation`, indicating the draggable side is not hovering any droppable.
                            // - Always broadcast to all droppable sides, even if not hovered by the draggable.
                            // - Always undefined if no any droppable is hovered by the draggable for `dropEvaluation`.
                            // - Omitted on all other events.
                            if (dropSideEventName === 'dropHandshake') {
                                expect(dropSideEvent.dropResponse).toBe(
                                    // The default drop response is `true`, unless overriden:
                                    simulateDropAccept ?? true
                                );
                            }
                            else if (dropSideEventName === 'dropEvaluation') {
                                expect(dropSideEvent.dropResponse).toBe(
                                    anyHoveredByDraggable
                                    
                                    // The default drop response is `true`, unless overriden:
                                    ? simulateDropAccept ?? true
                                    
                                    // Not hovered by the draggable → always no response:
                                    : undefined
                                );
                            }
                            else {
                                expect('dropResponse' in dropSideEvent).toBe(false);
                            } // if
                        }
                        else {
                            // The event is not triggered for this droppable position, so the event should be undefined:
                            expect(dropSideEvent).toBeUndefined();
                        } // if
                    } // for
                } // for
                
                
                
                // Verify there's no unverified events left:
                expect(dragDropEvents.size).toBe(0);
            } // for
        });
    } // for
});
