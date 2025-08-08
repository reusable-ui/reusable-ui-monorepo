# @reusable-ui/outlineable

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/outline-variant`](https://www.npmjs.com/package/@reusable-ui/outline-variant)

---

## 📦 Deprecation Summary

The `@reusable-ui/outlineable` package has been deprecated as of version `7.0.0`.  
Its functionality has been replaced by [`@reusable-ui/outline-variant`](https://www.npmjs.com/package/@reusable-ui/outline-variant), which provides a more modular and declarative approach to outline-based styling.

---

## 🧠 Why the Change?

The original `outlineable` API bundled outline logic into a monolithic hook, making it harder to scale and compose with other variants.  
The new `outline-variant` package offers:

- ✅ Strongly typed props (`OutlineVariantProps`)
- ✅ Declarative CSS hooks (`usesOutlineVariant`)
- ✅ Poisoning-based conditional styling
- ✅ Better integration with other variant systems

---

## 🔄 Migration Guide

### From `useOutlineable()` → `useOutlineVariant()`

```ts
// Before
const { class: outlineClassname } = useOutlineable(props);

// After
const { outlineClassname } = useOutlineVariant(props);
```

### From `usesOutlineable()` → `usesOutlineVariant()`

```ts
// Before
const { outlineableRule } = usesOutlineable();

// After
const { outlineVariantRule } = usesOutlineVariant();
```

### From `OutlineableProps` → `OutlineVariantProps`

```ts
// Before
interface MyComponentProps extends OutlineableProps {}

// After
interface MyComponentProps extends OutlineVariantProps {}
```

### From `outlineableVars` → `outlineVariantVars`

```ts
// Before
fontWeight: `${outlineableVars.outlinedSw} bold`

// After
fontWeight: `${outlineVariantVars.isOutlined} bold`
```

---

## 🧩 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `useOutlineable()` | `useOutlineVariant()` |
| `usesOutlineable()` | `usesOutlineVariant()` |
| `OutlineableProps` | `OutlineVariantProps` |
| `outlineableVars` | `outlineVariantVars` |
| `OutlineableStuff` | `CssOutlineVariant` |

---

## 🧪 Legacy Support

This package remains available for backward compatibility but is no longer maintained.  
All public APIs are marked with `@deprecated` and will be removed in future major versions.
