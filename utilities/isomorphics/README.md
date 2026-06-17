# @reusable-ui/isomorphics 📦  

A **React utility library** that provides isomorphic (universal) hooks designed to work seamlessly across both client and server environments.  
This package offers polyfills and safe wrappers for hooks that behave differently depending on the rendering context.

## ✨ Features
✔ **Universal hook polyfills for client & server**  
✔ **Safe fallbacks to prevent bundler errors**  
✔ **Stable references across environments**  
✔ **Future-proof utilities for cross-environment compatibility**  

## 📦 Installation
Install **@reusable-ui/isomorphics** via npm or yarn:

```sh
npm install @reusable-ui/isomorphics
# or
yarn add @reusable-ui/isomorphics
```

## 📦 Exported Hooks & Functions

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
    // .....
};
```

```tsx
'use client'

export const TheClientComponent = () => {
    // Works on client component:
    const resourceRef = useIsomorphicRef<HTMLDivElement>(null);
    // .....
};
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/isomorphics** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/isomorphics**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/isomorphics provides universal React hooks safely across client and server!**  
Give it a ⭐ on GitHub if you find it useful!  
