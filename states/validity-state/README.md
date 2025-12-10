# @reusable-ui/validity-state 📦  

**validity-state** is a reusable abstraction for managing validation feedback in UI components.  
It provides a lifecycle-aware way to animate transitions between *valid*, *invalid*, and *unvalidated* states, exposing semantic variables that make styling and contributor reasoning clear.  

Instead of manually toggling classes, validity-state automatically manages validity classes, ensuring transitions are smooth, predictable, and easy to maintain. This makes it ideal for components that need expressive validation feedback — such as inputs, selections, and options — while still giving implementors the flexibility to define their own validation logic.  

With **validity-state**, you get:  
- Controlled validation feedback  
- Transition animations tied to validity lifecycle  
- Semantic styling variables (`isValid`, `isInvalid`, `isUnvalidated`, `wasValid`, etc.) for fine-grained control  

## ✨ Features
✔ Lifecycle-aware validation animations based on current validity state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ User definable `computedValidity` for validation logic delegation  
✔ Conditional CSS variables (`--va-was-*`) to determine previous validity state (useful for animating from prev validity state to new one)  
✔ Deterministic restricted handling: always unvalidated when restricted, with immediate recomputation when unrestricted  

## 📦 Installation
Install **@reusable-ui/validity-state** via npm or yarn:

```sh
npm install @reusable-ui/validity-state
# or
yarn add @reusable-ui/validity-state
```

## 🧩 Exported Hooks

### `useValidityBehaviorState(props, options?)`

Resolves the validity state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled validity state, when `validity` is set to `true`, `false`, or `null`.
- Supports diagnostic mode, when `validity` is set to `'auto'`, which derives the effective validity from `computedValidity`.

#### 💡 Usage Example

```tsx
import React, { FC, useState, useEffect } from 'react';
import {
    useValidityBehaviorState,
    ValidityStateProps,
    ValidityStateUpdateProps,
} from '@reusable-ui/validity-state';
import styles from './CustomInput.module.css';

export interface CustomInputProps extends
    ValidityStateProps,
    ValidityStateUpdateProps // optional update reporting behavior
{}

// An input with custom validation logic.
export const CustomInput: FC<CustomInputProps> = (props) => {
    const [internalComputedValidity, setInternalComputedValidity] = useState<boolean | null>(null);
    
    const {
        // Allows derived components to override the internal validation logic:
        computedValidity : externalComputedValidity,
        
        ...restProps,
    } = props;
    
    const isExternallyComputed = (externalComputedValidity !== undefined);
    const computedValidity     = isExternallyComputed ? externalComputedValidity : internalComputedValidity;
    
    useEffect(() => {
        if (isExternallyComputed) return;
        
        // Perform internal validation logic here:
        // setInternalComputedValidity(true);
    }, [isExternallyComputed]);
    
    const {
        validity,
        actualValidity,
        validityPhase,
        validityClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useValidityBehaviorState({
        computedValidity,
        ...restProps,
    }, {
        defaultValidity   : 'auto',                                         // Defaults to diagnostic mode.
        fallbackValidity  : null,                                           // Defaults to unresolved state when `validity` is 'auto' but no `computedValidity` is provided.
        animationPattern  : ['validating', 'invalidating', 'unvalidating'], // Matches animation names ending with 'validating', 'invalidating', or 'unvalidating'.
        animationBubbling : false,                                          // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.box} ${validityClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {(validity === true ) && <p className={styles.valid}>OK</p>}
            {(validity === false) && <p className={styles.valid}>Invalid input</p>}
            {(validity === null ) && <p className={styles.valid}>Seems OK</p>}
        </div>
    );
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between `valid`, `invalid`, and `unvalidated` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from valid to invalid) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🔒 Restricted Behavior (`disabled` or `readonly`)
- **Always unvalidated when restricted**: Components are forced into an unvalidated state whenever `disabled` or `readonly` is active, regardless of `validity` or `computedValidity` values.  
- **On unrestricted (re‑enabled or exit readonly)**:
    - **Auto mode (external validity recomputation)**: The component immediately re-evaluates based on the provided `computedValidity`.  
    - **Explicit (`true`/`false`/`null`) modes**: The component resumes following the provided value.  
- **Rationale**: Validity is a continuous state but component-specific — there is no built-in validity observer. Developers must supply `computedValidity` for correctness; otherwise, the component stays unvalidated.

### `useValidityStatePhaseEvents(props, validityPhase)`

Emits lifecycle events in response to validity phase transitions.

This hook observes the resolved `validityPhase` from `useValidityBehaviorState()` and triggers the appropriate callbacks defined in `ValidityStatePhaseEventProps`, such as:

- `onValidatingStart`
- `onValidatingEnd`
- `onInvalidatingStart`
- `onInvalidatingEnd`
- `onUnvalidatingStart`
- `onUnvalidatingEnd`

### `useValidityState(props, options?)`

Resolves the current validity state for a fully controlled component.

This hook is intended for components that **consume** the resolved `validity` state and **forward** it to a base component.

Unlike `useValidityBehaviorState()`, which handles animation and lifecycle, `useValidityState()` performs a lightweight resolution of the effective validity value.

- No internal state or uncontrolled fallback.
- `'auto'` is treated as a declarative diagnostic mode.
- Ideal for components that **consume** the resolved `validity` state.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Validity Selectors:
    isValidSelector,                     // Targets `.is-valid` class
    isInvalidSelector,                   // Targets `.is-invalid` class
    isUnvalidatedSelector,               // Targets `.is-unvalidated` class
    isValidatingSelector,                // Targets `.is-validating` class
    isInvalidatingSelector,              // Targets `.is-invalidating` class
    isUnvalidatingSelector,              // Targets `.is-unvalidating` class
    isValidatingOrValidSelector,         // Targets `.is-validating` and `.is-valid` class
    isInvalidatingOrInvalidSelector,     // Targets `.is-invalidating` and `.is-invalid` class
    isUnvalidatingOrUnvalidatedSelector, // Targets `.is-unvalidating` and `.is-unvalidated` class
    wasValidSelector,                    // Targets `.was-valid` class
    wasInvalidSelector,                  // Targets `.was-invalid` class
    wasUnvalidatedSelector,              // Targets `.was-unvalidated` class
    
    // Conditional styling helpers:
    ifValid,                     // Applies the given `styles` to elements in the fully valid state.
    ifInvalid,                   // Applies the given `styles` to elements in the fully invalid state.
    ifUnvalidated,               // Applies the given `styles` to elements in the fully unvalidated state.
    ifValidating,                // Applies the given `styles` to elements currently in the validating transition.
    ifInvalidating,              // Applies the given `styles` to elements currently in the invalidating transition.
    ifUnvalidating,              // Applies the given `styles` to elements currently in the unvalidating transition.
    ifValidatingOrValid,         // Applies the given `styles` to elements that are either validating or fully valid.
    ifInvalidatingOrInvalid,     // Applies the given `styles` to elements that are either invalidating or fully invalid.
    ifUnvalidatingOrUnvalidated, // Applies the given `styles` to elements that are either unvalidating or fully unvalidated.
    ifWasValid,                  // Applies the given `styles` to elements that were previously in the valid state.
    ifWasInvalid,                // Applies the given `styles` to elements that were previously in the invalid state.
    ifWasUnvalidated,            // Applies the given `styles` to elements that were previously in the unvalidated state.
} from '@reusable-ui/validity-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifValidatingOrValid({
        color: 'green',
    }),
    ...ifInvalidatingOrInvalid({
        color: 'red',
    }),
    ...ifUnvalidatingOrUnvalidated({
        color: 'blue',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isValidatingOrValidSelector, { // equivalent to `ifValidatingOrValid`
        backgroundColor: 'lightgreen',
    }),
    ...rule(isInvalidatingOrInvalidSelector, { // equivalent to `ifInvalidatingOrInvalid`
        backgroundColor: 'pink',
    }),
    ...rule(isUnvalidatingOrUnvalidatedSelector, { // equivalent to `ifUnvalidatingOrUnvalidated`
        backgroundColor: 'lightblue',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesValidityState(options?: CssValidityStateOptions): CssValidityState`

