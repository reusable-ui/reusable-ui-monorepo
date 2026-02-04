# @reusable-ui/client-sides ⚠️ (Deprecated)

**This package is deprecated** and previously offered a React component-based utility for router-agnostic link enhancement.

> ✅ Modern usage should migrate to [`useOptionalLinkWrapper()` in @reusable-ui/links](https://www.npmjs.com/package/@reusable-ui/links).

## 📦 What It Provided

This package exported the following:

- `<ElementWithMaybeLink elementComponent={...} />`

This component allowed developers to enhance semantic elements (like `<ActionControl>`, `<Button>`, etc.) with optional routing logic — wrapping with a `<Link>` if one was detected among the children.

It acted as a compatibility bridge for client-side navigation frameworks like **Next.js** and **React Router**, while preserving semantic correctness.

---

## 📢 Migration Guide

If you were using:

```tsx
import ElementWithMaybeLink from '@reusable-ui/client-sides';
import { BaseButton, BaseButtonProps } from './BaseButton';

interface SmartButtonProps extends BaseButtonProps {}

const SmartButton = (props: SmartButtonProps) => {
    // Enhances the <BaseButton> with client-side link detection (e.g., <Link> from Next.js or React Router):
    return useOptionalLinkWrapper(
        <ElementWithMaybeLink
            elementComponent={
                <BaseButton {...props} />
            }
        />
    );
};
```

You should replace it with:

```tsx
import { useOptionalLinkWrapper } from '@reusable-ui/links';
import { BaseButton, BaseButtonProps } from './BaseButton';

interface SmartButtonProps extends BaseButtonProps {}

const SmartButton = (props: SmartButtonProps) => {
    // Enhances the <BaseButton> with client-side link detection (e.g., <Link> from Next.js or React Router):
    return useOptionalLinkWrapper(
        <BaseButton {...props} />
    );
};
```

This refactor moves your project toward hook-based composition, reduces nesting, and improves compatibility with composable design systems.

---

## 📦 Installation
Though deprecated, you can still install **@reusable-ui/client-sides** for compatibility:

```sh
npm install @reusable-ui/client-sides
# or
yarn add @reusable-ui/client-sides
```

However, it’s **strongly recommended** to migrate to the new package:

```sh
npm install @reusable-ui/links
# or
yarn add @reusable-ui/links
```

## 🛠️ Why It’s Deprecated

- ⛔ Component-based enhancement (`<ElementWithMaybeLink />`) had limited ergonomics and reduced flexibility.
- ✅ The modern hook-based API (`useOptionalLinkWrapper()`) provides greater composability and testability.
- 💡 This package now exists only as a **soft-deprecation bridge** and may be removed in a future major version.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/client-sides** was previously an essential utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Since this package is deprecated, contributions should be directed to the specialized packages.  
See our [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

📢 **Migrate to `@reusable-ui/links` for modern, hook-first, semantic-friendly navigation logic.**
