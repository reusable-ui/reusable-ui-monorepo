# @reusable-ui/colors 🎨  

A **flexible and themeable color system** designed for UI components, seamlessly integrating with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/colors** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Themeable** – Dynamically adjust colors based on root definitions  
✔ **Contrast-Aware** – Provides flip colors for strong readability  
✔ **Customizable Borders & Effects** – Control lightness, opacity & contrast  
✔ **CSS-First Approach** – Minimal JavaScript dependency; most logic handled via CSS variables & native color functions  
✔ **Powered by @cssfn/core** – Efficient CSS-in-JS rendering  

## 📦 Installation & Setup  
Install **@reusable-ui/colors** via npm or yarn:

```sh
npm install @reusable-ui/colors
# or
yarn add @reusable-ui/colors
```

## 🚀 Supporting Setup for CSSFN  
In order for **@reusable-ui/colors** to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## 🎨 Usage  

### **Default Color Themes**  
`@reusable-ui/colors` provides a set of predefined themes for UI styling:

- **Primary**
- **Secondary**
- **Success**
- **Warning**
- **Info**
- **Danger**
- **Light**
- **Dark**

### **Retrieving Colors**  
To access these themes, import **@cssfn/core** and **@reusable-ui/colors**:

```ts
import { style } from '@cssfn/core';
import { colorVars } from '@reusable-ui/colors';
```

#### **Root Colors**  
Primary theme colors:

```ts
const myStyle = style({
    backgroundColor: colorVars.primary,   // Resolves to 'var(--col-primary)'
    backgroundColor: colorVars.secondary, // Resolves to 'var(--col-secondary)'
    ...
    backgroundColor: colorVars.dark,      // Resolves to 'var(--col-dark)'
});
```

---

#### **Base Colors**  
Standard background colors:

```ts
const myStyle = style({
    backgroundColor: colorVars.primaryBase,   // Resolves to 'var(--col-primaryBase)'
    backgroundColor: colorVars.secondaryBase, // Resolves to 'var(--col-secondaryBase)'
    ...
    backgroundColor: colorVars.darkBase,      // Resolves to 'var(--col-darkBase)'
});
```

---

#### **Mild Colors**  
Background colors designed for content-heavy sections:

```ts
const myStyle = style({
    backgroundColor: colorVars.primaryMild,   // Resolves to 'var(--col-primaryMild)'
    backgroundColor: colorVars.secondaryMild, // Resolves to 'var(--col-secondaryMild)'
    ...
    backgroundColor: colorVars.darkMild,      // Resolves to 'var(--col-darkMild)'
});
```

---

#### **Additional Color Variants**  
Includes foreground, border, and effect colors:

```ts
const myStyle = style({
    // Foreground colors:
    color: colorVars.primaryFlip, // Resolves to 'var(--col-primaryFlip)'
    color: colorVars.primaryText, // Resolves to 'var(--col-primaryText)'
    color: colorVars.primaryFace, // Resolves to 'var(--col-primaryFace)'
    
    // Border colors:
    borderColor: colorVars.primaryBold, // Resolves to 'var(--col-primaryBold)'
    borderColor: colorVars.primaryThin, // Resolves to 'var(--col-primaryThin)'
    borderColor: colorVars.primaryEdge, // Resolves to 'var(--col-primaryEdge)'
    
    // Effect colors (shadows, rings, focus indicators):
    boxShadow: `0px 0px 0px 5px ${colorVars.primarySoft}`, // Resolves to '0px 0px 0px 5px var(--col-primarySoft)'
});
```

## 🎨 Customization  
Easily customize and define new themes dynamically:

```ts
// index.js or the initial load file of your project

import { colorVars, colorParamVars, adjustLightness, defineTheme, deleteTheme } from '@reusable-ui/colors';

colorVars.primary = '#0000ff' as any; // `as any` => force to assign bare value
colorVars.primaryText = 'oklch(0.00 0.000 000)' as any;
colorVars.primaryBold = 'var(--my-external-color)' as any;
colorVars.primaryEdge = adjustLightness(colorVars.dark, colorParamVars.edge);

defineTheme('summer', '#00ff00'); // Define a new theme
deleteTheme('winter');            // Remove an unused theme
```

## 📖 Part of the Reusable-UI Framework  
This package is a **color system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/colors**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/colors simplifies color management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!  
