# @reusable-ui/bare-variant 📦  

A utility for managing bare styling (frameless, minimal layout) consistently across React components.  
Provides hooks and CSS helpers for bare-enabled resolution and conditional styling — ideal for lists, cards, tables, and any layout elements.

## ✨ Features
✔ Boolean-based bare variant (default), extendable to string tokens for advanced layout modes
✔ Hook-based resolution with customizable fallback behavior  
✔ CSS selectors and conditional rule helpers for bare-aware styling  
✔ Seamless integration across appearance, spacings, and layout systems

## 📦 Installation
Install **@reusable-ui/bare-variant** via npm or yarn:

```sh
npm install @reusable-ui/bare-variant
# or
yarn add @reusable-ui/bare-variant
```

## 🧩 Exported Hooks

### `useBareVariant(props, options)`

Resolves the bare state along with its associated CSS class name, based on component props and optional default configuration.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useBareVariant,
    BareVariantProps,
} from '@reusable-ui/bare-variant';
import styles from './BareBox.module.css';

export interface BareBoxProps extends BareVariantProps {}

/**
 * A box that conditionally removes visual framing (no borders, no paddings) for seamless embedding.
 */
export const BareBox: FC<BareBoxProps> = (props) => {
    const {
        bare,
        bareClassname,
    } = useBareVariant(props, {
        defaultBare: false, // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${bareClassname}`}
            style={bare ? {
                // Kills padding and border:
                padding: 0,
                border: 'none',
            } : undefined}
        >
            <p>Some contents go here.</p>
        </div>
    );
};
```

#### 🧠 Bare-Enables Resolution Strategy

The hook determines the final bare state using the following priority:
1. **Explicit Prop Override**  
   - If `props.bare` is `true` or `false` or `string`, it takes precedence.
2. **Fallback Logic**  
   - Uses `options.defaultBare` if provided.
   - Defaults to system default if none is provided.

> 🔧 Most components use `bare` as a simple boolean (`true` or `false`).  
> For advanced layout control (e.g. `<List>`), it can be extended to string tokens like `'flat'`, `'flush'`, or `'joined'`.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Bare Selectors:
    isBareSelector,    // Targets `.is-bare` classes
    isNotBareSelector, // Targets `.not-bare` classes
    isBareOfSelector,  // Targets `.is-${specificBare}` classes
    
    // Conditional styling helpers:
    ifBare,            // Applies styles to bare elements
    ifNotBare,         // Applies styles to non-bare elements
    ifBareOf,          // Applies styles to elements with a specific bare mode
} from '@reusable-ui/bare-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifBare({
        padding: 0,
        border: 'none',
    }),
    ...ifNotBare({
        padding: '1rem',
        border: 'solid 1px black',
    }),
    ...ifBareOf('flat', {
        border: 'none',
        borderRadius: 0,
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isBareSelector, { // equivalent to `ifBare`
        border: 'none',
    }),
    ...rule(isNotBareSelector, { // equivalent to `ifNotBare`
        border: 'solid 1px black',
    }),
    ...rule(isBareOfSelector('flat'), { // equivalent to `ifBareOf('flat')`
        borderRadius: 0,
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesBareVariant()`

Generates CSS rules that toggle bare-related CSS variables based on the current bare mode, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usesBareVariant,
} from '@reusable-ui/bare-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        bareVariantRule,
        bareVariantVars: { isBare, notBare },
    } = usesBareVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply bare-related variable rules:
        ...bareVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on bare mode:
        ...fallback({
            // Bare styling:
            fontWeight     : `${isBare} lighter`,
            textDecoration : `${isBare} underline`,
        }),
        ...fallback({
            // Non-bare styling:
            fontWeight     : `${notBare} normal`,
            textDecoration : `${notBare} none`,
        }),
    });
};
```

#### 🧠 How It Works

- `usesBareVariant()` generates scoped rules like:
    ```css
    &.is-bare {
        --isBare: ;       /* Valid    when bare mode is enabled. */
        --notBare: unset; /* Poisoned when bare mode is enabled. */
    }
    
    &.not-bare {
        --isBare: unset;  /* Poisoned when bare mode is disabled. */
        --notBare: ;      /* Valid    when bare mode is disabled. */
    }
    ```
- These variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        fontWeight     : `${bareVariantVars.isBare} lighter`,   // Will be rendered to: `font-weight: var(--isBare) lighter;`       (becomes valid only when in bare mode)
        textDecoration : `${bareVariantVars.isBare} underline`, // Will be rendered to: `text-decoration: var(--isBare) underline;` (becomes valid only when in bare mode)
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/bare-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/bare-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/bare-variant helps you build content-first UIs with elegant, minimal styling.**  
Give it a ⭐ on GitHub if you find it useful!  
