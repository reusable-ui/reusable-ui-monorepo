# `@reusable-ui/foreground` (Deprecated)

> ⚠️ **Deprecated**: This package has been superseded by [`@reusable-ui/foreground-feature`](https://www.npmjs.com/package/@reusable-ui/foreground-feature).  
> Please migrate to the new modular API for improved override safety, SSR guarantees, and semantic clarity.

## 📦 Overview

This legacy package provided foreground-related CSS variables and utility functions for reusable UI components. It has now been deprecated in favor of a more robust and extensible feature-based architecture.

## 🚫 Deprecated APIs

### `usesForeground(config?: ForegroundConfig): ForegroundStuff`

Generates foreground-related CSS rules and variables.

```ts
const { foregroundRule, foregroundVars } = usesForeground({ foreg: 'red' });
```

🔄 Replace with:

```ts
const { foregroundFeatureRule } = usesForegroundFeature({ foregroundColor: 'red' });
```

---

### Interfaces

#### `ForegroundVars`

```ts
interface ForegroundVars {
    foregFn    : any; // functional foreground color
    foreg      : any; // final foreground color
    altForegFn : any; // alternate functional foreground color
    altForeg   : any; // alternate final foreground color
}
```

🔄 Replace with: `ForegroundFeatureVars` from `@reusable-ui/foreground-feature`

#### `ForegroundStuff`

```ts
interface ForegroundStuff {
    foregroundRule : Lazy<CssRule>;
    foregroundVars : CssVars<ForegroundVars>;
}
```

🔄 Replace with: `CssForegroundFeature`

#### `ForegroundConfig`

```ts
interface ForegroundConfig {
    foreg    ?: CssKnownProps['foreground'];
    altForeg ?: CssKnownProps['foreground'];
}
```

🔄 Replace with: `CssForegroundFeatureOptions`

---

## Migration Guide

To migrate from `@reusable-ui/foreground` to `@reusable-ui/foreground-feature`:

1. Replace all imports from `@reusable-ui/foreground` with `@reusable-ui/foreground-feature`.
2. Swap `usesForeground()` with `usesForegroundFeature()`.
3. Update any references to `ForegroundVars`, `ForegroundStuff`, or `ForegroundConfig` to their new counterparts.
4. Review your SSR setup — the new module ensures consistent variable resolution across environments.

---

## Legacy Support

This package remains available for backward compatibility but will receive no further updates. For new development, please use [`@reusable-ui/foreground-feature`](https://www.npmjs.com/package/@reusable-ui/foreground-feature).
