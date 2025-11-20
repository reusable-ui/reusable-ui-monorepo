# @reusable-ui/scrollable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/view-state`](https://www.npmjs.com/package/@reusable-ui/view-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/scrollable` has been replaced by **`@reusable-ui/view-state`**, which provides a unified and consistent lifecycle model for scroll index and view transitions.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

| Deprecated (`@reusable-ui/scrollable`) | New (`@reusable-ui/view-state`)                                        |
|----------------------------------------|------------------------------------------------------------------------|
| `ScrollIndexChangeEvent`               | (no longer needed)                                                     |
| `ScrollableProps`                      | `ViewStateProps`                                                       |
| `ControllableScrollableProps`          | `ViewStateProps & ViewStateChangeProps`                                |
| `UncontrollableScrollableProps`        | `ViewStateProps & ViewStateChangeProps & UncontrollableViewStateProps` |
| `UncontrollableScrollableOptions`      | `ViewStateOptions`                                                     |
| `useUncontrollableScrollable`          | `useUncontrollableViewState`                                           |

---

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/view-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/scrollable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/view-state`](https://www.npmjs.com/package/@reusable-ui/view-state).
- If you are pinned to v6.5.0, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [View State Documentation](https://www.npmjs.com/package/@reusable-ui/view-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/scrollable` → **deprecated**  
- `@reusable-ui/view-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.0 is the **last working version**.  
