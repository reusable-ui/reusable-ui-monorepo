# @reusable-ui/orientation-variant 📦  

A utility for managing UI orientation consistently across React components.  
This package provides hooks and CSS helpers for handling axis direction, placement flow, and conditional styling — ideal for dropdowns, lists, cards, tooltips, and other flow-aware UI elements.

## ✨ Features
✔ Axis-aware layout primitives (`inline` / `block`)  
✔ Directional placement support (`start` / `end`)  
✔ ARIA-compliant orientation attributes  
✔ CSS selectors and rule helpers for conditional styling  
✔ Reusable across layout, placement, and alignment systems

## 📦 Installation
Install **@reusable-ui/orientation-variant** via npm or yarn:

```sh
npm install @reusable-ui/orientation-variant
# or
yarn add @reusable-ui/orientation-variant
```

## 🧩 Exported Hooks

### `useAxisOrientationVariant(props, options)`

Resolves axis orientation, corresponding class name, and accessibility attribute of a component based on its props and system defaults.

#### 💡 Usage Example

```ts
import React, { FC } from 'react';
import {
    useAxisOrientationVariant,
    AxisOrientationVariantProps,
} from '@reusable-ui/orientation-variant';
import styles from 'OrientationBox.module.css';

export interface OrientationBoxProps extends AxisOrientationVariantProps {}

/**
 * Layout-aware box that adapts its flow direction.
 */
export const OrientationBox : FC<OrientationBoxProps> = (props) => {
    const {
        orientation,
        orientationClassname,
        isOrientationInline,
        isOrientationBlock,
        ariaOrientation,
    } = useAxisOrientationVariant(props, {
        defaultOrientation: 'block', // fallback orientation
    });
    
    return (
        <div
            className={`${styles.box} ${orientationClassname}`}
            aria-orientation={ariaOrientation}
        >
            {isOrientationInline && (
                <div className={styles.inlineContent}>
                    Horizontal content
                </div>
            )}
            {isOrientationBlock && (
                <div className={styles.blockContent}>
                    Vertical content
                </div>
            )}
        </div>
    );
};
```

### `useDirectionalOrientationVariant(props, options)`

Resolves directional orientation, corresponding class name, and accessibility attribute of a component based on its props and system defaults.

#### 💡 Usage Example

```ts
import React, { FC } from 'react';
import {
    useDirectionalOrientationVariant,
    DirectionalOrientationVariantProps,
} from '@reusable-ui/orientation-variant';
import styles from './PlacementArrow.module.css';

export interface PlacementArrowProps extends DirectionalOrientationVariantProps {
    children?: React.ReactNode
}

/**
 * Flow-aware placement arrow component.
 */
export const PlacementArrow: FC<PlacementArrowProps> = (props) => {
    const {
        orientation,
        orientationClassname,
        isOrientationInline,
        isOrientationBlock,
        ariaOrientation,
    } = useDirectionalOrientationVariant(props, {
        defaultOrientation: 'inline-end', // fallback direction
    });
    
    return (
        <div
            className={`${styles.arrow} ${orientationClassname}`}
            aria-orientation={ariaOrientation}
        >
            <span className={styles.tip} />
            <div className={styles.content}>
                {props.children ?? 'Tooltip content'}
            </div>
            
            {isOrientationInline && <span className={styles.inlineNote}>←→ flow</span>}
            {isOrientationBlock && <span className={styles.blockNote}>↑↓ flow</span>}
        </div>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Axis Selectors:
    orientationInlineSelector, // ':is(.o-inline, .o-inline-start, .o-inline-end)'
    orientationBlockSelector,  // ':is(.o-block, .o-block-start, .o-block-end)'
    
    // Directional Selectors:
    orientationStartSelector,  // ':is(.o-inline-start, .o-block-start)'
    orientationEndSelector,    // ':is(.o-inline-end, .o-block-end)'
    
    // Conditional Rule Helpers:
    ifOrientationInline,       // Applies styles for inline axis
    ifOrientationBlock,        // Applies styles for block axis
    ifOrientationStart,        // Applies styles for start placement
    ifOrientationEnd,          // Applies styles for end placement
} from '@reusable-ui/orientation-variant';
import { style, rule } from '@cssfn/core';

const fancyComponentStyle = () => style({
    display: 'flex',
    ...ifOrientationInline({
        flexDirection: 'row',
    }),
    ...ifOrientationBlock({
        flexDirection: 'column',
        
        ...rule(orientationStartSelector, {
            textAlign: 'start',
        }),
        ...rule(orientationEndSelector, {
            textAlign: 'end',
        }),
    }),
});
```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/orientation-variant** is a styling utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/orientation-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/orientation-variant standardizes orientation-aware styling across React UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
