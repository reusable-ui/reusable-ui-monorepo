# @reusable-ui/color-config 🎨  

**@reusable-ui/color-config** configures the theme color system (color palettes and shades) across all UI components.

Under the hood, it stores configurations in native CSS variables placed at the root level,
allowing them to be shared seamlessly across all components within the app.

To easily access and update these variables programmatically, the package provides robust object modeling and helper APIs.  
You can perform CRUD operations, and any changes are instantly reflected to the corresponding CSS variables
and propagated across all consuming components.

With **color-config**, you can:

- **Consume** configured color palettes and shades across all UI components for consistent theming.
- **Access and manipulate** color configurations dynamically from JavaScript code.
- **Define custom themes** or modify generation parameters on the fly.

## 🧩 Color Variable Architecture

The color system operates on a **two-tier pipeline**: it starts with an **Invariant Primary Tier**, which automatically branches out into a **Derived Contextual Tier** to power component surfaces.

```text
🎨 Theme Color System Pipeline
 ├── 1️⃣ Invariant Primary Tier
 │    ├── ⚪ Common Colors (Non-semantic constants: black, white, grays)
 │    └── 🔵 Root Colors   (Semantic theme sources: primary, success, danger, etc.)
 │
 └── 2️⃣ Derived Contextual Tier
      ├── 🖼️ Background Colors (*Base, *Mild)
      ├── 🖋️ Foreground Colors (*Flip, *Text, *Face)
      ├── 📐 Border Colors     (*Bold, *Thin, *Edge)
      └── ✨ Effect Colors     (*Soft)
```

### 🧠 How It Works

1. **Primary Sources:** You define or customize core values (such as your brand colors or neutrals) that remain invariant — meaning they stay unaffected by light/dark modes and dynamic color parameter adjustments.
2. **Derived Shades:** Using your defined semantic root colors as inputs, the system **auto-generates** specialized shades (such as text contrast, border strokes, and background fills) driven by color parameter configurations via native CSS color functions. *Note: Only semantic root colors produce these derived shadings; non-semantic common colors do not.*
3. **CRUD Overrides:** You can let the system auto-generate everything out-of-the-box, or manually tweak, add, and override any shade using the provided JavaScript CRUD APIs.

### 🔲 Contextual Shades

Contextual shades represent specific brightness levels derived from a root color.
Certain shades (`Flip`, `Face`, `Soft`) are designed for cross-variant reuse, referencing shared design tokens across different component variants (`regular`, `mild`, `outlined`).

- **Backgrounds:**
  - **`Base`** — A strong, vivid color designed to fill the component's primary background area.
  - **`Mild`** — A smooth, soft tone (near-white in light mode, near-black in dark mode) designed for content surfaces that serve as readable article areas (akin to paper).

- **Foregrounds:**
  - **`Flip`** — A high-contrast text color formulated for readability against regular backgrounds (typically near-white against dark backgrounds, or near-black against perceptually bright backgrounds such as yellow or cyan).
  - **`Text`** — A high-contrast text color formulated for readability against mild backgrounds (typically near-black in light mode or near-white in dark mode).
  - **`Face`** — A high-saturation, vivid color dedicated to preserving the authentic visual expression of graphic art.
    Special case exceptions:
    - **Regular Variant:** Because `Face` can be too close in tone to the `Base` background, graphics and icons gracefully fall back to `Flip` for optimal contrast and legibility.
    - **Outlined Variant:** Text, icons, graphics, and borders act together as a unified piece of graphic art:
      - Icons and graphics natively consume `Face`.
      - Text color falls back to `Face` (instead of neutral `Flip` or `Text`), allowing text to act as a vibrant graphic element floating over a transparent background.
      - The `Edge` border typically mirrors the `Face` color to maintain a cohesive, single-unit aesthetic.

