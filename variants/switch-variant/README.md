# @reusable-ui/switch-variant 📦  

**switch-variant** is a reusable abstraction for building **switch-based variants** such as `outline-variant`, `mild-variant`, `orientation-variant`, and `emphasis-variant`.  
It provides a shared `usingSwitchVariant` helper that drives **boolean-like flag variables** and an optional **numeric factor variable** for algebraic styling.

With **switch-variant**, you can:
- Reduce boilerplate when defining mutually exclusive variants.  
- Ensure consistent behavior across all switch-based variant packages.  

## ✨ Features
✔ Declarative API for defining mutually exclusive, switch-based variants  
✔ Provides boolean-like flag variables for conditional styling  
✔ Provides optional factor variable for algebraic styling in `calc(...)` or other CSS functions  

## 📦 Installation
Install **@reusable-ui/switch-variant** via npm or yarn:

```sh
npm install @reusable-ui/switch-variant
# or
yarn add @reusable-ui/switch-variant
```

## 🧩 Exported CSS Hook

### `usingSwitchVariant(variantBehavior: CssSwitchVariantBehavior): CssRule`

Applies CSS variables for mutually exclusive, switch-based variants.

Behavior:
- Toggles **flag variables** (boolean-like CSS switches):
  - **Active** → variable set to an empty string (`''`), acts as an **active switch**.
  - **Inactive** → variable set to `unset`, poisoning dependent properties so the browser ignores them.
- Optionally drives a numeric **factor variable**, reflecting the currently active variant,
  which can be used for algebraic styling in `calc(...)` or other CSS functions.

Notes:
- If `factorVar` is provided, each flag entry must define a `factor` value (e.g., 0 or 1).
- All flag variables are pre-reset to `unset` to avoid accidental inheritance.

#### 💡 Usage Examples

```ts
// Outline variant without factor driver:
const outlineVariantRule : CssRule = usingSwitchVariant({
    // Flags for discrete switches in conditional styling:
    flags     : [
        {
            ifVariant : ifOutlined,
            variable  : outlineVariantVars.isOutlined,
        },
        {
            ifVariant : ifNotOutlined,
            variable  : outlineVariantVars.notOutlined,
        },
    ],
});
```

```ts
// Outline variant with factor driver:
const outlineVariantRule : CssRule = usingSwitchVariant({
    // Flags for discrete switches in conditional styling:
    flags     : [
        {
            ifVariant : ifOutlined,
            variable  : outlineVariantVars.isOutlined,
            factor    : 1, // Set to 1 when outlined.
        },
        {
            ifVariant : ifNotOutlined,
            variable  : outlineVariantVars.notOutlined,
            factor    : 0, // Set to 0 when not outlined.
        },
    ],
    factorVar : outlineVariantVars.outlineFactor, // The factor variable to set when a flag is active.
});
```

#### 🎨 Rendered CSS (simplified)

```css
.the-component-scope {
    /* Pre-reset all flags to `unset` to avoid accidental inheritance: */
    --isOutlined: unset;
    --notOutlined: unset;
    
    
    
    /* Conditionally activate flags and assign factor variable when their variant condition matches: */
    &.not-outlined {
        --notOutlined: '';
        --outlineFactor: 0;
    }
    &.is-outlined {
        --isOutlined: '';
        --outlineFactor: 1;
    }
}
```

## 🧠 How It Works

Switch-variant styling is built from two coordinated parts: **flags** and **factor**.  
Together, they let you declaratively map component variants to CSS styling — from simple on/off switches to algebraic formulas for complex styling.

### 1. Flags

Flags act as *discrete switches* for conditional styling.

- **Intent**: Apply properties for specific active variants, fully or not at all — never interpolated.  
- **Mechanics**:  
    - Variant changes toggle a `classname`.  
    - When the `classname` matches an `ifVariant` condition (e.g. `&.is-outlined { ... }`),  
      a CSS variable is set to an empty string (`''`) → acts as an **active switch**:  
        ```css
        .the-component-scope {
            /* Default reset: */
            --isOutlined: unset;
            
            /* Active: */
            &.is-outlined {
                --isOutlined: ;
            }
        }
        ```
    - That variable can then be used to conditionally apply properties:  
        ```css
        .the-component-scope {
            /* Usage: */
            background-image: var(--isOutlined) none;
            color: var(--isOutlined) red;
        }
        ```

Flags are perfect for **binary styling**: either the property is applied or ignored, never interpolated.

**Note:**  
- When set, flag variables hold an empty string (won't carry any meaningful value) — effectively toggling "on".  
- When unset, flag variables invalidate the declaration, so the browser ignores it — effectively toggling "off".  

### 2. Factor

Factor acts as a *numeric driver* for algebraic styling.

- **Intent**: Provide a numeric gate for mathematical formulas in CSS.  
- **Mechanics**:  
    - Variant changes toggle a `classname`.  
    - When the `classname` matches an `ifVariant` condition (e.g. `&.is-outlined { ... }`),  
      the factor variable is assigned the numeric value defined by that flag case (e.g. `0` or `1`):  
        ```css
        .the-component-scope {
            &.is-outlined {
                --outlineFactor: 1;
            }
            &.not-outlined {
                --outlineFactor: 0;
            }
        }
        ```
    - That variable can then be used in `calc(...)` or other CSS functions:  
        ```css
        .the-component-scope {
            /* 0 → blue, 1 → red: */
            color: color-mix(in oklch, blue calc((1 - var(--outlineFactor)) * 100%), red calc(var(--outlineFactor) * 100%));
            
            /* 0 → 50% opacity, 1 → 100% opacity: */
            opacity: clamp(0.5, var(--outlineFactor), 1);
        }
        ```

Factors are ideal for **algebraic styling**: numeric values drive formulas, enabling proportional or conditional effects.

### ✅ Summary

CSS Switch Variant combines **flags and factor** into a unified model:  
- **Flags** → binary switches for conditional styling.  
- **Factor** → numeric drivers for algebraic formulas.  

This layered approach makes switch-based variants both **expressive** and **maintainable**, giving you fine control over how styles respond to prop-driven variant changes.

## 📚 Related Packages

- [`@reusable-ui/orientation-variant`](https://www.npmjs.com/package/@reusable-ui/orientation-variant) - A utility for managing orientations consistently across React components.  
- [`@reusable-ui/flow-direction-variant`](https://www.npmjs.com/package/@reusable-ui/flow-direction-variant) - A utility for managing flow directions consistently across React components.  
- [`@reusable-ui/emphasis-variant`](https://www.npmjs.com/package/@reusable-ui/emphasis-variant) - A utility for managing visual emphasis consistently across React components.  
- [`@reusable-ui/outline-variant`](https://www.npmjs.com/package/@reusable-ui/outline-variant) - A utility for managing visual outline consistently across React components.  
- [`@reusable-ui/mild-variant`](https://www.npmjs.com/package/@reusable-ui/mild-variant) - A utility for managing mild styling (reading friendly) consistently across React components.  
- [`@reusable-ui/bare-variant`](https://www.npmjs.com/package/@reusable-ui/bare-variant) - A utility for managing bare styling (frameless, minimal layout) consistently across React components.  

## 🤝 Contributing  
Want to improve **@reusable-ui/switch-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/switch-variant provides a unified foundation for all prop-driven, mutually exclusive variants in Reusable-UI.**  
Give it a ⭐ on GitHub if you find it useful!  
