# @reusable-ui/ring-feature 📦  

A styling utility for resolving the appropriate ring color based on the currently active theme variant.  
It exposes CSS variables for coloring your component’s ring (focus) indicators, with support for CSS color function adjustments.
Ideal for buttons, inputs, menus, and any focusable components.

## ✨ Features
✔ Dynamically switches ring color based on theme variant  
✔ Exposes ring color variable (`ringColor`) for direct usage or further adjustment via CSS color functions  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, theming, and color systems  

## 📦 Installation
Install **@reusable-ui/ring-feature** via npm or yarn:

```sh
npm install @reusable-ui/ring-feature
# or
yarn add @reusable-ui/ring-feature
```

## 🧩 Exported CSS Hooks

### `usesRingFeature(options?: CssRingFeatureOptions): CssRingFeature`

Resolves the appropriate ring color based on the currently active theme variant and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for styling your component’s ring.

| Variable           | Description                                                          |
|--------------------|----------------------------------------------------------------------|
| `ringVariantColor` | Variant-aware resolved ring color (regular → fallback)               |
| `ringColor`        | Final resolved ring color (user-override → variant-aware → fallback) |

You can further adjust `ringColor` using CSS color functions:
Example: `oklch(from ${ringColor} l c h / calc(alpha * 0.25))`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding variant is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable            | Active When...         | Purpose                                                       |
|---------------------|------------------------|---------------------------------------------------------------|
| `ringRegularCond`   | Theme variant active   | Themed ring color for the regular variant                     |
| `ringColorOverride` | When user override set | User-defined override ring color, highest priority if present |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasisVariant } from '@reusable-ui/emphasis-variant' // optional
import { usesOutlineVariant } from '@reusable-ui/outline-variant'     // optional
import { usesMildVariant } from '@reusable-ui/mild-variant'           // optional

// Theme-aware ring feature:
import { usesRingFeature } from '@reusable-ui/ring-feature';

// CSS-in-JS:
import { rule, style } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant(); // optional
    const { outlineVariantRule  } = usesOutlineVariant();  // optional
    const { mildVariantRule     } = usesMildVariant();     // optional
    
    const {
        ringFeatureRule,
        ringFeatureVars: { ringColor },
    } = usesRingFeature({
        ringColor: 'black',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting variant rules:
        ...themeVariantRule(),
        ...emphasisVariantRule(), // optional
        ...outlineVariantRule(),   // optional
        ...mildVariantRule(),      // optional
        
        // Apply theme-aware ring feature:
        ...ringFeatureRule(),
        
        // Use the resolved ring color:
        color: ringColor,
        
        ...rule(':focus-visible', {
            // Or adjust it via CSS color functions:
            boxShadow : `0 0 8px oklch(from ${ringColor} l c h / calc(alpha * 0.25))`,
        }),
    });
};
```

#### 🧠 Resolution Logic

The final ring color (`ringColor`) is determined by a prioritized fallback chain:

1. Regular theme override or regular color (if themed)
2. Config fallback (default: `currentColor`)

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/ring-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/ring-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/ring-feature helps you build theme-aware components with elegant, adaptive ring styling.**  
Give it a ⭐ on GitHub if you find it useful!  
