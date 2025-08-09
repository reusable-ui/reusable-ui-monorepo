# @reusable-ui/basic-variants

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/styling-variants`](https://www.npmjs.com/package/@reusable-ui/styling-variants)

---

## 📦 Deprecation Summary

The `@reusable-ui/basic-variants` package has been deprecated as of version `7.0.0`.  
Its functionality has been consolidated into [`@reusable-ui/styling-variants`](https://www.npmjs.com/package/@reusable-ui/styling-variants), which provides a unified API for managing common styling variants such as `size`, `theme`, `emphasized`, `outlined`, and `mild`.

---

## 🧠 Why the Change?

The original `basic-variants` package served as a convenience layer for passing common styling props.  
However, its naming and structure created ambiguity with other variant systems.

The new `styling-variants` package offers:

- ✅ Clearer semantic naming
- ✅ Unified prop handling via `StylingVariantsProps`
- ✅ Declarative hook: `useStylingVariants()`
- ✅ Better alignment with the reusable-ui ecosystem

---

## 🔄 Migration Guide

### From `BasicVariantProps` → `StylingVariantsProps`

```ts
// Before
interface MyComponentProps extends BasicVariantProps {}

// After
interface MyComponentProps extends StylingVariantsProps {}
```

### From `useBasicVariantProps()` → `useStylingVariants()`

```ts
// Before
const variantProps = useBasicVariantProps(props);

// After
const variantProps = useStylingVariants(props);
```

### With Defaults

```ts
// Before
const variantProps = useBasicVariantProps(props, defaultProps);

// After
const variantProps = useStylingVariants({ ...defaultProps, ...props });
```

---

## 🧩 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `BasicVariantProps` | `StylingVariantsProps` |
| `useBasicVariantProps()` | `useStylingVariants()` |

---

## 🧪 Legacy Support

This package remains available for backward compatibility but is no longer maintained.  
All public APIs are marked with `@deprecated` and will be removed in future major versions.
