# @reusable-ui/config-variant 📦  

**config-variant** is a reusable abstraction for building **config-driven variants** such as `size-variant`, `featured-variant`, and `density-variant`.  
It provides a shared `usingConfigVariant` helper that automatically overrides base CSS configuration variables (e.g. `--fontSize`, `--rounded`) with their variant-specific counterparts (e.g. `--fontSizeSm`, `--roundedSm`) for the currently active variant.

With **config-variant**, you can:
- Reduce boilerplate for defining size-aware or config-aware variants.  
- Ensure consistent behavior across all config-driven variant packages.  
- Declaratively override base CSS configuration variables with variant-specific ones.  

## ✨ Features
✔ Declarative API for defining config-driven variants (e.g. size-variant, featured-variant, density-variant)  
✔ Automatically maps variant-specific variables to their base counterparts  
✔ Works with any union of string literal tokens (e.g. `sm | md | lg` or `eco | regular | premium`)  

## 📦 Installation
Install **@reusable-ui/config-variant** via npm or yarn:

```sh
npm install @reusable-ui/config-variant
# or
yarn add @reusable-ui/config-variant
```

## 🧩 Exported CSS Hook

### `usingConfigVariant(variantBehavior: CssConfigVariantBehavior): CssRule`

Overrides base CSS configuration variables with their variant-specific counterparts for the currently active variant.

Useful for config-driven variants (e.g. size-variant, featured-variant, density-variant).

#### 💡 Usage Example

```ts
const sizeVariantRule : Factory<CssRule> = () => usingConfigVariant({
    // Supported variant tokens:
    supportedTokens : ['sm', 'md', 'lg'],
    
    // The CSS configuration object containing base and variant-specific suffixed variables:
    configVars      : componentConfig,
    
    // Maps each token to its scoped selector and applies overrides:
    ifVariantOf     : (token, styles) => rule(`.is-${token}`, styles),
});

export const componentStyle = () => style({
    // Base styling for the component goes here:
    display: 'grid',
    
    
    
    // Apply the size variant rule to override base configuration variables with variant-specific ones:
    ...sizeVariantRule(),
    
    
    
    // Usage - size aware:
    fontSize : componentConfig.fontSize, // Responds to sm & lg variants.
    padding  : componentConfig.padding,  // Responds to lg variant only.
    margin   : componentConfig.margin,   // Invariant (no variant-specific alternatives).
});
```

#### 🎨 Rendered CSS (simplified)

This example shows a size‑aware component with `sm` and `lg` variants.  
Base CSS variables are overridden by their variant-specific counterparts whenever the corresponding variant is active.

```css
/* The component configuration variables: */
:root {
    --component-fontSize   : 1rem;
    --component-fontSizeSm : 0.5rem;
    --component-fontSizeLg : 2rem;
    
    --component-padding    : 0.75rem;
    --component-paddingLg  : 1.25rem;
    
    --component-margin     : 1.5rem;
}

/* The component styling: */
.the-component-scope {
    /* Base styling for the component goes here: */
    display: grid;
    
    
    
    /* begin - generated code by usingConfigVariant() */
    &.s-sm {
        --component-fontSize : var(--component-fontSizeSm);
    }
    &.s-lg {
        --component-fontSize : var(--component-fontSizeLg);
        --component-padding  : var(--component-paddingLg);
    }
    /* end - generated code by usingConfigVariant() */
    
    
    
    /* Usage - size aware: */
    font-size : var(--component-fontSize); /* Responds to sm & lg variants. */
    padding   : var(--component-padding);  /* Responds to lg variant only. */
    margin    : var(--component-margin);   /* Invariant (no variant-specific alternatives). */
}
```

## 🧠 How It Works

Config-variant works by generating CSS rules that override base configuration variables with their variant-specific counterparts whenever a specific variant token is active.

- **Intent**: Replace base CSS configuration variables with variant-specific suffixed ones when the corresponding variant is active.  
- **Mechanics**:  
    - Variant changes toggle a `classname`.  
    - When the `classname` matches an `ifVariantOf` condition (e.g. `&.s-sm { ... }`),  
      the variant-specific configuration variables (e.g. `--fontSizeSm`) are applied to their base counterparts (e.g. `--fontSize`):  
        ```css
        :root {
            --component-fontSize   : 1rem;
            --component-fontSizeSm : 0.5rem;
            --component-fontSizeLg : 2rem;
            ...
        }
        
        .the-component-scope {
            &.s-sm {
                --component-fontSize : var(--component-fontSizeSm); /* overridden */
                ...
            }
        }
        ```
    - These updated configuration variables can then be used to style the component in a size-aware manner:  
        ```css
        .the-component-scope {
            font-size : var(--component-fontSize); /* Responds to sm & lg variants. */
            ...
        }
        ```

### ✅ Summary

Config-variant combines **supported tokens**, **config variables**, and **selector mapping** into a unified model:  
- **Supported tokens** → define which variants are recognized.  
- **Config variables** → provide base and variant-specific values.  
- **Selector mapping (`ifVariantOf`)** → connects tokens to scoped rules that apply overrides.  

This layered approach makes config-driven variants both **declarative** and **maintainable**, ensuring consistent behavior across components while reducing boilerplate.

## 📚 Related Packages

- [`@reusable-ui/size-variant`](https://www.npmjs.com/package/@reusable-ui/size-variant) - A utility for managing sizes consistently across React components.  

## 🤝 Contributing  
Want to improve **@reusable-ui/config-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/config-variant provides a unified foundation for all config-driven variants in Reusable-UI.**  
Give it a ⭐ on GitHub if you find it useful!  
