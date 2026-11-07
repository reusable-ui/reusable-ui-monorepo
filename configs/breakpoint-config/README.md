# @reusable-ui/breakpoint-config 💻  

**@reusable-ui/breakpoint-config** configures the breakpoint system (responsive layouts) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the `:root` level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides a robust object-based configuration API.
You can perform CRUD operations, and any changes are instantly reflected in the corresponding CSS variables and propagated across all consuming components.

In addition to configuration tokens, **breakpoint-config** provides responsive query utilities (`ifScreenWidthAtLeast`, `ifContainerWidthAtLeast`, etc.) to streamline conditional styling in CSS-in-JS.

With **breakpoint-config**, you can:

- **Consume** configured breakpoint tokens across all UI components for consistent responsive layouts.
- **Access and manipulate** breakpoint configurations dynamically from JavaScript code.
- **Write responsive styles** conditionally applying styles based on screen or container width thresholds using built-in query utilities.
- **Define custom breakpoint tokens** or modify predefined breakpoint settings on the fly.

## 🧩 Breakpoint Variable Architecture

The breakpoint system maps named tokens to absolute width thresholds (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`, etc.).
These thresholds are evaluated against screen or container layouts to drive media queries and responsive adjustments.

## ✨ Features

✔ **CRUD-Driven Management** — Easily retrieve, add, update, and delete breakpoint tokens from JavaScript.  
✔ **Responsive Query Utilities** — Built-in helper functions (`ifScreenWidthAtLeast`, `ifContainerWidthAtLeast`, etc.) for clean conditional styling.  
✔ **Direct Token Mapping** — Simple key-value pair structure.  
✔ **CSS-First Approach** — Minimal JavaScript runtime overhead; config propagation relies on native CSS variable cascades.  
✔ **Powered by @cssfn/core** — Efficient CSS-in-JS rendering supporting AOT for fast page loads and JIT for dynamic styling.  

## 📦 Installation & Setup  
Install **@reusable-ui/breakpoint-config** via npm or yarn:

```sh
npm install @reusable-ui/breakpoint-config
# or
yarn add @reusable-ui/breakpoint-config
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/breakpoint-config** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## Predefined Breakpoint Tokens

Below is an overview of the predefined breakpoint tokens:

| Token  | Value    | Description                     |
| ------ | -------- | ------------------------------- |
| `xs`   | `0px`    | Extra-small screen width        |
| `sm`   | `576px`  | Small screen width (tablets)    |
| `md`   | `768px`  | Medium screen width (laptops)   |
| `lg`   | `992px`  | Large screen width (desktops)   |
| `xl`   | `1200px` | Extra-large screen width        |
| `xxl`  | `1400px` | Double-extra-large screen width |
| `xxxl` | `1600px` | Triple-extra-large screen width |

> **⚠️ Warning:**
> Do not delete the predefined breakpoint tokens, as standard components rely on their existence.
> You are free to override their values, but the token keys themselves must remain intact.
> Adding custom tokens is fully encouraged for additional breakpoint configurations.

*(Need to customize? See [Adding and Updating Breakpoints](#adding-and-updating-breakpoints).)*

## 📐 Usage and Customization

Using `breakpointConfigVars` or `breakpointConfigVarDefs`, you can perform CRUD operations keyed by your desired breakpoint tokens.

### Retrieving Breakpoints

- **`breakpointConfigVars`** retrieves live CSS variable references (recommended for reactive component styling).
- **`breakpointConfigVarDefs`** retrieves the evaluated expressions or concrete values (snapshots at retrieval time, useful when your JavaScript logic needs raw breakpoint values).

```ts
import { breakpointConfigVars, breakpointConfigVarDefs } from '@reusable-ui/breakpoint-config';

// Gets live CSS variable references (reactive & linked to config):
const breakpointMediumRef = breakpointConfigVars.md; // Resolves to 'var(--brk-md)'

// Gets evaluated snapshot values/expressions (for JS logic calculations):
const breakpointMediumDef = breakpointConfigVarDefs.md; // Resolves to '768px'
```

### Adding and Updating Breakpoints

To create or update (upsert) a breakpoint token, assign a concrete value or expression to either `breakpointConfigVars` or `breakpointConfigVarDefs` (both yield identical assignment results):

```ts
import { breakpointConfigVars, breakpointConfigVarDefs } from '@reusable-ui/breakpoint-config';

// Assigning via breakpointConfigVars:
breakpointConfigVars.xxxxl = '1920px';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
breakpointConfigVars.ultrawide = `calc(${breakpointConfigVars.xxl} + 200px)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
breakpointConfigVars.cinema = [[
  'calc(',
  breakpointConfigVars.xxl,
  '+ 400px',
  ')',
]]; // Resolves to 'calc( var(--brk-xxl) + 400px )'



// Alternatively, assigning via breakpointConfigVarDefs:
breakpointConfigVarDefs.xxxxl = '1920px';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
breakpointConfigVarDefs.ultrawide = `calc(${breakpointConfigVars.xxl} + 200px)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
breakpointConfigVarDefs.cinema = [[
  'calc(',
  breakpointConfigVars.xxl,
  '+ 400px',
  ')',
]]; // Resolves to 'calc( var(--brk-xxl) + 400px )'
```

### Deleting Breakpoints

To delete a breakpoint token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { breakpointConfigVars, breakpointConfigVarDefs } from '@reusable-ui/breakpoint-config';

// Deleting tokens using the delete operator:
delete breakpointConfigVars.xxxxl;
delete breakpointConfigVars.ultrawide;

// Deleting tokens using null or undefined assignment:
breakpointConfigVarDefs.xxxxl = null;
breakpointConfigVarDefs.ultrawide = undefined;
```

### Using Responsive Query Utilities

In addition to configuration tokens, **breakpoint-config** provides responsive query utilities (`ifScreenWidthAtLeast`, `ifContainerWidthAtLeast`, etc.) to streamline conditional styling in CSS-in-JS.

| Purpose / Condition                 | Screen Utility             | Container Utility             | Description                                                                                                               |
| ----------------------------------- | -------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Minimum Width** *(At least)*      | `ifScreenWidthAtLeast`     | `ifContainerWidthAtLeast`     | Applies styles when the width is **bigger than or equal to** the specified breakpoint.                                    |
| **Maximum Width** *(Smaller than)*  | `ifScreenWidthSmallerThan` | `ifContainerWidthSmallerThan` | Applies styles when the width is **smaller than** the specified breakpoint.                                               |
| **Range Width** *(Between)*         | `ifScreenWidthBetween`     | `ifContainerWidthBetween`     | Applies styles when the width is **between** the minimum (inclusive) and maximum (exclusive) breakpoints.                 |
| **Exact Width** *(At breakpoint)*   | `ifScreenWidthAt`          | `ifContainerWidthAt`          | Applies styles when the width **starts** from the specified breakpoint (inclusive) up to the next breakpoint (exclusive). |

```ts
import { style } from '@cssfn/core';
import { breakpointConfigVars, ifScreenWidthAtLeast, ifContainerWidthAtLeast } from '@reusable-ui/breakpoint-config';

export const myComponentStyle = style({
  // Applies styling when viewport screen width is at least 'md':
  ...ifScreenWidthAtLeast('md', {
    padding: '2rem',
  }),
  
  // Applies styling when parent container width is at least 'lg':
  ...ifContainerWidthAtLeast('lg', {
    fontSize: '1.25rem',
  }),
});
```

## 📖 Part of the Reusable-UI Framework  
This package is a **breakpoint system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/breakpoint-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/breakpoint-config simplifies responsive layout management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!
