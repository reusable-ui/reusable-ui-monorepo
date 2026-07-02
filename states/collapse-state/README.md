# @reusable-ui/collapse-state 📦  

**collapse-state** is a reusable abstraction for managing expand/collapse states in UI components.  
It provides a lifecycle-aware way to animate transitions between *expanded* and *collapsed* states, exposing semantic variables that make styling and contributor reasoning clear.  

Instead of manually toggling classes or wiring one-off expand/collapse logic, collapse-state automatically manages expand/collapse classes, ensuring transitions are smooth, predictable, and easy to maintain. This makes it ideal for interactive components — such as tooltips, accordions, and dialogs — where users can directly control expansion, while still giving implementors the flexibility to handle the expansion.  

With **collapse-state**, you get:  
- Controlled expand/collapse feedback  
- Transition animations tied to the expansion lifecycle  
- Semantic styling variables (`isExpanded`, `isCollapsed`, etc.) for fine-grained control  

## ✨ Features
✔ Lifecycle-aware expand/collapse animations based on current expanded state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ Supports controlled, uncontrolled, and hybrid expansion behavior  
✔ Restricted state handling — blocks user interaction while restricted (disabled or readonly), preserving the last known state until unrestricted  

## 📦 Installation
Install **@reusable-ui/collapse-state** via npm or yarn:

```sh
npm install @reusable-ui/collapse-state
# or
yarn add @reusable-ui/collapse-state
```

## 🧩 Exported Hooks

### `useCollapseState(props, options?)`

Resolves the expanded/collapsed state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled, uncontrolled, and hybrid expansion behavior with optional change dispatching.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useCollapseState,
    CollapseStateProps,
} from '@reusable-ui/collapse-state';
import styles from './CollapsibleBox.module.css';

export interface CollapsibleBoxProps extends
    CollapseStateProps<React.MouseEvent<HTMLButtonElement>>
{}

// A box that can be expanded and collapsed.
export const CollapsibleBox: FC<CollapsibleBoxProps> = (props) => {
    const {
        expanded,
        actualExpanded,
        expandPhase,
        expandClassname,
        
        dispatchExpandedChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useCollapseState(props, {
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

#### 🧠 Transition Animation Behavior

The hook manages transitions between `expanded` and `collapsed` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from expanded to collapsed) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🔒 Restricted Behavior (`disabled` or `readonly`)
- **Block dispatch; preserve last state**: When restricted, expansion requests are ignored. The component remains in its last expanded/collapsed state.  
- **On unrestricted (re‑enabled or exit readonly)**: `dispatchExpandedChange()` works normally.  
- **Rationale**: Restricted components freeze interaction — they don’t reset expansion, but prevent user interactions until unrestricted.

### `useResolvedExpanded(props, options?)`

Resolves the current expanded/collapsed state for a fully controlled component.

Useful for derived components that need to determine whether the base component is expanded or collapsed.

The resolved expanded state **must** be forwarded to the base component via the `expanded` prop,
so the base component becomes **fully controlled** and does not manage its own internal state.

The passed `props` must **not** include `defaultExpanded`, since this hook is designed for fully controlled components.

Unlike `useCollapseState()`, which supports both controlled and uncontrolled modes, `useResolvedExpanded()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Ideal for components that **consume** the resolved `expanded` state.

### `useDispatchExpandedChange(props, options)`

Creates a stable dispatcher for requesting a change to the expanded state.

This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `expanded` state and forwards it to a `<BaseComponent expanded={...}>`.

Unlike `useCollapseState()`, which supports both controlled and uncontrolled modes, `useDispatchExpandedChange()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Always triggers `onExpandedChange`, if provided.
- Ideal for components that **dictate** the `expanded` state externally and need a stable dispatcher without lifecycle orchestration.

### `useCollapseController(props, options?)`

Controls the current expanded/collapsed state and provides a dispatcher for requesting changes.

Useful for derived components that need to control the expanded state of the base component,
while also managing the expansion lifecycle and handling change requests.

The resolved expanded state **must** be forwarded to the base component via the `expanded` prop,
so the base component becomes **fully controlled** and does not manage its own internal state,
since this hook **already** manages the state and dispatches changes.

Unlike `useCollapseState()`, which resolves full lifecycle, `useCollapseController()` provides a **simplified implementation** for managing expansion state and dispatching changes.

- Supports both controlled and uncontrolled modes.
- If `expanded` is provided, the internal state is disabled and the component becomes fully controlled.
- If `expanded` is omitted, the internal state is initialized via `defaultExpanded`.
- Ideal for components that **manage** the resolved `expanded` state.

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

### `usingCollapseState(options?: CssCollapseStateOptions): CssCollapseState`

Generates CSS rules that conditionally apply the expand/collapse animations based on current expanded state, and exposes expand/collapse-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable              | Active When...                      | Purpose                                                                         |
|-----------------------|-------------------------------------|---------------------------------------------------------------------------------|
| `animationExpanding`  | `.is-expanding`                     | Runs the expanding animation sequence                                           |
| `animationCollapsing` | `.is-collapsing`                    | Runs the collapsing animation sequence                                          |
| `isExpanded`          | `.is-expanded` or `.is-expanding`   | Conditional variable for the expanded state                                     |
| `isCollapsed`         | `.is-collapsed` or `.is-collapsing` | Conditional variable for the collapsed state                                    |
| `expandFactor`        | Always available (animatable)       | Normalized factor: 0 = collapsed, 1 = expanded, interpolates during transitions |
| `expandFactorCond`    | Not fully collapsed                 | Conditional mirror of `expandFactor`, drops to `unset` when fully collapsed     |

#### 💡 Usage Example

```ts
// Animation feature:
import { usingAnimationFeature } from '@reusable-ui/animation-feature';

// Expanded/collapsed state:
import { usingCollapseState } from '@reusable-ui/collapse-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const collapsibleBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usingAnimationFeature();
    
    // Feature: expand/collapse lifecycle
    const {
        collapseStateRule,
        collapseStateVars: { isExpanded, isCollapsed, expandFactor },
    } = usingCollapseState({
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
        
        // Expanding animation: interpolate expandFactor from 0 → 1
        ...vars({
            '--box-expanding': [
                ['0.3s', 'ease-out', 'both', 'transition-expanding'],
            ],
        }),
        ...keyframes('transition-expanding', {
            from : { [expandFactor]: 0 },
            to   : { [expandFactor]: 1 },
        }),
        
        // Collapsing animation: interpolate expandFactor from 1 → 0
        ...vars({
            '--box-collapsing': [
                ['0.3s', 'ease-out', 'both', 'transition-collapsing'],
            ],
        }),
        ...keyframes('transition-collapsing', {
            from : { [expandFactor]: 1 },
            to   : { [expandFactor]: 0 },
        }),
        
        // Example usage:
        // - Height interpolates with `expandFactor`.
        // - 0 → hidden, 1 → full height.
        height: `calc-size(auto, size * ${expandFactor})`,
        boxSizing: 'border-box', // Include paddings and borders in the height calculation.
        overflow: 'hidden', // Crop overflowing content.
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationExpanding` and `animationCollapsing` variables are only defined during **expanding** and **collapsing** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usingAnimationFeature()` to apply the unified animation stack—combining expand/collapse animations with other state-driven transitions.

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
