# ⚠ DEPRECATED: @reusable-ui/layouts ↩️  

🚨 **This package is deprecated** in favor of native CSS `lh` units.  
All functions in `@reusable-ui/layouts` were created as a workaround before `lh` was widely supported.  
You should now use `blockSize: 1lh` and `inlineSize: 1lh` instead.

---

## 🔄 Migration Path  
Replace the old functions with standard CSS:

```ts
// Old (deprecated)
import { fillTextLineHeightLayout } from '@reusable-ui/layouts';
const containerStyle = style({
    ...fillTextLineHeightLayout(),
    ............
});

// New (recommended)
const containerStyle = style({
    blockSize: '1lh',
    ............
});
```

For rotated elements:

```ts
// Old (deprecated)
import { fillTextLineWidthLayout } from '@reusable-ui/layouts';
const containerStyle = style({
    ...fillTextLineWidthLayout(),
    ............
});

// New (recommended)
const containerStyle = style({
    inlineSize: '1lh',
    ............
});
```

Since modern browsers support `lh`, you **no longer need `@reusable-ui/layouts`**.

---

## 🚀 Why Was This Deprecated?  
✔ **`lh` is now widely supported** – Works across modern browsers (Chrome, Edge, Firefox, Safari)  
✔ **Removes unnecessary workarounds** – No more relying on hidden dummy text for alignment  
✔ **Reduces complexity** – Direct CSS properties (`1lh`) are simpler and more efficient  

---

## 📦 Installation (Only If Absolutely Necessary)  
While this package remains available, **it is deprecated**.  
You should migrate to CSS `lh`, but if necessary, install the old package:

```sh
npm install @reusable-ui/layouts
# or
yarn add @reusable-ui/layouts
```

---

## 📖 Part of the Reusable-UI Framework  
This package was a **core layout module**, now fully replaced by CSS `lh`.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
This package **no longer accepts contributions**.  
Please refer to other actively maintained **Reusable-UI** modules.

## 📜 License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **Please transition to CSS `lh` for ongoing updates and support.**  
Give it a ⭐ on GitHub if you found it useful in the past!
