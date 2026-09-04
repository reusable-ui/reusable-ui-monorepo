# @reusable-ui/drag-drop-interaction 📦  

**drag-drop-interaction** orchestrates the transaction logic for building rich drag-and-drop workflows.  
Enabling cross-component interactions with **data exchange, live UX feedback, and reliable commit events**.

This library focuses on the **transaction logic** between draggables and droppables.  
It does not reinvent press or drag mechanics, but instead coordinates with existing building blocks:

- [`press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) → Tracks whether the pointer is currently pressed or released.
- [`press-effect`](https://www.npmjs.com/package/@reusable-ui/press-effect) → Applies visual styling feedback as being pressed or released.
- [`drag-state`](https://www.npmjs.com/package/@reusable-ui/drag-state) → Continuously tracks pointer coordinates during press-and-hold gestures.
- [`drag-effect`](https://www.npmjs.com/package/@reusable-ui/drag-effect) → Renders a floating component (ghost image) that follows the pointer during a drag gesture.

Working together, these states and effects form a complete drag-and-drop experience.  
**drag-drop-interaction** sits at the top of the stack, orchestrating the entire negotiation lifecycle:  
**Start drag animation → Validate payload → Update live UX feedback → Commit the drop event.**

With **drag-drop-interaction**, you can build: 
- **Kanban Boards** — Move structured tasks across status columns with live acceptance feedback.
- **File Uploaders** — Drag files onto designated drop zones with validation and rejection states.
- **Interactive UI Builders** — Drop UI elements onto a canvas backed by strict business rules and constraints.
- **Sortable Lists** — Rearrange items or images using fluid drag-and-drop gestures.
- **Custom Draggables** — Power any component that needs to visually exchange data via dragging.

## 🔀 Comparison: drag-drop-interaction vs Native HTML Drag & Drop API

| Aspect | **Native HTML Drag & Drop API** | **drag-drop-interaction** |
|--------|---------------------------------|---------------------------|
| **Input device support** | Only supports mouse-based dragging; touch and pen input are not natively handled. | Polyfilled to support any pointing device (mouse, touch, stylus), ensuring consistent drag-drop behavior across platforms. |
| **Data model** | Relies on `DataTransfer` (string-based, loosely typed). | Uses generic, strongly typed **DragPayload** and **DropMetadata** objects for safe, expressive data exchange. |
| **Type safety** | Payloads must be stringified for arbitrary types. | TypeScript-first: payloads and metadata are strongly typed (value or reference types). |
| **Event lifecycle** | Limited to `dragstart`, `dragover`, `drop`. | Full lifecycle: **Handshake → Evaluation → Commit**, with granular events for negotiation, feedback, and delivery. |
| **Negotiation** | One-way flow; droppable zones cannot inspect payloads until drop occurs. | Two-way handshake: draggables expose payloads, droppables expose metadata, both sides respond before commit. |
| **Hit-testing** | Browser-native hover detection (varies by engine). | Pointer-based hit-testing via `elementFromPoint()` with `dropPredicate` for filtering droppable candidates. |
| **Styling hooks** | Requires manual DOM state management or custom event wiring. | Continuous inspection events drive live UX feedback (hover, pulse, shake). |
| **Ghost image** | Uses custom ghost images via `setDragImage()`, but limited to a single DOM node or image element with fixed transparency. | Uses any React component as the ghost image, with customizable transparency and styling. |
| **State awareness** | No built-in global awareness; zones can only react when hovered. Developers can simulate global awareness by wiring draggable events manually. | Broadcasts global drag activity so droppables can style themselves proactively, even before hover. |
| **Extensibility** | Browser-bound, imperative customization. | Reactive hook-based, extensible foundation for custom drag-drop primitives (lists, boards, file uploads, etc.). |

### 🧩 Key Insight
The native API provides **raw mechanics** — enough to implement basic drag/drop, but with limited negotiation, input device coverage, and styling flexibility.  
**@reusable-ui/drag-drop-interaction** elevates this into a **predictable, type-safe negotiation system** with lifecycle events, global awareness, multi-device support, and expressive styling hooks — designed for modern UI frameworks.

## ⚠️ Coordinated Dependencies: The Drag-Drop Stack

Drag-drop-interaction is not a standalone feature.  
It relies on a coordinated stack of discrete states and effects to deliver a complete, predictable user experience.
Each layer builds directly upon the previous one:

- [`press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) → Tracks whether the pointer is currently pressed or released.
- [`press-effect`](https://www.npmjs.com/package/@reusable-ui/press-effect) → Applies visual styling feedback as being pressed or released.
- [`drag-state`](https://www.npmjs.com/package/@reusable-ui/drag-state) → Continuously tracks pointer coordinates during press-and-hold gestures.
- [`drag-effect`](https://www.npmjs.com/package/@reusable-ui/drag-effect) → Renders a floating component (ghost image) that follows the pointer during a drag gesture.
- [`drag-drop-interaction`](https://www.npmjs.com/package/@reusable-ui/drag-drop-interaction) → Orchestrates the transaction logic between draggables and droppables.

### Why This Layering Matters
- **Press-state is foundational**: Without a reliable press detection, drag intent cannot be initiated.
- **Drag-state builds on press-state**: It uses the press state to continuously track movement and animate the component.
- **Drag-drop-interaction builds on drag-state**: It handles the actual business logic — negotiating payloads, evaluating drop zones (e.g., displaying a hint: "Drop Product A into Category B"), and committing the final result.

This strict separation of concerns ensures each piece remains focused, reusable, and testable.  
Application developers typically only need to interact with the **drag-drop-interaction** layer to build application features,
while component developers must wire the underlying [`press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) and [`drag-state`](https://www.npmjs.com/package/@reusable-ui/drag-state) primitives together for the system to function correctly.

## ✨ Features

✔ **Supports Any Pointing Device** — Ensures consistent drag-drop behavior across pointing devices (mouse, touch, stylus).
✔ **Two-Way Handshake Protocol** — Both draggable and droppable inspect each other's data before committing, ensuring predictable acceptance or rejection.  
✔ **Strongly Typed Data Exchange** — Uses **DragPayload** and **DropMetadata** for safe, expressive payloads and metadata, with full TypeScript support.  
✔ **Continuous Evaluation Events** — Broadcasts live negotiation results (`dragResponse`, `dropResponse`) for real-time UX feedback such as highlights, pulses, or shake effects.  
✔ **Clear Commit Events** — Finalized delivery via `DraggedEvent` and `DroppedEvent`, separating gesture feedback from business logic.  
✔ **Precision Hit-Testing** — Pointer-based detection using `elementFromPoint()` with customizable `dropPredicate` filtering for droppable candidates.  
✔ **Global Drag Awareness** — Droppables receive broadcasted drag activity even outside their zones, enabling proactive styling (e.g. “drop here” highlights).  
✔ **Framework-Friendly** — Designed for React environments with declarative props and reactive states.  

## 📦 Installation
Install **@reusable-ui/drag-drop-interaction** via npm or yarn:

```sh
npm install @reusable-ui/drag-drop-interaction --save-peer
# or
yarn add @reusable-ui/drag-drop-interaction --peer
```

⚠️ **Peer Dependency Requirement**

`drag-drop-interaction` relies on a centralized internal registry to recognize and coordinate droppable zones (the single source of truth).  
If multiple versions of the package are installed in the same project, draggables and droppables may fail to recognize each other, leading to inconsistent behavior.  

To avoid this, always install `@reusable-ui/drag-drop-interaction` as a **peer dependency**, ensuring that all components share the same registry instance.

## 🧩 Exported Hooks

### `useDraggableState(props)`

Serves a component as a draggable source
and provides reactive state reflecting the current drag lifecycle.

#### 💡 Usage Example

```tsx
import React, { type FC, useRef, useMemo } from 'react';
import { usePressState } from '@reusable-ui/press-state';
import { useDragState } from '@reusable-ui/drag-state';
import {
    type DragPayload,
    useDraggableState,
} from '@reusable-ui/drag-drop-interaction';
import { useMergedEventHandlers } from '@reusable-ui/callbacks'

export interface ProductCardProps {
    productModel: ProductModel
}

// A draggable product card.
// Can be dragged into categories that accept products.
export const ProductCard: FC<ProductCardProps> = ({ productModel }) => {
    // Payload describing this product (data carried during drag-drop):
    const productPayload = useMemo<DragPayload>(() => {
        // Extract product details from the model:
        return new Map<unknown, unknown>([
            ['type' , 'product'],
            ['id'   , productModel.id],
            ['name' , productModel.name],
            ['icon' , productModel.icon],
            ['stock', productModel.stock],
        ]);
    }, [productModel]);
    
    const dragCardRef = useRef<HTMLDivElement | null>(null);
    
    // Tracks whether the pointer is currently pressed or released:
    const pressState = usePressState({
        pressed: 'auto',
    });
    
    // Continuously tracks pointer coordinates during press-and-hold gestures:
    const dragState = useDragState({
        dragged: 'auto',
        computedDrag: pressState.pressed,
    });
    
    // Orchestrates the transaction logic for draggables:
    const { dragStatus, dropMetadata } = useDraggableState({
        dragRef      : dragCardRef,
        dragPayload  : productPayload,
        dragEnabled  : true,
        computedDrag : dragState.dragged,
        
        // Prevent the ghost image itself (product card) from being considered a valid drop target:
        dropPredicate(dropCandidate) {
            const cardElement = dragCardRef.current;
            return !cardElement || !cardElement.contains(dropCandidate);
        },
        
        // Handshake: only allow dropping into category zones
        async onDragHandshake(event) {
            // Optional: perform async validation here (e.g. API call).
            const isCategoryZone = event.dropMetadata.get('type') === 'category';
            
            // Communicate acceptance/rejection back to the droppable:
            event.dragResponse = isCategoryZone;
        },
        
        // Evaluation: provide live feedback while hovering over a category
        onDragEvaluation(event) {
            const categoryName = event.dropMetadata?.get('name');
            console.log(`Hovering over category: ${categoryName}`);
            // TODO: update ghost image with category label
        },
        
        // Commit: final drop resolution handled by droppable side,
        // but we can show confirmation here
        onDragged(event) {
            const categoryName = event.dropMetadata.get('name');
            console.log(`Dropped into category: ${categoryName}`);
            // TODO: show toast/notification confirming the move
        },
    });
    
    return (
        <div
            ref={dragCardRef}
            className={`product-card ${pressState.pressClassname} ${dragState.dragClassname}`}
            
            onAnimationStart={useMergedEventHandlers(pressState.handleAnimationStart, dragState.handleAnimationStart)}
            onAnimationEnd={useMergedEventHandlers(pressState.handleAnimationEnd, dragState.handleAnimationEnd)}
            onPointerDown={useMergedEventHandlers(pressState.handlePointerDown, dragState.handlePointerDown)}
            onPointerUp={pressState.handlePointerUp}
            onPointerCancel={pressState.handlePointerCancel}
            onPointerMove={dragState.handlePointerMove}
            onKeyDown={pressState.handleKeyDown}
            onKeyUp={pressState.handleKeyUp}
        >
            <h4>{productModel.name}</h4>
            <img src={productModel.icon} alt='Product' />
            
            <span>Live drag status feedback</span>
            {dragStatus === true
                ? '✅ Drop here!'
                : dragStatus === null
                    ? 'Drag to a category'
                    : ''}
            
            <span>Optional: show category badge while hovering</span>
            {dropMetadata?.get('type') === 'category' && (
                <div className='category-badge'>
                    <img
                        src={dropMetadata.get('icon') as string}
                        alt={dropMetadata.get('name') as string}
                    />
                </div>
            )}
        </div>
    );
};
```

### `useDroppableState(props)`

Serves a component as a droppable target
and provides reactive state reflecting the current drop lifecycle.

#### 💡 Usage Example

```tsx
import React, { type FC, useRef, useMemo } from 'react';
import {
    type DropMetadata,
    useDroppableState,
} from '@reusable-ui/drag-drop-interaction';

export interface ProductCategoryProps {
    categoryModel: CategoryModel
}

// A droppable product category.
// Accepts only products that are in stock.
export const ProductCategory: FC<ProductCategoryProps> = ({ categoryModel }) => {
    // Metadata describing this droppable zone (business context):
    const categoryMetadata = useMemo<DropMetadata>(() => {
        // Extract category details from the model:
        return new Map<unknown, unknown>([
            ['type' , 'category'],
            ['id'   , categoryModel.id],
            ['name' , categoryModel.name],
            ['icon' , categoryModel.icon],
        ]);
    }, [categoryModel]);
    
    const dropZoneRef = useRef<HTMLDivElement | null>(null);
    
    // Orchestrates the transaction logic for droppables:
    const { dropStatus, dragPayload } = useDroppableState({
        dropRef      : dropZoneRef,
        dropMetadata : categoryMetadata,
        dropEnabled  : true,
        
        // Handshake: only accept products that are in stock
        async onDropHandshake(event) {
            // Optional: perform async validation here (e.g. API call).
            const isProduct = event.dragPayload.get('type') === 'product';
            const inStock   = !!(event.dragPayload.get('stock') ?? 0);
            
            // Communicate acceptance/rejection back to the draggable:
            event.dropResponse = isProduct && inStock;
        },
        
        // Evaluation: provide live feedback while hovered by a product card
        onDropEvaluation(event) {
            const productName = event.dragPayload.get('name');
            console.log(`A product: ${productName} is hovering over this category`);
            // TODO: show a tooltip of the hovering product
        },
        
        // Commit: handle the actual drop
        onDropped(event) {
            const productId = event.dragPayload.get('id');
            console.log(`A product with id: ${productId} has been moved into this category`);
            // TODO: persist to DB or trigger state update
        },
    });
    
    return (
        <div ref={dropZoneRef} className='product-category'>
            <h4>{categoryModel.name}</h4>
            <img src={categoryModel.icon} alt='Category' />
            
            <span>Live acceptance feedback</span>
            {dropStatus === true
                ? '✅ Drop here!'
                : dropStatus === null
                    ? 'Drag products into this category'
                    : ''}
            
            <span>Optional preview of the dragged product</span>
            {dragPayload?.get('type') === 'product' && (
                <div className='product-preview'>
                    <h4>{dragPayload.get('name') as string}</h4>
                    <img src={dragPayload.get('icon') as string} alt='Product preview' />
                </div>
            )}
        </div>
    );
};
```

### `useNativeDragIntegration(props)`

Integrates native HTML Drag & Drop events (including file drags and third-party draggables)
into the `useDroppableState()` system.

Useful for:
- Handling **file drags** from the operating system.
- Interoperating with **third-party draggable components**
  that rely on the native HTML Drag & Drop API.

Behaviors:
- Initializes integration on mount.
- Cleans up automatically on unmount.
- Exposes the integration handle via a RefObject for optional manual control.

⚠️ Use this integration only as a fallback:
- If you only need drag-drop across React components,
  prefer `useDraggableState()` and `useDroppableState()`.
- This integration exists as a compatibility layer, not the primary API.

Internally, this simulates `useDraggableState()` without exposing
reactive states — serving purely as a compatibility layer.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import { useNativeDragIntegration } from '@reusable-ui/drag-drop-interaction';

export const FileDropZone: FC = () => {
    const nativeDragIntegration = useNativeDragIntegration();
    
    // Optional: manually disintegrate early
    // nativeDragIntegration.current?.disintegrate();
    
    // Orchestrates the file transaction logic for droppables:
    const { dropStatus, dragPayload } = useDroppableState({
        ......
    });
    
    return (
        <div className='file-drop-zone'>
            <span>Live acceptance feedback</span>
            {dropStatus === true
                ? '✅ Drop file(s) here!'
                : dropStatus === null
                    ? 'Drag file(s) into this zone'
                    : ''}
        </div>
    );
};
```

## 🧩 Exported Utilities

### `integrateNativeDrag()`

Integrates native HTML Drag & Drop events (including file drags and third-party draggables)
into the `useDroppableState()` system.

Useful for:
- Handling **file drags** from the operating system.
- Interoperating with **third-party draggable components**
  that rely on the native HTML Drag & Drop API.

⚠️ Use this integration only as a fallback:
- If you only need drag-drop across React components,
  prefer `useDraggableState()` and `useDroppableState()`.
- This integration exists as a compatibility layer, not the primary API.

Internally, this simulates `useDraggableState()` without exposing
reactive states — serving purely as a compatibility layer.

Each call to `integrateNativeDrag()` produces a handler that manages its own lifecycle:
- Setup runs once globally when the first handle is created.
- Cleanup runs once globally when the last handle is disintegrated.
- `disintegrate()` is idempotent: only the first call per handle is effective.

#### 💡 Usage Example

```tsx
import React, { FC, useEffect } from 'react';
import { integrateNativeDrag } from '@reusable-ui/drag-drop-interaction';

export const FileDropZone: FC = () => {
    useEffect(() => {
        const integration = integrateNativeDrag();
        
        return () => {
            integration.disintegrate();
        };
    }, []);
    
    // Orchestrates the file transaction logic for droppables:
    const { dropStatus, dragPayload } = useDroppableState({
        ......
    });
    
    return (
        <div className='file-drop-zone'>
            <span>Live acceptance feedback</span>
            {dropStatus === true
                ? '✅ Drop file(s) here!'
                : dropStatus === null
                    ? 'Drag file(s) into this zone'
                    : ''}
        </div>
    );
};
```

## 🧠 How It Works

### Key Concepts
- **Draggable (source)**  
  The element or file being dragged.  
  - Provides the actual data being dragged (payload).  
  - This payload will be inspected by droppables during the handshake process.

- **Drag Payload**
  Carries the actual data being dragged (payload) — for example:
  - Identifiers (`productId`, `transactionId`)
  - Files (`File` objects)
  - Business objects or structured payloads

- **Droppable (target)**  
  The zone where items can be dropped.  
  - Provides the target's business context (metadata).  
  - This metadata can be inspected by draggables during the handshake process.

- **Drop Metadata**
  Exposes the target's business context (metadata) — for example:
  - Zone identifiers (`categoryId`, `dropZoneId`)
  - Accepted types (`"image/*"`, `"text/plain"`)
  - Custom flags or hints for styling/UX

### Mechanics

#### 1. Global Registry
- A registry maps **DOM elements → DroppableEntry objects**.  
- Each DroppableEntry represents the current state of a droppable element, holding:  
  - The droppable's business metadata (`DropMetadata`).  
  - References to its callbacks (`onDropHandshake`, `onDropped`).  
- Droppable elements **register on mount** and **unregister on unmount** to ensure the registry stays accurate and avoids memory leaks.  
- When a droppable's metadata or callbacks change, its entry is updated so the system always reflects the latest state.  
- During a drag gesture, the engine consults this registry to determine whether the pointer is over a valid droppable and how that droppable should respond.

#### 2. Hit-Testing
- When a draggable moves, the engine uses `elementFromPoint()` to detect which element is under the pointer.  
- If that element is in the registry, it is treated as a valid droppable zone.

#### 3. Handshake Negotiation
- When a draggable hovers over a droppable:  
  - The draggable passes its payload to the droppable.  
  - The droppable inspects the draggable's payload and sets a `dropResponse`.  
  - The draggable inspects the droppable's metadata and sets a `dragResponse`.  
- Possible responses:  
  - `true`      → accepted (may show ✅ feedback to indicate a valid drop zone)  
  - `false`     → rejected (may show 🚫 feedback to indicate drop not allowed)  
  - `undefined` → ignored  (no feedback; user keeps searching for a valid drop zone)  
- This two-way handshake allows:  
  - Draggable to inspect droppable metadata and decide acceptance.  
  - Droppable to inspect draggable payload and decide acceptance.

#### 4. Evaluation Feedback
- After both sides have returned their handshake responses, the engine emits **Evaluation events**.  
- These events summarize the negotiation state and drive UX feedback:  
  - ✅ icons for accepted pairs.  
  - 🚫 icons for rejected pairs.  
  - Highlight, pulse, shake, or glow animations for visual cues.  
  - Text hints or cursor changes to guide the user.  
- Evaluation events do not finalize delivery — they only reflect the current acceptance state, allowing the user to decide whether to drop.

#### 5. Global Awareness Outside Droppable Zones
Drag-drop interaction is not limited to hovered targets.  
Even when the pointer is **not inside any droppable zone**, the engine broadcasts drag activity globally so all droppables can react.

Droppables receive:
- **`dropStatus = undefined`** → *No drag activity at all.*
- **`dropStatus = null`** → *A drag gesture is active, but the pointer is outside this zone.*
- **`dropStatus = false`** → *A drag gesture is active over this zone, but rejected by one or both sides.*
- **`dropStatus = true`** → *A drag gesture is active over this zone and mutually accepted.*

This global awareness allows droppables to style themselves proactively — for example, highlighting potential zones or showing "drop here" cues — even before the pointer enters their bounds.

#### 6. Drop Delivery
- On `drop`, the engine synthesizes a **DraggedEvent** and a **DroppedEvent**.  
- The draggable receives confirmation from the accepted droppable.  
- The droppable receives the draggable's payload.  
- Global state resets after delivery.  
- If either side rejects or ignores the handshake, no delivery occurs and these events are never emitted.

## 📚 Related Packages

- [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) – Lifecycle-aware press/release state with transition animations and semantic styling hooks for UI components.  
- [`@reusable-ui/press-effect`](https://www.npmjs.com/package/@reusable-ui/press-effect) – Provides default visual effects for components when their press state changes. Acknowledges user input to make components visually confirming command when pressed (clicked).  
- [`@reusable-ui/drag-state`](https://www.npmjs.com/package/@reusable-ui/drag-state) – Lifecycle-aware drag/drop state with transition animations and semantic styling hooks for draggable UI components.  
- [`@reusable-ui/drag-effect`](https://www.npmjs.com/package/@reusable-ui/drag-effect) – Provides default visual effects for components when their drag state changes. Follows the cursor movement to make components visually carried and repositioned while being dragged.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/drag-drop-interaction** is an interaction management layer within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/drag-drop-interaction**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/drag-drop-interaction brings expressive, adaptive drag-drop negotiation and styling to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
