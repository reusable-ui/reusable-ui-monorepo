# @reusable-ui/collapse-effect 📦  

**collapse-effect** provides **default visual effects** for how components visually respond when the collapse state changes.  
It offers styling authors a **common foundation** for collapse effects that slide down/up the entire component surface,
making components **visually revealed or hidden** as they expand or collapse.

The effects are designed to feel natural to users:  
- Components smoothly animate a sliding transition that reveals or hides their contents.  
- The content size remains stable (only partially cropped), ensuring it is never squashed or distorted during the animation.  

By using `usesCollapseEffect()`, you can apply these effects consistently across your components — with optional customization for orientation, direction, and collapsed display.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Collapse State

`collapse-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state) package to drive the `expandFactorCond` CSS variable, which represents how far the transition has progressed (from collapsed → fully expanded).  

- `collapse-state` tracks whether a component is expanded or collapsed.  
- `collapse-effect` consumes that state and applies the sliding-crop transition.  
- Together, they form a unified system: `collapse-state` supplies the factor, and `collapse-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `collapse-state`.  
- **Visual effect** lives in `collapse-effect`.  

## ✨ Features
✔ Smooth transition between expanded and collapsed states  
✔ Customizable options for orientation, direction, and collapsed display  
✔ Unified transform stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  

## 📦 Installation
Install **@reusable-ui/collapse-effect** via npm or yarn:

```sh
npm install @reusable-ui/collapse-effect
# or
yarn add @reusable-ui/collapse-effect
```

## 🧩 Exported CSS Hooks

### `usesCollapseEffect(options?: CssCollapseEffectOptions): CssCollapseEffect`

Applies collapse-state effects that slide down/up the entire component surface,
making components **visually revealed or hidden** as they expand or collapse.

Exposes strongly typed CSS variables for transitional effects.

Ensures smooth transitions between expanded and collapsed states by animating negative margins and
cropping a portion of the component's area.

Important:  
This CSS hook requires `useCollapsibleSize()` to be implemented on the React side.
That hook measures the element's total size and injects the values as CSS variables,
enabling the collapse transitions to work correctly.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesTransformFeature } from '@reusable-ui/transform-feature';

// States:
import { usesCollapseState } from '@reusable-ui/collapse-state';

// Effects:
import { usesCollapseEffect } from '@reusable-ui/collapse-effect';

// CSS-in-JS:
import { style, vars, keyframes, switchOf } from '@cssfn/core';

