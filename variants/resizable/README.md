# @reusable-ui/resizable

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/size-variant`](https://www.npmjs.com/package/@reusable-ui/size-variant)

---

## 📦 Deprecation Summary

The `@reusable-ui/resizable` package has been deprecated and replaced by the more flexible and standardized [`@reusable-ui/size-variant`](https://www.npmjs.com/package/@reusable-ui/size-variant).

The new package provides a unified API for managing component sizing across variants, with better support for semantic values, fallback chaining, and nested styling.

---

## 🧠 Why the Change?

The original `resizable` API lacked support for semantic.  
By transitioning to `size-variant`, you gain:

- ✅ Strongly typed size props (`SizeVariantProps`)
- ✅ Declarative CSS hooks (`usesSizeVariant`)
- ✅ Semantic variable mapping and fallback support
- ✅ Better integration with other variant systems

---

## 🔄 Migration Guide

### From `useResizable()` → `useSizeVariant()`

```ts
// Before
const { class: sizeClassname } = useResizable(props);

// After
const { sizeClassname } = useSizeVariant(props);
```

### From `usesResizable()` → `usesSizeVariant()`

```ts
// Before
const { resizableRule } = usesResizable(config);

// After
const { sizeVariantRule } = usesSizeVariant(config);
```

### From `ResizableProps` → `SizeVariantProps`

```ts
// Before
interface MyComponentProps extends ResizableProps {}

// After
interface MyComponentProps extends SizeVariantProps {}
```

### From `createSizeClass()` → `sizeSelector().slice(1)`

```ts
// Before
const className = createSizeClass('md');

// After
const className = sizeSelector('md').slice(1);
```

---

## 🧩 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `usesResizable()` | `usesSizeVariant()` |
| `useResizable()` | `useSizeVariant()` |
| `ResizableProps` | `SizeVariantProps` |
| `ResizableStuff` | `CssSizeVariant` |
| `createSizeClass()` | `sizeSelector(size).slice(1)` |
| `createSizeSelector()` | `sizeSelector()` |
| `SizeName` | `BasicSize` |
| `sizeOptions()` | Use explicit size list or `supportedSizes` prop |

---

## 🧪 Legacy Support

This package remains available for backward compatibility but is no longer maintained.  
All public APIs are marked with `@deprecated` and will be removed in future major versions.
