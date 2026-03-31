# @reusable-ui/filter-effect 📦  

**filter-effect** provides a **foundational layer of visual effects** for how components visually respond as their state changes.  
It offers styling authors a **common foundation** for state-driven effects that adjust the component's visual presentation,
making components **visually adapt their appearance** in response to state changes.

The effects are designed to feel natural to users:  
- Components smoothly adjust their look as they move between states (disabled, focus, hover, active, pressed, etc.).  
- Visual cues remain consistent across components, ensuring a predictable and cohesive user experience.  

By using `composeFilterEffect()`, you can apply these effects consistently across your components — making them appear clearer and more distinct — with optional customization for color effects.  
Authors who need more control can override or extend the defaults, but for most everyday cases this package provides a clean, reliable foundation.

## 🔗 Integration with State Logic

`filter-effect` cannot operate in isolation.  
It relies on a **state logic provider** to drive the `activeFactor` CSS variable, which reflects the progression of the active state (from inactive → fully active).  

- **State logic provider** tracks whether a component is in a given condition (disabled, focus, hover, active, pressed, etc.).  
- `filter-effect` consumes that state and applies visual adjustments (opacity, brightness, contrast, saturation, etc.).  
- Together, they form a unified system: the **state logic provider** supplies the factor, and `filter-effect` renders the visual effect.  

This separation keeps responsibilities clear:
- **State logic provider** lives in the state provider (such as `disabled-state`, `focus-state`, `hover-state`, etc.).  
- **Visual effect** lives in `filter-effect`.  

## ✨ Features
✔ Smooth transitions across component states changes  
✔ Customizable options for filter-based visual adjustments  
✔ Adaptive brightness that automatically adjusts for light and dark mode  
✔ Unified filter stack that composes seamlessly with other state-driven effects  
✔ Ready-to-use defaults for common scenarios, while remaining extensible for custom styling  
✔ Supports **reverse intent**:  
   - Positive configurations → effect gradually **applies** as the component becomes active  
   - Negative configurations → effect gradually **withdraws** as the component becomes active (fully un-applied at full active state)  

## 📦 Installation
Install **@reusable-ui/filter-effect** via npm or yarn:

```sh
npm install @reusable-ui/filter-effect
# or
yarn add @reusable-ui/filter-effect
```

## 🧩 Exported CSS Hooks

### `composeFilterEffect(activeFactor: CssCustomRef, options?: CssFilterEffectOptions): CssFilterEffectFormula`

Composes filter-based effects that adjust the component's visual presentation,
making components **visually adapt their appearance** in response to state changes.

The transitions are controlled by the provided `activeFactor`.
Interpolates filter values based on this factor, but does not perform any animation itself.
The state logic provider (such as `disabled-state`, `focus-state`, `hover-state`, etc.)
is responsible for driving `activeFactor` through its own animation or transition logic
to achieve smooth visual transitions between states.

Behavior:
- No filter options specified → always invalid (`unset`).
- At factor = 0 → all filters = neutral (no adjustment).
- At factor = 1 → filters = configured target values.
- Between 0 and 1 → smooth interpolation between neutral and target.
- Saturation, brightness, and contrast may overshoot/undershoot if factor goes beyond [0,1].
- Each filter formula is safeguarded by clamping mechanisms to avoid invalid ranges.

#### 💡 Usage Example

