# `@reusable-ui/colorable` (Deprecated)

> ⚠️ **Deprecated**: This package has been superseded by [`@reusable-ui/decoration-feature`](https://www.npmjs.com/package/@reusable-ui/decoration-feature).  
> Please migrate to the new modular API for improved override safety, SSR guarantees, and semantic clarity.

## 📦 Overview

This legacy package provided coloring-related CSS variables and utility functions for reusable UI components. It has now been deprecated in favor of a more robust and extensible feature-based architecture.

## 🚫 Deprecated APIs

### `usesColorable(config?: ColorableConfig): ColorableStuff`

Generates coloring-related CSS rules and variables.

```ts
const { colorableRule, colorableVars } = usesColorable({ color: 'red' });
```

🔄 Replace with:

```ts
const { decorationFeatureRule, decorationFeatureVars } = usesDecorationFeature({ decorationColor: 'red' });
```

---

### Interfaces

#### `ColorableVars`

```ts
interface ColorableVars {
    colorFn    : any; // functional decoration color
    color      : any; // final decoration color
    altColorFn : any; // alternate functional decoration color
}
```

🔄 Replace with: `DecorationFeatureVars` from `@reusable-ui/decoration-feature`

#### `ColorableStuff`

```ts
interface ColorableStuff {
    colorableRule : Lazy<CssRule>;
    colorableVars : CssVars<ColorableVars>;
}
```

🔄 Replace with: `CssDecorationFeature`

#### `ColorableConfig`

```ts
interface ColorableConfig {
    color    ?: CssKnownProps['backgroundColor'];
    altColor ?: CssKnownProps['backgroundColor'];
}
```

🔄 Replace with: `CssDecorationFeatureOptions`

---

## Migration Guide

To migrate from `@reusable-ui/colorable` to `@reusable-ui/decoration-feature`:

1. Replace all imports from `@reusable-ui/colorable` with `@reusable-ui/decoration-feature`.
2. Swap `usesColorable()` with `usesDecorationFeature()`.
3. Update any references to `ColorableVars`, `ColorableStuff`, or `ColorableConfig` to their new counterparts.
4. Review your SSR setup — the new module ensures consistent variable resolution across environments.

---

## Legacy Support

This package remains available for backward compatibility but will receive no further updates. For new development, please use [`@reusable-ui/decoration-feature`](https://www.npmjs.com/package/@reusable-ui/decoration-feature).
