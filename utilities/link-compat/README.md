# @reusable-ui/link-compat 📦  

A **compatibility utility** for adapting router-specific `<Link>` components (like from Next.js or React Router) into clean, unwrapped, fully-navigable interactive elements — without nested anchors or redundant wrappers.

## ✨ Features
✔️ Transforms framework-bound `<Link>` elements into _anchorless_ structures  
✔️ Promotes `<a>` props (e.g. `href`, `onClick`, `ref`) to the intended interactive child  
✔️ Supports fragments, context wrappers, and deeply nested children  
✔️ Helps eliminate invalid nested `<a>` tags for accessibility and semantics  
✔️ Compatible with Next.js, React Router, Remix, or custom link components  

## 📦 Installation
Install **@reusable-ui/link-compat** via npm or yarn:

```sh
npm install @reusable-ui/link-compat
# or
yarn add @reusable-ui/link-compat
```

## 📦 Exported Hooks

### `useAnchorlessLink(linkElement: ReactElement<CompatLinkProps>): ReactNode`

This React hook transforms a framework-specific `<Link>` element into an anchorless structure, ideal for preventing nested anchors and forwarding navigation props like `href`, `ref`, and navigation handlers.

It inspects the JSX returned from the given element, extracts the `<a>` tag (if present), and **hoists its relevant props to the nested interactive child**, such as a `<button>` or custom component. This is especially useful for compatibility wrappers around `next/link`, `react-router-dom`, or similar libraries.

#### Example: Creating a compatible Link wrapper

```tsx
import { BaseLink, BaseLinkProps } from 'framework-specific-link';
import { useAnchorlessLink, CompatLinkProps } from '@reusable-ui/link-compat';

export interface CustomCompatibleLinkProps extends BaseLinkProps, CompatLinkProps {
    href     : string
    children : ReactNode
}

const CustomCompatibleLink = (props: CustomCompatibleLinkProps) => {
    const result = useAnchorlessLink(
        <BaseLink {...props} />
    );
    
    return result;
};
```

#### `CompatLinkProps`

```ts
interface CompatLinkProps {
    /** Enables the anchor-unwrapping behavior. If false, the structure is returned as-is. */
    anchorless ?: boolean
    
    /** If true, forwards `href` from the unwrapped `<a>` to the interactive child. */
    passHref   ?: boolean
}
```

- These props are **only interpreted by `useAnchorlessLink`**.
- ✅ They are **stripped out** before rendering the final JSX, and **are not forwarded** to the underlying `<BaseLink>`.
- This ensures clean separation between compatibility logic and rendering behavior.

---

#### Behavior Summary

- If an `<a>` is found inside the rendered structure:
  - It’s removed
  - Its `href`, `ref`, and navigation handlers (`onClick`, `onMouseEnter`, etc.) are hoisted to the nested interactive child
- If no `<a>` is found:
  - The node is returned unmodified
  - A dev-only warning is logged to suggest a possible misconfiguration or unsupported structure

---

## 🐞 Reporting Issues

If you encounter an unexpected JSX structure that fails to unwrap, feel free to open an issue:  
👉 [https://github.com/reusable-ui/reusable-ui-monorepo/issues](https://github.com/reusable-ui/reusable-ui-monorepo/issues)

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/link-compat** is part of the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/link-compat**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/link-compat gives you full control over navigation semantics without sacrificing composability.**  
Give it a ⭐ on GitHub if you find it useful!  
