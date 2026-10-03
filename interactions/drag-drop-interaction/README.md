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
| **Probing** | Browser-native hover detection (varies by engine). | Pointer-based probing via `elementFromPoint()` with `dropPredicate` for filtering droppable candidates. |
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
✔ **Clear Commit Events** — Finalized delivery via `DragCommitEvent` and `DropCommitEvent`, separating gesture feedback from business logic.  
✔ **Precision Probing** — Pointer-based detection using `elementFromPoint()` with customizable `dropPredicate` filtering for droppable candidates.  
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
import React, { type FC, useMemo } from 'react';
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
    const { dragStatus, dropMetadata, ref } = useDraggableState<HTMLDivElement>({
        dragPayload  : productPayload,
        dragEnabled  : true,
        computedDrag : dragState.dragged,
        
        // Prevent the ghost image itself (product card) from being considered a valid drop target:
        dropPredicate(dropCandidate): boolean {
            const cardElement = ref.current;
            return !cardElement || !cardElement.contains(dropCandidate);
        },
        
        // Handshake: only allow dropping into category zones
        async onDragHandshake(event) {
            // Optional: perform async validation here (e.g. API call).
            const isCategoryZone = event.dropMetadata.get('type') === 'category';
            
            // Communicate acceptance/rejection back to the droppable:
            event.dragResponse = isCategoryZone;
        },
        
        // Evaluation: provide live feedback on every pointer movement while hovering over a category
        // NOTE: avoid relying on this event unless detailed, pointer-level feedback is needed,
        // as it fires *aggressively* on every pointer move and may impact performance.
        // Consider debouncing or throttling if you need to perform expensive operations here.
        onDragEvaluation(event) {
            const categoryName = event.dropMetadata?.get('name');
            console.log(`Hovering over category: ${categoryName}`);
            // TODO: update ghost image with category label
        },
        
        // Commit: final drop resolution handled by droppable side,
        // but we can show confirmation here
        onDragCommit(event) {
            const categoryName = event.dropMetadata.get('name');
            console.log(`Dropped into category: ${categoryName}`);
            // TODO: show toast/notification confirming the move
        },
    });
    
    return (
        <div
            ref={ref}
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
import React, { type FC, useMemo } from 'react';
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
    
    // Orchestrates the transaction logic for droppables:
    const { dropStatus, dragPayload, ref } = useDroppableState<HTMLDivElement>({
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
        
        // Evaluation: provide live feedback on every pointer movement while hovered by a product card
        // NOTE: avoid relying on this event unless detailed, pointer-level feedback is needed,
        // as it fires *aggressively* on every pointer move and may impact performance.
        // Consider debouncing or throttling if you need to perform expensive operations here.
        onDropEvaluation(event) {
            const productName = event.dragPayload.get('name');
            console.log(`A product: ${productName} is hovering over this category`);
            // TODO: show a tooltip of the hovering product
        },
        
        // Commit: handle the actual drop
        onDropCommit(event) {
            const productId = event.dragPayload.get('id');
            console.log(`A product with id: ${productId} has been moved into this category`);
            // TODO: persist to DB or trigger state update
        },
    });
    
    return (
        <div ref={ref} className='product-category'>
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
    const { dropStatus, dragPayload } = useDroppableState<HTMLDivElement>({
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
    const { dropStatus, dragPayload } = useDroppableState<HTMLDivElement>({
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

At the heart of the engine are two interacting entities exchanging strongly typed data:

- **Draggable (Source)**  
  The UI element or file being dragged.  
  - Carries a **Drag Payload** (e.g., `productId`, `File` objects, or structured business data).
  - Inspects target drop zones to decide if it wants to be dropped there.

- **Droppable (Target)**  
  The designated zone where items can be dropped.  
  - Exposes **Drop Metadata** (e.g., `categoryId`, accepted file types, or custom flags).
  - Inspects incoming payloads to decide if they are allowed.

### The Engine Infrastructure

Before a drag even begins, the system relies on an intelligent foundation to manage state:

- **Global Registry:** Droppables automatically register themselves on mount (and unregister on unmount) into a central dictionary mapping DOM elements to `DroppableContext` objects. This ensures the system always knows where valid zones are.
- **Global Awareness:** A drag gesture isn't just local to the pointer. The engine broadcasts drag activity globally, allowing droppable zones to proactively style themselves (e.g., glowing to say *"drop here!"*) even when the pointer is not yet hovering over them.

### The 6-Phase Lifecycle

Every drag-and-drop interaction follows a strict, predictable transaction lifecycle:

#### 1. Activation
*The user initiates a drag gesture.*
The engine wakes up, initializes drag states, fires `onDragStart` event, and broadcasts a global `onDragPresence` event.
Droppables react to this presence by updating their appearance, showing the user all potential valid targets on the screen.

#### 2. Probe
*The user moves the pointer across the screen.*
On every pointer movement, the engine uses `elementFromPoint()` to hit-test the DOM.
It checks the topmost elements against the Global Registry to find the nearest valid droppable candidate under the cursor.

#### 3. Handshake (Negotiation)
*The pointer enters a candidate droppable zone.*
A two-way negotiation instantly occurs between the source and the target:
- The **droppable** inspects the incoming `DragPayload` and sets a `dropResponse`.
- The **draggable** inspects the target's `DropMetadata` and sets a `dragResponse`.
Both sides can respond with: `true` (accept), `false` (reject), or `undefined` (ignore).

#### 4. Evaluation
*The engine processes the handshake outcome.*
Based on the combined responses from the handshake, the engine continuously emits Evaluation events.
This drives live UX feedback—such as showing a ✅ icon for valid pairs, a 🚫 icon for invalid pairs, or animating a pulse effect.
At this phase, no data is moved (committed) yet; this phase purely helps the user decide whether to let go.

#### 5. Commit
*The user releases the pointer over an accepted zone.*
If the handshake was mutually accepted, the transaction finalizes.
The engine fires the `onDragCommit` and `onDropCommit` events, officially delivering the `DragPayload` to the target zone so your application can update its business logic (e.g., saving to a database or reordering a list). 

#### 6. Deactivation
*The gesture concludes.*
Whether the drop was successfully committed, rejected by a target, or cancelled by the user, the engine cleans up.
It resets all active states, fires `onDragEnd` event, and broadcasts a global `onDragAbsence` event – so all components return to their normal resting appearance.

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
