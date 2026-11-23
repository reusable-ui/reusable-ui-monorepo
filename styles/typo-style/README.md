# @reusable-ui/typo-style ✍️

**@reusable-ui/typo-style** styles common typography elements (paragraphs, headings, blockquotes, inline formatting, and more) for consistent styling and behavior across browsers.

It pairs sensible, pre-configured defaults for clean content formatting with granular customization.
You can apply the full typography suite or selectively style only the elements your app needs.

With **typo-style**, you can:

- **Set up typography quickly** with ready-to-use defaults so you can focus on components and application logic.
- **Customize element styles** via configuration variables, and add/remove custom styles as needed.
- **Rely on contextual auto spacing** between typography elements without manual margin boilerplate.

## ✨ Features

✔ **Selective Mounting** — Mount all typography styles at once or include only individual styles as needed.
✔ **Granular Customization** — Customize predefined element styles and add/remove custom configuration variables.
✔ **Smart Auto Spacing** — Automatically adds spacing between typography elements.
✔ **Reset-Aware & Consistent** — Normalizes browser defaults for consistent appearance.
✔ **Powered by @cssfn/core** — Efficient CSS-in-JS rendering supporting AOT for fast page loads and JIT for dynamic styling.  

## Auto Spacing Behavior

Most typography elements include **auto spacing** so text and elements have comfortable breathing room out of the box.
You don't need to manually configure spacing between common typography elements unless you want custom overrides.

When a typography element sits next to a **non-typography or unrecognized element** (such as a `<div>`, `<article>`, or custom component), no automatic margin is applied — preventing unwanted spacing.
In those cases, you manually control spacing using `margin`, `gap`, or another layout technique.

### Block-Level Auto Spacing

For **block-level elements** — including paragraphs, lead paragraphs, headings, display headings, blockquotes, plain lists, horizontal separators, and their corresponding class equivalents — top and/or bottom margins are applied when they follow or precede another block-level typography element.

