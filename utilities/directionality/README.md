# @reusable-ui/directionality 📦  

A lightweight **React utility** for handling **text directionality (RTL/LTR)** in UI components.  
This package provides `useIsRtl()` to determine **whether an element is in right-to-left (RTL) mode**, helping developers create **bidirectional UIs**.

## ✨ Features
✔ **Detects RTL/LTR layout direction reliably**  
✔ **Works with any DOM elements**  
✔ **Minimal overhead and no reactivity complexity**  

## 📦 Installation
Install **@reusable-ui/directionality** via npm or yarn:

```sh
npm install @reusable-ui/directionality
# or
yarn add @reusable-ui/directionality
```

## 📦 Exported Hooks & Functions

### `useIsRtl<TElement>(defaultRtl?: boolean): [boolean, RefCallback<TElement | null>]`
Determines whether an element is **right-to-left (RTL)** based on its computed `direction` style.  
✔ Returns a **boolean (`true` for RTL, `false` for LTR)**  
✔ Provides a **ref callback** to assign the tracked element  
✔ Does **not** update dynamically when styles change after mount  

```tsx
import { useIsRtl } from '@reusable-ui/directionality';

const NextButton = () => {
    const [isRtl, refCallback] = useIsRtl();

    return (
        <button ref={refCallback} className="next-button">
            {isRtl ? '← Next' : 'Next →'}
        </button>
    );
};
```

#### ⚠️ Limitation: No Dynamic CSS Tracking
This hook assumes **static styling**.  
If `direction` changes via **CSS stylesheets or CSS-in-JS**, the hook **won't detect updates**.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/directionality** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/directionality**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/directionality makes bidirectional UI handling simple!**  
Give it a ⭐ on GitHub if you find it useful!  
