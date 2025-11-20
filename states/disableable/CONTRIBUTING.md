# Contributing to @reusable-ui/disableable

⚠️ **Important Notice**  
`@reusable-ui/disableable` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/disableable`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `disableable` → `disabled-state`.  

---

## 📚 Migration Reference

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

## ✅ Summary

- `@reusable-ui/disableable` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