- **Borders:**
  - **`Bold`** — A high-contrast border and separator color designed to frame regular backgrounds.
  - **`Thin`** — A fair-contrast border and separator color designed to frame mild backgrounds. Using `Bold` against mild backgrounds creates excessive contrast, which is why the `Thin` border variant exists.
  - **`Edge`** — A colorful, high-saturation border and separator color designed to frame outlined (transparent) backgrounds, avoiding the dullness of `Bold` or `Thin`. It typically mirrors the `Face` color.
  - **`Soft`** — A semi-transparent effect color used for focus ring indicators and box shadows. Instead of shifting lightness, it relies on alpha transparency to blend smoothly with surrounding environment colors across all component variants (`regular`, `mild`, `outlined`).

## ✨ Features

✔ **CRUD-Driven Management** — Easily retrieve, add, update, and delete color tokens from JavaScript.
✔ **Themeable** — Provides structured support for standard thematic roles (`primary`, `success`, `warning`, `danger`, etc.).
✔ **Contextual Shades** — Automatically generates specialized shades (such as text contrast, border strokes, and background fills).
✔ **Light/Dark Mode Aware** — Supports automatic contrast and color flipping across all UI components.
✔ **CSS-First Approach** — Minimal JavaScript runtime overhead; config propagation relies on native CSS variable cascades, while color shadings use native CSS color functions and `calc()`.
✔ **Powered by @cssfn/core** — Efficient CSS-in-JS rendering supporting AOT for fast page loads and JIT for dynamic styling.

## 📦 Installation & Setup  
Install **@reusable-ui/color-config** via npm or yarn:

```sh
npm install @reusable-ui/color-config
# or
yarn add @reusable-ui/color-config
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/color-config** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## Default Colors and Shades

Below is an overview of the default color tokens and how root semantic colors map across the derived contextual shading tiers:

| Invariant (Source) | Base            | Mild            | Flip            | Text            | Face            | Bold            | Thin            | Edge            | Soft            |
| ------------------ | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- |
| **blue**           | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **indigo**         | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **purple**         | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **pink**           | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **red**            | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **orange**         | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **yellow**         | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **green**          | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **teal**           | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **cyan**           | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **black**          | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **grayDark**       | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **gray**           | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **grayLight**      | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **white**          | —               | —               | —               | —               | —               | —               | —               | —               | —               |
| **primary**        | `primaryBase`   | `primaryMild`   | `primaryFlip`   | `primaryText`   | `primaryFace`   | `primaryBold`   | `primaryThin`   | `primaryEdge`   | `primarySoft`   |
| **secondary**      | `secondaryBase` | `secondaryMild` | `secondaryFlip` | `secondaryText` | `secondaryFace` | `secondaryBold` | `secondaryThin` | `secondaryEdge` | `secondarySoft` |
| **success**        | `successBase`   | `successMild`   | `successFlip`   | `successText`   | `successFace`   | `successBold`   | `successThin`   | `successEdge`   | `successSoft`   |
| **info**           | `infoBase`      | `infoMild`      | `infoFlip`      | `infoText`      | `infoFace`      | `infoBold`      | `infoThin`      | `infoEdge`      | `infoSoft`      |
| **warning**        | `warningBase`   | `warningMild`   | `warningFlip`   | `warningText`   | `warningFace`   | `warningBold`   | `warningThin`   | `warningEdge`   | `warningSoft`   |
| **danger**         | `dangerBase`    | `dangerMild`    | `dangerFlip`    | `dangerText`    | `dangerFace`    | `dangerBold`    | `dangerThin`    | `dangerEdge`    | `dangerSoft`    |
| **light**          | `lightBase`     | `lightMild`     | `lightFlip`     | `lightText`     | `lightFace`     | `lightBold`     | `lightThin`     | `lightEdge`     | `lightSoft`     |
| **dark**           | `darkBase`      | `darkMild`      | `darkFlip`      | `darkText`      | `darkFace`      | `darkBold`      | `darkThin`      | `darkEdge`      | `darkSoft`      |

## 🎨 Usage and Customization

Using `colorConfigVars` or `colorConfigVarDefs`, you can perform CRUD operations keyed by your desired color tokens.

### Retrieving Colors

- **`colorConfigVars`** retrieves a live CSS variable reference (recommended for reactive component styling).
- **`colorConfigVarDefs`** retrieves the evaluated expression or concrete value (a snapshot at retrieval time, useful when your JavaScript logic needs the raw color value).

```ts
import { colorConfigVars, colorConfigVarDefs } from '@reusable-ui/color-config';

