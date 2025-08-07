# @reusable-ui/themeable

> ⚠️ **Deprecated** — superseded by [`@reusable-ui/theme-variant`](https://www.npmjs.com/package/@reusable-ui/theme-variant)

---

## 📦 Deprecation Summary

The `@reusable-ui/themeable` package has been deprecated and replaced by [`@reusable-ui/theme-variant`](https://www.npmjs.com/package/@reusable-ui/theme-variant), which provides a cleaner, more modular approach to theme-based styling.

The new package offers improved semantic mapping, better integration with variant systems, and more predictable behavior across styling modes.

---

## 🧠 Why the Change?

The original `themeable` API tightly coupled theme logic with internal variable definitions and conditional styling.  
By transitioning to `theme-variant`, you gain:

- ✅ Strongly typed theme props (`ThemeVariantProps`)
- ✅ Declarative CSS hooks (`usesThemeVariant`)
- ✅ Cleaner separation of concerns
- ✅ Better support for mild and outlined modes
- ✅ Simplified conditional overrides

---

## 🔄 Migration Guide

### From `useThemeable()` → `useThemeVariant()`

```ts
// Before
const { class: themeClassname } = useThemeable(props);

// After
const { themeClassname } = useThemeVariant(props);
```

### From `usesThemeable()` → `usesThemeVariant()`

```ts
// Before
const { themeableRule, themeableVars } = usesThemeable();

// After
const { themeVariantRule, themeVariantVars } = usesThemeVariant();
```

### From `ThemeableProps` → `ThemeVariantProps`

```ts
// Before
interface MyComponentProps extends ThemeableProps {}

// After
interface MyComponentProps extends ThemeVariantProps {}
```

### From `createThemeClass()` → `themeSelector().slice(1)`

```ts
// Before
const className = createThemeClass('primary');

// After
const className = themeSelector('primary').slice(1);
```

---

## 🧩 Deprecated API Overview

| Deprecated | Replacement |
|------------|-------------|
| `usesThemeable()` | `usesThemeVariant()` |
| `useThemeable()` | `useThemeVariant()` |
| `ThemeableProps` | `ThemeVariantProps` |
| `ThemeableStuff` | `CssThemeVariant` |
| `createThemeClass()` | `themeSelector(theme).slice(1)` |
| `createThemeSelector()` | `themeSelector()` |
| `ThemeName` | `BasicTheme` |
| `themeOptions()` | `getThemeNames()` from `@reusable-ui/colors` |
| `usesThemeConditional()` | `usesThemeOverride()` |
| `defineThemeRule()` | Inline logic or override via `usesThemeVariant()` |
| `ifHasTheme()` / `ifNoTheme()` | No longer needed — use `ifTheme()` directly |

---

## 🧪 Legacy Support

This package remains available for backward compatibility but is no longer maintained.  
All public APIs are marked with `@deprecated` and will be removed in future major versions.
