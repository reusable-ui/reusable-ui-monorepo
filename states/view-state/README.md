# @reusable-ui/view-state 📦  

Adds view-switching functionality to UI components, with transition animations and semantic styling hooks.  
Ideal for tabs, slides, carousel, and any interactive component requiring controlled view-switching feedback.

## ✨ Features
✔ Lifecycle-aware view-switching animations based on current view index  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ Supports controlled, uncontrolled, and hybrid view-switching behavior  
✔ Indexing CSS variables (`--vi-viewIndex` and `--vi-prevViewIndex`) to animate transitions between views  
✔ Efficient JSX rendering — only renders views within the visible or transitioning range  
✔ Supports fractional view indices for scroll-sync and smooth preview transitions  
✔ Configurable snapping behavior via `viewIndexStep` (defaults to `1`) for integer-based or fractional transitions  
✔ Enforces clamped view index boundaries via `minViewIndex` and `maxViewIndex`  
✔ Exposes `actualViewIndex`, `minVisibleViewIndex`, and `maxVisibleViewIndex` for precise layout and rendering control
✔ Restricted state handling — blocks user interaction while restricted (disabled or readonly), preserving the last known view index until unrestricted  

## 📦 Installation
Install **@reusable-ui/view-state** via npm or yarn:

```sh
npm install @reusable-ui/view-state
# or
yarn add @reusable-ui/view-state
```

## 🧩 Exported Hooks

### `useViewBehaviorState(props, options?)`

Resolves the current view index, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled, uncontrolled, and hybrid view-switching behavior with optional change dispatching.

#### 💡 Usage Example

```tsx
import React, { FC, MouseEventHandler } from 'react';
import {
    useViewBehaviorState,
    ViewStateProps,
    UncontrollableViewStateProps,
    ViewStateChangeProps,
} from '@reusable-ui/view-state';
import styles from './SlideBox.module.css';

export interface SlideBoxProps extends
    ViewStateProps,
    UncontrollableViewStateProps, // optional uncontrolled behavior
    ViewStateChangeProps<MouseEventHandler<HTMLButtonElement>> // optional change dispatching behavior
{}

// A box that can switch views.
export const SlideBox: FC<SlideBoxProps> = (props) => {
    const {
        viewIndex,
        prevViewIndex,
        minVisibleViewIndex,
        maxVisibleViewIndex,
        actualViewIndex,
        viewPhase,
        viewClassname,
        viewStyle,
        
        dispatchViewIndexChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useViewBehaviorState(props, {
        defaultViewIndex  : 0,                                       // Fallback for uncontrolled mode.
        minViewIndex      : 0,                                       // Limits minimum view index to 0.
        maxViewIndex      : 4,                                       // Limits maximum view index to 4.
        viewIndexStep     : 1,                                       // Snaps to integer view indices.
        animationPattern  : ['view-progressing', 'view-regressing'], // Matches animation names ending with 'view-progressing' or 'view-regressing'.
        animationBubbling : false,                                   // Ignores bubbling animation events from children.
    });
    
    // Determine which views to render based on visibility range:
    const minRenderViewIndex = Math.floor(minVisibleViewIndex);
    const maxRenderViewIndex = Math.ceil(maxVisibleViewIndex);
    
    return (
        <div
            className={`${styles.box} ${viewClassname}`}
            style={viewStyle}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {['First', 'Second', 'Third', 'Fourth', 'Fifth'].map((label, currentIndex) => (
                // Only render views within the visible or transitioning range to optimize performance:
                ((currentIndex >= minRenderViewIndex) && (currentIndex <= maxRenderViewIndex)) && <div
                    key={currentIndex}
                    className={styles.item}
                >
                    <p>{label} view</p>
                </div>
            ))}
            
            <button onClick={(event) => dispatchViewIndexChange(((viewIndex - 1) + 5) % 5, event)}>
                Prev
            </button>
            <button onClick={(event) => dispatchViewIndexChange((viewIndex + 1) % 5, event)}>
                Next
            </button>
        </div>
    );
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions when `viewIndex` changes using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching to another `viewIndex`) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🔒 Restricted Behavior (`disabled` or `readonly`)
- **Block dispatch; preserve last state**: When restricted, view-switch requests are ignored. The component remains at its last view index.  
- **On unrestricted (re‑enabled or exit readonly)**: `dispatchViewIndexChange()` works normally.  
- **Rationale**: Restricted components freeze interaction — they don’t reset view index, but prevent user interactions until unrestricted.

### `useViewStatePhaseEvents(props, viewPhase)`

Emits lifecycle events in response to view phase transitions.

This hook observes the resolved `viewPhase` from `useViewBehaviorState()` and triggers the appropriate callbacks defined in `ViewStatePhaseEventProps`, such as:

- `onViewProgressingStart`
- `onViewProgressingEnd`
- `onViewRegressingStart`
- `onViewRegressingEnd`

### `useViewState(props, options?)`

Resolves the current view index for a fully controlled component.

This hook is intended for components that **consume** the resolved `viewIndex` value and **forward** it to a base component.

Unlike `useViewBehaviorState()`, which supports both controlled and uncontrolled modes, `useViewState()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Ideal for components that **consume** the resolved `viewIndex` value.

