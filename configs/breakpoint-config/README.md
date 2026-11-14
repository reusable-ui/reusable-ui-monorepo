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
- **Define custom breakpoint tokens** or modify predefined breakpoint thresholds on the fly.

## 🧩 Breakpoint Variable Architecture & Naming Convention

The breakpoint configuration divides its tokens into two categories:

1. **General Breakpoint Properties (Standards):**
  General-purpose responsive breakpoint thresholds that define global responsive behaviors across standard components for both screen and container widths.
  - **Naming Format:** Written with the `breakpoint` namespace prefix followed by the variant `breakpoint<Variant>` (e.g., `breakpointXs`, `breakpointSm`, `breakpointMd`, `breakpointLg`, `breakpointXl`, `breakpointXxl`, `breakpointXxxl`).

2. **Component-Specific Breakpoint Properties (Customs):**
  Optional user-defined breakpoint thresholds that allow for isolated, fine-tuned control over specific component layouts where standard breakpoints do not suffice.
  - **Naming Format:** Written with a custom component prefix followed by the variant `<customPrefix><Variant>` (e.g., `articleSm`, `articleMd`, `navbarSm`, `navbarLg`, `formSm`, `formLg`).

These thresholds are evaluated against screen or container layouts to drive media queries and responsive adjustments.

Each breakpoint value acts as a **starting threshold** for responsive queries.
The **ending threshold** is implicitly defined as the point right before the next breakpoint begins.
For example, if `breakpointMd` is set to `768px` and `breakpointLg` to `992px`, the effective range for the `breakpointMd` tier spans from `768px` up to `991.99px`.
For the largest breakpoint (`breakpointXxxl`), the ending threshold extends infinitely (`Infinity`), creating an open-ended range.

