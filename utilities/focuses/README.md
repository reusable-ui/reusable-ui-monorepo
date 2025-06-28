# @reusable-ui/focuses 🎯  

A lightweight DOM utility for navigating focusable elements while respecting accessibility constraints like `tabIndex`, `disabled`, `hidden`, `aria-hidden`, `inert`, and inherited `inert` containers. Ideal for custom focus management in dropdown menus, modals, composite widgets, and keyboard navigation zones.

## ✨ Features
✔ Traverse and sort focusable elements by DOM order or `tabIndex` priority  
✔ Exclude `disabled`, `hidden`, `inert`, and ARIA-hidden elements — with inherited inert detection  
✔ Seamless wrap-around navigation for roving focus systems  
✔ Fully testable in DOM and JSDOM environments  
✔ Framework-agnostic (works with plain DOM or React)  

## 📦 Installation
Install **@reusable-ui/focuses** via npm or yarn:

```sh
npm install @reusable-ui/focuses
# or
yarn add @reusable-ui/focuses
```

## 🔁 Exported Functions

### `getSortedFocusableElements(container: Element): Element[]`
Returns all focusable descendants of `container`, sorted by `tabIndex`. Automatically filters out:

- `[disabled]`, `[aria-disabled="true"]`
- `[hidden]`, `[aria-hidden="true"]`
- `style="display: none"` or `visibility: hidden`
- Elements with `inert`, including inherited inertness

---

### `focusElementAt(container: Element, index: number): boolean`
Focuses the `index`-th focusable element within the `container`.

---

### `focusFirstElement(container: Element): boolean`
Focuses the **first** focusable element within the `container`.

---

### `focusLastElement(container: Element): boolean`
Focuses the **last** focusable element within the `container`.

---

### `focusPrevElementOrWrapToLast(container: Element): boolean`
Moves focus **backward** from the currently focused element within the `container`.  
Wraps to the **last** element if already at the start.

---

### `focusNextElementOrWrapToFirst(container: Element): boolean`
Moves focus **forward** from the currently focused element within the `container`.  
Wraps to the **first** element if already at the end.

---

## 🧩 Use Cases

- Implementing accessible roving `tabIndex` patterns
- Building custom dropdown menus, modals, or carousels
- Skipping hidden/inert elements during keyboard navigation
- Creating focus traps and spatial navigation zones

---

## ✅ Example

```ts
import {
    focusNextElementOrWrapToFirst,
} from '@reusable-ui/focuses';

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const container = document.querySelector('[data-modal]');
        focusNextElementOrWrapToFirst(container);
    }
});
```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/focuses** is a core logic module for [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/focuses**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/focuses helps your UI move with clarity, intent, and accessibility.**  
Give it a ⭐ on GitHub if you find it useful!  
