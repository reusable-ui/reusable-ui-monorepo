# @reusable-ui/stripped-variant 📦  

A utility for managing stripped styling (frameless, minimal layout) consistently across React components.  
Provides hooks and CSS helpers for stripped resolution and conditional styling — ideal for lists, cards, tables, and any layout elements.

## ✨ Features
✔ Boolean-based stripped variant (default), extendable to string tokens for advanced layout modes
✔ Hook-based resolution with customizable fallback behavior  
✔ CSS selectors and conditional rule helpers for stripped-aware styling  
✔ Seamless integration across appearance, spacings, and layout systems

## 📦 Installation
Install **@reusable-ui/stripped-variant** via npm or yarn:

```sh
npm install @reusable-ui/stripped-variant
# or
yarn add @reusable-ui/stripped-variant
```

## 🧩 Exported Hooks

### `useStrippedVariant(props, options)`

Resolves the stripped mode along with its associated CSS classname, based on component props and optional default configuration.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useStrippedVariant,
    StrippedVariantProps,
} from '@reusable-ui/stripped-variant';
import styles from './StrippedBox.module.css';

export interface StrippedBoxProps extends StrippedVariantProps {}

/**
 * A box that conditionally removes visual framing (no borders, no paddings) for seamless embedding.
 */
export const StrippedBox: FC<StrippedBoxProps> = (props) => {
    const {
        stripped,
        strippedClassname,
    } = useStrippedVariant(props, {
        defaultStripped: false, // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${strippedClassname}`}
            style={stripped ? {
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

#### 🧠 Stripped Resolution Strategy

The hook determines the final stripped mode using the following priority:
1. **Explicit Prop Override**  
   - If `props.stripped` is `true` or `false` or `string`, it takes precedence.
2. **Fallback Logic**  
   - Uses `options.defaultStripped` if provided.
   - Defaults to system default if none is provided.

> 🔧 Most components use `stripped` as a simple boolean (`true` or `false`).  
> For advanced layout control (e.g. `<List>`), it can be extended to string tokens like `'flat'`, `'flush'`, or `'joined'`.

---

### `useResolvedStripped(props, options)`

Resolves the current stripped variant.

Useful for derived components that need to determine the current stripped variant of the base component.

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Stripped Selectors:
    isStrippedSelector,    // Targets `.is-stripped` classes
    isNotStrippedSelector, // Targets `.not-stripped` classes
    isStrippedOfSelector,  // Targets `.is-${specificStripped}` classes
    
    // Conditional styling helpers:
    ifStripped,            // Applies styles to stripped elements
    ifNotStripped,         // Applies styles to non-stripped elements
    ifStrippedOf,          // Applies styles to elements with a specific stripped mode
} from '@reusable-ui/stripped-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifStripped({
        padding: 0,
        border: 'none',
    }),
    ...ifNotStripped({
        padding: '1rem',
        border: 'solid 1px black',
    }),
    ...ifStrippedOf('flat', {
        border: 'none',
        borderRadius: 0,
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isStrippedSelector, { // equivalent to `ifStripped`
        border: 'none',
    }),
    ...rule(isNotStrippedSelector, { // equivalent to `ifNotStripped`
        border: 'solid 1px black',
    }),
    ...rule(isStrippedOfSelector('flat'), { // equivalent to `ifStrippedOf('flat')`
        borderRadius: 0,
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usingStrippedVariant()`

Generates CSS rules that toggle stripped-related CSS variables based on current stripped mode, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usingStrippedVariant,
} from '@reusable-ui/stripped-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        strippedVariantRule,
        strippedVariantVars: { isStripped, notStripped },
    } = usingStrippedVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply stripped-related variable rules:
        ...strippedVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on current stripped mode:
        ...fallback({
            // Stripped styling:
            fontWeight     : `${isStripped} lighter`,
            textDecoration : `${isStripped} underline`,
        }),
        ...fallback({
            // Non-stripped styling:
            fontWeight     : `${notStripped} normal`,
            textDecoration : `${notStripped} none`,
        }),
    });
};
```

#### 🧠 How It Works

- `usingStrippedVariant()` generates scoped rules like:
    ```css
    &.is-stripped {
        --isStripped: ;       /* Valid    when stripped. */
        --notStripped: unset; /* Poisoned when stripped. */
    }
    
    &.not-stripped {
        --isStripped: unset;  /* Poisoned when not stripped. */
        --notStripped: ;      /* Valid    when not stripped. */
    }
    ```
- These variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        fontWeight     : `${strippedVariantVars.isStripped} lighter`,   // Will be rendered to: `font-weight: var(--isStripped) lighter;`       (becomes valid only when stripped)
        textDecoration : `${strippedVariantVars.isStripped} underline`, // Will be rendered to: `text-decoration: var(--isStripped) underline;` (becomes valid only when stripped)
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/stripped-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/stripped-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/stripped-variant helps you build content-first UIs with elegant, minimal styling.**  
Give it a ⭐ on GitHub if you find it useful!  
