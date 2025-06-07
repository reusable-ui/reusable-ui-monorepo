# @reusable-ui/resets ↩️  

A **powerful utility library** for **resetting browser styles**, seamlessly integrating with the **Reusable-UI framework** and powered by **@cssfn/core (CSS-in-JS)**.  

**@reusable-ui/resets** is part of the **@reusable-ui monorepo**, a collection of React component libraries.

## 🚀 Features  
✔ **Removes default browser styling** for form controls, links, lists, images, media, and more  
✔ **Ensures consistent rendering** across all browsers  
✔ **Lightweight & efficient** – Minimal CSS footprint with optimized resets  
✔ **Integrates seamlessly** with `@cssfn/core` for dynamic styling  

## 📦 Installation  
Install **@reusable-ui/resets** via npm or yarn:

```sh
npm install @reusable-ui/resets
# or
yarn add @reusable-ui/resets
```

## 🔧 Supporting Setup for CSSFN  
In order for the resetted style to work, `<StaticStyles />` and `<HydrateStyles />` must be included inside `<head>` for correct CSS rendering:

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

## 🛠️ Reset Utilities  
`@reusable-ui/resets` provides a **comprehensive set of resets** for various elements:

- **Forms** (`resetControl`, `resetTextbox`, `resetRange`) – Removes browser styling from inputs, buttons, and sliders  
- **Interactive Elements** (`resetFocusableElement`, `resetLink`) – Ensures custom styling for focusable elements and links  
- **Lists** (`resetList`) – Clears default bullet points & list formatting  
- **Scrollbars** (`resetScrollbar`) – Hides default scrollbar styles  
- **Media & Images** (`resetImage`, `resetFigure`, `resetMedia`) – Standardizes rendering for media elements  
- **Dialogs** (`resetDialog`) – Removes default `<dialog>` styles  

### 📌 Importing Resets  
To apply resets, import the necessary functions from `@reusable-ui/resets`:

```ts
import {
    resetFocusableElement,
    resetControl,
    resetLink,
    resetTextbox,
    resetRange,
    resetList,
    resetScrollbar,
    resetImage,
    resetFigure,
    resetMedia,
    resetDialog,
} from '@reusable-ui/resets';
```

## 🎨 Applying Resets in Styles

### **Reusable Mixin Definition**
```ts
// my-style-mixins.ts

import { style, rule } from '@cssfn/core';
import { resetTextbox } from '@reusable-ui/resets';

export const myTextboxStyle = () => style({
    // Apply reset:
    ...resetTextbox(),
    
    // Custom Layout:
    ...style({
        display: 'grid',
    }),
    
    // Variants:
    ...style({
        ...rule('.small', {
            fontSize: 'smaller',
        }),
    }),
});
```

---

### **Defining Scoped Styles**
```ts
// my-styles.ts

import { style, scope } from '@cssfn/core';
import { resetControl } from '@reusable-ui/resets';
import { myTextboxStyle } from './my-style-mixins.js';
import { myButtonStyle } from './my-button-mixins.js';

const scopedStyles = () => [
    scope('textbox', {
        ...myTextboxStyle(),
        ...style({
            borderWidth: '1px',
        }),
    }),
    scope('button', {
        ...resetControl(),
        ...myButtonStyle(),
        ...style({
            borderRadius: '0.25rem',
        }),
    }),
];

export default scopedStyles;
```

---

### **Creating a Style Hook**
```ts
// my-styles-hooks.ts

import { createStyleSheetsHook } from '@cssfn/cssfn-react';

export const useMyComponentStyles = createStyleSheetsHook(
    async () => import('./my-styles.js'), 
    { id: 'my-styles-123' }
);
```

---

### **Using Resets in a React Component**
```tsx
// MyComponent.tsx

import React from 'react';
import { useMyComponentStyles } from './my-styles-hooks.js';

const MyComponent: React.FC = () => {
    const styles = useMyComponentStyles();
    
    return (
        <div>
            <input type='text' className={styles.textbox} />
            <button type='button' className={styles.button}>Click Me</button>
        </div>
    );
};

export default MyComponent;
```

## 🌍 Part of the Reusable-UI Framework  
This package is a **core reset module** inside the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/resets**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 📜 License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/resets ensures clean, consistent UI styling by removing unwanted browser defaults.**  
Give it a ⭐ on GitHub if you find it useful!
