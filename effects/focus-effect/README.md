# @reusable-ui/focus-effect 📦  

**focus-effect** provides **default visual effects** for how components visually respond when the focus state changes.  
It offers styling authors a **common foundation** for focus effects that highlight components with a ring indicator,
making them **visually distinct** and signaling readiness for interaction when focused.

The effects are designed to feel natural to users:  
- Components smoothly animate a focus ring indicator as they gain focus.  
- The ring uses the current theme color, ensuring harmony with the component's appearance.

By using `usesFocusEffect()`, you can apply these effects consistently across your components — showing the focus ring indicator — with optional customization for ring thickness.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Focus State

`focus-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state) package to drive the `focusFactorCond` CSS variable, which represents how far the transition has progressed (from blurred → fully focused).  

- `focus-state` tracks whether a component is focused.  
- `focus-effect` consumes that state and applies the visual ring.  
- Together, they form a unified system: `focus-state` supplies the factor, and `focus-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `focus-state`.  
- **Visual effect** lives in `focus-effect`.  

## ✨ Features
✔ Provides a focus ring indicator (via a manipulated box shadow)  
✔ Smooth transition between focus and blur states  
✔ Customizable options for ring width  
✔ Unified box shadow stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  

## 📦 Installation
Install **@reusable-ui/focus-effect** via npm or yarn:

```sh
npm install @reusable-ui/focus-effect
# or
yarn add @reusable-ui/focus-effect
```

## 🧩 Exported CSS Hooks

### `usesFocusEffect(options?: CssFocusEffectOptions): CssFocusEffect`

Applies focus-state effects that highlight components with a ring indicator,
making them **visually distinct** and signaling readiness for interaction when focused.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between focus and blur states by animating the ring width.
Uses the current theme color, ensuring harmony with the component's appearance.

#### 💡 Usage Example

```ts
// Features:
import { usesRingFeature } from '@reusable-ui/ring-feature';
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesBoxShadowFeature } from '@reusable-ui/box-shadow-feature';

// States:
import { usesFocusState } from '@reusable-ui/focus-state';

// Effects:
import { usesFocusEffect } from '@reusable-ui/focus-effect';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const focusableBoxStyle = () => {
    // Features:
    const {
        ringFeatureRule,
    } = usesRingFeature();
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature();
    
    // States:
    
    // Focus/blur lifecycle:
    // - Exposes `focusFactor` (0 → 1) to represent transition progress
    // - Associates focusing/blurring animations to drive `focusFactor` smoothly
    const {
        focusStateRule,
        focusStateVars: { focusFactor },
    } = usesFocusState({
        animationFocusing : 'var(--box-focusing)',
        animationBlurring : 'var(--box-blurring)',
    });
    
    // Focus/blur visual effect:
    // - Consumes `focusFactor` from focus state
    // - Gradually expands or contracts the box shadow spread radius to form an animated focus ring indicator
    // - No blur radius is applied, ensuring a crisp focus ring
    // - Allows customization of the thickness of the focus ring
    const {
        focusEffectRule,
    } = usesFocusEffect({
        // The width of the focus ring indicator when fully focused:
        focusRingWidth : '0.25rem',
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (ring color, animation, box shadow):
        ...ringFeatureRule(),
        ...animationFeatureRule(),
        ...boxShadowFeatureRule(),
        
        // Attach focus state rules (tracks focus/blur):
        ...focusStateRule(),
        
        // Attach focus effect rules (visual focus ring indicator):
        ...focusEffectRule(),
        
        // Define animations for focusing/blurring:
        
        // 🔼 Focusing: smoothly interpolate focusFactor from 0 → 1
        ...vars({
            '--box-focusing': [
                ['0.3s', 'ease-out', 'both', 'effect-focusing'],
            ],
        }),
        ...keyframes('effect-focusing', {
            from : { [focusFactor]: 0 },
            // '90%': { [focusFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [focusFactor]: 1 },
        }),
        
        // 🔽 Blurring: smoothly interpolate focusFactor from 1 → 0
        ...vars({
            '--box-blurring': [
                ['0.3s', 'ease-out', 'both', 'effect-blurring'],
            ],
        }),
        ...keyframes('effect-blurring', {
            from : { [focusFactor]: 1 },
            // '10%': { [focusFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [focusFactor]: 0 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply box shadow (from box-shadow feature):
        boxShadow,
    });
};
```

#### 🧠 How CSS Focus Effect Works

The [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state) package drives the `focusFactorCond` CSS variable, which represents how far the transition has progressed (from blurred → fully focused).  

`focus-effect` consumes this factor and applies a box shadow expansion formula that highlights the component,
making it **visually distinct** and signaling readiness for interaction when focused.

##### **Box Shadow Expansion Formula**

- Renders the focus ring indicator using a box shadow as its visual indicator.  
- The ring color always uses the current theme color, ensuring harmony with the component's appearance.  
- No blur radius is applied, ensuring a crisp focus ring.  
- Gradually adjusts **box shadow spread radius** toward the configured spread radius.  
- At `factor = 0` → zero spread radius (invisible ring).  
- At `factor = 1` → configured spread radius.  
- Between `0` and `1` → smooth interpolation.  

##### ✨ Key Idea

- **Focus-state** provides the *progress factor*.  
- **Focus-effect** applies the *box shadow expansion formula* based on that factor.  
- Together, they ensure components smoothly animate a focus ring indicator when focused.  

## 📚 Related Packages

- [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state) – Provides focus state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/focus-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/focus-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/focus-effect delivers predictable, reusable focus ring animations for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
