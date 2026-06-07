# @reusable-ui/background-feature 📦  

A styling utility for resolving the appropriate background color based on the currently active variants — including theme, emphasize, outline, mild, and bare.  
It exposes CSS variables for coloring your component’s background, with support for layered background composition and CSS color function adjustments.
Ideal for buttons, cards, dialogs, and any theme-aware components.

## ✨ Features
✔ Dynamically switches background color based on active variants (theme, emphasize, outline, mild)  
✔ Supports `bare` variant for geometry-only rendering  
✔ Exposes background color variable (`backgColor`) for direct usage or further adjustment via CSS color functions  
✔ Exposes composite background layers (`backg`) combining gradient, custom background layers, and themed color  
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

### `usingBackgroundFeature(options?: CssBackgroundFeatureOptions): CssBackgroundFeature`

Resolves the appropriate background color based on the currently active variants and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for styling your component’s background.

| Variable            | Description                                                                    |
|---------------------|--------------------------------------------------------------------------------|
| `backgVariantColor` | Variant-aware resolved background color (outlined → mild → regular → fallback) |
| `backgColor`        | Final resolved background color (user-override → variant-aware)                |
| `backgLayers`       | Composite background layers: gradient → custom → color                         |
| `backg`             | Final background value, resolved from layers or suppressed via bare variant    |

You can further adjust `backgColor` using CSS color functions:
Example: `oklch(from ${backgColor} l c h / calc(alpha * 0.25))`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding variant is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable              | Active When...           | Purpose                                                             |
|-----------------------|--------------------------|---------------------------------------------------------------------|
| `backgEmphasizedCond` | Emphasize variant active | Gradient background layer                                           |
| `backgCond`           | Custom background layers | User-defined background layers                                      |
| `backgRegularCond`    | Theme variant active     | Themed background color for the regular variant                     |
| `backgMildCond`       | Mild variant active      | Reading-friendly background color for mild variant                  |
| `backgOutlinedCond`   | Outline variant active   | Transparent background color for outlined variant                   |
| `backgBareCond`       | Bare variant active      | Suppresses background styling                                       |
| `backgColorOverride`  | When user override set   | User-defined override background color, highest priority if present |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usingOutlineVariant } from '@reusable-ui/outline-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingBareVariant } from '@reusable-ui/bare-variant'

// Theme-aware background feature:
import { usingBackgroundFeature } from '@reusable-ui/background-feature';

// CSS-in-JS:
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlineVariantRule  } = usingOutlineVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { bareVariantRule     } = usingBareVariant();
    
    const {
        backgroundFeatureRule,
        backgroundFeatureVars: { backgColor, backg },
    } = usingBackgroundFeature({
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
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        
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

The composite background (`backgLayers`) stacks layers:

1. Top    : gradient (if emphasized)
2. Middle : custom background layers (if provided)
3. Bottom : resolved background color

The final background (`backg`) resolves from these layers, or is suppressed if bare variant is active.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/background-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/background-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/background-feature helps you build theme-aware components with elegant, adaptive background styling.**  
Give it a ⭐ on GitHub if you find it useful!  
