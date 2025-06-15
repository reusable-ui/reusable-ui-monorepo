# @reusable-ui/events ⚡  

A lightweight **React utility** for managing controlled, uncontrolled, and hybrid state updates.  
This package provides **hooks** for predictable state management alongside **synthetic event utilities** for enhanced compatibility.

## ✨ Features
✔ **Unified API for managing UI state changes**  
✔ **Supports controlled, uncontrolled, and hybrid behaviors**  
✔ **Ensures seamless event compatibility across components**  
✔ **Optimized for React applications and reusable patterns**  

## 📦 Installation
Install **@reusable-ui/events** via npm or yarn:

```sh
npm install @reusable-ui/events
# or
yarn add @reusable-ui/events
```

## 🔁 Exported Hooks & Functions

### `useControllableValueChange<TValue, TChangeEvent>()`
Handles **fully controllable components**, ensuring state is **externally managed**.  
Every update triggers `onValueChange`, requesting an **external state update**.

```tsx
import { useControllableValueChange } from '@reusable-ui/events'

export interface ExampleComponentProps {
    active          : boolean
    onActiveChange ?: (newActive: boolean, event: Event) => void
}

export const ExampleComponent = (props: ExampleComponentProps) => {
    const {
        active,
        onActiveChange
    } = props;
    
    const { value: isActive, triggerValueChange } = useControllableValueChange<boolean, Event>({
        value         : active,
        onValueChange : onActiveChange,
    });
    
    return (
        <button onClick={() => triggerValueChange(!isActive, new Event('active', { bubbles: true, cancelable: false }))}>
            {isActive ? 'Active' : 'Inactive'}
        </button>
    );
};
```

### `useUncontrollableValueChange<TValue, TChangeEvent>()`
Handles **internally managed state**, requiring a **`defaultValue`** for initialization.  
Every update triggers `onValueChange`, notifying the **internal state change**.

```tsx
import { useUncontrollableValueChange } from '@reusable-ui/events'

export interface ExampleComponentProps {
    defaultActive  ?: boolean
    onActiveChange ?: (newActive: boolean, event: Event) => void
}

export const ExampleComponent = (props: ExampleComponentProps) => {
    const {
        defaultActive = false, // Requires a default value to initialize the internal state.
        onActiveChange
    } = props;
    
    const { value: isActive, triggerValueChange } = useUncontrollableValueChange<boolean, Event>({
        defaultValue  : defaultActive,
        onValueChange : onActiveChange,
    });
    
    return (
        <button onClick={() => triggerValueChange(!isActive, new Event('active', { bubbles: true, cancelable: false }))}>
            {isActive ? 'Active' : 'Inactive'}
        </button>
    );
};
```

### `useHybridValueChange<TValue, TChangeEvent>()`
Supports **both controlled and uncontrolled behaviors**, ensuring **flexibility**.  
If `value` is provided, it acts as **controllable**, otherwise, it becomes **uncontrollable**.

```tsx
import { useHybridValueChange } from '@reusable-ui/events'

export interface ExampleComponentProps {
    defaultActive  ?: boolean
    active         ?: boolean
    onActiveChange ?: (newActive: boolean, event: Event) => void
}

export const ExampleComponent = (props: ExampleComponentProps) => {
    const {
        defaultActive = false, // Requires a default value to initialize the internal state.
        active,
        onActiveChange
    } = props;
    
    const { value: isActive, triggerValueChange } = useHybridValueChange<boolean, Event>({
        defaultValue  : defaultActive,
        value         : active,
        onValueChange : onActiveChange,
    });
    
    return (
        <button onClick={() => triggerValueChange(!isActive, new Event('active', { bubbles: true, cancelable: false }))}>
            {isActive ? 'Active' : 'Inactive'}
        </button>
    );
};
```

### `createSyntheticEvent<TElement, TEvent>()`
Generates a **React-compatible synthetic event**, ensuring cross-framework consistency.

### `createSyntheticUIEvent<TElement, TEvent>()`
Generates a **React-compatible synthetic UI events**, supporting accessibility refinements.

### `createSyntheticMouseEvent<TElement, TEvent>()`
Generates a **React-compatible synthetic mouse events**, ideal for drag-and-drop components.

### `createSyntheticKeyboardEvent<TElement, TEvent>()`
Generates a **React-compatible synthetic keyboard events**, perfect for keyboard shortcuts and UI interactions.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/events** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/events**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/events simplifies state handling and event compatibility in React!**  
Give it a ⭐ on GitHub if you find it useful!  
