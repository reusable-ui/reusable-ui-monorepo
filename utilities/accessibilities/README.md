# @reusable-ui/accessibilities ♿  

A lightweight, type-safe utility for managing **cascading accessibility state** (`enabled`, `readOnly`, `active`) in reusable React components.  
This package provides tools like `useResolvedAccessibilityState()` to handle both **local props** and **contextual inheritance** — ensuring consistent behavior and accessibility compliance across component hierarchies.

## ✨ Features
✔ Declarative resolution of `enabled`, `readOnly`, and `active` state  
✔ Optional cascading from ancestor context with fine-grained control  
✔ Smart defaulting for standalone usage  
✔ Lightweight and memoized for performance  

## 📦 Installation
Install **@reusable-ui/accessibilities** via npm or yarn:

```sh
npm install @reusable-ui/accessibilities
# or
yarn add @reusable-ui/accessibilities
```

## 🔁 Exported Hooks & Components

### `useResolvedAccessibilityState(props)`
Resolves the final `enabled`, `readOnly`, and `active` state by combining local props with context (if cascading is enabled).

```tsx
import {
  type AccessibilityProps,
  useResolvedAccessibilityState,
  AccessibilityProvider,
} from '@reusable-ui/accessibilities';

interface ToggleButtonProps extends AccessibilityProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ToggleButton = (props: ToggleButtonProps) => {
    const {
        enabled,
        readOnly,
        active,
        
        cascadeEnabled,
        cascadeReadOnly,
        cascadeActive,
        
        onClick,
    } = props;
    
    const {
        enabled  : computedEnabled,
        readOnly : computedReadOnly,
        active   : computedActive,
    } = useResolvedAccessibilityState({
        enabled,
        readOnly,
        active,
        
        cascadeEnabled,
        cascadeReadOnly,
        cascadeActive,
    });
    
    return (
        <button
            type='button'
            
            disabled={!computedEnabled}
            aria-readonly={computedReadOnly || undefined}
            aria-pressed={computedActive || undefined}
            
            onClick={enabled && !readOnly ? onClick : undefined}
        >
            Toggle
        </button>
    );
};
```

### `AccessibilityProvider`
Wraps part of your component tree to provide accessibility context (`enabled`, `readOnly`, `active`) to descendants.

```tsx
<AccessibilityProvider enabled={false}>
    <ToggleButton /> {/* The child will inherit `enabled = false` */}
</AccessibilityProvider>
```

## 🧩 Use Cases

- Respect parent `readOnly` or `disabled` state in deeply nested components
- Compose opt-in cascading for accessibility inheritance
- Build accessible form controls with minimal prop wiring

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/accessibilities** is a foundational logic module within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/accessibilities**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/accessibilities lets your components adapt, respect, and respond — predictably and accessibly.**  
Give it a ⭐ on GitHub if you find it useful!  
