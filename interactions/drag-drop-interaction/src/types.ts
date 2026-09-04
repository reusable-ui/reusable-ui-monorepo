// React:
import {
    // Types:
    type PointerEvent,
    type RefObject,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Types:
    type EventHandler,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.




// Data:

/**
 * Represents drag-and-drop data exchanged between draggable and droppable.
 * 
 * This generic read-only map is not tied to the browser's native `DataTransfer`.
 * It can hold any application-specific payload or metadata needed for negotiation.
 * 
 * Keys are typically descriptive identifiers
 * (e.g. `"productId"`, `"file/0"`, or `Symbol(...)`).
 * Values can be files, strings, promises, plain objects, callbacks, or other structured data.
 * 
 * Unrecognized keys are ignored by the other side, allowing both draggable and droppable
 * to attach their own business-specific data without interfering with negotiation.
 */
export type DragDropData = ReadonlyMap<unknown, unknown>

/**
 * Carries the actual data being dragged (payload) — for example:
 * - Identifiers (`productId`, `transactionId`)
 * - Files (`File` objects)
 * - Business objects or structured payloads
 * 
 * This is what the droppable inspects during handshake
 * to decide whether it wants to accept the incoming drag.
 * 
 * Keys are typically descriptive identifiers relevant to the payload
 * (e.g. `"productId"`, `"file/0"`, or `Symbol(...)`).
 * Values can be files, strings, promises, plain objects, callbacks, or other structured data.
 * 
 * Unrecognized keys are ignored by the droppable, allowing the draggable
 * to attach extra business-specific payload without interfering with negotiation.
 */
export type DragPayload  = DragDropData

/**
 * Exposes the target's business context (metadata) — for example:
 * - Zone identifiers (`categoryId`, `dropZoneId`)
 * - Accepted types (`"image/*"`, `"text/plain"`)
 * - Custom flags or hints for styling/UX
 * 
 * This is what the draggable inspects during handshake
 * to decide whether the target is a valid partner for the current drag.
 * 
 * Keys are typically descriptive identifiers relevant to the target
 * (e.g. `"categoryId"`, `"acceptedType"`, or `Symbol(...)`).
 * Values can be strings, flags, plain objects, callbacks, or other structured metadata.
 * 
 * Unrecognized keys are ignored by the draggable, allowing the droppable
 * to expose extra business-specific metadata without interfering with negotiation.
 */
export type DropMetadata = DragDropData



// Handshakes:

/**
 * Emitted continuously during drag gesture movements
 * while a draggable hovers over a droppable.
 * 
 * Carries the pair's data along with a mutable `response` field
 * that records acceptance, rejection, or no decision.
 * 
 * The `response` field is mutable,
 * allowing implementations to communicate their decision during negotiation.
 * If left unchanged, the response defaults to `undefined` (no decision).
 * 
 * Extends a React `PointerEvent` with the `response` field
 * used for negotiation between draggable and droppable.
 */
export interface DragDropHandshakeEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        PointerEvent<TElement>
{
    /**
     * The handshake response state from the current side.
     * 
     * This field is mutable,
     * allowing implementations to communicate their decision during negotiation.
     * If left unchanged, the response defaults to `undefined` (no decision).
     * 
     * Possible values:
     * - `true`      → accepted (may show ✅ feedback to indicate a valid drop zone)
     * - `false`     → rejected (may show 🚫 feedback to indicate drop not allowed)
     * - `undefined` → ignored  (no feedback; user keeps searching for a valid drop zone)
     */
    response      : boolean | undefined
    
    relatedTarget : EventTarget // Narrows down from `EventTarget | null` to `EventTarget` since the droppable element is already in contact.
}

/**
 * Emitted continuously during drag gesture movements
 * while this draggable hovers over a droppable.
 * 
 * Carries the droppable's metadata along with a mutable `dragResponse` field
 * that records acceptance, rejection, or no decision.
 * 
 * The `dragResponse` field is mutable,
 * allowing the draggable to communicate its decision based on the inspected metadata.
 * If left unchanged, the response defaults to `undefined` (no decision).
 * 
 * Extends a React `PointerEvent` with the `dragResponse` field
 * used for negotiation between draggable and droppable.
 */
export interface DragHandshakeEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<DragDropHandshakeEvent<TElement>,
            | 'response' // Rename to `dragResponse` for the drag side.
        >
{
    /**
     * The metadata exposed by the candidate droppable target.
     * 
     * Allows the draggable to inspect the target's business context
     * (e.g. categoryId, accepted types, flags, or other attributes)
     * before deciding acceptance.
     */
    readonly dropMetadata : DropMetadata
    
    /**
     * The handshake response state from the draggable source,
     * based on the inspected `dropMetadata`.
     * 
     * This field is mutable,
     * allowing the draggable to communicate its decision based on the inspected metadata.
     * If left unchanged, the response defaults to `undefined` (no decision).
     * 
     * Possible values:
     * - `true`      → accepted (may show ✅ feedback to indicate a valid drop zone)
     * - `false`     → rejected (may show 🚫 feedback to indicate drop not allowed)
     * - `undefined` → ignored  (no feedback; user keeps searching for a valid drop zone)
     */
    dragResponse          : DragDropHandshakeEvent['response']
}

/**
 * Emitted continuously during drag gesture movements
 * while a draggable hovers over this droppable.
 * 
 * Carries the draggable's payload along with a mutable `dropResponse` field
 * that records acceptance, rejection, or no decision.
 * 
 * The `dropResponse` field is mutable,
 * allowing the droppable to communicate its decision based on the inspected payload.
 * If left unchanged, the response defaults to `undefined` (no decision).
 * 
 * Extends a React `PointerEvent` with the `dropResponse` field
 * used for negotiation between draggable and droppable.
 */
export interface DropHandshakeEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<DragDropHandshakeEvent<TElement>,
            | 'response' // Rename to `dropResponse` for the drop side.
        >
{
    /**
     * The payload carried by the draggable source.
     * 
     * Allows the droppable to inspect the actual data being dragged
     * (e.g. productId, file type, or other attributes)
     * before deciding acceptance.
     */
    readonly dragPayload  : DragPayload
    
    /**
     * The handshake response state from the droppable target,
     * based on the inspected `dragPayload`.
     * 
     * This field is mutable,
     * allowing the droppable to communicate its decision based on the inspected payload.
     * If left unchanged, the response defaults to `undefined` (no decision).
     * 
     * Possible values:
     * - `true`      → accepted (may show ✅ feedback to indicate a valid payload)
     * - `false`     → rejected (may show 🚫 feedback to indicate an invalid payload)
     * - `undefined` → ignored  (no feedback; user keeps searching for a valid drop zone)
     */
    dropResponse          : DragDropHandshakeEvent['response']
}



// Evaluations:

/**
 * Emitted continuously after handshake negotiation,
 * reflecting the current acceptance/rejection state.
 * 
 * Enables live feedback from both sides during a drag gesture,
 * such as "drop here" indicators, cursor changes,
 * or other contextual hints.
 * 
 * Extends a React `PointerEvent` with drag-drop responses.
 */
export interface DragDropEvaluationEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        PointerEvent<TElement>
{
    /**
     * The handshake response state from the draggable source.
     * 
     * Indicates the draggable's willingness to drop onto the hovered target:
     * - `true`      → accepted (may show ✅ feedback to indicate a valid drop zone)
     * - `false`     → rejected (may show 🚫 feedback to indicate drop not allowed)
     * - `undefined` → ignored  (no feedback; user keeps searching for a valid drop zone)
     */
    readonly dragResponse : boolean | undefined
    
    /**
     * The handshake response state from the droppable target.
     * 
     * Indicates the droppable's willingness to accept the draggable's payload:
     * - `true`      → accepted (may show ✅ feedback to indicate a valid payload)
     * - `false`     → rejected (may show 🚫 feedback to indicate an invalid payload)
     * - `undefined` → ignored  (no feedback; user keeps searching for a valid drop zone)
     */
    readonly dropResponse : boolean | undefined
}

/**
 * Emitted continuously after handshake negotiation,
 * reflecting the current acceptance/rejection state.
 * 
 * Enables live feedback from the draggable side during a drag gesture,
 * such as "drop here" indicators, cursor changes,
 * or other contextual hints.
 * 
 * Extends a React `PointerEvent` with drag-drop responses and droppable metadata.
 */
export interface DragEvaluationEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        DragDropEvaluationEvent<TElement>
{
    /**
     * The metadata of the currently hovered droppable target.
     * 
     * Allows the draggable to pick the target's business context
     * (e.g. categoryId, accepted types, flags, or other attributes)
     * and render contextual hints such as:
     * "Drop Product A into Category B" or "Drop Product A into a category".
     * 
     * Becomes `undefined` when the draggable is not hovering over any droppable.
     */
    readonly dropMetadata : DropMetadata | undefined
}

/**
 * Emitted continuously after handshake negotiation,
 * reflecting the current acceptance/rejection state.
 * 
 * Enables live feedback from the droppable side during a drag gesture,
 * such as "drop here" highlights, glow effects,
 * or other contextual hints.
 * 
 * Extends a React `PointerEvent` with drag-drop responses and draggable payload.
 */
export interface DropEvaluationEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        DragDropEvaluationEvent<TElement>
{
    /**
     * The payload of the active draggable source.
     * 
     * Allows the droppable to pick the actual data being dragged
     * (e.g. productId, file type, or other attributes)
     * and render contextual hints such as:
     * "Please drop Product A here" or "Drag File X to the desired folder".
     * 
     * Always defined — never `undefined` — even when the draggable
     * is not hovering over this droppable.
     * 
     * ⚠️ Note: If you intend to evaluate the payload specifically
     * for the active droppable under the pointer, check `isTargeted` first.
     * Otherwise you may be inspecting payload data that was
     * broadcast for another droppable.
     */
    readonly dragPayload  : DragPayload
    
    /**
     * Indicates whether the draggable is currently hovering over *this* droppable.
     * 
     * - `true` → The evaluation event corresponds to this droppable element,
     *   meaning it is the active candidate under the pointer.
     * - `false` → The evaluation event was broadcast for another droppable,
     *   so this droppable is not the current target.
     * 
     * Useful for distinguishing between global evaluation broadcasts and
     * the droppable that is actually being pointed at.
     */
    readonly isTargeted   : boolean
}



// Commits:

/**
 * Emitted once the drag gesture ends on the current side,
 * but only if both draggable and droppable sides accepted.
 * 
 * Represents a committed transaction for applying the pair's data to business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * Extends a React `PointerEvent` with the drag-drop result.
 */
export interface DragDropCommittedEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        PointerEvent<TElement>
{
    relatedTarget : EventTarget // Narrows down from `EventTarget | null` to `EventTarget` since the droppable element is already in contact.
}

/**
 * Emitted once the drag gesture ends on the draggable side,
 * but only if both draggable and droppable sides accepted.
 * 
 * Peeks the target's business context (metadata) for the business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * Extends a React `PointerEvent` with the droppable metadata.
 */
export interface DraggedEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        DragDropCommittedEvent<TElement>
{
    /**
     * The metadata exposed by the accepted droppable target.
     * 
     * Allows the draggable to pick the target's business context
     * (e.g. categoryId, accepted types, flags, or other attributes) after approval.
     */
    readonly dropMetadata : DropMetadata
}

/**
 * Emitted once the drag gesture ends on the droppable side,
 * but only if both draggable and droppable sides accepted.
 * 
 * Delivers the actual data being dragged (payload) for the business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * Extends a React `PointerEvent` with the draggable payload.
 */
export interface DroppedEvent<TElement extends Element = HTMLElement>
    extends
        // Bases:
        DragDropCommittedEvent<TElement>
{
    /**
     * The payload delivered by the draggable source.
     * 
     * Allows the droppable to apply business logic for the payload
     * (e.g. productId, file type, or other attributes) after approval.
     */
    readonly dragPayload  : DragPayload
}



// Props:

/**
 * Props for configuring a draggable source and handling drag lifecycle events.
 */
export interface DraggableStateProps<TElement extends Element = HTMLElement> {
    // Data:
    
    /**
     * Carries the actual data being dragged (payload) from this draggable source.
     * 
     * Allows droppables to inspect the payload
     * (e.g. productId, file type, or other attributes)
     * before deciding acceptance.
     * 
     * Defaults to an empty payload (no carried data).
     */
    dragPayload      ?: DragPayload
    
    
    
    // Refs:
    
    /**
     * The reference to the DOM element that serves as the draggable source.
     * 
     * If `null` or resolves to `null`, the zone is treated as disabled
     * (equivalent to `dragEnabled = false`).
     * 
     * Defaults to `null` (no DOM element reference).
     */
    dragRef          ?: RefObject<TElement | null> | TElement | null
    
    
    
    // Behaviors:
    
    /**
     * Controls whether this draggable participates in drag-drop interactions:
     * - `true`  → the element can be dragged.
     * - `false` → the element cannot be dragged.
     * 
     * **Default behavior:**  
     * - If the component is enabled  → defaults to `true` (draggable).
     * - If the component is disabled → defaults to `false` (not draggable).
     * 
     * You can override this default by explicitly passing `dragEnabled`.
     */
    dragEnabled      ?: boolean
    
    /**
     * Filters candidate elements to determine valid drop targets.
     * 
     * Useful to bypass non-target overlays such as floating drag previews or cursor indicators
     * ensuring hit-testing lands on an actual candidate element.
     */
    dropPredicate    ?: (dropCandidate: Element) => boolean
    
    
    
    // States:
    
    /**
     * Detects whether the component is actively and continuously being dragged:
     * - `true`  → the component is in an ongoing drag gesture
     * - `false` → no dragging activity
     * 
     * Developers must supply `computedDrag` for correctness; otherwise, the component stays idle.
     * Commonly supplied from the resolved `actualDragged` state returned by `useDragState()` or alternatively
     * the returned value from `useResolvedDragged()`.
     * 
     * Disabled behavior:
     * - When disabled, the component is always treated as idle (`false`), regardless of `computedDrag`.
     * - When re-enabled, the component resumes following the passed `computedDrag` value.
     * - To enforce a "remain idle until user re-drags" contract in this mode,
     *   implementors must manage a persistent idle state in their own logic (e.g. suppressing `true` until a new `pointerdown` event is observed).
     *   The returned state from `useDragState()` or `useResolvedDragged()` already implements this persistence.
     * 
     * Defaults to `false` (no dragging activity).
     */
    computedDrag     ?: boolean
    
    
    
    // Events:
    
    /**
     * Validates the target's business context (metadata) and responds with acceptance or rejection.
     * 
     * Invoked continuously during drag gesture movements
     * while this draggable hovers over a droppable.
     * 
     * The handler communicates its decision by mutating `event.dragResponse`.
     * Supports both synchronous and asynchronous callbacks,
     * allowing either immediate checks or deferred validation before updating the response.
     * 
     * If omitted, or if no handler mutates `event.dragResponse`,
     * the response defaults to `undefined` (no decision).
     */
    onDragHandshake  ?: (event: DragHandshakeEvent<TElement>) => void | Promise<void>
    
    /**
     * Enables live feedback from the draggable side during a drag gesture,
     * such as "drop here" indicators, cursor changes,
     * or other contextual hints.
     * 
     * Invoked continuously after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     */
    onDragEvaluation ?: EventHandler<DragEvaluationEvent<TElement>>
    
    /**
     * Peeks the target's business context (metadata) for the business logic
     * such as updating state, persisting data, or triggering side effects.
     * 
     * Invoked once the drag gesture ends on this draggable
     * but only if both draggable and droppable sides accepted.
     */
    onDragged        ?: EventHandler<DraggedEvent<TElement>>
}

/**
 * Props for configuring a droppable target and handling drop lifecycle events.
 */
export interface DroppableStateProps<TElement extends Element = HTMLElement> {
    // Data:
    
    /**
     * Exposes the business context (metadata) of this droppable target.
     * 
     * Allows draggables to inspect the metadata
     * (e.g. categoryId, accepted types, flags, or other attributes)
     * before deciding acceptance.
     * 
     * Defaults to an empty metadata (no exposed data).
     */
    dropMetadata     ?: DropMetadata
    
    
    
    // Refs:
    
    /**
     * The reference to the DOM element that serves as the droppable target.
     * 
     * If `null` or resolves to `null`, the zone is treated as disabled
     * (equivalent to `dropEnabled = false`).
     * 
     * Defaults to `null` (no DOM element reference).
     */
    dropRef          ?: RefObject<TElement | null> | TElement | null
    
    
    
    // Behaviors:
    
    /**
     * Controls whether this droppable participates in drag-drop interactions:
     * - `true`  → the element can accept drops.
     * - `false` → the element cannot accept drops.
     * 
     * **Default behavior:**  
     * - If the component is enabled  → defaults to `true` (droppable).
     * - If the component is disabled → defaults to `false` (not droppable).
     * 
     * You can override this default by explicitly passing `dropEnabled`.
     */
    dropEnabled      ?: boolean
    
    
    
    // Events:
    
    /**
     * Validates the actual data being dragged (payload) and responds with acceptance or rejection.
     * 
     * Invoked continuously during drag gesture movements
     * while a draggable hovers over this droppable.
     * 
     * The handler communicates its decision by mutating `event.dropResponse`.
     * Supports both synchronous and asynchronous callbacks,
     * allowing either immediate checks or deferred validation before updating the response.
     * 
     * If omitted, or if no handler mutates `event.dropResponse`,
     * the response defaults to `undefined` (no decision).
     */
    onDropHandshake  ?: (event: DropHandshakeEvent<TElement>) => void | Promise<void>
    
    /**
     * Enables live feedback from the droppable side during a drag gesture,
     * such as "drop here" highlights, glow effects,
     * or other contextual hints.
     * 
     * Invoked continuously after handshake negotiation,
     * reflecting the current acceptance/rejection state.
     */
    onDropEvaluation ?: EventHandler<DropEvaluationEvent<TElement>>
    
    /**
     * Delivers the actual data being dragged (payload) for the business logic
     * such as updating state, persisting data, or triggering side effects.
     * 
     * Invoked once the drag gesture ends on this droppable
     * but only if both draggable and droppable sides accepted.
     */
    onDropped        ?: EventHandler<DroppedEvent<TElement>>
}



// Reactive states:

/**
 * Represents the reactive draggable state reflecting the current drag activity status
 * and evaluation outcome for this specific draggable source.
 * 
 * Unlike `DragEvaluationEvent`, which always carries the active droppable's metadata,
 * this state only exposes metadata and acceptance when the draggable is
 * actually hovering over a droppable zone and both sides have agreed.
 */
export interface DraggableState {
    /**
     * Represents whether a drag gesture is currently targeting a droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside all droppable zones, or either side has not responded
     * - `false`     → drag gesture active over a droppable zone but rejected by one or both sides
     * - `true`      → drag gesture active over a droppable zone and mutually accepted
     * 
     * This status drives live acceptance feedback such as cursor changes,
     * ✅ / 🚫 icons, or hint text.
     */
    dragStatus   : undefined | null | boolean
    
    /**
     * Exposes the business context (metadata) of the droppable target
     * currently hovered by this draggable.
     * 
     * Allows the draggable to pick the target's business context
     * (e.g. categoryId, accepted types, flags, or other attributes)
     * and render contextual hints such as:
     * "Drop Product A into Category B" or "Drop Product A into a category".
     * 
     * Becomes `undefined` when:
     * - Not hovering over any droppable zone, or
     * - Either side has not responded (`undefined`), or
     * - Either side explicitly rejected (`false`).
     * 
     * Differs from `DragEvaluationEvent.dropMetadata`,
     * which is always reported during a drag gesture (undefined only when not hovering),
     * whereas here it is stricter: metadata is only preserved when the draggable
     * is actively hovering and both sides have agreed.
     */
    dropMetadata : DropMetadata | undefined
}

/**
 * Represents the reactive droppable state reflecting the current drop activity status
 * and evaluation outcome for this specific droppable target.
 * 
 * Unlike `DropEvaluationEvent`, which always carries the active draggable's payload,
 * this state only exposes payload and acceptance when the draggable is
 * actually hovering over this droppable zone and both sides have agreed.
 */
export interface DroppableState {
    /**
     * Represents whether a drag gesture is currently targeting this droppable zone:
     * - `undefined` → no drag activity at all
     * - `null`      → drag gesture active but outside this zone, or either side has not responded
     * - `false`     → drag gesture active over this zone but rejected by one or both sides
     * - `true`      → drag gesture active over this zone and mutually accepted
     * 
     * This status drives live acceptance feedback such as highlights,
     * ✅ / 🚫 icons, or hint text.
     */
    dropStatus   : undefined | null | boolean
    
    /**
     * Exposes the actual data being dragged (payload) from the draggable source
     * currently hovering over this droppable.
     * 
     * Allows the droppable to pick the actual data being dragged
     * (e.g. productId, file type, or other attributes)
     * and render contextual hints such as:
     * "Please drop Product A here" or "Drag File X to the desired folder".
     * 
     * Becomes `undefined` when:
     * - No draggable is hovering over this zone, or
     * - Either side has not responded (`undefined`), or
     * - Either side explicitly rejected (`false`).
     * 
     * Differs from `DropEvaluationEvent.dragPayload`,
     * which is always available during a drag gesture
     * regardless of handshake outcome.
     */
    dragPayload  : DragPayload | undefined
}



// Integrations:

/**
 * Represents an attached integration handler that bridges native HTML Drag & Drop events (including file drags and third-party draggables)
 * into the `useDroppableState()` system.
 * 
 * Each call to `integrateNativeDrag()` produces a handler that manages its own lifecycle:
 * - Setup runs once globally when the first handle is created.
 * - Cleanup runs once globally when the last handle is disintegrated.
 * - `disintegrate()` is idempotent: only the first call per handle is effective.
 */
export interface NativeDragIntegration {
    /**
     * Cleans up this integration instance.
     * 
     * Idempotent: only the first call per instance is effective;
     * subsequent calls are ignored.
     */
    disintegrate : () => void
}
