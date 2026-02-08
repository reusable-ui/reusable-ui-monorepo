# @reusable-ui/disabled-transition 📦  

**disabled-transition** provides a **default system styling** for how components visually respond when they become disabled.
It offers styling authors a **common styling** for disabled transitions that de-emphasize the entire component surface, making the component **visually muted** when disabled.

The transitions are designed to feel natural to users:  
- Components smoothly fade and desaturate as they move into the disabled state.  
- The cursor switches to indicate non-interactivity (default: `not-allowed`).  
- Disabled components continue to block interaction with elements behind them (no `pointer-events: none`).  

By using `usesDisabledTransition()`, you can apply these transitions consistently across your components — fading and desaturating the entire component surface — with optional customization for opacity, saturation, and cursor.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Disabled State

`disabled-transition` cannot operate in isolation.  
It relies on the [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state) package to drive the `disableFactorCond` CSS variable, which determines how far the transition has progressed (from enabled → fully disabled).  

- `disabled-state` is responsible for tracking whether a component is disabled.  
- `disabled-transition` consumes that state and applies visual adjustments (opacity, saturation, cursor) accordingly.  
- Together, they provide a unified system: `disabled-state` supplies the factor, `disabled-transition` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `disabled-state`.  
- **Visual styling** lives in `disabled-transition`.  

## ✨ Features
✔ Smooth transition between enabled and disabled states  
✔ Customizable options for opacity, saturation, and cursor  
✔ Disabled components continue to block interaction behind them  
✔ Unified filter stack that composes seamlessly with other state transitions  
✔ Ready-to-use defaults for common scenarios, while remaining flexible for custom styling  

## 📦 Installation
Install **@reusable-ui/disabled-transition** via npm or yarn:

```sh
npm install @reusable-ui/disabled-transition
# or
yarn add @reusable-ui/disabled-transition
```

## 🧩 Exported CSS Hooks

### `usesDisabledTransition(options?: CssDisabledTransitionOptions): CssDisabledTransition`

Applies disabled-state transitions that de-emphasize the entire component surface,
making the component **visually muted** when disabled.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between enabled and disabled states by animating filter effect.
Preserves the current theme colors and variants while reducing emphasis
through opacity and/or desaturation.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';

// States:
import { usesDisabledState } from '@reusable-ui/disabled-state';

// Transitions:
import { usesDisabledTransition } from '@reusable-ui/disabled-transition';

// CSS-in-JS:
import { style, vars, keyframes, switchOf } from '@cssfn/core';

export const disableableBoxStyle = () => {
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
    
    // Enable/disable lifecycle:
    // - Exposes `disableFactor` (0 → 1) to represent transition progress
    // - Associates enabling/disabling animations to drive `disableFactor` smoothly
    const {
        disabledStateRule,
        disabledStateVars: { disableFactor },
    } = usesDisabledState({
        animationEnabling  : 'var(--box-enabling)',
        animationDisabling : 'var(--box-disabling)',
    });
    
    // Enable/disable visual transition:
    // - Consumes `disableFactor` from disabled state
    // - Gradually adjusts opacity and saturation based on transition progress
    // - Cursor switches discretely when disabled
    // - Allows customization of how the "disabled" appearance should look
    const {
        disabledTransitionRule,
        disabledTransitionVars: { disabledCursor },
    } = usesDisabledTransition({
        // Opacity:
        // Values between `0` and `1` → partially transparent
        // Values `= 1` → fully transparent
        // Values `= 0` → fully opaque (no fade)
        disabledOpacity  : 0.5, // half opacity when disabled
        
        // Saturation:
        // Values `< 1` → muted colors
        // Values `> 1` → more vivid colors (not typical for disabled)
        disabledSaturate : 0.5, // muted colors when disabled
        
        disabledCursor   : 'not-allowed', // restrictive cursor when disabled
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, filter):
        ...animationFeatureRule(),
        ...filterFeatureRule(),
        
        // Attach disabled state rules (tracks enabled/disabled):
        ...disabledStateRule(),
        
        // Attach disabled transition rules (visual muting when disabled):
        ...disabledTransitionRule(),
        
        // Define animations for enabling/disabling:
        
        // 🔼 Enabling: smoothly interpolate disableFactor from 1 → 0
        ...vars({
            '--box-enabling': [
                ['0.3s', 'ease-out', 'both', 'transition-enabling'],
            ],
        }),
        ...keyframes('transition-enabling', {
            from : { [disableFactor]: 1 },
            // '10%': { [disableFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [disableFactor]: 0 },
        }),
        
        // 🔽 Disabling: smoothly interpolate disableFactor from 0 → 1
        ...vars({
            '--box-disabling': [
                ['0.3s', 'ease-out', 'both', 'transition-disabling'],
            ],
        }),
        ...keyframes('transition-disabling', {
            from : { [disableFactor]: 0 },
            // '90%': { [disableFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [disableFactor]: 1 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply filters (from filter feature):
        filter,
        
        // Apply disabled cursor conditionally:
        cursor : switchOf(disabledCursor, 'pointer'), // Default to 'pointer' when not disabled
    });
};
```

#### 🧠 How CSS Disabled Transition Works

The [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state) package drives the `disableFactorCond` CSS variable, which represents how far the transition has progressed (from enabled → fully disabled).  

`disabled-transition` consumes this factor and applies coordinated formulas that de-emphasize the entire component surface,
making the component **visually muted** when disabled.

##### 1. **Filter Formula**

- Gradually adjusts **opacity and saturation** toward the configured "disabled" values, creating a muted visual effect.  
- At `factor = 0` (fully enabled), filters resolve to neutral values (no adjustment).  
- At `factor = 1` (fully disabled), filters resolve to the configured target values.  
- Between `0` and `1`, filters interpolate smoothly between neutral and target.  
- Opacity is clamped between `0` and `1`, while saturation may overshoot/undershoot if factor goes beyond the normal range.  

##### 2. **Cursor Switching**

- Cursor changes discretely (no gradual interpolation) when the component becomes disabled.  
- Default cursor is `not-allowed`, but this can be customized.  
- Disabled components continue to block interaction with elements behind them (no `pointer-events: none`).  

##### ✨ Key Idea

- **Disabled-state** provides the *progress factor*.  
- **Disabled-transition** applies *filter formulas* (opacity and saturation) and *cursor switching* based on that factor.  
- Together, they ensure components smoothly fade and mute when disabled, while remaining consistent with the current theme colors and variants.  

## 📚 Related Packages

- [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state) – Provides disabled state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/disabled-transition** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/disabled-transition**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/disabled-transition delivers predictable, reusable visual muting for disabled states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