```ts
// Features:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// States:
import { usesActiveState } from '@reusable-ui/active-state';

// Effects:
import { composeFilterEffect } from '@reusable-ui/filter-effect';

// CSS-in-JS:
import { style, vars, keyframes } from '@cssfn/core';

export const activatableBoxStyle = () => {
    // Features:
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // States:
    
    // Active/inactive lifecycle:
    // - Exposes `activeFactor` (0 → 1) to represent transition progress
    // - Associates activating/deactivating animations to drive `activeFactor` smoothly
    const {
        activeStateRule,
        activeStateVars: { activeFactor },
    } = usesActiveState({
        animationActivating   : 'var(--box-activating)',
        animationDeactivating : 'var(--box-deactivating)',
    });
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Attach feature rules (animation):
        ...animationFeatureRule(),
        
        // Attach active state rules (tracks active/inactive):
        ...activeStateRule(),
        
        // Define animations for activating/deactivating:
        
        // 🔼 Activating: smoothly interpolate activeFactor from 0 → 1
        ...vars({
            '--box-activating': [
                ['0.3s', 'ease-out', 'both', 'effect-activating'],
            ],
        }),
        ...keyframes('effect-activating', {
            from : { [activeFactor]: 0 },
            // '90%': { [activeFactor]: 1.2 }, // Optional overshoot for a "bump" effect
            to   : { [activeFactor]: 1 },
        }),
        
        // 🔽 Deactivating: smoothly interpolate activeFactor from 1 → 0
        ...vars({
            '--box-deactivating': [
                ['0.3s', 'ease-out', 'both', 'effect-deactivating'],
            ],
        }),
        ...keyframes('effect-deactivating', {
            from : { [activeFactor]: 1 },
            // '10%': { [activeFactor]: -0.2 }, // Optional undershoot for a "bounce back" effect
            to   : { [activeFactor]: 0 },
        }),
        
        // Example usage of composed variables:
        
        // Apply animations (from animation feature):
        animation,
        
        // Apply filter-based effects driven by the provided state factor:
        filter: composeFilterEffect(
            // Driver for inactive ⇄ active state:
            activeFactor,
            {
                // Enables reverse intent:
                // - Negative values target the "inactive" state instead of "active".
                enablesReverseIntent : true,
                
                // Opacity:
                // Values `= 0` → fully transparent.
                // Values `= 1` → preserves the original opacity (no fade).
                // Values between `0` and `1` → semi transparent.
                // Negative sign reverses intent (targets "inactive" state instead of "active").
                opacity              : -0.5, // semi transparent when "inactive" (requires reverse intent)
                
                // Brightness:
                // Values `< 1` → darken  in light mode, lighten in dark mode
                // Values `> 1` → lighten in light mode, darken  in dark mode
                brightness           : 0.85, // subtle darkening in light mode, subtle lightening in dark mode
                
                // Contrast:
                // Values `< 1` → softer contrast
                // Values `> 1` → stronger contrast
                contrast             : 1.1,  // slightly stronger contrast when active
                
                // Saturation:
                // Values `< 1` → muted colors
                // Values `> 1` → more vivid colors
                saturate             : 1.2,  // slightly more vibrant colors when active
            }
        ),
    });
};
```

#### 🧠 How CSS Filter Effect Works

The **state logic provider** drives the `activeFactor` CSS variable, which reflects the progression of the active state (from inactive → fully active).  

`filter-effect` consumes this factor and applies a filter formula that adjusts the component's visual presentation,
making components **visually adapt their appearance** in response to state changes.

##### **Filter Formula**

- Gradually adjusts **brightness, contrast, and saturation** toward the configured target values.  
- At `factor = 0` → neutral values (no adjustment).  
- At `factor = 1` → configured target values.  
- Between `0` and `1` → smooth interpolation.  

##### ✨ Key Idea

- **State logic provider** provides the *progress factor*.  
- **Filter-effect** applies the *filter formula* based on that factor.  
- Together, they ensure components smoothly adapt their appearance as the state changes.  

## 📚 Related Packages

- [`@reusable-ui/disabled-effect`](https://www.npmjs.com/package/@reusable-ui/disabled-effect) – Provides default visual effects for components when their disabled state changes.  
- [`@reusable-ui/focus-effect`](https://www.npmjs.com/package/@reusable-ui/focus-effect) – Provides default visual effects for components when their focus state changes.  
- [`@reusable-ui/hover-effect`](https://www.npmjs.com/package/@reusable-ui/hover-effect) – Provides default visual effects for components when their hover state changes.  
- [`@reusable-ui/press-effect`](https://www.npmjs.com/package/@reusable-ui/press-effect) – Provides default visual effects for components when their press state changes.  
- [`@reusable-ui/active-effect`](https://www.npmjs.com/package/@reusable-ui/active-effect) – Provides default visual effects for components when their active state changes.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/filter-effect** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/filter-effect**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/filter-effect delivers predictable, reusable state-driven effects for your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
