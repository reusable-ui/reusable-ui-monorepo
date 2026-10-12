import { expectType, expectNotAssignable } from 'tsd'
import {
    // Data:
    type DragPayload,
    type DropMetadata,
    
    
    
    // Lifecycles:
    
    // Activations:
    type DragStartEvent,
    type DragPresenceEvent,
    
    // Deactivations:
    type DragEndEvent,
    type DragAbsenceEvent,
    
    // Handshakes:
    type DragHandshakeEvent,
    type DropHandshakeEvent,
    
    // Evaluations:
    type DragEvaluationEvent,
    type DropEvaluationEvent,
    
    // Commits:
    type DragCommitEvent,
    type DropCommitEvent,
} from '../dist/index.js'



// Declare test instances for all event types to be used in assertions:

// Draggable sides:
declare const dragStartEvent      : DragStartEvent
declare const dragEndEvent        : DragEndEvent
declare const dragHandshakeEvent  : DragHandshakeEvent
declare const dragEvaluationEvent : DragEvaluationEvent
declare const dragCommitEvent     : DragCommitEvent

// Droppable sides:
declare const dragPresenceEvent   : DragPresenceEvent
declare const dragAbsenceEvent    : DragAbsenceEvent
declare const dropHandshakeEvent  : DropHandshakeEvent
declare const dropEvaluationEvent : DropEvaluationEvent
declare const dropCommitEvent     : DropCommitEvent



// ============================================================================
// 1. All `dragPayload` properties in the drag and drop side events should be 
// mandatory `DragPayload`. Always exists on both draggable and droppable events.
// ============================================================================

// Draggable sides:
expectType<DragPayload>(dragStartEvent.dragPayload)
expectType<DragPayload>(dragEndEvent.dragPayload)
expectType<DragPayload>(dragHandshakeEvent.dragPayload)
expectType<DragPayload>(dragEvaluationEvent.dragPayload)
expectType<DragPayload>(dragCommitEvent.dragPayload)

// Droppable sides:
expectType<DragPayload>(dragPresenceEvent.dragPayload)
expectType<DragPayload>(dragAbsenceEvent.dragPayload)
expectType<DragPayload>(dropHandshakeEvent.dragPayload)
expectType<DragPayload>(dropEvaluationEvent.dragPayload)
expectType<DragPayload>(dropCommitEvent.dragPayload)



// ============================================================================
// 2. All `dropMetadata` properties in the droppable side events should be 
// mandatory `DropMetadata` (an inherent property of the droppable side).
// ============================================================================

// Droppable sides:
expectType<DropMetadata>(dragPresenceEvent.dropMetadata)
expectType<DropMetadata>(dragAbsenceEvent.dropMetadata)
expectType<DropMetadata>(dropHandshakeEvent.dropMetadata)
expectType<DropMetadata>(dropEvaluationEvent.dropMetadata)
expectType<DropMetadata>(dropCommitEvent.dropMetadata)



// ============================================================================
// 3. `dropMetadata` property rules on the draggable side events:
// ============================================================================

// Draggable sides:

// - DragStartEvent: `dropMetadata` doesn't exist since at activation, 
// the droppable is never contacted.
expectNotAssignable<{ dropMetadata: any }>(dragStartEvent)

// - DragHandshakeEvent and DragCommitEvent: `dropMetadata` should be 
// mandatory since both sides are explicitly in contact.
expectType<DropMetadata>(dragHandshakeEvent.dropMetadata)
expectType<DropMetadata>(dragCommitEvent.dropMetadata)

// - DragEndEvent and DragEvaluationEvent: `dropMetadata` should be nullable 
// because it's possible the draggable and droppable sides are not in contact.
expectType<DropMetadata | undefined>(dragEndEvent.dropMetadata)
expectType<DropMetadata | undefined>(dragEvaluationEvent.dropMetadata)



// ============================================================================
// 4. `pointedElement` property rules on both draggable and droppable side events:
// ============================================================================

// - DragHandshakeEvent, DropHandshakeEvent, DragCommitEvent, and DropCommitEvent:
// `pointedElement` should be mandatory since both sides are explicitly in contact.

// Draggable sides:
expectType<Element>(dragHandshakeEvent.pointedElement)
expectType<Element>(dragCommitEvent.pointedElement)

// Droppable sides:
expectType<Element>(dropHandshakeEvent.pointedElement)
expectType<Element>(dropCommitEvent.pointedElement)

// - The rest drag/drop events:
// `pointedElement` should be nullable because it's possible
// the draggable and droppable sides are not in contact.

// Draggable sides:
expectType<Element | null>(dragStartEvent.pointedElement)
expectType<Element | null>(dragEndEvent.pointedElement)
expectType<Element | null>(dragEvaluationEvent.pointedElement)

// Droppable sides:
expectType<Element | null>(dragPresenceEvent.pointedElement)
expectType<Element | null>(dragAbsenceEvent.pointedElement)
expectType<Element | null>(dropEvaluationEvent.pointedElement)
