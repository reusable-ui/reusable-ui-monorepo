# @reusable-ui/focus-state 📦  

Adds focus/blur functionality to UI components, with transition animations and semantic styling hooks.  
Ideal for buttons, selects, inputs, and any interactive component requiring focus feedback.

# @reusable-ui/focus-state 📦  

**focus-state** is a reusable abstraction for managing focus feedback in UI components.  
It provides a lifecycle-aware way to animate transitions between *focused* and *blurred* states, exposing semantic variables that make styling and contributor reasoning clear.  

Instead of manually toggling classes or wiring one-off focus logic, focus-state automatically manages focus/blur classes, ensuring transitions are smooth, predictable, and easy to maintain. This makes it ideal for components that need expressive focus feedback — such as inputs, buttons, and selects — while still giving implementors the flexibility to override focus resolution with custom logic.  

With **focus-state**, you get:  
- Controlled focus/blur feedback  
- Transition animations tied to the focus lifecycle  
- Semantic styling variables (`isFocused`, `isBlurred`, etc.) for fine-grained control  

## ✨ Features
✔ Lifecycle-aware focus/blur animations based on current focus state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and accessibility systems  
✔ Built-in internal focus observer via `ref`, `handleFocus()`, `handleBlur()`, and `handleKeyDown()` — no need for external state unless desired  
✔ Optional `computedFocus` override for custom focus resolution logic in advanced use cases  
✔ Declarative `inputLikeFocus` flag for input-style focus ring behavior — mimics native `<input>` semantics even on mouse click  
✔ Deterministic disabled handling: always blurred when disabled, with clear contracts across auto, explicit, and external modes  

## 📦 Installation
Install **@reusable-ui/focus-state** via npm or yarn:

```sh
npm install @reusable-ui/focus-state
# or
yarn add @reusable-ui/focus-state
```

## 🧩 Exported Hooks

### `useFocusBehaviorState(props, options?)`

Resolves the focus state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled focus state, when `focused` is set to `true` or `false`.
- Supports diagnostic mode, when `focused` is set to `'auto'`, which derives the effective focus from `computedFocus`.
- Supports input-like styling behavior via `inputLikeFocus`, which forces a focus ring to appear when focused—mimicking native `<input>` semantics even on mouse click.

#### 💡 Usage Example

