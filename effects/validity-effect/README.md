# @reusable-ui/validity-effect 📦  

**validity-effect** provides **default visual effects** for how components visually respond when the validity state changes.  
It offers styling authors a **common foundation** for validity effects that switch component's theme colors to **success** or **danger**,
making them **visually verified** when valid/invalid.

The effects are designed to feel natural to users:  
- Components smoothly transition to success/danger theme colors as they become valid/invalid.  
- When unvalidated, components retain their current theme, ensuring consistency with their original appearance.  

By using `usesValidityEffect()`, you can apply these effects consistently across your components — switching to the success/danger theme colors — with optional customization for valid and invalid theme names.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with Validity State

`validity-effect` cannot operate in isolation.  
It relies on the [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state) package to drive the `validityFactorCond` CSS variable, which represents how far the transition has progressed (from unvalidated → fully valid/invalid).  

- `validity-state` tracks whether a component is valid, invalid, or unvalidated.  
- `validity-effect` consumes that state and applies the success/danger theme transition.  
- Together, they form a unified system: `validity-state` supplies the factor, and `validity-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic** lives in `validity-state`.  
- **Visual effect** lives in `validity-effect`.  

## ✨ Features
✔ Smooth transition between valid, invalid, and unvalidated states  
✔ Customizable options for valid and invalid theme names  
✔ Unified theme switching across regular, outlined, and mild variants  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  

## 📦 Installation
Install **@reusable-ui/validity-effect** via npm or yarn:

```sh
npm install @reusable-ui/validity-effect
# or
yarn add @reusable-ui/validity-effect
```

## 🧩 Exported CSS Hooks

### `usesValidityEffect(options?: CssValidityEffectOptions): CssValidityEffect`

Applies validity-state effects that switch component's theme colors to **success** or **danger**,
making them **visually verified** when valid/invalid.

Exposes strongly typed CSS variables for transitional effects.

Smoothly transitions between valid, invalid, and unvalidated states by interpolating theme colors.
Uses the current theme colors as the baseline, ensuring harmony with the component's appearance.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

import { usesBackgroundFeature } from '@reusable-ui/background-feature';
// For simplicity, this example demonstrates only the background feature.
// Other color-specific features are also available:
// - foreground-feature (text colors)
// - decoration-feature (icons/graphics)
// - border-feature (border colors)

// States:
import { usesValidityState } from '@reusable-ui/validity-state';

// Effects:
import { usesValidityEffect } from '@reusable-ui/validity-effect';

// CSS-in-JS:
import { style, vars, keyframes, switchOf } from '@cssfn/core';

export const invalidableBoxStyle = () => {
    // Features:
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    const {
        backgroundFeatureRule,
        backgroundFeatureVars: { backg },
    } = usesBackgroundFeature();
    
    // States:
    
    // Validity lifecycle:
    // - Exposes `validityFactor` (-1 → 0 → +1) to represent transition progress
    // - Associates validating/invalidating/unvalidating animations to drive `validityFactor` smoothly
    const {
        validityStateRule,
        validityStateVars: { wasValid, wasInvalid, validityFactor },
    } = usesValidityState({
        animationValidating   : 'var(--box-validating)',
        animationInvalidating : 'var(--box-invalidating)',
        animationUnvalidating : 'var(--box-unvalidating)',
    });
    
    // Validity visual effect:
    // - Consumes `validityFactor` from validity state
    // - Gradually switches theme colors to success/danger based on transition progress
    // - Allows customization of theme names for valid/invalid states
    const {
        validityEffectRule,
    } = usesValidityEffect({
        // Theme for valid state:
        validTheme   : 'success',
        
        // Theme for invalid state:
        invalidTheme : 'danger',
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation, background):
        ...animationFeatureRule(),
        ...backgroundFeatureRule(),
        
        // Attach validity state rules (tracks valid/invalid/unvalidated):
        ...validityStateRule(),
        
        // Attach validity effect rules (visual success/danger theme change when valid/invalid):
        ...validityEffectRule(),
        
        // Define animations for validating/invalidating/unvalidating:
        
        // 🔼 Validating: smoothly interpolate validityFactor from 0/-1 → +1
        ...vars({
            '--box-validating': [
                ['0.3s', 'ease-out', 'both', 'effect-validating'],
            ],
        }),
        ...keyframes('effect-validating', {
            from : {
                // Previous validity state could be unvalidated (0) or invalid (-1).
                
                // Private intermediate resolver for previous invalid state:
                '--_wasInvalidFactor': [[
                    // Only applies if previously invalid:
                    wasInvalid,
                    
                    // The fully invalid value:
                    -1,
                ]],
                
                // Resolve the origin of the transition:
                // - Rendered as: `var(--_wasInvalidFactor, 0)`
                [validityFactor]: switchOf(
                    'var(--_wasInvalidFactor)', // fallback to previous invalid
                    0,                          // otherwise assume unvalidated
                ),
            },
            // '90%': { [validityFactor]: +1.2 }, // Optional overshoot for a "bump" effect
            to   : {
                // Re-declare the private resolver to prevent interpolation glitches:
                '--_wasInvalidFactor': [[
                    // Only applies if previously invalid:
                    wasInvalid,
                    
                    // The fully invalid value:
                    -1,
                ]],
                
                // Transition target: valid state:
                [validityFactor]: 1,
            },
        }),
        
        // 🔼 Invalidating: smoothly interpolate validityFactor from 0/+1 → -1
        ...vars({
            '--box-invalidating': [
                ['0.3s', 'ease-out', 'both', 'effect-invalidating'],
            ],
        }),
        ...keyframes('effect-invalidating', {
            from : {
                // Previous validity state could be unvalidated (0) or valid (+1).
                
                // Private intermediate resolver for previous valid state:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Resolve the origin of the transition:
                // - Rendered as: `var(--_wasValidFactor, 0)`
                [validityFactor]: switchOf(
                    'var(--_wasValidFactor)', // fallback to previous valid
                    0,                        // otherwise assume unvalidated
                ),
            },
            // '90%': { [validityFactor]: -1.2 }, // Optional overshoot for a "bump" effect
            to   : {
                // Re-declare the private resolver to prevent interpolation glitches:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Transition target: invalid state:
                [validityFactor]: -1,
            },
        }),
        
        // 🔽 Unvalidating: smoothly interpolate validityFactor from ±1 → 0
        ...vars({
            '--box-unvalidating': [
                ['0.3s', 'ease-out', 'both', 'effect-unvalidating'],
            ],
        }),
        ...keyframes('effect-unvalidating', {
            from : {
                // Previous validity state could be valid (+1) or invalid (-1).
                
                // Private intermediate resolver for previous valid state:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Resolve the origin of the transition:
                // - Rendered as: `var(--_wasValidFactor, -1)`
                [validityFactor]: switchOf(
                    'var(--_wasValidFactor)', // fallback to previous valid
                    -1,                       // otherwise assume invalid
                ),
            },
            // '10%': { [validityFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : {
                // Re-declare the private resolver to prevent interpolation glitches:
                '--_wasValidFactor': [[
                    // Only applies if previously valid:
                    wasValid,
                    
                    // The fully valid value:
                    1,
                ]],
                
                // Transition target: unvalidated state:
                [validityFactor]: 0,
            },
        }),
        
        // Example usage of composed variables:
        
        // Apply background layers (from background feature):
        background: backg, // background color + layered backgrounds
        // or use `backgroundColor: backgColor` if you only need the color
        
        // Other color-specific features follow the same usage pattern:
        // color: foregColor, // text color (foreground feature)
        // ...children('.icon', {
        //     backgroundColor: decorColor, // icon/graphic color (decoration feature)
        //     maskImage: 'url("/res/thumb-up.svg")',
        // }),
        // borderColor: borderColor, // border color (border feature)
        
        // Apply animations (from animation feature):
        animation,
    });
};
```

#### 🧠 How CSS Validity Effect Works

The [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state) package drives the `validityFactorCond` CSS variable, which represents how far the transition has progressed (from unvalidated → fully valid/invalid).  

`validity-effect` consumes this factor and applies a theme color interpolation formula that temporarily adjusts the component's theme colors,
making it **visually verified** when valid/invalid.

##### **Theme Color Interpolation Formula**

- Gradually adjusts **current theme colors** toward the appropriate success/danger theme colors.  
- At `factor = 0`  → current theme colors remain unchanged (unvalidated).  
- At `factor = +1` → theme colors switch to **success**.  
- At `factor = -1` → theme colors switch to **danger**.  
- Between `0` and `±1` → smooth interpolation between current theme and success/danger colors.  

##### ✨ Key Idea

- **Validity-state** provides the *progress factor*.  
- **Validity-effect** applies the *theme color interpolation formula* based on that factor.  
- Together, they ensure components smoothly animate theme changes that reflect validity feedback.  

## 📚 Related Packages

- [`@reusable-ui/validity-state`](https://www.npmjs.com/package/@reusable-ui/validity-state) – Provides validity state tracking for components.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/validity-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/validity-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/validity-effect delivers predictable, reusable validity feedback for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
