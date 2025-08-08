# Contributing to @reusable-ui/mildable

> ⚠️ This package is **deprecated** and superseded by [`@reusable-ui/mild-variant`](https://www.npmjs.com/package/@reusable-ui/mild-variant).  
> Contributions to this package are limited to critical legacy support only.

---

## 🧭 Purpose

This package was originally designed to provide mild-based styling logic for reusable UI components.  
It has since been replaced by a more modular and declarative solution: [`@reusable-ui/mild-variant`](https://www.npmjs.com/package/@reusable-ui/mild-variant).

If you're looking to contribute new features or improvements, please direct your efforts to the replacement package.

---

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

For new features, please contribute to [`@reusable-ui/mild-variant`](https://www.npmjs.com/package/@reusable-ui/mild-variant) instead.

---

## 🧰 Development Setup

```bash
# Clone the monorepo (if applicable)
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd variants/mildable

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
- Focus on edge cases for mild toggling logic
- Ensure deprecated APIs still behave as expected

---

## 📦 Publishing

This package is **not actively published**.  
If a critical fix is merged, it will be released as a **patch version** with a clear changelog entry.

---

## 🙏 Thank You

Even though this package is deprecated, your effort to maintain stability for legacy users is deeply appreciated.  
If you’re interested in shaping the future of reusable UI systems, we encourage you to contribute to the active packages in the monorepo.
