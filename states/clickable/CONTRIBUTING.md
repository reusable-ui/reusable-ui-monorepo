# Contributing to @reusable-ui/clickable

⚠️ **Important Notice**  
`@reusable-ui/clickable` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/clickable`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `clickable` → `press-state`.  

---

## 📚 Migration Reference

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

## ✅ Summary

- `@reusable-ui/clickable` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
