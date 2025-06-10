# @reusable-ui/references 📦  

A **React utility library** for efficiently managing and merging refs.  
It provides optimized hooks for handling multiple refs, ensuring stable references across renders, and preventing unnecessary component re-creations.

## ✨ Features
✔ **Merges multiple refs into a single stable ref callback**  
✔ **Supports both object refs (`useRef()`) and callback refs (`(value) => void`)**  
✔ **Prevents unnecessary re-creations by maintaining a stable reference**  
✔ **Improves compatibility with third-party libraries and dynamic elements**  

## 📦 Installation
Install **@reusable-ui/references** via npm or yarn:

```sh
npm install @reusable-ui/references
# or
yarn add @reusable-ui/references
```

## 🔗 Exported Hooks & Functions

### `useMergeRefs<TValue>(...refs: Optional<Ref<TValue>>[]): RefCallback<TValue>`
Merges multiple React refs into a **single stable ref callback**.  
Handles both **object refs** and **callback refs** without causing unnecessary re-renders.

```tsx
import { useRef } from 'react';
import { useMergeRefs } from '@reusable-ui/references';

const contentRef = useRef<HTMLDivElement | null>(null);
const thirdPartyRef = useThirdPartyLibrary();

return (
    <div ref={useMergeRefs(
        // External ref:
        props.ref,
        
        // Internal ref:
        contentRef,
        
        // Third party ref:
        thirdPartyRef,
    )}>
        Content
    </div>
);
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/references** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/references**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/references optimizes React ref management with a stable merging mechanism!**  
Give it a ⭐ on GitHub if you find it useful!  
