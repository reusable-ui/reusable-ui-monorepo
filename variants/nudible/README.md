# @reusable-ui/nudible

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/bare-variant`](https://www.npmjs.com/package/@reusable-ui/bare-variant)

---

## 📦 Deprecation Summary

The `@reusable-ui/nudible` package has been deprecated as of version `7.0.0`.  
Its functionality has been replaced by [`@reusable-ui/bare-variant`](https://www.npmjs.com/package/@reusable-ui/bare-variant), which provides a more flexible and semantically consistent approach to minimal styling.

---

## 🧠 Why the Change?

The original `nudible` API introduced a custom toggle system for removing background, borders, and padding.  
While useful, it duplicated logic already handled by the standardized `bare` variant system.

By transitioning to `bare`, you gain:

- ✅ Strongly typed props (`BareVariantProps`)
- ✅ Declarative CSS hooks (`usesBareVariant`)
- ✅ Poisoning-based conditional styling
- ✅ Better integration with other variants (e.g. outlined, mild)
- ✅ Simplified toggling via `isBare` and `notBare` variables

---

## 🔄 Migration Guide

### From `useNudible()` → `useBareVariant()`

```ts
// Before
const { class: nudeClassname } = useNudible({ nude: true });

// After
const { bareClassname } = useBareVariant({ bare: true });
```

### From `usesNudible()` → `usesBareVariant()`

```ts
// Before
const { nudibleRule, nudibleVars } = usesNudible();

// After
const { bareVariantRule, bareVariantVars } = usesBareVariant();
```

### From `NudibleProps` → `BareVariantProps`

```ts
// Before
interface MyComponentProps extends NudibleProps {}

// After
interface MyComponentProps extends BareVariantProps {}
```

### From `ifNude()` / `ifNotNude()` → Poisoning-based logic

```ts
// Before
style({
    ...ifNotNude({
        padding: '1rem',
        border: 'solid 1px #ccc',
    }),
});

// After
style({
    ...bareVariantRule(),
    padding: `${bareVariantVars.notBare} 1rem`,
    border: `${bareVariantVars.notBare} solid 1px #ccc`,
});
```

---

## 🧩 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `usesNudible()` | `usesBareVariant()` |
| `useNudible()` | `useBareVariant()` |
| `NudibleProps` | `BareVariantProps` |
| `nudibleVars` | `bareVariantVars` |
| `defineNude()` / `setNude()` | Poisoning-based conditional styling |
| `ifNude()` / `ifNotNude()` | `ifBare()` / `ifNotBare()` |
| `ToggleNude` | `boolean` via `bare` prop |

---

## 🧪 Legacy Support

This package remains available for backward compatibility but is no longer maintained.  
All public APIs are marked with `@deprecated` and will be removed in future major versions.
