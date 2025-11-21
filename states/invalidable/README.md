# @reusable-ui/invalidable

⚠️ **Deprecated since v7.0.0**  
This package is no longer functional. It exists only as a **migration tool** to guide contributors toward [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).

- Last working version: **6.14.0**
- Current version: **7.0.0** (migration shim only)

---

## ✨ What changed?

`@reusable-ui/invalidable` has been replaced by **`@reusable-ui/validity-state`**, which provides a clearer, more consistent lifecycle model for valid/invalid behavior in UI components.

The old API surface is marked with `@deprecated` JSDoc tags and points to the new equivalents. This release does **not** provide a working implementation — it only helps you migrate.

---

## 🔄 Migration Guide

| Deprecated (`@reusable-ui/invalidable`) | New (`@reusable-ui/validity-state`)    |
|-----------------------------------------|----------------------------------------|
| `InvalidableVars`                       | `ValidityStateVars`                    |
| `InvalidableStuff`                      | `CssValidityState`                     |
| `InvalidableConfig`                     | `CssValidityStateOptions`              |
| `usesInvalidable`                       | `usesValidityState`                    |
| `InvalidableProps`                      | `ValidityStateProps`                   |
| `InvalidableProps.isValid`              | `validity`                             |
| `InvalidableProps.onValidation`         | `props.onValidityUpdate`               |
| `InvalidableProps.enableValidation`     | `validity='auto'` or `validity={null}` |
| `InvalidableProps.cascadeValidation`    | (no longer supported)                  |
| `InvalidableState`                      | `ValidityPhase`                        |
| `InvalidableApi`                        | `ValidityBehaviorState`                |
| `useInvalidable`                        | `useValidityBehaviorState`             |
| `ValidityChangeEvent`                   | (no longer needed, use `validity`)     |
| `ValidationDeps`                        | (no longer needed)                     |
| `ValidationEventHandler`                | (use `props.onValidityUpdate`)         |
| `ifValidated`                           | `ifValid`                              |
| `ifValid`                               | `ifValidatingOrValid`                  |
| `ifInvalidated`                         | `ifInvalid`                            |
| `ifInvalid`                             | `ifInvalidatingOrInvalid`              |
| `ifNeutralized`                         | `ifUnvalidated`                        |
| `ifNeutralizing`                        | `ifUnvalidating`                       |
| `ifNeutralize`                          | `ifUnvalidatingOrUnvalidated`          |
| `ifUnvalidating`                        | (no longer needed)                     |
| `ifUnvalidated`                         | (no longer needed)                     |
| `ifUnvalid`                             | (no longer needed)                     |
| `ifUninvalidating`                      | (no longer needed)                     |
| `ifUninvalidated`                       | (no longer needed)                     |
| `ifUninvalid`                           | (no longer needed)                     |
| `markValid`                             | `validity={true}`                      |
| `usesThemeValid`                        | `validityStateVars.isValid`            |
| `markInvalid`                           | `validity={false}`                     |
| `usesThemeInvalid`                      | `validityStateVars.isInvalid`          |

---

## 📦 Installation

If you are starting fresh, install the new package directly:

```bash
npm install @reusable-ui/validity-state
```

If you are still on legacy code and need migration hints:

```bash
npm install @reusable-ui/invalidable@7
```

---

## 📝 Notes

- **Do not use v7.0.0 in production.** It is a non-working version intended only for migration guidance.
- For a working implementation, use [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).
- If you are pinned to v6.14.0, you can continue using it, but it will not receive updates.

---

## 📚 Resources

- [Validity State Documentation](https://www.npmjs.com/package/@reusable-ui/validity-state)  
- Migration examples are available in the JSDoc comments of v7.0.0.

---

## ✅ Summary

- `@reusable-ui/invalidable` → **deprecated**  
- `@reusable-ui/validity-state` → **replacement**  
- v7.0.0 exists only as a **migration shim**.  
- v6.14.0 is the **last working version**.  