// Gets the live CSS variable reference (reactive & linked to config):
const colorRef = colorConfigVars.primaryBase; // Resolves to 'var(--col-primaryBase)'

// Gets the evaluated snapshot value/expression (for JS logic calculations):
const colorDef = colorConfigVarDefs.primaryBase; // Resolves to 'oklch(from var(--col-primary) ...)'
```

### Adding and Updating Colors

To create or update (upsert) a color token, assign a concrete value or expression to either `colorConfigVars` or `colorConfigVarDefs` (both yield identical assignment results):

```ts
import { colorConfigVars, colorConfigVarDefs } from '@reusable-ui/color-config';

// Assigning via colorConfigVars:
colorConfigVars.coolBlue  = '#5555ff';
colorConfigVars.deepBlue  = 'oklch(0.6 0.2 250)';
colorConfigVars.mixedBlue = `color-mix(in oklch, ${colorConfigVars.coolBlue} 50%, ${colorConfigVars.deepBlue} 50%)`;

// Alternatively assigning via colorConfigVarDefs:
colorConfigVarDefs.coolBlue  = '#5555ff';
colorConfigVarDefs.deepBlue  = 'oklch(0.6 0.2 250)';
colorConfigVarDefs.mixedBlue = `color-mix(in oklch, ${colorConfigVars.coolBlue} 50%, ${colorConfigVars.deepBlue} 50%)`;
```

### Deleting Colors

To delete a color token, use the `delete` operator or assign `null` / `undefined` to either proxy. Both approaches yield identical results:

```ts
import { colorConfigVars, colorConfigVarDefs } from '@reusable-ui/color-config';

// Deleting tokens:
delete colorConfigVars.coolBlue;
delete colorConfigVarDefs.deepBlue;

// Deleting tokens via null or undefined:
colorConfigVars.mixedBlue      = null;
colorConfigVarDefs.customColor = undefined;
```

### Retrieving Contextual Colors

To retrieve the appropriate colors for a component's target surface, you first need to determine the correct shade mapping based on its active variant:

| Component Surface    | Regular Variant | Mild Variant | Outlined Variant |
| -------------------- | --------------- | ------------ | ---------------- |
| **Background Color** | Base            | Mild         | N/A*             |
| **Foreground Color** | Flip            | Text         | Face             |
| **Decoration Color** | Flip            | Face         | Face             |
| **Border Color**     | Bold            | Thin         | Edge             |
| **Ring Color**       | Soft            | Soft         | Soft             |

*\*Note: Outlined variants have no background color and should fall back to `transparent`.*

Use `colorTokenMap[variantToken][surfaceToken]` to map the active variant and target surface to the correct shade token.
Once you have the corresponding shade, you can resolve the full color token via template literal combination: `${themeToken}${shadeToken}`.

```ts
import { colorTokenMap, colorConfigVars, colorConfigVarDefs } from '@reusable-ui/color-config';

// 1. Determine the active component's theme and variant:
const activeTheme   = 'primary';
const activeVariant : 'regular' | 'mild' | 'outlined' = 'regular';

// 2. Determine the correct shade tokens:
const backgroundShade = colorTokenMap[activeVariant]['backg' ];
const foregroundShade = colorTokenMap[activeVariant]['foreg' ];
const borderShade     = colorTokenMap[activeVariant]['border'];

// 3. Get the live CSS variable reference (reactive & linked to config):
const backgroundColorRef = (
    backgroundShade
    ? colorConfigVars[`${activeTheme}${backgroundShade}`]                          // Resolves to e.g. 'var(--col-primaryBase)'
    : 'transparent' // Fallback to transparent color for outlined variant.
);
const foregroundColorRef = colorConfigVars[`${activeTheme}${foregroundShade}`];    // Resolves to e.g. 'var(--col-primaryFlip)'
const borderColorRef     = colorConfigVars[`${activeTheme}${borderShade}`];        // Resolves to e.g. 'var(--col-primaryBold)'

