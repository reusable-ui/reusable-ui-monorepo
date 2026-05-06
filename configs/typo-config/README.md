# @reusable-ui/typo-config ✍️  

A **flexible and themeable typography system** designed for UI components, seamlessly integrating with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/typo-config** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Themeable** – Dynamically adjusts typography based on root definitions  
✔ **Scalable Font System** – Works seamlessly across various screen sizes and responsive designs  
✔ **Optimized for Accessibility** – Helps maintain readable and well-structured text formatting  
✔ **Customizable Font Styles** – Control size, weight, spacing, and alignment  
✔ **Powered by @cssfn/core** – Efficient CSS-in-JS rendering  

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

## ✍️ Usage  

### **Typography Sections**  
`@reusable-ui/typo-config` provides a set of predefined styles for UI text elements:

- typography
- secondaries
- paragraphs
- leads
- headings
- displays
- blockquotes
- plainLists
- horzSeparators
- marks
- kbds
- codes
- emphases

### **Applying typography styles**  
To use the built-in typography styles, import **@cssfn/core** and **@reusable-ui/typo-config**:

```ts
import { style } from '@cssfn/core';
import {
    mountTypography,
    mountSecondaries,
    mountParagraphs,
    mountLeads,
    mountHeadings,
    mountDisplays,
    mountBlockquotes,
    mountPlainLists,
    mountHorzSeparators,
    mountMarks,
    mountKbds,
    mountCodes,
    mountEmphases,
    mountMany,
} from '@reusable-ui/typo-config';
```

#### **Mounting and Unmounting Styles**  
Singular mounting/unmounting:

```ts
// Mounting:
const mountedTypos = mountTypography();

// Unmounting:
mountedTypos.unmount();
```

Batch mounting/unmounting:

```ts
// Mounting multiple styles:
const mountedTypos = mountMany(
    mountTypography,
    mountSecondaries,
    mountParagraphs,
    mountLeads,
    mountHeadings,
    mountDisplays,
    mountBlockquotes,
    mountPlainLists,
    mountHorzSeparators,
    mountMarks,
    mountKbds,
    mountCodes,
    mountEmphases,
);

// Unmounting:
mountedTypos.unmount();
```

## ✍️ Customization  
Easily modify typography variables dynamically:

```ts
// index.js or the initial load file of your project

import {
    typoVars,
    secondaryVars,
    paragraphVars,
    leadVars,
    headingVars,
    displayVars,
    blockquoteVars,
    plainListVars,
    horzSeparatorVars,
    markVars,
    kbdVars,
    codeVars,
} from '@reusable-ui/typo-config';

typoVars.fontFamily = 'Arial, sans-serif' as any; // `as any` => force to assign bare value
typoVars.lineHeight = 1.5 as any;
paragraphVars.marginBlockStart = '2em' as any;
paragraphVars.marginBlockEnd = paragraphVars.marginBlockStart;
horzSeparatorVars.opacity = 0.5 as any;
secondaryVars.borderColor = 'var(--custom-secondary-color)';
```

## 📖 Part of the Reusable-UI Framework  
This package is a **typography styling module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/typo-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/typo-config simplifies color management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!  
