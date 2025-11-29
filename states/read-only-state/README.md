# @reusable-ui/read-only-state 📦  

**read-only-state** is a reusable abstraction for managing editable/read-only states in UI components.  
It provides a lifecycle-aware way to animate transitions between *editable* and *read-only* states, exposing semantic variables that make styling and contributor reasoning clear.  

Instead of manually toggling classes or setting up read-only context, read-only-state automatically manages editable/read-only classes and cascaded context, ensuring transitions are smooth, predictable, and easy to maintain. This makes it ideal for editable components — such as inputs, text areas, and editors — where editing must be constrained, while still giving implementors the flexibility to propagate or override read-only state across contexts.  

With **read-only-state**, you get:  
- Controlled editable/read-only constraints  
- Transition animations tied to the read-only lifecycle  
- Semantic styling variables (`isEditable`, `isReadOnly`, etc.) for fine-grained control  
- Cascaded context support for parent-driven read-only state  

## ✨ Features
✔ Lifecycle-aware editable/read-only animations based on current read-only state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ Contextual override via `cascadeReadOnly` for parent-driven read-only state  

## 📦 Installation
Install **@reusable-ui/read-only-state** via npm or yarn:

```sh
npm install @reusable-ui/read-only-state
# or
yarn add @reusable-ui/read-only-state
```

## 🧩 Exported Hooks

### `useReadOnlyBehaviorState(props, options?)`

Resolves the editable/read-only state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled read-only state.
- Supports contextual override via `cascadeReadOnly`.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useReadOnlyBehaviorState,
    ReadOnlyStateProps,
    ReadOnlyStateUpdateProps,
} from '@reusable-ui/read-only-state';
import styles from './CustomEditor.module.css';

export interface CustomEditorProps extends
    ReadOnlyStateProps,
    ReadOnlyStateUpdateProps // optional update reporting behavior
{}

