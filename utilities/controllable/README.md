# @reusable-ui/controllable 🕹️

Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).
These strategies define how values and updates flow between parent and child, ensuring consistent and predictable state management.

Interactive components often need to synchronize their state with a parent.  
There are three common strategies:

1. **Controlled mode** → The parent component owns the state (value). The component reflects the externally provided `value` and requests updates via `onValueChange`.  
2. **Uncontrolled mode** → The component manages its own state (value) internally, while still notifying the parent of changes.  
3. **Controllable (hybrid) mode** → The component can flexibly operate in either mode: controlled if `value` is provided, uncontrolled if not.

With **`@reusable-ui/controllable`**, you get:

- A consistent API across controlled, uncontrolled, and hybrid modes.  
- Separation of **value** and **event metadata**, making integration with React's `useState` seamless.  
- Easy migration between modes when refactoring.  

## ✨ Features
✔ **Generic value types** — works for `selected: boolean`, `text: string`, `price: number`, etc.  
✔ **Value/event separation** — updated value is passed separately from the event, so you can directly use React's `setState`.  
✔ **Event metadata optional** — pass along the triggering event if needed.  
✔ **Stable dispatcher function** — referentially stable across renders, even if `onValueChange` changes.  
✔ **Unified API** — controlled, uncontrolled, and hybrid all share the same tuple return signature.  

## 📦 Installation
Install **@reusable-ui/controllable** via npm or yarn:

```sh
npm install @reusable-ui/controllable
# or
yarn add @reusable-ui/controllable
```

## 🔧 Generic "value" Mapping

The hooks use `value`, `defaultValue`, and `onValueChange` as **generic structural names**.  
You can easily map them to any domain-specific prop names, such as `selected`, `checked`, or `text`.

This allows you to manage multiple distinct state domains inside a single component:

```tsx
import { useControllableValue, ValueChangeHandler } from '@reusable-ui/controllable'

export interface CustomWidgetProps {
    // "Selected" state domain props:
    selected         ?: boolean
    defaultSelected  ?: boolean
    onSelectedChange ?: ValueChangeHandler<boolean, React.MouseEvent>
    
    // "Text" state domain props:
    text             ?: string
    defaultText      ?: string
    onTextChange     ?: ValueChangeHandler<string, React.KeyboardEvent>
}

export const CustomWidget = (props: CustomWidgetProps) => {
    const {
        // "Selected" state domain props:
        selected,
        defaultSelected = false, // Uncontrolled mode requires a fallback default value.
        onSelectedChange,
        
        // "Text" state domain props:
        text,
        defaultText = '', // Uncontrolled mode requires a fallback default value.
        onTextChange,
    } = props;
    
    // Map "selected" props into controllable (hybrid) mode:
    const [selectedValue, dispatchSelectedChange] = useControllableValue<boolean, React.MouseEvent>({
        value         : selected,
        defaultValue  : defaultSelected,
        onValueChange : onSelectedChange,
    });
    
    // Map "text" props into controllable (hybrid) mode:
    const [textValue, dispatchTextChange] = useControllableValue<string, React.KeyboardEvent>({
        value         : text,
        defaultValue  : defaultText,
        onValueChange : onTextChange,
    });
    
    // Usage example:
    return (
        <>
            <p>Status: {selectedValue ? 'Selected' : 'Unselected'}</p>
            
            <button onClick={(event) => dispatchSelectedChange(true, event)}>Select</button>
            <button onClick={(event) => dispatchSelectedChange(false, event)}>Unselect</button>
        </>
    );
};
```

## 🔀 Separate Value and Event

Unlike standard React event handlers (e.g., `<input onChange={(event) => {...}} />`),
these handlers separate the **updated value** from the **triggering event**.

This makes integration with `useState` trivial:

```tsx
// A state for managing the value:
const [name, setName] = useState('');

// Simple case, ignore the event:
<Input
    value={name}
    onValueChange={setName} // Directly pass the state updater (the event parameter is ignored).
/>

// Event-aware case:
<Input
    value={name}
    onValueChange={(newValue, event) => {
        setName(newValue);      // Update state with the new value.
        event.preventDefault(); // Additional event handling logic can be performed here.
    }}
/>
```

## 📌 Stable Dispatcher Function

The dispatcher function returned by these hooks is **referentially stable**.  
It will not change identity across renders, even if `onValueChange` changes.  
This makes it safe to use inside `useEffect`, `useCallback`, or pass down to children without causing unnecessary re-renders.

```tsx
const [selected, dispatchSelectedChange] = useControllableValue<boolean, React.MouseEvent | undefined>(...);

useEffect(() => {
    dispatchSelectedChange(true, undefined);
}, []); // Dispatcher function is stable, no need to include in dependency array.

const handleSelect : React.MouseEventHandler = useCallback((event) => {
    dispatchSelectedChange(true, event);
}, []); // Dispatcher function is stable, no need to include in dependency array.

return (
    <NestedComponent
        onSelectedChange={dispatchSelectedChange} // Always stable by reference, safe to pass down without causing re-renders.
    />
);
```

