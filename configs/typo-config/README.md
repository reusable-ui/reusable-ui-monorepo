# @reusable-ui/typo-config ✍️  

**@reusable-ui/typo-config** configures the typography system (font sizes, font families, font weights, line heights, and text wrapping rules) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the `:root` level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides a robust object-based configuration API.
You can perform CRUD operations, and any changes are instantly reflected in the corresponding CSS variables and propagated across all consuming components.

With **typo-config**, you can:

- **Consume** configured typography tokens across all UI components for consistent text hierarchy and styling.
- **Access and manipulate** typography configurations dynamically from JavaScript code.
- **Define custom typography tokens** or modify predefined font scales and default settings on the fly.

## 🧩 Typography Variable Architecture & Naming Convention

The typography configuration divides its tokens into two categories:

1. **General Typography Properties (Defaults):**
  Base typography properties that define the global defaults for font size, family, weight, line height, and wrapping rules across standard components.
  These serve as the foundational fallback for text styling and hierarchy.
  - **Naming Format:** Written in bare format `<domain>` (e.g., `fontSize`, `fontFamily`, `fontWeight`, `lineHeight`).

2. **Specific Typography Properties (Variants):**
  Specific typography properties that allow for fine-tuned control over the appearance of different text types, such as headings, paragraphs, and other typographic elements.
  These serve as scale variants or styling alternatives to the general typography properties, allowing developers to customize typography for different UI elements and layouts.
  - **Naming Format:** Written with the domain as a namespace prefix followed by the variant `<domain><Variant>` (e.g., `fontSizeSm`, `fontSizeMd`, `fontFamilySans`, `fontFamilySerif`).

## ✨ Features

✔ **CRUD-Driven Management** — Easily retrieve, add, update, and delete typography tokens from JavaScript.  
✔ **Direct Token Mapping** — Simple key-value pair structure.  
✔ **CSS-First Approach** — Minimal JavaScript runtime overhead; config propagation relies on native CSS variable cascades.  
✔ **Powered by @cssfn/core** — Efficient CSS-in-JS rendering supporting AOT for fast page loads and JIT for dynamic styling.  

## 📦 Installation & Setup  
Install **@reusable-ui/typo-config** via npm or yarn:

```sh
npm install @reusable-ui/typo-config
# or
yarn add @reusable-ui/typo-config
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/typo-config** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## Predefined Typography Tokens

Below is an overview of the predefined typography tokens:

| Token                 | Value                | Category | Description                                                                         |
| --------------------- | -------------------- | -------- | ----------------------------------------------------------------------------------- |
| `fontSize`            | `.fontSizeMd`        | General  | Default font size for standard application text.                                    |
| `fontSizeXs`          | `.fontSizeMd * 0.50` | Specific | Extra-small font size for fine print, captions, and secondary metadata.             |
| `fontSizeSm`          | `.fontSizeMd * 0.75` | Specific | Small font size for minor text elements and supportive annotations.                 |
| `fontSizeMd`          | `16px`               | Specific | Medium font size for standard body text and general content (base unit).            |
| `fontSizeLg`          | `.fontSizeMd * 1.25` | Specific | Large font size for section headings and emphasized content blocks.                 |
| `fontSizeXl`          | `.fontSizeMd * 1.50` | Specific | Extra-large font size for titles, banners, and prominent headings.                  |
| `fontSizeXxl`         | `.fontSizeMd * 1.75` | Specific | Double-extra-large font size for prominent headings and hero sections.              |
| `fontSizeXxxl`        | `.fontSizeMd * 2.00` | Specific | Triple-extra-large font size for hero sections, display text, and major callouts.   |
| `fontFamily`          | `.fontFamilySans`    | General  | Cross-platform default font stack for standard application text.                    |
| `fontFamilySans`      | sans font stack      | Specific | Cross-platform sans-serif font stack for modern UI design and readability.          |
| `fontFamilySerif`     | serif font stack     | Specific | Cross-platform serif font stack for traditional and formal text presentation.       |
| `fontFamilyMonospace` | monospace font stack | Specific | Cross-platform monospace font stack for code snippets, terminals, and tabular data. |
| `fontWeight`          | `.fontWeightNormal`  | General  | Default font weight for standard application text.                                  |
| `fontWeightLighter`   | `lighter`            | Specific | Lightest font weight for subtle emphasis and secondary text.                        |
| `fontWeightLight`     | `300`                | Specific | Light font weight for delicate text and secondary content.                          |
| `fontWeightNormal`    | `400`                | Specific | Standard font weight for regular text and body content.                             |
| `fontWeightSemibold`  | `600`                | Specific | Semi-bold font weight for moderate emphasis and subheadings.                        |
| `fontWeightBold`      | `700`                | Specific | Bold font weight for strong emphasis, headings, and callouts.                       |
| `fontWeightBolder`    | `bolder`             | Specific | Boldest font weight for maximum emphasis and attention-grabbing text.               |
| `fontStyle`           | `normal`             | General  | Default font style for standard application text.                                   |
| `textDecoration`      | `none`               | General  | Default text decoration for standard application text.                              |
| `lineHeight`          | `.lineHeightMd`      | General  | Default line height for standard application text.                                  |
| `lineHeightSm`        | `1.25`               | Specific | Slightly reduced line height for compact text blocks and tight layouts.             |
| `lineHeightMd`        | `1.50`               | Specific | Standard line height for comfortable reading and balanced text spacing.             |
| `lineHeightLg`        | `2.00`               | Specific | Large line height for relaxed text readability.                                     |
| `overflowWrap`        | `break-word`         | General  | Controls word wrapping behavior to prevent overflow in constrained containers.      |

> **⚠️ Warning:**
> Do not delete the predefined typography tokens, as standard components rely on their existence.
> You are free to override their values, but the token keys themselves must remain intact.
> Adding custom tokens is fully encouraged for additional typography configurations.

*(Need to customize? See [Adding and Updating Typography](#adding-and-updating-typography).)*

## 📐 Usage and Customization

Using `typoConfigVars` or `typoConfigVarDefs`, you can perform CRUD operations keyed by your desired typography tokens.

### Retrieving Typography

- **`typoConfigVars`** retrieves live CSS variable references (recommended for reactive component styling).
- **`typoConfigVarDefs`** retrieves the evaluated expressions or concrete values (snapshots at retrieval time, useful when your JavaScript logic needs raw typography values).

```ts
import { typoConfigVars, typoConfigVarDefs } from '@reusable-ui/typo-config';

