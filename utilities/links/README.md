# @reusable-ui/links 🔗  

A lightweight, router-agnostic utility for smartly wrapping React elements with `<Link>` behavior — only when needed.  
This package provides the powerful `useOptionalLinkWrapper()` hook that enables semantic-aware components (like buttons, menu items, cards, etc.) to opt into client-side routing based on runtime child inspection — with **no dependency on any router library**.

## ✨ Features
✔ Automatically detects embedded `<Link>` components (from Next.js or React Router)  
✔ Prevents invalid nesting like `<a><button>...</button></a>`  
✔ Compatible with `@reusable-ui/next-link-compat` (Next.js <Link> compatible) and `@reusable-ui/router-link-compat` (React Router <Link> compatible)  
✔ Central to high-level abstractions like `<ActionControl>` and button-based navigation

## 📦 Installation
Install **@reusable-ui/links** via npm or yarn:

```sh
npm install @reusable-ui/links
# or
yarn add @reusable-ui/links
```

## 🔁 Exported Hooks

### `useOptionalLinkWrapper(originalElement: ReactElement): ReactElement`

Wraps a semantic element (e.g. `<BaseButton>`) with a router-specific `<Link>` **if one is detected** in its children, preserving visual and interactive behavior while avoiding invalid DOM.

#### 🔧 Usage Example

```tsx
import { useOptionalLinkWrapper } from '@reusable-ui/links';
import { Link } from '@reusable-ui/next-link-compat'; // Next.js <Link> compatible
// import { Link } from '@reusable-ui/router-link-compat'; // React Router <Link> compatible
import { BaseButton, BaseButtonProps } from './BaseButton';

interface SmartButtonProps extends BaseButtonProps {}

const SmartButton = (props: SmartButtonProps) => {
    // Enhances the <BaseButton> with client-side link detection (e.g., <Link> from Next.js or React Router):
    return useOptionalLinkWrapper(
        <BaseButton {...props} />
    );
};

// Usage:
<SmartButton className='primary'>
    <Link href='/dashboard'>Go to Dashboard</Link>
</SmartButton>

// Renders as:
<Link href='/dashboard' anchorless passHref>
    <BaseButton className='primary'>Go to Dashboard</BaseButton>
</Link>
```

This keeps the visual layout unchanged and preserves accessibility while deferring navigation to a client-side router.

#### 🧠 How It Works

Internally, `useOptionalLinkWrapper()`:
- Scans children of the provided base element for a supported `<Link>`
- Merges the `<Link>`’s children with the base element’s children
- Re-wraps the updated element inside the detected `<Link>` with proper semantics.
- Produces a **stable** JSX identity so you can safely `cloneElement()` or override props further

#### 🧱 Designed for Integration

This hook powers the magic behind components like:

- `<ActionControl>`, `<Button>` with auto `<a>`/`<button>` detection
- `<NavButton>`, `<NavItem>` — anything clickable with optional `<Link>`s
- Design systems that want `<Link>`-aware components without forcing a router choice

#### 🌐 Works with:

- ✅ `@reusable-ui/next-link-compat`
- ✅ `@reusable-ui/router-link-compat`
- ✅ `@reusable-ui/link-compat` (for raw detection)

### `isClientLinkElement(node: ReactNode): node is ClientLinkElement`

A runtime type guard that checks whether a given React node qualifies as a client-side `<Link>` element.

#### 🔧 Usage Example

```tsx
import { isClientLinkElement } from '@reusable-ui/links';

const maybeLink = children.find(child => isClientLinkElement(child));
```

Use this to filter or validate components before conditionally wrapping them in semantic navigators.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/links** is a core logic module within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/links**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/links brings precision and elegance to link-aware design systems.**  
Give it a ⭐ on GitHub if you find it useful!  
