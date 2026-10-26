# @reusable-ui/focus-interaction 🎯  

**@reusable-ui/focus-interaction** enhances native keyboard navigation and focus management with robust utilities such as focus traps and cyclic wrap-around navigation — while strictly respecting modern accessibility standards.

With **focus-interaction**, you can build: 
- **Dropdown Menus & Popovers:** Trapping focus inside an open menu and cycling through items via `Tab` or arrow keys.
- **Modals & Dialogs:** Preventing focus from leaking into the background document.
- **Toolbars & Composite Widgets:** Managing active items in toolbars, menus, and composite widgets.

## ✨ Features

✔ **Specificity-Based Traversal** — Uses nested `tabIndex` priorities across hierarchy depths (e.g., `grandParent.parent.child`) to ensure a natural, human-expected traversal flow.
✔ **Cyclic Wrap-Around Navigation** — Built-in support for seamless focus looping (e.g., looping from the last item back to the first).
✔ **Robust Accessibility Filtering** — Automatically excludes `disabled`, `hidden`, `aria-hidden="true"`, `inert`, and inherited `inert` containers.
✔ **Framework Agnostic** — Clean, dependency-free vanilla DOM utilities that integrate effortlessly with React, Vue, Svelte, or plain JavaScript.

## 📦 Installation

Install **@reusable-ui/focus-interaction** via npm or yarn:

```sh
npm install @reusable-ui/focus-interaction
# or
yarn add @reusable-ui/focus-interaction
```

## 🧩 Exported Utilities

### Core Query & Resolution Utilities

#### `getFocusableElements(focusScope: Element): Element[]`

Retrieves all focusable elements within the specified focus scope,
ordered for logical keyboard navigation (`tab` sequence) and human-expected traversal.

🧱 Example Focus Scope Structure:

```txt
  ┌───────────────────────────────────────────────┐
  │  <ul tabIndex="0|-1">                         │ ← focus scope (can be focusable or purely structural)
  │  ├─ <li>                                      │
  │  │   └─ (●2) <button>: "Edit"                 │ ← focusable leaf
  │  ├─ <li>                                      │
  │  │   └─ (●1) <div tabIndex="1">: "Quantity"   │ ← focusable group
  │  │       └─ <div>                             │ ← not focusable, purely structural
  │  │           ├─ (●2) <button>: "-"            │ ← focusable leaf
  │  │           ├─ (●1) <input type="number" />  │ ← focusable leaf
  │  │           └─ (●3) <button>: "+"            │ ← focusable leaf
  │  ├─ <li>                                      │
  │  │   └─ (●3) <button>: "Delete"               │ ← focusable leaf
  │  └─ <li>                                      │
  │      └─ (●4) <button>: "Cancel"               │ ← focusable leaf
  └───────────────────────────────────────────────┘
  Note: (●) indicates assigned tabIndex.
```

✅ Final focus order (flattened):
  1. "Quantity" (tabIndex: 1)
  2.  └─ input  (tabIndex: 1.1)
  3.  └─ [-]    (tabIndex: 1.2)
  4.  └─ [+]    (tabIndex: 1.3)
  5. "Edit"     (tabIndex: 2)
  6. "Delete"   (tabIndex: 3)
  7. "Cancel"   (tabIndex: 4)

#### `focusElementUsing(focusScope: Element, resolver: (focusableElements: Element[]) => Element | null | undefined): boolean`

Attempts to focus the focusable element within the specified focus scope
using a custom resolution logic.

### Targeted Focusing Utilities

#### `focusElementAt(focusScope: Element, index: number): boolean`

Attempts to focus the focusable element at the specified index within the specified focus scope.

#### `focusFirstElement(focusScope: Element): boolean`

Attempts to focus the first focusable element within the specified focus scope.

#### `focusLastElement(focusScope: Element): boolean`

Attempts to focus the last focusable element within the specified focus scope.

### Relative Focusing Utilities

#### `focusPreviousElement(focusScope: Element, wrap: boolean = true): boolean`

Attempts to move focus to the previous focusable element within the specified focus scope.

#### `focusNextElement(focusScope: Element, wrap: boolean = true): boolean`

Attempts to move focus to the next focusable element within the specified focus scope.

## 💡 Usage Example

Here is how you can use `@reusable-ui/focus-interaction` to manage focus in a dropdown menu component,
allowing users to trap and cycle through items seamlessly:

