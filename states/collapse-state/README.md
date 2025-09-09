# @reusable-ui/collapse-state 📦  

A utility for orchestrating expand/collapse animations based on the current transition phase.  
Ideal for tooltips, accordions, dialogs, and any collapsible UI components.

## ✨ Features
✔ Lifecycle-aware expand/collapse animations based on transition phase  
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

Resolves the expand/collapse state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

Supports controlled, uncontrolled, and hybrid expansion behavior with optional change dispatching.

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
    UncontrollableCollapseStateProps<MouseEventHandler<HTMLButtonElement>>, // optional uncontrolled behavior
    CollapseStateChangeProps // optional change dispatching behavior
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
        defaultExpanded   : false,                  // Fallback for uncontrolled mode.
        animationPattern  : ['expand', 'collapse'], // Matches animation names ending with 'expand' or 'collapse'.
        animationBubbling : false,                  // Ignores bubbling animation events from children.
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

- `onExpandStart`
- `onExpandEnd`
- `onCollapseStart`
- `onCollapseEnd`

### `useCollapseChangeDispatcher(props)`

Creates a stable dispatcher for requesting a change to the expanded state.

This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `expanded` state and forwards it to a `<BaseComponent expanded={...}>`.

Unlike `useCollapseBehaviorState()`, which supports both controlled and uncontrolled modes, `useCollapseChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.

- Always triggers `onExpandedChange`, if provided.
- Does not support internal fallback or uncontrolled behavior.
- Ideal for components that **dictate** state externally and need a clean dispatcher without lifecycle orchestration.

#### 🧠 Transition Animation Behavior

The hook manages transitions between `expanded` and `collapsed` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from collapse to expand) is deferred until the current animation completes.
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
    isExpandingOrExpandedSelector,   // Targets `.is-expanding` and `.is-expanded` classes
    isCollapsingOrCollapsedSelector, // Targets `.is-collapsing` and `.is-collapsed` classes
    
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

Generates CSS rules that conditionally apply the expand/collapse animations based on the current transition phase, and exposes expand/collapse-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable            | Active When...   | Purpose                       |
|---------------------|------------------|-------------------------------|
| `animationExpand`   | `.is-expanding`  | Triggers expanding animation  |
| `animationCollapse` | `.is-collapsing` | Triggers collapsing animation |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Expand/collapse state:
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
        animationExpand   : 'var(--box-expand)',
        animationCollapse : 'var(--box-collapse)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply expand/collapse state rules:
        ...collapseStateRule(),
        
        // Define expanding animation:
        ...vars({
            '--box-expand': [
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
            '--box-collapse': [
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

The `animationExpand` and `animationCollapse` variables are only defined during **expanding** and **collapsing** phases.

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
