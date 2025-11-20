# Contributing to @reusable-ui/collapsible

⚠️ **Important Notice**  
`@reusable-ui/collapsible` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state).

- Last working version: **6.5.1**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/collapsible`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `collapsible` → `collapse-state`.  

---

## 📚 Migration Reference

| Deprecated (`@reusable-ui/collapsible`) | New (`@reusable-ui/collapse-state`)                                                |
|-----------------------------------------|------------------------------------------------------------------------------------|
| `CollapsibleVars`                       | `CollapseStateVars`                                                                |
| `CollapsibleStuff`                      | `CssCollapseState`                                                                 |
| `CollapsibleConfig`                     | `CssCollapseStateOptions`                                                          |
| `usesCollapsible`                       | `usesCollapseState`                                                                |
| `CollapsibleProps`                      | `CollapseStateProps`                                                               |
| `CollapsibleState`                      | `ExpandPhase`                                                                      |
| `CollapsibleApi`                        | `CollapseBehaviorState`                                                            |
| `useCollapsible`                        | `useCollapseBehaviorState`                                                         |
| `CollapsibleEventProps`                 | `CollapseStatePhaseEventProps`                                                     |
| `useCollapsibleEvent`                   | `useCollapseStatePhaseEvents`                                                      |
| `ControllableCollapsibleProps`          | `CollapseStateProps & CollapseStateChangeProps`                                    |
| `UncontrollableCollapsibleProps`        | `CollapseStateProps & CollapseStateChangeProps & UncontrollableCollapseStateProps` |
| `useUncontrollableCollapsible`          | `useUncontrollableCollapseState`                                                   |

---

## ✅ Summary

- `@reusable-ui/collapsible` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
