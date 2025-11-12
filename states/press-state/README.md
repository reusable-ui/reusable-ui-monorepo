# @reusable-ui/press-state 📦  

Adds press/release functionality to UI components, with transition animations and semantic styling hooks.  
Ideal for buttons, selects, menuItems, and any interactive component requiring press feedback.

## ✨ Features
✔ Lifecycle-aware press/release animations based on current press state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and accessibility systems  
✔ Built-in internal press observer via `ref`, `handlePointerDown()`, `handlePointerUp()`, and `handlePointerCancel()` — no need for external state unless desired  
✔ Optional `computedPress` override for custom press resolution logic in advanced use cases  
✔ Built-in keyboard observer for `[Space]` and `[Enter]` keys — simulates press and click behavior with lifecycle consistency  
✔ Built-in pointer observer for for mouse, touch, and pen devices  

## 📦 Installation
Install **@reusable-ui/press-state** via npm or yarn:

```sh
npm install @reusable-ui/press-state
# or
yarn add @reusable-ui/press-state
```

## 🧩 Exported Hooks

### `usePressBehaviorState(props, options?)`

Resolves the press state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled press state, when `pressed` is set to `true` or `false`.
- Supports diagnostic mode, when `pressed` is set to `'auto'`, which derives the effective press from `computedPress`.

#### 💡 Usage Example

```tsx
import React, { FC, useState, useEffect } from 'react';
import {
    usePressBehaviorState,
    PressStateProps,
    PressStateUpdateProps,
} from '@reusable-ui/press-state';
import styles from './CustomButton.module.css';

export interface CustomButtonProps extends
    PressStateProps,
    PressStateUpdateProps // optional update reporting behavior
{}

// A button with custom press logic.
export const CustomButton: FC<CustomButtonProps> = (props) => {
    const [internalComputedPress, setInternalComputedPress] = useState<boolean>(false);
    
    const {
        // Allows derived components to override the internal press logic:
        computedPress : externalComputedPress,
        
        ...restProps,
    } = props;
    
    const isExternallyComputed = (externalComputedPress !== undefined);
    const computedPress        = isExternallyComputed ? externalComputedPress : internalComputedPress;
    
    useEffect(() => {
        if (isExternallyComputed) return;
        
        // Perform internal press logic here:
        // setInternalComputedPress(true);
    }, [isExternallyComputed]);
    
    const {
        pressed,
        actualPressed,
        pressPhase,
        pressClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        // Use these ref and handlers to use built-in press observer when `computedPress` is not provided:
        ref,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } = usePressBehaviorState({
        computedPress,
        ...restProps,
    }, {
        defaultPressed    : 'auto',                    // Defaults to diagnostic mode.
        animationPattern  : ['pressing', 'releasing'], // Matches animation names ending with 'pressing' or 'releasing'.
        animationBubbling : false,                     // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.button} ${pressClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {pressed  && <p className={styles.pressed}>Pressed</p>}
            {!pressed && <p className={styles.released}>Released</p>}
        </div>
    );
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between `pressed` and `released` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from pressed to released) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### Pointer Behavior

The hook includes a built-in pointer observer that supports mouse, touch, and pen input:

- **Mouse**: Press state activates only when the pressed button matches the `pressButtons` filter (`0` for left, `1` for middle, `2` for right). You can pass a single value, an array, or `null` to disable mouse-based press activation.
- **Touch**: Press state activates only when the number of active touches matches the `pressFingers` value exactly. Set `pressFingers = 1` for single-finger activation, or `0` to disable touch-based press.
- **Pen**: Press state activates only when stylus pressure meets or exceeds the `pressPressure` threshold. Set `pressPressure = -1` to disable stylus-based press activation entirely.

This behavior ensures:

- Press animations are lifecycle-aware and never interrupted mid-flight.
- Press state is only activated by deliberate, device-specific interactions.
- Multi-touch and stylus input are lifecycle-aware and filtered for precision.

#### Keyboard Behavior

The hook includes a built-in keyboard observer that mirrors native button semantics:

- By default, `[Space]` triggers a press animation and synthetic click **on key release**.
- `[Enter]` triggers a synthetic click **immediately on key press**, without activating press animation.
- Other keys are ignored unless explicitly configured via `pressKeys` or `clickKeys`.

This behavior ensures:

- Press animations are lifecycle-aware and never interrupted mid-flight.
- Synthetic clicks are dispatched only once, avoiding double activation.
- Native submit buttons continue to trigger form submission when activated via keyboard.
- Regular buttons receive standard click events.

You can override the default keys using the `pressKeys` and `clickKeys` options for custom accessibility or interaction needs.


### `usePressStatePhaseEvents(props, pressPhase)`

Emits lifecycle events in response to press/release phase transitions.

This hook observes the resolved `pressPhase` from `usePressBehaviorState()` and triggers the appropriate callbacks defined in `PressStatePhaseEventProps`, such as:

- `onPressingStart`
- `onPressingEnd`
- `onReleasingStart`
- `onReleasingEnd`

### `usePressState(props, options?)`

Resolves the current pressed/released state for a fully controlled component.

This hook is intended for components that **consume** the resolved `pressed` state and **forward** it to a base component.

Unlike `usePressBehaviorState()`, which handles animation and lifecycle, `usePressState()` performs a lightweight resolution of the effective press value.

- No internal state or uncontrolled fallback.
- `'auto'` is treated as a declarative diagnostic mode.
- Ideal for components that **consume** the resolved `pressed` state.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Press Selectors:
    isPressedSelector,             // Targets `.is-pressed` class
    isReleasedSelector,            // Targets `.is-released` class
    isPressingSelector,            // Targets `.is-pressing` class
    isReleasingSelector,           // Targets `.is-releasing` class
    isPressingOrPressedSelector,   // Targets `.is-pressing` and `.is-pressed` class
    isReleasingOrReleasedSelector, // Targets `.is-releasing` and `.is-released` class
    
    // Conditional styling helpers:
    ifPressed,             // Applies the given `styles` to elements in the fully pressed state.
    ifReleased,            // Applies the given `styles` to elements in the fully released state.
    ifPressing,            // Applies the given `styles` to elements currently in the pressing transition.
    ifReleasing,           // Applies the given `styles` to elements currently in the releasing transition.
    ifPressingOrPressed,   // Applies the given `styles` to elements that are either pressing or fully pressed.
    ifReleasingOrReleased, // Applies the given `styles` to elements that are either releasing or fully released.
} from '@reusable-ui/press-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifPressingOrPressed({
        backgroundColor: 'darkblue',
    }),
    ...ifReleasingOrReleased({
        backgroundColor: 'blue',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isPressingOrPressedSelector, { // equivalent to `ifPressingOrPressed`
        color: 'black',
    }),
    ...rule(isReleasingOrReleasedSelector, { // equivalent to `ifReleasingOrReleased`
        color: 'lightblue',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesPressState(options?: CssPressStateOptions): CssPressState`

