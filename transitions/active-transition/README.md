# @reusable-ui/active-transition 📦  

**active-transition** provides a **default system styling** for how components visually respond when they become active or selected.
It offers styling authors a **common styling** for active transitions that emphasize the current theme colors, making the component **visually stand out** when active.

The transitions are designed to feel natural to users:  
- **Regular variants** darken in light mode or lighten in dark mode, enhancing visual interest.  
- **Outlined and mild variants** smoothly shift from their lighter appearance into the bolder regular style.  

By using `usesActiveTransition()`, you can apply these transitions consistently across background, foreground, decoration, and border colors — with optional customization for brightness, contrast, and saturation.
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Active State

`active-transition` cannot operate in isolation.  
It relies on the [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state) package to drive the `activeFactorCond` CSS variable, which determines how far the transition has progressed (from inactive → fully active).  

- `active-state` is responsible for tracking whether a component is active or selected.  
- `active-transition` consumes that state and applies visual adjustments (brightness, contrast, saturation) accordingly.  
- Together, they provide a unified system: `active-state` supplies the factor, `active-transition` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `active-state`.  
- **Visual styling** lives in `active-transition`.  

## ✨ Features
✔ Smooth transition between inactive and active states  
✔ Variant-aware behavior for regular, outlined, and mild styles  
✔ Customizable options for brightness, contrast, and saturation levels  
✔ Adaptive brightness that automatically adjusts for light and dark mode  
✔ Unified filter stack that composes seamlessly with other state transitions  
✔ Ready-to-use defaults for common scenarios, while remaining flexible for custom styling  

## 📦 Installation
Install **@reusable-ui/active-transition** via npm or yarn:

```sh
npm install @reusable-ui/active-transition
# or
yarn add @reusable-ui/active-transition
```

## 🧩 Exported CSS Hooks

### `usesActiveTransition(options?: CssActiveTransitionOptions): CssActiveTransition`

Applies active-state transitions that emphasize the current theme colors,
making the component **visually stand out** when active.

Exposes strongly typed CSS variables for transitional effects.

Behavior:
- Regular variants: darken in light mode or lighten in dark mode.
- Outlined/mild variants: interpolate from variant colors to regular colors.

Smoothly transitions between inactive and active states.
Affects background, foreground, decoration, and border colors.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';

import { usesBackgroundFeature } from '@reusable-ui/background-feature';
// For simplicity, we demonstrate only the background feature here.
// There are also other color-specific features you can explore:
// - foreground-feature (for text colors)
// - decoration-feature (for icons/graphics)
// - border-feature (for border colors)

// States:
import { usesActiveState } from '@reusable-ui/active-state';

// Transitions:
import { usesActiveTransition } from '@reusable-ui/active-transition';

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
        backgroundFeatureVars : { backg },
    } = usesBackgroundFeature();
    
    // States:
    
    // Initialize active state:
    // - Exposes `activeFactor` (0 → 1) to represent activation progress
    // - Associates activating/deactivating animations to drive `activeFactor` smoothly
    const {
        activeStateRule,
        activeStateVars: { activeFactor },
    } = usesActiveState({
        animationActivating   : 'var(--box-activating)',
        animationDeactivating : 'var(--box-deactivating)',
    });
    
    // Initialize active transition:
    // - Consumes `activeFactor` from active state
    // - Gradually adjusts brightness, contrast, and saturation based on activation progress
    // - Allows customization of how the "active" appearance should look
    const {
        activeTransitionRule,
    } = usesActiveTransition({
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
        
        // Attach active transition rules (visual emphasis when active):
        ...activeTransitionRule(),
        
        // Define animations for activating/deactivating:
        
        // 🔼 Activating: smoothly interpolate activeFactor from 0 → 1
        ...vars({
            '--box-activating': [
                ['0.3s', 'ease-out', 'both', 'transition-activating'],
            ],
        }),
        ...keyframes('transition-activating', {
            from : { [activeFactor]: 0 },
            // '90%': { [activeFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [activeFactor]: 1 },
        }),
        
        // 🔽 Deactivating: smoothly interpolate activeFactor from 1 → 0
        ...vars({
            '--box-deactivating': [
                ['0.3s', 'ease-out', 'both', 'transition-deactivating'],
            ],
        }),
        ...keyframes('transition-deactivating', {
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

#### 🧠 How CSS Active Transition Works

The [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state) package drives the `activeFactorCond` CSS variable, which represents how far the transition has progressed (from inactive → fully active).  

`active-transition` consumes this factor and applies coordinated formulas that emphasize the current theme colors,
making the component **visually stand out** when active.

##### 1. **Color Formula**

- Gradually shifts a component's lighter variants (**outlined** and **mild**) into the stronger **regular** style, proportionally to the `activeFactorCond` value.  
- For **regular variants** or when the state is fully inactive, the formula resolves to an invalid state, ensuring the component falls back to its original colors without unintended styling.  

##### 2. **Filter Formula**

- Gradually adjusts **brightness, contrast, and saturation** toward the configured "active" values, creating a stronger visual emphasis.  
- For **outlined** or **mild variants**, or when the state is fully inactive, the formula again resolves to an invalid state, restoring the component's original appearance.  

##### ✨ Key Idea

- **Active-state** provides the *progress factor*.  
- **Active-transition** applies *color and filter formulas* based on that factor.  
- Together, they ensure components smoothly highlight themselves when active, while remaining consistent with the current theme colors and variants.  

## 📚 Related Packages

- [`@reusable-ui/active-state`](https://www.npmjs.com/package/@reusable-ui/active-state) – Provides active/selected state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/active-transition** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/active-transition**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/active-transition delivers predictable, reusable state transitions for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
