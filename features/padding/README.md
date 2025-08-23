# `@reusable-ui/padding` (Deprecated)

> ⚠️ **Deprecated**: This package has been superseded by [`@reusable-ui/padding-feature`](https://www.npmjs.com/package/@reusable-ui/padding-feature).  
> Please migrate to the new modular API for improved override safety, SSR guarantees, and semantic clarity.

## 📦 Overview

This legacy package provided padding-related CSS variables and utility functions for reusable UI components. It has now been deprecated in favor of a more robust and extensible feature-based architecture.

## 🚫 Deprecated APIs

### `usesPadding(config?: PaddingConfig): PaddingStuff`

Generates padding-related CSS rules and variables.

```ts
const { paddingRule, paddingVars } = usesPadding({
    paddingInline : '1rem',
    paddingBlock  : '0.5rem',
});
```

🔄 Replace with:

```ts
const { paddingFeatureRule, paddingFeatureVars } = usesPaddingFeature({
    paddingInline : '1rem',
    paddingBlock  : '0.5rem',
});
```

---

### Interfaces

#### `PaddingVars`

```ts
interface PaddingVars {
    paddingInline : any;
    paddingBlock  : any;
    padding       : any;
}
```

🔄 Replace with: `PaddingFeatureVars` from `@reusable-ui/padding-feature`

#### `PaddingStuff`

```ts
interface PaddingStuff {
    paddingRule : Lazy<CssRule>;
    paddingVars : CssVars<PaddingVars>;
}
```

🔄 Replace with: `CssPaddingFeature`

#### `PaddingConfig`

```ts
interface PaddingConfig {
    paddingInline ?: CssKnownProps['paddingInline'];
    paddingBlock  ?: CssKnownProps['paddingBlock'];
}
```

🔄 Replace with: `CssPaddingFeatureOptions`

---

## Migration Guide

To migrate from `@reusable-ui/padding` to `@reusable-ui/padding-feature`:

1. Replace all imports from `@reusable-ui/padding` with `@reusable-ui/padding-feature`.
2. Swap `usesPadding()` with `usesPaddingFeature()`.
3. Update any references to `PaddingVars`, `PaddingStuff`, or `PaddingConfig` to their new counterparts.
4. Review your SSR setup — the new module ensures consistent variable resolution across environments.

---

## Legacy Support

This package remains available for backward compatibility but will receive no further updates. For new development, please use [`@reusable-ui/padding-feature`](https://www.npmjs.com/package/@reusable-ui/padding-feature).
