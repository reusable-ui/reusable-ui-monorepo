# @reusable-ui/interactable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state).

- Last working version: **6.5.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/interactable` has been replaced by **`@reusable-ui/hover-state`**, which provides a clearer, more consistent lifecycle model for hover/leave interactions in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

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

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/hover-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/interactable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state).
- If you are pinned to v6.5.0, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Hover State Documentation](https://www.npmjs.com/package/@reusable-ui/hover-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/interactable` → **deprecated**  
- `@reusable-ui/hover-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.0 is the **last working version**.  
