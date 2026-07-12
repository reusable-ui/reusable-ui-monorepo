# @reusable-ui/emphasized-variant 📦  

A utility for managing visual emphasis consistently across React components.  
Provides hooks and CSS helpers for emphasis resolution and conditional styling — ideal for buttons, cards, badges, alerts, or any component that requires visual prioritization.

## ✨ Features
✔ Boolean-based emphasized variant with inheritance and inversion  
✔ Hook-based resolution with customizable fallback behavior  
✔ CSS selectors and conditional rule helpers for emphasized-aware styling  
✔ Seamless integration across appearance, layout, and interaction systems

## 📦 Installation
Install **@reusable-ui/emphasized-variant** via npm or yarn:

```sh
npm install @reusable-ui/emphasized-variant
# or
yarn add @reusable-ui/emphasized-variant
```

## 🧩 Exported Hooks

### `useEmphasizedVariant(props, options)`

Resolves the emphasized state along with its associated CSS class name, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useEmphasizedVariant,
    EmphasizedVariantProps,
} from '@reusable-ui/emphasized-variant';
import styles from './EmphasizedBox.module.css';

export interface EmphasizedBoxProps extends EmphasizedVariantProps {}

// A box that conditionally emphasizes its appearance.
export const EmphasizedBox: FC<EmphasizedBoxProps> = (props) => {
    const {
        emphasized,
        emphasizedClassname,
    } = useEmphasizedVariant(props, {
        defaultEmphasized: false, // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${emphasizedClassname}`}
        >
            {emphasized && <strong>Important Content</strong>}
            <p>Additional details go here.</p>
        </div>
    );
};
```

#### 🧠 Emphasis Resolution Strategy

The hook determines the final emphasized state using the following priority:
1. **Explicit Prop Override**  
   - If `props.emphasized` is `true` or `false`, it takes precedence.
2. **Relative Resolution**  
   - If set to `'inherit'`, uses the value from context, if available (`EmphasizedVariantProvider`).
   - If set to `'invert'`, flips the inherited value (`true` ⇄ `false`).
3. **Fallback Logic**  
   - Uses `options.defaultEmphasized` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<EmphasizedVariantProvider>` to share emphasized state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    EmphasizedVariantProps,
    EmphasizedVariantProvider,
    useEmphasizedVariant,
} from '@reusable-ui/emphasized-variant';

export interface ParentComponentProps extends EmphasizedVariantProps {
    children ?: ReactNode
}

// A component that shares its emphasized state with descendant components.
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve emphasized state from props:
    const { emphasized } = useEmphasizedVariant(props, {
        defaultEmphasized: false, // fallback if not provided
    });
    
    // Propagate emphasized state to descendants:
    return (
        <EmphasizedVariantProvider emphasized={emphasized}>
            {props.children}
        </EmphasizedVariantProvider>
    );
};
```

---

### `useResolvedEmphasized(props, options)`

Resolves the current emphasized variant.

Useful for derived components that need to determine the current emphasized variant of the base component.

Resolution priority:
- `'inherit'` : uses the emphasized value from context.
- `'invert'`  : flips the emphasized value from context (`true` ⇄ `false`).
- Otherwise   : uses the explicitly provided emphasized value as-is.

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Emphasized Selectors:
    isEmphasizedSelector,    // Targets `.is-emphasized` classes
    isNotEmphasizedSelector, // Targets `.not-emphasized` classes
    
    // Conditional styling helpers:
    ifEmphasized,            // Applies styles to emphasized elements
    ifNotEmphasized,         // Applies styles to non-emphasized elements
} from '@reusable-ui/emphasized-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifEmphasized({
        fontWeight: 'bold',
        color: 'crimson',
    }),
    ...ifNotEmphasized({
        fontWeight: 'normal',
        color: 'gray',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isEmphasizedSelector, { // equivalent to `ifEmphasized`
        fontWeight: 'bold',
    }),
    ...rule(isNotEmphasizedSelector, { // equivalent to `ifNotEmphasized`
        fontWeight: 'normal',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usingEmphasizedVariant()`

Generates CSS rules that toggle emphasized-related CSS variables based on current emphasized state, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usingEmphasizedVariant,
} from '@reusable-ui/emphasized-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        emphasizedVariantRule,
        emphasizedVariantVars: { isEmphasized, notEmphasized, emphasizedFactor },
    } = usingEmphasizedVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply emphasized-related variable rules:
        ...emphasizedVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on current emphasized state:
        ...fallback({
            // Emphasized styling:
            fontWeight : `${isEmphasized} bold`,
            color      : `${isEmphasized} crimson`,
        }),
        ...fallback({
            // Non-emphasized styling:
            fontWeight : `${notEmphasized} normal`,
            color      : `${notEmphasized} gray`,
        }),
        opacity: `calc(1 - ${emphasizedFactor})`,
    });
};
```

#### 🧠 How It Works

- `usingEmphasizedVariant()` generates scoped rules like:
    ```css
    &.is-emphasized {
        --isEmphasized: ;       /* Valid    when emphasized. */
        --notEmphasized: unset; /* Poisoned when emphasized. */
        
        --emphasizedFactor: 1;  /* 1 → emphasized. */
    }
    
    &.not-emphasized {
        --isEmphasized: unset;  /* Poisoned when not emphasized. */
        --notEmphasized: ;      /* Valid    when not emphasized. */
        
        --emphasizedFactor: 0;  /* 0 → not emphasized. */
    }
    ```
- These first two variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        fontWeight : `${emphasizedVariantVars.isEmphasized} bold`,    // Will be rendered to: `font-weight: var(--isEmphasized) bold;` (becomes valid only when emphasized)
        color      : `${emphasizedVariantVars.isEmphasized} crimson`, // Will be rendered to: `color: var(--isEmphasized) crimson;`    (becomes valid only when emphasized)
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/emphasized-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/emphasized-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/emphasized-variant emphasizes your UI with clarity and consistency across React UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
