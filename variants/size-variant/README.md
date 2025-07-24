# @reusable-ui/size-variant 📦  

A utility for managing component sizes consistently across React projects.  
This package provides hooks and CSS helpers for handling sizes, and conditional styling — ideal for buttons, cards, badges, input fields, and any scalable UI elements.

## ✨ Features
✔ Declarative size tokens (`sm` / `md` / `lg`, with support for custom values)  
✔ CSS class generation (`s-sm`, `s-md`, `s-lg`, etc.)  
✔ Fallback mechanism for default sizing  
✔ CSS selectors and conditional rule helpers for size-aware styling  
✔ Reusable across layout, appearance, and spacing systems

## 📦 Installation
Install **@reusable-ui/size-variant** via npm or yarn:

```sh
npm install @reusable-ui/size-variant
# or
yarn add @reusable-ui/size-variant
```

## 🧩 Exported Hooks

### `useSizeVariant(props, options)`

Resolves the size value along with its associated CSS class name, based on component props and optional system defaults.

#### 💡 Usage Example

```ts
import React, { FC } from 'react';
import {
    useSizeVariant,
    SizeVariantProps,
} from '@reusable-ui/size-variant';
import styles from './SizeableCard.module.css';

export interface SizeableCardProps extends SizeVariantProps {}

/**
 * A scalable card component that adapts based on the given size.
 * Supports `sm`, `md`, or `lg`.
 */
export const SizeableCard : FC<SizeableCardProps> = (props) => {
    const {
        size,
        sizeClassname,
    } = useSizeVariant(props, {
        defaultSize: 'md', // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${sizeClassname}`}
        >
            <strong>Resolved size:</strong> {size}
        </div>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Selector:
    sizeSelector, // Targets `.s-${size}` class
    
    // Conditional Rule Helper:
    ifSize,       // Applies styles for a specific size
} from '@reusable-ui/size-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    display: 'flex',
    gap: '0.5rem',
    ...ifSize('sm', {
        fontSize: '0.75rem',
    }),
    ...ifSize('md', {
        fontSize: '1rem',
    }),
    ...rule(sizeSelector('lg'), {
        fontSize: '1.25rem',
        padding: '1rem',
    }),
});
```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/size-variant** is a styling utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/size-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/size-variant enables scalable, size-aware styling with ergonomic React hooks.**  
Give it a ⭐ on GitHub if you find it useful!  
