# @reusable-ui/excite-effect 📦  

**excite-effect** provides **default visual effects** for how components visually respond while in the excited state.  
It offers styling authors a **common foundation** for excite effects that blink by zooming in and flashing color,
making components **visually highlighted** when excited.

The effects are designed to feel natural to users:  
- Components draw attention through rhythmic pulses while in the excited state.  
- Visual cues remain consistent across components, ensuring a predictable and cohesive user experience.  

By using `usesExciteEffect()`, you can apply these effects consistently across your components — grabbing user attention through rhythmic pulses and color shifts — with optional customization for color effects.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Excite State

`excite-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/excite-state`](https://www.npmjs.com/package/@reusable-ui/excite-state) package to drive the `exciteFactorCond` CSS variable, which reflects the dynamic rhythm of the excite state (a continuously oscillating activity driver).  

- `excite-state` tracks the excitement activity.  
- `excite-effect` consumes that state and applies visual adjustments (opacity, brightness, contrast, saturation, etc.).  
- Together, they form a unified system: `excite-state` supplies the factor, and `excite-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `excite-state`.  
- **Visual effect** lives in `excite-effect`.  

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
Install **@reusable-ui/excite-effect** via npm or yarn:

```sh
npm install @reusable-ui/excite-effect
# or
yarn add @reusable-ui/excite-effect
```

## 🧩 Exported CSS Hooks

### `usesExciteEffect(options?: CssExciteEffectOptions): CssExciteEffect`

Applies excite-state effects that blink by zooming in and flashing color,
making components **visually highlighted** when excited.

Exposes strongly typed CSS variables for activity-driven effects.

Runs continuously while the component is in the excited state by animating filter effects.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesTransformFeature } from '@reusable-ui/transform-feature';

// States:
import { usesExciteState } from '@reusable-ui/excite-state';

// Effects:
import { usesExciteEffect } from '@reusable-ui/excite-effect';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const excitableBoxStyle = () => {
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
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature();
    
    // States:
    
    // Excite activity:
    // - Exposes `exciteFactor` (oscillates between 0 ↔ 1) to represent rhythmic excitement
    // - Associates exciting animations to drive `exciteFactor` smoothly
    const {
        exciteStateRule,
        exciteStateVars: { exciteFactor },
    } = usesExciteState({
        animationExciting : 'var(--box-exciting)',
    });
    
    // Excite visual effect:
    // - Consumes `exciteFactor` from excite state
    // - Gradually adjusts filter effects and scale following the factor's rhythmic movement
    // - Allows customization of how the "excited" appearance should look
    const {
        exciteEffectRule,
    } = usesExciteEffect({
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
        
        // Attach excite state rules (tracks excitement activity):
        ...exciteStateRule(),
        
        // Attach excite effect rules (visual feedback while excited):
        ...exciteEffectRule(),
        
        // Define animations for excitement:
        
        // 🏃 Exciting animation: oscillate exciteFactor between 0 ↔ 1 several times
        ...vars({
            '--box-exciting': [
                ['0.3s', 'ease-out', 'both', 'alternate', 4, 'effect-exciting'],
            ],
        }),
        ...keyframes('effect-exciting', {
            from : { [exciteFactor]: 0 },
            // '90%': { [exciteFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [exciteFactor]: 1 },
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

#### 🧠 How CSS Excite Effect Works

The [`@reusable-ui/excite-state`](https://www.npmjs.com/package/@reusable-ui/excite-state) package drives the `exciteFactorCond` CSS variable, which reflects the dynamic rhythm of the excite state (a continuously oscillating activity driver).  

`excite-effect` consumes this factor and applies a filter formula designed to grab user attention,
making components **visually highlighted** while excited.

##### **Filter Formula**

- Gradually adjusts **visual filters** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment, idle state).  
- As `factor` oscillates between `0 ↔ 1` → target values are applied, following the factor's rhythmic movement.  
- Negative configs flip the effect's progression, causing it to fade out rather than fade in.  

##### ✨ Key Idea

- **Excite-state** provides the *rhythm factor* (a continuously oscillating activity driver).  
- **Excite-effect** applies the *filter formulas* based on that factor.  
- Together, they ensure components pulse, zoom, and flash in a way that draws attention while excited.  

## 📚 Related Packages

- [`@reusable-ui/excite-state`](https://www.npmjs.com/package/@reusable-ui/excite-state) – Provides excite state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/excite-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/excite-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/excite-effect delivers predictable, reusable visual feedback for excite states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