// 4. Get the evaluated snapshot value/expression (for JS logic calculations):
const backgroundColorDef = (
    backgroundShade
    ? colorConfigVarDefs[`${activeTheme}${backgroundShade}`]                       // Resolves to e.g. 'oklch(from var(--col-primary) ...)'
    : 'transparent' // Fallback to transparent color for outlined variant.
);
const foregroundColorDef = colorConfigVarDefs[`${activeTheme}${foregroundShade}`]; // Resolves to 'oklch(from var(--col-primary) ...)'
const borderColorDef     = colorConfigVarDefs[`${activeTheme}${borderShade}`];     // Resolves to 'oklch(from var(--col-primary) ...)'
```

### Adding and Updating Contextual Colors

To create or update (upsert) a themed color along with its associated shades, use `defineTheme` by supplying the root color — the shades will be automatically generated and updated for you.

The auto-generated shades are created based on the configured **color parameter configuration**.  
These shades are reactive, mirroring parameter configurations whether modified prior to or following creation.
You can adjust the parameters later (if needed) without redefining the theme.
Changing light/dark mode parameter also updates the shades automatically.  
*(See [Adjusting Color Parameters](#adjusting-color-parameters))*

If needed, you can override any generated shade using the provided JavaScript CRUD APIs.

These shade tokens are auto-generated by appending your theme token (root color token) with standard suffixes:

- `*Base`
- `*Mild`
- `*Flip`
- `*Text`
- `*Face`
- `*Bold`
- `*Thin`
- `*Edge`
- `*Soft`

Under the hood, using `defineTheme` is equivalent to assigning individual CRUD operations for the root theme token and its associated shade tokens.

```ts
import { defineTheme, colorConfigVars adjustLightness, colorParamConfigVars } from '@reusable-ui/color-config';

// 1. Defining themes via defineTheme helper:
defineTheme('cool', '#5555ff');
defineTheme('royal', 'oklch(0.46 0.19 30)');
defineTheme('vibrant', `color-mix(in oklch, ${colorConfigVars.cool} 50%, ${colorConfigVars.royal} 50%)`);

// 2. Overriding specific generated shades using CRUD/assignment:
colorConfigVars.coolMild = `oklch(from ${colorConfigVars.cool} calc(l * 1.7) c h / a)`; // Lighten the root color.
colorConfigVars.coolSoft = `oklch(from ${colorConfigVars.cool} l c h / calc(a * 0.5))`; // Make root color semi-transparent.
colorConfigVars.royalMild = adjustLightness(colorConfigVars.royal, colorParamConfigVars.mild); // Lighten root color using utility & parameter.
```

### Deleting Contextual Colors

To delete a themed color alongside its associated shades, use `deleteTheme`.
Alternatively, you can use `defineTheme` and supply `null` or `undefined`.

Under the hood, using `deleteTheme` is equivalent to deleting individual CRUD operations for the root theme token and its associated shade tokens.

```ts
import { deleteTheme, defineTheme } from '@reusable-ui/color-config';

// 1. Deleting a themed color by its token:
deleteTheme('cool');

