# @reusable-ui/disabled-state 📦  

**disabled-state** is a reusable abstraction for managing enabled/disabled states in UI components.  
It provides a lifecycle-aware way to animate transitions between *enabled* and *disabled* states, exposing semantic variables that make styling and contributor reasoning clear.  

Instead of manually toggling classes or setting up disable context, disabled-state automatically manages enabled/disabled classes and cascaded context, ensuring transitions are smooth, predictable, and easy to maintain. This makes it ideal for controllable components — such as buttons, inputs, and toggles — where interactivity must be constrained, while still giving implementors the flexibility to propagate or override disabled state across contexts.  

With **disabled-state**, you get:  
- Controlled enabled/disabled constraints  
- Transition animations tied to the disabled lifecycle  
- Semantic styling variables (`isEnabled`, `isDisabled`, etc.) for fine-grained control  
- Cascaded context support for parent-driven disabled state  

## ✨ Features
✔ Lifecycle-aware enable/disable animations based on current disabled state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ Contextual override via `cascadeDisabled` for parent-driven disabled state  

## 📦 Installation
Install **@reusable-ui/disabled-state** via npm or yarn:

```sh
npm install @reusable-ui/disabled-state
# or
yarn add @reusable-ui/disabled-state
```

## 🧩 Exported Hooks

### `useDisabledBehaviorState(props, options?)`

Resolves the enabled/disabled state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled disabled state.
- Supports contextual override via `cascadeDisabled`.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useDisabledBehaviorState,
    DisabledStateProps,
    DisabledStateUpdateProps,
} from '@reusable-ui/disabled-state';
import styles from './CustomEditor.module.css';

export interface CustomEditorProps extends
    DisabledStateProps,
    DisabledStateUpdateProps // optional update reporting behavior
{}

