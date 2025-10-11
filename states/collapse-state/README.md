# @reusable-ui/collapse-state 📦  

Adds expand/collapse functionality to UI components, with transition animations and semantic styling hooks.  
Ideal for tooltips, accordions, dialogs, and any interactive component requiring controlled expansion feedback.

## ✨ Features
✔ Lifecycle-aware expand/collapse animations based on current expanded state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ Supports controlled, uncontrolled, and hybrid expansion behavior  

## 📦 Installation
Install **@reusable-ui/collapse-state** via npm or yarn:

```sh
npm install @reusable-ui/collapse-state
# or
yarn add @reusable-ui/collapse-state
```

## 🧩 Exported Hooks

### `useCollapseBehaviorState(props, options?)`

Resolves the expanded/collapsed state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled, uncontrolled, and hybrid expansion behavior with optional change dispatching.

#### 💡 Usage Example

```tsx
import React, { FC, MouseEventHandler } from 'react';
import {
    useCollapseBehaviorState,
    CollapseStateProps,
    UncontrollableCollapseStateProps,
    CollapseStateChangeProps,
} from '@reusable-ui/collapse-state';
import styles from './CollapsibleBox.module.css';

export interface CollapsibleBoxProps extends
    CollapseStateProps,
    UncontrollableCollapseStateProps, // optional uncontrolled behavior
    CollapseStateChangeProps<MouseEventHandler<HTMLButtonElement>> // optional change dispatching behavior
{}

// A box that can be expanded and collapsed.
export const CollapsibleBox: FC<CollapsibleBoxProps> = (props) => {
    const {
        expanded,
        expandPhase,
        expandClassname,
        
        dispatchExpandedChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useCollapseBehaviorState(props, {
        defaultExpanded   : false,                       // Fallback for uncontrolled mode.
        animationPattern  : ['expanding', 'collapsing'], // Matches animation names ending with 'expanding' or 'collapsing'.
        animationBubbling : false,                       // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.box} ${expandClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            <button onClick={(event) => dispatchExpandedChange(!expanded, event)}>
                See details
            </button>
            {expanded && <div className={styles.details}>
                <p>Additional details go here.</p>
            </div>}
        </div>
    );
};
```

### `useCollapseStatePhaseEvents(props, expandPhase)`

Emits lifecycle events in response to expand/collapse phase transitions.

This hook observes the resolved `expandPhase` from `useCollapseBehaviorState()` and triggers the appropriate callbacks defined in `CollapseStatePhaseEventProps`, such as:

- `onExpandingStart`
- `onExpandingEnd`
- `onCollapsingStart`
- `onCollapsingEnd`

### `useCollapseState(props, options?)`

Resolves the current expanded/collapsed state for a fully controlled component.

This hook is intended for components that **consume** the resolved `expanded` state and **forward** it to a base component.

Unlike `useCollapseBehaviorState()`, which supports both controlled and uncontrolled modes, `useCollapseState()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Ideal for components that **consume** the resolved `expanded` state.

### `useCollapseChangeDispatcher(props)`

Creates a stable dispatcher for requesting a change to the expanded state.

This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `expanded` state and forwards it to a `<BaseComponent expanded={...}>`.

Unlike `useCollapseBehaviorState()`, which supports both controlled and uncontrolled modes, `useCollapseChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Always triggers `onExpandedChange`, if provided.
- Ideal for components that **dictate** the `expanded` state externally and need a stable dispatcher without lifecycle orchestration.

### `useUncontrollableCollapseState(props, options?)`

Resolves the current expanded/collapsed state and provides a dispatcher for requesting changes.

This hook is intended for components that **manage** the resolved `expanded` state and **forward** it to a base component, while optionally supporting uncontrolled behavior.

Unlike `useCollapseBehaviorState()`, which resolves full lifecycle, `useUncontrollableCollapseState()` provides a **simplified implementation** for managing expansion state and dispatching changes.

