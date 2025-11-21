# Contributing to @reusable-ui/focusable

⚠️ **Important Notice**  
`@reusable-ui/focusable` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state).

- Last working version: **6.5.1**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/focusable`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `focusable` → `focus-state`.  

---

## 📚 Migration Reference

| Deprecated (`@reusable-ui/focusable`) | New (`@reusable-ui/focus-state`)                                  |
|---------------------------------------|-------------------------------------------------------------------|
| `FocusableVars`                       | `FocusStateVars`                                                  |
| `FocusableStuff`                      | `CssFocusState`                                                   |
| `FocusableConfig`                     | `CssFocusStateOptions`                                            |
| `usesFocusable`                       | `usesFocusState`                                                  |
| `FocusableProps`                      | `FocusStateProps`                                                 |
| `FocusableProps.enabled`              | `disabled`                                                        |
| `FocusableProps.inheritEnabled`       | `cascadeDisabled`                                                 |
| `FocusableState`                      | `FocusPhase`                                                      |
| `FocusableApi`                        | `FocusBehaviorState`                                              |
| `useFocusable`                        | `useFocusBehaviorState`                                           |
| `ifFocus`                             | `ifFocusingOrFocused`                                             |
| `ifBlur`                              | `ifBlurringOrBlurred`                                             |
| `ifFocusBlurring`                     | `rule([isFocusingOrFocusedSelector, isBlurringSelector], styles)` |
| `selectorFocusVisibleWithin`          | (no longer needed, browsers support `:has(...)`)                  |

---

## ✅ Summary

- `@reusable-ui/focusable` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
