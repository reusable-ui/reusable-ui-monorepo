# ⚠ DEPRECATED: @reusable-ui/stripouts ↩️  

🚨 **This package is deprecated** in favor of [`@reusable-ui/resets`](https://www.npmjs.com/package/@reusable-ui/resets).  
All future updates will be made in `@reusable-ui/resets`.  

## 🔄 Migration Path  
**If you previously used `@reusable-ui/stripouts`, update your imports**:  
```ts
// Old (deprecated)
import { stripoutControl } from '@reusable-ui/stripouts';

// New (recommended)
import { resetControl } from '@reusable-ui/resets';
```
All functions are still available under `@reusable-ui/stripouts` but are **aliased to `@reusable-ui/resets`** for compatibility.

---

## 🚀 Features  
✔ **Re-exports all functions from `@reusable-ui/resets`** to prevent breaking changes  
✔ **Aliases legacy `stripout**` functions to `reset**`** for smooth migration  
✔ **Maintains compatibility** with existing codebases using `stripout**`  

---

## 📦 Installation  
If you're migrating, install `@reusable-ui/resets` instead:

```sh
npm install @reusable-ui/resets
# or
yarn add @reusable-ui/resets
```

If you still need `@reusable-ui/stripouts`, it remains available but is **deprecated**.

---

## 📖 Part of the Reusable-UI Framework  
This package was a **core reset module**, now fully replaced by [`@reusable-ui/resets`](https://www.npmjs.com/package/@reusable-ui/resets).  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Contributions should now be made to **@reusable-ui/resets**. See its [CONTRIBUTING.md](https://github.com/reusable-ui/reusable-ui-monorepo/tree/main/configs/resets) for details.  

## 📜 License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **Please transition to `@reusable-ui/resets` for ongoing updates and support.**  
Give it a ⭐ on GitHub if you find it useful!
