# 📘 JSDoc Convention Notes

## General Rule
- **Always explain the intent (what it does)** rather than the object definition (what it is).  
- Start with a **verb** (e.g., *Validates*, *Provides*, *Resolves*) instead of a noun phrase (*A handler...*, *An object...*).  
- Keep the first sentence concise and action-oriented.

## Special Cases

### 🔄 Event Callbacks (`onXXX`)
- **Paragraph 1 (Intent)**: Describe what the handler *does* when invoked.  
- **Paragraph 2 (Invocation frequency)**: Explain *when/how often* it is called.  
- **Paragraph 3 (Response detail, if applicable)**: Clarify how the handler communicates its decision (e.g., mutating a field).  
- **Paragraph 4 (Technical detail, optional)**: Note any async support, defaults, or integration specifics.

**Examples:**

```ts
/**
 * Validates the droppable's metadata and responds with acceptance or rejection.
 * 
 * Invoked continuously during drag gesture movements
 * whenever this draggable hovers over a droppable.
 * 
 * The handler communicates its decision by mutating `event.dragResponse`.
 * Supports both synchronous and asynchronous callbacks,
 * allowing either immediate checks or deferred validation before updating the response.
 * 
 * If omitted, or if no handler mutates `event.dragResponse`,
 * the response defaults to `undefined` (no decision).
 */
onDragHandshake?: (event: DragHandshakeEvent<TElement>) => void | Promise<void>
```

```ts
/**
 * Applies the draggable's payload to business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * Invoked once the drag gesture ends on this droppable
 * but only if both draggable and droppable sides accepted.
 */
onDropped?: (event: DroppedEvent<TElement>) => void
```

### 🎯 Event Types (`XXXEvent`)
- **Paragraph 1 (Emission frequency)**: Describe *when/how often* the event is emitted.  
- **Paragraph 2 (Intent/role)**: Explain what the event *provides or carries*.  
- **Paragraph 3 (Response detail, if applicable)**: Expand on mutability or defaults.  
- **Paragraph 4 (Technical detail, optional)**: Note inheritance, extensions, or structural details.

**Examples:**

```ts
/**
 * Emitted continuously during drag gesture movements
 * whenever this draggable hovers over a droppable.
 * 
 * Carries the droppable's metadata along with a mutable `dragResponse` field
 * that records acceptance, rejection, or no decision.
 * 
 * The `dragResponse` field is mutable, allowing the draggable to
 * communicate its decision based on the inspected metadata.
 * If left unchanged, the response defaults to `undefined` (no decision).
 * 
 * Extends a React `PointerEvent` with the `dragResponse` field
 * used for negotiation between draggable and droppable.
 */
export interface DragHandshakeEvent<TElement extends Element = HTMLElement>
    extends Omit<DragDropHandshakeEvent<TElement>, 'response'>
{
    readonly dropMetadata: DropMetadata
    dragResponse: boolean | undefined
}
```

```ts
/**
 * Emitted once the drag gesture ends on the droppable side,
 * but only if both draggable and droppable sides accepted.
 * 
 * Provides a committed transaction for applying the draggable's payload to business logic
 * such as updating state, persisting data, or triggering side effects.
 * 
 * Extends a React `PointerEvent` with the draggable payload.
 */
export interface DroppedEvent<TElement extends Element = HTMLElement>
    extends DragDropCommittedEvent<TElement>
{
    readonly dragPayload: DragPayload
}
```

## ✨ Key Takeaways
- **General objects/functions** → start with **intent**.  
- **Callbacks (`onXXX`)** → intent first, then invocation frequency.  
- **Events (`XXXEvent`)** → emission frequency first, then intent/role.  
- Maintain a **4-paragraph rhythm** (intent/emission → behavior → response detail → technical detail).  
- Merge or omit the "response detail" paragraph if the event is read-only (e.g., evaluation events).  
