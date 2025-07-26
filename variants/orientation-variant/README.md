# @reusable-ui/orientation-variant 📦  

A utility for managing component orientations consistently across React projects.  
Provides hooks and CSS helpers for orientation resolution and conditional styling — ideal for dropdowns, lists, cards, tooltips, and layout-adaptive UI elements.

## ✨ Features
✔ Orientation-aware layout primitives (`inline`, `block`)  
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

Resolves the orientation value along with its associated CSS class name and accessibility metadata, based on component props and optional default configuration.

#### 💡 Usage Example

```ts
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

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Orientation Selectors:
    orientationInlineSelector, // Targets `.o-inline` classes
    orientationBlockSelector,  // Targets `.o-block` classes
    
    // Conditional Rule Helpers:
    ifOrientationInline,       // Applies styles for horizontal (inline) orientation
    ifOrientationBlock,        // Applies styles for vertical (block) orientation
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
    ...rule(orientationInlineSelector, { // equivalent to `ifOrientationInline`
        textAlign: 'start',
    }),
    ...rule(orientationBlockSelector, { // equivalent to `ifOrientationBlock`
        textAlign: 'center',
    }),
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
