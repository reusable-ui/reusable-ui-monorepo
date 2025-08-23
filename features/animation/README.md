# `@reusable-ui/animation` (Deprecated)

> ⚠️ **Deprecated**: This package has been superseded by :
> [`@reusable-ui/animation-feature`](https://www.npmjs.com/package/@reusable-ui/animation-feature),  
> [`@reusable-ui/filter-feature`](https://www.npmjs.com/package/@reusable-ui/filter-feature),  
> [`@reusable-ui/transform-feature`](https://www.npmjs.com/package/@reusable-ui/transform-feature),  
> [`@reusable-ui/box-shadow-feature`](https://www.npmjs.com/package/@reusable-ui/box-shadow-feature).  
> Please migrate to the new modular APIs for improved override safety, SSR guarantees, and semantic clarity.

## 📦 Overview

This legacy package provided animation-related CSS variables and registry utilities for reusable UI components. It has now been deprecated in favor of a feature-based architecture that separates concerns and improves extensibility.

## 🚫 Deprecated APIs

### `usesAnimation(config?: AnimationConfig): AnimationStuff`

Generates animation-related CSS rules and variables.

```ts
const { animationRule, animationVars } = usesAnimation({
    anim      : 'fade-in 1s ease-in-out',
    filter    : 'blur(4px)',
    transform : 'scale(1.1)',
    boxShadow : '0 0 10px rgba(0,0,0,0.2)',
});
```

🔄 Replace with:

```ts
const { animationFeatureRule } = usesAnimationFeature({ animation: 'fade-in 1s ease-in-out' });
const { filterFeatureRule }    = usesFilterFeature({ filter: 'blur(4px)' });
const { transformFeatureRule } = usesTransformFeature({ transform: 'scale(1.1)' });
const { boxShadowFeatureRule } = usesBoxShadowFeature({ boxShadow: '0 0 10px rgba(0,0,0,0.2)' });

const animationRule = () => style({
  ...animationFeatureRule(),
  ...filterFeatureRule(),
  ...transformFeatureRule(),
  ...boxShadowFeatureRule(),
});
```

---

### Interfaces

#### `AnimationVars`

```ts
interface AnimationVars {
    animNone      : any;
    anim          : any;
    
    filterNone    : any;
    filter        : any;
    
    transformNone : any;
    transform     : any;
    
    boxShadowNone : any;
    boxShadow     : any;
}
```

🔄 Replace with:  
- `AnimationFeatureVars` from `@reusable-ui/animation-feature`  
- `FilterFeatureVars` from `@reusable-ui/filter-feature`  
- `TransformFeatureVars` from `@reusable-ui/transform-feature`  
- `BoxShadowFeatureVars` from `@reusable-ui/box-shadow-feature`

#### `AnimationStuff`

```ts
interface AnimationStuff {
    animationRule     : Lazy<CssRule>;
    animationVars     : CssVars<AnimationVars>;
    animationRegistry : AnimationRegistry;
}
```

🔄 Replace with:  
- `CssAnimationFeature`  
- `CssFilterFeature`  
- `CssTransformFeature`  
- `CssBoxShadowFeature`

#### `AnimationConfig`

```ts
interface AnimationConfig {
    anim      ?: CssKnownProps['animation'] & Array<any>;
    filter    ?: CssKnownProps['filter']    & Array<any>;
    transform ?: CssKnownProps['transform'] & Array<any>;
    boxShadow ?: CssKnownProps['boxShadow'] & Array<any>;
}
```

🔄 Replace with:  
- `CssAnimationFeatureOptions`  
- `CssFilterFeatureOptions`  
- `CssTransformFeatureOptions`  
- `CssBoxShadowFeatureOptions`

---

## 🛠 Migration Guide

To migrate from `@reusable-ui/animation` to the new feature-based modules:

1. Replace all imports from `@reusable-ui/animation` with the respective feature packages.
2. Swap `usesAnimation()` with individual feature hooks: `usesAnimationFeature()`, `usesFilterFeature()`, etc.
3. Update references to `AnimationVars`, `AnimationStuff`, and `AnimationConfig` to their modular counterparts.
4. Review your SSR setup — the new modules ensure consistent variable resolution across environments.

---

## 🧓 Legacy Support

This package remains available for backward compatibility but will receive no further updates. For new development, please use the modular feature packages listed above.
