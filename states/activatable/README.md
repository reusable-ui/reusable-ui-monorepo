# @reusable-ui/activatable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).

- Last working version: **6.5.1**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/activatable` has been replaced by **`@reusable-ui/active-state`**, which provides a clearer, more consistent lifecycle model for active/inactive behavior in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

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

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/active-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/activatable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state).
- If you are pinned to v6.5.1, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Active State Documentation](https://www.npmjs.com/package/@reusable-ui/active-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/activatable` → **deprecated**  
- `@reusable-ui/active-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.1 is the **last working version**.  
