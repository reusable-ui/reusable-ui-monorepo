# @reusable-ui/box-shadow-feature 📦  

A styling utility for composing a unified box shadow stack from custom and registered state packages.  
It exposes CSS variables for styling component’s box shadow.
Ideal for buttons, inputs, dialogs, and any interactive components.

## ✨ Features
✔ Composes custom and registered box shadows into a unified stack  
✔ Prevents unintended box shadow inheritance via internal pre-reset  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across state packages  

## 📦 Installation
Install **@reusable-ui/box-shadow-feature** via npm or yarn:

```sh
npm install @reusable-ui/box-shadow-feature
# or
yarn add @reusable-ui/box-shadow-feature
```

## 🧩 Exported Registry

### `boxShadowRegistry.boxShadows`

Retrieves the list of registered box shadow variables.

### `boxShadowRegistry.registerBoxShadow(boxShadowVariable, priority?): () => void`

Registers a box shadow variable with optional stacking priority.

### `boxShadowRegistry.onBoxShadowChange.subscribe()`

Subscribes a callback listener for box shadow registry changes.

## 🧩 Exported CSS Hook

### `usesBoxShadowFeature(options?: CssBoxShadowFeatureOptions): CssBoxShadowFeature`

Composes custom and registered box shadows into a unified stack and exposes ready-to-use CSS variables.

#### Exposes Variables

These variables are ready-to-use for styling your component’s box shadow.

| Variable    | Description                                     |
|-------------|-------------------------------------------------|
| `boxShadow` | The final composed box shadow stack for styling |

#### 💡 Usage Example

```ts
// Supporting states:
import { usesFocusState } from './states/focus-state'
import { usesExciteState } from './states/excite-state'

// Compound box shadow feature:
import { usesBoxShadowFeature } from '@reusable-ui/box-shadow-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { focusStateRule  } = usesFocusState();
    const { exciteStateRule } = usesExciteState();
    
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature({
        // Custom box shadows:
        boxShadow: [
            ['red', '10px', '5px', '5px'],
            ['teal', '60px', '-16px'],
        ],
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting state rules:
        ...focusStateRule(),
        ...exciteStateRule(),
        
        // Apply compound box shadow feature:
        ...boxShadowFeatureRule(),
        
        // Apply composed box shadows:
        boxShadow,
    });
};
```

#### 🧠 Resolution Logic

The final box shadows (`boxShadow`) value is composed of:

1. Custom box shadows (if provided)
2. Registered box shadow variables from independent state packages

All registered variables are internally pre-reset with `transparent 0 0` (a no-op box shadow) to prevent inheritance and ensuring the final `boxShadow` property remains valid—even when no box shadows are active.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/box-shadow-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/box-shadow-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/box-shadow-feature helps you build components with elegant, adaptive box shadow styling.**  
Give it a ⭐ on GitHub if you find it useful!  
