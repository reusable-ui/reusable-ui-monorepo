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

### `useIsomorphicLayoutEffect(effect: EffectCallback, deps?: DependencyList): void`
A **cross-platform effect hook** that automatically switches between `useLayoutEffect` (browser) and a no-op (server).

```tsx
import { useIsomorphicLayoutEffect } from '@reusable-ui/lifecycles';

useIsomorphicLayoutEffect(() => {
    console.log('This effect runs before paint on the client.');
}, []);
```

---

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

### `useTriggerRender(): [DispatchWithoutAction, symbol]`
Forces a **controlled re-render** of a React component.

```tsx
import { useTriggerRender } from '@reusable-ui/lifecycles';

const [triggerRender] = useTriggerRender();

// Force a re-render of the component:
triggerRender();
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
