# Contributing to @reusable-ui/animating-state 🎥

Thanks for stopping by! 🚀  
This package has been **deprecated** in favor of [`@reusable-ui/animation-state`](https://github.com/reusable-ui/reusable-ui-monorepo/tree/main/utilities/animation-state),  
but we still welcome contributions that improve legacy compatibility, migration clarity, or documentation.

---

## ⚠️ Deprecation Notice

This package wraps the newer `useAnimationState` logic from React 19,  
preserving the original API for compatibility with React 18-based projects.  
New animation features and improvements should target `@reusable-ui/animation-state`.

---

## 🛠️ How to Contribute

### 1️⃣ Report Issues
- Found a migration issue or backward-compatibility bug?  
  Open an issue [here](https://github.com/reusable-ui/reusable-ui-monorepo/issues).  
- Please include clear reproduction steps and expected behavior.

### 2️⃣ Submit a Pull Request (PR)
- Fork the repository and clone it locally.
- Create a new branch (`fix-xyz` or `docs-update`).
- Follow code style and linting rules (TypeScript + ESLint).
- PRs should focus on fixes, documentation, or transition hints — no new features.

### 3️⃣ Improve Documentation
Help transitional users by:
- Clarifying migration from `useAnimatingState` to `useAnimationState`
- Fixing typos or improving examples in the README
- Updating inline comments for legacy use cases

---

## 🔥 Code Guidelines
- Use TypeScript for consistency
- Follow monorepo ESLint configuration
- Keep code modular, minimal, and focused on compatibility

---

## 📦 Local Setup
```sh
git clone https://github.com/reusable-ui/reusable-ui-monorepo.git
cd utilities/animating-state
npm install
npm run dev
```

---

## 💬 Need Help?
Join our [GitHub Discussions](https://github.com/reusable-ui/reusable-ui-monorepo/discussions)  
or open an issue to chat with the team!

---

Thanks for helping maintain and document **@reusable-ui/animating-state** for smooth migrations.  
For all new animation lifecycle logic, head over to [`@reusable-ui/animation-state`](https://github.com/reusable-ui/reusable-ui-monorepo/tree/main/utilities/animation-state). ✨
