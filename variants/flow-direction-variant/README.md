# @reusable-ui/flow-direction-variant 📦  

A utility for managing component flow directions consistently across React projects.  
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

```ts
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

The hook evaluates the effective flow direction using a tiered approach:
1. **Explicit Prop Override**  
   - If `props.flowDirection` is set to `'start'` or `'end'`, it takes precedence.
2. **Relative Resolution**  
   - If no parent context found, skip to next step.
   - If set to `'inherit'`, it adopts flow direction from a parent context (`FlowDirectionVariantProvider`).
   - If set to `'invert'`, it flips the parent flow direction (`'start' ⇄ 'end'`).
3. **Fallback Options**  
   - Uses `options.defaultFlowDirection` if provided.
   - Falls back to system default if all else fails.

#### 🧬 Example with `inherit` and `invert`

```tsx
import {
    FlowDirectionVariantProvider,
    useFlowDirectionVariant,
} from '@reusable-ui/flow-direction-variant';

const ParentComponent = () => (
    <FlowDirectionVariantProvider flowDirection='start'>
        <ChildComponent />
    </FlowDirectionVariantProvider>
);

const ChildComponent = () => {
    const { flowDirection, flowDirectionClassname } = useFlowDirectionVariant({
        flowDirection: 'inherit', // or 'invert'
    });
    
    return <div className={flowDirectionClassname}>I'm {flowDirection}</div>;
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Directional Selectors:
    flowDirectionStartSelector,  // Targets `.f-start` classes
    flowDirectionEndSelector,    // Targets `.f-end` classes
    
    // Conditional Rule Helpers:
    ifFlowDirectionStart,        // Applies styles for start placement
    ifFlowDirectionEnd,          // Applies styles for end placement
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
    ...rule(flowDirectionStartSelector, { // equivalent to `ifFlowDirectionStart`
        textAlign: 'start',
    }),
    ...rule(flowDirectionEndSelector, {// equivalent to `ifFlowDirectionEnd`
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