Generates CSS rules that conditionally apply the press/release animations based on current pressed state, and exposes press/release-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable             | Active When...                    | Purpose                      |
|----------------------|-----------------------------------|------------------------------|
| `animationPressing`  | `.is-pressing`                    | Triggers pressing animation  |
| `animationReleasing` | `.is-releasing`                   | Triggers releasing animation |
| `isPressed`          | `.is-pressed` or `.is-pressing`   | Styling for pressed state    |
| `isReleased`         | `.is-released` or `.is-releasing` | Styling for released state   |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Pressed/released state:
import { usesPressState } from '@reusable-ui/press-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const pressableBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        pressStateRule,
        pressStateVars: { isPressed, isReleased },
    } = usesPressState({
        animationPressing  : 'var(--box-pressing)',
        animationReleasing : 'var(--box-releasing)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply pressed/released state rules:
        ...pressStateRule(),
        
        // Define pressing animation:
        ...vars({
            '--box-pressing': [
                ['0.3s', 'ease-out', 'both', 'background-color-pressing'],
            ],
        }),
        ...keyframes('background-color-pressing', {
            from: {
                backgroundColor: 'blue',
            },
            to: {
                backgroundColor: 'darkblue',
            },
        }),
        
        // Define releasing animation:
        ...vars({
            '--box-releasing': [
                ['0.3s', 'ease-out', 'both', 'background-color-releasing'],
            ],
        }),
        ...keyframes('background-color-releasing', {
            from: {
                backgroundColor: 'darkblue',
            },
            to: {
                backgroundColor: 'blue',
            },
        }),
        
        // Define final background color based on lifecycle state:
        ...fallback({
            '--background-color-pressed'  : `${isPressed} darkblue`,
        }),
        ...fallback({
            '--background-color-released' : `${isReleased} blue`,
        }),
        backgroundColor: 'var(--background-color-pressed, var(--background-color-released))',
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationPressing` and `animationReleasing` variables are only defined during **pressing** and **releasing** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining press/release animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/press-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/press-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/press-state brings expressive, adaptive press styling to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