```ts
import {
    // Core query & resolution utilities:
    getFocusableElements,
    focusElementUsing,
    
    // Targeted focusing utilities:
    focusElementAt,
    focusFirstElement,
    focusLastElement,
    
    // Relative focusing utilities:
    focusPreviousElement,
    focusNextElement,
} from '@reusable-ui/focus-interaction';



const menuElement = document.querySelector<HTMLElement>('[data-dropdown-menu]');

// 1. When the menu opens, focus the container or the first item:
function openMenu() {
    menuElement.classList.add('is-open');
    
    // Initially focus the first item:
    focusFirstElement(menuElement);
}

// 2. Handle keyboard navigation for focus trapping and cycling:
menuElement.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    
    // Disable browser's default focus switching:
    event.preventDefault();
    
    
    
    // Instead, implement **custom** focus switching for a better user experience:
    // - Feel free to use any key combination alongside [Tab], if necessary.
    if (event.shiftKey) {
        // Shift + Tab: Move backward, wrap to last item if at the beginning:
        focusPreviousElement(menuElement, true);
    }
    else {
        // Tab: Move forward, wrap to first item if at the end:
        focusNextElement(menuElement, true);
    }
});
```

## 🧠 How It Works: CSS-Like Specificity-Based Traversal

When building complex UI components (like dropdown menus, dialogs, or composite widgets), standard browser tab orders can feel disjointed because nesting levels break simple numeric sequences.

To solve this, `@reusable-ui/focus-interaction` uses a **Specificity-Based Sorting** approach inspired by CSS specificity.

### 🧱 Example UI Component Structure

```txt
  ┌───────────────────────────────────────────────┐
  │  <ul tabIndex="0|-1">                         │ ← focus scope (can be focusable or purely structural)
  │  ├─ <li>                                      │
  │  │   └─ (●2) <button>: "Edit"                 │ ← focusable leaf
  │  ├─ <li>                                      │
  │  │   └─ (●1) <div tabIndex="1">: "Quantity"   │ ← focusable group
  │  │       └─ <div>                             │ ← not focusable, purely structural
  │  │           ├─ (●2) <button>: "-"            │ ← focusable leaf
  │  │           ├─ (●1) <input type="number" />  │ ← focusable leaf
  │  │           └─ (●3) <button>: "+"            │ ← focusable leaf
  │  ├─ <li>                                      │
  │  │   └─ (●3) <button>: "Delete"               │ ← focusable leaf
  │  └─ <li>                                      │
  │      └─ (●4) <button>: "Cancel"               │ ← focusable leaf
  └───────────────────────────────────────────────┘
  Note: (●) indicates assigned tabIndex.
```

### 📐 How Specificity is Formed

Instead of looking at each element in isolation, the library maps out the component hierarchy.
An element's effective focus order is determined by combining its `tabIndex` with the `tabIndex` of its ancestor **Focusable Groups** (e.g., `parent.child`).

For example:

* The **"Quantity"** group has a `tabIndex` of `1`.
* Inside it, the `[-]` button has a `tabIndex` of `2`.
* Because the button lives inside group `1`, its combined hierarchical specificity becomes **`1.2`**.

### 📋 The Final Sorted Sequence

Once every element's compound specificity is calculated across the entire **Focus Scope**, they are sorted together in a single pass.
This ensures inner group priorities are fully resolved before advancing to outer sibling groups:

1. "Quantity" (tabIndex: 1)
2.  └─ input  (tabIndex: 1.1)
3.  └─ [-]    (tabIndex: 1.2)
4.  └─ [+]    (tabIndex: 1.3)
5. "Edit"     (tabIndex: 2)
6. "Delete"   (tabIndex: 3)
7. "Cancel"   (tabIndex: 4)

This simple mental model gives you complete control over keyboard navigation,
ensuring users experience a logical, human-expected traversal flow regardless of how deep your DOM structure goes.

### 🧩 Terminology

- **Focus Scope:** The boundary/working area (e.g., menus, modals, or composite widgets) where focus actions are scoped.
- **Focusable Group:** A focusable element that contains nested focusable children (either direct or indirect).
- **Focusable Leaf:** A focusable element with no nested focusable children.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/focus-interaction** is part of the core interaction suite for the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/focus-interaction**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

🚀 **@reusable-ui/focus-interaction empowering accessible, predictable keyboard navigation.**  
Give it a ⭐ on GitHub if you find it useful!  