export const collapsibleBoxStyle = () => {
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
    
    // Expand/collapse lifecycle:
    // - Exposes `expandFactor` (0 → 1) to represent transition progress
    // - Associates expanding/collapsing animations to drive `expandFactor` smoothly
    const {
        collapseStateRule,
        collapseStateVars: { expandFactor },
    } = usesCollapseState({
        animationExpanding  : 'var(--box-expanding)',
        animationCollapsing : 'var(--box-collapsing)',
    });
    
    // Expand/collapse visual effect:
    // - Consumes `expandFactor` from collapse state
    // - Gradually reveals or hides the contents
    // - Allows customization of orientation, direction, and collapsed display
    const {
        collapseEffectRule,
        collapseEffectVars: {
            collapseMarginInlineStart,
            collapseMarginInlineEnd,
            collapseMarginBlockStart,
            collapseMarginBlockEnd,
            
            collapseClipPath,
            
            collapseDisplay,
        },
    } = usesCollapseEffect({
        // The logical axis along which the sliding-crop is applied:
        orientation   : 'block',
        
        // The side from which the content is revealed when expanding, or exits when collapsing:
        flowDirection : 'start',
        
        // The CSS `display` property when fully collapsed:
        display       : 'none',
    });
    
    return style({
        // display  : 'grid', // Already defined in "Apply sliding mechanisms" below
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, transform):
        ...animationFeatureRule(),
        ...transformFeatureRule(),
        
        // Attach collapse state rules (tracks expand/collapse):
        ...collapseStateRule(),
        
        // Attach collapse effect rules (visual slide down/up the contents):
        ...collapseEffectRule(),
        
        // Define animations for expanding/collapsing:
        
        // 🔼 Expanding: smoothly interpolate expandFactor from 0 → 1
        ...vars({
            '--box-expanding': [
                ['0.3s', 'ease-out', 'both', 'effect-expanding'],
            ],
        }),
        ...keyframes('effect-expanding', {
            from : { [expandFactor]: 0 },
            // '90%': { [expandFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [expandFactor]: 1 },
        }),
        
        // 🔽 Collapsing: smoothly interpolate expandFactor from 1 → 0
        ...vars({
            '--box-collapsing': [
                ['0.3s', 'ease-out', 'both', 'effect-collapsing'],
            ],
        }),
        ...keyframes('effect-collapsing', {
            from : { [expandFactor]: 1 },
            // '10%': { [expandFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [expandFactor]: 0 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply transformation (from transform feature):
        transform,
        
        // Apply sliding mechanisms:
        marginInlineStart : collapseMarginInlineStart,
        marginInlineEnd   : collapseMarginInlineEnd,
        marginBlockStart  : collapseMarginBlockStart,
        marginBlockEnd    : collapseMarginBlockEnd,
        clipPath          : collapseClipPath,
        display           : switchOf(collapseDisplay, 'grid'), // Defaults to 'grid' when not fully collapsed
    });
};
```

#### 🧠 How CSS Collapse Effect Works

The [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state) package drives the `expandFactorCond` CSS variable, which represents how far the transition has progressed (from collapsed → fully expanded).  

`collapse-effect` consumes this factor and applies coordinated formulas that crop a portion of the component's area,
making the component **visually revealed or hidden** as it expand or collapse.

##### 1. **Negative Margin Formula**

- Gradually adjusts the logical margin (e.g. `margin-block-start` or `margin-inline-end`, depending on orientation and direction).  
- At `factor = 0`     → the element is fully shifted away from its original placement.  
- At `factor = 0.5`   → the element is partially shifted.  
- At `factor = 1`     → no margin adjustment (element sits in its normal placement).  
- Between `0` and `1` → smooth interpolation.  

##### 2. **Clip Path Formula**

- Crops the unwanted portion of the component that has been shifted outside the valid margin.  
- At `factor = 0`   → the entire component is clipped (fully hidden).  
- At `factor = 0.5` → only the shifted portion is clipped (partially visible).  
- At `factor = 1`   → no clipping applied (fully visible).  
- Between `0` and `1` → smooth interpolation.  
- Thanks to the `margin-box` parameter of the `clip-path` property, the clipping area is **relative to the component's margin box**.  
  This means the clip path formula can remain static, while the margin shift drives the dynamic cropping.  

##### 3. **Transform Formula**

- Adds an elastic overshoot effect when the factor exceeds 1.  
- At `factor ≤ 1` → no elastic effect is applied.  
- At `factor > 1` → a combination of `scale()` and `translate()` transformations is applied.  
- The scaling enlarges the collapsible element slightly, while the translation compensates so the revealing side remains visually anchored.  
- Together, these adjustments create the illusion of elasticity without breaking layout flow.  

##### ✨ Key Idea

- **Collapse-state** provides the *progress factor*.  
- **Collapse-effect** applies the *negative margin formula*, *clip path formula*, and *transform formula* based on that factor.  
- Together, they form a smooth **sliding-crop collapse animation** that reveals or hides the component surface predictably.  

#### ⚠️ Limitations

Because the collapse effect relies on `clip-path`, any visual styles rendered outside the border box
(such as box-shadows, outlines, or focus indicators) will also be cropped during the transition.
This only occurs while expanding or collapsing — once fully expanded or collapsed, the clipping is removed
and external effects are restored.

## 🧩 Exported Hooks

### `useCollapsibleSize(): CollapsibleSize<TElement>`

Supports for `usesCollapseEffect()` (the CSS styling effects) by supplying and continuously updating
the required sizing variables, injected into the component's inline style.
This ensures the collapse/expand styling effects work correctly.

Motivation:
- CSS alone cannot dynamically resolve `offsetInlineSize` / `offsetBlockSize`.
- This hook bridges that gap by measuring in JS (via `ResizeObserver`) and
  exposing the values as CSS variables.

#### 💡 Usage Example

```tsx
const { ref, collapsibleStyle } = useCollapsibleSize();

return (
    <div ref={ref} style={collapsibleStyle}
        // ...
    >
        Collapsible content...
    </div>
);
```

## 📚 Related Packages

- [`@reusable-ui/collapse-state`](https://www.npmjs.com/package/@reusable-ui/collapse-state) – Provides collapse state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/collapse-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/collapse-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/collapse-effect delivers predictable, reusable sliding-crop collapse animations for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
