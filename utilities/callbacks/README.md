# @reusable-ui/callbacks 📦  

A **React utility library** for managing stable callbacks and event handlers efficiently.  
This package provides hooks for stabilizing functions, merging multiple callbacks, and optimizing event handling to prevent unnecessary re-renders.

## ✨ Features
✔ **Ensures stable function references across renders**  
✔ **Optimizes event handlers to prevent unnecessary updates**  
✔ **Combines multiple callbacks into a single function**  
✔ **Handles both synchronous and asynchronous callbacks seamlessly**  

## 📦 Installation
Install **@reusable-ui/callbacks** via npm or yarn:

```sh
npm install @reusable-ui/callbacks
# or
yarn add @reusable-ui/callbacks
```

## 📦 Exported Hooks & Functions

### `useStableCallback<TArgs, TReturn>(callback: Callback<TArgs, TReturn>): Callback<TArgs, TReturn>`
Ensures a **stable reference** for callback functions, preventing unnecessary re-renders when used inside components.

```tsx
import { useStableCallback } from '@reusable-ui/callbacks';

const handleClick = useStableCallback(() => console.log('Clicked!'));

<button onClick={handleClick}>Click Me</button>;
```

---

### `useMergeCallbacks<TArgs>(...callbacks: Optional<Callback<TArgs, void>>[]): Callback<TArgs, void>`
Merges multiple callbacks into a **single stable function**.  
Useful for combining multiple event handlers or sequentially executing callbacks.

```tsx
import { useMergeCallbacks } from '@reusable-ui/callbacks';

const handleClickA = useStableCallback(() => console.log('A clicked'));
const handleClickB = useStableCallback(() => console.log('B clicked'));

const mergedClickHandler = useMergeCallbacks(handleClickA, handleClickB);

<button onClick={mergedClickHandler}>Click Me</button>;
```

---

### `useMergeAsyncCallbacks<TArgs>(...callbacks: Optional<Callback<TArgs, Promise<void>>>[]): Callback<TArgs, Promise<void>>`
Combines multiple **async callbacks** into a single function and executes them **in parallel**.

```tsx
import { useMergeAsyncCallbacks } from '@reusable-ui/callbacks';

const fetchDataA = useStableCallback(async () => console.log('Fetching A...'));
const fetchDataB = useStableCallback(async () => console.log('Fetching B...'));

const mergedAsyncHandler = useMergeAsyncCallbacks(fetchDataA, fetchDataB);

await mergedAsyncHandler();
```

---

### `useStableEventHandler<TEvent, TExtra, TReturn>(eventHandler: EventHandler<TEvent, TExtra, TReturn>): EventHandler<TEvent, TExtra, TReturn>`
Provides a stable reference for **event handlers**, ensuring that they don't trigger unnecessary re-renders.

```tsx
import { useStableEventHandler } from '@reusable-ui/callbacks';

const handleInputChange = useStableEventHandler((event: Event) => console.log('Changed:', event.target.value));

<input onChange={handleInputChange} />;
```

---

### `useMergeEventHandlers<TEvent, TExtra>(...eventHandlers: Optional<EventHandler<TEvent, TExtra, void>>[]): EventHandler<TEvent, TExtra, void>`
Combines multiple **event handlers** into a single stable function, preventing unnecessary re-renders.

```tsx
import { useMergeEventHandlers } from '@reusable-ui/callbacks';

const handleClickA = useStableEventHandler((event: MouseEvent) => console.log('A clicked', event));
const handleClickB = useStableEventHandler((event: MouseEvent) => console.log('B clicked', event));

const mergedClickHandler = useMergeEventHandlers(handleClickA, handleClickB);

<button onClick={mergedClickHandler}>Click Me</button>
```

---

### `useMergeAsyncEventHandlers<TEvent, TExtra>(...eventHandlers: Optional<EventHandler<TEvent, TExtra, Promise<void>>>[]): EventHandler<TEvent, TExtra, Promise<void>>`
Merges multiple **async event handlers** into a single function and runs them **in parallel**.

```tsx
import { useMergeAsyncEventHandlers } from '@reusable-ui/callbacks';

const handleAsyncA = useStableEventHandler(async (event: Event) => console.log('A completed', event));
const handleAsyncB = useStableEventHandler(async (event: Event) => console.log('B completed', event));

const mergedAsyncHandler = useMergeAsyncEventHandlers(handleAsyncA, handleAsyncB);

await mergedAsyncHandler(event);
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/callbacks** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/callbacks**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/callbacks optimizes event handling and callback stability for React apps!**  
Give it a ⭐ on GitHub if you find it useful!  
