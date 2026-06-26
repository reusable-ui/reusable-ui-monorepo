# @reusable-ui/outline-variant 📦  

A utility for managing visual outline consistently across React components.  
Provides hooks and CSS helpers for outline resolution and conditional styling — ideal for buttons, cards, badges, alerts, or any component that benefits from bordered emphasis.

## ✨ Features
✔ Boolean-based outline variant with inheritance and inversion  
✔ Hook-based resolution with customizable fallback behavior  
✔ CSS selectors and conditional rule helpers for outline-aware styling  
✔ Seamless integration across appearance, layout, and interaction systems

## 📦 Installation
Install **@reusable-ui/outline-variant** via npm or yarn:

```sh
npm install @reusable-ui/outline-variant
# or
yarn add @reusable-ui/outline-variant
```

## 🧩 Exported Hooks

### `useOutlineVariant(props, options)`

Resolves the outlined state along with its associated CSS class name, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useOutlineVariant,
    OutlineVariantProps,
} from '@reusable-ui/outline-variant';
import styles from './OutlinedBox.module.css';

export interface OutlinedBoxProps extends OutlineVariantProps {}

// A box that conditionally outlines its appearance.
export const OutlinedBox: FC<OutlinedBoxProps> = (props) => {
    const {
        outlined,
        outlineClassname,
    } = useOutlineVariant(props, {
        defaultOutlined: false, // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${outlineClassname}`}
        >
            {outlined && <span className={styles.badge}>🔔</span>}
            <p>Additional details go here.</p>
        </div>
    );
};
```

#### 🧠 Outline Resolution Strategy

The hook determines the final outlined state using the following priority:
1. **Explicit Prop Override**  
   - If `props.outlined` is `true` or `false`, it takes precedence.
2. **Relative Resolution**  
   - If set to `'inherit'`, uses the value from context, if available (`OutlineVariantProvider`).
   - If set to `'invert'`, flips the inherited value (`true` ⇄ `false`).
3. **Fallback Logic**  
   - Uses `options.defaultOutlined` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<OutlineVariantProvider>` to share outlined state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    OutlineVariantProps,
    OutlineVariantProvider,
    useOutlineVariant,
} from '@reusable-ui/outline-variant';

export interface ParentComponentProps extends OutlineVariantProps {
    children ?: ReactNode
}

// A component that shares its outlined state with descendant components.
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve outlined state from props:
    const { outlined } = useOutlineVariant(props, {
        defaultOutlined: false, // fallback if not provided
    });
    
    // Propagate outlined state to descendants:
    return (
        <OutlineVariantProvider outlined={outlined}>
            {props.children}
        </OutlineVariantProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Outline Selectors:
    isOutlinedSelector,    // Targets `.is-outlined` classes
    isNotOutlinedSelector, // Targets `.not-outlined` classes
    
    // Conditional styling helpers:
    ifOutlined,            // Applies styles to outlined elements
    ifNotOutlined,         // Applies styles to non-outlined elements
} from '@reusable-ui/outline-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifOutlined({
        backgroundColor: 'transparent',
        color: 'blue',
    }),
    ...ifNotOutlined({
        backgroundColor: 'lightblue',
        color: 'darkblue',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isOutlinedSelector, { // equivalent to `ifOutlined`
        borderColor: 'blue',
    }),
    ...rule(isNotOutlinedSelector, { // equivalent to `ifNotOutlined`
        borderColor: 'darkblue',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usingOutlineVariant()`

Generates CSS rules that toggle outline-related CSS variables based on the current outlined state, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usingOutlineVariant,
} from '@reusable-ui/outline-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        outlineVariantRule,
        outlineVariantVars: { isOutlined, notOutlined, outlineFactor },
    } = usingOutlineVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply outline-related variable rules:
        ...outlineVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on outline mode:
        ...fallback({
            // Outlined styling:
            fontWeight     : `${isOutlined} bold`,
            textDecoration : `${isOutlined} underline`,
        }),
        ...fallback({
            // Non-outlined styling:
            fontWeight     : `${notOutlined} normal`,
            textDecoration : `${notOutlined} none`,
        }),
        opacity: `calc(1 - ${outlineFactor})`,
    });
};
```

#### 🧠 How It Works

- `usingOutlineVariant()` generates scoped rules like:
    ```css
    &.is-outlined {
        --isOutlined: ;       /* Valid    when outlined. */
        --notOutlined: unset; /* Poisoned when outlined. */
        
        --outlineFactor: 1;   /* 1 → outlined. */
    }
    
    &.not-outlined {
        --isOutlined: unset;  /* Poisoned when not outlined. */
        --notOutlined: ;      /* Valid    when not outlined. */
        
        --outlineFactor: 0;   /* 0 → not outlined. */
    }
    ```
- These first two variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        fontWeight     : `${outlineVariantVars.isOutlined} bold`,      // Will be rendered to: `font-weight: var(--isOutlined) bold;`          (becomes valid only when outlined)
        textDecoration : `${outlineVariantVars.isOutlined} underline`, // Will be rendered to: `text-decoration: var(--isOutlined) underline;` (becomes valid only when outlined)
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/outline-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/outline-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/outline-variant applies outline styling with clarity and consistency across React components.**  
Give it a ⭐ on GitHub if you find it useful!  
