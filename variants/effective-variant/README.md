# @reusable-ui/effective-variant 📦  

**effective-variant** provides a collection of reusable **effective variant resolvers** for various kinds of props.  
It abstracts recurring variant resolution patterns found across many `*-variant` packages — from controlled inputs to advanced behaviors such as context inheriting and inverting.

By centralizing these patterns, you avoid duplicating logic across components and ensure consistency, predictability, and maintainability throughout your UI ecosystem.

With **effective-variant**, you can build:  
- **Controlled variants** — extract values from controlled props.  
- **Inheritance variants** — controlled variants that can inherit from context when 'inherit' token is encountered.  
- **Inversion variants** — controlled variants that can invert from context when 'invert' token is encountered.  

Currently, three main variant resolvers are provided.  
Future variant resolvers can be added as new patterns emerge, keeping the package extensible and adaptable.

## 🔗 Ecosystem Integration

The effective variant values produced by these resolvers can be fed directly into other `@reusable-ui` packages:

- [`@reusable-ui/orientation-variant`](https://www.npmjs.com/package/@reusable-ui/orientation-variant)
- [`@reusable-ui/emphasized-variant`](https://www.npmjs.com/package/@reusable-ui/emphasized-variant)
- [`@reusable-ui/theme-variant`](https://www.npmjs.com/package/@reusable-ui/theme-variant)

This makes **@reusable-ui/effective-variant** the foundational layer for consistent variant resolution across transitions, feedback, and interaction behaviors.

## ✨ Features
✔ Controlled variant management mode  
✔ Consistent resolution order (props → options → definition → feature-specific rules)  
✔ Declarative tokens for context inheritance and inversion  
✔ Unified type contracts (`Props`, `Options`, `Definition`) for each resolver  

## 📦 Installation
Install **@reusable-ui/effective-variant** via npm or yarn:

```sh
npm install @reusable-ui/effective-variant
# or
yarn add @reusable-ui/effective-variant
```

## 🧩 Exported Hooks

### `useResolvedControlledVariant(props, options, definition)`

Resolves an effective variant value from controlled props.

**Resolution order:**
  1. `props.variant`  
  2. `options.defaultVariant`  
  3. `definition.defaultVariant`  

#### 💡 Usage Examples

Controlled mode, by supplying a `variant` prop:

```ts
const size = useResolvedControlledVariant(
    // Props:
    { variant: 'lg' },
    
    // Options:
    { defaultVariant: 'md' },
    
    // Definition:
    { defaultVariant: 'md' }
); // → 'lg'
```

Default mode, by falling back to the component-level default:

```ts
const size = useResolvedControlledVariant(
    // Props:
    {},
    
    // Options:
    { defaultVariant: 'md' },
    
    // Definition:
    { defaultVariant: 'md' }
); // → 'md'
```

### `useResolvedInheritableVariant(props, options, definition)`

Resolves an effective variant value from controlled props while optionally
inheriting from context when the resolved value equals the explicit
inheritance token.

**Resolution order:**
  1. `props.variant`  
  2. `options.defaultVariant`  
  3. `definition.defaultVariant`  
  4. `variantContext` (when the resolved value equals `inheritableVariantToken`)  
  5. `fallbackVariant`  

#### 💡 Usage Examples

Controlled mode with inheritance, by supplying a `variant` prop and inheriting from context:

```ts
const theme = useResolvedInheritableVariant(
    // Props:
    { variant: 'inherit' },
    
    // Options:
    { defaultVariant: 'danger' },
    
    // Definition:
    {
        defaultVariant: 'primary',
        inheritableVariantToken: 'inherit',
        variantContext: ThemeVariantContext,
        fallbackVariant: 'secondary',
    }
); // → 'success' (assuming context provides `'success'`)
```

Default mode with inheritance, by falling back to the component-level default and inheriting from context:

```ts
const theme = useResolvedInheritableVariant(
    // Props:
    {},
    
    // Options:
    { defaultVariant: 'inherit' },
    
    // Definition:
    {
        defaultVariant: 'primary',
        inheritableVariantToken: 'inherit',
        variantContext: ThemeVariantContext,
        fallbackVariant: 'secondary',
    }
); // → 'success' (assuming context provides `'success'`)
```

### `useResolvedInvertableVariant(props, options, definition)`

Resolves an effective variant value from controlled props while optionally
inheriting or inverting from context when the resolved value equals the explicit
inheritance/inversion token.

**Resolution order:**
  1. `props.variant`  
  2. `options.defaultVariant`  
  3. `definition.defaultVariant`  
  4. `variantContext` (when the resolved value equals `inheritableVariantToken`)  
  5. Inverted `variantContext` (when the resolved value equals `invertableVariantToken`)  
  6. `fallbackVariant`  

#### 💡 Usage Examples

Controlled mode with inversion, by supplying a `variant` prop and inverting from context:

```ts
const orientation = useResolvedInvertableVariant(
    // Props:
    { variant: 'invert' },
    
    // Options:
    { defaultVariant: 'inline' },
    
    // Definition:
    {
        defaultVariant: 'inline',
        inheritableVariantToken: 'inherit',
        invertableVariantToken: 'invert',
        variantContext: ThemeVariantContext,
        invertVariant: (inheritedVariant) => (inheritedVariant === 'inline') ? 'block' : 'inline',
        fallbackVariant: 'inline',
    }
); // → 'inline' (assuming context provides `'block'`)
```

Default mode with inversion, by falling back to the component-level default and inverting from context:

```ts
const orientation = useResolvedInvertableVariant(
    // Props:
    {},
    
    // Options:
    { defaultVariant: 'invert' },
    
    // Definition:
    {
        defaultVariant: 'inline',
        inheritableVariantToken: 'inherit',
        invertableVariantToken: 'invert',
        variantContext: ThemeVariantContext,
        invertVariant: (inheritedVariant) => (inheritedVariant === 'inline') ? 'block' : 'inline',
        fallbackVariant: 'inline',
    }
); // → 'inline' (assuming context provides `'block'`)
```

## 📚 Related Packages

- [`@reusable-ui/orientation-variant`](https://www.npmjs.com/package/@reusable-ui/orientation-variant) – horizontal and vertical variants.  
- [`@reusable-ui/flow-direction-variant`](https://www.npmjs.com/package/@reusable-ui/flow-direction-variant) – start and end aligned variants.  
- [`@reusable-ui/size-variant`](https://www.npmjs.com/package/@reusable-ui/size-variant) – small, medium, and large variants.  
- [`@reusable-ui/theme-variant`](https://www.npmjs.com/package/@reusable-ui/theme-variant) – primary, secondary, success, etc. variants.  
- [`@reusable-ui/emphasized-variant`](https://www.npmjs.com/package/@reusable-ui/emphasized-variant) – emphasized variant.  
- [`@reusable-ui/outlined-variant`](https://www.npmjs.com/package/@reusable-ui/outlined-variant) – border-only variant.  
- [`@reusable-ui/mild-variant`](https://www.npmjs.com/package/@reusable-ui/mild-variant) – content-friendly colored variant.  
- [`@reusable-ui/stripped-variant`](https://www.npmjs.com/package/@reusable-ui/stripped-variant) – stripped layout variant.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/effective-variant** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/effective-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/effective-variant brings predictable, reusable variant resolution to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
