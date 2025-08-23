Here’s the completed `CONTRIBUTING.md` for `@reusable-ui/animation`, adapted precisely to your template and context:

```md
# Contributing to @reusable-ui/animation

> ⚠️ This package is **deprecated** and maintained only for backward compatibility.  
> Active development has moved to :  
> [`@reusable-ui/animation-feature`](https://www.npmjs.com/package/@reusable-ui/animation-feature),  
> [`@reusable-ui/filter-feature`](https://www.npmjs.com/package/@reusable-ui/filter-feature),  
> [`@reusable-ui/transform-feature`](https://www.npmjs.com/package/@reusable-ui/transform-feature),  
> [`@reusable-ui/box-shadow-feature`](https://www.npmjs.com/package/@reusable-ui/box-shadow-feature).  
> Please contribute to the feature-based modules unless your changes are strictly related to legacy support.

## 🧭 Purpose

This package previously provided animation, filter, transform, and box-shadow styling utilities for reusable UI components.  
It now serves as a compatibility layer for projects still relying on the legacy `usesAnimation()` API and its associated registries.

## ✅ What You Can Contribute

- 🧹 **Bug Fixes**: Only for regressions affecting legacy users
- 📖 **Docs Improvements**: Clarify migration paths, update examples
- 🧩 **Compatibility Helpers**: Utilities that bridge old APIs to new ones
- 🧪 **Test Coverage**: Add or improve tests for deprecated features

---

## 🚫 What’s Not Accepted

- ✨ New features
- 🔄 API redesigns
- 🧱 Structural refactors unrelated to migration

For new features, please contribute to:

- [`@reusable-ui/animation-feature`](https://www.npmjs.com/package/@reusable-ui/animation-feature)  
- [`@reusable-ui/filter-feature`](https://www.npmjs.com/package/@reusable-ui/filter-feature)  
- [`@reusable-ui/transform-feature`](https://www.npmjs.com/package/@reusable-ui/transform-feature)  
- [`@reusable-ui/box-shadow-feature`](https://www.npmjs.com/package/@reusable-ui/box-shadow-feature)

---

## 🧰 Development Setup

```bash
# Clone the monorepo (if applicable)
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd features/animation

# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test
```

---

## 🧪 Testing Guidelines

- Use `jest` or the existing test framework
- Focus on edge cases for animation, filter, transform, and box-shadow logic
- Ensure deprecated APIs like `usesAnimation()` and `AnimationVars` still behave as expected

---

## 📦 Publishing

This package is **not actively published**.  
If a critical fix is merged, it will be released as a **patch version** with a clear changelog entry.

---

## 🙏 Thank You

Even though this package is deprecated, your effort to maintain stability for legacy users is deeply appreciated.  
If you’re interested in shaping the future of reusable UI systems, we encourage you to contribute to the active feature-based packages in the monorepo.
```

Let me know if you'd like a matching `CHANGELOG.md` entry or a migration checklist for downstream consumers. You're setting a high bar for graceful deprecation.
