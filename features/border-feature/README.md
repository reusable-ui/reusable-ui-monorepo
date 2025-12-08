# @reusable-ui/border-feature 📦  

A styling utility for resolving the appropriate border color, geometry, and radius based on the currently active variants — including theme, outline, mild, and bare.  
It exposes CSS variables for styling your component’s border, with support for CSS color function adjustments.
Ideal for buttons, cards, dialogs, and any theme-aware components.

## ✨ Features
✔ Dynamically switches border color based on active variants (theme, outline, mild)  
✔ Supports `bare` variant for geometry-only rendering  
✔ Exposes logical border widths and radii for full layout control  
✔ Exposes border color variable (`borderColor`) for direct usage or further adjustment via CSS color functions  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, theming, and color systems  

## 📦 Installation
Install **@reusable-ui/border-feature** via npm or yarn:

```sh
npm install @reusable-ui/border-feature
# or
yarn add @reusable-ui/border-feature
```

## 🧩 Exported CSS Hooks

### `usesBorderFeature(options?: CssBorderFeatureOptions): CssBorderFeature`

Resolves the appropriate border color and geometry based on the currently active variants and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for styling your component’s border.

| Variable                 | Description                                                                |
|--------------------------|----------------------------------------------------------------------------|
| `borderVariantColor`     | Variant-aware resolved border color (outlined → mild → regular → fallback) |
| `borderColor`            | Final resolved border color (user-override → variant-aware)                |
| `borderStyle`            | Resolved border style (default: `solid`)                                   |
| `borderInlineStartWidth` | Resolved border width on the left (or right in RTL)                        |
| `borderInlineEndWidth`   | Resolved border width on the right (or left in RTL)                        |
| `borderBlockStartWidth`  | Resolved border width on the top.                                          |
| `borderBlockEndWidth`    | Resolved border width on the bottom.                                       |
| `borderStartStartRadius` | Resolved border radius on the top-left corner (or top-right in RTL)        |
| `borderStartEndRadius`   | Resolved border radius on the top-right corner (or top-left in RTL)        |
| `borderEndStartRadius`   | Resolved border radius on the bottom-left corner (or bottom-right in RTL)  |
| `borderEndEndRadius`     | Resolved border radius on the bottom-right corner (or bottom-left in RTL)  |
| `borderInlineBaseWidth`  | Resolved horizontal border width used for general-purpose styling          |
| `borderBlockBaseWidth`   | Resolved vertical border width used for general-purpose styling            |

You can further adjust `borderColor` using CSS color functions:
Example: `oklch(from ${borderColor} l c h / calc(alpha * 0.25))`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding variant is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable              | Active When...         | Purpose                                                         |
|-----------------------|------------------------|-----------------------------------------------------------------|
| `borderRegularCond`   | Theme variant active   | Themed border color for the regular variant                     |
| `borderMildCond`      | Mild variant active    | Reading-friendly border color for mild variant                  |
| `borderOutlinedCond`  | Outline variant active | High-contrast border color for outlined variant                 |
| `borderBareCond`      | Bare variant active    | minimal layout rendering                                        |
| `borderColorOverride` | When user override set | User-defined override border color, highest priority if present |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasisVariant } from '@reusable-ui/emphasis-variant' // optional
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesBareVariant } from '@reusable-ui/bare-variant'

// Theme-aware border feature:
import { usesBorderFeature } from '@reusable-ui/border-feature';

// CSS-in-JS:
import { style, children } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant(); // optional
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    
    const {
        borderFeatureRule,
        borderFeatureVars: {
            borderStyle,
            
            borderInlineStartWidth,
            borderInlineEndWidth,
            borderBlockStartWidth,
            borderBlockEndWidth,
            
            borderStartStartRadius,
            borderStartEndRadius,
            borderEndStartRadius,
            borderEndEndRadius,
            
            borderColor,
            
            borderInlineBaseWidth,
            borderBlockBaseWidth,
        },
    } = usesBorderFeature({
        borderStyle  : 'solid',
        borderWidth  : '1px',
        borderRadius : '0.25rem',
        borderColor  : 'black',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting variant rules:
        ...themeVariantRule(),
        ...emphasisVariantRule(), // optional
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        
        // Apply theme-aware border feature:
        ...borderFeatureRule(),
        
        // Use the resolved border color:
        borderColor,
        
        // Or adjust it via CSS color functions:
        boxShadow : `0 0 8px oklch(from ${borderColor} l c h / calc(alpha * 0.25))`,
        
        // Apply border style:
        borderStyle,
        
        // Apply logical border widths:
        borderInlineStartWidth,
        borderInlineEndWidth,
        borderBlockStartWidth,
        borderBlockEndWidth,
        
        // Apply logical border radii:
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
        
        // Apply border to child elements:
        ...children('hr', {
            borderColor,
            borderStyle,
            
            // Use `borderInlineBaseWidth` instead of `borderBlockBaseWidth` because <hr> is horizontal separator:
            borderWidth: borderInlineBaseWidth,
        }),
    });
};
```

#### 🧠 Resolution Logic

The final border color (`borderColor`) is determined by a prioritized fallback chain:

1. Outlined theme override or outlined color (if outlined)
2. Mild theme override or mild color (if mild)
3. Regular theme override or regular color (if themed)
4. Config fallback (default: `borderVars.color`)

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/border-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/border-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/border-feature helps you build theme-aware components with elegant, adaptive border styling.**  
Give it a ⭐ on GitHub if you find it useful!  
