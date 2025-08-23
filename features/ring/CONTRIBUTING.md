# Contributing to @reusable-ui/ring

> ⚠️ This package is **deprecated** and maintained only for backward compatibility.  
> Active development has moved to [`@reusable-ui/ring-feature`](https://www.npmjs.com/package/@reusable-ui/ring-feature).  
> Please contribute to the feature-based module unless your changes are strictly related to legacy support.

## 🧭 Purpose

This package previously provided ring styling utilities for reusable UI components. It now serves as a compatibility layer for projects still relying on the legacy API.

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

For new features, please contribute to [`@reusable-ui/ring-feature`](https://www.npmjs.com/package/@reusable-ui/ring-feature) instead.

---

## 🧰 Development Setup

```bash
# Clone the monorepo (if applicable)
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd features/ring

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
- Focus on edge cases for ring logic
- Ensure deprecated APIs still behave as expected

---

## 📦 Publishing

This package is **not actively published**.  
If a critical fix is merged, it will be released as a **patch version** with a clear changelog entry.

---

## 🙏 Thank You

Even though this package is deprecated, your effort to maintain stability for legacy users is deeply appreciated.  
If you’re interested in shaping the future of reusable UI systems, we encourage you to contribute to the active packages in the monorepo.
