# @reusable-ui/radius-config ⭕  

**@reusable-ui/radius-config** configures corner rounding (border radii) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the `:root` level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides a robust object-based configuration API.
You can perform CRUD operations, and any changes are instantly reflected in the corresponding CSS variables and propagated across all consuming components.

With **radius-config**, you can:

- **Consume** configured border radii across all UI components for consistent corner rounding.
- **Access and manipulate** radius configurations dynamically from JavaScript code.
- **Define custom radius tokens** or modify predefined radius settings on the fly.

## 🧩 Radius Variable Architecture

The radius system categorizes corner rounding configurations into three main groups:

- **Fixed Radii:** Absolute sizing tokens for explicit corner rounding (`none`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, etc.).
- **Relative Radii:** Dynamic sizing tokens that scale proportionally to component's width and/or height (`pill`, `circle`, etc.).
- **Default Radii:** Fallback tokens governing default corner rounding across standard components (`default`, etc.).

## ✨ Features

✔ **CRUD-Driven Management** — Easily retrieve, add, update, and delete radius tokens from JavaScript.  
✔ **Direct Token Mapping** — Simple key-value pair structure.  
✔ **CSS-First Approach** — Minimal JavaScript runtime overhead; config propagation relies on native CSS variable cascades.  
✔ **Powered by @cssfn/core** — Efficient CSS-in-JS rendering supporting AOT for fast page loads and JIT for dynamic styling.  

## 📦 Installation & Setup  
Install **@reusable-ui/radius-config** via npm or yarn:

```sh
npm install @reusable-ui/radius-config
# or
yarn add @reusable-ui/radius-config
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/radius-config** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## Predefined Radius Tokens

Below is an overview of the predefined radius tokens:

| Category           | Token     | Value      | Description                     |
| ------------------ | --------- | ---------- | --------------------------------|
| **Fixed Radii**    | `none`    | `0rem`     | Square corners (no rounding)    |
|                    | `xs`      | `0.125rem` | Micro corner radius             |
|                    | `sm`      | `0.25rem`  | Small corner radius             |
|                    | `md`      | `0.375rem` | Medium corner radius            |
|                    | `lg`      | `0.5rem`   | Large corner radius             |
|                    | `xl`      | `1rem`     | Extra-large corner radius       |
|                    | `xxl`     | `2rem`     | Extra-extra-large corner radius |
| **Relative Radii** | `pill`    | `50rem`    | Fully rounded pill shape        |
|                    | `circle`  | `50%`      | Circular shape                  |
| **Default Radii**  | `default` | `.md`      | Default component corner radius |

> **⚠️ Warning:**
> Do not delete the predefined radius tokens, as standard components rely on their existence.
> You are free to override their values, but the token keys themselves must remain intact.
> Adding custom tokens is fully encouraged for additional radius configurations.

*(Need to customize? See [Adding and Updating Radii](#adding-and-updating-radii).)*

## 📐 Usage and Customization

Using `radiusConfigVars` or `radiusConfigVarDefs`, you can perform CRUD operations keyed by your desired radius tokens.

### Retrieving Radii

- **`radiusConfigVars`** retrieves live CSS variable references (recommended for reactive component styling).
- **`radiusConfigVarDefs`** retrieves the evaluated expressions or concrete values (snapshots at retrieval time, useful when your JavaScript logic needs raw radius values).

```ts
import { radiusConfigVars, radiusConfigVarDefs } from '@reusable-ui/radius-config';

// Gets live CSS variable references (reactive & linked to config):
const radiusMediumRef  = radiusConfigVars.md;      // Resolves to 'var(--rad-md)'
const radiusDefaultRef = radiusConfigVars.default; // Resolves to 'var(--rad-default)'

// Gets evaluated snapshot values/expressions (for JS logic calculations):
const radiusMediumDef  = radiusConfigVarDefs.md;      // Resolves to '0.375rem'
const radiusDefaultDef = radiusConfigVarDefs.default; // Resolves to 'var(--rad-md)'
```

### Adding and Updating Radii

To create or update (upsert) a radius token, assign a concrete value or expression to either `radiusConfigVars` or `radiusConfigVarDefs` (both yield identical assignment results):

```ts
import { radiusConfigVars, radiusConfigVarDefs } from '@reusable-ui/radius-config';

// Assigning via radiusConfigVars:
radiusConfigVars.xxxl = '4rem';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
radiusConfigVars.mega = `calc(${radiusConfigVars.lg} * 1.5)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
radiusConfigVars.giga = [[
  'calc(',
  radiusConfigVars.lg,
  '* 2.5',
  ')',
]]; // Resolves to 'calc( var(--rad-lg) * 2.5 )'



// Alternatively, assigning via radiusConfigVarDefs:
radiusConfigVarDefs.xxxl = '4rem';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
radiusConfigVarDefs.mega = `calc(${radiusConfigVars.lg} * 1.5)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
radiusConfigVarDefs.giga = [[
  'calc(',
  radiusConfigVars.lg,
  '* 2.5',
  ')',
]]; // Resolves to 'calc( var(--rad-lg) * 2.5 )'
```

### Deleting Radii

To delete a radius token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { radiusConfigVars, radiusConfigVarDefs } from '@reusable-ui/radius-config';

// Deleting tokens using the delete operator:
delete radiusConfigVars.xxxl;
delete radiusConfigVars.mega;

// Deleting tokens using null or undefined assignment:
radiusConfigVarDefs.xxxl = null;
radiusConfigVarDefs.mega = undefined;
```

## 📖 Part of the Reusable-UI Framework  
This package is a **radius system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/radius-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/radius-config simplifies corner rounding management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!
