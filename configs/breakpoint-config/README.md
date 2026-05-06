# @reusable-ui/breakpoint-config 💻  

A **flexible and themeable breakpoint system** designed for responsive UI components, seamlessly integrating with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/breakpoint-config** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Themeable** – Dynamically adjust breakpoint widths  
✔ **Consistent Responsive Design** – Standardized screen and container breakpoints  
✔ **Customizable Breakpoints** – Easily override and define new breakpoint widths  
✔ **CSS-First Approach** – Minimal JavaScript dependency; most logic handled via CSS variables & native functions  
✔ **Powered by @cssfn/core** – Efficient CSS-in-JS rendering  

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

## 💻 Usage  

### **Breakpoint Configurations**  
`@reusable-ui/breakpoint-config` provides a scalable system for managing screen and container breakpoints:

- **Predefined Sizes** (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`) – Standard breakpoint units for responsive design  
- **Customizable Defaults** – Easily override breakpoint widths  

### **Retrieving Breakpoints**  
To access breakpoint configurations, import **@cssfn/core** and **@reusable-ui/breakpoint-config**:

```ts
import { style } from '@cssfn/core';
import {
  breakpointVars,
  ifScreenWidthAtLeast,
  ifScreenWidthSmallerThan,
  ifScreenWidthBetween,
  ifScreenWidthAt,
  ifContainerWidthAtLeast,
  ifContainerWidthSmallerThan,
  ifContainerWidthBetween,
  ifContainerWidthAt,
} from '@reusable-ui/breakpoint-config';
```

#### **Using Breakpoints**  
Standard breakpoint options:

```ts
const myStyle = style({
    // Getting the width of breakpoints:
    inlineSize: breakpointVars.xs,   // Resolves to 'var(--brp-xs)'
    inlineSize: breakpointVars.sm,   // Resolves to 'var(--brp-sm)'
    inlineSize: breakpointVars.md,   // Resolves to 'var(--brp-md)'
    inlineSize: breakpointVars.lg,   // Resolves to 'var(--brp-lg)'
    inlineSize: breakpointVars.xl,   // Resolves to 'var(--brp-xl)'
    inlineSize: breakpointVars.xxl,  // Resolves to 'var(--brp-xxl)'
    inlineSize: breakpointVars.xxxl, // Resolves to 'var(--brp-xxxl)'
    
    // Conditional styling:
    gridArea: 'mobile',
    fontWeight: 'normal',
    ...ifScreenWidthAtLeast('lg', {
      gridArea: 'desktop',
      fontWeight: 'bold',
    }),
    
    display: 'flex',
    ...ifContainerWidthAtLeast('lg', {
      display: 'grid',
    }),
});
```

## 🎨 Customization  
Easily customize breakpoint properties dynamically:

```ts
// index.js or the initial load file of your project

import { breakpointVars } from '@reusable-ui/breakpoint-config';

breakpointVars.lg = '1024px' as any; // Override the lg breakpoint value
```

## 📖 Part of the Reusable-UI Framework  
This package is a **breakpoint system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/breakpoint-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/breakpoint-config simplifies responsive design management for modern UI components.**  
Give it a ⭐ on GitHub if you find it useful!
