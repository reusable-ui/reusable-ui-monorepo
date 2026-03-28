# @reusable-ui/excite-state 📦  

**excite-state** is a reusable abstraction for managing excitement feedback in UI components.  
It provides a lifecycle-aware way to manage the *excited* state, exposing semantic variables that make styling and contributor reasoning clear.  

When active, excite-state continuously replays its attention-grabbing animation until the component is no longer excited, ensuring feedback is smooth, predictable, and easy to maintain. This makes it ideal for components that need to grab user attention — such as badges, notifications, and alerts — whether triggered by user action or system events.  

With **excite-state**, you get:  
- Controlled excitement feedback  
- Continuous animation replay tied to the excitement lifecycle  

## ✨ Features
✔ Dynamically displays excitement animation based on current excited state  
✔ Supports controlled excitement with automatic animation replay  
✔ Gracefully completes running animations before stopping  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  

## 📦 Installation
Install **@reusable-ui/excite-state** via npm or yarn:

```sh
npm install @reusable-ui/excite-state
# or
yarn add @reusable-ui/excite-state
```

## 🧩 Exported Hooks

### `useExciteBehaviorState(props, options?)`

Resolves the excited state along with its associated CSS class name, based on component props, optional default configuration, and animation lifecycle.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useExciteBehaviorState,
    ExciteStateProps,
} from '@reusable-ui/excite-state';
import styles from './ExcitableBox.module.css';

export interface ExcitableBoxProps extends ExciteStateProps {}

// A box that can be excited.
export const ExcitableBox: FC<ExcitableBoxProps> = (props) => {
    const {
        excited,
        actualExcited,
        exciteClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useExciteBehaviorState(props, {
        defaultExcited    : false,          // Defaults the `excited` prop to `false` if not provided.
        animationPattern  : 'box-exciting', // Matches animation names ending with 'box-exciting'.
        animationBubbling : false,          // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.box} ${exciteClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {excited && <span className={styles.badge}>🔔</span>}
            <p>Additional details go here.</p>
        </div>
    );
};
```

### `useExciteState(props, options?)`

Resolves the current excited state for a fully controlled component.

This hook is intended for components that **consume** the resolved `excited` state and **forward** it to a base component.

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
} from '@reusable-ui/excite-state';
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

### `usesExciteState(options?: CssExciteStateOptions): CssExciteState`

Generates CSS rules that conditionally apply the excitement animation based on current excited state, and exposes excitement-related CSS variables for conditional excitement animation.

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **invalid** (`unset`) when the component is idle.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable            | Active When...                | Purpose                                                                        |
|---------------------|-------------------------------|--------------------------------------------------------------------------------|
| `animationExciting` | `.is-excited` active          | Triggers excitement animation                                                  |
| `exciteFactor`      | Always available (animatable) | Normalized factor: 0 = idle, 0 ↔ 1 = exciting, interpolates during activities  |
| `exciteFactorCond`  | Is still exciting             | Conditional mirror of `exciteFactor`, drops to `unset` when no longer exciting |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Excite state:
import { usesExciteState } from '@reusable-ui/excite-state';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const highlightCardStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        exciteStateRule,
        exciteStateVars: { exciteFactor },
    } = usesExciteState({
        animationExciting: 'var(--highlight-exciting)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply excite state rules:
        ...exciteStateRule(),
        
        // Exciting animation: oscillate exciteFactor between 0 ↔ 1 several times
        ...vars({
            '--highlight-exciting': [
                ['0.3s', 'ease-in-out', 'both', 'alternate', 4, 'pulse-highlight'],
            ],
        }),
        ...keyframes('pulse-highlight', {
            from : { [exciteFactor]: 0 },
            to   : { [exciteFactor]: 1 },
        }),
        
        // Example usage:
        
        // Oscillates scale between 1 ↔ 1.05 several times:
        transform: `scale(calc(1 + 0.05 * ${exciteFactor}))`,
        
        // Oscillates background color between transparent ↔ gold several times:
        backgroundColor: `color-mix(in oklch, transparent calc((1 - ${exciteFactor}) * 100%), gold calc(${exciteFactor} * 100%))`,
        
        // Apply composed animations:
        animation,
    });
}
```

#### 🧠 Resolution Logic

The `animationExciting` variable is conditionally defined when `.is-excited` is active.  

The variable is already registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume it directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining excitement animation with other state-driven animations.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/excite-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/excite-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/excite-state brings expressive, adaptive excitement styling to your components.**  
Give it a ⭐ on GitHub if you find it useful!  
