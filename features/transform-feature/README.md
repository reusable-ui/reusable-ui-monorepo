# @reusable-ui/transform-feature 📦  

A styling utility for composing a unified transform stack from custom and registered state packages.  
It exposes CSS variables for styling component’s transform.
Ideal for buttons, accordions, popups, and any interactive components.

## ✨ Features
✔ Composes custom and registered transforms into a unified stack  
✔ Prevents unintended transform inheritance via internal pre-reset  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across state packages  

## 📦 Installation
Install **@reusable-ui/transform-feature** via npm or yarn:

```sh
npm install @reusable-ui/transform-feature
# or
yarn add @reusable-ui/transform-feature
```

## 🧩 Exported Registry

### `transformRegistry.transforms`

Retrieves the list of registered transform variables.

### `transformRegistry.registerTransform(transformVariable, priority?): () => void`

Registers a transform variable with optional stacking priority.

### `transformRegistry.onTransformChange.subscribe()`

Subscribes a callback listener for transform registry changes.

## 🧩 Exported CSS Hook

### `usingTransformFeature(options?: CssTransformFeatureOptions): CssTransformFeature`

Composes custom and registered transforms into a unified stack and exposes ready-to-use CSS variables.

#### Exposes Variables

These variables are ready-to-use for styling your component’s transform.

| Variable    | Description                                    |
|-------------|------------------------------------------------|
| `transform` | The final composed transform stack for styling |

#### 💡 Usage Example

```ts
// Supporting states:
import { usingDisableState } from './states/disable-state'
import { usingActiveState } from './states/active-state'

// Compound transform feature:
import { usingTransformFeature } from '@reusable-ui/transform-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { disableStateRule } = usingDisableState();
    const { activeStateRule  } = usingActiveState();
    
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usingTransformFeature({
        // Custom transforms:
        transform: [[
            'translateX(10px)',
            'scale(1.2)',
        ]],
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting state rules:
        ...disableStateRule(),
        ...activeStateRule(),
        
        // Apply compound transform feature:
        ...transformFeatureRule(),
        
        // Apply composed transforms:
        transform,
    });
};
```

#### 🧠 Resolution Logic

The final transforms (`transform`) value is composed of:

1. Custom transforms (if provided)
2. Registered transform variables from independent state packages

All registered variables are internally pre-reset with `translate(0)` (a no-op transform) to prevent inheritance and ensuring the final `transform` property remains valid—even when no transforms are active.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/transform-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/transform-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/transform-feature helps you build components with elegant, adaptive transform styling.**  
Give it a ⭐ on GitHub if you find it useful!  
