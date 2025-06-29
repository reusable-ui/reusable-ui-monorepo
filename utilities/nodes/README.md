# @reusable-ui/nodes 📦  

A **utility library** for handling React nodes efficiently. This package provides functions to identify, manipulate, and flatten React elements, including `forwardRef` elements, fragments, and deeply nested structures.

## ✨ Features
✔ **Handles deeply nested fragments and arrays**  
✔ **Processes forwardRef elements correctly**  
✔ **Filters truthy and falsy nodes effectively**  
✔ **Optimizes React children flattening**  

## 📦 Installation
Install **@reusable-ui/nodes** via npm or yarn:

```sh
npm install @reusable-ui/nodes
# or
yarn add @reusable-ui/nodes
```

## 📦 Exported Functions

### `isForwardRefElement(node: ReactNode): boolean`
Determines if a given React node is a **forward ref element**.

```tsx
import { isForwardRefElement } from '@reusable-ui/nodes';

const ForwardComponent = React.forwardRef((props, ref) => <input ref={ref} {...props} />);
console.log(isForwardRefElement(<ForwardComponent />)); // true
```

---

### `isFragmentElement(node: ReactNode): boolean`
Determines if a given React node is a **React fragment** (`<>...</>`).

```tsx
import { isFragmentElement } from '@reusable-ui/nodes';

console.log(isFragmentElement(<></>)); // true
console.log(isFragmentElement(<div />)); // false
```

---

### `isComponentElement(node: ReactNode): boolean`
Determines if a given React node is a **component element** created from a function or class component.

```tsx
import { isComponentElement } from '@reusable-ui/nodes';

const MyComponent = () => <div>Custom UI</div>;
console.log(isComponentElement(<MyComponent />)); // true
console.log(isComponentElement(<button />)); // false
```

---

### `isDOMElement(node: ReactNode): boolean`
Determines if a given React node is a **native DOM element**, such as `<div>`, `<span>`, or `<button>`.

```tsx
import { isDOMElement } from '@reusable-ui/nodes';

const MyComponent = () => <div>Custom UI</div>;
console.log(isDOMElement(<div />)); // true
console.log(isDOMElement(<button />)); // true
console.log(isDOMElement(<MyComponent />)); // false
```

---

### `isTruthyNode(node: ReactNode): boolean`
Verifies if a node is **renderable**, excluding `null`, `undefined`, or falsy values.

```tsx
import { isTruthyNode } from '@reusable-ui/nodes';

console.log(isTruthyNode(<div />)); // true
console.log(isTruthyNode(null)); // false
console.log(isTruthyNode('Text')); // true
```

---

### `isFalsyNode(node: ReactNode): boolean`
Determines if a node is **non-renderable** (i.e., falsy).

```tsx
import { isFalsyNode } from '@reusable-ui/nodes';

console.log(isFalsyNode(null)); // true
console.log(isFalsyNode(<div />)); // false
console.log(isFalsyNode(undefined)); // true
```

---

### `flattenChildren(children: ReactNode): ReactNode[]`
Recursively **flattens React children**, ensuring proper handling of:
- **Fragments (`<>...</>`)**
- **Nested arrays**
- **Deeply nested mixed structures**

```tsx
import { flattenChildren } from '@reusable-ui/nodes';

const children = [
    <>
        <div>Hello</div>
        <>
            <span>World</span>
        </>
    </>,
    [<button key="btn">Click Me</button>],
];

console.log(flattenChildren(children));
// Output: [<div>Hello</div>, <span>World</span>, <button key="btn">Click Me</button>]
```

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/nodes** is an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/nodes**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/nodes streamlines React node management for dynamic UI development.**  
Give it a ⭐ on GitHub if you find it useful!  
