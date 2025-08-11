# @reusable-ui/background-feature 📦  

A styling utility for resolving the appropriate background color based on the current active variants — including theme, emphasize, outline, and mild.  
It exposes CSS variables for directly coloring your component’s background, with support for layered background composition and color function adjustments.
Ideal for buttons, cards, dialogs, and any theme-aware components.

## ✨ Features
✔ Dynamically adjusts background color based on active variants (theme, emphasize, outline, mild)
✔ Resolved background color (`backgColor`) for direct usage or further adjustment via CSS color functions
✔ Composite background layers (`backg`) combining gradient, custom background, and themed color
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration
✔ Seamless integration across appearance, theming, and color systems

## 📦 Installation
Install **@reusable-ui/background-feature** via npm or yarn:

```sh
npm install @reusable-ui/background-feature
# or
yarn add @reusable-ui/background-feature
```

## 🧩 Exported CSS Hooks

### `usesBackgroundFeature(options?: CssBackgroundFeatureOptions): CssBackgroundFeature`

Resolves the appropriate background color based on the current active variants and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for coloring your component’s background.

| Variable      | Description                                              |
|---------------|----------------------------------------------------------|
| `backgColor`  | Final resolved background color based on active variants |
| `backg`       | Composite background layers: gradient → custom → color   |

You can further adjust `backgColor` using CSS color functions:
Ee.g.: `oklch(from ${backgColor} l c h / calc(alpha * 0.25))`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding mode is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable               | Active When...         | Purpose                          |
|------------------------|------------------------|----------------------------------|
| `backgEmphasizedCond`  | Emphasize mode active  | Gradient background layer        |
| `backgCond`            | Custom background set  | User-defined background layer    |
| `backgOutlinedCond`    | Outline mode active    | Transparent background layer     |
| `backgMildCond`        | Mild mode active       | Reading-friendly background      |
| `backgRegularCond`     | Theme mode active      | Themed background color          |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'

// Theme-aware background feature:
import { usesBackgroundFeature } from '@reusable-ui/background-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule     } = usesThemeVariant();
    const { emphasizeVariantRule } = usesEmphasizeVariant();
    const { outlineVariantRule   } = usesOutlineVariant();
    const { mildVariantRule      } = usesMildVariant();
    
    const {
        backgroundFeatureRule,
        backgroundFeatureVars: { backgColor, backg },
    } = usesBackgroundFeature({
        backgroundColor     : 'white',
        backgroundEmphasize : [
            ['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box'],
        ],
        background          : 'url(/texture.png)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting variant rules:
        ...themeVariantRule(),
        ...emphasizeVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Apply theme-aware background feature:
        ...backgroundFeatureRule(),
        
        // Apply composite background layers:
        background      : backg,
        
        // Or use the resolved color directly:
        backgroundColor : backgColor,
        
        // Or adjust it via CSS color functions:
        boxShadow       : `0 0 8px oklch(from ${backgColor} l c h / calc(alpha * 0.25))`,
    });
};
```

#### 🧠 Resolution Logic

The final background color (`backgColor`) is determined by a prioritized fallback chain:

1. Transparent (if outlined)
2. Mild theme override or mild color (if mild)
3. Regular theme override or regular color (if themed)
4. Config fallback (default: transparent)

The composite background (`backg`) stacks layers:

- Top    : gradient (if emphasized)
- Middle : custom background (if provided)
- Bottom : resolved background color

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/background-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/background-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/background-feature helps you build theme-aware components with elegant, layered background styling.**  
Give it a ⭐ on GitHub if you find it useful!  