// An editor that can be enabled or disabled.
export const CustomEditor: FC<CustomEditorProps> = (props) => {
    const {
        disabled,
        actualDisabled,
        disabledPhase,
        disabledClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useDisabledBehaviorState(props, {
        defaultDisabled        : false,                     // Defaults to enabled.
        defaultCascadeDisabled : true,                      // Defaults to allow contextual disabling.
        animationPattern       : ['enabling', 'disabling'], // Matches animation names ending with 'enabling' or 'disabling'.
        animationBubbling      : false,                     // Ignores bubbling animation events from children.
    });
    
    return (
        <input
            type='text'
            className={`${styles.box} ${disabledClassname}`}
            disabled={disabled}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        />
    );
};
```

### `useDisabledStatePhaseEvents(props, disabledPhase)`

Emits lifecycle events in response to enable/disable phase transitions.

This hook observes the resolved `disabledPhase` from `useDisabledBehaviorState()` and triggers the appropriate callbacks defined in `DisabledStatePhaseEventProps`, such as:

- `onEnablingStart`
- `onEnablingEnd`
- `onDisablingStart`
- `onDisablingEnd`

### `useDisabledState(props, options?)`

Resolves the current enabled/disabled state for a fully controlled component.

This hook is intended for components that **consume** the resolved `disabled` state and **forward** it to a base component.

Unlike `useDisabledBehaviorState()`, which handles animation and lifecycle, `useDisabledState()` performs a lightweight resolution of the effective disabled value.

- No internal state or uncontrolled fallback.
- Ideal for components that **consume** the resolved `disabled` state.

#### 🧠 Transition Animation Behavior

The hook manages transitions between `enabled` and `disabled` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from enabled to disabled) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🧬 Context Propagation

Use `<DisabledStateProvider>` to share disabled state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    DisabledStateProps,
    DisabledStateProvider,
    useDisabledBehaviorState,
    useDisabledState,
} from '@reusable-ui/disabled-state';

export interface ParentComponentProps extends DisabledStateProps {
    children ?: ReactNode
}

// A component that shares its disabled state with descendant components.
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve disabled state from props and handle animation phases:
    const {
        disabled,
        disabledPhase,
        disabledClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useDisabledBehaviorState(props, {
        defaultDisabled        : false,                     // Defaults to enabled.
        defaultCascadeDisabled : true,                      // Defaults to allow contextual disabling.
        animationPattern       : ['enabling', 'disabling'], // Matches animation names ending with 'enabling' or 'disabling'.
        animationBubbling      : false,                     // Ignores bubbling animation events from children.
    });
    
    // Or use `useDisabledState()` if not concerned with animation phases:
    // const disabled = useDisabledState(props, {
    //     defaultDisabled        : false, // Defaults to enabled.
    //     defaultCascadeDisabled : true,  // Defaults to allow contextual disabling.
    // });
    
    // Propagate disabled state to descendants:
    return (
        <DisabledStateProvider disabled={disabled}>
            {props.children}
        </DisabledStateProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Disabled Selectors:
    isEnabledSelector,             // Targets `.is-enabled` class
    isDisabledSelector,            // Targets `.is-disabled` class
    isEnablingSelector,            // Targets `.is-enabling` class
    isDisablingSelector,           // Targets `.is-disabling` class
    isEnablingOrEnabledSelector,   // Targets `.is-enabling` and `.is-enabled` class
    isDisablingOrDisabledSelector, // Targets `.is-disabling` and `.is-disabled` class
    
    // Conditional styling helpers:
    ifEnabled,             // Applies the given `styles` to elements in the fully enabled state.
    ifDisabled,            // Applies the given `styles` to elements in the fully disabled state.
    ifEnabling,            // Applies the given `styles` to elements currently in the enabling transition.
    ifDisabling,           // Applies the given `styles` to elements currently in the disabling transition.
    ifEnablingOrEnabled,   // Applies the given `styles` to elements that are either enabling or fully enabled.
    ifDisablingOrDisabled, // Applies the given `styles` to elements that are either disabling or fully disabled.
} from '@reusable-ui/disabled-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifEnablingOrEnabled({
        color: 'blue',
    }),
    ...ifDisablingOrDisabled({
        color: 'gray',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isEnablingOrEnabledSelector, { // equivalent to `ifEnablingOrEnabled`
        backgroundColor: 'lightblue',
    }),
    ...rule(isDisablingOrDisabledSelector, { // equivalent to `ifDisablingOrDisabled`
        backgroundColor: 'lightgray',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesDisabledState(options?: CssDisabledStateOptions): CssDisabledState`

Generates CSS rules that conditionally apply the enable/disable animations based on current disabled state, and exposes enable/disable-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable             | Active When...                    | Purpose                                                                       |
|----------------------|-----------------------------------|-------------------------------------------------------------------------------|
| `animationEnabling`  | `.is-enabling`                    | Runs the enabling animation sequence                                          |
| `animationDisabling` | `.is-disabling`                   | Runs the disabling animation sequence                                         |
| `isEnabled`          | `.is-enabled` or `.is-enabling`   | Conditional variable for the enabled state                                    |
| `isDisabled`         | `.is-disabled` or `.is-disabling` | Conditional variable for the disabled state                                   |
| `disableFactor`      | Always available (animatable)     | Normalized factor: 0 = enabled, 1 = disabled, interpolates during transitions |
| `disableFactorCond`  | not fully enabled                 | Conditional mirror of `disableFactor`, drops to `unset` when fully enabled    |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Enabled/disabled state:
import { usesDisabledState } from '@reusable-ui/disabled-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const disableableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: enable/disable lifecycle
    const {
        disabledStateRule,
        disabledStateVars: { isEnabled, isDisabled, disableFactor },
    } = usesDisabledState({
        animationEnabling  : 'var(--box-enabling)',
        animationDisabling : 'var(--box-disabling)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply enabled/disabled state rules:
        ...disabledStateRule(),
        
        // Enabling animation: interpolate disableFactor from 1 → 0
        ...vars({
            '--box-enabling': [
                ['0.3s', 'ease-out', 'both', 'transition-enabling'],
            ],
        }),
        ...keyframes('transition-enabling', {
            from : { [disableFactor]: 1 },
            to   : { [disableFactor]: 0 },
        }),
        
        // Disabling animation: interpolate disableFactor from 0 → 1
        ...vars({
            '--box-disabling': [
                ['0.3s', 'ease-out', 'both', 'transition-disabling'],
            ],
        }),
        ...keyframes('transition-disabling', {
            from : { [disableFactor]: 0 },
            to   : { [disableFactor]: 1 },
        }),
        
        // Example usage:
        // - Opacity interpolates with `disableFactor`.
        // - 0 → fully visible, 1 → dimmed.
        opacity: `calc(1 - (${disableFactor} * 0.5))`,
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationEnabling` and `animationDisabling` variables are only defined during **enabling** and **disabling** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining enable/disable animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/disabled-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/disabled-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/disabled-state brings expressive, adaptive interactivity control to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
