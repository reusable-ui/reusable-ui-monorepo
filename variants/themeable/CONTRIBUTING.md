# Contributing to `@reusable-ui/themeable`

> ⚠️ This package is **deprecated** as of version `7.0.0`.  
> Active development has moved to [`@reusable-ui/theme-variant`](https://www.npmjs.com/package/@reusable-ui/theme-variant).  
> Contributions to this package should focus on **maintenance**, **migration support**, or **documentation improvements** only.

---

## 🧭 Purpose of This Package

`@reusable-ui/themeable` was originally designed to provide theme-based color options for UI components.  
It offered conditional styling logic for themes like `primary`, `success`, `danger`, etc., and supported mild/outlined variants.

As of v7, this package is deprecated in favor of a more modular and declarative system: [`@reusable-ui/theme-variant`](https://www.npmjs.com/package/@reusable-ui/theme-variant).

---

## ✅ What You Can Contribute

While new features are no longer accepted, we welcome contributions that:

- 🧹 Improve migration documentation
- 🧪 Fix bugs in legacy behavior
- 🛠️ Ensure compatibility with existing consumers
- 📚 Clarify deprecation notices and usage examples

---

## 🚫 What Not to Contribute

Please avoid:

- Adding new features or variants
- Refactoring deprecated logic
- Introducing breaking changes

Instead, direct innovation and enhancements to the [`theme-variant`](https://github.com/reusable-ui/reusable-ui-monorepo/tree/main/variants/theme-variant) package.

---

## 🛠 Development Setup

This package is part of the [`reusable-ui-monorepo`](https://github.com/reusable-ui/reusable-ui-monorepo).

To get started:

```bash
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd reusable-ui-monorepo
npm install
```

Then navigate to the package:

```bash
cd variants/themeable
```

---

## 🧪 Testing

Since this package primarily defines CSS variables and rules, testing focuses on:

- Visual regression (via consuming components)
- Snapshot consistency
- Runtime behavior of conditional selectors

Please ensure any changes do not break downstream usage in legacy components.

---

## 📦 Publishing

This package is versioned independently.  
If you need to publish a patch (e.g. for migration support), follow the monorepo’s release workflow and clearly mark the change as a **maintenance update**.

---

## 🙏 Thank You

Even in its deprecated state, `@reusable-ui/themeable` remains a part of the ecosystem’s history.  
Your contributions help ensure a smooth transition for developers and preserve the integrity of legacy systems.

For active development, please visit [`@reusable-ui/theme-variant`](https://github.com/reusable-ui/reusable-ui-monorepo/tree/main/variants/theme-variant).
