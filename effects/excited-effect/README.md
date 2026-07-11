# @reusable-ui/excited-effect 📦  

**excited-effect** provides **default visual effects** for how components visually respond while in the excited state.  
It offers styling authors a **common foundation** for excitement effects that blink by zooming in and flashing color,
making components **visually highlighted** when excited.

The effects are designed to feel natural to users:  
- Components draw attention through rhythmic pulses while in the excited state.  
- Visual cues remain consistent across components, ensuring a predictable and cohesive user experience.  

By using `usingExcitedEffect()`, you can apply these effects consistently across your components — grabbing user attention through rhythmic pulses and color shifts — with optional customization for color effects.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Excited State

`excited-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/excited-state`](https://www.npmjs.com/package/@reusable-ui/excited-state) package to drive the `excitedFactorCond` CSS variable, which reflects the dynamic rhythm of the excitement state (a continuously oscillating activity driver).  

- `excited-state` tracks the excitement activity.  
- `excited-effect` consumes that state and applies visual adjustments (opacity, brightness, contrast, saturation, etc.).  
- Together, they form a unified system: `excited-state` supplies the factor, and `excited-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `excited-state`.  
- **Visual effect** lives in `excited-effect`.  

## ✨ Features
✔ Smooth rhythmic movement while excited  
✔ Customizable options for color effects  
✔ Adaptive brightness that automatically adjusts for light and dark mode  
✔ Unified filter stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  
✔ Provides clear attention feedback, most visible on surfaces and subtly applied to text for consistent interaction cues  
✔ Supports **reverse intent**:  
   - Positive configurations → effect gradually **applies** while the component is in the excited state  
   - Negative configurations → effect gradually **withdraws** while the component is excited (fully un-applied once idle)  

## 📦 Installation
Install **@reusable-ui/excited-effect** via npm or yarn:

```sh
npm install @reusable-ui/excited-effect
# or
yarn add @reusable-ui/excited-effect
```

## 🧩 Exported CSS Hooks

### `usingExcitedEffect(options?: CssExcitedEffectOptions): CssExcitedEffect`

Applies excited-state effects that blink by zooming in and flashing color,
making components **visually highlighted** when excited.

Exposes strongly typed CSS variables for activity-driven effects.

Runs continuously while the component is in the excited state by animating filter effects.

#### 💡 Usage Example

```ts
// Features:
import { usingAnimationFeature } from '@reusable-ui/animation-feature';
import { usingFilterFeature } from '@reusable-ui/filter-feature';
import { usingTransformFeature } from '@reusable-ui/transform-feature';

// States:
import { usingExcitedState } from '@reusable-ui/excited-state';

// Effects:
import { usingExcitedEffect } from '@reusable-ui/excited-effect';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const excitableBoxStyle = () => {
    // Features:
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usingAnimationFeature();
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usingFilterFeature();
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usingTransformFeature();
    
    // States:
    
    // Excitement activity:
    // - Exposes `excitedFactor` (oscillates between 0 ↔ 1) to represent rhythmic excitement
    // - Associates exciting animations to drive `excitedFactor` smoothly
    const {
        excitedStateRule,
        excitedStateVars: { excitedFactor },
    } = usingExcitedState({
        animationExciting : 'var(--box-exciting)',
    });
    
    // Excitement visual effect:
    // - Consumes `excitedFactor` from excited state
    // - Gradually adjusts filter effects and scale following the factor's rhythmic movement
    // - Allows customization of how the "excited" appearance should look
    const {
        excitedEffectRule,
    } = usingExcitedEffect({
        // Invert:
        // Values `0` → no inversion
        // Values `1` → fully inverted
        invert  : 1, // fully inverted when excited, creating a strong highlight effect
        
        // Scale:
        // Values `< 1` → scale down (shrink)
        // Values `> 1` → scale up (enlarge)
        scale   : 1.2, // slightly zoomed in when excited
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, filter, transform):
        ...animationFeatureRule(),
        ...filterFeatureRule(),
        ...transformFeatureRule(),
        
        // Attach excitement state rules (tracks excitement activity):
        ...excitedStateRule(),
        
        // Attach excitement effect rules (visual feedback while excited):
        ...excitedEffectRule(),
        
        // Define animations for excitement:
        
        // 🏃 Exciting animation: oscillate excitedFactor between 0 ↔ 1 several times
        ...vars({
            '--box-exciting': [
                ['0.3s', 'ease-out', 'both', 'alternate', 4, 'effect-exciting'],
            ],
        }),
        ...keyframes('effect-exciting', {
            from : { [excitedFactor]: 0 },
            // '90%': { [excitedFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [excitedFactor]: 1 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply filters (from filter feature):
        filter,
        
        // Apply transformation (from transform feature):
        transform,
    });
};
```

#### 🧠 How CSS Excitement Effect Works

The [`@reusable-ui/excited-state`](https://www.npmjs.com/package/@reusable-ui/excited-state) package drives the `excitedFactorCond` CSS variable, which reflects the dynamic rhythm of the excitement state (a continuously oscillating activity driver).  

`excited-effect` consumes this factor and applies a filter formula designed to grab user attention,
making components **visually highlighted** while excited.

##### **Filter Formula**

- Gradually adjusts **visual filters** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment, idle state).  
- As `factor` oscillates between `0 ↔ 1` → target values are applied, following the factor's rhythmic movement.  
- Negative configs flip the effect's progression, causing it to fade out rather than fade in.  

##### ✨ Key Idea

- **Excited-state** provides the *rhythm factor*.  
- **Excited-effect** applies the *filter formulas* based on that factor.  
- Together, they ensure components pulse, zoom, and flash in a way that draws attention while excited.  

## 📚 Related Packages

- [`@reusable-ui/excited-state`](https://www.npmjs.com/package/@reusable-ui/excited-state) – Provides excitement state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/excited-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/excited-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/excited-effect delivers predictable, reusable visual feedback for excitement states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
