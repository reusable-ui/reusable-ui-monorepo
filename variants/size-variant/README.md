# @reusable-ui/size-variant 📦  

A utility for managing sizes consistently across React components.  
Provides hooks and CSS helpers for size resolution and conditional styling — ideal for buttons, cards, badges, input fields, and any scalable UI elements.

## ✨ Features
✔ Declarative size tokens (`sm`, `md`, `lg`) with support for custom values  
✔ Relative size inheritance via `size='inherit'`  
✔ Automatic CSS class generation (`s-sm`, `s-md`, `s-lg`, etc.)  
✔ Fallback mechanism for default size resolution  
✔ CSS selectors and conditional rule helpers for size-aware styling  
✔ Seamless integration across layout, appearance, and spacing systems

## 📦 Installation
Install **@reusable-ui/size-variant** via npm or yarn:

```sh
npm install @reusable-ui/size-variant
# or
yarn add @reusable-ui/size-variant
```

## 🧩 Exported Hooks

### `useSizeVariant(props, options)`

Resolves the size value along with its associated CSS class name, based on component props, default configuration, and parent context.

#### 💡 Usage Example

```tsx
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
        supportedSizes: ['sm', 'md', 'lg'], // list of supported sizes
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

#### 🧠 Size Resolution Strategy

The hook determines the final size using the following priority:
1. **Explicit Prop Override**  
   - If `props.size` is a value other than `'inherit'`, it takes precedence.
2. **Relative Resolution**  
   - If set to `'inherit'`, uses the value from context, if available (`SizeVariantProvider`).
   - If the inherited value is unsupported, it falls back to `options.defaultSize ?? 'md'`.
3. **Fallback Logic**  
   - Uses `options.defaultSize` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<SizeVariantProvider>` to share size with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    SizeVariantProps,
    SizeVariantProvider,
    useSizeVariant,
} from '@reusable-ui/size-variant';

export interface ParentComponentProps extends SizeVariantProps {
    children ?: ReactNode
}

/**
 * A component that shares its size with descendant components.
 */
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve size value from props:
    const { size } = useSizeVariant(props, {
        defaultSize: 'md', // fallback if not provided
        supportedSizes: ['sm', 'md', 'lg'], // list of supported sizes
    });
    
    // Propagate size value to descendants:
    return (
        <SizeVariantProvider size={size}>
            {props.children}
        </SizeVariantProvider>
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
    ifSize,       // Applies styles to a specific size
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
**@reusable-ui/size-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/size-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/size-variant enables scalable-aware styling with ergonomic React hooks.**  
Give it a ⭐ on GitHub if you find it useful!  
