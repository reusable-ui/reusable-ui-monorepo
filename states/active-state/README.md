# @reusable-ui/active-state 📦  

A utility for orchestrating activate/deactivate animations based on the current transition phase.  
Ideal for toggles, switches, selections, alerts, and any activatable UI components.

## ✨ Features
✔ Lifecycle-aware activate/deactivate animations based on transition phase  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ Supports controlled, uncontrolled, and hybrid activation behavior  

## 📦 Installation
Install **@reusable-ui/active-state** via npm or yarn:

```sh
npm install @reusable-ui/active-state
# or
yarn add @reusable-ui/active-state
```

## 🧩 Exported Hooks

### `useActiveBehaviorState(props, options?)`

Resolves the active/inactive state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

Supports controlled, uncontrolled, and hybrid activation behavior with optional change dispatching.

#### 💡 Usage Example

```tsx
import React, { FC, MouseEventHandler } from 'react';
import {
    useActiveBehaviorState,
    ActiveStateProps,
    UncontrollableActiveStateProps,
    ActiveStateChangeProps,
} from '@reusable-ui/active-state';
import styles from './ActivatableBox.module.css';

export interface ActivatableBoxProps extends
    ActiveStateProps,
    UncontrollableActiveStateProps<MouseEventHandler<HTMLButtonElement>>, // optional uncontrolled behavior
    ActiveStateChangeProps // optional change dispatching behavior
{}

// A box that can be activated and deactivated.
export const ActivatableBox: FC<ActivatableBoxProps> = (props) => {
    const {
        active,
        activePhase,
        activeClassname,
        
        dispatchActiveChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useActiveBehaviorState(props, {
        defaultActive     : false,                      // Fallback for uncontrolled mode.
        animationPattern  : ['activate', 'deactivate'], // Matches animation names ending with 'activate' or 'deactivate'.
        animationBubbling : false,                      // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.box} ${activeClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            <button onClick={(event) => dispatchActiveChange(!active, event)}>
                Toggle state
            </button>
            {active && <div className={styles.details}>
                <p>Active content goes here.</p>
            </div>}
        </div>
    );
};
```

### `useActiveStatePhaseEvents(props, activePhase)`

Emits lifecycle events in response to activate/deactivate phase transitions.

This hook observes the resolved `activePhase` from `useActiveBehaviorState()` and triggers the appropriate callbacks defined in `ActiveStatePhaseEventProps`, such as:

- `onActivateStart`
- `onActivateEnd`
- `onDeactivateStart`
- `onDeactivateEnd`

### `useActiveState(props)`

Resolves the current active state for a fully controlled component.

This hook is intended for components that **consume** the resolved `active` state and **forward** it to a base component.

Unlike `useActiveBehaviorState()`, which supports both controlled and uncontrolled modes, `useActiveState()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Ideal for components that **consume** the resolved `active` state.

### `useActiveChangeDispatcher(props)`

Creates a stable dispatcher for requesting a change to the active state.

This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `active` state and forwards it to a `<BaseComponent active={...}>`.

Unlike `useActiveBehaviorState()`, which supports both controlled and uncontrolled modes, `useActiveChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Always triggers `onActiveChange`, if provided.
- Ideal for components that **dictate** the `active` state externally and need a stable dispatcher without lifecycle orchestration.

### `useUncontrollableActiveState(props, options)`

Resolves the current active state and provides a dispatcher for requesting changes.

This hook is intended for components that **manage** the resolved `active` state and **forward** it to a base component, while optionally supporting uncontrolled behavior.

Unlike `useActiveBehaviorState()`, which resolves full lifecycle, `useUncontrollableActiveState()` provides a **simplified implementation** for managing active state and dispatching changes.

- Supports both controlled and uncontrolled modes.
- If `active` is provided, the internal state is disabled and the component becomes fully controlled.
- If `active` is omitted, the internal state is initialized via `defaultActive`.
- Ideal for components that **manage** the resolved `active` state.

#### 🧠 Transition Animation Behavior

The hook manages transitions between `active` and `inactive` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from deactivate to activate) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Activate/deactivate Selectors:
    isActiveSelector,                 // Targets `.is-active` classes
    isInactiveSelector,               // Targets `.is-inactive` classes
    isActivatingSelector,             // Targets `.is-activating` classes
    isDeactivatingSelector,           // Targets `.is-deactivating` classes
    isActivatingOrActiveSelector,     // Targets `.is-activating` and `.is-active` classes
    isDeactivatingOrInactiveSelector, // Targets `.is-deactivating` and `.is-inactive` classes
    
    // Conditional styling helpers:
    ifActive,                 // Applies styles to elements in the fully active state
    ifInactive,               // Applies styles to elements in the fully inactive state
    ifActivating,             // Applies styles to elements currently in the activating transition
    ifDeactivating,           // Applies styles to elements currently in the deactivating transition
    ifActivatingOrActive,     // Applies styles to elements that are either activating or fully active
    ifDeactivatingOrInactive, // Applies styles to elements that are either deactivating or fully inactive
} from '@reusable-ui/active-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifActivatingOrActive({
        fontWeight: 'bold',
    }),
    ...ifDeactivatingOrInactive({
        fontWeight: 'normal',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isActivatingOrActiveSelector, { // equivalent to `ifActivatingOrActive`
        opacity: '100%',
    }),
    ...rule(isDeactivatingOrInactiveSelector, { // equivalent to `ifDeactivatingOrInactive`
        opacity: '60%',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesActiveState(options?: CssActiveStateOptions): CssActiveState`

Generates CSS rules that conditionally apply the activate/deactivate animations based on the current transition phase, and exposes activate/deactivate-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable              | Active When...     | Purpose                         |
|-----------------------|--------------------|---------------------------------|
| `animationActivate`   | `.is-activating`   | Triggers activating animation   |
| `animationDeactivate` | `.is-deactivating` | Triggers deactivating animation |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Active/inactive state:
import { usesActiveState } from '@reusable-ui/active-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const activatableBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        activeStateRule,
        activeStateVars: { isActive, isInactive },
    } = usesActiveState({
        animationActivate   : 'var(--box-activate)',
        animationDeactivate : 'var(--box-deactivate)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply active/inactive state rules:
        ...activeStateRule(),
        
        // Define activating animation:
        ...vars({
            '--box-activate': [
                ['0.3s', 'ease-out', 'both', 'opacity-activating'],
            ],
        }),
        ...keyframes('opacity-activating', {
            from: {
                opacity: '60%',
            },
            to: {
                opacity: '100%',
            },
        }),
        
        // Define deactivating animation:
        ...vars({
            '--box-deactivate': [
                ['0.3s', 'ease-out', 'both', 'opacity-deactivating'],
            ],
        }),
        ...keyframes('opacity-deactivating', {
            from: {
                opacity: '100%',
            },
            to: {
                opacity: '60%',
            },
        }),
        
        // Define final opacity based on lifecycle state:
        ...fallback({
            '--opacity-active' : `${isActive} 100%`,
        }),
        ...fallback({
            '--opacity-inactive' : `${isInactive} 60%`,
        }),
        opacity: 'var(--opacity-active, var(--opacity-inactive))',
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationActivate` and `animationDeactivate` variables are only defined during **activating** and **deactivating** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining activate/deactivate animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/active-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/active-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/active-state brings expressive, adaptive activation styling to your components.**  
Give it a ⭐ on GitHub if you find it useful!  
