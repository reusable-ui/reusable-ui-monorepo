# @reusable-ui/drag-state 📦  

**drag-state** is a reusable abstraction for managing drag feedback in UI components.  
It provides a lifecycle-aware way to animate transitions between *dragged* and *dropped* states, exposing semantic variables that make styling and contributor reasoning clear.  

Instead of manually toggling classes or wiring one-off drag logic, drag-state automatically manages drag/drop classes, ensuring transitions are smooth, predictable, and easy to maintain. This makes it ideal for components that need expressive drag feedback — such as pick items, thumb buttons, and grip handles — while still giving implementors the flexibility to override drag resolution with custom logic.  

With **drag-state**, you get:  
- Controlled drag/drop feedback  
- Transition animations tied to the drag lifecycle  
- Semantic styling variables (`isDragged`, `isDropped`, etc.) for fine-grained control  

## ✨ Features
✔ Lifecycle-aware drag/drop animations based on current drag state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ User definable `computedDrag` for external logic delegation  
✔ Utility CSS variables (`--dr-dragOffsetX`, `--dr-dragOffsetY`) for aligning drag components to the pointer position  
✔ Deterministic disabled handling: always dropped when disabled, with clear contracts across explicit and external modes  

## 📦 Installation
Install **@reusable-ui/drag-state** via npm or yarn:

```sh
npm install @reusable-ui/drag-state
# or
yarn add @reusable-ui/drag-state
```

## 🧩 Exported Hooks

### `useDragBehaviorState(props, options?)`

Resolves the drag state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled drag state, when `dragged` is set to `true` or `false`.
- Supports diagnostic mode, when `dragged` is set to `'auto'`, which derives the effective drag from `computedDrag`.

#### 💡 Usage Example

```tsx
import React, { FC, useEffect } from 'react';
import {
    useDragBehaviorState,
    DragStateProps,
    DragStateUpdateProps,
} from '@reusable-ui/drag-state';
import {
    usePressBehaviorState,
} from '@reusable-ui/press-state';
import styles from './DraggableOption.module.css';

export interface CustomButtonProps extends
    DragStateProps,
    DragStateUpdateProps // optional update reporting behavior
{}

// A draggable option component with custom drag logic.
export const DraggableOption: FC<CustomButtonProps> = (props) => {
    const {
        // Allows derived components to override the internal drag logic:
        computedDrag : externalComputedDrag,
        
        ...restProps
    } = props;
    
    // Supply `computedDrag` from press-state or external override:
    const { actualPressed } = usePressBehaviorState(...);
    // const actualPressed = usePressState(...); // Alternatively use `usePressState(...)`
    const internalComputedDrag = actualPressed;
    const isExternallyComputed = (externalComputedDrag !== undefined);
    const computedDrag         = isExternallyComputed ? externalComputedDrag : internalComputedDrag;
    
    useEffect(() => {
        if (isExternallyComputed) return;
        
        // Perform internal drag logic here:
        // setInternalComputedDrag(true);
    }, [isExternallyComputed]);
    
    const {
        dragged,
        dragOffset,
        actualDragged,
        dragPhase,
        dragClassname,
        dragStyle,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        handlePointerDown,
        handlePointerMove,
    } = useDragBehaviorState({
        computedDrag,
        ...restProps,
    }, {
        defaultDragged    : 'auto',                   // Defaults to diagnostic mode.
        animationPattern  : ['dragging', 'dropping'], // Matches animation names ending with 'dragging' or 'dropping'.
        animationBubbling : false,                    // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.button} ${dragClassname}`}
            style={dragStyle}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            <p>Drag this component to somewhere else.</p>
            {dragged  && <p className={styles.dragged}>Dragged</p>}
            {!dragged && <p className={styles.dropped}>Dropped</p>}
        </div>
    );
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between `dragged` and `dropped` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from dragged to dropped) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🔒 Disabled Behavior
- **Always dropped when disabled**: Components are forced into a dropped state whenever `disabled` is active, regardless of `dragged` or `computedDrag` values.  
- **On re-enable**:
    - **Auto mode**: The component remains dropped until the user explicitly re-drags (delegated by press-state or external logic).
    - **Explicit (`true`/`false`) modes**: The component resumes following the provided value.  
- **Drop lock responsibility**:
    - In explicit/external modes, implementors must manage a persistent drop in their own state (for example, suppressing `true` until a new `pointerdown` event is observed).  
- **Rationale**: Drag is a discrete state — past drag actions are ignored when toggling disabled, preventing phantom restoration and ensuring accessibility consistency.

### `useDragStatePhaseEvents(props, dragPhase)`

Emits lifecycle events in response to drag/drop phase transitions.

This hook observes the resolved `dragPhase` from `useDragBehaviorState()` and triggers the appropriate callbacks defined in `DragStatePhaseEventProps`, such as:

