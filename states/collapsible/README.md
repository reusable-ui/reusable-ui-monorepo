# @reusable-ui/collapsible

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state).

- Last working version: **6.5.1**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/collapsible` has been replaced by **`@reusable-ui/collapse-state`**, which provides a clearer, more consistent lifecycle model for expand/collapse behavior in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

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
| `ControllableCollapsibleProps`          | `CollapseStatePropsHandles user-initiated requests to change the`                                    |
| `UncontrollableCollapsibleProps`        | `CollapseStatePropsHandles user-initiated requests to change the & UncontrollableCollapseStateProps` |
| `useUncontrollableCollapsible`          | `useUncontrollableCollapseState`                                                   |

---

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/collapse-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/collapsible@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state).
- If you are pinned to v6.5.1, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Collapse State Documentation](https://www.npmjs.com/package/@reusable-ui/collapse-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/collapsible` → **deprecated**  
- `@reusable-ui/collapse-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.1 is the **last working version**.  
