# @reusable-ui/clickable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/clickable` has been replaced by **`@reusable-ui/press-state`**, which provides a clearer, more consistent lifecycle model for press/release interactions in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

| Deprecated (`@reusable-ui/clickable`) | New (`@reusable-ui/press-state`)                                   |
|---------------------------------------|--------------------------------------------------------------------|
| `ClickableVars`                       | `PressStateVars`                                                   |
| `ClickableStuff`                      | `CssPressState`                                                    |
| `ClickableConfig`                     | `CssPressStateOptions`                                             |
| `usesClickable`                       | `usesPressState`                                                   |
| `ClickableProps`                      | `PressStateProps`                                                  |
| `ClickableProps.enabled`              | `disabled`                                                         |
| `ClickableProps.inheritEnabled`       | `cascadeDisabled`                                                  |
| `ClickableProps.readOnly`             | (not supported, press is not editable)                             |
| `ClickableProps.inheritReadOnly`      | (not supported, press is not editable)                             |
| `ClickableState`                      | `PressPhase`                                                       |
| `ClickableApi`                        | `PressBehaviorState`                                               |
| `useClickable`                        | `usePressBehaviorState`                                            |
| `ClickableOptions`                    | `PressStateOptions`                                                |
| `ifPress`                             | `ifPressingOrPressed`                                              |
| `ifRelease`                           | `ifReleasingOrReleased`                                            |
| `ifPressReleasing`                    | `rule([isPressingOrPressedSelector, isReleasingSelector], styles)` |

---

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/press-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/clickable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state).
- If you are pinned to v6.5.0, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Press State Documentation](https://www.npmjs.com/package/@reusable-ui/press-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/clickable` → **deprecated**  
- `@reusable-ui/press-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.0 is the **last working version**.  
