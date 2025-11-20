# @reusable-ui/excitable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/excite-state`](https://www.npmjs.com/package/@reusable-ui/excite-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/excitable` has been replaced by **`@reusable-ui/excite-state`**, which provides a clearer, more consistent lifecycle model for "excite" behavior in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

| Deprecated (`@reusable-ui/excitable`) | New (`@reusable-ui/excite-state`)       |
|---------------------------------------|-----------------------------------------|
| `ExcitableVars`                       | `ExciteStateVars`                       |
| `ExcitableStuff`                      | `CssExciteState`                        |
| `ExcitableConfig`                     | `CssExciteStateOptions`                 |
| `usesExcitable`                       | `usesExciteState`                       |
| `ExcitableProps`                      | `ExciteStateProps`                      |
| `ExcitableState`                      | (removed)                               |
| `ExcitableApi`                        | `ExciteBehaviorState`                   |
| `useExcitable`                        | `useExciteBehaviorState`                |
| `ControllableExcitableProps`          | (removed, use `ExciteStateProps`)       |
| `useControllableExcitable`            | (removed, use `useExciteBehaviorState`) |

---

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/excite-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/excitable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/excite-state`](https://www.npmjs.com/package/@reusable-ui/excite-state).
- If you are pinned to v6.5.0, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Excite State Documentation](https://www.npmjs.com/package/@reusable-ui/excite-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/excitable` → **deprecated**  
- `@reusable-ui/excite-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.0 is the **last working version**.  