### `useViewIndexChangeDispatcher(props)`

Creates a stable dispatcher for requesting a change to the view index.

This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `viewIndex` value and forwards it to a `<BaseComponent viewIndex={...}>`.

Unlike `useViewBehaviorState()`, which supports both controlled and uncontrolled modes, `useViewIndexChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Always triggers `onViewIndexChange`, if provided.
- Ideal for components that **dictate** the `viewIndex` value externally and need a stable dispatcher without lifecycle orchestration.

### `useUncontrollableViewState(props, options?)`

Resolves the current view index and provides a dispatcher for requesting changes.

This hook is intended for components that **manage** the resolved `viewIndex` value and **forward** it to a base component, while optionally supporting uncontrolled behavior.

Unlike `useViewBehaviorState()`, which resolves full lifecycle, `useUncontrollableViewState()` provides a **simplified implementation** for managing view index state and dispatching changes.

- Supports both controlled and uncontrolled modes.
- If `viewIndex` is provided, the internal state is disabled and the component becomes fully controlled.
- If `viewIndex` is omitted, the internal state is initialized via `defaultViewIndex`.
- Ideal for components that **manage** the resolved `viewIndex` value.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // View-switching selectors:
    isViewSettledSelector,       // Targets `.view-settled` classes
    isViewProgressingSelector,   // Targets `.view-progressing` classes
    isViewRegressingSelector,    // Targets `.view-regressing` classes
    isViewTransitioningSelector, // Targets `.view-progressing` and `.view-regressing` classes
    
    // Conditional styling helpers:
    ifViewSettled,       // Applies styles to elements in a fully settled state (not transitioning between views)
    ifViewProgressing,   // Applies styles to elements currently progressing toward the next view (higher index)
    ifViewRegressing,    // Applies styles to elements currently regressing toward the previous view (lower index)
    ifViewTransitioning, // Applies styles to elements currently transitioning, either progressing or regressing between views
} from '@reusable-ui/view-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifViewSettled({
        opacity: 1,
    }),
    ...ifViewTransitioning({
        opacity: 0.5,
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isViewSettledSelector, { // equivalent to `ifViewSettled`
        scale: '100%',
    }),
    ...rule(isViewTransitioningSelector, { // equivalent to `ifViewTransitioning`
        scale: '80%',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesViewState(options?: CssViewStateOptions): CssViewState`

Generates CSS rules that conditionally apply the view-switching animations based on current view index, and exposes view-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable                   | Active When...             | Purpose                                            |
|----------------------------|----------------------------|----------------------------------------------------|
| `animationViewProgressing` | `.view-progressing`        | Triggers animation for progressing to next view    |
| `animationViewRegressing`  | `.view-regressing`         | Triggers animation for regressing to previous view |
| `isViewSettled`            | After transition completes | Indicates the view is fully settled                |
| `isViewProgressing`        | During transition          | Indicates a forward transition                     |
| `isViewRegressing`         | During transition          | Indicates a backward transition                    |
| `isViewTransitioning`      | During transition          | Indicates any transition in progress               |
| `viewIndex`                | Always                     | Displays the correct view for styling purposes     |
| `prevViewIndex`            | Having changed `viewIndex` | Previous view index used for directional inference |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// View-switching state:
import { usesViewState } from '@reusable-ui/view-state';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const slideBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        viewStateRule,
        viewStateVars: { viewIndex, prevViewIndex, isViewProgressing },
    } = usesViewState({
        animationViewProgressing : 'var(--box-view-progressing)',
        animationViewRegressing  : 'var(--box-view-regressing)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply view-switching state rules:
        ...viewStateRule(),
        
        // The parent container is 100px wide and overflows hidden.
        // To show the correct view, we translate this box based on the current viewIndex.
        // We `translate` using `marginInlineStart` for better RTL support, because `translate` is physical, not logical.
        
        // Define view-progressing animation:
        ...vars({
            '--box-view-progressing': [
                ['0.3s', 'ease-out', 'both', 'translate-view-progressing'],
            ],
        }),
        ...keyframes('translate-view-progressing', {
            from: {
                marginInlineStart: 0,
            },
            to: {
                marginInlineStart: `calc((${viewIndex} - ${prevViewIndex}) * -100px)`,
            },
        }),
        
        // Define view-regressing animation:
        ...vars({
            '--box-view-regressing': [
                ['0.3s', 'ease-out', 'both', 'translate-view-regressing'],
            ],
        }),
        ...keyframes('translate-view-regressing', {
            from: {
                marginInlineStart: `calc((${prevViewIndex} - ${viewIndex}) * -100px)`,
            },
            to: {
                marginInlineStart: 0,
            },
        }),
        
        // Define final translation based on current viewIndex:
        marginInlineStart: `${isViewProgressing} calc((${viewIndex} - ${prevViewIndex}) * -100px)`, // Translate to the current view.
        contain: 'layout', // Contain layout to prevent reflows.
        willChange: 'margin-inline-start', // Hint to browser for better performance.
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationViewProgressing` and `animationViewRegressing` variables are only defined during their respective transition phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining view-switching animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/view-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/view-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/view-state brings expressive, adaptive view-switching styling to your components.**  
Give it a ⭐ on GitHub if you find it useful!  
