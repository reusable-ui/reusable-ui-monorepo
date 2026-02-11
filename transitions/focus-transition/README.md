# @reusable-ui/focus-transition 📦  

**focus-transition** provides a **default system styling** for how components visually respond when they gain focus.  
It offers styling authors a **common foundation** for focus transitions that highlight the component with a ring indicator, making components **visually distinct** and signaling readiness for interaction when focused.

The transitions are designed to feel natural to users:  
- Components smoothly expand a focus ring indicator as they gain focus.  
- The ring uses the current theme color, ensuring harmony with the component's appearance.

By using `usesFocusTransition()`, you can apply these transitions consistently across your components — showing the focus ring indicator — with optional customization for ring thickness.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Focus State

`focus-transition` cannot operate in isolation.  
It relies on the [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state) package to drive the `focusFactorCond` CSS variable, which determines how far the transition has progressed (from blurred → fully focused).  

- `focus-state` is responsible for tracking whether a component is focused.  
- `focus-transition` consumes that state and applies the visual ring accordingly.  
- Together, they provide a unified system: `focus-state` supplies the factor, `focus-transition` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `focus-state`.  
- **Visual styling** lives in `focus-transition`.  

## ✨ Features
✔ Provides a focus ring indicator (via a manipulated box shadow)  
✔ Smooth transition between focus and blur states  
✔ Customizable options for ring width  
✔ Unified box shadow stack that composes seamlessly with other state transitions  
✔ Ready-to-use defaults for common scenarios, while remaining flexible for custom styling  

## 📦 Installation
Install **@reusable-ui/focus-transition** via npm or yarn:

```sh
npm install @reusable-ui/focus-transition
# or
yarn add @reusable-ui/focus-transition
```

## 🧩 Exported CSS Hooks

### `usesFocusTransition(options?: CssFocusTransitionOptions): CssFocusTransition`

Applies focus-state transitions that highlight the component with a ring indicator,
making components **visually distinct** and signaling readiness for interaction when focused.

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

// Transitions:
import { usesFocusTransition } from '@reusable-ui/focus-transition';

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
    
    // Focus/blur visual transition:
    // - Consumes `focusFactor` from focus state
    // - Gradually expands or contracts the box shadow spread radius to form an animated focus ring indicator
    // - No blur radius is applied, ensuring a crisp focus ring
    // - Allows customization of the thickness of the focus ring
    const {
        focusTransitionRule,
    } = usesFocusTransition({
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
        
        // Attach focus transition rules (visual focus ring indicator):
        ...focusTransitionRule(),
        
        // Define animations for focusing/blurring:
        
        // 🔼 Focusing: smoothly interpolate focusFactor from 0 → 1
        ...vars({
            '--box-focusing': [
                ['0.3s', 'ease-out', 'both', 'transition-focusing'],
            ],
        }),
        ...keyframes('transition-focusing', {
            from : { [focusFactor]: 0 },
            // '90%': { [focusFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [focusFactor]: 1 },
        }),
        
        // 🔽 Blurring: smoothly interpolate focusFactor from 1 → 0
        ...vars({
            '--box-blurring': [
                ['0.3s', 'ease-out', 'both', 'transition-blurring'],
            ],
        }),
        ...keyframes('transition-blurring', {
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

#### 🧠 How CSS Focus Transition Works

The [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state) package drives the `focusFactorCond` CSS variable, which represents how far the transition has progressed (from blurred → fully focused).  

`focus-transition` consumes this factor and applies a box shadow expansion formula that highlights the component,
making components **visually distinct** and signaling readiness for interaction when focused.

##### **Box Shadow Expansion Formula**

- Renders the focus ring indicator using a box shadow as its visual indicator.  
- Gradually expands the **box shadow spread radius** from `0` to the configured width to form an animated focus ring indicator.  
- No blur radius is applied, ensuring a crisp focus ring.  
- At `factor = 0` (fully blurred), the spread radius resolves to `0` (invisible ring).  
- At `factor = 1` (fully focused), the spread radius resolves to the configured target value (full ring size).  
- Between `0` and `1`, the spread radius interpolates smoothly between invisible and full size.  
- The ring color always uses the current theme color, ensuring harmony with the component's appearance.  

##### ✨ Key Idea

- **Focus-state** provides the *progress factor*.  
- **Focus-transition** applies the *box shadow expansion formula* based on that factor.  
- Together, they ensure components smoothly animate a focus ring indicator when focused, while remaining consistent with the current theme colors and variants.  

## 📚 Related Packages

- [`@reusable-ui/focus-state`](https://www.npmjs.com/package/@reusable-ui/focus-state) – Provides focus state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/focus-transition** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/focus-transition**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/focus-transition delivers predictable, reusable focus ring animations for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