## 🔁 Exported Hooks

### `useControlledValue(props)`

Provides a **fully controlled** value.

Use when the parent component owns the state (value) and you only need
a dispatcher to request updates.

Behavior:
- Always reflects the externally provided `value`.
- No internal state is used.
- Every change triggers `onValueChange` to request the parent update.
- The provided dispatcher is **referentially stable** — it does not change
  even if `onValueChange` changes.  
  This means it can safely be used inside `useEffect` or `useCallback`
  without being listed in dependency arrays.

```tsx
import { useControlledValue, ValueChangeHandler } from '@reusable-ui/controllable'

export interface CustomWidgetProps {
    // "Active" state domain props:
    active         ?: boolean
    onActiveChange ?: ValueChangeHandler<boolean, React.MouseEvent>
}

export const CustomWidget = (props: CustomWidgetProps) => {
    const {
        // "Active" state domain props:
        active = false, // Fully controlled mode requires a fallback control value.
        onActiveChange,
    } = props;
    
    // Map "active" props into controlled mode:
    const [isActive, dispatchActiveChange] = useControlledValue<boolean, React.MouseEvent>({
        value         : active,
        onValueChange : onActiveChange,
    });
    
    // Usage example:
    return (
        <button onClick={(event) => dispatchActiveChange(!isActive, event)}>
            {isActive ? 'Active' : 'Inactive'}
        </button>
    );
};
```

### `useUncontrolledValue(props)`

Provides a **fully uncontrolled** value.

Use when the component should manage its own state (value) internally,
while still notifying the parent of changes.

Behavior:
- The state (value) is managed internally with `useState`.
- Requires `defaultValue` to initialize internal state.
- Updates are handled internally, but `onValueChange` is still notified.
- The provided dispatcher is **referentially stable** — it does not change
  even if `onValueChange` changes.  
  This means it can safely be used inside `useEffect` or `useCallback`
  without being listed in dependency arrays.

```tsx
import { useUncontrolledValue, ValueChangeHandler } from '@reusable-ui/controllable'

export interface CustomWidgetProps {
    // "Active" state domain props:
    defaultActive  ?: boolean
    onActiveChange ?: ValueChangeHandler<boolean, React.MouseEvent>
}

export const CustomWidget = (props: CustomWidgetProps) => {
    const {
        // "Active" state domain props:
        defaultActive = false, // Fully uncontrolled mode requires a fallback initial value.
        onActiveChange,
    } = props;
    
    // Map "active" props into uncontrolled mode:
    const [isActive, dispatchActiveChange] = useUncontrolledValue<boolean, React.MouseEvent>({
        defaultValue  : defaultActive,
        onValueChange : onActiveChange,
    });
    
    // Usage example:
    return (
        <button onClick={(event) => dispatchActiveChange(!isActive, event)}>
            {isActive ? 'Active' : 'Inactive'}
        </button>
    );
};
```

### `useControllableValue(props)`

Provides a **controllable** (controlled or uncontrolled) value.

Use when the component can flexibly operate in either mode:

- **Controlled mode** → The parent component owns the state (value).  
  The hook reflects the externally provided `value` and provides a dispatcher
  to request updates.

- **Uncontrolled mode** → The component should manage its own state (value) internally.  
  The hook initializes from `defaultValue` while still notifying the parent
  of changes.

Behavior:
- If `value` is provided → acts as controlled (driven by external state).
- If `value` is omitted → acts as uncontrolled (driven by internal state).
- Requires `defaultValue` to initialize internal state.
- Every change triggers `onValueChange`, regardless of mode.
- The provided dispatcher is **referentially stable** — it does not change
  even if `onValueChange` changes.  
  This means it can safely be used inside `useEffect` or `useCallback`
  without being listed in dependency arrays.

```tsx
import { useControllableValue, ValueChangeHandler } from '@reusable-ui/controllable'

export interface CustomWidgetProps {
    // "Active" state domain props:
    defaultActive  ?: boolean
    active         ?: boolean
    onActiveChange ?: ValueChangeHandler<boolean, React.MouseEvent>
}

export const CustomWidget = (props: CustomWidgetProps) => {
    const {
        // "Active" state domain props:
        defaultActive = false, // Uncontrolled mode requires a fallback initial value.
        active,
        onActiveChange,
    } = props;
    
    // Map "active" props into controllable (hybrid) mode:
    const [isActive, dispatchActiveChange] = useControllableValue<boolean, React.MouseEvent>({
        defaultValue  : defaultActive,
        value         : active,
        onValueChange : onActiveChange,
    });
    
    // Usage example:
    return (
        <button onClick={(event) => dispatchActiveChange(!isActive, event)}>
            {isActive ? 'Active' : 'Inactive'}
        </button>
    );
};
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/controllable** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/controllable**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/controllable three state-control strategies that make React components predictable, flexible, and easy to integrate.**  
Give it a ⭐ on GitHub if you find it useful!  
