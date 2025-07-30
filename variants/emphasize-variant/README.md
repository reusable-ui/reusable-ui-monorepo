# @reusable-ui/emphasize-variant 📦  

A utility for managing visual emphasis consistently across React components.  
Provides hooks and CSS helpers for emphasis resolution and conditional styling — ideal for buttons, cards, badges, alerts, or any component that requires visual prioritization.

## ✨ Features
✔ Boolean-based emphasize variant with inheritance and inversion  
✔ Hook-based resolution with customizable fallback behavior  
✔ CSS selectors and conditional rule helpers for emphasis-aware styling  
✔ Seamless integration appearance, layout, and interaction systems

## 📦 Installation
Install **@reusable-ui/emphasize-variant** via npm or yarn:

```sh
npm install @reusable-ui/emphasize-variant
# or
yarn add @reusable-ui/emphasize-variant
```

## 🧩 Exported Hooks

### `useEmphasizeVariant(props, options)`

Resolves the emphasized state along with its associated CSS class name, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useEmphasizeVariant,
    EmphasizeVariantProps,
} from '@reusable-ui/emphasize-variant';
import styles from './EmphasizedBox.module.css';

export interface EmphasizedBoxProps extends EmphasizeVariantProps {}

/**
 * A box that conditionally emphasizes its appearance.
 */
export const EmphasizedBox: FC<EmphasizedBoxProps> = (props) => {
    const {
        emphasized,
        emphasizedClassname,
    } = useEmphasizeVariant(props, {
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
   - If set to `'inherit'`, pulls value from context if provided (`EmphasizeVariantProvider`).
   - If set to `'invert'`, reverses the inherited value (`true ⇄ false`).
3. **Fallback Logic**  
   - Uses `options.defaultEmphasized` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<EmphasizeVariantProvider>` to share emphasized state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    EmphasizeVariantProps,
    EmphasizeVariantProvider,
    useEmphasizeVariant,
} from '@reusable-ui/emphasize-variant';

export interface ParentComponentProps extends EmphasizeVariantProps {
    children ?: ReactNode
}

/**
 * A component that shares its emphasized state with descendant components.
 */
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve emphasized state from props:
    const { emphasized } = useEmphasizeVariant(props, {
        defaultEmphasized: false, // fallback if not provided
    });
    
    // Propagate emphasized state to descendants:
    return (
        <EmphasizeVariantProvider emphasized={emphasized}>
            {props.children}
        </EmphasizeVariantProvider>
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
} from '@reusable-ui/emphasize-variant';
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

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/emphasize-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/emphasize-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/emphasize-variant emphasize your UI with clarity and consistency across React UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
