# Contributing to @reusable-ui/active-as-click

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/active-transition`](https://www.npmjs.com/package/@reusable-ui/active-transition).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## ✅ What Contributions Are Welcome

- **Documentation improvements**: Clarify migration steps, update README examples, or improve deprecation notices.  
- **Bug fixes in migration guides**: Correct broken references or inaccurate instructions.  
- **Test maintenance**: Ensure deprecation warnings and migration references remain consistent.  

---

## ❌ What Contributions Are Not Accepted

- **New features**: This package will not receive new functionality.  
- **API extensions**: Do not add new exports or variables.  
- **Compatibility shims**: Do not attempt to recreate old behavior — migration should point to `@reusable-ui/active-transition`.  

---

## 🧑‍💻 Development Setup

If you need to make documentation or test updates:

1. Fork & clone the repository:
   ```bash
   git clone https://github.com/<your-org>/<repo>.git
   cd <repo>/packages/active-as-click
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run build & tests:
   ```bash
   npm run build
   npm test
   ```

---

## 🔄 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org):

- `docs(active-as-click): update migration guide`
- `chore(active-as-click): clarify deprecation notice`
- `test(active-as-click): adjust deprecation tests`

---

## 📚 Migration Focus

Contributors should ensure all docs/tests point developers toward:

- [`@reusable-ui/active-transition`](https://www.npmjs.com/package/@reusable-ui/active-transition) – the recommended replacement.  
- `@reusable-ui/active-state` and `@reusable-ui/press-state` – React‑side state hooks for active/press interactions.  

---

## 🛡️ License

Contributions are licensed under the **MIT License**.

---

🚀 **Reminder**: This package is deprecated. Please direct your efforts toward improving migration guidance and related documentation, not adding new features.  
