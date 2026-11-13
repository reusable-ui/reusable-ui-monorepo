# @reusable-ui/border-config 📐  

**@reusable-ui/border-config** configures border strokes (thickness, styling, and colors) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the `:root` level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides a robust object-based configuration API.
You can perform CRUD operations, and any changes are instantly reflected in the corresponding CSS variables and propagated across all consuming components.

With **border-config**, you can:

- **Consume** configured border strokes, widths, and styles across all UI components for consistent visual framing.
- **Access and manipulate** border configurations dynamically from JavaScript code.
- **Define custom border tokens** or modify predefined border scales and default settings on the fly.

## 🧩 Border Variable Architecture

The border system categorizes border configurations into two main groups:

- **Border Widths:** Sizing tokens for stroke thickness (`widthNone`, `widthHair`, `widthThin`, `widthBold`, etc.).
- **Default Borders:** Fallback tokens governing default borders across standard components (`width`, `style`, `color`, `border`, etc.).

## ✨ Features

✔ **CRUD-Driven Management** — Easily retrieve, add, update, and delete border tokens from JavaScript.  
✔ **Direct Token Mapping** — Simple key-value pair structure.  
✔ **CSS-First Approach** — Minimal JavaScript runtime overhead; config propagation relies on native CSS variable cascades.  
✔ **Powered by @cssfn/core** — Efficient CSS-in-JS rendering supporting AOT for fast page loads and JIT for dynamic styling.  

## 📦 Installation & Setup  
Install **@reusable-ui/border-config** via npm or yarn:

```sh
npm install @reusable-ui/border-config
# or
yarn add @reusable-ui/border-config
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/border-config** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## Predefined Border Tokens

Below is an overview of the predefined border tokens:

| Category            | Token        | Value                       | Description                            |
| ------------------- | ------------ | --------------------------- | -------------------------------------- |
| **Border Widths**   | `widthNone`  | `0px`                       | No border                              |
|                     | `widthHair`  | `1px`                       | Hairline border                        |
|                     | `widthThin`  | `2px`                       | Thin border                            |
|                     | `widthBold`  | `4px`                       | Bold border                            |
| **Default Borders** | `width`      | `.widthHair`                | Default border width                   |
|                     | `style`      | `solid`                     | Default border style                   |
|                     | `color`      | `currentColor`              | Default border color                   |
|                     | `border`     | `.width` `.style` `.color`  | Default border (width + style + color) |

> **⚠️ Warning:**
> Do not delete the predefined border tokens, as standard components rely on their existence.
> You are free to override their values, but the token keys themselves must remain intact.
> Adding custom tokens is fully encouraged for additional border configurations.

*(Need to customize? See [Adding and Updating Borders](#adding-and-updating-borders).)*

## 📐 Usage and Customization

Using `borderConfigVars` or `borderConfigVarDefs`, you can perform CRUD operations keyed by your desired border tokens.

### Retrieving Borders

- **`borderConfigVars`** retrieves live CSS variable references (recommended for reactive component styling).
- **`borderConfigVarDefs`** retrieves the evaluated expressions or concrete values (snapshots at retrieval time, useful when your JavaScript logic needs raw border values).

```ts
import { borderConfigVars, borderConfigVarDefs } from '@reusable-ui/border-config';

// Gets live CSS variable references (reactive & linked to config):
const borderWidthRef   = borderConfigVars.widthHair; // Resolves to 'var(--bor-widthHair)'
const borderDefaultRef = borderConfigVars.border;    // Resolves to 'var(--bor-border)'

// Gets evaluated snapshot values/expressions (for JS logic calculations):
const borderWidthDef   = borderConfigVarDefs.widthHair; // Resolves to '1px'
const borderDefaultDef = borderConfigVarDefs.border;    // Resolves to 'var(--bor-width) var(--bor-style) var(--bor-color)'
```

### Adding and Updating Borders

To create or update (upsert) a border token, assign a concrete value or expression to either `borderConfigVars` or `borderConfigVarDefs` (both yield identical assignment results):

```ts
import { borderConfigVars, borderConfigVarDefs } from '@reusable-ui/border-config';

// Assigning via borderConfigVars:
borderConfigVars.widthExtraBold = '8px';
borderConfigVars.widthUltraBold = `calc(${borderConfigVars.widthExtraBold} * 2)`;
borderConfigVars.colorHighlight = 'red';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
borderConfigVars.borderHighlight = `${borderConfigVars.widthExtraBold} ${borderConfigVars.style} ${borderConfigVars.colorHighlight}`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
borderConfigVars.borderSelection = [[
  borderConfigVars.widthUltraBold,
  borderConfigVars.style,
  borderConfigVars.colorHighlight,
]]; // Resolves to 'var(--bor-widthUltraBold) var(--bor-style) var(--bor-colorHighlight)'



// Alternatively, assigning via borderConfigVarDefs:
borderConfigVarDefs.widthExtraBold = '8px';
borderConfigVarDefs.widthUltraBold = `calc(${borderConfigVars.widthExtraBold} * 2)`;
borderConfigVarDefs.colorHighlight = 'red';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
borderConfigVarDefs.borderHighlight = `${borderConfigVars.widthExtraBold} ${borderConfigVars.style} ${borderConfigVars.colorHighlight}`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
borderConfigVarDefs.borderSelection = [[
  borderConfigVars.widthUltraBold,
  borderConfigVars.style,
  borderConfigVars.colorHighlight,
]]; // Resolves to 'var(--bor-widthUltraBold) var(--bor-style) var(--bor-colorHighlight)'
```

### Deleting Borders

To delete a border token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { borderConfigVars, borderConfigVarDefs } from '@reusable-ui/border-config';

// Deleting tokens using the delete operator:
delete borderConfigVars.widthExtraBold;
delete borderConfigVars.widthUltraBold;
delete borderConfigVars.colorHighlight;

// Deleting tokens using null or undefined assignment:
borderConfigVarDefs.borderHighlight = null;
borderConfigVarDefs.borderSelection = undefined;
```

## 📖 Part of the Reusable-UI Framework  
This package is a **border system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/border-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/border-config simplifies border management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!  
