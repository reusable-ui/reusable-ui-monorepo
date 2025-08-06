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

## 🧩 Exported CSS Hooks

### `usesSizeVariant(configVars, options)`

Generates CSS rules that activate size-specific properties of component’s configuration based on the currently active size.

Automatically maps suffixed properties (e.g. `fontSizeSm`, `paddingMd`, `borderRadiusLg`) to their base counterparts (`--comp-fontSize`, `--comp-padding`, etc.), depending on the currently active size.

#### 💡 Usage Example

```ts
import {
    usesSizeVariant,
} from '@reusable-ui/size-variant';
import { style, usesCssProps } from '@cssfn/core';
import { componentVars } from './styles/config';

export const componentStyle = () => {
    const { sizeVariantRule } = usesSizeVariant(componentVars, {
        supportedSizes: ['sm', 'md', 'lg'], // list of supported sizes
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply static properties from config:
        ...usesCssProps(componentVars),
        
        // Apply dynamic size-specific overrides:
        ...sizeVariantRule(),
    });
};
```

#### 🧠 How It Works

- For each supported size (e.g. `sm`, `md`, `lg`, etc.), the hook generates scoped rules like:
    ```css
    &.s-sm {
        --comp-fontSize : var(--comp-fontSizeSm);
        --comp-padding  : var(--comp-paddingSm);
        ...
    }
    ```
- These rules ensure that the base variables (`--comp-fontSize`, `--comp-padding`, etc.) resolve to the correct size-specific values depending on the active size variant.
- You can then use those base variables in your component styles:
    ```ts
    style({
        fontSize : componentVars.fontSize, // gets: `var(--comp-fontSize)`
        padding  : componentVars.padding,  // gets: `var(--comp-padding)`
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
