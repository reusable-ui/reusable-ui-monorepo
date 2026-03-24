# @reusable-ui/view-effect 📦  

**view-effect** provides **default visual effects** for how components visually respond when the view state changes.  
It offers styling authors a **common foundation** for view effects that slide between views,
making components **visually transitioned** to the next view or step.

The effects are designed to feel natural to users:  
- Components smoothly slide between views, creating a clear sense of movement and continuity.  
- A selective rendering strategy may be applied: during transitions, multiple views are briefly rendered to maintain the illusion of continuous motion, while once settled only the target view remains mounted — ensuring smooth visuals with improved performance.  

By using `usesViewEffect()`, you can apply these effects consistently across your components — sliding to the target view — with optional customization for spacing, offsets, selective rendering, etc.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with View State

`view-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/view-state`](https://www.npmjs.com/package/@reusable-ui/view-state) package to drive the `viewFactorCond` CSS variable, which represents how far the transition has progressed (from the current view → toward the target view).  

- `view-state` tracks the active view index and transition factor.  
- `view-effect` consumes that factor and applies the sliding transition.  
- Together, they form a unified system: `view-state` supplies the factor, and `view-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `view-state`.  
- **Visual effect** lives in `view-effect`.  

## ✨ Features
✔ Smooth sliding transitions between views  
✔ Customizable options for spacing, offsets, orientation, selective rendering, etc.  
✔ Unified transform stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  

## 📦 Installation
Install **@reusable-ui/view-effect** via npm or yarn:

```sh
npm install @reusable-ui/view-effect
# or
yarn add @reusable-ui/view-effect
```

## 🧩 Exported CSS Hooks

### `usesViewEffect(options?: CssViewEffectOptions): CssViewEffect`

Applies view-state effects that slide between views,
making components **visually transitioned** to the next view or step.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between views by moving (translating) the entire set of views along the stacking axis.
Gradually revealing the target view inside the container viewport while moving the others out of sight.
This creates a natural **switching illusion** of view changes.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesTransformFeature } from '@reusable-ui/transform-feature';

// States:
import { usesViewState } from '@reusable-ui/view-state';

// Effects:
import { usesViewEffect } from '@reusable-ui/view-effect';

// CSS-in-JS:
import { rule, style, vars, keyframes, children } from '@cssfn/core';

export const slideBoxStyle = () => {
    // Features:
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature();
    
    // States:
    
    // View-switching lifecycle:
    // - Exposes `viewFactor` (-1 → 0 → +1) to represent transition progress
    // - Associates advancing/receding animations to drive `viewFactor` smoothly
    const {
        viewStateRule,
        viewStateVars: { viewFactor },
    } = usesViewState({
        animationViewAdvancing : 'var(--box-view-advancing)',
        animationViewReceding  : 'var(--box-view-receding)',
    });
    
    // View-switching visual effect:
    // - Consumes `viewFactor` from view state
    // - Gradually switches between views based on transition progress
    // - Allows customization of spacing, offsets, orientation, selective rendering, etc
    const {
        viewEffectRule,
    } = usesViewEffect({
        // Only visible and transitioning views are mounted in the DOM:
        enablesSelectiveRendering : true,
        
        // The width of each view:
        size                      : '200px',
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        width    : '200px',
        height   : '100px',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation):
        ...animationFeatureRule(),
        
        // Attach view state rules (tracks view-switching/view-settled):
        ...viewStateRule(),
        
        // Define animations for view-advancing/view-receding:
        
        // Advancing animation: interpolate viewFactor from 0 → +1
        ...vars({
            '--box-view-advancing': [
                ['0.3s', 'ease-out', 'both', 'effect-view-advancing'],
            ],
        }),
        ...keyframes('effect-view-advancing', {
            from : { [viewFactor]:  0 },
            // '90%': { [viewFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [viewFactor]:  1 },
        }),
        
        // Receding animation: interpolate viewFactor from 0 → -1
        ...vars({
            '--box-view-receding': [
                ['0.3s', 'ease-out', 'both', 'effect-view-receding'],
            ],
        }),
        ...keyframes('effect-view-receding', {
            from : { [viewFactor]:  0 },
            // '90%': { [viewFactor]: -1.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [viewFactor]: -1 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // The whole views for switching:
        ...children('.views', {
            display: 'grid',
            gridAutoFlow: 'column',
            // Base styling for the component goes here.
            
            // Attach feature rules (transform):
            ...transformFeatureRule(),
            
            // Attach view effect rules (visual view-switching/view-settled):
            ...viewEffectRule(),
            
            // Apply transformation (from transform feature):
            transform,
            
            // The individual view:
            ...children('.view', {
                width  : '200px',
                height : '100px',
                
                // Adds colors for visual distinction during testing:
                ...rule(':nth-child(5n+1)', {
                    backgroundColor: 'lightgreen',
                }),
                ...rule(':nth-child(5n+2)', {
                    backgroundColor: 'lightpink',
                }),
                ...rule(':nth-child(5n+3)', {
                    backgroundColor: 'lightsalmon',
                }),
                ...rule(':nth-child(5n+4)', {
                    backgroundColor: 'lightsteelblue',
                }),
                ...rule(':nth-child(5n+5)', {
                    backgroundColor: 'lightskyblue',
                }),
            }),
        }),
    });
};
```

#### 🧠 How CSS View Effect Works

The [`@reusable-ui/view-state`](https://www.npmjs.com/package/@reusable-ui/view-state) package drives the `viewFactorCond` CSS variable, which represents how far the transition has progressed (from the current view → toward the target view).  
This factor encodes both the **direction** (positive = advancing to next, negative = receding to previous) and the **progress** (0 → ±1) of the transition.

`view-effect` consumes this factor and applies a translation formula that moves the entire set of views along the stacking axis.
making the component **visually transitioned** to the next view or step.

##### **Translation Formula**

- Gradually slides the **target view** into the visible viewport.  
- At `factor = 0`  → the origin view is fully aligned in the viewport.  
- At `factor = +1` → the next target view is fully slid into place.  
- At `factor = -1` → the previous target view is fully slid into place.  
- Between `0` and `±1` → smooth interpolation between origin and target, producing a natural sliding transition.  
- Values outside `-1…+1` (e.g. overshoot like `1.2`) are allowed, enabling spring or rebound effects before settling.  

##### ✨ Key Idea

- **View-state** provides the *progress factor*.  
- **View-effect** applies the *translation formula* based on that factor.  
- Together, they ensure components smoothly slide and transition between views,  
  giving users clear visual feedback as they navigate through steps or flows.  

## 📚 Related Packages

- [`@reusable-ui/view-state`](https://www.npmjs.com/package/@reusable-ui/view-state) – Provides view state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/view-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/view-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/view-effect delivers predictable, reusable sliding transitions for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