// Gets live CSS variable references (reactive & linked to config):
const typoMediumRef  = typoConfigVars.fontSizeMd; // Resolves to 'var(--typ-fontSizeMd)'
const typoLargeRef   = typoConfigVars.fontSizeLg; // Resolves to 'var(--typ-fontSizeLg)'
const typoDefaultRef = typoConfigVars.fontSize;   // Resolves to 'var(--typ-fontSize)'

// Gets evaluated snapshot values/expressions (for JS logic calculations):
const typoMediumDef  = typoConfigVarDefs.fontSizeMd; // Resolves to '16px'
const typoLargeDef   = typoConfigVarDefs.fontSizeLg; // Resolves to 'calc(var(--typ-fontSizeMd) * 1.25)'
const typoDefaultDef = typoConfigVarDefs.fontSize;   // Resolves to 'var(--typ-fontSizeMd)'
```

### Adding and Updating Typography

To create or update (upsert) a typography token, assign a concrete value or expression to either `typoConfigVars` or `typoConfigVarDefs` (both yield identical assignment results):

```ts
import { typoConfigVars, typoConfigVarDefs } from '@reusable-ui/typo-config';

// Assigning via typoConfigVars:
typoConfigVars.fontSizeJumbo       = '36px';
typoConfigVars.fontWeightExtrabold = 900;

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
typoConfigVars.lineHeightXl = `calc(${typoConfigVars.lineHeightLg} + 0.5)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
typoConfigVars.lineHeightXxl = [[
  'calc(',
  typoConfigVars.lineHeightXl,
  '+ 0.5',
  ')',
]]; // Resolves to 'calc( var(--typ-lineHeightXl) + 0.5 )'



// Alternatively, assigning via typoConfigVarDefs:
typoConfigVarDefs.fontSizeJumbo       = '36px';
typoConfigVarDefs.fontWeightExtrabold = 900;

// Using string interpolation to construct dynamic expressions:
// - Ideal for creating formulas driven by one or more variables.
typoConfigVarDefs.lineHeightXl = `calc(${typoConfigVars.lineHeightLg} + 0.5)`;

// Alternative syntax to string interpolation (using double brackets `[[...]]` to automatically join array items with spaces):
typoConfigVarDefs.lineHeightXxl = [[
  'calc(',
  typoConfigVars.lineHeightXl,
  '+ 0.5',
  ')',
]]; // Resolves to 'calc( var(--typ-lineHeightXl) + 0.5 )'
```

### Deleting Typography

To delete a typography token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { typoConfigVars, typoConfigVarDefs } from '@reusable-ui/typo-config';

// Deleting tokens using the delete operator:
delete typoConfigVars.fontSizeJumbo;
delete typoConfigVars.fontWeightExtrabold;

// Deleting tokens using null or undefined assignment:
typoConfigVarDefs.lineHeightXl  = null;
typoConfigVarDefs.lineHeightXxl = undefined;
```

## 📖 Part of the Reusable-UI Framework  
This package is a **typography system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/typo-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/typo-config simplifies typography management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!  
