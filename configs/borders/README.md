# @reusable-ui/borders 🚧  

A **flexible and themeable border system** designed for UI components, seamlessly integrating with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/borders** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Themeable** – Dynamically adjust border widths, styles, and radii based on root definitions  
✔ **Customizable Border Widths** – Enables fine control over thickness levels  
✔ **Border Radius System** – Predefined radius options for UI elements  
✔ **CSS-First Approach** – Minimal JavaScript dependency; most logic handled via CSS variables & native functions  
✔ **Powered by @cssfn/core** – Efficient CSS-in-JS rendering  

## 📦 Installation & Setup  
Install **@reusable-ui/borders** via npm or yarn:

```sh
npm install @reusable-ui/borders
# or
yarn add @reusable-ui/borders
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/borders** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## 🚧 Usage  

### **Border Configurations**  
`@reusable-ui/borders` provides a flexible system for managing border styles:

- **Border Widths** (hairline, thin, bold)
- **Border Styles** (solid, dashed, custom)
- **Border Radius System** (none, small, medium, large, pill, circle)

### **Retrieving Borders**  
To access border configurations, import **@cssfn/core** and **@reusable-ui/borders**:

```ts
import { style } from '@cssfn/core';
import { borderVars, borderRadiusVars } from '@reusable-ui/borders';
```

#### **Border Widths**  
Predefined border thickness options:

```ts
const myStyle = style({
    borderWidth: borderVars.none,  // Resolves to 'var(--bor-none)'
    borderWidth: borderVars.hair,  // Resolves to 'var(--bor-hair)'
    borderWidth: borderVars.thin,  // Resolves to 'var(--bor-thin)'
    borderWidth: borderVars.bold,  // Resolves to 'var(--bor-bold)'
});
```

#### **Border Styles**  
Predefined border styling options:

```ts
const myStyle = style({
    borderStyle: borderVars.style,  // Resolves to 'var(--bor-style)'
    borderColor: borderVars.color,  // Resolves to 'var(--bor-color)'
});
```

#### **Border Radius System**  
Predefined rounding options:

```ts
const myStyle = style({
    borderRadius: borderRadiusVars.none,   // Resolves to 'var(--bor-r-none)'
    borderRadius: borderRadiusVars.sm,     // Resolves to 'var(--bor-r-sm)'
    ...
    borderRadius: borderRadiusVars.pill,   // Resolves to 'var(--bor-r-pill)'
    borderRadius: borderRadiusVars.circle, // Resolves to 'var(--bor-r-circle)'
});
```

## 🎨 Customization  
Easily customize border properties dynamically:

```ts
// index.js or the initial load file of your project

import { borderVars } from '@reusable-ui/borders';

borderVars.defaultWidth = '3px' as any; // Force assignment of a custom width
borderVars.defaultStyle = 'dashed' as any;
borderVars.myColor = 'var(--my-external-color)' as any;
```

## 📖 Part of the Reusable-UI Framework  
This package is a **border system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/borders**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/borders simplifies border management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!
