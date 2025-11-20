# @reusable-ui/disableable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/disableable` has been replaced by **`@reusable-ui/disabled-state`**, which provides a clearer, more consistent lifecycle model for disabled/enabled behavior in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

| Deprecated (`@reusable-ui/disableable`) | New (`@reusable-ui/disabled-state`)                                 |
|-----------------------------------------|---------------------------------------------------------------------|
| `DisableableVars`                       | `DisabledStateVars`                                                 |
| `DisableableStuff`                      | `CssDisabledState`                                                  |
| `DisableableConfig`                     | `CssDisabledStateOptions`                                           |
| `usesDisableable`                       | `usesDisabledState`                                                 |
| `DisableableProps.enabled`              | `DisabledStateProps.disabled`                                       |
| `DisableableProps.inheritEnabled`       | `DisabledStateProps.cascadeDisabled`                                |
| `DisableableProps`                      | `DisabledStateProps`                                                |
| `DisableableState`                      | `DisabledPhase`                                                     |
| `DisableableApi`                        | `DisabledBehaviorState`                                             |
| `useDisableable`                        | `useDisabledBehaviorState`                                          |
| `ifEnable`                              | `ifEnablingOrEnabled`                                               |
| `ifDisable`                             | `ifDisablingOrDisabled`                                             |
| `ifEnablingDisable`                     | `rule([isDisablingOrDisabledSelector, isEnablingSelector], styles)` |

---

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/disabled-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/disableable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state).
- If you are pinned to v6.5.0, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Disabled State Documentation](https://www.npmjs.com/package/@reusable-ui/disabled-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/disableable` → **deprecated**  
- `@reusable-ui/disabled-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.0 is the **last working version**.  
