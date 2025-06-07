# @reusable-ui/runtime-checks ✅  

A **lightweight utility** to detect whether JavaScript is executing on the **client-side**, **server-side**, or within a **JSDOM environment**.  
This package ensures reliable execution environment checks beyond `typeof window !== 'undefined'`.

## ✨ Features  
✔ **Detects if code is running in the browser** (`window` exists)  
✔ **Identifies JSDOM environments** (for testing)  
✔ **Works with Node.js and SSR contexts**  
✔ **Optimized for frequent environment checks**  

## 📦 Installation  
Install **@reusable-ui/runtime-checks** via npm or yarn:

```sh
npm install @reusable-ui/runtime-checks
# or
yarn add @reusable-ui/runtime-checks
```

## 📦 Exported Flags  

### `isClientSide: boolean`  
Indicates if the code is running on **the client side**, including browser and JSDOM environments.

```ts
import { isClientSide } from '@reusable-ui/runtime-checks';

console.log(isClientSide); // true (in browser)
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/runtime-checks** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/runtime-checks**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/runtime-checks streamlines React node management for dynamic UI development.**  
Give it a ⭐ on GitHub if you find it useful!  
