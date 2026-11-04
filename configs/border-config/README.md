# @reusable-ui/border-config 📐  

**@reusable-ui/border-config** configures border strokes (thickness, styling, and colors) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the `:root` level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides a robust object-based configuration API.
You can perform CRUD operations, and any changes are instantly reflected in the corresponding CSS variables and propagated across all consuming components.

With **border-config**, you can:

- **Consume** configured border strokes, widths, and styles across all UI components for consistent visual framing.
- **Access and manipulate** border configurations dynamically from JavaScript code.
- **Define custom border tokens** or modify predefined border settings on the fly.

## 🧩 Border Variable Architecture

The border system categorizes border configurations into two main groups:

- **Border Widths:** Sizing tokens for stroke thickness (`none`, `hair`, `thin`, `bold`, etc.).
- **Default Borders:** Fallback tokens governing default borders across standard components (`defaultWidth`, `defaultStyle`, `defaultColor`, `default`, etc.).

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

| Token          | Value                                           | Description                            |
| -------------- | ----------------------------------------------- | -------------------------------------- |
| `none`         | `0px`                                           | No border                              |
| `hair`         | `1px`                                           | Hairline border                        |
| `thin`         | `2px`                                           | Thin border                            |
| `bold`         | `4px`                                           | Bold border                            |
| `defaultWidth` | `.hair`                                         | Default border width                   |
| `defaultStyle` | `solid`                                         | Default border style                   |
| `defaultColor` | `currentColor`                                  | Default border color                   |
| `default`      | `.defaultWidth` `.defaultStyle` `.defaultColor` | Default border (width + style + color) |

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

// Gets the live CSS variable references (reactive & linked to config):
const borderWidthRef   = borderConfigVars.hair;    // Resolves to 'var(--bor-hair)'
const borderDefaultRef = borderConfigVars.default; // Resolves to 'var(--bor-default)'

// Gets the evaluated snapshot values/expressions (for JS logic calculations):
const borderWidthDef   = borderConfigVarDefs.hair;    // Resolves to '1px'
const borderDefaultDef = borderConfigVarDefs.default; // Resolves to 'var(--bor-defaultWidth) var(--bor-defaultStyle) var(--bor-defaultColor)'
```

### Adding and Updating Borders

To create or update (upsert) a border token, assign a concrete value or expression to either `borderConfigVars` or `borderConfigVarDefs` (both yield identical assignment results):

```ts
import { borderConfigVars, borderConfigVarDefs } from '@reusable-ui/border-config';

// Assigning via borderConfigVars:
borderConfigVars.extraBold      = '8px';
borderConfigVars.ultraBold      = `calc(${borderConfigVars.extraBold} * 2)`;
borderConfigVars.highlightColor = 'red';
borderConfigVars.highlight      = `${borderConfigVars.extraBold} ${borderConfigVars.defaultStyle} ${borderConfigVars.highlightColor}`;
borderConfigVars.selection      = [[ // Alternatively, using double brackets (`[[...]]`) for expression to produce space-separated values.
  borderConfigVars.ultraBold,
  borderConfigVars.defaultStyle,
  borderConfigVars.highlightColor,
]];

// Alternatively, assigning via borderConfigVarDefs:
borderConfigVarDefs.extraBold      = '8px';
borderConfigVarDefs.ultraBold      = `calc(${borderConfigVars.extraBold} * 2)`;
borderConfigVarDefs.highlightColor = 'red';
borderConfigVarDefs.highlight      = `${borderConfigVars.extraBold} ${borderConfigVars.defaultStyle} ${borderConfigVars.highlightColor}`;
borderConfigVarDefs.selection      = [[ // Alternatively, using double brackets (`[[...]]`) for expression to produce space-separated values.
  borderConfigVars.ultraBold,
  borderConfigVars.defaultStyle,
  borderConfigVars.highlightColor,
]];
```

### Deleting Borders

To delete a border token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { borderConfigVars, borderConfigVarDefs } from '@reusable-ui/border-config';

// Deleting tokens using the delete operator:
delete borderConfigVars.extraBold;
delete borderConfigVars.ultraBold;
delete borderConfigVars.highlightColor;

// Deleting tokens using null or undefined assignment:
borderConfigVarDefs.highlight = null;
borderConfigVarDefs.selection = undefined;
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
