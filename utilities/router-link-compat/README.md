# @reusable-ui/router-link-compat 📦  

A **React Router-compatible `<Link>` and `<NavLink>` alternative** with optional anchorless rendering — ensuring clean semantics, accessible markup, and compatibility with custom interactive components.

## ✨ Features
✔️ Drop-in replacement for React Router’s `<Link>` and `<NavLink>` with anchorless support  
✔️ Prevents invalid nested anchors (like `<a><button>...</button></a>`)  
✔️ Forwards `href`, `ref`, and handlers to the actual interactive child  
✔️ Seamlessly integrates with Reusable UI or standalone design systems  
✔️ Works with **React Router** v7+ and Remix-compatible routers (React 19-ready)  

## 📦 Installation
Install **@reusable-ui/router-link-compat** via npm or yarn:

```sh
npm install @reusable-ui/router-link-compat
# or
yarn add @reusable-ui/router-link-compat
```

## 🧩 Usage: `<RouterLinkCompat>` (a.k.a. `<Link>`) and `<RouterNavLinkCompat>` (a.k.a. `<NavLink>`)

`<RouterLinkCompat>` and `<RouterNavLinkCompat>` are drop-in replacement for React Router’s `<Link>` and `<NavLink>` component with better behavior by default:

- ✅ Prevents unintended nested anchors by enabling `anchorless`
- ✅ Promotes `href`, `ref`, and event handlers to the intended interactive child
- ✅ Works seamlessly with buttons, custom components, clickable cards, etc.

### Basic Link

```tsx
import {
    RouterLinkCompat,
    Link, // ✅ Familiar alias, interchangeable with RouterLinkCompat
} from '@reusable-ui/router-link-compat';

<RouterLinkCompat to='/dashboard' anchorless>
    <button>Go to Dashboard</button>
</RouterLinkCompat>

// Or use the alias:
<Link to='/dashboard' anchorless>
    <button>Go to Dashboard</button>
</Link>
```

### Navigation Link with Active Styling

```tsx
import {
    RouterNavLinkCompat,
    NavLink, // ✅ Familiar alias, interchangeable with RouterLinkCompat
} from '@reusable-ui/router-link-compat';

<RouterNavLinkCompat to='/dashboard' anchorless className={({ isActive }) => isActive ? 'active' : ''}>
    <button>Go to Dashboard</button>
</RouterNavLinkCompat>

// Or use the alias:
<NavLink to='/dashboard' anchorless className={({ isActive }) => isActive ? 'active' : ''}>
    <button>Go to Dashboard</button>
</NavLink>
```

---

## ⚙ API

`<RouterLinkCompat>` and `<RouterNavLinkCompat>` accept all props from [`react-router-dom`](https://reactrouter.com/en/main/components/link) (`<Link>` and `<NavLink>`) plus two extra flags:

```ts
interface CompatLinkProps {
    /** Enables the anchorless behavior. If false, it behaves like the original React Router `<Link>`. */
    anchorless ?: boolean
    
    /** If true, explicitly forwards `href` to the child component (used in anchorless mode). */
    passHref   ?: boolean
}
```

- `anchorless` and `passHref` are handled internally by `<RouterLinkCompat>` and are **not passed** to the underlying React Router `<Link>` or `<NavLink>`.
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
- [`@reusable-ui/next-link-compat`](https://www.npmjs.com/package/@reusable-ui/next-link-compat) – Next.js-compatible version  

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/router-link-compat** is part of the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/router-link-compat**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/router-link-compat helps you build semantic links that play well with design systems and routing libraries alike.**  
Give it a ⭐ on GitHub if you find it useful!  
