# Contributing to @reusable-ui/gradientable

> ⚠️ This package is **deprecated** and no longer actively maintained.  
> Contributions are only accepted for **critical bug fixes** or **migration support**.

---

## 🛠️ Migration-Focused Contributions

Since `@reusable-ui/gradientable` has been superseded by [`@reusable-ui/emphasis-variant`](https://www.npmjs.com/package/@reusable-ui/emphasis-variant), we welcome contributions that help:

- Ease migration for existing users
- Improve documentation and clarity
- Provide compatibility shims or transitional utilities

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

For new features, please contribute to [`@reusable-ui/emphasis-variant`](https://www.npmjs.com/package/@reusable-ui/emphasis-variant) instead.

---

## 🧰 Development Setup

```bash
# Clone the monorepo (if applicable)
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd variants/gradientable

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
- Focus on edge cases for gradient toggling logic
- Ensure deprecated APIs still behave as expected

---

## 📦 Publishing

This package is **not actively published**.  
If a critical fix is merged, it will be released as a **patch version** with a clear changelog entry.

---

## 💬 Questions & Feedback

For migration help or questions about the new emphasize variant system, feel free to open a [discussion](https://github.com/reusable-ui/reusable-ui/discussions) or reach out via issues.

---

Thanks for helping maintain a smooth transition for the community!  
