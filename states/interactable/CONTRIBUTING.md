# Contributing to @reusable-ui/interactable

⚠️ **Important Notice**  
`@reusable-ui/interactable` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/interactable`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `interactable` → `hover-state`.  

---

## 📚 Migration Reference

| Deprecated (`@reusable-ui/interactable`) | New (`@reusable-ui/hover-state`)                                    |
|------------------------------------------|---------------------------------------------------------------------|
| `InteractableVars`                       | `HoverStateVars`                                                    |
| `InteractableStuff`                      | `CssHoverState`                                                     |
| `InteractableConfig`                     | `CssHoverStateOptions`                                              |
| `usesInteractable`                       | `usesHoverState`                                                    |
| `InteractableProps`                      | `HoverStateProps`                                                   |
| `InteractableProps.enabled`              | `disabled`                                                          |
| `InteractableProps.inheritEnabled`       | `cascadeDisabled`                                                   |
| `InteractableState`                      | `HoverPhase`                                                        |
| `InteractableApi`                        | `HoverBehaviorState`                                                |
| `useInteractable`                        | `useHoverBehaviorState`                                             |
| `ifArrived`                              | `ifHovered`                                                         |
| `ifArriving`                             | `ifHovering`                                                        |
| `ifLeaving`                              | `ifUnhovering`                                                      |
| `ifLeaved`                               | `ifUnhovered`                                                       |
| `ifArrive`                               | `ifHoveringOrHovered`                                               |
| `ifLeave`                                | `ifUnhoveringOrUnhovered`                                           |
| `ifArriveLeaving`                        | `rule([isHoveringOrHoveredSelector, isUnhoveringSelector], styles)` |

---

## ✅ Summary

- `@reusable-ui/interactable` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
