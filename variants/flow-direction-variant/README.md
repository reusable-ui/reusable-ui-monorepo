# @reusable-ui/flow-direction-variant 📦  

A utility for managing flow directions consistently across React components.  
Provides hooks and CSS helpers for flow direction resolution, placement flow, and conditional styling — ideal for dropdowns, tooltips, and other flow-aware UI elements.

## ✨ Features
✔ Direction-aware edge placement support (`start`, `end`)  
✔ CSS selectors and conditional rule helpers for direction-aware styling  
✔ Works with LTR/RTL and vertical writing modes  
✔ Seamless integration across layout, appearance, and alignment systems

## 📦 Installation
Install **@reusable-ui/flow-direction-variant** via npm or yarn:

```sh
npm install @reusable-ui/flow-direction-variant
# or
yarn add @reusable-ui/flow-direction-variant
```

## 🧩 Exported Hooks

### `useFlowDirectionVariant(props, options)`

Resolves the flow direction value along with its associated CSS class name, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useFlowDirectionVariant,
    FlowDirectionVariantProps,
} from '@reusable-ui/flow-direction-variant';
import styles from './PlacementArrow.module.css';

export interface PlacementArrowProps extends FlowDirectionVariantProps {
    children?: React.ReactNode
}

/**
 * Direction-sensitive arrow indicator.
 * Expands from either the logical start or end edge based on flow context.
 */
export const PlacementArrow: FC<PlacementArrowProps> = (props) => {
    const {
        flowDirection,
        flowDirectionClassname,
    } = useFlowDirectionVariant(props, {
        defaultFlowDirection: 'end', // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.arrow} ${flowDirectionClassname}`}
        >
            <span className={styles.tip} />
            <div className={styles.content}>
                {props.children ?? 'Tooltip content'}
            </div>
        </div>
    );
};
```

#### 🧠 Flow Direction Resolution Strategy

The hook determines the final flow direction using the following priority:
1. **Explicit Prop Override**  
   - If `props.flowDirection` is `'start'` or `'end'`, it takes precedence.
2. **Relative Resolution**  
   - If set to `'inherit'`, uses the value from context, if available (`FlowDirectionVariantProvider`).
   - If set to `'invert'`, flips the inherited value (`'start' ⇄ 'end'`).
3. **Fallback Logic**  
   - Uses `options.defaultFlowDirection` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<FlowDirectionVariantProvider>` to share flow direction with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    FlowDirectionVariantProps,
    FlowDirectionVariantProvider,
    useFlowDirectionVariant,
} from '@reusable-ui/flow-direction-variant';

export interface ParentComponentProps extends FlowDirectionVariantProps {
    children ?: ReactNode
}

/**
 * A component that shares its flow direction with descendant components.
 */
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve flow direction value from props:
    const { flowDirection } = useFlowDirectionVariant(props, {
        defaultFlowDirection: 'end', // fallback if not provided
    });
    
    // Propagate flow direction value to descendants:
    return (
        <FlowDirectionVariantProvider flowDirection={flowDirection}>
            {props.children}
        </FlowDirectionVariantProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Directional Selectors:
    isFlowDirectionStartSelector, // Targets `.f-start` classes
    isFlowDirectionEndSelector,   // Targets `.f-end` classes
    
    // Conditional styling helpers:
    ifFlowDirectionStart,         // Applies styles to start edge aligned elements
    ifFlowDirectionEnd,           // Applies styles to end edge aligned elements
} from '@reusable-ui/flow-direction-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    display: 'grid',
    ...ifFlowDirectionStart({
        justifyContent: 'start',
    }),
    ...ifFlowDirectionEnd({
        justifyContent: 'end',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isFlowDirectionStartSelector, { // equivalent to `ifFlowDirectionStart`
        textAlign: 'start',
    }),
    ...rule(isFlowDirectionEndSelector, { // equivalent to `ifFlowDirectionEnd`
        textAlign: 'end',
    }),
});
```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/flow-direction-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/flow-direction-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/flow-direction-variant makes logical flow styling predictable, accessible, and adaptable across React UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
