# @reusable-ui/animation-feature 📦  

A styling utility for composing a unified animation stack from custom and registered state packages.  
It exposes CSS variables for styling component’s animation.
Ideal for buttons, accordions, popups, and any interactive components.

## ✨ Features
✔ Composes custom and registered animations into a unified stack  
✔ Prevents unintended animation inheritance via internal pre-reset  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across state packages  

## 📦 Installation
Install **@reusable-ui/animation-feature** via npm or yarn:

```sh
npm install @reusable-ui/animation-feature
# or
yarn add @reusable-ui/animation-feature
```

## 🧩 Exported Registry

### `animationRegistry.animations`

Retrieves the list of registered animation variables.

### `animationRegistry.registerAnimation(animationVariable, priority?): () => void`

Registers an animation variable with optional stacking priority.

### `animationRegistry.onAnimationChange.subscribe()`

Subscribes a callback listener for animation registry changes.

## 🧩 Exported CSS Hook

### `usingAnimationFeature(options?: CssAnimationFeatureOptions): CssAnimationFeature`

Composes custom and registered animations into a unified stack and exposes ready-to-use CSS variables.

#### Exposes Variables

These variables are ready-to-use for styling your component’s animation.

| Variable    | Description                                    |
|-------------|------------------------------------------------|
| `animation` | The final composed animation stack for styling |

#### 💡 Usage Example

```ts
// Supporting states:
import { usingDisabledState } from './states/disabled-state'
import { usingCollapseState } from './states/collapse-state'

// Compound animation feature:
import { usingAnimationFeature } from '@reusable-ui/animation-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { disabledStateRule } = usingDisabledState();
    const { collapseStateRule } = usingCollapseState();
    
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usingAnimationFeature({
        // Custom animations:
        animation: [
            ['500ms', 'ease-in', 'both', 'infinite', 'blinking'],
            ['300ms', 'ease-in', 'both', 'infinite', 'bounce'],
        ],
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting state rules:
        ...disabledStateRule(),
        ...collapseStateRule(),
        
        // Apply compound animation feature:
        ...animationFeatureRule(),
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The final animations (`animation`) value is composed of:

1. Custom animations (if provided)
2. Registered animation variables from independent state packages

All registered variables are internally pre-reset with `none` to prevent inheritance and ensuring the final `animation` property remains valid—even when no animations are active.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/animation-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/animation-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/animation-feature helps you build components with elegant, adaptive animation styling.**  
Give it a ⭐ on GitHub if you find it useful!  
