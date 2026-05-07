# @reusable-ui/color-config 🎨  

A **flexible and themeable color system** designed for UI components, seamlessly integrating with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/color-config** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Themeable** – Dynamically adjust colors based on root definitions  
✔ **Contrast-Aware** – Provides flip colors for strong readability  
✔ **Customizable Borders & Effects** – Control lightness, opacity & contrast  
✔ **CSS-First Approach** – Minimal JavaScript dependency; most logic handled via CSS variables & native color functions  
✔ **Powered by @cssfn/core** – Efficient CSS-in-JS rendering  

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

## 🎨 Usage  

### **Default Color Themes**  
`@reusable-ui/color-config` provides a set of predefined themes for UI styling:

- **Primary**
- **Secondary**
- **Success**
- **Warning**
- **Info**
- **Danger**
- **Light**
- **Dark**

### **Retrieving Colors**  
To access these themes, import **@cssfn/core** and **@reusable-ui/color-config**:

```ts
import { style } from '@cssfn/core';
import { colorConfigVars } from '@reusable-ui/color-config';
```

#### **Root Colors**  
Primary theme colors:

```ts
const myStyle = style({
    backgroundColor: colorConfigVars.primary,   // Resolves to 'var(--col-primary)'
    backgroundColor: colorConfigVars.secondary, // Resolves to 'var(--col-secondary)'
    ...
    backgroundColor: colorConfigVars.dark,      // Resolves to 'var(--col-dark)'
});
```

---

#### **Base Colors**  
Standard background colors:

```ts
const myStyle = style({
    backgroundColor: colorConfigVars.primaryBase,   // Resolves to 'var(--col-primaryBase)'
    backgroundColor: colorConfigVars.secondaryBase, // Resolves to 'var(--col-secondaryBase)'
    ...
    backgroundColor: colorConfigVars.darkBase,      // Resolves to 'var(--col-darkBase)'
});
```

---

#### **Mild Colors**  
Background colors designed for content-heavy sections:

```ts
const myStyle = style({
    backgroundColor: colorConfigVars.primaryMild,   // Resolves to 'var(--col-primaryMild)'
    backgroundColor: colorConfigVars.secondaryMild, // Resolves to 'var(--col-secondaryMild)'
    ...
    backgroundColor: colorConfigVars.darkMild,      // Resolves to 'var(--col-darkMild)'
});
```

---

#### **Additional Color Variants**  
Includes foreground, border, and effect colors:

```ts
const myStyle = style({
    // Foreground colors:
    color: colorConfigVars.primaryFlip, // Resolves to 'var(--col-primaryFlip)'
    color: colorConfigVars.primaryText, // Resolves to 'var(--col-primaryText)'
    color: colorConfigVars.primaryFace, // Resolves to 'var(--col-primaryFace)'
    
    // Border colors:
    borderColor: colorConfigVars.primaryBold, // Resolves to 'var(--col-primaryBold)'
    borderColor: colorConfigVars.primaryThin, // Resolves to 'var(--col-primaryThin)'
    borderColor: colorConfigVars.primaryEdge, // Resolves to 'var(--col-primaryEdge)'
    
    // Effect colors (shadows, rings, focus indicators):
    boxShadow: `0px 0px 0px 5px ${colorConfigVars.primarySoft}`, // Resolves to '0px 0px 0px 5px var(--col-primarySoft)'
});
```

## 🎨 Customization  
Easily customize and define new themes dynamically:

```ts
// index.js or the initial load file of your project

import { colorConfigVars, colorParamConfigVars, adjustLightness, defineTheme, deleteTheme } from '@reusable-ui/color-config';

colorConfigVars.primary = '#0000ff' as any; // `as any` => force to assign bare value
colorConfigVars.primaryText = 'oklch(0.00 0.000 000)' as any;
colorConfigVars.primaryBold = 'var(--my-external-color)' as any;
colorConfigVars.primaryEdge = adjustLightness(colorConfigVars.dark, colorParamConfigVars.edge);

defineTheme('summer', '#00ff00'); // Define a new theme
deleteTheme('winter');            // Remove an unused theme
```

## 📖 Part of the Reusable-UI Framework  
This package is a **color system module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/color-config**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/color-config simplifies color management for dynamic UI designs.**  
Give it a ⭐ on GitHub if you find it useful!  
