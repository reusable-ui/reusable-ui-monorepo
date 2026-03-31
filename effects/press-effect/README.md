# @reusable-ui/press-effect 📦  

**press-effect** provides **default visual effects** for how components visually respond when the press state changes.  
It offers styling authors a **common foundation** for press effects that acknowledge user input,
making components **visually confirming command** when pressed (clicked).

The effects are designed to feel natural to users:  
- Components smoothly highlight and emphasize as they move into the pressed state.  
- Visual cues remain consistent across components, ensuring a predictable and cohesive user experience.  

By using `usesPressEffect()`, you can apply these effects consistently across your components — enhancing emphasis through filters across the entire component surface — with optional customization for color effects.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Press State

`press-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) package to drive the `pressFactorCond` CSS variable, which reflects the progression of the press state (from released → fully pressed).  

- `press-state` tracks whether a component is pressed.  
- `press-effect` consumes that state and applies visual adjustments (opacity, brightness, contrast, saturation, etc.).  
- Together, they form a unified system: `press-state` supplies the factor, and `press-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `press-state`.  
- **Visual effect** lives in `press-effect`.  

## ✨ Features
✔ Smooth transition between press and release states  
✔ Customizable options for color effects  
✔ Adaptive brightness that automatically adjusts for light and dark mode  
✔ Unified filter stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  
✔ Provides clear press feedback, most visible on surfaces and subtly applied to text for consistent interaction cues  
✔ Supports **reverse intent**:  
   - Positive configurations → effect gradually **applies** as the component becomes pressed  
   - Negative configurations → effect gradually **withdraws** as the component becomes pressed (fully un-applied at full pressed state)  

## 📦 Installation
Install **@reusable-ui/press-effect** via npm or yarn:

```sh
npm install @reusable-ui/press-effect
# or
yarn add @reusable-ui/press-effect
```

## 🧩 Exported CSS Hooks

### `usesPressEffect(options?: CssPressEffectOptions): CssPressEffect`

Applies press-state effects that acknowledge user input,
making components **visually confirming command** when pressed (clicked).

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between press and release states by animating filter effects.
Preserves the current theme colors and variants while enhancing emphasis
through responsive visual cues.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';

// States:
import { usesPressState } from '@reusable-ui/press-state';

// Effects:
import { usesPressEffect } from '@reusable-ui/press-effect';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const pressableBoxStyle = () => {
    // Features:
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    
    // States:
    
    // Press/release lifecycle:
    // - Exposes `pressFactor` (0 → 1) to represent transition progress
    // - Associates pressing/releasing animations to drive `pressFactor` smoothly
    const {
        pressStateRule,
        pressStateVars: { pressFactor },
    } = usesPressState({
        animationPressing   : 'var(--box-pressing)',
        animationReleasing : 'var(--box-releasing)',
    });
    
    // Press/release visual effect:
    // - Consumes `pressFactor` from press state
    // - Gradually adjusts filter effects based on transition progress
    // - Allows customization of how the "pressed" appearance should look
    const {
        pressEffectRule,
    } = usesPressEffect({
        // Brightness:
        // Values `< 1` → darken  in light mode, lighten in dark mode
        // Values `> 1` → lighten in light mode, darken  in dark mode
        brightness : 0.6, // fairly darken in light mode, fairly lighten in dark mode
        
        // Contrast:
        // Values `< 1` → softer contrast
        // Values `> 1` → stronger contrast
        contrast   : 1.1, // slightly stronger contrast when pressed
        
        // Saturation:
        // Values `< 1` → muted colors
        // Values `> 1` → more vivid colors
        saturate   : 1.2, // slightly more vibrant colors when pressed
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, filter):
        ...animationFeatureRule(),
        ...filterFeatureRule(),
        
        // Attach press state rules (tracks press/release):
        ...pressStateRule(),
        
        // Attach press effect rules (visual feedback when pressed):
        ...pressEffectRule(),
        
        // Define animations for pressing/releasing:
        
        // 🔼 Pressing: smoothly interpolate pressFactor from 0 → 1
        ...vars({
            '--box-pressing': [
                ['0.3s', 'ease-out', 'both', 'effect-pressing'],
            ],
        }),
        ...keyframes('effect-pressing', {
            from : { [pressFactor]: 0 },
            // '90%': { [pressFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [pressFactor]: 1 },
        }),
        
        // 🔽 Releasing: smoothly interpolate pressFactor from 1 → 0
        ...vars({
            '--box-releasing': [
                ['0.3s', 'ease-out', 'both', 'effect-releasing'],
            ],
        }),
        ...keyframes('effect-releasing', {
            from : { [pressFactor]: 1 },
            // '10%': { [pressFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [pressFactor]: 0 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply filters (from filter feature):
        filter,
    });
};
```

#### 🧠 How CSS Press Effect Works

The [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) package drives the `pressFactorCond` CSS variable, which reflects the progression of the press state (from released → fully pressed).  

`press-effect` consumes this factor and applies a filter formula that acknowledges user input,
making components **visually confirming command** when pressed (clicked).

##### **Filter Formula**

- Gradually adjusts **visual filters** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment).  
- At `factor = 1` → configured target values.  
- Between `0` and `1` → smooth interpolation.  
- Negative configs reverse the direction (fade out instead of fade in).  

##### ✨ Key Idea

- **Press-state** provides the *progress factor*.  
- **Press-effect** applies the *filter formulas* based on that factor.  
- Together, they ensure components smoothly highlight and emphasize when pressed.  

## 📚 Related Packages

- [`@reusable-ui/press-state`](https://www.npmjs.com/package/@reusable-ui/press-state) – Provides press state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/press-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/press-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/press-effect delivers predictable, reusable visual feedback for press states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
