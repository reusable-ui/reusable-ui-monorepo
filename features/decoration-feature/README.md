# @reusable-ui/decoration-feature 📦  

A styling utility for resolving the appropriate decoration color based on the currently active variants — including theme, outline, and mild.  
It exposes CSS variables for coloring your component’s decoration, with support for CSS color function adjustments.
Ideal for buttons, cards, dialogs, and any theme-aware components.

## ✨ Features
✔ Dynamically switches decoration color based on active variants (theme, outline, mild)  
✔ Exposes decoration color variable (`decorColor`) for direct usage or further adjustment via CSS color functions  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, theming, and color systems  

## 📦 Installation
Install **@reusable-ui/decoration-feature** via npm or yarn:

```sh
npm install @reusable-ui/decoration-feature
# or
yarn add @reusable-ui/decoration-feature
```

## 🧩 Exported CSS Hooks

### `usesDecorationFeature(options?: CssDecorationFeatureOptions): CssDecorationFeature`

Resolves the appropriate decoration color based on the currently active variants and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for coloring your component’s decoration.

| Variable      | Description                                              |
|---------------|----------------------------------------------------------|
| `decorColor`  | Final resolved decoration color based on active variants |

You can further adjust `decorColor` using CSS color functions:
Example: `oklch(from ${decorColor} l c h / calc(alpha * 0.25))`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding variant is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable             | Active When...         | Purpose                                                                        |
|----------------------|------------------------|--------------------------------------------------------------------------------|
| `decorRegularCond`   | Theme variant active   | Themed decoration color for the regular variant                                |
| `decorMildCond`      | Mild variant active    | Reading-friendly decoration color for mild variant                             |
| `decorOutlinedCond`  | Outline variant active | High-contrast decoration color for outlined variant                            |
| `decorVariantColor`  | Always available       | Variant-aware resolved decoration color (outlined → mild → regular → fallback) |
| `decorColorOverride` | When user override set | User-defined override decoration color, highest priority if present            |
| `decorColor`         | Always available       | Final decoration color (user-override → variant-aware → fallback)              |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasisVariant } from '@reusable-ui/emphasis-variant' // optional
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'

// Theme-aware decoration feature:
import { usesDecorationFeature } from '@reusable-ui/decoration-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant(); // optional
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    
    const {
        decorationFeatureRule,
        decorationFeatureVars: { decorColor },
    } = usesDecorationFeature({
        decorationColor: 'black',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting variant rules:
        ...themeVariantRule(),
        ...emphasisVariantRule(), // optional
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Apply theme-aware decoration feature:
        ...decorationFeatureRule(),
        
        // Use the resolved decoration color:
        color     : decorColor,
        
        // Or adjust it via CSS color functions:
        boxShadow : `0 0 8px oklch(from ${decorColor} l c h / calc(alpha * 0.25))`,
    });
};
```

#### 🧠 Resolution Logic

The final decoration color (`decorColor`) is determined by a prioritized fallback chain:

1. Outlined theme override or outlined color (if outlined)
2. Mild theme override or mild color (if mild)
3. Regular theme override or regular color (if themed)
4. Config fallback (default: `currentColor`)

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/decoration-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/decoration-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/decoration-feature helps you build theme-aware components with elegant, adaptive decoration styling.**  
Give it a ⭐ on GitHub if you find it useful!  
