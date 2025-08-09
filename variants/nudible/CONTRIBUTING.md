# Contributing to @reusable-ui/nudible

> ⚠️ This package is **deprecated** and superseded by [`@reusable-ui/bare-variant`](https://www.npmjs.com/package/@reusable-ui/bare-variant).  
> While contributions are welcome for legacy support, new features should target the `bare` variant system instead.

---

## 🧭 Purpose

`@reusable-ui/nudible` was originally designed to toggle "nude" styling—removing background, borders, and padding.  
Its logic has now been unified under the more semantically consistent: [`@reusable-ui/bare-variant`](https://www.npmjs.com/package/@reusable-ui/bare-variant).

This package remains available to support legacy components and migration paths.

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

For new features, please contribute to [`@reusable-ui/bare-variant`](https://www.npmjs.com/package/@reusable-ui/bare-variant) instead.

---

## 🧪 Development Setup

```bash
# Clone the monorepo
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd variants/nudible

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
If you're unsure whether a change belongs here or in `@reusable-ui/bare`, feel free to open a discussion.
