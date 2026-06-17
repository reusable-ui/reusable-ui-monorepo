# @reusable-ui/lifecycles 📦  

A **React utility library** for managing component lifecycles efficiently.  
This package provides hooks for stabilizing effects, tracking mount status, and triggering re-renders.

## ✨ Features
✔ **Optimizes lifecycle hooks for stability and performance**  
✔ **Tracks mount status to prevent stale effects**  
✔ **Triggers controlled re-renders efficiently**  
✔ **Handles both client and server environments seamlessly**  

## 📦 Installation
Install **@reusable-ui/lifecycles** via npm or yarn:

```sh
npm install @reusable-ui/lifecycles
# or
yarn add @reusable-ui/lifecycles
```

## 📦 Exported Hooks & Functions

### `useMountedFlag(): RefObject<boolean | undefined>`
Tracks whether a component is **mounted or unmounted**.

```tsx
import { useMountedFlag } from '@reusable-ui/lifecycles';

const isMounted = useMountedFlag();
useEffect(() => {
    if (isMounted.current) {
        console.log('Component is mounted.');
    }
}, []);
```

---

### `useIsomorphicRef<T>(initialValue: T): RefObject<T>`
A universal `useRef` polyfill that adapts seamlessly to both client and server environments.

- On the **client** side, it works exactly the same as React `useRef` hook.
- On the **server** side, it returns a mock `RefObject` object that resembles a React Ref.
  Since server components render only once per request and never re-render,
  this reference remains stable.

This ensures cross-environment utilities can safely interact with mutable ref targets 
without throwing bundler exceptions or server-side runtime errors.

```tsx
export const TheServerComponent = () => {
    // Works on server component:
    const resourceRef = useIsomorphicRef<HTMLDivElement>(null);
    .....
};
```

```tsx
'use client'

export const TheClientComponent = () => {
    // Works on client component:
    const resourceRef = useIsomorphicRef<HTMLDivElement>(null);
    .....
};
```

### `useTriggerRender(): [DispatchWithoutAction, symbol]`
Forces a **controlled re-render** of a React component.

```tsx
import { useTriggerRender } from '@reusable-ui/lifecycles';

const [triggerRender] = useTriggerRender();

// Force a re-render of the component:
triggerRender();
```

### `usePreviousValue<TValue>(value: TValue): TValue | undefined`
Tracks the previous value of a given input across renders — synchronously and without delay.

This hook is ideal for animation authors, directional transitions, and lifecycle-aware components that need to compare the current and previous values within the same render pass.

```tsx
import { usePreviousValue } from '@reusable-ui/lifecycles';

export const ExampleComponent = ({ viewIndex }: { viewIndex: number }) => {
    const prevViewIndex = usePreviousValue(viewIndex);
    
    const direction = (
        prevViewIndex === undefined ? 'initial' :
        viewIndex > prevViewIndex ? 'forward' :
        viewIndex < prevViewIndex ? 'backward' :
        'static'
    );
    
    return (
        <div>
            <p>Current view index: {viewIndex}</p>
            <p>Previous view index: {String(prevViewIndex)}</p>
            <p>Transition direction: {direction}</p>
        </div>
    );
};
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/lifecycles** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/lifecycles**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/lifecycles helps manage React component state efficiently!**  
Give it a ⭐ on GitHub if you find it useful!  
