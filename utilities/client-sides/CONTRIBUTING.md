# Contributing to @reusable-ui/client-sides 📢

## ⚠️ Deprecation Notice

**`@reusable-ui/client-sides` is deprecated** and now serves as a transitional proxy for `@reusable-ui/links`.

All runtime functionality — including semantic link composition via `useOptionalLinkWrapper()` — is now maintained in:

- [`@reusable-ui/links`](https://github.com/reusable-ui/reusable-ui-monorepo/tree/master/utilities/links)

Please update your imports to reference `@reusable-ui/links` directly for future-proof compatibility and improved maintainability.

## 🏗️ How to Contribute
Even though `@reusable-ui/client-sides` is deprecated, you can contribute by:
1. **Improving migration guides** → Help users transition smoothly.
2. **Fixing re-export issues** → Ensure proper deprecation annotations and references.
3. **Enhancing documentation** → Provide clarity on usage of the re-exported packages.

## 🚀 Submitting a Pull Request
If submitting improvements related to **deprecations or re-exports**:
1. **Fork the repository**.
2. **Create a new branch** (`fix-deprecations` or `docs-improvement`).
3. **Ensure correct `@deprecated` annotations**.
4. **Update README and migration guides**.
5. **Submit your pull request** with a clear description.

## 📜 Code Style & Best Practices
Since `@reusable-ui-hooks` mainly re-exports items:
✅ Ensure **consistent formatting** in deprecation notices.  
✅ Use **clear and structured documentation**.  
✅ Avoid introducing **new implementations**—instead, contribute to specialized packages.

## ❓ Need Help?
For questions, join the **Reusable-UI community** discussions or check out the relevant repository of the specialized package.

---

🚀 **Thank you for improving Reusable-UI!** Even in deprecation, structured transitions make a difference.  
