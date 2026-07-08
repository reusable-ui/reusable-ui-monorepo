# @reusable-ui/flow-direction-variant 📦  

A utility for managing flow directions consistently across React components.  
Provides hooks and CSS helpers for flow direction resolution, placement flow, and conditional styling — ideal for dropdowns, tooltips, and other flow-aware UI elements.

## ✨ Features
✔ Direction-aware edge placement support (`start`, `end`)  
✔ Hook-based resolution with customizable fallback behavior  
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

### `useResolvedFlowDirection(props, options)`

Resolves the current flow direction variant.

Useful for derived components that need to determine the current flow direction of the base component.

Resolution priority:
- `'inherit'` : uses the flow direction value from context.
- `'invert'`  : flips the flow direction value from context (`'start'` ⇄ `'end'`).
- Otherwise   : uses the explicitly provided flow direction value as-is.

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

## 🧩 Exported CSS Hooks

### `usingFlowDirectionVariant()`

Generates CSS rules that toggle flow-direction-related CSS variables based on the current flow direction mode, and exposes those variables for conditional styling.

#### 💡 Usage Example

```ts
import {
    usingFlowDirectionVariant,
} from '@reusable-ui/flow-direction-variant';
import { style, fallback } from '@cssfn/core';

export const componentStyle = () => {
    const {
        flowDirectionVariantRule,
        flowDirectionVariantVars: { isFlowDirectionStart, isFlowDirectionEnd, flowDirectionFactor },
    } = usingFlowDirectionVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply flow-direction-related variable rules:
        ...flowDirectionVariantRule(),
        
        // Tips: Use `fallback()` to apply duplicate CSS properties without overriding — ensures all declarations are preserved:
        
        // Apply conditional styling based on the flow direction mode:
        ...fallback({
            // Start-edge flow direction styling:
            textAlign      : `${isFlowDirectionStart} start`,
            justifyContent : `${isFlowDirectionStart} start`,
        }),
        ...fallback({
            // End-edge flow direction styling:
            textAlign      : `${isFlowDirectionEnd} end`,
            justifyContent : `${isFlowDirectionEnd} end`,
        }),
        opacity: `calc(1 - ${flowDirectionFactor})`,
    });
};
```

#### 🧠 How It Works

- `usingFlowDirectionVariant()` generates scoped rules like:
    ```css
    &.f-start {
        --isFlowDirectionStart: ;      /* Valid    when aligned toward the logical start edge. */
        --isFlowDirectionEnd: unset;   /* Poisoned when aligned toward the logical start edge. */
        
        --flowDirectionFactor: 0;      /* 0 → aligned toward the logical start edge. */
    }
    
    &.f-end {
        --isFlowDirectionStart: unset; /* Poisoned when aligned toward the logical end edge. */
        --isFlowDirectionEnd: ;        /* Valid    when aligned toward the logical end edge. */
        
        --flowDirectionFactor: 1;      /* 1 → aligned toward the logical end edge. */
    }
    ```
- These first two variables act as conditional switches:
    - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
    - If declared with an empty value, they **reactivate** dependent properties without altering their values.
- You can use them directly in your styles:
    ```ts
    style({
        textAlign      : `${flowDirectionVariantVars.isFlowDirectionStart} start`, // Will be rendered to: `text-align: var(--isFlowDirectionStart) start;`      (becomes valid only when aligned toward the logical start edge)
        justifyContent : `${flowDirectionVariantVars.isFlowDirectionStart} start`, // Will be rendered to: `justify-content: var(--isFlowDirectionStart) start;` (becomes valid only when aligned toward the logical start edge)
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
