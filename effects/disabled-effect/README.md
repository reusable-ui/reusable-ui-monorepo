# @reusable-ui/disabled-effect 📦  

**disabled-effect** provides **default visual effects** for how components visually respond when the disabled state changes.  
It offers styling authors a **common foundation** for disabled effects that de-emphasize the entire component surface,
making components **visually muted** when disabled.

The effects are designed to feel natural to users:  
- Components smoothly fade and desaturate as they become disabled.  
- The cursor switches to indicate non-interactivity (default: `not-allowed`).  
- Disabled components continue to block interaction with elements behind them (no `pointer-events: none`).  

By using `usesDisabledEffect()`, you can apply these effects consistently across your components — fading and desaturating the entire component surface — with optional customization for opacity, saturation, and cursor.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Disabled State

`disabled-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state) package to drive the `disableFactorCond` CSS variable, which reflects the progression of the disabled state (from enabled → fully disabled).  

- `disabled-state` tracks whether a component is disabled.  
- `disabled-effect` consumes that state and applies visual adjustments (opacity, saturation, cursor).  
- Together, they form a unified system: `disabled-state` supplies the factor, and `disabled-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `disabled-state`.  
- **Visual effect** lives in `disabled-effect`.  

## ✨ Features
✔ Smooth transition between enabled and disabled states  
✔ Customizable options for opacity, saturation, and cursor  
✔ Disabled components continue to block interaction behind them  
✔ Unified filter stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  

## 📦 Installation
Install **@reusable-ui/disabled-effect** via npm or yarn:

```sh
npm install @reusable-ui/disabled-effect
# or
yarn add @reusable-ui/disabled-effect
```

## 🧩 Exported CSS Hooks

### `usesDisabledEffect(options?: CssDisabledEffectOptions): CssDisabledEffect`

Applies disabled-state effects that de-emphasize the entire component surface,
making components **visually muted** when disabled.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between enabled and disabled states by animating filter effects.
Preserves the current theme colors and variants while reducing emphasis
through opacity and/or desaturation.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';
import { usesFilterFeature } from '@reusable-ui/filter-feature';

// States:
import { usesDisabledState } from '@reusable-ui/disabled-state';

// Effects:
import { usesDisabledEffect } from '@reusable-ui/disabled-effect';

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
    
    // Enable/disable visual effect:
    // - Consumes `disableFactor` from disabled state
    // - Gradually adjusts opacity and saturation based on transition progress
    // - Cursor switches discretely when disabled
    // - Allows customization of how the "disabled" appearance should look
    const {
        disabledEffectRule,
        disabledEffectVars: { disabledCursor },
    } = usesDisabledEffect({
        // Opacity:
        // Values between `0` and `1` → partially transparent
        // Values `= 0` → fully transparent
        // Values `= 1` → fully opaque (no fade)
        opacity  : 0.5, // half opacity when disabled
        
        // Saturation:
        // Values `< 1` → muted colors
        // Values `> 1` → more vivid colors (not typical for disabled)
        saturate : 0.5, // muted colors when disabled
        
        cursor   : 'not-allowed', // restrictive cursor when disabled
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
        
        // Attach disabled effect rules (visual muting when disabled):
        ...disabledEffectRule(),
        
        // Define animations for enabling/disabling:
        
        // 🔽 Enabling: smoothly interpolate disableFactor from 1 → 0
        ...vars({
            '--box-enabling': [
                ['0.3s', 'ease-out', 'both', 'effect-enabling'],
            ],
        }),
        ...keyframes('effect-enabling', {
            from : { [disableFactor]: 1 },
            // '10%': { [disableFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [disableFactor]: 0 },
        }),
        
        // 🔼 Disabling: smoothly interpolate disableFactor from 0 → 1
        ...vars({
            '--box-disabling': [
                ['0.3s', 'ease-out', 'both', 'effect-disabling'],
            ],
        }),
        ...keyframes('effect-disabling', {
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

#### 🧠 How CSS Disabled Effect Works

The [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state) package drives the `disableFactorCond` CSS variable, which reflects the progression of the disabled state (from enabled → fully disabled).  

`disabled-effect` consumes this factor and applies coordinated formulas that de-emphasize the entire component surface,
making components **visually muted** when disabled.

##### 1. **Filter Formula**

- Gradually adjusts **opacity and saturation** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment).  
- At `factor = 1` → configured target values.  
- Between `0` and `1` → smooth interpolation.  

##### 2. **Cursor Switching**

- Cursor changes discretely when disabled.  
- Default cursor is `not-allowed`, but this can be customized.  
- Disabled components continue to block interaction with elements behind them (no `pointer-events: none`).  

##### ✨ Key Idea

- **Disabled-state** provides the *progress factor*.  
- **Disabled-effect** applies *filter formulas* (opacity and saturation) and *cursor switching* based on that factor.  
- Together, they ensure components smoothly fade and desaturate when disabled.  

## 📚 Related Packages

- [`@reusable-ui/disabled-state`](https://www.npmjs.com/package/@reusable-ui/disabled-state) – Provides disabled state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/disabled-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/disabled-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/disabled-effect delivers predictable, reusable visual muting for disabled states in your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
