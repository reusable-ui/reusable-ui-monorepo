# @reusable-ui/spacer-config 📏  

**@reusable-ui/spacer-config** configures the spacing system (margins, paddings, and gaps) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the `:root` level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides a robust object-based configuration API.
You can perform CRUD operations, and any changes are instantly reflected in the corresponding CSS variables and propagated across all consuming components.

With **spacer-config**, you can:

- **Consume** configured spacing tokens across all UI components for consistent layout sizing.
- **Access and manipulate** spacing configurations dynamically from JavaScript code.
- **Define custom spacer tokens** or modify predefined spacing scales and default settings on the fly.

## 🧩 Spacer Variable Architecture & Naming Convention

The spacing configuration divides its tokens into two categories:

1. **General Spacing Properties (Defaults):**
  Base spacing properties that define the global default spacing across standard components.
  These serve as the foundational fallback for layout sizing.
  - **Naming Format:** Written in bare format `<domain>` (e.g., `spacing`).

2. **Specific Spacing Properties (Variants):**
  Specific spacing properties that allow for fine-tuned control over explicit margins, paddings, and gaps.
  These serve as scale variants to the general spacing properties, allowing developers to customize spacing for different UI elements and layouts.
  - **Naming Format:** Written with the domain as a namespace prefix followed by the variant `<domain><Variant>` (e.g., `spacingNone`, `spacingXxs`, `spacingMd`, `spacingLg`).

## ✨ Features

✔ **CRUD-Driven Management** — Easily retrieve, add, update, and delete spacer tokens from JavaScript.  
✔ **Direct Token Mapping** — Simple key-value pair structure.  
✔ **CSS-First Approach** — Minimal JavaScript runtime overhead; config propagation relies on native CSS variable cascades.  
✔ **Powered by @cssfn/core** — Efficient CSS-in-JS rendering supporting AOT for fast page loads and JIT for dynamic styling.  

## 📦 Installation & Setup  
Install **@reusable-ui/spacer-config** via npm or yarn:

```sh
npm install @reusable-ui/spacer-config
# or
yarn add @reusable-ui/spacer-config
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/spacer-config** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

```ts
import { StaticStyles, HydrateStyles } from '@cssfn/cssfn-react/server';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <StaticStyles />
        <HydrateStyles />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Predefined Spacer Tokens

Below is an overview of the predefined spacer tokens:

| Token           | Value              | Category | Description                 |
| --------------- | ------------------ | -------- | --------------------------- |
| `spacing`       | `.spacingMd`       | General  | Default component spacing.  |
| `spacingNone`   | `0rem`             | Specific | Zero spacing.               |
| `spacingXxs`    | `.spacingMd / 8`   | Specific | Extra-extra-small spacing.  |
| `spacingXs`     | `.spacingMd / 4`   | Specific | Extra-small spacing.        |
| `spacingSemiXs` | `.spacingMd / 3`   | Specific | Semi-extra-small spacing.   |
| `spacingSm`     | `.spacingMd / 2`   | Specific | Small spacing.              |
| `spacingSemiSm` | `.spacingMd / 1.5` | Specific | Semi-small spacing.         |
| `spacingMd`     | `1rem`             | Specific | Medium spacing (base unit). |
| `spacingLg`     | `.spacingMd * 1.5` | Specific | Large spacing.              |
| `spacingXl`     | `.spacingMd * 3`   | Specific | Extra-large spacing.        |

> **⚠️ Warning:**
> Do not delete the predefined spacer tokens, as standard components rely on their existence.
> You are free to override their values, but the token keys themselves must remain intact.
> Adding custom tokens is fully encouraged for additional spacing configurations.

*(Need to customize? See [Adding and Updating Spacers](#adding-and-updating-spacers).)*

## 📐 Usage and Customization

Using `spacingConfigVars` or `spacingConfigVarDefs`, you can perform CRUD operations keyed by your desired spacer tokens.

### Retrieving Spacers

- **`spacingConfigVars`** retrieves live CSS variable references (recommended for reactive component styling).
- **`spacingConfigVarDefs`** retrieves the evaluated expressions or concrete values (snapshots at retrieval time, useful when your JavaScript logic needs raw spacing values).

```ts
import { spacingConfigVars, spacingConfigVarDefs } from '@reusable-ui/spacer-config';

// Gets live CSS variable references (reactive & linked to config):
const spacerMediumRef  = spacingConfigVars.spacingMd; // Resolves to 'var(--spc-spacingMd)'
const spacerDefaultRef = spacingConfigVars.spacing;   // Resolves to 'var(--spc-spacing)'

// Gets evaluated snapshot values/expressions (for JS logic calculations):
const spacerMediumDef  = spacingConfigVarDefs.spacingMd; // Resolves to '1rem'
const spacerDefaultDef = spacingConfigVarDefs.spacing;   // Resolves to 'var(--spc-spacingMd)'
```

### Adding and Updating Spacers

To create or update (upsert) a spacer token, assign a concrete value or expression to either `spacingConfigVars` or `spacingConfigVarDefs` (both yield identical assignment results):

```ts
import { spacingConfigVars, spacingConfigVarDefs } from '@reusable-ui/spacer-config';

// Assigning via spacingConfigVars:
spacingConfigVars.spacingXxl = '6rem';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
spacingConfigVars.spacingMega = `calc(${spacingConfigVars.spacingMd} * 9)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
spacingConfigVars.spacingGiga = [[
  'calc(',
  spacingConfigVars.spacingMd,
  '* 18',
  ')',
]]; // Resolves to 'calc( var(--spc-spacingMd) * 18 )'



// Alternatively, assigning via spacingConfigVarDefs:
spacingConfigVarDefs.spacingXxl = '6rem';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
spacingConfigVarDefs.spacingMega = `calc(${spacingConfigVars.spacingMd} * 9)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
spacingConfigVarDefs.spacingGiga = [[
  'calc(',
  spacingConfigVars.spacingMd,
  '* 18',
  ')',
]]; // Resolves to 'calc( var(--spc-spacingMd) * 18 )'
```

### Deleting Spacers

To delete a spacer token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { spacingConfigVars, spacingConfigVarDefs } from '@reusable-ui/spacer-config';

// Deleting tokens using the delete operator:
delete spacingConfigVars.spacingXxl;
delete spacingConfigVars.spacingMega;

// Deleting tokens using null or undefined assignment:
spacingConfigVarDefs.spacingXxl = null;
spacingConfigVarDefs.spacingMega = undefined;
```

## 📖 Part of the Reusable-UI Framework  
This package is a **spacing system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/spacer-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/spacer-config simplifies spacing management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!
