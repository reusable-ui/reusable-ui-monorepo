# @reusable-ui/radius-config ⭕  

A **flexible rounding system** for UI components, seamlessly integrated with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/radius-config** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Rounding System** – Predefined radius configurations for smoothing corners and shapes  
✔ **CSS-First Approach** – Minimal JavaScript; values exposed as CSS variables  
✔ **Powered by @cssfn/core** – Efficient CSS-in-JS rendering  

## 📦 Installation & Setup  
Install **@reusable-ui/radius-config** via npm or yarn:

```sh
npm install @reusable-ui/radius-config
# or
yarn add @reusable-ui/radius-config
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/radius-config** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

### **Radius Configurations**  
`@reusable-ui/radius-config` provides a consistent set of rounding values:

- **None (`none`)** – sharp corners  
- **Fixed Radiuses** (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`) – standard rounding units  
- **Relative Radiuses** (`pill`, `circle`) – fully rounded edges  
- **Default Radiuses** – default rounding for your design system  

### **Retrieving Radiuses**  
To access rounding configurations, import **@cssfn/core** and **@reusable-ui/radius-config**:

```ts
import { style } from '@cssfn/core';
import { radiusConfigVars } from '@reusable-ui/radius-config';
```

#### **Applying Radiuses**  

```ts
const myStyle = style({
    borderRadius: radiusConfigVars.none,   // Resolves to 'var(--r-none)'
    borderRadius: radiusConfigVars.sm,     // Resolves to 'var(--r-sm)'
    ...
    borderRadius: radiusConfigVars.pill,   // Resolves to 'var(--r-pill)'
    borderRadius: radiusConfigVars.circle, // Resolves to 'var(--r-circle)'
});
```

## 🎨 Customization  
Easily customize rounding configurations dynamically:

```ts
// index.js or the initial load file of your project

import { radiusConfigVars } from '@reusable-ui/radius-config';

radiusConfigVars.default = '2rem' as any;   // Override the default rounding value
radiusConfigVars.xs      = '0.1rem' as any; // Override the rounding xs size
```

## 📖 Part of the Reusable-UI Framework  
This package is a **rounding system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/radius-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/radius-config makes corner rounding consistent and customizable across your design system.**  
Give it a ⭐ on GitHub if you find it useful!
