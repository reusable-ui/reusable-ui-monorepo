# @reusable-ui/hover-effect 📦  

**hover-effect** provides **default styling effects** for how components visually respond when the hover state changes.  
It offers styling authors a **common foundation** for hover effects that signal interactivity, making components **visually responsive and clearly distinguishable from static content**.

The effects are designed to feel natural to users:  
- Components smoothly highlight and emphasize as they move into the hovered state.  
- Text decorations (such as underlines) can be applied to emphasize interactivity.  
- Visual cues remain consistent across components, ensuring predictable user experience.  

By using `usesHoverEffect()`, you can apply these effects consistently across your components — enhancing emphasis through filters across the entire component surface — with optional customization for color effects and text decoration.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Hover State

`hover-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state) package to drive the `hoverFactorCond` CSS variable, which determines how far the transition has progressed (from unhovered → fully hovered).  

- `hover-state` is responsible for tracking whether a component is hovered.  
- `hover-effect` consumes that state and applies visual adjustments (opacity, brightness, contrast, saturation, etc.) accordingly.  
- Together, they provide a unified system: `hover-state` supplies the factor, `hover-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `hover-state`.  
- **Visual effect** lives in `hover-effect`.  

## ✨ Features
✔ Smooth transition between unhover and hover states  
✔ Customizable options for color effects and text decorations  
✔ Unified filter stack that composes seamlessly with other state effects  
✔ Ready-to-use defaults for common scenarios, while remaining flexible for custom styling  
✔ Works across both text and surface elements for cohesive interactivity cues  
✔ Supports **reverse interpolation**:  
   - Positive configurations → fade *in* the effect during hover  
   - Negative configurations → fade *out* the effect during hover (effect is fully un-applied at full hover)  

## 📦 Installation
Install **@reusable-ui/hover-effect** via npm or yarn:

```sh
npm install @reusable-ui/hover-effect
# or
yarn add @reusable-ui/hover-effect
```

## 🧩 Exported CSS Hooks

### `usesHoverEffect(options?: CssHoverEffectOptions): CssHoverEffect`

Applies hover-state effects that signal interactivity,
making components **visually responsive and clearly distinguishable from static content**.

Hover effects convey clickability, editability, or other available actions
by providing subtle visual feedback during interaction.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between unhover and hover states by animating filter effects.
Preserves the current theme colors and variants while enhancing emphasis
through responsive visual cues.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';

// States:
import { usesHoverState } from '@reusable-ui/hover-state';

// Effects:
import { usesHoverEffect } from '@reusable-ui/hover-effect';

// CSS-in-JS:
import { style, vars, keyframes, switchOf } from '@cssfn/core';

export const hoverableBoxStyle = () => {
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
    
    // Hover/unhover lifecycle:
    // - Exposes `hoverFactor` (0 → 1) to represent transition progress
    // - Associates hovering/unhovering animations to drive `hoverFactor` smoothly
    const {
        hoverStateRule,
        hoverStateVars: { hoverFactor },
    } = usesHoverState({
        animationHovering   : 'var(--box-hovering)',
        animationUnhovering : 'var(--box-unhovering)',
    });
    
    // Hover/unhover visual effect:
    // - Consumes `hoverFactor` from hover state
    // - Gradually adjusts filter effects based on transition progress
    // - Text decoration switches discretely when hovered
    // - Allows customization of how the "hovered" appearance should look
    const {
        hoverEffectRule,
        hoverEffectVars: { hoverTextDecoration },
    } = usesHoverEffect({
        // Brightness:
        // Values `< 1` → darken  in light mode, lighten in dark mode
        // Values `> 1` → lighten in light mode, darken  in dark mode
        hoverBrightness     : 1.1, // subtle lightening in light mode, subtle darkening in dark mode
        
        // Contrast:
        // Values `< 1` → softer contrast
        // Values `> 1` → stronger contrast
        hoverContrast       : 1.1,  // slightly stronger contrast when hovered
        
        // Saturation:
        // Values `< 1` → muted colors
        // Values `> 1` → more vivid colors
        hoverSaturate       : 1.2,  // slightly more vibrant colors when hovered
        
        hoverTextDecoration : 'underline', // underline text when hovered
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, filter):
        ...animationFeatureRule(),
        ...filterFeatureRule(),
        
        // Attach hover state rules (tracks hovered/unhovered):
        ...hoverStateRule(),
        
        // Attach hover effect rules (visual feedback when hovered):
        ...hoverEffectRule(),
        
        // Define animations for hovering/unhovering:
        
        // 🔼 Hovering: smoothly interpolate hoverFactor from 0 → 1
        ...vars({
            '--box-hovering': [
                ['0.3s', 'ease-out', 'both', 'effect-hovering'],
            ],
        }),
        ...keyframes('effect-hovering', {
            from : { [hoverFactor]: 0 },
            // '90%': { [hoverFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [hoverFactor]: 1 },
        }),
        
        // 🔽 Unhovering: smoothly interpolate hoverFactor from 1 → 0
        ...vars({
            '--box-unhovering': [
                ['0.3s', 'ease-out', 'both', 'effect-unhovering'],
            ],
        }),
        ...keyframes('effect-unhovering', {
            from : { [hoverFactor]: 1 },
            // '10%': { [hoverFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [hoverFactor]: 0 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply filters (from filter feature):
        filter,
        
        // Apply hover text decoration conditionally:
        textDecoration : switchOf(hoverTextDecoration, 'none'), // Default to 'none' when not hovered
    });
};
```

#### 🧠 How CSS Hover Effect Works

The [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state) package drives a `hoverFactorCond` CSS variable, which represents how far the transition has progressed (from unhovered → fully hovered).  

`hover-effect` consumes this factor and applies coordinated formulas that signal interactivity,
making components **visually responsive and clearly distinguishable from static content**.

##### 1. **Filter Formula**

- Gradually adjusts **visual filters** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment).  
- At `factor = 1` → configured target values.  
- Between `0` and `1` → smooth interpolation.  
- Negative configs reverse the direction (fade out instead of fade in).  

##### 2. **Text Decoration Switching**

- Text decoration (such as underline) changes discretely when hovered.  
- Provides a clear cue for interactive text elements.  

##### ✨ Key Idea

- **Hover-state** provides the *progress factor*.  
- **Hover-effect** applies *filter formulas* and *text decoration switching* based on that factor.  
- Together, they ensure components smoothly highlight and emphasize when hovered.  

## 📚 Related Packages

- [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state) – Provides hover state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/hover-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/hover-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/hover-effect delivers predictable, reusable visual feedback for hover states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
