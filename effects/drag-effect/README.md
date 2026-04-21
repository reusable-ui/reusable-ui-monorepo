# @reusable-ui/drag-effect 📦  

**drag-effect** provides **default visual effects** for how components visually respond when the drag state changes.  
It offers styling authors a **common foundation** for drag effects that follow the cursor movement,
making components **visually carried and repositioned** while being dragged.

The effects are designed to feel natural to users:  
- Components smoothly transition from their original placement into the current cursor position and continuously follow it during dragging.  
- Additional visual cues such as filter or color effects (e.g. semi‑transparency, brightness adjustments) may apply, reinforcing the sense of motion and maintaining consistent feedback across components.  

By using `usesDragEffect()`, you can apply these effects consistently across your components — with optional customization for filter and color effects.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Drag State

`drag-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/drag-state`](https://www.npmjs.com/package/@reusable-ui/drag-state) package to drive the `dragFactorCond` CSS variable, which reflects the progression of the drag state (from dropped → fully dragged).  

- `drag-state` tracks whether a component is dragged.  
- `drag-effect` consumes that state and applies visual adjustments (transform, opacity, brightness, contrast, saturation, etc.).  
- Together, they form a unified system: `drag-state` supplies the factor, and `drag-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `drag-state`.  
- **Visual effect** lives in `drag-effect`.  

## ✨ Features
✔ Smooth transition between drag and drop states  
✔ Customizable options for filter and color effects  
✔ Adaptive brightness that automatically adjusts for light and dark mode  
✔ Unified transform stack that composes seamlessly with other state-driven effects  
✔ Unified filter stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  
✔ Provides clear drag feedback, reinforcing the sense of dragging motion  
✔ Supports **reverse intent**:  
   - Positive configurations → effect gradually **applies** as the component becomes dragged  
   - Negative configurations → effect gradually **withdraws** as the component becomes dragged (fully un-applied at full dragged state)  

## 📦 Installation
Install **@reusable-ui/drag-effect** via npm or yarn:

```sh
npm install @reusable-ui/drag-effect
# or
yarn add @reusable-ui/drag-effect
```

## 🧩 Exported CSS Hooks

### `usesDragEffect(options?: CssDragEffectOptions): CssDragEffect`

Applies drag-state effects that follow the cursor movement,
making components **visually carried and repositioned** while being dragged.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between drag and drop states by animating transform and filter effects.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesTransformFeature } from '@reusable-ui/transform-feature';

// States:
import { usesDragState } from '@reusable-ui/drag-state';

// Effects:
import { usesDragEffect } from '@reusable-ui/drag-effect';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const draggableBoxStyle = () => {
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
    
    // Drag/drop lifecycle:
    // - Exposes `dragFactor` (0 → 1) to represent transition progress
    // - Associates dragging/dropping animations to drive `dragFactor` smoothly
    const {
        dragStateRule,
        dragStateVars: { dragFactor },
    } = usesDragState({
        animationDragging : 'var(--box-dragging)',
        animationDropping : 'var(--box-dropping)',
    });
    
    // Drag/drop visual effect:
    // - Consumes `dragFactor` from drag state
    // - Gradually translates the component from its original placement toward the cursor position
    // - Allows additional customization of how the "dragged" appearance should look
    const {
        dragEffectRule,
    } = usesDragEffect({
        // Opacity:
        // Values between `0` and `1` → partially transparent
        // Values `= 0` → fully transparent
        // Values `= 1` → fully opaque (no fade)
        opacity  : 0.5, // half opacity while being dragged
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, filter, transform):
        ...animationFeatureRule(),
        ...filterFeatureRule(),
        ...transformFeatureRule(),
        
        // Attach drag state rules (tracks drag/drop):
        ...dragStateRule(),
        
        // Attach drag effect rules (visual feedback when dragged):
        ...dragEffectRule(),
        
        // Define animations for dragging/dropping:
        
        // 🔼 Dragging: smoothly interpolate dragFactor from 0 → 1
        ...vars({
            '--box-dragging': [
                ['0.3s', 'ease-out', 'both', 'effect-dragging'],
            ],
        }),
        ...keyframes('effect-dragging', {
            from : { [dragFactor]: 0 },
            // '90%': { [dragFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [dragFactor]: 1 },
        }),
        
        // 🔽 Dropping: smoothly interpolate dragFactor from 1 → 0
        ...vars({
            '--box-dropping': [
                ['0.3s', 'ease-out', 'both', 'effect-dropping'],
            ],
        }),
        ...keyframes('effect-dropping', {
            from : { [dragFactor]: 1 },
            // '10%': { [dragFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [dragFactor]: 0 },
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

#### 🧠 How CSS Drag Effect Works

The [`@reusable-ui/drag-state`](https://www.npmjs.com/package/@reusable-ui/drag-state) package drives the `dragFactorCond` CSS variable, which reflects the progression of the drag state (from dropped → fully dragged).  

`drag-effect` consumes this factor and applies transform and filter formulas that follow the cursor movement,
making components **visually carried and repositioned** while being dragged.

##### **Transform Formula**

- Gradually translates the component from its original placement toward the cursor position.  
- At `factor = 0` → original placement (no translation).  
- At `factor = 1` → fully aligned with the cursor position (and continuously follows it).  
- Between `0` and `1` → smooth interpolation along the path.  

##### **Filter Formula (Optional)**

- Gradually adjusts **visual filters** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment).  
- At `factor = 1` → configured target values.  
- Between `0` and `1` → smooth interpolation.  
- Negative configs reverse the direction (fade out instead of fade in).  

##### ✨ Key Idea

- **Drag-state** provides the *progress factor*.  
- **Drag-effect** applies the *transform* and *filter* formulas based on that factor.  
- Together, they ensure components smoothly transition from their original placement into the cursor position.  

## 📚 Related Packages

- [`@reusable-ui/drag-state`](https://www.npmjs.com/package/@reusable-ui/drag-state) – Provides drag state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/drag-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/drag-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/drag-effect delivers predictable, reusable visual feedback for drag states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
