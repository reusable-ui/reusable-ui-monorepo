# @reusable-ui/next-link-compat 📦  

A **Next.js-compatible `<Link>` alternative** with anchorless support — ensuring clean semantics and accessible markup.

## ✨ Features
✔️ Drop-in replacement for Next.js’s `<Link>` with anchorless support  
✔️ Eliminates invalid nested anchors like `<a><button>...</button></a>`  
✔️ Forwards `href`, `ref`, and `onClick` to the intended interactive child  
✔️ Seamlessly integrates with Reusable UI or standalone components  

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

## 🧩 Props

`NextLinkCompatProps` includes all props from Next.js’s native [`<Link>`](https://nextjs.org/docs/app/api-reference/components/link) component — such as `href`, `prefetch`, `replace`, etc. — plus two additional compatibility flags:

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

When `anchorless` is enabled:

| Condition              | Result                                                                 |
|------------------------|------------------------------------------------------------------------|
| Anchor is found        | It is removed, and its props are hoisted to the interactive child      |
| No anchor is found     | The node is returned unchanged with a dev-only warning                 |
| `passHref` is `true`   | `href` is forwarded manually to the child (in anchorless mode)         |

Otherwise, the component behaves identically to the original Next.js `<Link>`.

---

## 🐞 Reporting Issues

Found an edge case or unexpected behavior? File an issue here:  
👉 [https://github.com/reusable-ui/reusable-ui-monorepo/issues](https://github.com/reusable-ui/reusable-ui-monorepo/issues)

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/next-link-compat** is part of the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/next-link-compat**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/next-link-compat brings clarity and control to routing, so your UI stays semantic, accessible, and composable.**  
Give it a ⭐ on GitHub if you find it useful!  
