# `@reusable-ui/background` (Deprecated)

> ⚠️ **Deprecated**: This package has been superseded by [`@reusable-ui/background-feature`](https://www.npmjs.com/package/@reusable-ui/background-feature).  
> Please migrate to the new modular API for improved override safety, SSR guarantees, and semantic clarity.

## 📦 Overview

This legacy package provided background-related CSS variables and utility functions for reusable UI components. It has now been deprecated in favor of a more robust and extensible feature-based architecture.

## 🚫 Deprecated APIs

The following exports are deprecated and will be removed in a future major release:

```ts
export interface BackgroundStuff {
  backgroundRule: Lazy<CssRule>
  backgroundVars: CssVars<BackgroundVars>
}

export interface BackgroundConfig extends Pick<CssBackgroundFeatureOptions, 'backgroundEmphasize'> {
  backg?: CssKnownProps['backgroundColor']
  altBackg?: CssKnownProps['backgroundColor']
  backgroundImage?: CssKnownProps['backgroundImage'] & Array<any>
}

export const usesBackground(config?: BackgroundConfig): BackgroundStuff
```

### Deprecated Variables

```ts
interface BackgroundVars {
    backgNone       : any // deprecated
    backgColorFn    : any // deprecated
    backgColor      : any
    altBackgColorFn : any // deprecated
    altBackgColor   : any // deprecated
    backg           : any
    altBackg        : any // deprecated
}
```

## ✅ Migration Guide

Switch to the new feature-based API from `@reusable-ui/background-feature`:

```ts
import { usesBackgroundFeature } from '@reusable-ui/background-feature'

const {
    backgroundFeatureRule,
    backgroundFeatureVars,
} = usesBackgroundFeature({
    backgroundColor: backg,
    backgroundEmphasize,
    background: backgroundImage,
})
```

## 🧠 Why the Change?

The new `background-feature` module introduces:

- SSR-safe variable resolution
- Modular override safety across independent features
- Cleaner onboarding and documentation