- `onDraggingStart`
- `onDraggingEnd`
- `onDroppingStart`
- `onDroppingEnd`

### `useDragState(props, options?)`

Resolves the current dragged/dropped state for a fully controlled component.

This hook is intended for components that **consume** the resolved `dragged` state and **forward** it to a base component.

Unlike `useDragBehaviorState()`, which handles animation and lifecycle, `useDragState()` performs a lightweight resolution of the effective drag value.

- No internal state or uncontrolled fallback.
- `'auto'` is treated as a declarative diagnostic mode.
- Ideal for components that **consume** the resolved `dragged` state.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Drag Selectors:
    isDraggedSelector,           // Targets `.is-dragged` class
    isDroppedSelector,           // Targets `.is-dropped` class
    isDraggingSelector,          // Targets `.is-dragging` class
    isDroppingSelector,          // Targets `.is-dropping` class
    isDraggingOrDraggedSelector, // Targets `.is-dragging` and `.is-dragged` class
    isDroppingOrDroppedSelector, // Targets `.is-dropping` and `.is-dropped` class
    
    // Conditional styling helpers:
    ifDragged,           // Applies the given `styles` to elements in the fully dragged state.
    ifDropped,           // Applies the given `styles` to elements in the fully dropped state.
    ifDragging,          // Applies the given `styles` to elements currently in the dragging transition.
    ifDropping,          // Applies the given `styles` to elements currently in the dropping transition.
    ifDraggingOrDragged, // Applies the given `styles` to elements that are either in the dragging transition or fully dragged.
    ifDroppingOrDropped, // Applies the given `styles` to elements that are either in the dropping transition or fully dropped.
} from '@reusable-ui/drag-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifDraggingOrDragged({
        opacity: 0.5,
    }),
    ...ifDroppingOrDropped({
        opacity: 1,
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isDraggingOrDraggedSelector, { // equivalent to `ifDraggingOrDragged`
        pointerEvents: 'none',
    }),
    ...rule(isDroppingOrDroppedSelector, { // equivalent to `ifDroppingOrDropped`
        pointerEvents: 'auto',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesDragState(options?: CssDragStateOptions): CssDragState`

Generates CSS rules that conditionally apply the drag/drop animations based on current dragged state, and exposes drag/drop-related CSS variables for use in conditional styling.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable            | Active When...                  | Purpose                                                                      |
|---------------------|---------------------------------|------------------------------------------------------------------------------|
| `animationDragging` | `.is-dragging`                  | Runs the dragging animation sequence                                         |
| `animationDropping` | `.is-dropping`                  | Runs the dropping animation sequence                                         |
| `isDragged`         | `.is-dragged` or `.is-dragging` | Conditional variable for the dragged state                                   |
| `isDropped`         | `.is-dropped` or `.is-dropping` | Conditional variable for the dropped state                                   |
| `dragOffsetX/Y`     | Always available                | Aligns drag components to the pointer position during dragging               |
| `dragFactor`        | Always available (animatable)   | Normalized factor: 0 = dropped, 1 = dragged, interpolates during transitions |
| `dragFactorCond`    | Not fully dropped               | Conditional mirror of `dragFactor`, drops to `unset` when fully dropped      |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Dragged/dropped state:
import { usesDragState } from '@reusable-ui/drag-state';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const draggableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: drag/drop lifecycle
    const {
        dragStateRule,
        dragStateVars: { isDragged, isDropped, dragOffsetX, dragOffsetY, dragFactor },
    } = usesDragState({
        animationDragging : 'var(--box-dragging)',
        animationDropping : 'var(--box-dropping)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply dragged/dropped state rules:
        ...dragStateRule(),
        
        // Dragging animation: interpolate dragFactor from 0 → 1
        ...vars({
            '--box-dragging': [
                ['0.3s', 'ease-out', 'both', 'transition-dragging'],
            ],
        }),
        ...keyframes('transition-dragging', {
            from : { [dragFactor]: 0 },
            to   : { [dragFactor]: 1 },
        }),
        
        // Dropping animation: interpolate dragFactor from 1 → 0
        ...vars({
            '--box-dropping': [
                ['0.3s', 'ease-out', 'both', 'transition-dropping'],
            ],
        }),
        ...keyframes('transition-dropping', {
            from : { [dragFactor]: 1 },
            to   : { [dragFactor]: 0 },
        }),
        
        // Example usage:
        // - Smoothly move the element from its original position to the pointer position.
        // - 0 → original position, 1 → pointer position.
        transform: `translate(calc(${dragOffsetX} * 1px * ${dragFactor}), calc(${dragOffsetY} * 1px * ${dragFactor}))`,
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationDragging` and `animationDropping` variables are only defined during **dragging** and **dropping** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining drag/drop animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/drag-state** is a state management within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/drag-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/drag-state brings expressive, adaptive drag styling to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
