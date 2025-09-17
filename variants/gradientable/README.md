# @reusable-ui/gradientable

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/emphasis-variant`](https://www.npmjs.com/package/@reusable-ui/emphasis-variant)

---

## 📦 Deprecation Summary

The `@reusable-ui/gradientable` package has been deprecated and replaced by [`@reusable-ui/emphasis-variant`](https://www.npmjs.com/package/@reusable-ui/emphasis-variant), which provides a more flexible and semantically consistent approach to toggling visual emphasis — including gradient-based styling.

---

## 🧠 Why the Change?

The original `gradientable` API introduced a custom toggle system for background gradients using `true`, `false`, `'inherit'`, and `null`.  
While powerful, this approach duplicated logic already handled by the emphasize variant system.

By transitioning to `emphasis-variant`, you gain:

- ✅ Unified emphasis toggling via `emphasized` prop
- ✅ Poisoning-based conditional styling
- ✅ Better integration with other variants (e.g. mild, outlined)
- ✅ Simplified gradient activation using `emphasizeVariantVars.isEmphasized`

---

## 🔄 Migration Guide

### From `useGradientable()` → `useEmphasizeVariant()`

```ts
// Before
const { class: gradientClassname } = useGradientable({ gradient: true });

// After
const { emphasizeClassname } = useEmphasizeVariant({ emphasized: true });
```

### From `usesGradientable()` → `usesEmphasizeVariant()`

```ts
// Before
const { gradientableRule, gradientableVars } = usesGradientable();

// After
const { emphasizeVariantRule, emphasizeVariantVars } = usesEmphasizeVariant();
```

### From `GradientableProps` → `EmphasizeVariantProps`

```ts
// Before
interface MyComponentProps extends GradientableProps {}

// After
interface MyComponentProps extends EmphasizeVariantProps {}
```

### From `gradientableVars.backgGradTg` → `emphasizeVariantVars.isEmphasized`

```ts
// Before
backgroundImage: gradientableVars.backgGradTg

// After
backgroundImage: `${emphasizeVariantVars.isEmphasized} linear-gradient(...)`
```

---

## 🧩 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `useGradientable()` | `useEmphasizeVariant()` |
| `usesGradientable()` | `usesEmphasizeVariant()` |
| `GradientableProps` | `EmphasizeVariantProps` |
| `GradientableStuff` | `CssEmphasizeVariant` |
| `gradientableVars` | `emphasizeVariantVars` |
| `defineGradient()` / `setGradient()` | Use `emphasized` prop and conditional styling |
| `ifGradient()` / `ifNotGradient()` | `ifEmphasized()` / `ifNotEmphasized()` |
| `ToggleGradient` | `boolean` or `'inherit'` via `emphasized` prop |

---

## 🧪 Legacy Support

This package remains available for backward compatibility but is no longer maintained.  
All public APIs are marked with `@deprecated` and will be removed in future major versions.
