# @reusable-ui/mildable

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/mild-variant`](https://www.npmjs.com/package/@reusable-ui/mild-variant)

---

## 📦 Deprecation Summary

The `@reusable-ui/mildable` package has been deprecated as of version `7.0.0`.  
Its functionality has been replaced by [`@reusable-ui/mild-variant`](https://www.npmjs.com/package/@reusable-ui/mild-variant), which provides a more modular and declarative approach to mild styling behavior.

---

## 🧠 Why the Change?

The original `mildable` API introduced a custom toggle system for mildification using `true`, `false`, `'inherit'`, and `null`.  
While flexible, it duplicated logic already handled by the standardized variant system.

By transitioning to `mild-variant`, you gain:

- ✅ Strongly typed props (`MildVariantProps`)
- ✅ Declarative CSS hooks (`usesMildVariant`)
- ✅ Poisoning-based conditional styling
- ✅ Better integration with theme and emphasize variants

---

## 🔄 Migration Guide

### From `useMildable()` → `useMildVariant()`

```ts
// Before
const { class: mildClassname } = useMildable(props);

// After
const { mildClassname } = useMildVariant(props);
```

### From `usesMildable()` → `usesMildVariant()`

```ts
// Before
const { mildableRule, mildableVars } = usesMildable();

// After
const { mildVariantRule, mildVariantVars } = usesMildVariant();
```

### From `MildableProps` → `MildVariantProps`

```ts
// Before
interface MyComponentProps extends MildableProps {}

// After
interface MyComponentProps extends MildVariantProps {}
```

### From `mildableVars` → `mildVariantVars`

```ts
// Before
backgroundColor: `${mildableVars.mildSw} lightgray`

// After
backgroundColor: `${mildVariantVars.isMild} lightgray`
```

---

## 🧩 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `useMildable()` | `useMildVariant()` |
| `usesMildable()` | `usesMildVariant()` |
| `MildableProps` | `MildVariantProps` |
| `MildableStuff` | `CssMildVariant` |
| `mildableVars` | `mildVariantVars` |
| `defineMild()` / `setMild()` | Use `isMild` / `notMild` variables directly |
| `ToggleMild` | `boolean` or `'inherit'` via `mild` prop |
| `ifInheritMild()` | No longer needed — inheritance is handled automatically |

---

## 🧪 Legacy Support

This package remains available for backward compatibility but is no longer maintained.  
All public APIs are marked with `@deprecated` and will be removed in future major versions.
