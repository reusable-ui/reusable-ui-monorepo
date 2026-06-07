# @reusable-ui/foreground-feature 📦  

A styling utility for resolving the appropriate foreground color based on the currently active variants — including theme, outline, and mild.  
It exposes CSS variables for coloring your component’s foreground, with support for CSS color function adjustments.
Ideal for buttons, cards, dialogs, and any theme-aware components.

## ✨ Features
✔ Dynamically switches foreground color based on active variants (theme, outline, mild)  
✔ Exposes foreground color variable (`foregColor`) for direct usage or further adjustment via CSS color functions  
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

### `usingForegroundFeature(options?: CssForegroundFeatureOptions): CssForegroundFeature`

Resolves the appropriate foreground color based on the currently active variants and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for styling your component’s foreground.

| Variable            | Description                                                                    |
|---------------------|--------------------------------------------------------------------------------|
| `foregVariantColor` | Variant-aware resolved foreground color (outlined → mild → regular → fallback) |
| `foregColor`        | Final resolved foreground color (user-override → variant-aware)                |

You can further adjust `foregColor` using CSS color functions:
Example: `oklch(from ${foregColor} l c h / calc(alpha * 0.25))`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding variant is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable             | Active When...         | Purpose                                                             |
|----------------------|------------------------|---------------------------------------------------------------------|
| `foregRegularCond`   | Theme variant active   | Themed foreground color for the regular variant                     |
| `foregMildCond`      | Mild variant active    | Reading-friendly foreground color for mild variant                  |
| `foregOutlinedCond`  | Outline variant active | High-contrast foreground color for outlined variant                 |
| `foregColorOverride` | When user override set | User-defined override foreground color, highest priority if present |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasisVariant } from '@reusable-ui/emphasis-variant' // optional
import { usingOutlineVariant } from '@reusable-ui/outline-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'

// Theme-aware foreground feature:
import { usingForegroundFeature } from '@reusable-ui/foreground-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant(); // optional
    const { outlineVariantRule  } = usingOutlineVariant();
    const { mildVariantRule     } = usingMildVariant();
    
    const {
        foregroundFeatureRule,
        foregroundFeatureVars: { foregColor },
    } = usingForegroundFeature({
        foregroundColor: 'black',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting variant rules:
        ...themeVariantRule(),
        ...emphasisVariantRule(), // optional
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
