# @reusable-ui/orientation-variant 📦  

A utility for managing orientations consistently across React components.  
Provides hooks and CSS helpers for orientation resolution and conditional styling — ideal for dropdowns, lists, cards, tooltips, and layout-adaptive UI elements.

## ✨ Features
✔ Orientation-aware layout primitives (`inline`, `block`)  
✔ Hook-based resolution with customizable fallback behavior  
✔ ARIA-compliant orientation attributes  
✔ CSS selectors and conditional rule helpers for orientation-aware styling  
✔ Seamless integration across layout, appearance, and alignment systems

## 📦 Installation
Install **@reusable-ui/orientation-variant** via npm or yarn:

```sh
npm install @reusable-ui/orientation-variant
# or
yarn add @reusable-ui/orientation-variant
```

## 🧩 Exported Hooks

### `useOrientationVariant(props, options)`

Resolves the orientation value along with its associated CSS class name and accessibility metadata, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useOrientationVariant,
    OrientationVariantProps,
} from '@reusable-ui/orientation-variant';
import styles from './OrientationBox.module.css';

export interface OrientationBoxProps extends OrientationVariantProps {}

/**
 * A layout container that adapts to horizontal or vertical orientation.
 */
export const OrientationBox: FC<OrientationBoxProps> = (props) => {
    const {
        orientation,
        orientationClassname,
        isOrientationInline,
        isOrientationBlock,
        ariaOrientation,
    } = useOrientationVariant(props, {
        defaultOrientation: 'block', // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${orientationClassname}`}
            aria-orientation={ariaOrientation}
        >
            {isOrientationInline && (
                <div className={styles.inlineContent}>
                    <h4>Horizontal Layout</h4>
                    <p>Rendering horizontal content based on logical flow.</p>
                </div>
            )}
            {isOrientationBlock && (
                <div className={styles.blockContent}>
                    <h4>Vertical Layout</h4>
                    <p>Rendering vertical content in a block-oriented flow.</p>
                </div>
            )}
        </div>
    );
};
```

#### 🧠 Orientation Resolution Strategy

The hook determines the final orientation using the following priority:
1. **Explicit Prop Override**  
   - If `props.orientation` is `'inline'` or `'block'`, it takes precedence.
2. **Relative Resolution**  
   - If set to `'inherit'`, uses the value from context, if available (`OrientationVariantProvider`).
   - If set to `'invert'`, flips the inherited value (`'inline' ⇄ 'block'`).
3. **Fallback Logic**  
   - Uses `options.defaultOrientation` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<OrientationVariantProvider>` to share orientation with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    OrientationVariantProps,
    OrientationVariantProvider,
    useOrientationVariant,
} from '@reusable-ui/orientation-variant';

export interface ParentComponentProps extends OrientationVariantProps {
    children ?: ReactNode
}

/**
 * A component that shares its orientation with descendant components.
 */
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve orientation value from props:
    const { orientation } = useOrientationVariant(props, {
        defaultOrientation: 'block', // fallback if not provided
    });
    
    // Propagate orientation value to descendants:
    return (
        <OrientationVariantProvider orientation={orientation}>
            {props.children}
        </OrientationVariantProvider>
    );
};
```

---

### `useResolvedOrientation(props, options)`

Resolves the current orientation variant.

Useful for derived components that need to determine the current orientation of the base component.

Resolution priority:
- `'inherit'` : uses the orientation value from context.
- `'invert'`  : flips the orientation value from context (`'inline'` ⇄ `'block'`).
- Otherwise   : uses the explicitly provided orientation value as-is.

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Orientation Selectors:
    isOrientationInlineSelector, // Targets `.o-inline` classes
    isOrientationBlockSelector,  // Targets `.o-block` classes
    
    // Conditional styling helpers:
    ifOrientationInline,         // Applies styles to horizontal (inline) oriented elements
    ifOrientationBlock,          // Applies styles to vertical (block) oriented elements
} from '@reusable-ui/orientation-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    display: 'flex',
    ...ifOrientationInline({
        flexDirection: 'row',
    }),
    ...ifOrientationBlock({
        flexDirection: 'column',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isOrientationInlineSelector, { // equivalent to `ifOrientationInline`
        textAlign: 'start',
    }),
    ...rule(isOrientationBlockSelector, { // equivalent to `ifOrientationBlock`
        textAlign: 'center',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usingOrientationVariant()`

Generates CSS rules that toggle orientation-related CSS variables based on the current orientation mode, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usingOrientationVariant,
} from '@reusable-ui/orientation-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        orientationVariantRule,
        orientationVariantVars: { isOrientationInline, isOrientationBlock, orientationFactor },
    } = usingOrientationVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply orientation-related variable rules:
        ...orientationVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on orientation mode:
        ...fallback({
            // Horizontal (inline) orientation styling:
            flexDirection : `${isOrientationInline} row`,
            textAlign     : `${isOrientationInline} start`,
        }),
        ...fallback({
            // Vertical (block) orientation styling:
            flexDirection : `${isOrientationBlock} column`,
            textAlign     : `${isOrientationBlock} center`,
        }),
        opacity: `calc(1 - ${orientationFactor})`,
    });
};
```

#### 🧠 How It Works

- `usingOrientationVariant()` generates scoped rules like:
    ```css
    &.o-inline {
        --isOrientationInline: ;      /* Valid    when oriented horizontally (inline). */
        --isOrientationBlock: unset;  /* Poisoned when oriented horizontally (inline). */
        
        --orientationFactor: 0;       /* 0 → oriented horizontally (inline). */
    }
    
    &.o-block {
        --isOrientationInline: unset; /* Poisoned when oriented vertically (block). */
        --isOrientationBlock: ;       /* Valid    when oriented vertically (block). */
        
        --orientationFactor: 1;       /* 1 → oriented vertically (block). */
    }
    ```
- These first two variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        flexDirection : `${orientationVariantVars.isOrientationBlock} column`, // Will be rendered to: `flex-direction: var(--isOrientationBlock) column;` (becomes valid only when oriented vertically)
        textAlign     : `${orientationVariantVars.isOrientationBlock} center`, // Will be rendered to: `text-align: var(--isOrientationBlock) center;`     (becomes valid only when oriented vertically)
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/orientation-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/orientation-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/orientation-variant empowers consistent orientation-based styling across React UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