Generates CSS rules that conditionally apply the validation animations based on current validity state, and exposes validity-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable                | Active When...                          | Purpose                                                                                       |
|-------------------------|-----------------------------------------|-----------------------------------------------------------------------------------------------|
| `animationValidating`   | `.is-validating`                        | Runs the validating animation sequence                                                        |
| `animationInvalidating` | `.is-invalidating`                      | Runs the invalidating animation sequence                                                      |
| `animationUnvalidating` | `.is-unvalidating`                      | Runs the unvalidating animation sequence                                                      |
| `isValid`               | `.is-valid` or `.is-validating`         | Conditional variable for the valid state                                                      |
| `isInvalid`             | `.is-invalid` or `.is-invalidating`     | Conditional variable for the invalid state                                                    |
| `isUnvalidated`         | `.is-unvalidated` or `.is-unvalidating` | Conditional variable for the unvalidated state                                                |
| `wasValid`              | `.was-valid`                            | Conditional variable for the previously valid state                                           |
| `wasInvalid`            | `.was-invalid`                          | Conditional variable for the previously invalid state                                         |
| `wasUnvalidated`        | `.was-unvalidated`                      | Conditional variable for the previously unvalidated state                                     |
| `validityFactor`        | Always available (animatable)           | Normalized factor: -1 = invalid, 0 = unvalidated, +1 = valid, interpolates during transitions |
| `validityFactorCond`    | Not fully unvalidated                   | Conditional mirror of `validityFactor`, drops to `unset` when fully unvalidated               |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Validity state:
import { usesValidityState } from '@reusable-ui/validity-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const validatableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: validity lifecycle
    const {
        validityStateRule,
        validityStateVars: { isValid, isInvalid, isUnvalidated, wasValid, wasInvalid, wasUnvalidated, validityFactor },
    } = usesValidityState({
        animationValidating   : 'var(--box-validating)',
        animationInvalidating : 'var(--box-invalidating)',
        animationUnvalidating : 'var(--box-unvalidating)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply validity state rules:
        ...validityStateRule(),
        
        // Validating animation: interpolate validityFactor from 0/-1 to +1
        ...vars({
            '--box-validating': [
                ['0.3s', 'ease-out', 'both', 'transition-validating'],
            ],
        }),
        ...keyframes('transition-validating', {
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
            to   : {
                // Re‑declare the private resolver to prevent interpolation glitches:
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
        
        // Invalidating animation: interpolate validityFactor from 0/+1 to -1
        ...vars({
            '--box-invalidating': [
                ['0.3s', 'ease-out', 'both', 'transition-invalidating'],
            ],
        }),
        ...keyframes('transition-invalidating', {
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
            to   : {
                // Re‑declare the private resolver to prevent interpolation glitches:
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
        
        // Unvalidating animation: interpolate validityFactor from +1/-1 to 0
        ...vars({
            '--box-unvalidating': [
                ['0.3s', 'ease-out', 'both', 'transition-unvalidating'],
            ],
        }),
        ...keyframes('transition-unvalidating', {
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
            to   : {
                // Re‑declare the private resolver to prevent interpolation glitches:
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
        
        // Example usage:
        // - Background color interpolates with `validityFactor`.
        // - -1 → red, 0 → blue, +1 → green.
        // 
        // Red Weight: `(-1 * clamp(-1, var(--validityFactor), 0))`
        // - Peaks at -1
        // - Active range: -1 → 0
        // - At -1: clamp = -1 → red = 1
        // - At 0: clamp = 0 → red = 0
        // - At >0: clamp = 0 → red stays 0
        // - Fades from full red at -1 to none at 0, then off
        // 
        // Green Weight: `clamp(0.001, var(--validityFactor), 1)`
        // - Peaks at +1
        // - Active range: 0 → +1
        // - At 0: clamp = 0.001 → green ≈ 0 (epsilon contribution only)
        // - At +1: clamp = 1 → green = 1
        // - At <0: clamp = 0.001 → green ≈ 0 (epsilon contribution only)
        // - Fades in from near‑zero to full green as factor approaches +1
        // - The `0.001` is a small epsilon added to avoid producing
        //   `color-mix(... red 0%, green 0%)`, which the CSS Color 5 spec
        //   defines as invalid (all weights = 0%). This keeps the inner mix
        //   valid across browsers while remaining visually imperceptible.
        // 
        // Composite Red + Green Weight: `abs(var(--validityFactor))`
        // - Peaks at ±1
        // - Active range: -1 → +1
        // - At 0: abs = 0 → composite = 0
        // - In between: fades linearly
        // - Dominates when factor is strongly valid/invalid, fades at center
        // 
        // Blue Weight: `1 - abs(var(--validityFactor))`
        // - Peaks at 0
        // - At 0: abs = 0 → blue = 1
        // - At ±1: abs = 1 → blue = 0
        // - In between: fades linearly
        // - Dominates when unvalidated, fades toward valid/invalid extremes
        // 
        // Total Weight:
        // - Always sums to 1 across factor range [-1, 0, +1]
        // - Ensures proportional mixing of red, green, and blue
        // 
        // Implementation Notes:
        // - Use `oklch` color space for perceptual consistency
        // - Replace `abs(var(--value))` with `max(var(--value), calc(-1 * var(--value)))`
        //   for wider browser support
        backgroundColor:
`color-mix(in oklch,
    color-mix(in oklch,
        red
        calc((
            (-1 * clamp(-1, ${validityFactor}, 0))
        ) * 100%),
        
        green
        calc((
            clamp(0.001, ${validityFactor}, 1)
        ) * 100%)
    )
    calc((
        max(${validityFactor}, calc(-1 * ${validityFactor}))
    ) * 100%),
    
    blue
    calc((
        1 - max(${validityFactor}, calc(-1 * ${validityFactor}))
    ) * 100%)
)`,
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationValidating`, `animationInvalidating`, and `animationUnvalidating` variables are only defined during **validating**, **invalidating**, and **unvalidating** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining validity animations with other state-driven transitions.

##### 🧩 Why `Unvalidated` / `Unvalidating` Exists

The validity lifecycle has three distinct settled states:

- **Valid** → The component has been checked and passed validation.
- **Invalid** → The component has been checked and failed validation.
- **Unvalidated** → The component has not been checked at all. No validation logic has been applied.

This distinction is important:
- `Invalid` ≠ `Unvalidated`.  
  - *Invalid* means “known to be wrong.”  
  - *Unvalidated* means “unknown, unchecked.”  

During transitions:
- **Validating** → animation toward `Valid`.  
- **Invalidating** → animation toward `Invalid`.  
- **Unvalidating** → animation toward `Unvalidated` (resetting or clearing validation state).

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/validity-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/validity-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/validity-state brings expressive, adaptive validation styling to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
