# Contributing to @reusable-ui/activatable

⚠️ **Important Notice**  
`@reusable-ui/activatable` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).

- Last working version: **6.5.1**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/activatable`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `activatable` → `active-state`.  

---

## 📚 Migration Reference

| Deprecated (`@reusable-ui/activatable`) | New (`@reusable-ui/active-state`)                                            |
|-----------------------------------------|------------------------------------------------------------------------------|
| `ActivatableVars`                       | `ActiveStateVars`                                                            |
| `ActivatableStuff`                      | `CssActiveState`                                                             |
| `ActivatableConfig`                     | `CssActiveStateOptions`                                                      |
| `usesActivatable`                       | `usesActiveState`                                                            |
| `ActivatableProps`                      | `ActiveStateProps`                                                           |
| `ActivatableProps.inheritActive`        | `ActiveStateProps.cascadeActive`                                             |
| `ActivatableState`                      | `ActivePhase`                                                                |
| `ActivatableApi`                        | `ActiveBehaviorState`                                                        |
| `useActivatable`                        | `useActiveBehaviorState`                                                     |
| `ControllableActivatableProps`          | `ActiveStateProps & ActiveStateChangeProps`                                  |
| `UncontrollableActivatableProps`        | `ActiveStateProps & ActiveStateChangeProps & UncontrollableActiveStateProps` |
| `useUncontrollableActivatable`          | `useUncontrollableActiveState`                                               |
| `ifActivated`                           | `ifActive`                                                                   |
| `ifActivating`                          | `ifActivating`                                                               |
| `ifPassivating`                         | `ifDeactivating`                                                             |
| `ifPassivated`                          | `ifInactive`                                                                 |
| `ifActive`                              | `ifActivatingOrActive`                                                       |
| `ifPassive`                             | `ifDeactivatingOrInactive`                                                   |
| `ifActivePassivating`                   | `rule([isActivatingOrActiveSelector, isDeactivatingSelector], styles)`       |
| `markActive`                            | (no longer needed, variants handled directly)                                |

---

## ✅ Summary

- `@reusable-ui/activatable` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