```tsx
import React, { FC, useState, useEffect } from 'react';
import {
    useFocusBehaviorState,
    FocusStateProps,
    FocusStateUpdateProps,
} from '@reusable-ui/focus-state';
import styles from './CustomButton.module.css';

export interface CustomButtonProps extends
    FocusStateProps,
    FocusStateUpdateProps // optional update reporting behavior
{}

// A button with custom focus logic.
export const CustomButton: FC<CustomButtonProps> = (props) => {
    const [internalComputedFocus, setInternalComputedFocus] = useState<boolean>(false);
    
    const {
        // Allows derived components to override the internal focus logic:
        computedFocus : externalComputedFocus,
        
        ...restProps,
    } = props;
    
    const isExternallyComputed = (externalComputedFocus !== undefined);
    const computedFocus        = isExternallyComputed ? externalComputedFocus : internalComputedFocus;
    
    useEffect(() => {
        if (isExternallyComputed) return;
        
        // Perform internal focus logic here:
        // setInternalComputedFocus(true);
    }, [isExternallyComputed]);
    
    const {
        focused,
        actualFocused,
        focusPhase,
        focusClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        // Use these ref and handlers to use built-in focus observer when `computedFocus` is not provided:
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } = useFocusBehaviorState({
        computedFocus,
        ...restProps,
    }, {
        defaultFocused    : 'auto',                   // Defaults to diagnostic mode.
        inputLikeFocus    : false,                    // Disables input-like focus styling behavior.
        animationPattern  : ['focusing', 'blurring'], // Matches animation names ending with 'focusing' or 'blurring'.
        animationBubbling : false,                    // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.button} ${focusClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {focused  && <p className={styles.focused}>Focused</p>}
            {!focused && <p className={styles.blurred}>Blurred</p>}
        </div>
    );
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between `focused` and `blurred` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from focused to blurred) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🔒 Disabled Behavior
- **Always blurred when disabled**: Components are forced into a blurred state whenever `disabled` is active, regardless of `focused` or `computedFocus` values.  
- **On re-enable**:
    - **Auto mode (internal focus observer)**: The component remains blurred until the user explicitly refocuses.  
    - **Explicit (`true`/`false`) or external (`computedFocus`) modes**: The component resumes following the provided value.  
- **Blur lock responsibility**:
    - Auto mode enforces the lock internally.  
    - In explicit/external modes, implementors must manage a persistent blur in their own state (for example, suppressing `true` until a new `focus` event is observed).  
- **Rationale**: Focus is a discrete state — past focus actions are ignored when toggling disabled, preventing phantom restoration and ensuring accessibility consistency.

### `useFocusStatePhaseEvents(props, focusPhase)`

Emits lifecycle events in response to focus/blur phase transitions.

This hook observes the resolved `focusPhase` from `useFocusBehaviorState()` and triggers the appropriate callbacks defined in `FocusStatePhaseEventProps`, such as:

- `onFocusingStart`
- `onFocusingEnd`
- `onBlurringStart`
- `onBlurringEnd`

### `useFocusState(props, options?)`

Resolves the current focused/blurred state for a fully controlled component.

This hook is intended for components that **consume** the resolved `focused` state and **forward** it to a base component.

Unlike `useFocusBehaviorState()`, which handles animation and lifecycle, `useFocusState()` performs a lightweight resolution of the effective focus value.

- No internal state or uncontrolled fallback.
- `'auto'` is treated as a declarative diagnostic mode.
- Ideal for components that **consume** the resolved `focused` state.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Focus Selectors:
    isFocusedSelector,           // Targets `.is-focused` class
    isBlurredSelector,           // Targets `.is-blurred` class
    isFocusingSelector,          // Targets `.is-focusing` class
    isBlurringSelector,          // Targets `.is-blurring` class
    isFocusingOrFocusedSelector, // Targets `.is-focusing` and `.is-focused` class
    isBlurringOrBlurredSelector, // Targets `.is-blurring` and `.is-blurred` class
    
    // Conditional styling helpers:
    ifFocused,           // Applies the given `styles` to elements in the fully focused state.
    ifBlurred,           // Applies the given `styles` to elements in the fully blurred state.
    ifFocusing,          // Applies the given `styles` to elements currently in the focusing transition.
    ifBlurring,          // Applies the given `styles` to elements currently in the blurring transition.
    ifFocusingOrFocused, // Applies the given `styles` to elements that are either focusing or fully focused.
    ifBlurringOrBlurred, // Applies the given `styles` to elements that are either blurring or fully blurred.
} from '@reusable-ui/focus-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifFocusingOrFocused({
        outline: '2px solid blue',
    }),
    ...ifBlurringOrBlurred({
        outline: 'none',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isFocusingOrFocusedSelector, { // equivalent to `ifFocusingOrFocused`
        boxShadow: '0 0 0 2px blue',
    }),
    ...rule(isBlurringOrBlurredSelector, { // equivalent to `ifBlurringOrBlurred`
        boxShadow: 'none',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesFocusState(options?: CssFocusStateOptions): CssFocusState`

Generates CSS rules that conditionally apply the focus/blur animations based on current focused state, and exposes focus/blur-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable            | Active When...                  | Purpose                     |
|---------------------|---------------------------------|-----------------------------|
| `animationFocusing` | `.is-focusing`                  | Triggers focusing animation |
| `animationBlurring` | `.is-blurring`                  | Triggers blurring animation |
| `isFocused`         | `.is-focused` or `.is-focusing` | Styling for focused state   |
| `isBlurred`         | `.is-blurred` or `.is-blurring` | Styling for blurred state   |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Focused/blurred state:
import { usesFocusState } from '@reusable-ui/focus-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const focusableBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        focusStateRule,
        focusStateVars: { isFocused, isBlurred },
    } = usesFocusState({
        animationFocusing : 'var(--box-focusing)',
        animationBlurring : 'var(--box-blurring)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply focused/blurred state rules:
        ...focusStateRule(),
        
        // Define focusing animation:
        ...vars({
            '--box-focusing': [
                ['0.3s', 'ease-out', 'both', 'outline-focusing'],
            ],
        }),
        ...keyframes('outline-focusing', {
            from: {
                outline: 'none',
            },
            to: {
                outline: '2px solid blue',
            },
        }),
        
        // Define blurring animation:
        ...vars({
            '--box-blurring': [
                ['0.3s', 'ease-out', 'both', 'outline-blurring'],
            ],
        }),
        ...keyframes('outline-blurring', {
            from: {
                outline: '2px solid blue',
            },
            to: {
                outline: 'none',
            },
        }),
        
        // Define final outline based on lifecycle state:
        ...fallback({
            '--outline-focused' : `${isFocused} 2px solid blue`,
        }),
        ...fallback({
            '--outline-blurred' : `${isBlurred} none`,
        }),
        outline: 'var(--outline-focused, var(--outline-blurred))',
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationFocusing` and `animationBlurring` variables are only defined during **focusing** and **blurring** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining focus/blur animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/focus-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/focus-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/focus-state brings expressive, adaptive focus styling to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
