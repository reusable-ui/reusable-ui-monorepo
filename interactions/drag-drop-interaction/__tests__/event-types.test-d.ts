import { expectType, expectNotAssignable } from 'tsd'
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

// Declare test instances for all event types to be used in assertions
declare const dragStartEvent: DragStartEvent;
declare const dragEndEvent: DragEndEvent;
declare const dragHandshakeEvent: DragHandshakeEvent;
declare const dragEvaluationEvent: DragEvaluationEvent;
declare const dragCommitEvent: DragCommitEvent;

declare const dragPresenceEvent: DragPresenceEvent;
declare const dragAbsenceEvent: DragAbsenceEvent;
declare const dropHandshakeEvent: DropHandshakeEvent;
declare const dropEvaluationEvent: DropEvaluationEvent;
declare const dropCommitEvent: DropCommitEvent;


// ============================================================================
// 1. All `dragPayload` properties in the drag and drop side events should be 
// mandatory `DragPayload`. Always exists on both draggable and droppable events.
// ============================================================================

// Draggable sides:
expectType<DragPayload>(dragStartEvent.dragPayload);
expectType<DragPayload>(dragEndEvent.dragPayload);
expectType<DragPayload>(dragHandshakeEvent.dragPayload);
expectType<DragPayload>(dragEvaluationEvent.dragPayload);
expectType<DragPayload>(dragCommitEvent.dragPayload);

// Droppable sides:
expectType<DragPayload>(dragPresenceEvent.dragPayload);
expectType<DragPayload>(dragAbsenceEvent.dragPayload);
expectType<DragPayload>(dropHandshakeEvent.dragPayload);
expectType<DragPayload>(dropEvaluationEvent.dragPayload);
expectType<DragPayload>(dropCommitEvent.dragPayload);


// ============================================================================
// 2. All `dropMetadata` properties in the droppable side events should be 
// mandatory `DropMetadata` (an inherent property of the droppable side).
// ============================================================================
expectType<DropMetadata>(dragPresenceEvent.dropMetadata);
expectType<DropMetadata>(dragAbsenceEvent.dropMetadata);
expectType<DropMetadata>(dropHandshakeEvent.dropMetadata);
expectType<DropMetadata>(dropEvaluationEvent.dropMetadata);
expectType<DropMetadata>(dropCommitEvent.dropMetadata);


// ============================================================================
// 3. `dropMetadata` property rules on the draggable side events:
// ============================================================================

// - DragStartEvent: `dropMetadata` doesn't exist since at activation, 
// the droppable is never contacted.
expectNotAssignable<{ dropMetadata: any }>(dragStartEvent);

// - DragHandshakeEvent and DragCommitEvent: `dropMetadata` should be 
// mandatory since both sides are explicitly in contact.
expectType<DropMetadata>(dragHandshakeEvent.dropMetadata);
expectType<DropMetadata>(dragCommitEvent.dropMetadata);

// - DragEndEvent and DragEvaluationEvent: `dropMetadata` should be nullable 
// because it's possible the draggable and droppable sides are not in contact.
expectType<DropMetadata | undefined>(dragEndEvent.dropMetadata);
expectType<DropMetadata | undefined>(dragEvaluationEvent.dropMetadata);
