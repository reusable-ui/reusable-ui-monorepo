# @reusable-ui/next-link-compat 📦  

A **Next.js-compatible `<Link>` alternative** with optional anchorless rendering — ensuring clean semantics, accessible markup, and compatibility with custom interactive components.

## ✨ Features
✔️ Drop-in replacement for Next.js’s `<Link>` with anchorless support  
✔️ Prevents invalid nested anchors (like `<a><button>...</button></a>`)  
✔️ Forwards `href`, `ref`, and handlers to the actual interactive child  
✔️ Seamlessly integrates with Reusable UI or standalone design systems  
✔️ Works with **Next.js** v15+ (React 19-ready)  

## 📦 Installation
Install **@reusable-ui/next-link-compat** via npm or yarn:

```sh
npm install @reusable-ui/next-link-compat
# or
yarn add @reusable-ui/next-link-compat
```

## 🧩 Usage: `<NextLinkCompat>` (a.k.a. `<Link>`)

`<NextLinkCompat>` is a drop-in replacement for Next.js’s `<Link>` component with better behavior by default:

- ✅ Prevents unintended nested anchors by enabling `anchorless`
- ✅ Promotes `href`, `ref`, and event handlers to the intended interactive child
- ✅ Works seamlessly with buttons, custom components, clickable cards, etc.

```tsx
import {
    NextLinkCompat,
    Link, // ✅ Familiar alias, interchangeable with NextLinkCompat
} from '@reusable-ui/next-link-compat';

<NextLinkCompat href='/dashboard' anchorless>
    <button>Go to Dashboard</button>
</NextLinkCompat>

// Or use the alias:
<Link href='/dashboard' anchorless>
    <button>Go to Dashboard</button>
</Link>
```

Whether you're using the App Router or Pages Router — this just works. No nested anchors. No surprises. Smooth navigation.

---

## ⚙ API

`<NextLinkCompat>` accepts all props from [`<Link>`](https://nextjs.org/docs/app/api-reference/components/link) plus two extra flags:

```ts
interface CompatLinkProps {
    /** Enables the anchorless behavior. If false, it behaves like the original Next.js `<Link>`. */
    anchorless ?: boolean
    
    /** If true, explicitly forwards `href` to the child component (used in anchorless mode). */
    passHref   ?: boolean
}
```

- `anchorless` and `passHref` are handled internally by `<NextLinkCompat>` and are **not passed** to the underlying Next.js `<Link>`.
- This ensures clean, semantic rendering without leaking transformation flags downstream.

---

## ⚙ Behavior Summary

| Feature                     | anchorless = false (default)  | anchorless = true                  |
|-----------------------------|-------------------------------|------------------------------------|
| Anchor rendering            | Rendered with `<a>` element   | Rendered without `<a>` element     |
| Ref target                  | `<a>` element                 | Interactive child element          |
| `href` forwarding           | Automatic                     | Manual via `passHref`              |
| Event handling              | From `<a>`                    | Hoisted to interactive child       |
| Accessibility               | Native anchor                 | Fully customizable                 |

---

## 🐞 Reporting Issues

Found an edge case or unexpected behavior? File an issue here:  
👉 [https://github.com/reusable-ui/reusable-ui-monorepo/issues](https://github.com/reusable-ui/reusable-ui-monorepo/issues)

---

## 🌍 Related Packages

- [`@reusable-ui/link-compat`](https://www.npmjs.com/package/@reusable-ui/link-compat) – core anchorless utilities  
- [`@reusable-ui/router-link-compat`](https://www.npmjs.com/package/@reusable-ui/router-link-compat) – React Router-compatible version  

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/next-link-compat** is part of the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/next-link-compat**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/next-link-compat helps you build semantic links that play well with design systems and routing libraries alike.**  
Give it a ⭐ on GitHub if you find it useful!  
