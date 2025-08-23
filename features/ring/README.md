# `@reusable-ui/ring` (Deprecated)

> ⚠️ **Deprecated**: This package has been superseded by [`@reusable-ui/ring-feature`](https://www.npmjs.com/package/@reusable-ui/ring-feature).  
> Please migrate to the new modular API for improved override safety, SSR guarantees, and semantic clarity.

## 📦 Overview

This legacy package provided ring-related CSS variables and utility functions for reusable UI components. It has now been deprecated in favor of a more robust and extensible feature-based architecture.

## 🚫 Deprecated APIs

### `usesRing(config?: RingConfig): RingStuff`

Generates ring-related CSS rules and variables.

```ts
const { ringRule, ringVars } = usesRing({ ring: 'currentColor' });
```

🔄 Replace with:

```ts
const { ringFeatureRule, ringFeatureVars } = usesRingFeature({ ringColor: 'currentColor' });
```

---

### Interfaces

#### `RingVars`

```ts
interface RingVars {
    ringFn : any; // functional ring color
    ring   : any; // final ring color
}
```

🔄 Replace with: `RingFeatureVars` from `@reusable-ui/ring-feature`

#### `RingStuff`

```ts
interface RingStuff {
    ringRule : Lazy<CssRule>;
    ringVars : CssVars<RingVars>;
}
```

🔄 Replace with: `CssRingFeature`

#### `RingConfig`

```ts
interface RingConfig {
    ring ?: CssKnownProps['color'];
}
```

🔄 Replace with: `CssRingFeatureOptions`

---

## Migration Guide

To migrate from `@reusable-ui/ring` to `@reusable-ui/ring-feature`:

1. Replace all imports from `@reusable-ui/ring` with `@reusable-ui/ring-feature`.
2. Swap `usesRing()` with `usesRingFeature()`.
3. Update any references to `RingVars`, `RingStuff`, or `RingConfig` to their new counterparts.
4. Review your SSR setup — the new module ensures consistent variable resolution across environments.

---

## Legacy Support

This package remains available for backward compatibility but will receive no further updates. For new development, please use [`@reusable-ui/ring-feature`](https://www.npmjs.com/package/@reusable-ui/ring-feature).
