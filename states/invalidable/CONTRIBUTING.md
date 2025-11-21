# Contributing to @reusable-ui/invalidable

⚠️ **Important Notice**  
`@reusable-ui/invalidable` has been **deprecated** as of version **7.0.0**.  
This package is no longer functional and exists only as a **migration tool** to guide contributors toward [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).

- Last working version: **6.14.0**
- Current version: **7.0.0** (migration shim only)

---

## 🛠️ Contribution Guidelines

Since this package is deprecated:

- **Do not submit new features or bug fixes** for `@reusable-ui/invalidable`.  
- **Do not open issues** requesting support for v7.0.0 — it is intentionally non‑functional.  
- **Do not submit pull requests** to restore functionality.  

Instead:

- Direct all contributions, bug reports, and feature requests to [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).  
- If you find migration documentation unclear, you may open issues here to improve **migration notes only**.  

---

## 🔄 Migration Contributions

The only acceptable contributions to this repository are:

- **Improving migration documentation** (README, CHANGELOG, JSDoc).  
- **Clarifying type mappings** between deprecated APIs and their replacements.  
- **Adding examples** that help contributors move from `invalidable` → `validity-state`.  

---

## 📚 Migration Reference

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

## ✅ Summary

- `@reusable-ui/invalidable` is **deprecated**.  
- Contributions should focus only on **migration guidance**.  
- All new work belongs in [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state).  
- v7.0.0 is a **non‑working version** intended to help contributors migrate.  
