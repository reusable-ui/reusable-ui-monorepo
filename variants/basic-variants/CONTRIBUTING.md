# Contributing to `@reusable-ui/basic-variants`

> ⚠️ This package is **deprecated** and maintained only for legacy support.  
> Active development has moved to [`@reusable-ui/styling-variants`](https://www.npmjs.com/package/@reusable-ui/styling-variants).

---

## 🧭 Purpose

This package exists to support older components and codebases that still rely on `BasicVariantProps` and `useBasicVariantProps`.  
All contributions should focus on:

- Ensuring backward compatibility
- Preventing regressions during migration
- Clarifying deprecation paths

---

## 🛠️ What You Can Contribute

- 🧹 **Bug Fixes**: Only for regressions affecting legacy users
- 📖 **Docs Improvements**: Clarify migration paths, update examples
- 🧩 **Compatibility Helpers**: Utilities that bridge old APIs to new ones
- 🧪 **Test Coverage**: Add or improve tests for deprecated features

---

## 🚫 What’s Not Accepted

- ✨ New features
- 🔄 API redesigns
- 🧱 Structural refactors unrelated to migration

For new features, please contribute to [`@reusable-ui/styling-variants`](https://www.npmjs.com/package/@reusable-ui/styling-variants) instead.

---

## 🧪 Development Setup

```bash
# Clone the monorepo
git clone https://github.com/reusable-ui/reusable-ui.git
cd variants/basic-variants

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

Your contributions help ensure a smooth transition for developers relying on legacy APIs.  
If you're ready to contribute to the future of styling variants, check out [`@reusable-ui/styling-variants`](https://www.npmjs.com/package/@reusable-ui/styling-variants) instead.