*(See [Predefined Breakpoint Tokens](#predefined-breakpoint-tokens) for a complete list of tokens and their ranges.)*

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

| Token            | Value (Starting Threshold) | Implicit Ending Threshold | Description                     |
| ---------------- | -------------------------- | ------------------------- | ------------------------------- |
| `breakpointXs`   | `0px`                      | `575.99px`                | Extra-small screen width        |
| `breakpointSm`   | `576px`                    | `767.99px`                | Small screen width (tablets)    |
| `breakpointMd`   | `768px`                    | `991.99px`                | Medium screen width (laptops)   |
| `breakpointLg`   | `992px`                    | `1199.99px`               | Large screen width (desktops)   |
| `breakpointXl`   | `1200px`                   | `1399.99px`               | Extra-large screen width        |
| `breakpointXxl`  | `1400px`                   | `1599.99px`               | Double-extra-large screen width |
| `breakpointXxxl` | `1600px`                   | `Infinity`                | Triple-extra-large screen width |

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
const breakpointMediumRef = breakpointConfigVars.breakpointMd; // Resolves to 'var(--brk-breakpointMd)'

// Gets evaluated snapshot values/expressions (for JS logic calculations):
const breakpointMediumDef = breakpointConfigVarDefs.breakpointMd; // Resolves to '768px'
```

### Adding and Updating Breakpoints

To create or update (upsert) a breakpoint token, assign a concrete value or expression to either `breakpointConfigVars` or `breakpointConfigVarDefs` (both yield identical assignment results):

```ts
import { breakpointConfigVars, breakpointConfigVarDefs } from '@reusable-ui/breakpoint-config';

// Assigning via breakpointConfigVars:
breakpointConfigVars.breakpointXxxxl = '1920px';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
breakpointConfigVars.breakpointUltrawide = `calc(${breakpointConfigVars.breakpointXxl} + 200px)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
breakpointConfigVars.breakpointCinema = [[
  'calc(',
  breakpointConfigVars.breakpointXxl,
  '+ 400px',
  ')',
]]; // Resolves to 'calc( var(--brk-breakpointXxl) + 400px )'

// Custom breakpoints can be added for specific components or use cases, following the same pattern:
breakpointConfigVars.articleSm = '600px';
breakpointConfigVars.articleMd = `calc(${breakpointConfigVars.articleSm} + 200px)`;



// Alternatively, assigning via breakpointConfigVarDefs:
breakpointConfigVarDefs.breakpointXxxxl = '1920px';

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
breakpointConfigVarDefs.breakpointUltrawide = `calc(${breakpointConfigVars.breakpointXxl} + 200px)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
breakpointConfigVarDefs.breakpointCinema = [[
  'calc(',
  breakpointConfigVars.breakpointXxl,
  '+ 400px',
  ')',
]]; // Resolves to 'calc( var(--brk-breakpointXxl) + 400px )'

// Custom breakpoints can be added for specific components or use cases, following the same pattern:
breakpointConfigVarDefs.articleSm = '600px';
breakpointConfigVarDefs.articleMd = `calc(${breakpointConfigVars.articleSm} + 200px)`;
```

### Deleting Breakpoints

To delete a breakpoint token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { breakpointConfigVars, breakpointConfigVarDefs } from '@reusable-ui/breakpoint-config';

// Deleting tokens using the delete operator:
delete breakpointConfigVars.breakpointXxxxl;
delete breakpointConfigVars.breakpointUltrawide;

// Deleting tokens using null or undefined assignment:
breakpointConfigVarDefs.breakpointXxxxl = null;
breakpointConfigVarDefs.breakpointUltrawide = undefined;
```

### Using Responsive Query Utilities

In addition to configuration tokens, **breakpoint-config** provides responsive query utilities (`ifScreenWidthAtLeast`, `ifContainerWidthAtLeast`, etc.) to streamline conditional styling in CSS-in-JS.

| Purpose / Condition                | Screen Utility             | Container Utility             | Description                                                                                                                                     |
| ---------------------------------- | -------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Minimum Width** *(At least)*     | `ifScreenWidthAtLeast`     | `ifContainerWidthAtLeast`     | Applies styles when the width is **greater than or equal to** the starting threshold of the specified breakpoint.                               |
| **Maximum Width** *(Smaller than)* | `ifScreenWidthSmallerThan` | `ifContainerWidthSmallerThan` | Applies styles when the width is **smaller than** the starting threshold of the specified breakpoint.                                           |
| **Range Width** *(Between)*        | `ifScreenWidthBetween`     | `ifContainerWidthBetween`     | Applies styles when the width **spans** from the starting threshold of the lower breakpoint up to the ending threshold of the upper breakpoint. |
| **Exact Width** *(At breakpoint)*  | `ifScreenWidthAt`          | `ifContainerWidthAt`          | Applies styles when the width **spans** from the starting threshold of the specified breakpoint up to its ending threshold.                     |

Here's a visual representation of the predefined breakpoint tokens and their corresponding ranges:

```txt
Tokens:                [  xs  )   [  sm  )   [  md  )   [  lg  )   [  xl  )   ...
                                             │          │          │   
Thresholds:                                  └─ start   └─ start   └─ start
                                                 `md`      `lg`       `xl`

Responsive Queries Visualized:
• atLeast('md')                              [────────────────────────────>   ...
• smallerThan('md')    <─────────────────)
• between('md', 'lg')                        [─────────────────)
• at('md')                                   [──────)

Boundaries:
• `[` : Starting threshold (inclusive)
• `)` : Ending threshold (exclusive, one tick before the next starting threshold)
```

```ts
import { style } from '@cssfn/core';
import { breakpointConfigVars, ifScreenWidthAtLeast, ifContainerWidthAtLeast } from '@reusable-ui/breakpoint-config';

export const myComponentStyle = style({
  // Applies styling when viewport screen width is at least 'breakpointMd':
  ...ifScreenWidthAtLeast('breakpointMd', {
    padding: '2rem',
  }),
  
  // Applies styling when parent container width is at least 'breakpointLg':
  ...ifContainerWidthAtLeast('breakpointLg', {
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