// An editor that can be editable or read-only.
export const CustomEditor: FC<CustomEditorProps> = (props) => {
    const {
        readOnly,
        actualReadOnly,
        readOnlyPhase,
        readOnlyClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useReadOnlyBehaviorState(props, {
        defaultReadOnly        : false,                   // Defaults to editable.
        defaultCascadeReadOnly : true,                    // Defaults to allow contextual read-only.
        animationPattern       : ['thawing', 'freezing'], // Matches animation names ending with 'thawing' or 'freezing'.
        animationBubbling      : false,                   // Ignores bubbling animation events from children.
    });
    
    return (
        <input
            type='text'
            className={`${styles.box} ${readOnlyClassname}`}
            readOnly={readOnly}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        />
    );
};
```

### `useReadOnlyStatePhaseEvents(props, readOnlyPhase)`

Emits lifecycle events in response to editable/read-only phase transitions.

This hook observes the resolved `readOnlyPhase` from `useReadOnlyBehaviorState()` and triggers the appropriate callbacks defined in `ReadOnlyStatePhaseEventProps`, such as:

- `onThawingStart`
- `onThawingEnd`
- `onFreezingStart`
- `onFreezingEnd`

### `useReadOnlyState(props, options?)`

Resolves the current editable/read-only state for a fully controlled component.

This hook is intended for components that **consume** the resolved `readOnly` state and **forward** it to a base component.

Unlike `useReadOnlyBehaviorState()`, which handles animation and lifecycle, `useReadOnlyState()` performs a lightweight resolution of the effective read-only value.

- No internal state or uncontrolled fallback.
- Ideal for components that **consume** the resolved `readOnly` state.

#### 🧠 Transition Animation Behavior

The hook manages transitions between `editable` and `readonly` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from editable to read-only) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🧬 Context Propagation

Use `<ReadOnlyStateProvider>` to share read-only state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    ReadOnlyStateProps,
    ReadOnlyStateProvider,
    useReadOnlyBehaviorState,
    useReadOnlyState,
} from '@reusable-ui/read-only-state';

export interface ParentComponentProps extends ReadOnlyStateProps {
    children ?: ReactNode
}

// A component that shares its read-only state with descendant components.
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve read-only state from props and handle animation phases:
    const {
        readOnly,
        readOnlyPhase,
        readOnlyClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useReadOnlyBehaviorState(props, {
        defaultReadOnly        : false,                   // Defaults to editable.
        defaultCascadeReadOnly : true,                    // Defaults to allow contextual read-only.
        animationPattern       : ['thawing', 'freezing'], // Matches animation names ending with 'thawing' or 'freezing'.
        animationBubbling      : false,                   // Ignores bubbling animation events from children.
    });
    
    // Or use `useReadOnlyState()` if not concerned with animation phases:
    // const readOnly = useReadOnlyState(props, {
    //     defaultReadOnly        : false, // Defaults to editable.
    //     defaultCascadeReadOnly : true,  // Defaults to allow contextual read-only.
    // });
    
    // Propagate read-only state to descendants:
    return (
        <ReadOnlyStateProvider readOnly={readOnly}>
            {props.children}
        </ReadOnlyStateProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Read-only Selectors:
    isEditableSelector,           // Targets `.is-editable` class
    isReadOnlySelector,           // Targets `.is-readonly` class
    isThawingSelector,            // Targets `.is-thawing` class
    isFreezingSelector,           // Targets `.is-freezing` class
    isThawingOrEditableSelector,  // Targets `.is-thawing` and `.is-editable` class
    isFreezingOrReadOnlySelector, // Targets `.is-freezing` and `.is-readonly` class
    
    // Conditional styling helpers:
    ifEditable,           // Applies the given `styles` to elements in the fully editable state.
    ifReadOnly,           // Applies the given `styles` to elements in the fully read-only state.
    ifThawing,            // Applies the given `styles` to elements currently in the thawing transition.
    ifFreezing,           // Applies the given `styles` to elements currently in the freezing transition.
    ifThawingOrEditable,  // Applies the given `styles` to elements that are either thawing or fully editable.
    ifFreezingOrReadOnly, // Applies the given `styles` to elements that are either freezing or fully read-only.
} from '@reusable-ui/read-only-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifThawingOrEditable({
        color: 'blue',
    }),
    ...ifFreezingOrReadOnly({
        color: 'gray',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isThawingOrEditableSelector, { // equivalent to `ifThawingOrEditable`
        backgroundColor: 'lightblue',
    }),
    ...rule(isFreezingOrReadOnlySelector, { // equivalent to `ifFreezingOrReadOnly`
        backgroundColor: 'lightgray',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesReadOnlyState(options?: CssReadOnlyStateOptions): CssReadOnlyState`

Generates CSS rules that conditionally apply the editable/read-only animations based on current read-only state, and exposes editable/read-only-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable             | Active When...                    | Purpose                                                                         |
|----------------------|-----------------------------------|---------------------------------------------------------------------------------|
| `animationThawing`   | `.is-thawing`                     | Runs the thawing animation sequence                                             |
| `animationFreezing`  | `.is-freezing`                    | Runs the freezing animation sequence                                            |
| `isEditable`         | `.is-editable` or `.is-thawing`   | Conditional variable for the editable state                                     |
| `isReadOnly`         | `.is-read-only` or `.is-freezing` | Conditional variable for the read-only state                                    |
| `readOnlyFactor`     | Always available (animatable)     | Normalized factor: 0 = editable, 1 = read-only, interpolates during transitions |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Editable/read-only state:
import { usesReadOnlyState } from '@reusable-ui/read-only-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const readOnlyBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: editable/read-only lifecycle
    const {
        readOnlyStateRule,
        readOnlyStateVars: { isEditable, isReadOnly, readOnlyFactor },
    } = usesReadOnlyState({
        animationThawing  : 'var(--box-thawing)',
        animationFreezing : 'var(--box-freezing)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply editable/read-only state rules:
        ...readOnlyStateRule(),
        
        // Thawing animation: interpolate readOnlyFactor from 1 → 0
        ...vars({
            '--box-thawing': [
                ['0.3s', 'ease-out', 'both', 'transition-thawing'],
            ],
        }),
        ...keyframes('transition-thawing', {
            from : { [readOnlyFactor]: 1 },
            to   : { [readOnlyFactor]: 0 },
        }),
        
        // Freezing animation: interpolate readOnlyFactor from 0 → 1
        ...vars({
            '--box-freezing': [
                ['0.3s', 'ease-out', 'both', 'transition-freezing'],
            ],
        }),
        ...keyframes('transition-freezing', {
            from : { [readOnlyFactor]: 0 },
            to   : { [readOnlyFactor]: 1 },
        }),
        
        // Example usage:
        // - Opacity interpolates with `readOnlyFactor`.
        // - 0 → fully visible (editable), 1 → dimmed (read-only).
        opacity: `calc(1 - (${readOnlyFactor} * 0.5))`,
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationThawing` and `animationFreezing` variables are only defined during **thawing** and **freezing** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining editable/read-only animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/read-only-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/read-only-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/read-only-state brings expressive, adaptive interactivity control to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
