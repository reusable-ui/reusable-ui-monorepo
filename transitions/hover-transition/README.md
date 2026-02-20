# @reusable-ui/hover-transition 📦  

**hover-transition** provides a **default system styling** for how components visually respond when hovered.  
It offers styling authors a **common foundation** for hover transitions that indicate component interactivity, making components **visually responsive and distinguishable from static content** when hovered.

The transitions are designed to feel natural to users:  
- Components smoothly highlight and emphasize as they move into the hovered state.  
- Text decorations (such as underlines) can be applied to emphasize interactivity.  
- Visual cues remain consistent across components, ensuring predictable user experience.  

By using `usesHoverTransition()`, you can apply these transitions consistently across your components — enhancing emphasis through filters the entire component surface — with optional customization for color effects and text decoration.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Hover State

`hover-transition` cannot operate in isolation.  
It relies on the [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state) package to drive the `hoverFactorCond` CSS variable, which determines how far the transition has progressed (from unhovered → fully hovered).  

- `hover-state` is responsible for tracking whether a component is hovered.  
- `hover-transition` consumes that state and applies visual adjustments (opacity, brightness, contrast, saturation, etc.) accordingly.  
- Together, they provide a unified system: `hover-state` supplies the factor, `hover-transition` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `hover-state`.  
- **Visual styling** lives in `hover-transition`.  

## ✨ Features
✔ Smooth transition between unhover and hover states  
✔ Customizable options for color effects and text decorations  
✔ Unified filter stack that composes seamlessly with other state transitions  
✔ Ready-to-use defaults for common scenarios, while remaining flexible for custom styling  
✔ Works across both text and surface elements for cohesive interactivity cues  
✔ Supports **reverse interpolation**:  
   - Positive configurations → fade *in* the effect during hover  
   - Negative configurations → fade *out* the effect during hover (effect is fully un-applied at full hover)  

## 📦 Installation
Install **@reusable-ui/hover-transition** via npm or yarn:

```sh
npm install @reusable-ui/hover-transition
# or
yarn add @reusable-ui/hover-transition
```

## 🧩 Exported CSS Hooks

### `usesHoverTransition(options?: CssHoverTransitionOptions): CssHoverTransition`

Applies hover-state transitions that indicate component interactivity,
making components **visually responsive and distinguishable from static content** when hovered.

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

// Transitions:
import { usesHoverTransition } from '@reusable-ui/hover-transition';

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
    
    // Hover/unhover visual transition:
    // - Consumes `hoverFactor` from hover state
    // - Gradually adjusts filter effects based on transition progress
    // - Text decoration switches discretely when hovered
    // - Allows customization of how the "hovered" appearance should look
    const {
        hoverTransitionRule,
        hoverTransitionVars: { hoverTextDecoration },
    } = usesHoverTransition({
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
        
        // Attach hover transition rules (visual feedback when hovered):
        ...hoverTransitionRule(),
        
        // Define animations for hovering/unhovering:
        
        // 🔼 Hovering: smoothly interpolate hoverFactor from 0 → 1
        ...vars({
            '--box-hovering': [
                ['0.3s', 'ease-out', 'both', 'transition-hovering'],
            ],
        }),
        ...keyframes('transition-hovering', {
            from : { [hoverFactor]: 0 },
            // '90%': { [hoverFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [hoverFactor]: 1 },
        }),
        
        // 🔽 Unhovering: smoothly interpolate hoverFactor from 1 → 0
        ...vars({
            '--box-unhovering': [
                ['0.3s', 'ease-out', 'both', 'transition-unhovering'],
            ],
        }),
        ...keyframes('transition-unhovering', {
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

#### 🧠 How CSS Hover Transition Works

The [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state) package drives the `hoverFactorCond` CSS variable, which represents how far the transition has progressed (from unhovered → fully hovered).  

`hover-transition` consumes this factor and applies coordinated formulas that indicate component interactivity,
making components **visually responsive and distinguishable from static content** when hovered.

##### 1. **Filter Formula**

- Gradually adjusts **visual filters** toward the configured target values, creating a responsive visual effect.  
- At `factor = 0` (fully unhovered), filters resolve to neutral values (no adjustment).  
- At `factor = 1` (fully hovered), filters resolve to the configured target values.  
- Between `0` and `1`, filters interpolate smoothly between neutral and target.  
- Opacity is clamped between `0` and `1`, while brightness, contrast, saturation, blur, and blur radius may overshoot/undershoot if factor goes beyond the normal range.  
- **Negative configurations reverse the interpolation direction**:  
  - Positive values → fade *in* the effect during hover (neutral → target).  
  - Negative values → fade *out* the effect during hover (target → neutral).  
  - At full hover with a negative config, the original neutral state is restored (effect fully un-applied).  

##### 2. **Text Decoration Switching**

- Text decoration (such as underline) changes discretely (no gradual interpolation) when the component becomes hovered.  
- Provides a clear cue for interactive text elements.  

##### ✨ Key Idea

- **Hover-state** provides the *progress factor*.  
- **Hover-transition** applies *filter formulas* (opacity, brightness, contrast, saturation, etc.) and *text decoration switching* based on that factor.  
- Together, they ensure components smoothly highlight and emphasize when hovered, while remaining consistent with the current theme colors and variants.  

## 📚 Related Packages

- [`@reusable-ui/hover-state`](https://www.npmjs.com/package/@reusable-ui/hover-state) – Provides hover state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/hover-transition** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/hover-transition**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/hover-transition delivers predictable, reusable visual feedback for hover states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
