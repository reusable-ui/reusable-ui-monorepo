# @reusable-ui/validity-state 📦  

Adds validation functionality to UI components, with transition animations and semantic styling hooks.  
Ideal for inputs, selections, options, and any editable component requiring validity feedback.

## ✨ Features
✔ Lifecycle-aware validation animations based on current validity state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ User definable `computedValidity` for validation logic delegation  
✔ Conditional CSS variables (`--va-was-*`) to determine previous validity state (useful for animating from prev validity state to new one)  
✔ Deterministic disabled handling: always unvalidated when disabled, with immediate recomputation on re-enable  

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

#### 🔒 Disabled Behavior
- **Always unvalidated when disabled**: Components are forced into an unvalidated state whenever `disabled` is active, regardless of `validity` or `computedValidity` values.  
- **On re-enable**:
    - **Auto mode (external validity recomputation)**: The component resumes validity based on the provided `computedValidity`.  
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

| Variable                | Active When...                          | Purpose                                  |
|-------------------------|-----------------------------------------|------------------------------------------|
| `animationValidating`   | `.is-validating`                        | Triggers validating animation            |
| `animationInvalidating` | `.is-invalidating`                      | Triggers invalidating animation          |
| `animationUnvalidating` | `.is-unvalidating`                      | Triggers unvalidating animation          |
| `isValid`               | `.is-valid` or `.is-validating`         | Styling for valid state                  |
| `isInvalid`             | `.is-invalid` or `.is-invalidating`     | Styling for invalid state                |
| `isUnvalidated`         | `.is-unvalidated` or `.is-unvalidating` | Styling for unvalidated state            |
| `wasValid`              | `.was-valid`                            | Styling for previously valid state       |
| `wasInvalid`            | `.was-invalid`                          | Styling for previously invalid state     |
| `wasUnvalidated`        | `.was-unvalidated`                      | Styling for previously unvalidated state |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Validity state:
import { usesValidityState } from '@reusable-ui/validity-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const validatableBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        validityStateRule,
        validityStateVars: { isValid, isInvalid, isUnvalidated, wasValid, wasInvalid, wasUnvalidated },
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
        
        // Define validating animation:
        ...vars({
            '--box-validating': [
                ['0.3s', 'ease-out', 'both', 'splash-validating'],
            ],
        }),
        ...keyframes('splash-validating', {
            from: {
                // Define origin background color based on previous validity state:
                '--was-invalid-backg-color': `${wasInvalid} red`,
                '--was-unvalidated-backg-color': `${wasUnvalidated} blue`,
                backgroundColor: 'var(--was-invalid-backg-color, var(--was-unvalidated-backg-color))',
            },
            to: {
                backgroundColor: green,
            },
        }),
        
        // Define invalidating animation:
        ...vars({
            '--box-invalidating': [
                ['0.3s', 'ease-out', 'both', 'splash-invalidating'],
            ],
        }),
        ...keyframes('splash-invalidating', {
            from: {
                // Define origin background color based on previous validity state:
                '--was-valid-backg-color': `${wasValid} green`,
                '--was-unvalidated-backg-color': `${wasUnvalidated} blue`,
                backgroundColor: 'var(--was-valid-backg-color, var(--was-unvalidated-backg-color))',
            },
            to: {
                backgroundColor: red,
            },
        }),
        
        // Define unvalidating animation:
        ...vars({
            '--box-unvalidating': [
                ['0.3s', 'ease-out', 'both', 'splash-unvalidating'],
            ],
        }),
        ...keyframes('splash-unvalidating', {
            from: {
                // Define origin background color based on previous validity state:
                '--was-valid-backg-color': `${wasValid} green`,
                '--was-invalid-backg-color': `${wasInvalid} red`,
                backgroundColor: 'var(--was-valid-backg-color, var(--was-invalid-backg-color))',
            },
            to: {
                backgroundColor: blue,
            },
        }),
        
        // Define final background color based on lifecycle state:
        ...fallback({
            '--backg-valid'       : `${isValid} green`,
        }),
        ...fallback({
            '--backg-invalid'     : `${isInvalid} red`,
        }),
        ...fallback({
            '--backg-unvalidated' : `${isUnvalidated} blue`,
        }),
        backgroundColor: 'var(--backg-valid, var(--backg-invalid, var(--backg-unvalidated)))',
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationValidating`, `animationInvalidating`, and `animationUnvalidating` variables are only defined during **validating**, **invalidating**, and **unvalidating** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining validity animations with other state-driven transitions.

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
