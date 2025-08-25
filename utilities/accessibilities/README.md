# @reusable-ui/accessibilities ♿  

A lightweight, type-safe utility for managing **cascading accessibility state** (`disabled`, `readOnly`, `active`) in reusable React components.  
This package provides tools like `useResolvedAccessibilityState()` to handle both **local props** and **contextual inheritance** — ensuring consistent behavior and accessibility compliance across component hierarchies.

## ✨ Features
✔ Declarative resolution of `disabled`, `readOnly`, and `active` states  
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
Resolves the final `disabled`, `readOnly`, and `active` states by combining local props with context (if cascading is enabled).

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
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
        
        onClick,
    } = props;
    
    const {
        disabled : computedDisabled,
        readOnly : computedReadOnly,
        active   : computedActive,
    } = useResolvedAccessibilityState({
        disabled,
        readOnly,
        active,
        
        cascadeDisabled,
        cascadeReadOnly,
        cascadeActive,
    });
    
    return (
        <button
            type='button'
            
            disabled={computedDisabled}
            aria-readonly={computedReadOnly || undefined}
            aria-pressed={computedActive || undefined}
            
            onClick={!computedDisabled && !computedReadOnly ? onClick : undefined}
        >
            Toggle
        </button>
    );
};
```

### `AccessibilityProvider`
Wraps part of your component tree to provide accessibility context (`disabled`, `readOnly`, `active`) to descendants.

```tsx
<AccessibilityProvider disabled={true}>
    <ToggleButton /> {/* The child will inherit `disabled = true` */}
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
