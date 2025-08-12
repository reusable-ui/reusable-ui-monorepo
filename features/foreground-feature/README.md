# @reusable-ui/foreground-feature 📦  

A styling utility for resolving the appropriate foreground color based on the currently active variants — including theme, outline, and mild.  
It exposes CSS variables for directly coloring your component’s foreground, with support for CSS color function adjustments.
Ideal for buttons, cards, dialogs, and any theme-aware components.

## ✨ Features
✔ Dynamically adjusts foreground color based on active variants (theme, outline, mild)  
✔ Resolved foreground color (`foregColor`) for direct usage or further adjustment via CSS color functions  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, theming, and color systems  

## 📦 Installation
Install **@reusable-ui/foreground-feature** via npm or yarn:

```sh
npm install @reusable-ui/foreground-feature
# or
yarn add @reusable-ui/foreground-feature
```

## 🧩 Exported CSS Hooks

### `usesForegroundFeature(options?: CssForegroundFeatureOptions): CssForegroundFeature`

Resolves the appropriate foreground color based on the currently active variants and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for coloring your component’s foreground.

| Variable      | Description                                              |
|---------------|----------------------------------------------------------|
| `foregColor`  | Final resolved foreground color based on active variants |

You can further adjust `foregColor` using CSS color functions:
Example: `oklch(from ${foregColor} l c h / calc(alpha * 0.25))`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding mode is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable            | Active When...      | Purpose                     |
|---------------------|---------------------|-----------------------------|
| `foregOutlinedCond` | Outline mode active | High-contrast foreground    |
| `foregMildCond`     | Mild mode active    | Reading-friendly foreground |
| `foregRegularCond`  | Theme mode active   | Themed foreground color     |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasizeVariant } from '@reusable-ui/emphasize-variant' // optional
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'

// Theme-aware foreground feature:
import { usesForegroundFeature } from '@reusable-ui/foreground-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule     } = usesThemeVariant();
    const { emphasizeVariantRule } = usesEmphasizeVariant(); // optional
    const { outlineVariantRule   } = usesOutlineVariant();
    const { mildVariantRule      } = usesMildVariant();
    
    const {
        foregroundFeatureRule,
        foregroundFeatureVars: { foregColor },
    } = usesForegroundFeature({
        foregroundColor: 'black',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting variant rules:
        ...themeVariantRule(),
        ...emphasizeVariantRule(), // optional
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Apply theme-aware foreground feature:
        ...foregroundFeatureRule(),
        
        // Use the resolved foreground color:
        color     : foregColor,
        
        // Or adjust it via CSS color functions:
        boxShadow : `0 0 8px oklch(from ${foregColor} l c h / calc(alpha * 0.25))`,
    });
};
```

#### 🧠 Resolution Logic

The final foreground color (`foregColor`) is determined by a prioritized fallback chain:

1. Outlined theme override or outlined color (if outlined)
2. Mild theme override or mild color (if mild)
3. Regular theme override or regular color (if themed)
4. Config fallback (default: `currentColor`)

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/foreground-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/foreground-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/foreground-feature helps you build theme-aware components with elegant, adaptive foreground styling.**  
Give it a ⭐ on GitHub if you find it useful!  
