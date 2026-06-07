# @reusable-ui/sort-effect 📦  

**sort-effect** provides **default visual effects** for how sortable components visually respond whenever a sorting action occurs.  
It offers styling authors a **common foundation** for sorting effects that animate items from their previous positions into their new sorted order,
making components **visually rearranged** during sorting.

The effects are designed to feel natural to users:  
- Component items smoothly transition from their original unsorted positions into their new sorted order as they are being sorted.  

By using `usingSortEffect()`, you can apply these effects consistently across your components — with optional customization for sorting effects.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Sort State

`sort-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/sort-state`](https://www.npmjs.com/package/@reusable-ui/sort-state) package to drive the `sortFactorCond` CSS variable, which reflects the sorting transition progress (from unsorted → fully sorted).  

- `sort-state` tracks whether a component is currently being sorted.  
- `sort-effect` consumes that state and applies visual transformation (translate) to animate items into place.  
- Together, they form a unified system: `sort-state` supplies the factor, and `sort-effect` renders the visual motion.  

This separation keeps responsibilities clear:
- **State logic** lives in `sort-state`.  
- **Visual effect** lives in `sort-effect`.  

## ✨ Features
✔ Smooth transition between unsorted and sorted states  
✔ Customizable options for sorting effects  
✔ Unified transform stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  
✔ Provides clear sorting feedback, reinforcing the sense of rearranging motion  

## 📦 Installation
Install **@reusable-ui/sort-effect** via npm or yarn:

```sh
npm install @reusable-ui/sort-effect
# or
yarn add @reusable-ui/sort-effect
```

## 🧩 Exported CSS Hooks

### `usingSortEffect(options?: CssSortEffectOptions): CssSortEffect`

Applies sorting effects that animate items from their previous positions into their new sorted order,
making components **visually rearranged** during sorting.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between unsorted and sorted states
by gradually moving each item from its original unsorted position toward its new sorted order.

⚠️ Important Usage Note:
- Apply `usingSortEffect()` to each **sortable item element** (the individual items),
  **not** to the parent sortable container.
- Applying the effect at the item level ensures that the correct per-item sorting movements are applied.
- Make sure to also apply `...transformFeatureRule()` and the `transform` variable
  from `@reusable-ui/transform-feature` to the sortable items,
  so that the rearrangement transform works correctly.

#### 💡 Usage Example

```ts
// Features:
import { usingAnimationFeature } from '@reusable-ui/animation-feature';
import { usingTransformFeature } from '@reusable-ui/transform-feature';

// States:
import { usingSortState } from '@reusable-ui/sort-state';

// Effects:
import { usingSortEffect } from '@reusable-ui/sort-effect';

// CSS-in-JS:
import { style, vars, keyframes, children } from '@cssfn/core';

export const sortableListStyle = () => {
    // Features:
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usingAnimationFeature();
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usingTransformFeature();
    
    // States:
    
    // Sorting lifecycle:
    // - Exposes `sortFactor` (1 → 0) to represent sorting transition progress
    // - Associates sorting animation to drive `sortFactor` smoothly
    const {
        sortStateRule,
        sortStateVars: { sortFactor },
    } = usingSortState({
        animationSorting : 'var(--list-sorting)',
    });
    
    // Sorting visual effect:
    // - Consumes `sortFactor` from sort state
    // - Gradually translates the component items from their previous positions into their new sorted order
    // - Allows additional customization for sorting effects
    const {
        sortEffectRule,
    } = usingSortEffect({
        // Currently no options are available, reserved for future extension.
    });
    
    return style({
        display  : 'grid',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation):
        ...animationFeatureRule(),
        
        // Attach sorting state rules (tracks items movement during sorting):
        ...sortStateRule(),
        
        // Sorting animation: interpolate sortFactor from 1 → 0:
        ...vars({
            '--list-sorting': [
                ['0.3s', 'ease-out', 'both', 'sorting'],
            ],
        }),
        ...keyframes('sorting', {
            from : { [sortFactor]: 1 }, // Start fully unsorted.
            // '90%': { [sortFactor]: -0.2 }, // Optional overshoot for an "elastic" effect
            to   : { [sortFactor]: 0 }, // End fully sorted.
        }),
        
        // Example usage:
        
        // Apply animations (from animation feature):
        animation,
        
        ...children('.item', { // The individual items.
            display  : 'grid',
            // Base styling for each item goes here.
            
            // Attach feature rules (transform):
            ...transformFeatureRule(),
            
            // Attach sorting effect rules (visual items rearrangement during sorting):
            ...sortEffectRule(),
            
            // Apply transformation (from transform feature):
            transform,
        }),
    });
};
```

#### 🧠 How CSS Sort Effect Works

The [`@reusable-ui/sort-state`](https://www.npmjs.com/package/@reusable-ui/sort-state) package drives the `sortFactorCond` CSS variable, which reflects the sorting transition progress (from unsorted → fully sorted), and provides unsorted offsets to recreate the illusion of the original unsorted orders.  

`sort-effect` consumes this factor and applies a transform formula that animates items from their previous positions into their new sorted order,
making components **visually rearranged** during sorting.

##### **Transform Formula**

After a sorting action occurs, actually the items are already placed in their new sorted positions.  
Before the browser paints, the effect temporarily translates them back to their unsorted positions, creating an unsorted illusion.  
Then, those offsets are gradually reduced to zero, so the items glide smoothly into their new places.

- At `factor = 1` → full unsorted illusion (items offset back to their original unsorted positions).  
- At `factor = 0` → fully sorted baseline (items settled into their new sorted positions).  
- Between `1` and `0` → smooth interpolation between unsorted and sorted.  

##### ✨ Key Idea

- **Sort-state** provides the *progress factor* and *unsorted offsets*.  
- **Sort-effect** applies the *transform* formula based on that factor.  
- Together, they ensure component items smoothly transition from their original unsorted positions into their new sorted order.  

## 📚 Related Packages

- [`@reusable-ui/sort-state`](https://www.npmjs.com/package/@reusable-ui/sort-state) – Provides sorting transition tracking for sortable components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/sort-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/sort-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/sort-effect delivers predictable, reusable visual rearranging feedback for sorting transitions in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
