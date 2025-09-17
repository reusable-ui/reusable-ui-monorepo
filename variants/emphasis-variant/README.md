# @reusable-ui/emphasis-variant 📦  

A utility for managing visual emphasis consistently across React components.  
Provides hooks and CSS helpers for emphasis resolution and conditional styling — ideal for buttons, cards, badges, alerts, or any component that requires visual prioritization.

## ✨ Features
✔ Boolean-based emphasis variant with inheritance and inversion  
✔ Hook-based resolution with customizable fallback behavior  
✔ CSS selectors and conditional rule helpers for emphasis-aware styling  
✔ Seamless integration across appearance, layout, and interaction systems

## 📦 Installation
Install **@reusable-ui/emphasis-variant** via npm or yarn:

```sh
npm install @reusable-ui/emphasis-variant
# or
yarn add @reusable-ui/emphasis-variant
```

## 🧩 Exported Hooks

### `useEmphasisVariant(props, options)`

Resolves the emphasized state along with its associated CSS class name, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useEmphasisVariant,
    EmphasisVariantProps,
} from '@reusable-ui/emphasis-variant';
import styles from './EmphasizedBox.module.css';

export interface EmphasizedBoxProps extends EmphasisVariantProps {}

// A box that conditionally emphasizes its appearance.
export const EmphasizedBox: FC<EmphasizedBoxProps> = (props) => {
    const {
        emphasized,
        emphasisClassname,
    } = useEmphasisVariant(props, {
        defaultEmphasized: false, // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${emphasisClassname}`}
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
   - If set to `'inherit'`, uses the value from context, if available (`EmphasisVariantProvider`).
   - If set to `'invert'`, flips the inherited value (`true` ⇄ `false`).
3. **Fallback Logic**  
   - Uses `options.defaultEmphasized` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<EmphasisVariantProvider>` to share emphasized state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    EmphasisVariantProps,
    EmphasisVariantProvider,
    useEmphasisVariant,
} from '@reusable-ui/emphasis-variant';

export interface ParentComponentProps extends EmphasisVariantProps {
    children ?: ReactNode
}

// A component that shares its emphasized state with descendant components.
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve emphasized state from props:
    const { emphasized } = useEmphasisVariant(props, {
        defaultEmphasized: false, // fallback if not provided
    });
    
    // Propagate emphasized state to descendants:
    return (
        <EmphasisVariantProvider emphasized={emphasized}>
            {props.children}
        </EmphasisVariantProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Emphasis Selectors:
    isEmphasizedSelector,    // Targets `.is-emphasized` classes
    isNotEmphasizedSelector, // Targets `.not-emphasized` classes
    
    // Conditional styling helpers:
    ifEmphasized,            // Applies styles to emphasized elements
    ifNotEmphasized,         // Applies styles to non-emphasized elements
} from '@reusable-ui/emphasis-variant';
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

### `usesEmphasisVariant()`

Generates CSS rules that toggle emphasis-related CSS variables based on the current emphasized state, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usesEmphasisVariant,
} from '@reusable-ui/emphasis-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        emphasisVariantRule,
        emphasisVariantVars: { isEmphasized, notEmphasized },
    } = usesEmphasisVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply emphasis-related variable rules:
        ...emphasisVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on emphasized mode:
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
    });
};
```

#### 🧠 How It Works

- `usesEmphasisVariant()` generates scoped rules like:
    ```css
    &.is-emphasized {
        --isEmphasized: ;       /* Valid    when emphasized. */
        --notEmphasized: unset; /* Poisoned when emphasized. */
    }
    
    &.not-emphasized {
        --isEmphasized: unset;  /* Poisoned when not emphasized. */
        --notEmphasized: ;      /* Valid    when not emphasized. */
    }
    ```
- These variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        fontWeight : `${emphasisVariantVars.isEmphasized} bold`,    // Will be rendered to: `font-weight: var(--isEmphasized) bold;` (becomes valid only when emphasized)
        color      : `${emphasisVariantVars.isEmphasized} crimson`, // Will be rendered to: `color: var(--isEmphasized) crimson;`    (becomes valid only when emphasized)
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/emphasis-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/emphasis-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/emphasis-variant emphasizes your UI with clarity and consistency across React UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
