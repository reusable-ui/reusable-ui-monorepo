# @reusable-ui/spacer-config 📏  

**@reusable-ui/spacer-config** configures the spacing system (margins, paddings, and gaps) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the `:root` level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides a robust object-based configuration API.
You can perform CRUD operations, and any changes are instantly reflected in the corresponding CSS variables and propagated across all consuming components.

With **spacer-config**, you can:

- **Consume** configured spacing tokens across all UI components for consistent layout sizing.
- **Access and manipulate** spacing configurations dynamically from JavaScript code.
- **Define custom spacer tokens** or modify predefined spacing settings on the fly.

## 🧩 Spacer Variable Architecture

The spacing system categorizes spacing configurations into two main groups:

- **Fixed Spacers:** Absolute sizing tokens for explicit margins, paddings, and gaps (`none`, `xxs`, `xs`, `semiXs`, `sm`, `semiSm`, `md`, `lg`, `xl`, etc.).
  This group includes both static sizing tokens and computed tokens (which use `md` as their base for easier maintenance and can be overridden with concrete values or expressions).
- **Default Spacers:** Fallback tokens governing default spacing across standard components (`default`, etc.).

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

| Category            | Token     | Value       | Description                |
| ------------------- | --------- | ----------- | -------------------------- |
| **Fixed Spacers**   | `none`    | `0rem`      | Zero spacing               |
|                     | `xxs`     | `.md / 8`   | Extra-extra-small spacing  |
|                     | `xs`      | `.md / 4`   | Extra-small spacing        |
|                     | `semiXs`  | `.md / 3`   | Semi-extra-small spacing   |
|                     | `sm`      | `.md / 2`   | Small spacing              |
|                     | `semiSm`  | `.md / 1.5` | Semi-small spacing         |
|                     | `md`      | `1rem`      | Medium spacing (base unit) |
|                     | `lg`      | `.md * 1.5` | Large spacing              |
|                     | `xl`      | `.md * 3`   | Extra-large spacing        |
| **Default Spacers** | `default` | `.md`       | Default component spacing  |

> **⚠️ Warning:**
> Do not delete the predefined spacer tokens, as standard components rely on their existence.
> You are free to override their values, but the token keys themselves must remain intact.
> Adding custom tokens is fully encouraged for additional spacing configurations.

*(Need to customize? See [Adding and Updating Spacers](#adding-and-updating-spacers).)*

## 📐 Usage and Customization

Using `spacerConfigVars` or `spacerConfigVarDefs`, you can perform CRUD operations keyed by your desired spacer tokens.

### Retrieving Spacers

- **`spacerConfigVars`** retrieves live CSS variable references (recommended for reactive component styling).
- **`spacerConfigVarDefs`** retrieves the evaluated expressions or concrete values (snapshots at retrieval time, useful when your JavaScript logic needs raw spacing values).

```ts
import { spacerConfigVars, spacerConfigVarDefs } from '@reusable-ui/spacer-config';

// Gets live CSS variable references (reactive & linked to config):
const spacerMediumRef  = spacerConfigVars.md;      // Resolves to 'var(--spc-md)'
const spacerDefaultRef = spacerConfigVars.default; // Resolves to 'var(--spc-default)'

// Gets evaluated snapshot values/expressions (for JS logic calculations):
const spacerMediumDef  = spacerConfigVarDefs.md;      // Resolves to '1rem'
const spacerDefaultDef = spacerConfigVarDefs.default; // Resolves to 'var(--spc-md)'
```

### Adding and Updating Spacers

To create or update (upsert) a spacer token, assign a concrete value or expression to either `spacerConfigVars` or `spacerConfigVarDefs` (both yield identical assignment results):

```ts
import { spacerConfigVars, spacerConfigVarDefs } from '@reusable-ui/spacer-config';

// Assigning via spacerConfigVars:
spacerConfigVars.xxl = '6rem';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
spacerConfigVars.mega = `calc(${spacerConfigVars.md} * 9)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
spacerConfigVars.giga = [[
  'calc(',
  spacerConfigVars.md,
  '* 18',
  ')',
]]; // Resolves to 'calc( var(--spc-md) * 18 )'



// Alternatively, assigning via spacerConfigVarDefs:
spacerConfigVarDefs.xxl = '6rem';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
spacerConfigVarDefs.mega = `calc(${spacerConfigVars.md} * 9)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
spacerConfigVarDefs.giga = [[
  'calc(',
  spacerConfigVars.md,
  '* 18',
  ')',
]]; // Resolves to 'calc( var(--spc-md) * 18 )'
```

### Deleting Spacers

To delete a spacer token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { spacerConfigVars, spacerConfigVarDefs } from '@reusable-ui/spacer-config';

// Deleting tokens using the delete operator:
delete spacerConfigVars.xxl;
delete spacerConfigVars.mega;

// Deleting tokens using null or undefined assignment:
spacerConfigVarDefs.xxl = null;
spacerConfigVarDefs.mega = undefined;
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