> See [Semantic Element Class Equivalents](#semantic-element-class-equivalents) for the full list of class equivalents.

### Inline-Level Auto Spacing

For **inline-level elements** — including `<mark>`, `<kbd>`, `<code>`, `<var>`, `<samp>`, inline formatting elements (`<em>`, `<strong>`, `<b>`, `<i>`, `<del>`, `<ins>`, etc.), and their corresponding class equivalents — left and/or right margins are applied when they follow or precede another inline-level typography element.

> See [Semantic Element Class Equivalents](#semantic-element-class-equivalents) for the full list of class equivalents.

### Auto Spacing Exceptions

A few elements intentionally opt out of or alter standard auto spacing:

#### Adjacent Headings and Subheadings

When a heading or display heading (including class equivalents) directly meets another heading or display heading (including class equivalents), no margin is added between them.
Keeping them tight visually groups a primary heading with a secondary subheading, which is dimmed using the `subOpacity` setting.

```html
<h1>Fancy display heading</h1>
<small class="h2">With faded secondary text</small>
```

> **Note:** Using `<small class="h2">` instead of a second `<h2>` keeps the document structure semantically accurate while applying `<h2>` visual styling.
> See [Predefined Heading Settings](#predefined-heading-settings) and [Predefined Display Heading Settings](#predefined-display-heading-settings) for configuration options including `subOpacity`.

#### Vertical Separators

Vertical separators (`.vr`) do **not** have auto spacing on either the block or inline axis.
You manually control spacing between side-by-side sections using `margin`, `gap`, or another layout technique.

## Classname Equivalents and Variants

When semantic HTML elements cannot be used directly — or when you want to apply typography styles to a non-semantic element like a `<span>` or `<div>` — `@reusable-ui/typo-style` provides matching CSS classes and class-only variants that render visually identically.

### Semantic Element Class Equivalents

Use these class names to style an element as if it were the corresponding semantic typography element:

| Semantic Element(s)         | Class Name(s)            | Description                          |
| --------------------------- | ------------------------ | ------------------------------------ |
| `<p>`                       | `.p`                     | Paragraph styling                    |
| `<h1>` ... `<h6>`           | `.h1` ... `.h6`          | Heading levels 1 through 6           |
| `<blockquote>`              | `.blockquote`            | Blockquote styling                   |
| `<li>`                      | `.li`                    | List item styling for plain lists    |
| `<mark>`                    | `.mark`                  | Highlighted text styling             |
| `<kbd>`                     | `.kbd`                   | Keyboard input styling               |
| `<code>`, `<var>`, `<samp>` | `.code`, `.var`, `.samp` | Code styling                         |
| `<hr>`                      | `.hr`                    | Horizontal separator styling         |
| `<del>`, `<s>`              | `.delete`                | Deleted / strikethrough text styling |
| `<ins>`, `<u>`              | `.insert`                | Inserted / underlined text styling   |
| `<small>`                   | `.small`                 | Fine-print / small text styling      |
| `<strong>`, `<b>`           | `.strong`                | Strong / bold text styling           |
| `<em>`, `<i>`               | `.emphasis`              | Emphasized / italic text styling     |
| `<sub>`                     | `.subscript`             | Subscript text styling               |
| `<sup>`                     | `.superscript`           | Superscript text styling             |

```html
<!-- Visually equivalent to semantic elements without using the semantic tags -->
<div class="p">Styled like a paragraph</div>
<span class="h2">Styled like an &lt;h2&gt;</span>
<span class="code">const x = 1;</span>
```

### Class-Only Variants

Some typography styles have **no default semantic element mapping** and are only activated when you explicitly apply their class name:

| Class Name(s)                 | Example Usage             | Description                                           |
| ----------------------------- | ------------------------- | ----------------------------------------------------- |
| `.lead`                       | `<p class="lead">`        | Lead paragraph styling                                |
| `.display-1` ... `.display-6` | `<h1 class="display-1">`  | Display heading scale (levels 1 through 6)            |
| `.plain-list`                 | `<ul class="plain-list">` | Plain list styling (separate from `<List>` component) |
| `.vr`                         | `<div class="vr">`        | Vertical separator styling                            |

### Precedence When Classes and Semantic Tags Conflict

Explicit class names **always take precedence** over semantic tag styling when both are present on the same element:

- `<p class="h1">` is styled as an `<h1>` rather than a `<p>`.
- `<h1 class="p">` is styled as a `<p>` rather than an `<h1>`.

```html
<!-- Explicit class wins over the semantic tag -->
<p class="h1">Looks like an H1</p>
<h1 class="p">Looks like a paragraph</h1>
```

## 📐 Usage and Customization

### Mounting and Unmounting Styles

Singular mounting and unmounting:

```ts
// Mounting:
const mountedTypo = mountTypographyStyle();

// Unmounting:
mountedTypo.unmount();
```

Batch mounting and unmounting:

```ts
// Mounting multiple styles:
const mountedTypos = mountMany(
    mountTypographyStyle,       // Styles `<html>` and `<body>` elements to establish root typography baselines and ensure cross-browser layout consistency.
    mountParagraphStyle,        // Styles standard paragraph elements for optimal readability and line spacing.
    mountLeadStyle,             // Styles lead paragraphs for introductory or summary text with increased visual prominence (extends paragraph styles).
    mountHeadingStyle,          // Styles standard heading elements (`<h1>` to `<h6>`) with structured font sizing to establish a clear visual hierarchy.
    mountDisplayStyle,          // Styles display headings for hero banners and major section headers using scaled typographic rules (extends heading styles).
    
    mountBlockquoteStyle,       // Styles blockquote elements for distinct quotations featuring custom indentation, borders, and padding.
    mountPlainListStyle,        // Styles plain list elements (`<ul>` and `<ol>`) for structured content organization with clean spacing, bullets, and indentation.
    
    mountMarkStyle,             // Styles `<mark>` elements for highlighted text emphasis using contrasting background and text colors.
    mountKbdStyle,              // Styles `<kbd>` elements to represent user keyboard input with button styling.
    mountCodeStyle,             // Styles `<code>` elements for inline code snippets using monospaced typography for consistent character spacing.
    
    mountHorzSeparatorStyle,    // Styles horizontal separator elements (`<hr>` and `<div class="hr">`) to create clean visual divisions between content blocks.
    mountVertSeparatorStyle,    // Styles vertical separator elements (`<div class="vr">`) to create clean visual divisions between side-by-side layout sections.
    mountInlineFormattingStyle, // Styles inline text formatting elements (`<em>`, `<strong>`, `<b>`, `<i>`, `<del>`, `<ins>`, etc.) to ensure cross-browser consistency for weights, slants, and decorations.
);

// Unmounting:
mountedTypos.unmount();
```

### Customization

Most typography styles in `@reusable-ui/typo-style` expose configurable CSS variables so you can tailor spacing and text properties to your design system.
Only pure typographic style primitives and inline formatting elements do not expose customization variables.

#### Customize Paragraphs

Using `paragraphVars`, you can read, update, or compute paragraph styles directly in your code.

```ts
import { paragraphVars } from '@reusable-ui/typo-style';

paragraphVars.marginBlockStart = '1.5em'; // Assign `--p-marginBlockStart: 1.5em;`
paragraphVars.marginBlockEnd   = `calc(${paragraphVars.marginBlockStart} + 0.5em)`; // Assign `--p-marginBlockEnd: calc(var(--p-marginBlockStart) + 0.5em);`
paragraphVars.fontSize         = '1.5rem'; // Assign `--p-fontSize: 1.5rem;`
```

##### Predefined Paragraph Settings

Here are the default paragraph settings you can customize:

| Token               | Value     | Description                                                                                               |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `marginInlineStart` | `0em`     | Inline-start (left in LTR) margin for paragraphs.                                                         |
| `marginInlineEnd`   | `0em`     | Inline-end (right in LTR) margin for paragraphs.                                                          |
| `marginBlockStart`  | `1em`     | Conditional block-start (top) margin when the paragraph follows another block-level typography element.   |
| `marginBlockEnd`    | `1em`     | Conditional block-end (bottom) margin when the paragraph precedes another block-level typography element. |
| `fontSize`          | `initial` | The font size for paragraphs.                                                                             |
| `fontFamily`        | `initial` | The font family for paragraphs.                                                                           |
| `fontWeight`        | `initial` | The font weight for paragraphs.                                                                           |
| `fontStyle`         | `initial` | The font style for paragraphs.                                                                            |
| `textDecoration`    | `initial` | The text decoration for paragraphs.                                                                       |
| `lineHeight`        | `initial` | The line height for paragraphs.                                                                           |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize Lead Paragraphs

Using `leadVars`, you can read, update, or compute lead paragraph styles directly in your code.

```ts
import { leadVars } from '@reusable-ui/typo-style';

leadVars.marginBlockStart = '1.5em'; // Assign `--lead-marginBlockStart: 1.5em;`
leadVars.marginBlockEnd   = `calc(${leadVars.marginBlockStart} + 0.5em)`; // Assign `--lead-marginBlockEnd: calc(var(--lead-marginBlockStart) + 0.5em);`
leadVars.fontSize         = '1.5rem'; // Assign `--lead-fontSize: 1.5rem;`
```

##### Predefined Lead Paragraph Settings

Here are the default lead paragraph settings you can customize:

| Token               | Value                             | Description                                                                                                    |
| ------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `marginInlineStart` | `paragraphVars.marginInlineStart` | Inline-start (left in LTR) margin for lead paragraphs.                                                         |
| `marginInlineEnd`   | `paragraphVars.marginInlineEnd`   | Inline-end (right in LTR) margin for lead paragraphs.                                                          |
| `marginBlockStart`  | `paragraphVars.marginBlockStart`  | Conditional block-start (top) margin when the lead paragraph follows another block-level typography element.   |
| `marginBlockEnd`    | `paragraphVars.marginBlockEnd`    | Conditional block-end (bottom) margin when the lead paragraph precedes another block-level typography element. |
| `fontSize`          | `typoConfigVars.fontSizeLg`       | The font size for lead paragraphs.                                                                             |
| `fontFamily`        | `paragraphVars.fontFamily`        | The font family for lead paragraphs.                                                                           |
| `fontWeight`        | `typoConfigVars.fontWeightLight`  | The font weight for lead paragraphs.                                                                           |
| `fontStyle`         | `paragraphVars.fontStyle`         | The font style for lead paragraphs.                                                                            |
| `textDecoration`    | `paragraphVars.textDecoration`    | The text decoration for lead paragraphs.                                                                       |
| `lineHeight`        | `paragraphVars.lineHeight`        | The line height for lead paragraphs.                                                                           |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize Headings

Using `headingVars`, you can read, update, or compute heading styles directly in your code.

```ts
import { headingVars } from '@reusable-ui/typo-style';

headingVars.marginBlockStart = '1.5em'; // Assign `--h-marginBlockStart: 1.5em;`
headingVars.marginBlockEnd   = `calc(${headingVars.marginBlockStart} + 0.5em)`; // Assign `--h-marginBlockEnd: calc(var(--h-marginBlockStart) + 0.5em);`
headingVars.fontSize         = '1.5rem'; // Assign `--h-fontSize: 1.5rem;`
```

##### Predefined Heading Settings

Here are the default heading settings you can customize:

| Token               | Value                               | Description                                                                                             |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `subOpacity`        | `0.65`                              | The opacity level for subheadings (when the heading follows another heading or display heading).        |
| `marginInlineStart` | `0em`                               | Inline-start (left in LTR) margin for headings.                                                         |
| `marginInlineEnd`   | `0em`                               | Inline-end (right in LTR) margin for headings.                                                          |
| `marginBlockStart`  | `1.5em`                             | Conditional block-start (top) margin when the heading follows another block-level typography element.   |
| `marginBlockEnd`    | `0.75em`                            | Conditional block-end (bottom) margin when the heading precedes another block-level typography element. |
| `fontSize`          | `initial`                           | The font size for headings (unknown level).                                                             |
| `fontSize1`         | `2.25rem`                           | The font size for `<h1>` headings.                                                                      |
| `fontSize2`         | `2.00rem`                           | The font size for `<h2>` headings.                                                                      |
| `fontSize3`         | `1.75rem`                           | The font size for `<h3>` headings.                                                                      |
| `fontSize4`         | `1.50rem`                           | The font size for `<h4>` headings.                                                                      |
| `fontSize5`         | `1.25rem`                           | The font size for `<h5>` headings.                                                                      |
| `fontSize6`         | `1.00rem`                           | The font size for `<h6>` headings.                                                                      |
| `fontFamily`        | `initial`                           | The font family for headings.                                                                           |
| `fontWeight`        | `typoConfigVars.fontWeightSemibold` | The font weight for headings.                                                                           |
| `fontStyle`         | `initial`                           | The font style for headings.                                                                            |
| `textDecoration`    | `initial`                           | The text decoration for headings.                                                                       |
| `lineHeight`        | `typoConfigVars.lineHeightSm`       | The line height for headings.                                                                           |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize Display Headings

Using `displayVars`, you can read, update, or compute display heading styles directly in your code.

```ts
import { displayVars } from '@reusable-ui/typo-style';

displayVars.marginBlockStart = '1.5em'; // Assign `--disp-marginBlockStart: 1.5em;`
displayVars.marginBlockEnd   = `calc(${displayVars.marginBlockStart} + 0.5em)`; // Assign `--disp-marginBlockEnd: calc(var(--disp-marginBlockStart) + 0.5em);`
displayVars.fontSize         = '1.5rem'; // Assign `--disp-fontSize: 1.5rem;`
```

##### Predefined Display Heading Settings

Here are the default display heading settings you can customize:

| Token               | Value                            | Description                                                                                                     |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `subOpacity`        | `headingVars.subOpacity`         | The opacity level for subheadings (when the display heading follows another heading or display heading).        |
| `marginInlineStart` | `headingVars.marginInlineStart`  | Inline-start (left in LTR) margin for display headings.                                                         |
| `marginInlineEnd`   | `headingVars.marginInlineEnd`    | Inline-end (right in LTR) margin for display headings.                                                          |
| `marginBlockStart`  | `headingVars.marginBlockStart`   | Conditional block-start (top) margin when the display heading follows another block-level typography element.   |
| `marginBlockEnd`    | `headingVars.marginBlockEnd`     | Conditional block-end (bottom) margin when the display heading precedes another block-level typography element. |
| `fontSize`          | `initial`                        | The font size for display headings (unknown level).                                                             |
| `fontSize1`         | `5.00rem`                        | The font size for level 1 display headings.                                                                     |
| `fontSize2`         | `4.50rem`                        | The font size for level 2 display headings.                                                                     |
| `fontSize3`         | `4.00rem`                        | The font size for level 3 display headings.                                                                     |
| `fontSize4`         | `3.50rem`                        | The font size for level 4 display headings.                                                                     |
| `fontSize5`         | `3.00rem`                        | The font size for level 5 display headings.                                                                     |
| `fontSize6`         | `2.50rem`                        | The font size for level 6 display headings.                                                                     |
| `fontFamily`        | `headingVars.fontFamily`         | The font family for display headings.                                                                           |
| `fontWeight`        | `typoConfigVars.fontWeightLight` | The font weight for display headings.                                                                           |
| `fontStyle`         | `headingVars.fontStyle`          | The font style for display headings.                                                                            |
| `textDecoration`    | `headingVars.textDecoration`     | The text decoration for display headings.                                                                       |
| `lineHeight`        | `headingVars.lineHeight`         | The line height for display headings.                                                                           |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize Blockquotes

Using `blockquoteVars`, you can read, update, or compute blockquote styles directly in your code.

```ts
import { blockquoteVars } from '@reusable-ui/typo-style';

blockquoteVars.marginBlockStart = '1.5em'; // Assign `--bq-marginBlockStart: 1.5em;`
blockquoteVars.marginBlockEnd   = `calc(${blockquoteVars.marginBlockStart} + 0.5em)`; // Assign `--bq-marginBlockEnd: calc(var(--bq-marginBlockStart) + 0.5em);`
blockquoteVars.fontSize         = '1.5rem'; // Assign `--bq-fontSize: 1.5rem;`
```

##### Predefined Blockquote Settings

Here are the default blockquote settings you can customize:

| Token                    | Value                       | Description                                                                                                |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `borderInlineStartStyle` | `solid`                     | Inline-start (left in LTR) decorative border style for blockquotes.                                        |
| `borderInlineStartWidth` | `0.25em`                    | Inline-start (left in LTR) decorative border width for blockquotes.                                        |
| `marginInlineStart`      | `0em`                       | Inline-start (left in LTR) margin for blockquotes.                                                         |
| `marginInlineEnd`        | `0em`                       | Inline-end (right in LTR) margin for blockquotes.                                                          |
| `marginBlockStart`       | `1em`                       | Conditional block-start (top) margin when the blockquote follows another block-level typography element.   |
| `marginBlockEnd`         | `1em`                       | Conditional block-end (bottom) margin when the blockquote precedes another block-level typography element. |
| `paddingInlineStart`     | `3em`                       | Inline-start (left in LTR) padding for blockquotes.                                                        |
| `paddingInlineEnd`       | `1em`                       | Inline-end (right in LTR) padding for blockquotes.                                                         |
| `paddingBlockStart`      | `1em`                       | Block-start (top) padding for blockquotes.                                                                 |
| `paddingBlockEnd`        | `1em`                       | Block-end (bottom) padding for blockquotes.                                                                |
| `fontSize`               | `typoConfigVars.fontSizeLg` | The font size for blockquotes.                                                                             |
| `fontFamily`             | `initial`                   | The font family for blockquotes.                                                                           |
| `fontWeight`             | `initial`                   | The font weight for blockquotes.                                                                           |
| `fontStyle`              | `initial`                   | The font style for blockquotes.                                                                            |
| `textDecoration`         | `initial`                   | The text decoration for blockquotes.                                                                       |
| `lineHeight`             | `initial`                   | The line height for blockquotes.                                                                           |
| `quoteInsetInlineStart`  | `0.2em`                     | Inline-start (left in LTR) position for the quote decoration.                                              |
| `quoteInsetBlockStart`   | `-0.1em`                    | Block-start (top) position for the quote decoration.                                                       |
| `quoteContent`           | `"\\201C"`                  | The quote character (`“`) for the quote decoration.                                                        |
| `quoteFontSize`          | `3em`                       | The font size for the quote decoration.                                                                    |
| `quoteFontFamily`        | `Arial`                     | The font family for the quote decoration.                                                                  |
| `quoteFontWeight`        | `initial`                   | The font weight for the quote decoration.                                                                  |
| `quoteFontStyle`         | `initial`                   | The font style for the quote decoration.                                                                   |
| `quoteTextDecoration`    | `initial`                   | The text decoration for the quote decoration.                                                              |
| `quoteLineHeight`        | `initial`                   | The line height for the quote decoration.                                                                  |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize Plain Lists

Using `plainListVars`, you can read, update, or compute plain list styles directly in your code.

```ts
import { plainListVars } from '@reusable-ui/typo-style';

plainListVars.marginBlockStart = '1.5em'; // Assign `--pl-marginBlockStart: 1.5em;`
plainListVars.marginBlockEnd   = `calc(${plainListVars.marginBlockStart} + 0.5em)`; // Assign `--pl-marginBlockEnd: calc(var(--pl-marginBlockStart) + 0.5em);`
plainListVars.fontSize         = '1.5rem'; // Assign `--pl-fontSize: 1.5rem;`
```

##### Predefined Plain List Settings

Here are the default plain list settings you can customize:

| Token                    | Value                             | Description                                                                        |
| ------------------------ | --------- | ---------------------------------------------------------------------------------------------------------- |
| `listStylePosition`      | `outside` | Marker placement (`outside` or `inside`) for plain lists.                                                  |
| `listStyleTypeUnordered` | `disc`    | Marker style for unordered (`<ul>`) plain lists.                                                           |
| `listStyleTypeOrdered`   | `decimal` | Marker style for ordered (`<ol>`) plain lists.                                                             |
| `marginInlineStart`      | `0em`     | Inline-start (left in LTR) margin for plain lists.                                                         |
| `marginInlineEnd`        | `0em`     | Inline-end (right in LTR) margin for plain lists.                                                          |
| `marginBlockStart`       | `1em`     | Conditional block-start (top) margin when the plain list follows another block-level typography element.   |
| `marginBlockEnd`         | `1em`     | Conditional block-end (bottom) margin when the plain list precedes another block-level typography element. |
| `paddingInlineStart`     | `1.5em`   | Inline-start (left in LTR) indentation padding for plain lists.                                            |
| `fontSize`               | `initial` | The font size for plain lists.                                                                             |
| `fontFamily`             | `initial` | The font family for plain lists.                                                                           |
| `fontWeight`             | `initial` | The font weight for plain lists.                                                                           |
| `fontStyle`              | `initial` | The font style for plain lists.                                                                            |
| `textDecoration`         | `initial` | The text decoration for plain lists.                                                                       |
| `lineHeight`             | `initial` | The line height for plain lists.                                                                           |
| `itemMarginBlockStart`   | `0.25em`  | Conditional block-start (top) margin when a list item follows another item.                                |
| `itemMarginBlockEnd`     | `0.25em`  | Conditional block-end (bottom) margin when a list item precedes another item.                              |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize `<mark>` Elements

Using `markVars`, you can read, update, or compute `<mark>` styles directly in your code.

```ts
import { markVars } from '@reusable-ui/typo-style';

markVars.marginBlockStart = '1.5em'; // Assign `--mark-marginBlockStart: 1.5em;`
markVars.marginBlockEnd   = `calc(${markVars.marginBlockStart} + 0.5em)`; // Assign `--mark-marginBlockEnd: calc(var(--mark-marginBlockStart) + 0.5em);`
markVars.fontSize         = '1.5rem'; // Assign `--mark-fontSize: 1.5rem;`
```

##### Predefined `<mark>` Settings

Here are the default `<mark>` settings you can customize:

| Token                    | Value                         | Description                                                                                                      |
| ------------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`        | `colorConfigVars.warningMild` | Background color for `<mark>` elements.                                                                          |
| `color`                  | `colorConfigVars.warningText` | Text color for `<mark>` elements.                                                                                |
| `borderStyle`            | `borderConfigVars.style`      | Border style for `<mark>` elements.                                                                              |
| `borderWidth`            | `borderConfigVars.width`      | Border width for `<mark>` elements.                                                                              |
| `borderColor`            | `colorConfigVars.warningThin` | Border color for `<mark>` elements.                                                                              |
| `borderRadius`           | `radiusConfigVars.radiusSm`   | Border radius for `<mark>` elements.                                                                             |
| `marginInlineStart`      | `0.25em`                      | Conditional inline-start (left in LTR) margin when the `<mark>` follows another inline-level typography element. |
| `marginInlineEnd`        | `0.25em`                      | Conditional inline-end (right in LTR) margin when the `<mark>` precedes another inline-level typography element. |
| `marginBlockStart`       | `0em`                         | Block-start (top) margin for `<mark>` elements.                                                                  |
| `marginBlockEnd`         | `0em`                         | Block-end (bottom) margin for `<mark>` elements.                                                                 |
| `paddingInlineStart`     | `0.125em`                     | Inline-start (left in LTR) padding for `<mark>` elements.                                                        |
| `paddingInlineEnd`       | `0.125em`                     | Inline-end (right in LTR) padding for `<mark>` elements.                                                         |
| `paddingBlockStart`      | `0.125em`                     | Block-start (top) padding for `<mark>` elements.                                                                 |
| `paddingBlockEnd`        | `0.125em`                     | Block-end (bottom) padding for `<mark>` elements.                                                                |
| `fontSize`               | `initial`                     | The font size for `<mark>` elements.                                                                             |
| `fontFamily`             | `initial`                     | The font family for `<mark>` elements.                                                                           |
| `fontWeight`             | `initial`                     | The font weight for `<mark>` elements.                                                                           |
| `fontStyle`              | `initial`                     | The font style for `<mark>` elements.                                                                            |
| `textDecoration`         | `initial`                     | The text decoration for `<mark>` elements.                                                                       |
| `lineHeight`             | `initial`                     | The line height for `<mark>` elements.                                                                           |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize `<kbd>` Elements

Using `kbdVars`, you can read, update, or compute `<kbd>` styles directly in your code.

```ts
import { kbdVars } from '@reusable-ui/typo-style';

kbdVars.marginBlockStart = '1.5em'; // Assign `--kbd-marginBlockStart: 1.5em;`
kbdVars.marginBlockEnd   = `calc(${kbdVars.marginBlockStart} + 0.5em)`; // Assign `--kbd-marginBlockEnd: calc(var(--kbd-marginBlockStart) + 0.5em);`
kbdVars.fontSize         = '1.5rem'; // Assign `--kbd-fontSize: 1.5rem;`
```

##### Predefined `<kbd>` Settings

Here are the default `<kbd>` settings you can customize:

| Token                    | Value                         | Description                                                                                                     |
| ------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`        | `colorConfigVars.primaryBase` | Background color for `<kbd>` elements.                                                                          |
| `color`                  | `colorConfigVars.primaryFlip` | Text color for `<kbd>` elements.                                                                                |
| `borderStyle`            | `markVars.borderStyle`        | Border style for `<kbd>` elements.                                                                              |
| `borderWidth`            | `markVars.borderWidth`        | Border width for `<kbd>` elements.                                                                              |
| `borderColor`            | `colorConfigVars.primaryBold` | Border color for `<kbd>` elements.                                                                              |
| `borderRadius`           | `markVars.borderRadius`       | Border radius for `<kbd>` elements.                                                                             |
| `marginInlineStart`      | `markVars.marginInlineStart`  | Conditional inline-start (left in LTR) margin when the `<kbd>` follows another inline-level typography element. |
| `marginInlineEnd`        | `markVars.marginInlineEnd`    | Conditional inline-end (right in LTR) margin when the `<kbd>` precedes another inline-level typography element. |
| `marginBlockStart`       | `markVars.marginBlockStart`   | Block-start (top) margin for `<kbd>` elements.                                                                  |
| `marginBlockEnd`         | `markVars.marginBlockEnd`     | Block-end (bottom) margin for `<kbd>` elements.                                                                 |
| `paddingInlineStart`     | `markVars.paddingInlineStart` | Inline-start (left in LTR) padding for `<kbd>` elements.                                                        |
| `paddingInlineEnd`       | `markVars.paddingInlineEnd`   | Inline-end (right in LTR) padding for `<kbd>` elements.                                                         |
| `paddingBlockStart`      | `markVars.paddingBlockStart`  | Block-start (top) padding for `<kbd>` elements.                                                                 |
| `paddingBlockEnd`        | `markVars.paddingBlockEnd`    | Block-end (bottom) padding for `<kbd>` elements.                                                                |
| `fontSize`               | `markVars.fontSize`           | The font size for `<kbd>` elements.                                                                             |
| `fontFamily`             | `markVars.fontFamily`         | The font family for `<kbd>` elements.                                                                           |
| `fontWeight`             | `markVars.fontWeight`         | The font weight for `<kbd>` elements.                                                                           |
| `fontStyle`              | `markVars.fontStyle`          | The font style for `<kbd>` elements.                                                                            |
| `textDecoration`         | `markVars.textDecoration`     | The text decoration for `<kbd>` elements.                                                                       |
| `lineHeight`             | `markVars.lineHeight`         | The line height for `<kbd>` elements.                                                                           |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize `<code>` Elements

Using `codeVars`, you can read, update, or compute `<code>` styles directly in your code.

```ts
import { codeVars } from '@reusable-ui/typo-style';

codeVars.marginBlockStart = '1.5em'; // Assign `--code-marginBlockStart: 1.5em;`
codeVars.marginBlockEnd   = `calc(${codeVars.marginBlockStart} + 0.5em)`; // Assign `--code-marginBlockEnd: calc(var(--code-marginBlockStart) + 0.5em);`
codeVars.fontSize         = '1.5rem'; // Assign `--code-fontSize: 1.5rem;`
```

##### Predefined `<code>` Settings

Here are the default `<code>` settings you can customize:

| Token                    | Value                                | Description                                                                                                      |
| ------------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`        | `colorConfigVars.secondaryMild`      | Background color for `<code>` elements.                                                                          |
| `color`                  | `colorConfigVars.secondaryText`      | Text color for `<code>` elements.                                                                                |
| `borderStyle`            | `markVars.borderStyle`               | Border style for `<code>` elements.                                                                              |
| `borderWidth`            | `markVars.borderWidth`               | Border width for `<code>` elements.                                                                              |
| `borderColor`            | `colorConfigVars.secondaryThin`      | Border color for `<code>` elements.                                                                              |
| `borderRadius`           | `markVars.borderRadius`              | Border radius for `<code>` elements.                                                                             |
| `marginInlineStart`      | `markVars.marginInlineStart`         | Conditional inline-start (left in LTR) margin when the `<code>` follows another inline-level typography element. |
| `marginInlineEnd`        | `markVars.marginInlineEnd`           | Conditional inline-end (right in LTR) margin when the `<code>` precedes another inline-level typography element. |
| `marginBlockStart`       | `markVars.marginBlockStart`          | Block-start (top) margin for `<code>` elements.                                                                  |
| `marginBlockEnd`         | `markVars.marginBlockEnd`            | Block-end (bottom) margin for `<code>` elements.                                                                 |
| `paddingInlineStart`     | `markVars.paddingInlineStart`        | Inline-start (left in LTR) padding for `<code>` elements.                                                        |
| `paddingInlineEnd`       | `markVars.paddingInlineEnd`          | Inline-end (right in LTR) padding for `<code>` elements.                                                         |
| `paddingBlockStart`      | `markVars.paddingBlockStart`         | Block-start (top) padding for `<code>` elements.                                                                 |
| `paddingBlockEnd`        | `markVars.paddingBlockEnd`           | Block-end (bottom) padding for `<code>` elements.                                                                |
| `fontSize`               | `markVars.fontSize`                  | The font size for `<code>` elements.                                                                             |
| `fontFamily`             | `typoConfigVars.fontFamilyMonospace` | The font family for `<code>` elements.                                                                           |
| `fontWeight`             | `markVars.fontWeight`                | The font weight for `<code>` elements.                                                                           |
| `fontStyle`              | `markVars.fontStyle`                 | The font style for `<code>` elements.                                                                            |
| `textDecoration`         | `markVars.textDecoration`            | The text decoration for `<code>` elements.                                                                       |
| `lineHeight`             | `markVars.lineHeight`                | The line height for `<code>` elements.                                                                           |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `fontSize`, `fontFamily`, and `fontWeight`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize Horizontal Separators

Using `horzSeparatorVars`, you can read, update, or compute horizontal separator styles directly in your code.

```ts
import { horzSeparatorVars } from '@reusable-ui/typo-style';

horzSeparatorVars.marginBlockStart = '1.5em'; // Assign `--hr-marginBlockStart: 1.5em;`
horzSeparatorVars.marginBlockEnd   = `calc(${horzSeparatorVars.marginBlockStart} + 0.5em)`; // Assign `--hr-marginBlockEnd: calc(var(--hr-marginBlockStart) + 0.5em);`
horzSeparatorVars.borderWidth      = '2px'; // Assign `--hr-borderWidth: 2px;`
```

##### Predefined Horizontal Separator Settings

Here are the default horizontal separator settings you can customize:

| Token               | Value                    | Description                                                                                                          |
| ------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `opacity`           | `0.25`                   | The opacity level for horizontal separators.                                                                         |
| `borderStyle`       | `borderConfigVars.style` | Border style for horizontal separators.                                                                              |
| `borderWidth`       | `borderConfigVars.width` | Border width for horizontal separators.                                                                              |
| `borderColor`       | `currentcolor`           | Border color for horizontal separators.                                                                              |
| `marginInlineStart` | `0em`                    | Inline-start (left in LTR) margin for horizontal separators.                                                         |
| `marginInlineEnd`   | `0em`                    | Inline-end (right in LTR) margin for horizontal separators.                                                          |
| `marginBlockStart`  | `1em`                    | Conditional block-start (top) margin when the horizontal separator follows another block-level typography element.   |
| `marginBlockEnd`    | `1em`                    | Conditional block-end (bottom) margin when the horizontal separator precedes another block-level typography element. |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `borderColor`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Customize Vertical Separators

Using `vertSeparatorVars`, you can read, update, or compute vertical separator styles directly in your code.

```ts
import { vertSeparatorVars } from '@reusable-ui/typo-style';

vertSeparatorVars.marginBlockStart = '1.5em'; // Assign `--vr-marginBlockStart: 1.5em;`
vertSeparatorVars.marginBlockEnd   = `calc(${vertSeparatorVars.marginBlockStart} + 0.5em)`; // Assign `--vr-marginBlockEnd: calc(var(--vr-marginBlockStart) + 0.5em);`
vertSeparatorVars.borderWidth      = '2px'; // Assign `--vr-borderWidth: 2px;`
```

##### Predefined Vertical Separator Settings

Here are the default vertical separator settings you can customize:

| Token               | Value                                 | Description                                                |
| ------------------- | ------------------------------------- | ---------------------------------------------------------- |
| `opacity`           | `horzSeparatorVars.opacity`           | The opacity level for vertical separators.                 |
| `borderStyle`       | `horzSeparatorVars.borderStyle`       | Border style for vertical separators.                      |
| `borderWidth`       | `horzSeparatorVars.borderWidth`       | Border width for vertical separators.                      |
| `borderColor`       | `horzSeparatorVars.borderColor`       | Border color for vertical separators.                      |
| `marginInlineStart` | `0em`                                 | Inline-start (left in LTR) margin for vertical separators. |
| `marginInlineEnd`   | `0em`                                 | Inline-end (right in LTR) margin for vertical separators.  |
| `marginBlockStart`  | `horzSeparatorVars.marginInlineStart` | Block-start (top) margin for vertical separators.          |
| `marginBlockEnd`    | `horzSeparatorVars.marginInlineEnd`   | Block-end (bottom) margin for vertical separators.         |

> **Note:** Setting a style to `initial` invalidates configuration variables,  
> allowing inheritable properties (like `borderColor`) to inherit from an ancestor element,  
> while non-inheritable properties (like margins) fall back to their default initial values (such as `0`).

#### Adding Custom Tokens

All style variable objects (`paragraphVars`, `leadVars`, `headingVars`, `displayVars`, `horzSeparatorVars`, etc.) support adding custom tokens dynamically.
How a new token is applied depends on whether its name matches a known CSS property.

##### Known CSS Property Names

When you assign a token whose name matches a known CSS property (such as `boxShadow` or `cursor`),
`@reusable-ui/typo-style` both **generates the CSS variable** and **injects the corresponding CSS property declaration** into the element's styles without requiring you to write a custom stylesheet manually:

```ts
import { paragraphVars } from '@reusable-ui/typo-style';

paragraphVars.boxShadow = '10px 5px 5px red';
paragraphVars.cursor    = 'crosshair';
```

Generated CSS variables:

```css
:root {
  --p-boxShadow: 10px 5px 5px red;
  --p-cursor: crosshair;
}
```

Injected element declarations:

```css
p, .p {
  box-shadow: var(--p-boxShadow);
  cursor: var(--p-cursor);
}
```

##### Non-CSS-Property Token Names

When you assign a token whose name does **not** match a known CSS property (such as `boxShadowLight`, `boxShadowDark`, `cursorDisabled`, or `booFoo`),
only the **CSS variable** is generated — no new CSS property declarations are injected onto the element selector:

```ts
import { paragraphVars } from '@reusable-ui/typo-style';

paragraphVars.boxShadowLight = '10px 5px 5px lightyellow';
paragraphVars.cursorDisabled = 'not-allowed';
paragraphVars.booFoo         = 123;
```

Generated CSS variables:

```css
:root {
  --p-boxShadowLight: 10px 5px 5px lightyellow;
  --p-cursorDisabled: not-allowed;
  --p-booFoo: 123;
}
```

No additional properties are added to `p, .p { ... }`.
This is useful for defining intermediate or custom values that you reference in expressions or custom rules.

#### Deleting vs. Resetting Tokens

You can remove custom or predefined tokens using the `delete` operator or by assigning `null` or `undefined`:

```ts
import { paragraphVars } from '@reusable-ui/typo-style';

delete paragraphVars.marginBlockStart;
delete paragraphVars.fontFamily;
delete paragraphVars.boxShadow;
paragraphVars.cursor         = null;
paragraphVars.cursorDisabled = undefined;
```

Deleting a token (or setting it to `null` or `undefined`) **removes** the corresponding CSS custom property (such as `--p-marginBlockStart`, `--p-fontFamily`, `--p-boxShadow`, `--p-cursor`, and `--p-cursorDisabled`),
making any style rule referencing that variable invalid.

##### Deleting vs. Assigning `'initial'`

- **Deleting (`delete` / `null` / `undefined`):** Removes the CSS variable declaration completely so the variable no longer exists.
- **Assigning `'initial'`:** Keeps the CSS variable present with a value of `initial` (for example, `--p-marginBlockStart: initial;`).

In both cases, referencing the variable produces an invalid value on that rule — allowing inheritable properties to fall back to inheritance and non-inheritable properties to fall back to their default/initial behavior.
