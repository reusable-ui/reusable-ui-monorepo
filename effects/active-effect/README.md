# @reusable-ui/active-effect 📦  

**active-effect** provides **default visual effects** for how components visually respond when the active (or selected) state changes.  
It offers styling authors a **common foundation** for active effects that emphasize the current theme colors,
making components **visually stand out** when active.

The effects are designed to feel natural to users:  
- **Regular variants** darken in light mode or lighten in dark mode, enhancing visual interest.  
- **Outlined and mild variants** smoothly shift from their lighter appearance into the bolder regular style.  

By using `usesActiveEffect()`, you can apply these effects consistently across your components — making them appear stronger and more pronounced — with optional customization for brightness, contrast, and saturation.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Active State

`active-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state) package to drive the `activeFactorCond` CSS variable, which determines how far the transition has progressed (from inactive → fully active).  

- `active-state` tracks whether a component is active or selected.  
- `active-effect` consumes that state and applies visual adjustments (brightness, contrast, saturation, etc.).  
- Together, they provide a unified system: `active-state` supplies the factor, `active-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `active-state`.  
- **Visual effect** lives in `active-effect`.  

## ✨ Features
✔ Smooth transition between active and inactive states  
✔ Variant-aware behavior for regular, outlined, and mild styles  
✔ Customizable options for brightness, contrast, and saturation levels  
✔ Adaptive brightness that automatically adjusts for light and dark mode  
✔ Unified filter stack that composes seamlessly with other state effects  
✔ Ready-to-use defaults for common scenarios, while remaining flexible for custom styling  

## 📦 Installation
Install **@reusable-ui/active-effect** via npm or yarn:

```sh
npm install @reusable-ui/active-effect
# or
yarn add @reusable-ui/active-effect
```

## 🧩 Exported CSS Hooks

### `usesActiveEffect(options?: CssActiveEffectOptions): CssActiveEffect`

Applies active-state effects that emphasize the current theme colors,
making components **visually stand out** when active.

Exposes strongly typed CSS variables for transitional effects.

Behavior:
- Regular variants: darken in light mode or lighten in dark mode.
- Outlined/mild variants: interpolate from variant colors to regular colors.

Smoothly transitions between active and inactive states by animating colors and/or filter effects.
Affects background, foreground, decoration, and border colors.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';

import { usesBackgroundFeature } from '@reusable-ui/background-feature';
// For simplicity, this example demonstrates only the background feature.
// Other color-specific features are also available:
// - foreground-feature (text colors)
// - decoration-feature (icons/graphics)
// - border-feature (border colors)

// States:
import { usesActiveState } from '@reusable-ui/active-state';

// Effects:
import { usesActiveEffect } from '@reusable-ui/active-effect';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const activatableBoxStyle = () => {
    // Features:
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    const {
        backgroundFeatureRule,
        backgroundFeatureVars: { backg },
    } = usesBackgroundFeature();
    
    // States:
    
    // Active/inactive lifecycle:
    // - Exposes `activeFactor` (0 → 1) to represent transition progress
    // - Associates activating/deactivating animations to drive `activeFactor` smoothly
    const {
        activeStateRule,
        activeStateVars: { activeFactor },
    } = usesActiveState({
        animationActivating   : 'var(--box-activating)',
        animationDeactivating : 'var(--box-deactivating)',
    });
    
    // Active/inactive visual effect:
    // - Consumes `activeFactor` from active state
    // - Gradually adjusts brightness, contrast, and saturation based on transition progress
    // - Allows customization of how the "active" appearance should look
    const {
        activeEffectRule,
    } = usesActiveEffect({
        // Brightness:
        // Values `< 1` → darken  in light mode, lighten in dark mode
        // Values `> 1` → lighten in light mode, darken  in dark mode
        activeBrightness : 0.85, // subtle darkening in light mode, subtle lightening in dark mode
        
        // Contrast:
        // Values `< 1` → softer contrast
        // Values `> 1` → stronger contrast
        activeContrast   : 1.1,  // slightly stronger contrast when active
        
        // Saturation:
        // Values `< 1` → muted colors
        // Values `> 1` → more vivid colors
        activeSaturate   : 1.2,  // slightly more vibrant colors when active
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, filter, background):
        ...animationFeatureRule(),
        ...filterFeatureRule(),
        ...backgroundFeatureRule(),
        
        // Attach active state rules (tracks active/inactive):
        ...activeStateRule(),
        
        // Attach active effect rules (visual emphasis when active):
        ...activeEffectRule(),
        
        // Define animations for activating/deactivating:
        
        // 🔼 Activating: smoothly interpolate activeFactor from 0 → 1
        ...vars({
            '--box-activating': [
                ['0.3s', 'ease-out', 'both', 'effect-activating'],
            ],
        }),
        ...keyframes('effect-activating', {
            from : { [activeFactor]: 0 },
            // '90%': { [activeFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [activeFactor]: 1 },
        }),
        
        // 🔽 Deactivating: smoothly interpolate activeFactor from 1 → 0
        ...vars({
            '--box-deactivating': [
                ['0.3s', 'ease-out', 'both', 'effect-deactivating'],
            ],
        }),
        ...keyframes('effect-deactivating', {
            from : { [activeFactor]: 1 },
            // '10%': { [activeFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [activeFactor]: 0 },
        }),
        
        // Example usage of composed variables:
        
        // Apply background layers (from background feature):
        background: backg, // background color + layered backgrounds
        // or use `backgroundColor: backgColor` if you only need the color
        
        // Other color-specific features follow the same usage pattern:
        // color: foregColor, // text color (foreground feature)
        // ...children('.icon', {
        //     backgroundColor: decorColor, // icon/graphic color (decoration feature)
        //     maskImage: 'url("/res/thumb-up.svg")',
        // }),
        // borderColor: borderColor, // border color (border feature)
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply filters (from filter feature):
        filter,
    });
};
```

#### 🧠 How CSS Active Effect Works

The [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state) package drives a `activeFactorCond` CSS variable, which represents how far the transition has progressed (from inactive → fully active).  

`active-effect` consumes this factor and applies coordinated formulas that emphasize the current theme colors,
making components **visually stand out** when active.

##### 1. **Filter Formula**

- Gradually adjusts **brightness, contrast, and saturation** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment).  
- At `factor = 1` → configured target values.  
- Between `0` and `1` → smooth interpolation.  
- Disabled for **outlined or mild variants**.

##### 2. **Color Shades Formula**

- Gradually shifts the **color shades** from lighter variants (**outlined** and **mild**) toward the stronger **regular** variant.  
- At `factor = 0` → original color shades.  
- At `factor = 1` → regular color shades.  
- Between `0` and `1` → smooth interpolation.  
- Disabled if the component is **already in regular variant**.

##### ✨ Key Idea

- **Active-state** provides the *progress factor*.  
- **Active-effect** applies *filter and color shade formulas* based on that factor.  
- Together, they ensure components smoothly highlight themselves when active.  

## 📚 Related Packages

- [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state) – Provides active/selected state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/active-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/active-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/active-effect delivers predictable, reusable state effects for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
