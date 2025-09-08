# @reusable-ui/excite-state 📦  

A utility for triggering excitement animations based on the current excited state.  
Ideal for badges, shopping carts, dialogs, and any attention-grabbing components.

## ✨ Features
✔ Dynamically displays excitement animation based on the current excited state  
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
        exciteClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useExciteBehaviorState(props, {
        defaultExcited    : false,        // Defaults the `excited` prop to `false` if not provided.
        animationPattern  : 'box-excite', // Matches animation names ending with 'box-excite'.
        animationBubbling : false,        // Ignores bubbling animation events from children.
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

Generates CSS rules that conditionally apply the excitement animation based on the current excited state, and exposes excitement-related CSS variables for conditional excitement animation.

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **invalid** (`unset`) when the component is not excited.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable          | Active When...       | Purpose                       |
|-------------------|----------------------|-------------------------------|
| `animationExcite` | `.is-excited` active | Triggers excitement animation |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Excitement state:
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
    } = usesExciteState({
        animationExcite: 'var(--highlight-excite)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply excitement state rules:
        ...exciteStateRule(),
        
        // Define excitement animation:
        ...vars({
            '--highlight-excite': [
                ['0.3s', 'ease-in-out', 'both', 'alternate', 4, 'pulse-highlight'],
            ],
        }),
        ...keyframes('pulse-highlight', {
            from: {
                transform: 'scale(1)',
                backgroundColor: 'transparent',
            },
            to: {
                transform: 'scale(1.05)',
                backgroundColor: 'gold',
            },
        }),
        
        // Apply composed animations:
        animation,
    });
}
```

#### 🧠 Resolution Logic

The `animationExcite` variable is conditionally defined when `.is-excited` is active.  

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
