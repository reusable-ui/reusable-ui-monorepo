# @reusable-ui/spacers 📏  

A **flexible and themeable spacing system** designed for UI components, seamlessly integrating with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/spacers** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Themeable** – Dynamically adjust spacing widths  
✔ **Consistent Spacing** – Standardized margin, padding, and gap management  
✔ **Customizable Spacer Widths** – Easily override and define new spacing widths  
✔ **CSS-First Approach** – Minimal JavaScript dependency; most logic handled via CSS variables & native functions  
✔ **Powered by @cssfn/core** – Efficient CSS-in-JS rendering  

## 📦 Installation & Setup  
Install **@reusable-ui/spacers** via npm or yarn:

```sh
npm install @reusable-ui/spacers
# or
yarn add @reusable-ui/spacers
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/spacers** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## 📏 Usage  

### **Spacer Configurations**  
`@reusable-ui/spacers` provides a scalable system for managing UI spacing:

- **None (`none`)** – No spacing applied  
- **Predefined Sizes** (`xxs`, `xs`, `semiXs`, `sm`, `semiSm`, `md`, `lg`, `xl`) – Standard spacing units for margins, paddings, and gaps  
- **Customizable Defaults** – Easily override spacing widths  

### **Retrieving Spacers**  
To access spacing configurations, import **@cssfn/core** and **@reusable-ui/spacers**:

```ts
import { style } from '@cssfn/core';
import { spacerVars } from '@reusable-ui/spacers';
```

#### **Using Spacers**  
Standard spacing options:

```ts
const myStyle = style({
    margin: spacerVars.none,  // Resolves to 'var(--spc-none)'
    padding: spacerVars.md,   // Resolves to 'var(--spc-md)'
    gap: spacerVars.lg,       // Resolves to 'var(--spc-lg)'
});
```

## 🎨 Customization  
Easily customize spacing properties dynamically:

```ts
// index.js or the initial load file of your project

import { spacerVars } from '@reusable-ui/spacers';

spacerVars.default = '2rem' as any; // Override the default spacing value
```

## 📖 Part of the Reusable-UI Framework  
This package is a **spacer system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/spacers**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/spacers simplifies spacing management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!
