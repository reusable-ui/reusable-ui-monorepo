# @reusable-ui/padding-feature 📦  

A styling utility for resolving the appropriate padding values based on active bare mode and framework-level overrides.  
It exposes CSS variables for styling your component’s padding.
Ideal for buttons, cards, dialogs, and any layout-aware components.

## ✨ Features
✔ Dynamically adjusts padding based on active bare mode and framework-level overrides  
✔ Supports `bare` variant for geometry-only rendering  
✔ Exposes logical directional paddings for full layout control  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, theming, and spacing systems  

## 📦 Installation
Install **@reusable-ui/padding-feature** via npm or yarn:

```sh
npm install @reusable-ui/padding-feature
# or
yarn add @reusable-ui/padding-feature
```

## 🧩 Exported CSS Hooks

### `usesPaddingFeature(options?: CssPaddingFeatureOptions): CssPaddingFeature`

Resolves the appropriate padding values based on active bare mode and framework-level overrides and exposes ready-to-use CSS variables.

#### Primary Variables

These variables are ready-to-use for styling your component’s padding.

| Variable             | Description                                                  |
|----------------------|--------------------------------------------------------------|
| `paddingInlineStart` | Resolved padding on the left (or right in RTL)               |
| `paddingInlineEnd`   | Resolved padding on the right (or left in RTL)               |
| `paddingBlockStart`  | Resolved padding on the top                                  |
| `paddingBlockEnd`    | Resolved padding on the bottom                               |
| `paddingInlineBase`  | Resolved horizontal padding used for general-purpose styling |
| `paddingBlockBase`   | Resolved vertical padding used for general-purpose styling   |

You can further adjust `paddingInlineBase` and `paddingBlockBase` using CSS `calc()` function:
Example: `calc(${paddingInlineBase} * 0.5)`

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **poisoned** (`unset`) when their corresponding mode is inactive.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable          | Active When...   | Purpose                  |
|-------------------|------------------|--------------------------|
| `paddingBareCond` | Bare mode active | minimal layout rendering |

#### 💡 Usage Example

```ts
// Supporting variants:
import { usesBareVariant } from '@reusable-ui/bare-variant'

// Manageable padding feature:
import { usesPaddingFeature } from '@reusable-ui/padding-feature';

// CSS-in-JS:
import { style, children } from '@cssfn/core';

export const componentStyle = () => {
    const { bareVariantRule } = usesBareVariant();
    
    const {
        paddingFeatureRule,
        paddingFeatureVars: {
            paddingInlineStart,
            paddingInlineEnd,
            paddingBlockStart,
            paddingBlockEnd,
            
            paddingInlineBase,
            paddingBlockBase,
        },
    } = usesPaddingFeature({
        padding: '1rem',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply supporting variant rules:
        ...bareVariantRule(),
        
        // Apply manageable padding feature:
        ...paddingFeatureRule(),
        
        // Apply logical paddings:
        paddingInlineStart,
        paddingInlineEnd,
        paddingBlockStart,
        paddingBlockEnd,
        
        // Apply padding to child elements:
        ...children('hr', {
            paddingInline : paddingInlineBase,
            paddingBlock  : paddingBlockBase,
        }),
    });
};
```

#### 🧠 Resolution Logic

The final paddings (`paddingInlineStart`, `paddingBlockEnd`, etc.) are determined by a prioritized fallback chain:

1. Framework override (based on active conditions)
2. Explicit values from `CssPaddingFeatureOptions`
3. Config fallback (default: `spacerVars.default`)

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/padding-feature** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/padding-feature**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/padding-feature builds components with elegant, adaptive padding styling.**  
Give it a ⭐ on GitHub if you find it useful!  
