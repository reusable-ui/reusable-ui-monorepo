# @reusable-ui/mild-variant 📦  

A utility for managing mild styling (reading friendly) consistently across React components.  
Provides hooks and CSS helpers for mild-enabled resolution and conditional styling — ideal for text fields, cards, descriptions, and any content-focused elements.

## ✨ Features
✔ Boolean-based mild variant with inheritance and inversion  
✔ Hook-based resolution with customizable fallback behavior  
✔ CSS selectors and conditional rule helpers for mild-aware styling  
✔ Seamless integration across appearance, layout, and interaction systems

## 📦 Installation
Install **@reusable-ui/mild-variant** via npm or yarn:

```sh
npm install @reusable-ui/mild-variant
# or
yarn add @reusable-ui/mild-variant
```

## 🧩 Exported Hooks

### `useMildVariant(props, options)`

Resolves the mild state along with its associated CSS class name, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useMildVariant,
    MildVariantProps,
} from '@reusable-ui/mild-variant';
import styles from './MildBox.module.css';

export interface MildBoxProps extends MildVariantProps {}

/**
 * A box that conditionally softens (reading friendly) its appearance.
 */
export const MildBox: FC<MildBoxProps> = (props) => {
    const {
        mild,
        mildClassname,
    } = useMildVariant(props, {
        defaultMild: false, // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${mildClassname}`}
        >
            {mild && <span className={styles.badge}>🔔</span>}
            <p>Additional details go here.</p>
        </div>
    );
};
```

#### 🧠 Mild-Enables Resolution Strategy

The hook determines the final mild state using the following priority:
1. **Explicit Prop Override**  
   - If `props.mild` is `true` or `false`, it takes precedence.
2. **Relative Resolution**  
   - If set to `'inherit'`, uses the value from context, if available (`MildVariantProvider`).
   - If set to `'invert'`, flips the inherited value (`true` ⇄ `false`).
3. **Fallback Logic**  
   - Uses `options.defaultMild` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<MildVariantProvider>` to share mild state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    MildVariantProps,
    MildVariantProvider,
    useMildVariant,
} from '@reusable-ui/mild-variant';

export interface ParentComponentProps extends MildVariantProps {
    children ?: ReactNode
}

/**
 * A component that shares its mild state with descendant components.
 */
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve mild state from props:
    const { mild } = useMildVariant(props, {
        defaultMild: false, // fallback if not provided
    });
    
    // Propagate mild state to descendants:
    return (
        <MildVariantProvider mild={mild}>
            {props.children}
        </MildVariantProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Softens Selectors:
    isMildSelector,    // Targets `.is-mild` classes
    isNotMildSelector, // Targets `.not-mild` classes
    
    // Conditional styling helpers:
    ifMild,            // Applies styles to mild elements
    ifNotMild,         // Applies styles to non-mild elements
} from '@reusable-ui/mild-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifMild({
        backgroundColor: 'lightblue',
        color: 'darkblue',
    }),
    ...ifNotMild({
        backgroundColor: 'blue',
        color: 'white',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isMildSelector, { // equivalent to `ifMild`
        borderColor: 'blue',
    }),
    ...rule(isNotMildSelector, { // equivalent to `ifNotMild`
        borderColor: 'darkblue',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesMildVariant()`

Generates CSS rules that toggle mild-related CSS variables based on the current mild mode, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usesMildVariant,
} from '@reusable-ui/mild-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        mildVariantRule,
        mildVariantVars: { isMild, notMild },
    } = usesMildVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply mild-related variable rules:
        ...mildVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on mild mode:
        ...fallback({
            // Mild styling:
            fontWeight     : `${isMild} lighter`,
            textDecoration : `${isMild} underline`,
        }),
        ...fallback({
            // Non-mild styling:
            fontWeight     : `${notMild} normal`,
            textDecoration : `${notMild} none`,
        }),
    });
};
```

#### 🧠 How It Works

- `usesMildVariant()` generates scoped rules like:
    ```css
    &.is-mild {
        --isMild: ;       /* Valid    when mild mode is enabled. */
        --notMild: unset; /* Poisoned when mild mode is enabled. */
    }
    
    &.not-mild {
        --isMild: unset;  /* Poisoned when mild mode is disabled. */
        --notMild: ;      /* Valid    when mild mode is disabled. */
    }
    ```
- These variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        fontWeight     : `${mildVariantVars.isMild} lighter`,   // Will be rendered to: `font-weight: var(--isMild) lighter;`       (becomes valid only when in mild mode)
        textDecoration : `${mildVariantVars.isMild} underline`, // Will be rendered to: `text-decoration: var(--isMild) underline;` (becomes valid only when in mild mode)
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/mild-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/mild-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/mild-variant enhances your UI with gentle styling tailored for comfortable content presentation.**  
Give it a ⭐ on GitHub if you find it useful!  