// 2. Deleting a themed color via null or undefined assignment:
defineTheme('royal', null);
defineTheme('vibrant', undefined);
```

### Adjusting Color Parameters

To adjust how generated color shades behave across various themes, assign a concrete value or expression to either `colorParamConfigVars` or `colorParamConfigVarDefs` (both yield identical assignment results).

Here are the exposed configuration tokens you can adjust:

- **`mode`** → Changes the active light/dark mode context.
- **`base`** → Adjusts the baseline lightness of regular background surfaces.
- **`mild`** → Adjusts the scaling or tone for mild background surfaces.
- **`flip`** → Adjusts the contrast scaling for high-contrast foreground and decoration elements against base backgrounds.
- **`flipThreshold`** → Sets the luminance threshold used to trigger contrast inversion for flip text/icons.
- **`text`** → Adjusts the contrast scaling for text-only foreground elements.
- **`face`** → Adjusts the visual weight lightness for graphic-like elements.
- **`bold`** → Adjusts the prominence or contrast for strong component borders.
- **`thin`** → Adjusts the delicacy or softness for subtle component borders.
- **`edge`** → Adjusts the contrast for outlined component borders.
- **`soft`** → Adjusts the opacity for soft effects, rings, and focus indicators.

> **⚠️ Warning:**
> Technically, you can perform all CRUD operations on these configuration mappings.
However, you should generally only modify the existing built-in parameter tokens.
Deleting built-in tokens can result in unpredictable runtime behavior.
Adding custom tokens is fully supported if you need adjustable shared parameters for your own custom formulas.

```ts
import { colorParamConfigVars, colorParamConfigVarDefs } from '@reusable-ui/color-config';

// Example: Customizing color generation parameters
colorParamConfigVars.base    = '0.55'; // Adjust base lightness.
colorParamConfigVarDefs.soft = '-0.4'; // Adjust global soft effect opacity.
```

### Color Adjustment Utilities

Instead of manually crafting complex CSS color formulas, you can use the library's built-in color adjustment utilities to modify colors.

The library exposes the following core adjustment functions:

- **`adjustLightness(originalColor, ratio)`** → Modifies the lightness of a given color based on the specified scaling ratio and the active light/dark mode.
  - **Behavior & Mode Scaling:**
    - **Light Mode (`mode = 1`)**:
      - Negative ratios (`ratio < 0`) scale the color toward **black**.
      - Positive ratios (`ratio > 0`) scale the color toward **white**.
    - **Dark Mode (`mode = -1`)**:
      - Negative ratios (`ratio < 0`) scale the color toward **white**.
      - Positive ratios (`ratio > 0`) scale the color toward **black**.
  - 💡 **Practical Usage & Ratios:**
    - **Multi-Level Shades (`±0.05` to `±0.6`)**: For most derived shades (such as base, mild, face, bold, thin, and edge), use small to moderate ratios. This builds a smooth, harmonious multi-level palette while preserving rich color saturation.
    - **High-Contrast Text (`-0.9`)**: For text colors (`*Text`), a much stronger ratio like `-0.9` is intentional and recommended. This guarantees the high contrast necessary for readability against mild backgrounds.
    - **Avoiding Washed-Out Tones**: Avoid pushing ratios all the way to absolute `+1` or `-1` unless you specifically want pure black or white, as extreme values completely strip the chroma (color).

- **`contrastFlip(originalColor, ratio)`** → Produces a high-contrast color for readability against regular backgrounds:
  - Unlike native CSS `contrast-color()` (which always forces pure black or white), `contrastFlip` retains a subtle trace of the given base color when its `ratio` is kept under `1` (practically set to `0.9`). 
  - If the `ratio` is set to `1`, it behaves equivalently to native CSS `contrast-color()`.

- **`adjustOpacity(originalColor, relativeRatio)`** → Adjusts the transparency of a given color using the specified relative ratio:
  - Negative ratios (`relativeRatio < 0`) decreases opacity (making the color more transparent).
  - Positive ratios (`relativeRatio > 0`) increases opacity (making the color more solid).
  - If `relativeRatio` is `0`, the original opacity remains unchanged.

```ts
import { adjustLightness, contrastFlip, adjustOpacity, colorConfigVars } from '@reusable-ui/color-config';

// Lighten (light mode) or darken (dark mode) the given color:
const customMildColor = adjustLightness(colorConfigVars.cool, 0.4);

// Generate a high-contrast flip color against a regular background that still retains a trace of the original hue:
const customFlipColor = contrastFlip(colorConfigVars.cool, 0.9);

// Decrease opacity for overlay or ring effects:
const customSoftColor = adjustOpacity(colorConfigVars.cool, -0.5);
```

## 📖 Part of the Reusable-UI Framework  
This package is a **color system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/color-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/color-config configures color system using CRUD operations.**  
Give it a ⭐ on GitHub if you find it useful!  