- Supports both controlled and uncontrolled modes.
- If `expanded` is provided, the internal state is disabled and the component becomes fully controlled.
- If `expanded` is omitted, the internal state is initialized via `defaultExpanded`.
- Ideal for components that **manage** the resolved `expanded` state.

#### 🧠 Transition Animation Behavior

The hook manages transitions between `expanded` and `collapsed` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from expanded to collapsed) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Expand/collapse Selectors:
    isExpandedSelector,              // Targets `.is-expanded` classes
    isCollapsedSelector,             // Targets `.is-collapsed` classes
    isExpandingSelector,             // Targets `.is-expanding` classes
    isCollapsingSelector,            // Targets `.is-collapsing` classes
    isExpandingOrExpandedSelector,   // Targets `.is-expanding` and `.is-expanded` class
    isCollapsingOrCollapsedSelector, // Targets `.is-collapsing` and `.is-collapsed` class
    
    // Conditional styling helpers:
    ifExpanded,              // Applies styles to elements in the fully expanded state
    ifCollapsed,             // Applies styles to elements in the fully collapsed state
    ifExpanding,             // Applies styles to elements currently in the expanding transition
    ifCollapsing,            // Applies styles to elements currently in the collapsing transition
    ifExpandingOrExpanded,   // Applies styles to elements that are either expanding or fully expanded
    ifCollapsingOrCollapsed, // Applies styles to elements that are either collapsing or fully collapsed
} from '@reusable-ui/collapse-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifExpandingOrExpanded({
        visibility: 'visible',
    }),
    ...ifCollapsingOrCollapsed({
        visibility: 'hidden',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isExpandingOrExpandedSelector, { // equivalent to `ifExpandingOrExpanded`
        height: '100px',
    }),
    ...rule(isCollapsingOrCollapsedSelector, { // equivalent to `ifCollapsingOrCollapsed`
        height: '0px',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesCollapseState(options?: CssCollapseStateOptions): CssCollapseState`

Generates CSS rules that conditionally apply the expand/collapse animations based on current expanded state, and exposes expand/collapse-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable              | Active When...   | Purpose                       |
|-----------------------|------------------|-------------------------------|
| `animationExpanding`  | `.is-expanding`  | Triggers expanding animation  |
| `animationCollapsing` | `.is-collapsing` | Triggers collapsing animation |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Expanded/collapsed state:
import { usesCollapseState } from '@reusable-ui/collapse-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const collapsibleBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        collapseStateRule,
        collapseStateVars: { isExpanded, isCollapsed },
    } = usesCollapseState({
        animationExpanding  : 'var(--box-expanding)',
        animationCollapsing : 'var(--box-collapsing)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply expanded/collapsed state rules:
        ...collapseStateRule(),
        
        // Define expanding animation:
        ...vars({
            '--box-expanding': [
                ['0.3s', 'ease-out', 'both', 'height-expanding'],
            ],
        }),
        ...keyframes('height-expanding', {
            from: {
                blockSize: '0px',
            },
            to: {
                blockSize: '100px',
            },
        }),
        
        // Define collapsing animation:
        ...vars({
            '--box-collapsing': [
                ['0.3s', 'ease-out', 'both', 'height-collapsing'],
            ],
        }),
        ...keyframes('height-collapsing', {
            from: {
                blockSize: '100px',
            },
            to: {
                blockSize: '0px',
            },
        }),
        
        // Define final block size based on lifecycle state:
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...fallback({
            '--blockSize-expanded' : `${isExpanded} 100px`,
        }),
        ...fallback({
            '--blockSize-collapsed' : `${isCollapsed} 0px`,
        }),
        blockSize: 'var(--blockSize-expanded, var(--blockSize-collapsed))',
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationExpanding` and `animationCollapsing` variables are only defined during **expanding** and **collapsing** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining expand/collapse animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/collapse-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/collapse-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/collapse-state brings expressive, adaptive collapse styling to your components.**  
Give it a ⭐ on GitHub if you find it useful!  
