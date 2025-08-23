# `@reusable-ui/border` (Deprecated)

> ⚠️ **Deprecated**: This package has been superseded by [`@reusable-ui/border-feature`](https://www.npmjs.com/package/@reusable-ui/border-feature).  
> Please migrate to the new modular API for improved override safety, SSR guarantees, and semantic clarity.

## 📦 Overview

This legacy package provided border-related CSS variables and utility functions for reusable UI components. It has now been deprecated in favor of a more robust and extensible feature-based architecture.

## 🚫 Deprecated APIs

### `usesBorder(config?: BorderConfig): BorderStuff`

Generates border-related CSS rules and variables.

```ts
const { borderRule, borderVars } = usesBorder({ borderColor: 'black' });
```

🔄 Replace with:

```ts
const { borderFeatureRule, borderFeatureVars } = usesBorderFeature({ borderColor: 'black' });
```

---

### Interfaces

#### `BorderVars`

```ts
interface BorderVars {
    borderWidth   : any;
    borderColorFn : any;
    border        : any;
    borderRadius  : any;
}
```

🔄 Replace with: `BorderFeatureVars` from `@reusable-ui/border-feature`

#### `BorderStuff`

```ts
interface BorderStuff {
    borderRule : Lazy<CssRule>;
    borderVars : CssVars<BorderVars>;
}
```

🔄 Replace with: `CssBorderFeature`

#### `BorderConfig`

```ts
interface BorderConfig {
    borderStyle  ?: CssKnownProps['borderStyle'];
    borderWidth  ?: CssKnownProps['borderWidth'];
    borderColor  ?: CssKnownProps['borderColor'];
    borderRadius ?: CssKnownProps['borderRadius'];
}
```

🔄 Replace with: `CssBorderFeatureOptions`

---

## Migration Guide

To migrate from `@reusable-ui/border` to `@reusable-ui/border-feature`:

1. Replace all imports from `@reusable-ui/border` with `@reusable-ui/border-feature`.
2. Swap `usesBorder()` with `usesBorderFeature()`.
3. Update any references to `BorderVars`, `BorderStuff`, or `BorderConfig` to their new counterparts.
4. Review your SSR setup — the new module ensures consistent variable resolution across environments.

---

## Legacy Support

This package remains available for backward compatibility but will receive no further updates. For new development, please use [`@reusable-ui/border-feature`](https://www.npmjs.com/package/@reusable-ui/border-feature).
