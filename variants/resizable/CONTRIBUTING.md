# Contributing to @reusable-ui/resizable

> ⚠️ This package is **deprecated** and maintained only for backward compatibility.  
> Active development has moved to [`@reusable-ui/size-variant`](https://www.npmjs.com/package/@reusable-ui/size-variant).

---

## 🧭 Purpose of This Repo

This repository exists to support legacy systems that still rely on `@reusable-ui/resizable`.  
While no new features will be added, we welcome contributions that:

- Fix bugs or improve stability
- Improve documentation for migration
- Ensure compatibility with newer versions of `@cssfn/core` or `@reusable-ui/*` packages

---

## 🛠️ How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd variants/resizable
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Make Your Changes

Please follow these conventions:

- Use TypeScript
- Keep deprecated APIs clearly marked with `@deprecated` JSDoc
- Avoid introducing new features unless they aid migration

### 4. Run Tests (if applicable)

```bash
npm test
```

> Note: This package may not include automated tests due to its deprecated status. Manual validation is acceptable.

### 5. Submit a Pull Request

- Clearly describe the purpose of your change
- If fixing a bug, include reproduction steps or a minimal example
- If improving migration docs, link to relevant usage patterns

---

## 🧹 Code Style

- Use consistent formatting (2-space indentation, trailing commas)
- Prefer semantic naming (`sizeVariantRule`, not `resizableRule`)
- Avoid side effects in utility functions

---

## 🚫 What Not to Do

- Do not add new features unrelated to migration or stability
- Do not refactor deprecated APIs unless necessary for compatibility
- Do not remove deprecated exports — they must remain available for legacy consumers

---

## 📦 Migrating to `@reusable-ui/size-variant`

If you're interested in contributing to the successor package, check out:

👉 [`@reusable-ui/size-variant`](https://www.npmjs.com/package/@reusable-ui/size-variant)

That’s where the future of size management lives — with semantic support, fallback chaining, and full variant integration.

---

Thanks for helping maintain a smooth transition for developers!  
If you have questions or want to propose a migration utility, feel free to open an issue.
