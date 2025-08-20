# @reusable-ui/filter-feature 📦  

A styling utility for composing a unified filter stack from custom and registered state packages.  
It exposes CSS variables for styling component’s filter.
Ideal for buttons, accordions, popups, and any interactive components.

## ✨ Features
✔ Composes custom and registered filters into a unified stack  
✔ Prevents unintended filter inheritance via internal pre-reset  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across state packages  

## 📦 Installation
Install **@reusable-ui/filter-feature** via npm or yarn:

```sh
npm install @reusable-ui/filter-feature
# or
yarn add @reusable-ui/filter-feature
```

## 🧩 Exported Registry

### `filterRegistry.filters`

Retrieves the list of registered filter variables.

### `filterRegistry.registerFilter(filterVariable, priority?): () => void`

Registers a filter variable with optional stacking priority.

### `filterRegistry.onFilterChange.subscribe()`

Subscribes a callback listener for filter registry changes.

## 🧩 Exported CSS Hook

### `usesFilterFeature(options?: CssFilterFeatureOptions): CssFilterFeature`

Composes custom and registered filters into a unified stack and exposes ready-to-use CSS variables.

#### Exposes Variables

These variables are ready-to-use for styling your component’s filter.

| Variable | Description                                 |
|----------|---------------------------------------------|
| `filter` | The final composed filter stack for styling |

#### 💡 Usage Example

```ts
// Supporting states:
import { usesDisableState } from './states/disable-state'
import { usesActiveState } from './states/active-state'

// Compound filter feature:
import { usesFilterFeature } from '@reusable-ui/filter-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { disableStateRule } = usesDisableState();
    const { activeStateRule  } = usesActiveState();
    
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature({
        // Custom filters:
        filter: [[
            'contrast(0.5)',
            'opacity(0.25)',
        ]],
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting state rules:
        ...disableStateRule(),
        ...activeStateRule(),
        
        // Apply compound filter feature:
        ...filterFeatureRule(),
        
        // Apply composed filters:
        filter,
    });
};
```

#### 🧠 Resolution Logic

The final filters (`filter`) value is composed of:

1. Custom filters (if provided)
2. Registered filter variables from independent state packages

All registered variables are internally pre-reset with `brightness(1)` (a no-op filter) to prevent inheritance and ensuring the final `filter` property remains valid—even when no filters are active.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/filter-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/filter-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/filter-feature helps you build components with elegant, adaptive filter styling.**  
Give it a ⭐ on GitHub if you find it useful!  
