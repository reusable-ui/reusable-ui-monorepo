# @reusable-ui/focusable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state).

- Last working version: **6.5.1**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/focusable` has been replaced by **`@reusable-ui/focus-state`**, which provides a clearer, more consistent lifecycle model for focus/blur behavior in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

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

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/focus-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/focusable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state).
- If you are pinned to v6.5.1, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Focus State Documentation](https://www.npmjs.com/package/@reusable-ui/focus-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/focusable` → **deprecated**  
- `@reusable-ui/focus-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.5.1 is the **last working version**.  
