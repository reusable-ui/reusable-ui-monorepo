# @reusable-ui/excited-state 📦  

**excited-state** is a reusable abstraction for managing excitement feedback in UI components.  
It provides a lifecycle-aware way to manage the *excited* state, exposing semantic variables that make styling and contributor reasoning clear.  

When active, excited-state continuously replays its attention-grabbing animation until the component is no longer excited, ensuring feedback is smooth, predictable, and easy to maintain. This makes it ideal for components that need to grab user attention — such as badges, notifications, and alerts — whether triggered by user action or system events.  

With **excited-state**, you get:  
- Controlled excitement feedback  
- Continuous animation replay tied to the excitement lifecycle  

## ✨ Features
✔ Dynamically displays excitement animation based on current excited state  
✔ Supports controlled excitement with automatic animation replay  
✔ Gracefully completes running animations before stopping  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  

## 📦 Installation
Install **@reusable-ui/excited-state** via npm or yarn:

```sh
npm install @reusable-ui/excited-state
# or
yarn add @reusable-ui/excited-state
```

## 🧩 Exported Hooks

### `useExcitedState(props, options?)`

Resolves the excited state along with its associated CSS classname, based on component props, optional default configuration, and animation lifecycle.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useExcitedState,
    ExcitedStateProps,
} from '@reusable-ui/excited-state';
import styles from './ExcitableBox.module.css';

export interface ExcitableBoxProps extends ExcitedStateProps {}

// A box that can be excited.
export const ExcitableBox: FC<ExcitableBoxProps> = (props) => {
    const {
        excited,
        actualExcited,
        excitedClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useExcitedState(props, {
        defaultExcited    : false,          // Defaults the `excited` prop to `false` if not provided.
        animationPattern  : 'box-exciting', // Matches animation names ending with 'box-exciting'.
        bubblingAnimation : false,          // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.box} ${excitedClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {excited && <span className={styles.badge}>🔔</span>}
            <p>Additional details go here.</p>
        </div>
    );
};
```

### `useResolvedExcited(props, options?)`

Resolves the current excited state.

Useful for derived components that need to determine whether the base component is excited or not.

- Does not contain internal state.
- Ideal for components that **consume** the resolved `excited` state.

#### 🧠 Excitement Animation Behavior

The hook will replay the excitement animation as long as the `excited` prop remains `true`.  
When the prop changes to `false`, the currently running animation is allowed to finish gracefully—preventing abrupt interruptions or visual glitches.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Excitement Selectors:
    isExcitedSelector,    // Targets `.is-excited` classes
    isNotExcitedSelector, // Targets `.not-excited` classes
    
    // Conditional styling helpers:
    ifExcited,            // Applies styles to excited elements
    ifNotExcited,         // Applies styles to non-excited elements
} from '@reusable-ui/excited-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifExcited({
        backgroundColor: 'yellow',
        color: 'darkorange',
    }),
    ...ifNotExcited({
        backgroundColor: 'lightblue',
        color: 'darkblue',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isExcitedSelector, { // equivalent to `ifExcited`
        border: 'none',
    }),
    ...rule(isNotExcitedSelector, { // equivalent to `ifNotExcited`
        border: 'solid 1px black',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usingExcitedState(options?: CssExcitedStateOptions): CssExcitedState`

Generates CSS rules that conditionally apply the excitement animation based on current excited state, and exposes excitement-related CSS variables for conditional excitement animation.

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **invalid** (`unset`) when the component is idle.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable            | Active When...                | Purpose                                                                                                    |
|---------------------|-------------------------------|------------------------------------------------------------------------------------------------------------|
| `excitingAnimation` | `.is-excited` active          | Triggers excitement animation                                                                              |
| `excitedFactor`     | Always available (animatable) | Normalized factor: 0 = idle, oscillates between 0 ↔ 1 = exciting activity, interpolates during activities  |
| `excitedFactorCond` | Is still exciting             | Conditional mirror of `excitedFactor`, drops to `unset` when no longer exciting                            |

#### 💡 Usage Example

```ts
// Animation feature:
import { usingAnimationFeature } from '@reusable-ui/animation-feature';

// Excited state:
import { usingExcitedState } from '@reusable-ui/excited-state';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const highlightCardStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usingAnimationFeature();
    
    // Feature: excitement animation
    const {
        excitedStateRule,
        excitedStateVars: { excitedFactor },
    } = usingExcitedState({
        excitingAnimation: 'var(--box-exciting)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply excitement state rules:
        ...excitedStateRule(),
        
        // Exciting animation: oscillate excitedFactor between 0 ↔ 1 several times
        ...vars({
            '--box-exciting': [
                ['0.3s', 'ease-in-out', 'both', 'alternate', 4, 'exciting'],
            ],
        }),
        ...keyframes('exciting', {
            from : { [excitedFactor]: 0 },
            to   : { [excitedFactor]: 1 },
        }),
        
        // Example usage:
        
        // Oscillates scale between 1 ↔ 1.05 several times:
        transform: `scale(calc(1 + 0.05 * ${excitedFactor}))`,
        
        // Oscillates background color between transparent ↔ gold several times:
        backgroundColor: `color-mix(in oklch, transparent calc((1 - ${excitedFactor}) * 100%), gold calc(${excitedFactor} * 100%))`,
        
        // Apply composed animations:
        animation,
    });
}
```

#### 🧠 Resolution Logic

The `excitingAnimation` variable is conditionally defined when `.is-excited` is active.  

The variable is already registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume it directly.  
Instead, use `animationFeatureVars.animation` from `usingAnimationFeature()` to apply the unified animation stack—combining excitement animation with other state-driven animations.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/excited-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/excited-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/excited-state brings expressive, adaptive excitement styling to your components.**  
Give it a ⭐ on GitHub if you find it useful!  
